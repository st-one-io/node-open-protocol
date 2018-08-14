/*
   Copyright 2018 Smart-Tech Controle e Automação

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
"use strict";
/*jshint esversion: 6, node: true*/

/**
 * @class
 * @name MID9998
 * @param {object} MID9998
 * @param {number} MID9998.midNumber
 * @param {number} MID9998.errorCode
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
                processParser(msg, buffer, "errorCode", "number", 4, position, cb) &&
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

            buf = Buffer.alloc(8);

            position.value = 8;

            statusprocess =
                serializerField(msg, buf, "errorCode", "number", 4, position, cb) &&
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