//@ts-check
/*
  Copyright: (c) 2018-2020, Smart-Tech Controle e Automação
  GNU General Public License v3.0+ (see LICENSE or https://www.gnu.org/licenses/gpl-3.0.txt)
*/

/**
 * @class
 * @name MID0019
 * @param {object} MID0019
 * @param {number} MID0019.parameterSetID
 * @param {number} MID0019.batchSize
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
            processParser(msg, buffer, "parameterSetID", "number", 3, position, cb) &&
                processParser(msg, buffer, "batchSize", "number", 2, position, cb) &&
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

            buf = Buffer.alloc(5);

            position.value = 5;

            statusprocess =
                serializerField(msg, buf, "batchSize", "number", 2, position, cb) &&
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
    return [1];
}

let params = {
    "1": [{
            name: "parameterSetID",
            type: "number",
            desc: "0 - 999"
        },
        {
            name: "batchSize",
            type: "number",
            desc: "0 - 99"
        }
    ]
};

module.exports = {
    params,
    parser,
    serializer,
    revision
};