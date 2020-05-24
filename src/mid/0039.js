//@ts-check
/*
  Copyright: (c) 2018-2020, Smart-Tech Controle e Automação
  GNU General Public License v3.0+ (see LICENSE or https://www.gnu.org/licenses/gpl-3.0.txt)
*/

/**
 * @class
 * @name MID0039
 * @param {object} MID0039
 * @param {number} MID0039.jobID
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

        case 2:
            processParser(msg, buffer, "jobID", "number", 4, position, cb) &&
                cb(null, msg);
            break;

        case 1:
            processParser(msg, buffer, "jobID", "number", 2, position, cb) &&
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

            buf = Buffer.alloc(4);

            position.value = 4;

            statusprocess = serializerField(msg, buf, "jobID", "number", 4, position, cb);

            if (!statusprocess) {
                return;
            }

            msg.payload = buf;

            cb(null, msg);

            break;

        case 1:

            buf = Buffer.alloc(2);

            position.value = 2;

            statusprocess = serializerField(msg, buf, "jobID", "number", 2, position, cb);

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

let params = {
    "1": [{
        name: "jobID",
        type: "number",
        desc: "0 - 99"
    }],
    "2": [{
        name: "jobID",
        type: "number",
        desc: "0 - 9999"
    }]
};

module.exports = {
    params,
    parser,
    serializer,
    revision
};