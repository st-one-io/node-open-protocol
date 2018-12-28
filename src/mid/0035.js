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
const helpers = require("../helpers.js");
const processParser = helpers.processParser;
const processKey = helpers.processKey;

const rev1Keys = [
    ['jobID', 'number', 2],
    ['jobStatus', 'number', 1],
    ['jobBatchMode', 'number', 1],
    ['jobBatchSize', 'number', 4],
    ['jobBatchCounter', 'number', 4],
    ['timeStamp', 'string', 19]
];

const rev2Keys = [
    ['jobID', 'number', 4],
    ['jobStatus', 'number', 1],
    ['jobBatchMode', 'number', 1],
    ['jobBatchSize', 'number', 4],
    ['jobBatchCounter', 'number', 4],
    ['timeStamp', 'string', 19]
];

const rev3Keys = [
    ['jobID', 'number', 4],
    ['jobStatus', 'number', 1],
    ['jobBatchMode', 'number', 1],
    ['jobBatchSize', 'number', 4],
    ['jobBatchCounter', 'number', 4],
    ['timeStamp', 'string', 19],
    ['jobCurrentStep', 'number', 3],
    ['jobTotalSteps', 'number', 3],
    ['jobStepType', 'number', 2]
];

const rev4Keys = [
    ['jobID', 'number', 4],
    ['jobStatus', 'number', 1],
    ['jobBatchMode', 'number', 1],
    ['jobBatchSize', 'number', 4],
    ['jobBatchCounter', 'number', 4],
    ['timeStamp', 'string', 19],
    ['jobCurrentStep', 'number', 3],
    ['jobTotalSteps', 'number', 3],
    ['jobStepType', 'number', 2],
    ['jobTighteningStatus', 'number', 2]
];

const revisionKeys = [rev1Keys, rev2Keys, rev3Keys, rev4Keys];

function parser(msg, opts, cb) {
    let buffer = msg.payload;
    msg.payload = {};

    let status = true;

    let position = {
        value: 0
    };

    let revision = msg.revision || 1;

    const keys = revisionKeys[revision - 1];

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        status =
            status &&
            processKey(msg, buffer, key[0], i + 1, 2, position, cb) &&
            processParser(msg, buffer, key[0], key[1], key[2], position, cb);
    }

    if (status) {
        cb(null, msg);
    }
}

function serializer(msg, opts, cb) {
    let buf = Buffer.from("");
    msg.payload = buf;
    cb(null, msg);
}

function revision() {
    return [1, 2, 3, 4, 5];
}

module.exports = {
    parser,
    serializer,
    revision
};
