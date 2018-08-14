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
/*jshint esversion: 6, node: true*/

"use strict";

const {
    expect
} = require('chai');

const OpenProtocolSerializer = require('../src/openProtocolSerializer.js');

const Stream = require('stream');

describe("Open Protocol Serializer", () => {

    it('should be a stream', () => {
        expect(new OpenProtocolSerializer()).to.be.instanceOf(Stream);
    });

    it('should create a new instance', () => {
        expect(new OpenProtocolSerializer).to.be.instanceOf(Stream);
    });

    it('should emit an error when input is not a object', (done) => {
        let serializer = new OpenProtocolSerializer();
        serializer.on('error', (err) => {
            expect(err).to.be.an('error');
            done();
        });

        serializer.write(Buffer.from("test"));
    });

    it('should parse normally when the input is a object', (done) => {
        let serializer = new OpenProtocolSerializer();
        serializer.on('data', (data) => {
            expect(data).to.be.deep.equal(Buffer.from('0022024000100101000020\u0000'));
            done();
        });

        //0022024000100101000020[Null]

        serializer.write({
            mid: 240,
            revision: 1,
            noAck: false,
            stationID: 1,
            spindleID: 1,
            sequenceNumber: 0,
            messageParts: 0,
            messageNumber: 0,
            payload: Buffer.from("20")
        });
    });

    it('should emit an error when input is a object with wrong mid', (done) => {
        let serializer = new OpenProtocolSerializer();
        serializer.on('error', (err) => {
            expect(err).to.be.an('error');
            done();
        });

        serializer.write({
            mid: "aaaa",
            revision: 2,
            noAck: false,
            stationID: 1,
            spindleID: 1,
            sequenceNumber: 0,
            messageParts: 0,
            messageNumber: 0,
            payload: Buffer.from("20")
        });
    });

    it('should emit an error when input is a object with wrong revision', (done) => {
        let serializer = new OpenProtocolSerializer();
        serializer.on('error', (err) => {
            expect(err).to.be.an('error');
            done();
        });

        serializer.write({
            mid: 240,
            revision: "aaa",
            noAck: false,
            stationID: 1,
            spindleID: 1,
            sequenceNumber: 0,
            messageParts: 0,
            messageNumber: 0,
            payload: Buffer.from("20")
        });
    });
    

    
    it('should emit an error when input is a object with wrong stationID', (done) => {
        let serializer = new OpenProtocolSerializer();
        serializer.on('error', (err) => {
            expect(err).to.be.an('error');
            done();
        });

        serializer.write({
            mid: 240,
            revision: 1,
            noAck: false,
            stationID: "a",
            spindleID: 1,
            sequenceNumber: 0,
            messageParts: 0,
            messageNumber: 0,
            payload: Buffer.from("20")
        });
    });

    it('should emit an error when input is a object with wrong spindleID', (done) => {
        let serializer = new OpenProtocolSerializer();
        serializer.on('error', (err) => {
            expect(err).to.be.an('error');
            done();
        });

        serializer.write({
            mid: 240,
            revision: 1,
            noAck: false,
            stationID: 1,
            spindleID: "a",
            sequenceNumber: 0,
            messageParts: 0,
            messageNumber: 0,
            payload: Buffer.from("20")
        });
    });

    it('should emit an error when input is a object with wrong sequenceNumber', (done) => {
        let serializer = new OpenProtocolSerializer();
        serializer.on('error', (err) => {
            expect(err).to.be.an('error');
            done();
        });

        serializer.write({
            mid: 240,
            revision: 1,
            noAck: false,
            stationID: 1,
            spindleID: 1,
            sequenceNumber: "a",
            messageParts: 0,
            messageNumber: 0,
            payload: Buffer.from("20")
        });
    });

    it('should emit an error when input is a object with wrong messageParts', (done) => {
        let serializer = new OpenProtocolSerializer();
        serializer.on('error', (err) => {
            expect(err).to.be.an('error');
            done();
        });

        serializer.write({
            mid: 240,
            revision: 1,
            noAck: false,
            stationID: 1,
            spindleID: 1,
            sequenceNumber: 0,
            messageParts: "a",
            messageNumber: 0,
            payload: Buffer.from("20")
        });
    });

    it('should emit an error when input is a object with wrong messageNumber', (done) => {
        let serializer = new OpenProtocolSerializer();
        serializer.on('error', (err) => {
            expect(err).to.be.an('error');
            done();
        });

        serializer.write({
            mid: 240,
            revision: 1,
            noAck: false,
            stationID: 1,
            spindleID: 1,
            sequenceNumber: 0,
            messageParts: 0,
            messageNumber: "a",
            payload: Buffer.from("20")
        });
    });

    it('should emit an error when input is a object with wrong payload', (done) => {
        let serializer = new OpenProtocolSerializer();
        serializer.on('error', (err) => {
            expect(err).to.be.an('error');
            done();
        });

        serializer.write({
            mid: 240,
            revision: 1,
            noAck: false,
            stationID: 1,
            spindleID: 1,
            sequenceNumber: 0,
            messageParts: 0,
            messageNumber: 0,
            payload: 250
        });
    });

    it('should parse normally when the input is a object with spaces', (done) => {
        let serializer = new OpenProtocolSerializer();
        serializer.on('data', (data) => {
            expect(data).to.be.deep.equal(Buffer.from('00230240001001010000250\u0000'));
            done();
        });

        //0023024000100101000020[Null]

        serializer.write({
            mid: 240,
            revision: "   ",
            noAck: false,
            stationID: 1,
            spindleID: 1,
            sequenceNumber: "  ",
            messageParts: " ",
            messageNumber: " ",
            payload: "250"
        });
    });

});
