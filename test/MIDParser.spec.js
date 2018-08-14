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

const MIDParser = require('../src/MIDParser.js');

describe("MIDParser", () => {

    it("parser MID0002-1 with exists parser", (done) => {

        let msg = {
            mid: 2,
            revision: 1,
            noAck: false,
            stationID: 1,
            spindleID: 1,
            sequenceNumber: 0,
            messageParts: 0,
            messageNumber: 0,
            payload: Buffer.from("010001020103Teste Airbag             ")
        };

        let parser = new MIDParser();

        parser.on('data', (data) => {
            expect(data).to.be.deep.equal({
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
            });
            done();
        });

        parser.write(msg);
    });

    it("parser MID0002-1 with exists parser error", (done) => {

        let msg = {
            mid: 2,
            revision: 2,
            noAck: false,
            stationID: 1,
            spindleID: 1,
            sequenceNumber: 0,
            messageParts: 0,
            messageNumber: 0,
            payload: Buffer.from("010001020103Teste Airbag             ")
        };

        let parser = new MIDParser();

        parser.on('error', (err) => {
            expect(err).to.be.an('error');
            done();
        });

        parser.write(msg);
    });

    it("parser MID5555-1 without exists parser", (done) => {

        let msg = {
            mid: 5555,
            revision: 1,
            noAck: false,
            stationID: 1,
            spindleID: 1,
            sequenceNumber: 0,
            messageParts: 0,
            messageNumber: 0,
            payload: Buffer.from("Teste de Validacao       ")
        };

        let parser = new MIDParser();

        parser.on('data', (data) => {
            expect(data).to.be.deep.equal({
                mid: 5555,
                revision: 1,
                noAck: false,
                stationID: 1,
                spindleID: 1,
                sequenceNumber: 0,
                messageParts: 0,
                messageNumber: 0,
                payload: "Teste de Validacao       "
            });
            done();
        });

        parser.write(msg);
    });

    it("parser MID5555-1 without exists parser error", (done) => {

        let msg = {
            mid: 5555,
            revision: 1,
            noAck: false,
            stationID: 1,
            spindleID: 1,
            sequenceNumber: 0,
            messageParts: 0,
            messageNumber: 0,
            payload: "Teste de Validacao       "
        };

        let parser = new MIDParser();

        parser.on('error', (err) => {
            expect(err).to.be.an('error');
            done();
        });

        parser.write(msg);
    });

});