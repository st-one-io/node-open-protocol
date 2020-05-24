//@ts-check
/*
  Copyright: (c) 2018-2020, Smart-Tech Controle e Automação
  GNU General Public License v3.0+ (see LICENSE or https://www.gnu.org/licenses/gpl-3.0.txt)
*/  

/**
 * @name MID0015
 * @class
 * @param {object} MID0015
 * @param {number} MID0015.parameterSetID
 * @param {string} MID0015.dateLastChange
 * @param {string} MID0015.parameterSetName
 * @param {number} MID0015.rotationDirection
 * @param {number} MID0015.batchSize
 * @param {number} MID0015.torqueMin
 * @param {number} MID0015.torqueMax
 * @param {number} MID0015.torqueTarget
 * @param {number} MID0015.angleMin
 * @param {number} MID0015.angleMax
 * @param {number} MID0015.angleTarget
 * @param {number} MID0015.firstTarget
 * @param {number} MID0015.startFinalAngle 
 */

const helpers = require("../helpers.js");
const processParser = helpers.processParser;
const processKey = helpers.processKey;
const serializerKey = helpers.serializerKey;
const serializerField = helpers.serializerField;

function parser(msg, opts, cb) {

    let buffer = msg.payload;
    msg.payload = {};

    let position = {
        value: 0
    };

    msg.revision = msg.revision || 1;

    switch (msg.revision) {

        case 2:
            processKey(msg, buffer, "parameterSetID", 1, 2, position, cb) &&
                processParser(msg, buffer, "parameterSetID", "number", 3, position, cb) &&
                processKey(msg, buffer, "parameterSetName", 2, 2, position, cb) &&
                processParser(msg, buffer, "parameterSetName", "string", 25, position, cb) &&
                processKey(msg, buffer, "dateLastChange", 3, 2, position, cb) &&
                processParser(msg, buffer, "dateLastChange", "string", 19, position, cb) &&
                processKey(msg, buffer, "rotationDirection", 4, 2, position, cb) &&
                processParser(msg, buffer, "rotationDirection", "number", 1, position, cb) &&
                processKey(msg, buffer, "batchSize", 5, 2, position, cb) &&
                processParser(msg, buffer, "batchSize", "number", 2, position, cb) &&
                processKey(msg, buffer, "torqueMin", 6, 2, position, cb) &&
                processParser(msg, buffer, "torqueMin", "number", 6, position, cb) &&
                processKey(msg, buffer, "torqueMax", 7, 2, position, cb) &&
                processParser(msg, buffer, "torqueMax", "number", 6, position, cb) &&
                processKey(msg, buffer, "torqueTarget", 8, 2, position, cb) &&
                processParser(msg, buffer, "torqueTarget", "number", 6, position, cb) &&
                processKey(msg, buffer, "angleMin", 9, 2, position, cb) &&
                processParser(msg, buffer, "angleMin", "number", 5, position, cb) &&
                processKey(msg, buffer, "angleMax", 10, 2, position, cb) &&
                processParser(msg, buffer, "angleMax", "number", 5, position, cb) &&
                processKey(msg, buffer, "angleTarget", 11, 2, position, cb) &&
                processParser(msg, buffer, "angleTarget", "number", 5, position, cb) &&
                processKey(msg, buffer, "firstTarget", 12, 2, position, cb) &&
                processParser(msg, buffer, "firstTarget", "number", 6, position, cb) &&
                processKey(msg, buffer, "startFinalAngle", 13, 2, position, cb) &&
                processParser(msg, buffer, "startFinalAngle", "number", 6, position, cb) &&
                cb(null, msg);
            break;

        case 1:
            processParser(msg, buffer, "parameterSetID", "number", 3, position, cb) &&
                processParser(msg, buffer, "dateLastChange", "string", 19, position, cb) &&
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

            buf = Buffer.alloc(121);

            position.value = 121;

            statusprocess =
                serializerField(msg, buf, "startFinalAngle", "number", 6, position, cb) &&
                serializerKey(msg, buf, 13, 2, position, cb) &&
                serializerField(msg, buf, "firstTarget", "number", 6, position, cb) &&
                serializerKey(msg, buf, 12, 2, position, cb) &&
                serializerField(msg, buf, "angleTarget", "number", 5, position, cb) &&
                serializerKey(msg, buf, 11, 2, position, cb) &&
                serializerField(msg, buf, "angleMax", "number", 5, position, cb) &&
                serializerKey(msg, buf, 10, 2, position, cb) &&
                serializerField(msg, buf, "angleMin", "number", 5, position, cb) &&
                serializerKey(msg, buf, 9, 2, position, cb) &&
                serializerField(msg, buf, "torqueTarget", "number", 6, position, cb) &&
                serializerKey(msg, buf, 8, 2, position, cb) &&
                serializerField(msg, buf, "torqueMax", "number", 6, position, cb) &&
                serializerKey(msg, buf, 7, 2, position, cb) &&
                serializerField(msg, buf, "torqueMin", "number", 6, position, cb) &&
                serializerKey(msg, buf, 6, 2, position, cb) &&
                serializerField(msg, buf, "batchSize", "number", 2, position, cb) &&
                serializerKey(msg, buf, 5, 2, position, cb) &&
                serializerField(msg, buf, "rotationDirection", "number", 1, position, cb) &&
                serializerKey(msg, buf, 4, 2, position, cb) &&
                serializerField(msg, buf, "dateLastChange", "string", 19, position, cb) &&
                serializerKey(msg, buf, 3, 2, position, cb) &&
                serializerField(msg, buf, "parameterSetName", "string", 25, position, cb) &&
                serializerKey(msg, buf, 2, 2, position, cb) &&
                serializerField(msg, buf, "parameterSetID", "number", 3, position, cb) &&
                serializerKey(msg, buf, 1, 2, position, cb);

            if (!statusprocess) {
                return;
            }

            msg.payload = buf;

            cb(null, msg);

            break;

        case 1:

            buf = Buffer.alloc(22);

            position.value = 22;

            statusprocess =
                serializerField(msg, buf, "dateLastChange", "string", 19, position, cb) &&
                serializerField(msg, buf, "parameterSetID", "number", 3, position, cb);

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