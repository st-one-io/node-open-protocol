//@ts-check
/*
  Copyright: (c) 2018-2020, Smart-Tech Controle e Automação
  GNU General Public License v3.0+ (see LICENSE or https://www.gnu.org/licenses/gpl-3.0.txt)
*/

/**
 * @name MID0002
 * @class
 * @param {object} MID0002 
 * @param {number} MID0002.cellID
 * @param {number} MID0002.channelID
 * @param {string} MID0002.controllerName
 * @param {string} MID0002.supplierCode
 * @param {string} MID0002.openProtocolVersion
 * @param {string} MID0002.controllerSoftwareVersion
 * @param {string} MID0002.toolSoftwareVersion
 * @param {string} MID0002.rbuType
 * @param {string} MID0002.controllerSerialNumber
 * @param {number} MID0002.systemType
 * @param {number} MID0002.systemSubtype
 * @param {number} MID0002.sequenceNumberSupport
 * @param {number} MID0002.linkingHandlingSupport
 * @param {string} MID0002.stationID
 * @param {string} MID0002.stationName
 * @param {number} MID0002.clientID
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
        case 6:
            processKey(msg, buffer, "cellID", 1, 2, position, cb) &&
                processParser(msg, buffer, "cellID", "number", 4, position, cb) &&
                processKey(msg, buffer, "channelID", 2, 2, position, cb) &&
                processParser(msg, buffer, "channelID", "number", 2, position, cb) &&
                processKey(msg, buffer, "controllerName", 3, 2, position, cb) &&
                processParser(msg, buffer, "controllerName", "string", 25, position, cb) &&
                processKey(msg, buffer, "supplierCode", 4, 2, position, cb) &&
                processParser(msg, buffer, "supplierCode", "string", 3, position, cb) &&
                processKey(msg, buffer, "openProtocolVersion", 5, 2, position, cb) &&
                processParser(msg, buffer, "openProtocolVersion", "string", 19, position, cb) &&
                processKey(msg, buffer, "controllerSoftwareVersion", 6, 2, position, cb) &&
                processParser(msg, buffer, "controllerSoftwareVersion", "string", 19, position, cb) &&
                processKey(msg, buffer, "toolSoftwareVersion", 7, 2, position, cb) &&
                processParser(msg, buffer, "toolSoftwareVersion", "string", 19, position, cb) &&
                processKey(msg, buffer, "rbuType", 8, 2, position, cb) &&
                processParser(msg, buffer, "rbuType", "string", 24, position, cb) &&
                processKey(msg, buffer, "controllerSerialNumber", 9, 2, position, cb) &&
                processParser(msg, buffer, "controllerSerialNumber", "string", 10, position, cb) &&
                processKey(msg, buffer, "systemType", 10, 2, position, cb) &&
                processParser(msg, buffer, "systemType", "number", 3, position, cb) &&
                processKey(msg, buffer, "systemSubtype", 11, 2, position, cb) &&
                processParser(msg, buffer, "systemSubtype", "number", 3, position, cb) &&
                processKey(msg, buffer, "sequenceNumberSupport", 12, 2, position, cb) &&
                processParser(msg, buffer, "sequenceNumberSupport", "number", 1, position, cb) &&
                processKey(msg, buffer, "linkingHandlingSupport", 13, 2, position, cb) &&
                processParser(msg, buffer, "linkingHandlingSupport", "number", 1, position, cb) &&
                processKey(msg, buffer, "stationID", 14, 2, position, cb) &&
                processParser(msg, buffer, "stationID", "number", 10, position, cb) &&
                processKey(msg, buffer, "stationName", 15, 2, position, cb) &&
                processParser(msg, buffer, "stationName", "string", 25, position, cb) &&
                processKey(msg, buffer, "clientID", 16, 2, position, cb) &&
                processParser(msg, buffer, "clientID", "number", 1, position, cb) &&
                cb(null, msg);
            break;

        case 5:
            processKey(msg, buffer, "cellID", 1, 2, position, cb) &&
                processParser(msg, buffer, "cellID", "number", 4, position, cb) &&
                processKey(msg, buffer, "channelID", 2, 2, position, cb) &&
                processParser(msg, buffer, "channelID", "number", 2, position, cb) &&
                processKey(msg, buffer, "controllerName", 3, 2, position, cb) &&
                processParser(msg, buffer, "controllerName", "string", 25, position, cb) &&
                processKey(msg, buffer, "supplierCode", 4, 2, position, cb) &&
                processParser(msg, buffer, "supplierCode", "string", 3, position, cb) &&
                processKey(msg, buffer, "openProtocolVersion", 5, 2, position, cb) &&
                processParser(msg, buffer, "openProtocolVersion", "string", 19, position, cb) &&
                processKey(msg, buffer, "controllerSoftwareVersion", 6, 2, position, cb) &&
                processParser(msg, buffer, "controllerSoftwareVersion", "string", 19, position, cb) &&
                processKey(msg, buffer, "toolSoftwareVersion", 7, 2, position, cb) &&
                processParser(msg, buffer, "toolSoftwareVersion", "string", 19, position, cb) &&
                processKey(msg, buffer, "rbuType", 8, 2, position, cb) &&
                processParser(msg, buffer, "rbuType", "string", 24, position, cb) &&
                processKey(msg, buffer, "controllerSerialNumber", 9, 2, position, cb) &&
                processParser(msg, buffer, "controllerSerialNumber", "string", 10, position, cb) &&
                processKey(msg, buffer, "systemType", 10, 2, position, cb) &&
                processParser(msg, buffer, "systemType", "number", 3, position, cb) &&
                processKey(msg, buffer, "systemSubtype", 11, 2, position, cb) &&
                processParser(msg, buffer, "systemSubtype", "number", 3, position, cb) &&
                cb(null, msg);
            break;

        case 4:
            processKey(msg, buffer, "cellID", 1, 2, position, cb) &&
                processParser(msg, buffer, "cellID", "number", 4, position, cb) &&
                processKey(msg, buffer, "channelID", 2, 2, position, cb) &&
                processParser(msg, buffer, "channelID", "number", 2, position, cb) &&
                processKey(msg, buffer, "controllerName", 3, 2, position, cb) &&
                processParser(msg, buffer, "controllerName", "string", 25, position, cb) &&
                processKey(msg, buffer, "supplierCode", 4, 2, position, cb) &&
                processParser(msg, buffer, "supplierCode", "string", 3, position, cb) &&
                processKey(msg, buffer, "openProtocolVersion", 5, 2, position, cb) &&
                processParser(msg, buffer, "openProtocolVersion", "string", 19, position, cb) &&
                processKey(msg, buffer, "controllerSoftwareVersion", 6, 2, position, cb) &&
                processParser(msg, buffer, "controllerSoftwareVersion", "string", 19, position, cb) &&
                processKey(msg, buffer, "toolSoftwareVersion", 7, 2, position, cb) &&
                processParser(msg, buffer, "toolSoftwareVersion", "string", 19, position, cb) &&
                processKey(msg, buffer, "rbuType", 8, 2, position, cb) &&
                processParser(msg, buffer, "rbuType", "string", 24, position, cb) &&
                processKey(msg, buffer, "controllerSerialNumber", 9, 2, position, cb) &&
                processParser(msg, buffer, "controllerSerialNumber", "string", 10, position, cb) &&
                cb(null, msg);
            break;

        case 3:
            processKey(msg, buffer, "cellID", 1, 2, position, cb) &&
                processParser(msg, buffer, "cellID", "number", 4, position, cb) &&
                processKey(msg, buffer, "channelID", 2, 2, position, cb) &&
                processParser(msg, buffer, "channelID", "number", 2, position, cb) &&
                processKey(msg, buffer, "controllerName", 3, 2, position, cb) &&
                processParser(msg, buffer, "controllerName", "string", 25, position, cb) &&
                processKey(msg, buffer, "supplierCode", 4, 2, position, cb) &&
                processParser(msg, buffer, "supplierCode", "string", 3, position, cb) &&
                processKey(msg, buffer, "openProtocolVersion", 5, 2, position, cb) &&
                processParser(msg, buffer, "openProtocolVersion", "string", 19, position, cb) &&
                processKey(msg, buffer, "controllerSoftwareVersion", 6, 2, position, cb) &&
                processParser(msg, buffer, "controllerSoftwareVersion", "string", 19, position, cb) &&
                processKey(msg, buffer, "toolSoftwareVersion", 7, 2, position, cb) &&
                processParser(msg, buffer, "toolSoftwareVersion", "string", 19, position, cb) &&
                cb(null, msg);
            break;

        case 2:
            processKey(msg, buffer, "cellID", 1, 2, position, cb) &&
                processParser(msg, buffer, "cellID", "number", 4, position, cb) &&
                processKey(msg, buffer, "channelID", 2, 2, position, cb) &&
                processParser(msg, buffer, "channelID", "number", 2, position, cb) &&
                processKey(msg, buffer, "controllerName", 3, 2, position, cb) &&
                processParser(msg, buffer, "controllerName", "string", 25, position, cb) &&
                processKey(msg, buffer, "supplierCode", 4, 2, position, cb) &&
                processParser(msg, buffer, "supplierCode", "string", 3, position, cb) &&
                cb(null, msg);
            break;

        case 1:
            processKey(msg, buffer, "cellID", 1, 2, position, cb) &&
                processParser(msg, buffer, "cellID", "number", 4, position, cb) &&
                processKey(msg, buffer, "channelID", 2, 2, position, cb) &&
                processParser(msg, buffer, "channelID", "number", 2, position, cb) &&
                processKey(msg, buffer, "controllerName", 3, 2, position, cb) &&
                processParser(msg, buffer, "controllerName", "string", 25, position, cb) &&
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

        case 6:

            buf = Buffer.alloc(201);

            position.value = 201;

            statusprocess =
                serializerField(msg, buf, "clientID", "number", 1, position, cb) &&
                serializerKey(msg, buf, 16, 2, position, cb) &&
                serializerField(msg, buf, "stationName", "string", 25, position, cb) &&
                serializerKey(msg, buf, 15, 2, position, cb) &&
                serializerField(msg, buf, "stationID", "number", 10, position, cb) &&
                serializerKey(msg, buf, 14, 2, position, cb) &&
                serializerField(msg, buf, "linkingHandlingSupport", "number", 1, position, cb) &&
                serializerKey(msg, buf, 13, 2, position, cb) &&
                serializerField(msg, buf, "sequenceNumberSupport", "number", 1, position, cb) &&
                serializerKey(msg, buf, 12, 2, position, cb);

        case 5:

            if (buf === undefined) {
                statusprocess = true;
                buf = Buffer.alloc(153);
                position.value = 153;
            }

            if (!statusprocess) {
                return;
            }

            statusprocess =
                serializerField(msg, buf, "systemSubtype", "number", 3, position, cb) &&
                serializerKey(msg, buf, 11, 2, position, cb) &&
                serializerField(msg, buf, "systemType", "number", 3, position, cb) &&
                serializerKey(msg, buf, 10, 2, position, cb);

        case 4:

            if (buf === undefined) {
                statusprocess = true;
                buf = Buffer.alloc(143);
                position.value = 143;
            }

            if (!statusprocess) {
                return;
            }

            statusprocess =
                serializerField(msg, buf, "controllerSerialNumber", "string", 10, position, cb) &&
                serializerKey(msg, buf, 9, 2, position, cb) &&
                serializerField(msg, buf, "rbuType", "string", 24, position, cb) &&
                serializerKey(msg, buf, 8, 2, position, cb);

        case 3:

            if (buf === undefined) {
                statusprocess = true;
                buf = Buffer.alloc(105);
                position.value = 105;
            }

            if (!statusprocess) {
                return;
            }

            statusprocess =
                serializerField(msg, buf, "toolSoftwareVersion", "string", 19, position, cb) &&
                serializerKey(msg, buf, 7, 2, position, cb) &&
                serializerField(msg, buf, "controllerSoftwareVersion", "string", 19, position, cb) &&
                serializerKey(msg, buf, 6, 2, position, cb) &&
                serializerField(msg, buf, "openProtocolVersion", "string", 19, position, cb) &&
                serializerKey(msg, buf, 5, 2, position, cb);

        case 2:

            if (buf === undefined) {
                statusprocess = true;
                buf = Buffer.alloc(42);
                position.value = 42;
            }

            if (!statusprocess) {
                return;
            }

            statusprocess =
                serializerField(msg, buf, "supplierCode", "string", 3, position, cb) &&
                serializerKey(msg, buf, 4, 2, position, cb);

        case 1:

            if (buf === undefined) {
                statusprocess = true;
                buf = Buffer.alloc(37);
                position.value = 37;
            }

            if (!statusprocess) {
                return;
            }

            statusprocess =
                serializerField(msg, buf, "controllerName", "string", 25, position, cb) &&
                serializerKey(msg, buf, 3, 2, position, cb) &&
                serializerField(msg, buf, "channelID", "number", 2, position, cb) &&
                serializerKey(msg, buf, 2, 2, position, cb) &&
                serializerField(msg, buf, "cellID", "number", 4, position, cb) &&
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
    return [6, 5, 4, 3, 2, 1];
}

module.exports = {
    parser,
    serializer,
    revision
};