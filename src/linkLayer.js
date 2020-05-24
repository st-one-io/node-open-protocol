//@ts-check
/*
  Copyright: (c) 2018-2020, Smart-Tech Controle e Automação
  GNU General Public License v3.0+ (see LICENSE or https://www.gnu.org/licenses/gpl-3.0.txt)
*/

const util = require('util');
const { Duplex } = require("stream");

const OpenProtocolParser = require("./openProtocolParser");
const OpenProtocolSerializer = require("./openProtocolSerializer");
const MIDParser = require("./MIDParser");
const MIDSerializer = require("./MIDSerializer");
const constants = require("./constants.json");

var debug = util.debuglog('open-protocol');

const POSITIVE_ACK = 9997;
const NEGATIVE_ACK = 9998;

/**
 * This class is responsible for the controller of the link layer of OpenProtocol
 */
class LinkLayer extends Duplex {

    /**
     * Create a new object LinkLayer
     * @throws {error}
     * @param {object} opts
     * @param {stream} opts.stream
     * @param {number} opts.timeOut
     * @param {number} opts.retryTimes
     * @param {boolean} opts.rawData
     * @param {boolean} opts.disableMidParsing
     */
    constructor(opts) {
        debug("new LinkLayer", opts);

        opts = opts || {};
        opts.readableObjectMode = true;
        opts.writableObjectMode = true;

        super(opts);

        if (opts.stream === undefined) {
            debug("LinkLayer constructor err-socket-undefined");
            throw new Error("[LinkLayer] Socket is undefined");            
        }

        //Create instances of manipulators
        this.opParser = new OpenProtocolParser({
            rawData: opts.rawData
        });
        this.opSerializer = new OpenProtocolSerializer();
        this.midParser = new MIDParser();
        this.midSerializer = new MIDSerializer();
        //Create instances of manipulators

        this.stream = opts.stream;
        this.timeOut = opts.timeOut || 3000;
        this.retryTimes = opts.retryTimes || 3;

        //Raw Data
        this.rawData = opts.rawData || false;

        //Disable MID Parsing
        this.disableMidParsing = opts.disableMidParsing || {};

        this.linkLayerActive = false;
        this.partsOfMessage = [];
        this.receiverMessageInParts = 0;
        this.numberMessageReceived = 1;

        this.lastMessageReceived = {
            mid: 0,
            sequenceNumber: 0
        };

        this.stream.pause();

        //Errors
        this.midSerializer.on("error", (err) => this._onErrorSerializer(err));
        this.opSerializer.on("error", (err) => this._onErrorSerializer(err));

        //TODO
        //Verificar outra tratativa
        this.opParser.on("error", (err) => this._onErrorParser(err));
        this.midParser.on("error", (err) => this._onErrorParser(err));
        //Errors

        //SEND DATA
        this.midSerializer.on("data", (data) => this._onDataMidSerializer(data));
        this.opSerializer.on("data", (data) => this._onDataOpSerializer(data));
        //SEND DATA

        //RECEIVER DATA
        this.stream.on("data", (data) => this._onDataStream(data));
        this.opParser.on("data", (data) => this._onDataOpParser(data));
        this.midParser.on("data", (data) => this._onDataMidParser(data));
        //RECEIVER DATA
    }

    _onErrorSerializer(err) {
        debug("LinkLayer _onErrorSerializer", err);

        if (this.linkLayerActive) {
            this.sequenceNumber--;
        }

        if (this.callbackWrite) {
            function doCallback(cb) {
                process.nextTick(() => cb());
            }

            doCallback(this.callbackWrite);

            this.callbackWrite = undefined;
        }

        this.emit("errorSerializer", err);

        return;
    }

    _onErrorParser(err) {
        debug("LinkLayer _onErrorParser", err);
        this.emit("error", err);
        return;
    }

    _onDataMidSerializer(data) {
        debug("LinkLayer _onDataMidSerializer", data);

        if (data.mid !== NEGATIVE_ACK && data.mid !== POSITIVE_ACK && !data.isAck) {

            clearTimeout(this.timer);
            this.timer = setTimeout(() => this._resendMid(), this.timeOut);
        }

        this.messageParts = 0;
        let length = data.payload.length;

        //Multi Parts
        if (length > 9979) {
            let msgPart = 1;
            let parts = length / 9979;
            parts = Math.ceil(parts);
            data.messageParts = parts;
            this.messageParts = parts;

            if (parts > 9) {
                this.emit("error", new Error(`[LinkLayer] number of messages > 9, MID[${data.mid}], length buffer [${length}]`));
                debug("LinkLayer _onDataMidSerializer err_parts_9", parts);
                return;
            }

            let fullPayload = data.payload;

            while (fullPayload.length > 0) {

                if (fullPayload.length > 9979) {
                    data.payload = fullPayload.slice(0, 9979);
                    fullPayload = fullPayload.slice(9979);
                } else {
                    data.payload = fullPayload;
                    fullPayload = Buffer.from("");
                }

                data.messageNumber = msgPart;
                msgPart += 1;

                this.message = data;
                this.opSerializer.write(data);
            }

            return;
        }

        if (data.mid !== POSITIVE_ACK && data.mid !== NEGATIVE_ACK && !data.isAck) {
            this.message = data;
        }

        this.opSerializer.write(data);
    }

    _onDataOpSerializer(data) {
        debug("LinkLayer _onDataOpSerializer", data);
        this.stream.write(data);
    }

    _onDataStream(data) {
        debug("LinkLayer _onDataStream", data);
        this.opParser.write(data);
    }

    _onDataOpParser(data) {
        debug("LinkLayer _onDataOpParser", data);
        
        let duplicateMsg = false;

        if (this.linkLayerActive) {
            if (this.lastMessageReceived.mid === data.mid && this.lastMessageReceived.sequenceNumber === data.sequenceNumber) {
                duplicateMsg = true;
                this.sequenceNumberPartner -= 1;
            }
        }

        if (data.messageParts !== 0 || this.receiverMessageInParts !== 0) {

            this.receiverMessageInParts = data.messageParts;

            if (data.messageNumber !== this.numberMessageReceived) {

                if (this.linkLayerActive) {
                    this._sendLinkLayer(NEGATIVE_ACK, data.sequenceNumber, {
                        midNumber: data.mid,
                        errorCode: constants.ERROR_LINKLAYER.INCONSISTENCY_MESSAGE_NUMBER
                    });
                }

                this.emit("error", new Error(`[LinkLayer] inconsistency message number, MID[${data.mid}]`));
                debug("LinkLayer _onDataOpParser err_inconsistency_message_number", data);

                return;
            }

            this.partsOfMessage.push(data.payload);

            if (this.receiverMessageInParts === this.numberMessageReceived) {
                data.payload = Buffer.concat(this.partsOfMessage);
                this.receiverMessageInParts = 0;
                this.numberMessageReceived = 1;
                this.lastMessageReceived = data;

                if (!duplicateMsg) {

                    if (this.disableMidParsing[data.mid] && (data.mid !== POSITIVE_ACK && data.mid !== NEGATIVE_ACK)) {

                        if (!this.push(data)) {
                            this.stream.pause();
                            return;
                        }
                    } else {
                        this.midParser.write(data);
                    }
                }
                return;
            }
            this.numberMessageReceived += 1;
            return;
        }

        if (this.linkLayerActive) {
            if (data.sequenceNumber !== 0) {
                if (data.mid === POSITIVE_ACK || data.mid === NEGATIVE_ACK) {
                    if (data.sequenceNumber !== (this.sequenceNumber)) {
                        this.emit("error", new Error(`[LinkLayer] sequence number invalid, MID[${data.mid}], received[${data.sequenceNumber}], expected[${this.sequenceNumber}]`));
                        debug('LinkLayer _onDataOpParser err_sequence_number_ack_invalid', data.mid, data.sequenceNumber, this.sequenceNumber);
                        return;
                    }
                } else {

                    if (this.sequenceNumberPartner) {
                        if (this.sequenceNumberPartner === 99) {
                            this.sequenceNumberPartner = 0;
                        }

                        if (data.sequenceNumber !== (this.sequenceNumberPartner + 1)) {
                            this._sendLinkLayer(NEGATIVE_ACK, data.sequenceNumber, {
                                midNumber: data.mid,
                                errorCode: constants.ERROR_LINKLAYER.INVALID_SEQUENCE_NUMBER
                            });

                            this.emit("error", new Error(`[LinkLayer] sequence number invalid, MID[${data.mid}]`));
                            debug('LinkLayer _onDataOpParser err_sequence_number_invalid', data.mid, data.sequenceNumber, this.sequenceNumberPartner);
                            return;
                        }
                    }

                    this.sequenceNumberPartner = data.sequenceNumber;
                    this._sendLinkLayer(POSITIVE_ACK, data.sequenceNumber, {
                        midNumber: data.mid
                    });
                }
            }
        }

        this.lastMessageReceived = data;

        if (!duplicateMsg) {
            if (this.disableMidParsing[data.mid] && (data.mid !== POSITIVE_ACK && data.mid !== NEGATIVE_ACK)) {

                if (!this.push(data)) {
                    this.stream.pause();
                    return;
                }
            } else {
                this.midParser.write(data);
            }

        }
    }

    _onDataMidParser(data) {
        debug("LinkLayer _onDataMidParser", data);

        clearTimeout(this.timer);

        if (data.mid === POSITIVE_ACK || data.mid === NEGATIVE_ACK) {
            this._receiverLinkLayer(data);
            return;
        }

        if (!this.push(data)) {
            this.stream.pause();
            return;
        }
    }

    _write(msg, encoding, callback) {
        debug("LinkLayer _write", msg);

        this.callbackWrite = callback;
        this.resentTimes = 0;

        if (this.linkLayerActive) {
            msg.sequenceNumber = this.sequenceNumber;
            this.sequenceNumber += 1;

            if (this.sequenceNumber > 99) {
                this.sequenceNumber = 1;
            }
        }

        // if this is an ack, callback immediately
        if (msg.isAck) {
            clearTimeout(this.timer);
            process.nextTick(() => {
                this.callbackWrite = null;
                callback();
            });
        }

        this.midSerializer.write(msg);
    }

    _read(size) {
        debug("LinkLayer _read", size);

        if (this.stream.isPaused()) {
            this.stream.resume();
        }
    }

    _destroy() {
        debug("LinkLayer _destroy");

        clearTimeout(this.timer);

        function destroyStream(stream){
            // handles Node versions older than 8.x
            if (typeof stream.destroy === 'function') {
                stream.destroy();
            } else {
                stream._destroy();
            }
        }

        destroyStream(this.opParser);
        destroyStream(this.opSerializer);
        destroyStream(this.midParser);
        destroyStream(this.midSerializer);
    }

    finishCycle(err) {
        debug("LinkLayer finishCycle", err);

        if (this.callbackWrite) {
            this.callbackWrite(err);
            this.callbackWrite = undefined;
        }
    }

    /**
     * Enable LinkLayer
     */
    activateLinkLayer() {
        debug("LinkLayer activateLinkLayer");

        this.linkLayerActive = true;
        this.sequenceNumber = 1;
    }

    /**
     * Disable LinkLayer
     */
    deactivateLinkLayer() {
        debug("LinkLayer deactivateLinkLayer");

        this.linkLayerActive = false;
        clearTimeout(this.timer);
    }

    /**
     * @private
     * @param {*} data
     */
    _receiverLinkLayer(data) {
        debug("LinkLayer _receiverLinkLayer", data);

        clearTimeout(this.timer);

        if (data.mid === NEGATIVE_ACK || data.payload.midNumber !== this.message.mid || data.sequenceNumber !== this.sequenceNumber) {

            let err = new Error(`incorrect fields of MID, MID[${data.payload.midNumber}] - Error code [${data.payload.errorCode}] -` +
                ` Expect MID[${this.message.mid}] - Expect SequenceNumber [${this.sequenceNumber}] - Current SequenceNumber [${data.sequenceNumber}]`);

            if (this.callbackWrite) {

                function doCallback(cb, err) {
                    process.nextTick(() => cb(err));
                }

                doCallback(this.callbackWrite, err);

                this.callbackWrite = undefined;

            } else {
                
                debug('LinkLayer _receiverLinkLayer err-incorrect_fields_MID', this.message.mid, this.sequenceNumber);
                this.emit("error", err);
            }
            return;
        }

        this.message = {};

        if (this.callbackWrite) {

            function doCallback(cb) {
                process.nextTick(() => cb());
            }

            doCallback(this.callbackWrite);

            this.callbackWrite = undefined;
        }
    }

    /**
     * @private
     * @param {*} mid
     * @param {*} sequenceNumber
     * @param {*} payload
     */
    _sendLinkLayer(mid, sequenceNumber, payload) {
        debug("LinkLayer _sendLinkLayer", mid, sequenceNumber, payload);

        if (sequenceNumber === 99) {
            sequenceNumber = 0;
        }

        let msg = {
            mid: mid,
            sequenceNumber: (sequenceNumber + 1),
            payload
        };

        this.midSerializer.write(msg);
    }

    /**
     * @private
     */
    _resendMid() {
        debug("LinkLayer _resendMid");

        clearTimeout(this.timer);

        if (this.resentTimes < this.retryTimes) {
            this.timer = setTimeout(() => this._resendMid(), this.timeOut);
            this.opSerializer.write(this.message);
            this.resentTimes += 1;

        } else {

            let err = new Error(`[LinkLayer] timeout send MID[${this.message.mid}]`);

            this.resentTimes = 0;

            if (this.callbackWrite) {

                function doCallback(cb, err) {
                    process.nextTick(() => cb(err));
                }

                doCallback(this.callbackWrite, err);

                this.callbackWrite = undefined;

            } else {
                debug('LinkLayer _resendMid  err-timeout_send_MID', this.message.mid);
                this.emit("error", err);
            }
        }
    }
}

module.exports = LinkLayer;
