//@ts-check
/*
  Copyright: (c) 2018-2020, Smart-Tech Controle e Automação
  GNU General Public License v3.0+ (see LICENSE or https://www.gnu.org/licenses/gpl-3.0.txt)
*/

const util = require("util");
const { Transform } = require("stream");

const constants = require("./constants.json");

const encodingOP = constants.defaultEncoder;

var debug = util.debuglog("open-protocol");

class OpenProtocolParser extends Transform {
  /**
   * @class OpenProtocolParser
   * @description This class performs the parsing of the MID header.
   * This transforms MID (Buffer) in MID (Object).
   * @param {Object} opts an object with the option passed to the constructor
   */
  constructor(opts) {
    opts = opts || {};
    opts.readableObjectMode = true;
    opts.decodeStrings = true;

    super(opts);

    this.rawData = opts.rawData || false;
    this._nBuffer = null;
    debug("new OpenProtocolParser");
  }

  _transform(chunk, encoding, cb) {
    debug("OpenProtocolParser _transform", chunk);

    let ptr = 0;

    if (this._nBuffer !== null) {
      chunk = Buffer.concat([this._nBuffer, chunk]);
      this._nBuffer = null;
    }

    if (chunk.length < 20) {
      this._nBuffer = chunk;
      cb();
      return;
    }

    while (ptr < chunk.length) {
      let obj = {};
      let startPtr = ptr;

      let length = chunk.toString(encodingOP, ptr, ptr + 4);

      length = Number(length);

      if (isNaN(length) || length < 1 || length > 9999) {
        let e = new Error(`Invalid length [${length}]`);
        e.errno = constants.ERROR_LINKLAYER.INVALID_LENGTH;

        cb(e);

        debug("OpenProtocolParser _transform err-length:", ptr, chunk);
        return;
      }

      let mid = chunk.toString(encodingOP, ptr + 4, ptr + 8);
      obj.mid = Number(mid);

      // For MID 0900 only, incoming data does not have a null terminator.
      if (
        chunk.length < ptr + length + 1 &&
        !(obj.mid === 900 && chunk.length === length)
      ) {
        this._nBuffer = chunk.slice(ptr);
        cb();
        return;
      }
      if (chunk[chunk.length - 1] !== 0 && obj.mid !== 900) {
        let e = new Error(`Invalid message [${chunk.toString()}]`);
        e.errno = constants.ERROR_LINKLAYER.INVALID_LENGTH;
        cb(e);
        debug("OpenProtocolParser _transform err-message:", ptr, chunk);
        return;
      }

      ptr += 4;

      if (isNaN(obj.mid) || obj.mid < 1 || obj.mid > 9999) {
        cb(new Error(`Invalid MID [${mid}]`));
        debug("OpenProtocolParser _transform err-mid:", ptr, chunk);
        return;
      }

      ptr += 4;

      let revision = chunk.toString(encodingOP, ptr, ptr + 3);

      if (revision === "   ") {
        revision = 1;
      }

      obj.revision = Number(revision);

      if (isNaN(obj.revision) || obj.revision < 0 || obj.revision > 999) {
        let e = new Error(`Invalid revision [${revision}]`);
        e.errno = constants.ERROR_LINKLAYER.INVALID_REVISION;
        e.obj = obj;
        cb(e);
        debug("OpenProtocolParser _transform err-revision:", ptr, chunk);
        return;
      }

      if (obj.revision === 0) {
        obj.revision = 1;
      }

      ptr += 3;

      let noAck = chunk.toString(encodingOP, ptr, ptr + 1);

      if (noAck === " ") {
        noAck = 0;
      }
      obj.noAck = Number(noAck);

      if (isNaN(obj.noAck) || obj.noAck < 0 || obj.noAck > 1) {
        cb(new Error(`Invalid no ack [${obj.noAck}]`));
        debug("OpenProtocolParser _transform err-no-ack:", ptr, chunk);
        return;
      }

      obj.noAck = Boolean(obj.noAck);

      ptr += 1;

      let stationID = chunk.toString(encodingOP, ptr, ptr + 2);

      if (stationID === "  ") {
        stationID = 1;
      }

      obj.stationID = Number(stationID);

      if (isNaN(obj.stationID) || obj.stationID < 0 || obj.stationID > 99) {
        cb(new Error(`Invalid station id [${obj.stationID}]`));
        debug("OpenProtocolParser _transform err-station-id:", ptr, chunk);
        return;
      }

      if (obj.stationID === 0) {
        obj.stationID = 1;
      }

      ptr += 2;

      let spindleID = chunk.toString(encodingOP, ptr, ptr + 2);

      if (spindleID === "  ") {
        spindleID = 1;
      }

      obj.spindleID = Number(spindleID);

      if (isNaN(obj.spindleID) || obj.spindleID < 0 || obj.spindleID > 99) {
        cb(new Error(`Invalid spindle id [${obj.spindleID}]`));
        debug("OpenProtocolParser _transform err-spindle-id:", ptr, chunk);
        return;
      }

      if (obj.spindleID === 0) {
        obj.spindleID = 1;
      }

      ptr += 2;

      let sequenceNumber = chunk.toString(encodingOP, ptr, ptr + 2);

      if (sequenceNumber === "  ") {
        sequenceNumber = 0;
      }

      obj.sequenceNumber = Number(sequenceNumber);

      if (
        isNaN(obj.sequenceNumber) ||
        obj.sequenceNumber < 0 ||
        obj.sequenceNumber > 99
      ) {
        cb(new Error(`Invalid sequence number [${obj.sequenceNumber}]`));
        debug("OpenProtocolParser _transform err-sequence-number:", ptr, chunk);
        return;
      }

      ptr += 2;

      let messageParts = chunk.toString(encodingOP, ptr, ptr + 1);

      if (messageParts === " ") {
        messageParts = 0;
      }

      obj.messageParts = Number(messageParts);

      if (
        isNaN(obj.messageParts) ||
        obj.messageParts < 0 ||
        obj.messageParts > 9
      ) {
        cb(new Error(`Invalid message parts [${obj.messageParts}]`));
        debug("OpenProtocolParser _transform err-message-parts:", ptr, chunk);
        return;
      }

      ptr += 1;

      let messageNumber = chunk.toString(encodingOP, ptr, ptr + 1);

      if (messageNumber === " ") {
        messageNumber = 0;
      }

      obj.messageNumber = Number(messageNumber);
      if (
        isNaN(obj.messageNumber) ||
        obj.messageNumber < 0 ||
        obj.messageNumber > 9
      ) {
        cb(new Error(`Invalid message number [${obj.messageNumber}]`));
        debug("OpenProtocolParser _transform err-message-number:", ptr, chunk);
        return;
      }

      ptr += 1;

      obj.payload = chunk.slice(ptr, ptr + length - 20);

      ptr += length - 20 + 1;

      if (mid == 900) ptr = ptr - 1;

      if (this.rawData) {
        obj._raw = chunk.slice(startPtr, ptr);
      }

      this.push(obj);
    }
    cb();
  }

  _destroy() {
    //no-op, needed to handle older node versions
  }
}

module.exports = OpenProtocolParser;
