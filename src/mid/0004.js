//@ts-check
/*
  Copyright: (c) 2018-2020, Smart-Tech Controle e Automação
  GNU General Public License v3.0+ (see LICENSE or https://www.gnu.org/licenses/gpl-3.0.txt)
*/

/**
 * @name MID0004
 * @class
 * @param {object} MID0004 
 * @param {number} MID0004.midNumber
 * @param {number} MID0004.errorCode
 */

const helpers = require("../helpers.js");
const processParser = helpers.processParser;
const serializerField = helpers.serializerField;

function parser(msg, opts, cb) {

    let buffer = msg.payload;
    msg.payload = {};

    let position = {
        value: 0
    };

    msg.revision = msg.revision || 1;

    switch (msg.revision) {
        case 1:
            processParser(msg, buffer, "midNumber", "number", 4, position, cb) &&
                processParser(msg, buffer, "errorCode", "number", 2, position, cb) &&
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
        case 1:
            buf = Buffer.alloc(6);

            position.value = 6;

            statusprocess = serializerField(msg, buf, "errorCode", "number", 2, position, cb) &&
                serializerField(msg, buf, "midNumber", "number", 4, position, cb);

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
    return [1];
}

module.exports = {
    parser,
    serializer,
    revision
};