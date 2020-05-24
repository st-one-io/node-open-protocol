//@ts-check
/*
  Copyright: (c) 2018-2020, Smart-Tech Controle e Automação
  GNU General Public License v3.0+ (see LICENSE or https://www.gnu.org/licenses/gpl-3.0.txt)
*/

const util = require('util');
const { Transform } = require('stream');

const constants = require("./constants.json");
const encodingOP = constants.defaultEncoder;

const helpers = require("./helpers.js");
const pad = helpers.padLeft;

var debug = util.debuglog('open-protocol');

/**
 * @class
 * @name Header
 * @param {object} Header
 * @param {number} Header.mid The MID describes how to interpret the message.
 * @param {number} Header.revision The MID Revision is unique per MID and is used in case different versions are available for the same MID.
 * @param {boolean} Header.noAck The No Ack Flag is used when setting a subscription.
 * @param {number} Header.stationID The station the message is addressed to in the case of controller with multi-station configuration.
 * @param {number} Header.spindleID The spindle the message is addressed to in the case several spindles are connected to the same controller.
 * @param {number} Header.sequenceNumber For acknowledging on “Link Level” with MIDs 0997 and 0998.
 * @param {number} Header.messageParts Linking function can be up to 9 = possible to send 9*9999 bytes messages. ~ 90 kB.
 * @param {number} Header.messageNumber Linking function, can be 1- 9 at message length > 9999.
 * @param {buffer | string} Header.payload the user's data
 */

class OpenProtocolSerializer extends Transform {

    /**
     * @class OpenProtocolSerializer
     * @description This class performs the serialization of the MID header.
     * This transforms MID (object) in MID (Buffer).
     * @param {Object} opts an object with the option passed to the constructor
     */
    constructor(opts) {
        opts = opts || {};
        opts.writableObjectMode = true;
        super(opts);
        debug("new openProtocolSerializer");
    }

    _transform(chunk, encoding, cb) {
        debug("openProtocolSerializer _transform", chunk);

        chunk.mid = Number(chunk.mid);

        if (isNaN(chunk.mid) || chunk.mid < 1 || chunk.mid > 9999) {
            cb(new Error(`Invalid MID [${chunk.mid}]`));
            debug("openProtocolSerializer _transform err-mid:", chunk);
            return;
        }

        if (chunk.revision === "   " || chunk.revision === 0 || chunk.revision === undefined) {
            chunk.revision = 1;
        }

        chunk.revision = Number(chunk.revision);

        if (isNaN(chunk.revision) || chunk.revision < 0 || chunk.revision > 999) {
            cb(new Error(`Invalid revision [${chunk.revision}]`));
            debug("openProtocolSerializer _transform err-revision:", chunk);
            return;
        }

        if (chunk.stationID === "  " ||chunk.stationID === undefined) {
            chunk.stationID = 1;
        }

        chunk.stationID = Number(chunk.stationID);

        if (isNaN(chunk.stationID) || chunk.stationID < 0 || chunk.stationID > 99) {
            cb(new Error(`Invalid stationID [${chunk.stationID}]`));
            debug("openProtocolSerializer _transform err-stationID:", chunk);
            return;
        }

        if (chunk.spindleID === "  " ||chunk.spindleID === undefined) {
            chunk.spindleID = 1;
        }

        chunk.spindleID = Number(chunk.spindleID);

        if (isNaN(chunk.spindleID) || chunk.spindleID < 0 || chunk.spindleID > 99) {
            cb(new Error(`Invalid spindleID [${chunk.spindleID}]`));
            debug("openProtocolSerializer _transform err-spindleID:", chunk);
            return;
        }

        if (chunk.sequenceNumber === "  " || chunk.sequenceNumber === undefined) {
            chunk.sequenceNumber = 0;
        }

        chunk.sequenceNumber = Number(chunk.sequenceNumber);

        if (isNaN(chunk.sequenceNumber) || chunk.sequenceNumber < 0 || chunk.sequenceNumber > 99) {
            cb(new Error(`Invalid sequenceNumber [${chunk.sequenceNumber}]`));
            debug("openProtocolSerializer _transform err-sequenceNumber:", chunk);
            return;
        }

        if (chunk.messageParts === " " || chunk.messageParts === undefined) {
            chunk.messageParts = 0;
        }

        chunk.messageParts = Number(chunk.messageParts);

        if (isNaN(chunk.messageParts) || chunk.messageParts < 0 || chunk.messageParts > 9) {
            cb(new Error(`Invalid messageParts [${chunk.messageParts}]`));
            debug("openProtocolSerializer _transform err-messageParts:", chunk);
            return;
        }

        if (chunk.messageNumber === " " || chunk.messageNumber === undefined) {
            chunk.messageNumber = 0;
        }

        chunk.messageNumber = Number(chunk.messageNumber);

        if (isNaN(chunk.messageNumber) || chunk.messageNumber < 0 || chunk.messageNumber > 9) {
            cb(new Error(`Invalid messageNumber [${chunk.messageNumber}]`));
            debug("openProtocolSerializer _transform err-messageNumber:", chunk);
            return;
        }

        if(chunk.payload === undefined){
            chunk.payload = "";
        }

        if (!Buffer.isBuffer(chunk.payload) && typeof chunk.payload !== "string") {
            cb(new Error(`Invalid payload [${chunk.payload}]`));
            debug("openProtocolSerializer _transform err-payload:", chunk);
            return;
        }

        let sizePayload = chunk.payload.length;
        let sizeMessage = 21 + sizePayload;
        let buf = Buffer.alloc(sizeMessage);

        buf.write(pad(sizeMessage - 1, 4), 0, 4, encodingOP);
        buf.write(pad(chunk.mid, 4), 4, 4, encodingOP);
        buf.write(pad(chunk.revision, 3), 8, encodingOP);
        buf.write(chunk.noAck ? '1' : '0', 11, encodingOP);
        buf.write(pad(chunk.stationID, 2), 12, encodingOP);
        buf.write(pad(chunk.spindleID, 2), 14, encodingOP);
        buf.write(pad(chunk.sequenceNumber, 2), 16, encodingOP);
        buf.write(pad(chunk.messageParts, 1), 18, encodingOP);
        buf.write(pad(chunk.messageNumber, 1), 19, encodingOP);
        buf.write(chunk.payload.toString(encodingOP), 20, encodingOP);
        buf.write("\u0000", sizeMessage, encodingOP);

        debug("openProtocolSerializer _transform publish", buf);
        this.push(buf);

        cb();
    }

    _destroy() {
        //no-op, needed to handle older node versions
    }
}

module.exports = OpenProtocolSerializer;
