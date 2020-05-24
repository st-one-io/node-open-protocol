//@ts-check
/*
  Copyright: (c) 2018-2020, Smart-Tech Controle e Automação
  GNU General Public License v3.0+ (see LICENSE or https://www.gnu.org/licenses/gpl-3.0.txt)
*/

/**
 * @class
 * @name MID0064
 * @param {object} MID0064
 * @param {number} MID0064.tighteningID
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
        case 7:
        case 6:
        case 5:
        case 4:
        case 3:
        case 2:
        case 1:
            processParser(msg, buffer, "tighteningID", "number", 10, position, cb) &&
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

        case 7:
        case 6:
        case 5:
        case 4:
        case 3:
        case 2:
        case 1:

            buf = Buffer.alloc(10);

            position.value = 10;

            statusprocess = serializerField(msg, buf, "tighteningID", "number", 10, position, cb);

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
    return [7, 6, 5, 4, 3, 2, 1];
}

let params = {
    "1": [{
        name: "tighteningID",
        type: "string",
        desc: "10 ASCII digits"
    }],
    "2": [{
        name: "tighteningID",
        type: "string",
        desc: "10 ASCII digits"
    }],
    "3": [{
        name: "tighteningID",
        type: "string",
        desc: "10 ASCII digits"
    }],
    "4": [{
        name: "tighteningID",
        type: "string",
        desc: "10 ASCII digits"
    }],
    "5": [{
        name: "tighteningID",
        type: "string",
        desc: "10 ASCII digits"
    }],
    "6": [{
        name: "tighteningID",
        type: "string",
        desc: "10 ASCII digits"
    }],
    "7": [{
        name: "tighteningID",
        type: "string",
        desc: "10 ASCII digits"
    }]
};

module.exports = {
    params,
    parser,
    serializer,
    revision
};