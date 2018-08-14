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

const {
    expect
} = require('chai');

const MIDSerializer = require('../src/MIDSerializer.js');

describe("MIDSerializer", () => {

    it("Serializer MID0002-1 with exists serializer", (done) => {

        let msg = {
            mid: 2,
            revision: 1,
            noAck: false,
            stationID: 1,
            spindleID: 1,
            sequenceNumber: 0,
            messageParts: 0,
            messageNumber: 0,
            payload: {
                cellID: 1,
                channelID: 1,
                controllerName: "Teste Airbag"
            }
        };

        let serializer = new MIDSerializer();

        serializer.on('data', (data) => {
            expect(data).to.be.deep.equal({
                mid: 2,
                revision: 1,
                noAck: false,
                stationID: 1,
                spindleID: 1,
                sequenceNumber: 0,
                messageParts: 0,
                messageNumber: 0,
                payload: Buffer.from("010001020103Teste Airbag             ")
            });
            done();
        });

        serializer.write(msg);
    });

    it("Serializer MID0002-1 with exists serializer error", (done) => {

        let msg = {
            mid: 2,
            revision: 2,
            noAck: false,
            stationID: 1,
            spindleID: 1,
            sequenceNumber: 0,
            messageParts: 0,
            messageNumber: 0,
            payload: {
                cellID: 1,
                channelID: 1,
                controllerName: "Teste Airbag"
            }
        };

        let serializer = new MIDSerializer();

        serializer.on('error', (err) => {
            expect(err).to.be.an('error');
            done();
        });

        serializer.write(msg);
    });

    it("Serializer MID5555-1 without exists serializer", (done) => {

        let msg = {
            mid: 5555,
            revision: 1,
            noAck: false,
            stationID: 1,
            spindleID: 1,
            sequenceNumber: 0,
            messageParts: 0,
            messageNumber: 0,
            payload: "Teste Airbag"
        };

        let serializer = new MIDSerializer();

        serializer.on('data', (data) => {
            expect(data).to.be.deep.equal({
                mid: 5555,
                revision: 1,
                noAck: false,
                stationID: 1,
                spindleID: 1,
                sequenceNumber: 0,
                messageParts: 0,
                messageNumber: 0,
                payload: Buffer.from("Teste Airbag")
            });
            done();
        });

        serializer.write(msg);
    });

    it("Serializer MID5555-1 without exists serializer error", (done) => {

        let msg = {
            mid: 5555,
            revision: 1,
            noAck: false,
            stationID: 1,
            spindleID: 1,
            sequenceNumber: 0,
            messageParts: 0,
            messageNumber: 0,
            payload: {
                text: "Teste Airbag"
            }
        };

        let serializer = new MIDSerializer();

        serializer.on('error', (err) => {
            expect(err).to.be.an('error');
            done();
        });

        serializer.write(msg);
    });


});