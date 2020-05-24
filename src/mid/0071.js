//@ts-check
/*
  Copyright: (c) 2018-2020, Smart-Tech Controle e Automação
  GNU General Public License v3.0+ (see LICENSE or https://www.gnu.org/licenses/gpl-3.0.txt)
*/

/**
 * @class
 * @name MID0071
 * @param {object} MID0071_1 REV. 1
 * @param {string} MID0071_1.errorCode
 * @param {number} MID0071_1.controllerReadyStatus
 * @param {number} MID0071_1.toolReadyStatus
 * @param {string} MID0071_1.timeStamp
 * 
 * @param {object} MID0071_2 REV. 2 [(REV. 1) +]
 * @param {string} MID0071_2.alarmText
 * 
 */

const helpers = require("../helpers.js");
const processParser = helpers.processParser;
const processKey = helpers.processKey;
const serializerField = helpers.serializerField;
const serializerKey = helpers.serializerKey;

function parser(msg, opts, cb) {

    let buffer = msg.payload;
    msg.payload = {};

    let position = {
        value: 0
    };

    msg.revision = msg.revision || 1;

    switch (msg.revision) {
        case 2:
            processKey(msg, buffer, "errorCode", 1, 2, position, cb) &&
                processParser(msg, buffer, "errorCode", "string", 5, position, cb) &&
                processKey(msg, buffer, "controllerReadyStatus", 2, 2, position, cb) &&
                processParser(msg, buffer, "controllerReadyStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "toolReadyStatus", 3, 2, position, cb) &&
                processParser(msg, buffer, "toolReadyStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "timeStamp", 4, 2, position, cb) &&
                processParser(msg, buffer, "timeStamp", "string", 19, position, cb) &&
                processKey(msg, buffer, "alarmText", 5, 2, position, cb) &&
                processParser(msg, buffer, "alarmText", "string", 50, position, cb) &&
                cb(null, msg);
            break;

        case 1:
            processKey(msg, buffer, "errorCode", 1, 2, position, cb) &&
                processParser(msg, buffer, "errorCode", "string", 4, position, cb) &&
                processKey(msg, buffer, "controllerReadyStatus", 2, 2, position, cb) &&
                processParser(msg, buffer, "controllerReadyStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "toolReadyStatus", 3, 2, position, cb) &&
                processParser(msg, buffer, "toolReadyStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "timeStamp", 4, 2, position, cb) &&
                processParser(msg, buffer, "timeStamp", "string", 19, position, cb) &&
                cb(null, msg);
            break;

        default:
            cb(new Error(`[Parser MID${msg.mid}] invalid revision [${msg.revision}]`));
            break;
    }
}

function serializer(msg, opts, cb) {

    let buf;
    let statusprocess = false;

    let position = {
        value: 0
    };

    msg.revision = msg.revision || 1;

    switch (msg.revision) {

        case 2:

            buf = Buffer.alloc(86);

            position.value = 86;

            statusprocess =
                serializerField(msg, buf, "alarmText", "string", 50, position, cb) &&
                serializerKey(msg, buf, 5, 2, position, cb) &&
                serializerField(msg, buf, "timeStamp", "string", 19, position, cb) &&
                serializerKey(msg, buf, 4, 2, position, cb) &&
                serializerField(msg, buf, "toolReadyStatus", "number", 1, position, cb) &&
                serializerKey(msg, buf, 3, 2, position, cb) &&
                serializerField(msg, buf, "controllerReadyStatus", "number", 1, position, cb) &&
                serializerKey(msg, buf, 2, 2, position, cb) &&
                serializerField(msg, buf, "errorCode", "string", 5, position, cb) &&
                serializerKey(msg, buf, 1, 2, position, cb);

            if (!statusprocess) {
                return;
            }

            msg.payload = buf;

            cb(null, msg);

            break;

        case 1:

            buf = Buffer.alloc(33);

            position.value = 33;

            statusprocess =
                serializerField(msg, buf, "timeStamp", "string", 19, position, cb) &&
                serializerKey(msg, buf, 4, 2, position, cb) &&
                serializerField(msg, buf, "toolReadyStatus", "number", 1, position, cb) &&
                serializerKey(msg, buf, 3, 2, position, cb) &&
                serializerField(msg, buf, "controllerReadyStatus", "number", 1, position, cb) &&
                serializerKey(msg, buf, 2, 2, position, cb) &&
                serializerField(msg, buf, "errorCode", "string", 4, position, cb) &&
                serializerKey(msg, buf, 1, 2, position, cb);

            if (!statusprocess) {
                return;
            }

            msg.payload = buf;

            cb(null, msg);

            break;

        default:
            cb(new Error(`[Serializer MID${msg.mid}] invalid revision [${msg.revision}]`));
            break;
    }
}

function revision() {
    return [2, 1];
}

module.exports = {
    parser,
    serializer,
    revision
};