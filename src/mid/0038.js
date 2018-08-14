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
 * @name MID0038
 * @param {object} MID0038
 * @param {number} MID0038.jobID
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