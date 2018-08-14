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
/*jshint esversion: 6, node: true */

"use strict";

const OpenProtocolParser = require("./src/openProtocolParser.js");
const OpenProtocalSerializer = require("./src/openProtocolSerializer.js");
const MIDParser = require("./src/MIDParser.js");
const MIDSerializer = require("./src/MIDSerializer.js");
const helpers = require("./src/helpers.js");
const SessionControlClient = require("./src/sessionControlClient.js");

const midGroups = require ("./src/midGroups.json");
const midCommand = require("./src/midCommand.json");
const midrequest = require("./src/midRequest.json");

const net = require("net");

function createClient(port, host, opts, connectionListener){

    if (connectionListener === undefined) {
        if (typeof opts === "function") {
            connectionListener = opts;
            opts = {};
        } else {
            connectionListener = () => {};
        }
    }
   
    opts = opts || {};

    let socket = net.createConnection(port, host, () =>{
        client.connect(connectionListener);
    });

    opts.stream = socket;

    let client = new SessionControlClient(opts);

    return client;
} 

module.exports = {
    constants: {
        subscribes: midGroups,
        commands: midCommand,
        requests: midrequest
    },
    OpenProtocolParser, 
    OpenProtocalSerializer,
    SessionControlClient,
    MIDParser,
    MIDSerializer,
    helpers,
    createClient
};