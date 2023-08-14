//@ts-check
/*
  Copyright: (c) 2023, Alejandro de la Mata Chico
  Copyright: (c) 2018-2020, Smart-Tech Controle e Automação
  GNU General Public License v3.0+ (see LICENSE or https://www.gnu.org/licenses/gpl-3.0.txt)
*/

/*
    MID 0900
    [xxxxxxxxxx]    [xxx...xxx]     [xxx]       [[][][][][]]    [xx]        [xx]            [xxx]
    (10) 0-9        (19) 10-28      (3) 29-31   (n) 32-n        (2) n       (2) n           (3) n
    resultID        timeStamp       numberPID   dataFields      traceType   transducerType  unit

    [xxx]               [[][][][][]]        [xxxxx]         [0x00]          [xx]
    (3) n               (n) n               (5) n           (1) n           (2) n
    numberResolution    resolutionFields    numberTrace     NUL character   traceSample

    Data fields
    [xxxxx]         [xxx]       [xx]        [xxx]       [xxxx]          [xxx...xxx]
    (5) 0-4         (3) 5-7     (2) 8-9     (3) 10-12   (4) 13-16       (n) 17-n
    parameterID     lenght      dataType    unit        stepNumber      dataValue

    Resolution fields
    [xxxxx]         [xxxxx]         [xxx]       [xx]            [xxx]        [xxx...xxx]
    (5) 0-4         (5) 5-9         (3) 10-12   (2) 13-14       (3) 15-17    (n) 18-n
    firstIndex      lastIndex       length      dataType        unit         timeValue
*/
/*
    payload: {
        resultID: {number}
        timeStamp: {string}
        numberPID: {number}
        dataFields: {object}
        traceType: {number}
        transducerType: {number}
        unit: {number}
        numberResolution: {number}
        resolutionFields: {object}
        numberTrace: {number}
        traceSample: {string}
    }

    dataField: {
        parameterID: {number}
        lenght: {number}
        dataType: {number}
        unit: {number}
        stepNumber: {number}
        dataValue: {string}
    }

    resolutionField:{
        firstIndex: {number}
        lastIndex: {number}
        length: {number}
        dataType: {number}
        unit: {number}
        timeValue: {string}
    }
*/

/**
 * @class
 * @name MID0900
 * @param {object} MID0900_1.payload REV. 1
 * @param {number} MID0900_1.payload.resultID
 * @param {string} MID0900_1.payload.timeStamp
 * @param {number} MID0900_1.payload.numberPID
 * @param {object} MID0900_1.payload.dataFields
 * @param {number} MID0900_1.payload.traceType
 * @param {number} MID0900_1.payload.transducerType
 * @param {number} MID0900_1.payload.unit
 * @param {number} MID0900_1.payload.numberResolution
 * @param {object} MID0900_1.payload.resolutionFields
 * @param {number} MID0900_1.payload.numberTrace
 * @param {string} MID0900_1.payload.traceSample

 * @param {object} MID0900_1.dataField
 * @param {number} MID0900_1.dataField.parameterID
 * @param {number} MID0900_1.dataField.lenght
 * @param {number} MID0900_1.dataField.dataType
 * @param {number} MID0900_1.dataField.unit
 * @param {number} MID0900_1.dataField.stepNumber
 * @param {string} MID0900_1.dataField.dataValue
 *
 * @param {object} MID0900_1.resolutionField
 * @param {number} MID0900_1.resolutionField.firstIndex
 * @param {number} MID0900_1.resolutionField.lastIndex
 * @param {number} MID0900_1.resolutionField.length
 * @param {number} MID0900_1.resolutionField.dataType
 * @param {number} MID0900_1.resolutionField.unit
 * @param {string} MID0900_2.resolutionField.timeValue
 */

const helpers = require("../helpers.js");
const testNul = helpers.testNul;
const processParser = helpers.processParser;
const serializerField = helpers.serializerField;
const processDataFields = helpers.processDataFields;
const processResolutionFields = helpers.processResolutionFields;
const processTraceSamples = helpers.processTraceSamples;

function parser(msg, opts, cb) {
  let buffer = msg.payload;
  msg.payload = {};

  let traceLength = buffer.length;

  var position = { value: 0 };

  switch (msg.revision) {
    case 1:
      processParser(msg, buffer, "resultID", "number", 10, position, cb) &&
        processParser(msg, buffer, "timeStamp", "string", 19, position, cb) &&
        processParser(msg, buffer, "numberPID", "number", 3, position, cb) &&
        processDataFields(
          msg,
          buffer,
          "fieldPID",
          msg.payload.numberPID,
          position,
          cb
        ) &&
        processParser(msg, buffer, "traceType", "number", 2, position, cb) &&
        processParser(
          msg,
          buffer,
          "transducerType",
          "number",
          2,
          position,
          cb
        ) &&
        processParser(msg, buffer, "unit", "string", 3, position, cb) &&
        processParser(msg, buffer, "numberData", "number", 3, position, cb) &&
        processDataFields(
          msg,
          buffer,
          "fieldData",
          msg.payload.numberData,
          position,
          cb
        ) &&
        processParser(
          msg,
          buffer,
          "numberResolution",
          "number",
          3,
          position,
          cb
        ) &&
        processResolutionFields(
          msg,
          buffer,
          "resolutionFields",
          msg.payload.numberResolution,
          position,
          cb
        ) &&
        processParser(msg, buffer, "numberTrace", "number", 5, position, cb) &&
        testNul(msg, buffer, "char nul", position, cb) &&
        processTraceSamples(
          msg,
          buffer,
          "sampleTrace",
          msg.payload.numberTrace,
          position,
          msg.payload.timeStamp,
          msg.payload.resolutionFields[0].timeValue,
          msg.payload.resolutionFields[0].unit,
          cb
        ) &&
        cb(null, msg);

      break;
  }
}

function serializer(msg, opts, cb) {
  let buf;
  let statusprocess = false;

  let position = {
    value: 0,
  };

  if (msg.isAck) {
    msg.mid = 5;
    let buf = Buffer.from("0900");
    msg.payload = buf;
    cb(null, msg);
    return;
  }

  msg.revision = msg.revision || 1;

  // Automatic subscription to last 3 curves: Angle, Torque and Current. Payload not needed.
  /* {
        msg.payload.midNumber = 0900;
        msg.payload.dataLength = 41;
        msg.payload.extraData = "00000000000000000000000000000003001002003";
        msg.payload.revision = 1;
        msg.payload.midNumber = 0900;
    }*/

  switch (msg.revision) {
    case 1:
      msg.mid = 8;

      // Automatic subscription to last 3 curves: Angle, Torque and Current. Payload not needed.
      if (
        (msg.payload.midNumber ||
          msg.payload.dataLength ||
          msg.payload.extraData ||
          msg.payload.revision) === undefined
      ) {
        buf = Buffer.from("09000014100000000000000000000000000000003001002003");
      } else {
        buf = Buffer.alloc(9 + msg.payload.dataLength);
        position.value = 9 + msg.payload.dataLength;
        statusprocess =
          serializerField(
            msg,
            buf,
            "extraData",
            "string",
            msg.payload.dataLength,
            position,
            cb
          ) &&
          serializerField(msg, buf, "dataLength", "number", 2, position, cb) &&
          serializerField(msg, buf, "revision", "number", 3, position, cb) &&
          serializerField(msg, buf, "midNumber", "number", 4, position, cb);

        if (!statusprocess) {
          return;
        }
      }

      msg.payload = buf;

      cb(null, msg);

      break;

    default:
      cb(
        new Error(
          `[Serializer MID${msg.mid}] invalid revision [${msg.revision}]`
        )
      );
      break;
  }
}

function revision() {
  return [1];
}

module.exports = {
  parser,
  serializer,
  revision,
};
