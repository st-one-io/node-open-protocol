//@ts-check
/*
  Copyright: (c) 2018-2020, Smart-Tech Controle e Automação
  GNU General Public License v3.0+ (see LICENSE or https://www.gnu.org/licenses/gpl-3.0.txt)
*/

/**
 * @class
 * @name MID0052
 * @param {object} MID0052
 * @param {string} MID0052.numberVIN
 * @param {string} MID0052.identifierPart2
 * @param {string} MID0052.identifierPart3
 * @param {string} MID0052.identifierPart4
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
            processKey(msg, buffer, "numberVIN", 1, 2, position, cb) &&
                processParser(msg, buffer, "numberVIN", "rawString", 25, position, cb) &&
                processKey(msg, buffer, "identifierPart2", 2, 2, position, cb) &&
                processParser(msg, buffer, "identifierPart2", "string", 25, position, cb) &&
                processKey(msg, buffer, "identifierPart3", 3, 2, position, cb) &&
                processParser(msg, buffer, "identifierPart3", "string", 25, position, cb) &&
                processKey(msg, buffer, "identifierPart4", 4, 2, position, cb) &&
                processParser(msg, buffer, "identifierPart4", "string", 25, position, cb) &&
                cb(null, msg);
            break;

        case 1:
            processParser(msg, buffer, "numberVIN", "rawString", 25, position, cb) &&
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

            buf = Buffer.alloc(108);

            position.value = 108;

            statusprocess =
                serializerField(msg, buf, "identifierPart4", "string", 25, position, cb) &&
                serializerKey(msg, buf, 4, 2, position, cb) &&

                serializerField(msg, buf, "identifierPart3", "string", 25, position, cb) &&
                serializerKey(msg, buf, 3, 2, position, cb) &&

                serializerField(msg, buf, "identifierPart2", "string", 25, position, cb) &&
                serializerKey(msg, buf, 2, 2, position, cb) &&

                serializerField(msg, buf, "numberVIN", "rawString", 25, position, cb) &&
                serializerKey(msg, buf, 1, 2, position, cb);

            if (!statusprocess) {
                return;
            }

            msg.payload = buf;

            cb(null, msg);

            break;

        case 1:

            buf = Buffer.alloc(25);

            position.value = 25;

            statusprocess = serializerField(msg, buf, "numberVIN", "rawString", 25, position, cb);

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