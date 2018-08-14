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

const net = require("net");

const SessionControlClient = require("../src/sessionControlClient.js");
const Duplex = require('stream').Duplex;

function createStreamHelper(cbWrite) {
    let stream = new Duplex({
        read(size) {

        },
        write(chunk, encoding, cb) {
            cbWrite(chunk);
            cb();
        }
    });
    return stream;
}

describe("Session Control Client", () => {

    it("Should event connect with revision = 1", (done) => {

        let step = 0;

        let stream = createStreamHelper((data) => {
            //console.log("Receiver", data.toString());            
            switch (step) {
                case 0:
                    stream.push(Buffer.from("00260004001000000000000197\u0000"));
                    step++;
                    break;

                case 1:
                    stream.push(Buffer.from("00260004001000000000000197\u0000"));
                    step++;
                    break;

                case 2:
                    stream.push(Buffer.from("00260004001000000000000197\u0000"));
                    step++;
                    break;

                case 3:
                    stream.push(Buffer.from("00260004001000000000000197\u0000"));
                    step++;
                    break;

                case 4:
                    stream.push(Buffer.from("00260004001000000000000197\u0000"));
                    step++;
                    break;

                case 5:
                    stream.push(Buffer.from("00570002001000000000010001020103Airbag1                  \u0000"));
                    step++;
                    break;
            }
        });

        let sessionControlClient = new SessionControlClient({
            stream: stream
        });

        sessionControlClient.on("connect", () => {
            expect(true).to.be.equal(sessionControlClient.isConnected());
            sessionControlClient.close();
            done();
        });

        sessionControlClient.connect();
    });

    it("Should event connect with reply on first request and revision !=", (done) => {

        let stream = createStreamHelper((data) => {
            stream.push(Buffer.from("00570002001000000000010001020103Airbag1                  \u0000"));
        });

        let sessionControlClient = new SessionControlClient({
            stream: stream,
            defaultRevisions: {}
        });

        sessionControlClient.on("data", data => {
            //console.log("SCC - Data:", data);
        });

        sessionControlClient.on("error", err => {
            console.log("SCC - Error:", err);
        });

        sessionControlClient.on("connect", () => {
            expect(true).to.be.equal(sessionControlClient.isConnected());
            sessionControlClient.close();
            done();
        });

        sessionControlClient.connect();
    });

    it("Should subscribe in lastTightening", (done) => {

        let sessionControlClient;
        let step = 0;

        let stream = createStreamHelper((data) => {
            switch (step) {
                case 0:
                    stream.push(Buffer.from("00570002001000000000010001020103Airbag1                  \u0000"));
                    step += 1;
                    break;

                case 1:
                    stream.push(Buffer.from("002400050010000000000060\u0000"));
                    step += 1;
                    break;
            }
        });

        sessionControlClient = new SessionControlClient({
            stream: stream
        });

        sessionControlClient.on("data", data => {
            //console.log("SCC - Data:", data);
        });

        sessionControlClient.on("error", err => {
            console.log("SCC - Error:", err);
        });

        sessionControlClient.on("connect", () => {
            sessionControlClient.subscribe("lastTightening", null, (err) => {
                expect(err).to.be.null;
                sessionControlClient.close();
                done();

            });
        });

        sessionControlClient.connect();
    });

    it("Should request parameterSetID", (done) => {

        let sessionControlClient;
        let step = 0;

        let stream = createStreamHelper((data) => {
            switch (step) {
                case 0:
                    stream.push(Buffer.from("00570002001000000000010001020103Airbag1                  \u0000"));
                    step += 1;
                    break;

                case 1:
                    stream.push(Buffer.from("002400050010000000000010\u0000"));
                    step += 1;
                    break;
            }
        });

        sessionControlClient = new SessionControlClient({
            stream: stream
        });

        sessionControlClient.on("data", data => {
            // console.log("SCC - Data:", data);
        });

        sessionControlClient.on("error", err => {
            console.log("SCC - Error:", err);
        });

        sessionControlClient.on("connect", () => {
            sessionControlClient.request("psetID", null, (err, data) => {
                expect(err).to.be.null;
                sessionControlClient.close();
                done();

            });
        });

        sessionControlClient.connect();
    });

    it("Should request disconnectTool without reply", (done) => {

        let sessionControlClient;
        let step = 0;

        let stream = createStreamHelper((data) => {
            switch (step) {
                case 0:
                    stream.push(Buffer.from("00570002001000000000010001020103Airbag1                  \u0000"));
                    step += 1;
                    break;

                case 1:
                    stream.push(Buffer.from("002400050010000000000044\u0000"));
                    step += 1;
                    break;
            }
        });

        sessionControlClient = new SessionControlClient({
            stream: stream
        });

        sessionControlClient.on("data", data => {
            //console.log("SCC - Data:", data);
        });

        sessionControlClient.on("error", err => {
            console.log("SCC - Error:", err);
        });

        sessionControlClient.on("connect", () => {
            sessionControlClient.command("disconnectTool", null, (err, data) => {
                expect(err).to.be.null;
                sessionControlClient.close();
                done();
            });
        });

        sessionControlClient.connect();

    });

    it("Should error, request vehicleIdNumberDownload without parameters", (done) => {

        let sessionControlClient;

        let step = 0;

        let stream = createStreamHelper((data) => {
            switch (step) {
                case 0:
                    stream.push(Buffer.from("00570002001000000000010001020103Airbag1                  \u0000"));
                    step += 1;
                    break;
            }
        });

        sessionControlClient = new SessionControlClient({
            stream: stream
        });

        sessionControlClient.on("data", data => {
            //console.log("SCC - Data:", data);
        });

        sessionControlClient.on("error", err => {
            console.log("SCC - Error:", err);
        });

        sessionControlClient.on("connect", () => {
            sessionControlClient.request("vehicleIdNumberDownload", null, (err, data) => {
                expect(err).to.be.an("error");
                sessionControlClient.close();
                done();
            });
        });

        sessionControlClient.connect();
    });

    it("Should subscribe and unsubscribe in psetSelected", (done) => {

        let sessionControlClient;
        let step = 0;

        let stream = createStreamHelper((data) => {
            switch (step) {
                case 0:
                    stream.push(Buffer.from("00570002001000000000010001020103Airbag1                  \u0000"));
                    step += 1;
                    break;

                case 1:
                    stream.push(Buffer.from("002400050010000000000014\u0000"));
                    step += 1;
                    break;

                case 2:
                    stream.push(Buffer.from("002400050010000000000017\u0000"));
                    step += 1;
                    break;
            }
        });

        sessionControlClient = new SessionControlClient({
            stream: stream
        });

        sessionControlClient.on("data", data => {
            //console.log("SCC - Data:", data);
        });

        sessionControlClient.on("error", err => {
            console.log("SCC - Error:", err);
        });

        sessionControlClient.on("connect", () => {
            sessionControlClient.subscribe("psetSelected", null, (err) => {

                expect(err).to.be.null;

                sessionControlClient.unsubscribe("psetSelected", null, (err) => {
                    expect(err).to.be.null;
                    sessionControlClient.close();
                    done();
                });
            });
        });

        sessionControlClient.connect();
    });

    it("Should error, invalid midGroup on subscribe, unsubscribe and request", (done) => {

        let sessionControlClient;

        let stream = createStreamHelper((data) => {
            console.log("Receiver", data.toString());
        });

        sessionControlClient = new SessionControlClient({
            stream: stream
        });

        sessionControlClient.on("data", data => {
            //console.log("SCC - Data:", data);
        });

        sessionControlClient.on("error", err => {
            console.log("SCC - Error:", err);
        });

        sessionControlClient.subscribe("teste", null, (err) => {

            expect(err).to.be.an("error");

            sessionControlClient.unsubscribe("teste", null, (err) => {

                expect(err).to.be.an("error");

                sessionControlClient.request("teste", null, (err) => {
                    expect(err).to.be.an("error");
                    sessionControlClient.close();
                    done();
                });

            });

        });

    });

    it("Should error, subscribe with acknowledge MID wrong", (done) => {

        let step = 0;
        let sessionControlClient;

        let stream = createStreamHelper((data) => {
            switch (step) {
                case 0:
                    stream.push(Buffer.from("00570002001000000000010001020103Airbag1                  \u0000"));
                    step += 1;
                    break;

                case 1:
                    stream.push(Buffer.from("00260004001000000000015099\u0000"));
                    step += 1;
                    break;
            }
        });

        sessionControlClient = new SessionControlClient({
            stream: stream
        });

        sessionControlClient.on("data", data => {
            //console.log("SCC - Data:", data);
        });

        sessionControlClient.on("error", err => {
            console.log("SCC - Error:", err);
        });

        sessionControlClient.on("connect", () => {
            sessionControlClient.subscribe("lastTightening", null, (err) => {
                expect(err).to.be.an("error");
                sessionControlClient.close();
                done();
            });
        });

        sessionControlClient.connect();

    });

    it("Should subscribe with revision 1 using autoNegotiation on lastTightening", (done) => {

        let step = 0;
        let sessionControlClient;

        let stream = createStreamHelper((data) => {
            switch (step) {
                case 0:
                    stream.push(Buffer.from("00570002001000000000010001020103Airbag1                  \u0000"));
                    step += 1;
                    break;

                case 1:
                    stream.push(Buffer.from("00260004001000000000006097\u0000"));
                    step += 1;
                    break;

                case 2:
                    stream.push(Buffer.from("00260004001000000000006097\u0000"));
                    step += 1;
                    break;

                case 3:
                    stream.push(Buffer.from("00260004001000000000006097\u0000"));
                    step += 1;
                    break;

                case 4:
                    stream.push(Buffer.from("00260004001000000000006097\u0000"));
                    step += 1;
                    break;

                case 5:
                    stream.push(Buffer.from("00260004001000000000006097\u0000"));
                    step += 1;
                    break;

                case 6:
                    stream.push(Buffer.from("00260004001000000000006097\u0000"));
                    step += 1;
                    break;

                case 7:
                    stream.push(Buffer.from("002400050010000000000060\u0000"));
                    step += 1;
                    break;
            }
        });

        sessionControlClient = new SessionControlClient({
            stream: stream
        });

        sessionControlClient.on("data", data => {
            //console.log("SCC - Data:", data);
        });

        sessionControlClient.on("error", err => {
            console.log("SCC - Error:", err);
        });

        sessionControlClient.on("connect", () => {
            sessionControlClient.subscribe("lastTightening", null, (err) => {
                expect(err).to.be.null;
                sessionControlClient.close();
                done();
            });
        });

        sessionControlClient.connect();
    });

    it("Should error subscribe with revision 1 using autoNegotiation on lastTightening", (done) => {

        let step = 0;
        let sessionControlClient;

        let stream = createStreamHelper((data) => {
            switch (step) {
                case 0:
                    stream.push(Buffer.from("00570002001000000000010001020103Airbag1                  \u0000"));
                    step += 1;
                    break;

                case 1:
                    stream.push(Buffer.from("00260004001000000000006099\u0000"));
                    step += 1;
                    break;
            }
        });

        sessionControlClient = new SessionControlClient({
            stream: stream
        });

        sessionControlClient.on("data", data => {
            //console.log("SCC - Data:", data);
        });

        sessionControlClient.on("error", err => {
            console.log("SCC - Error:", err);
        });

        sessionControlClient.on("connect", () => {
            sessionControlClient.subscribe("lastTightening", null, (err) => {
                expect(err).to.be.an("error");
                sessionControlClient.close();
                done();
            });
        });

        sessionControlClient.connect();
    });

    it("Should event data using sendMID()", (done) => {

        let step = 0;

        let stream = createStreamHelper((data) => {
            //console.log("Receiver", data.toString());

            switch (step) {
                case 0:
                    step++;
                    stream.push(Buffer.from("00570002001000000000010001020103Airbag1                  \u0000"));
                    break;

                case 1:
                    step++;
                    stream.push(Buffer.from("00256535001000000000TESTE\u0000"));
                    break;

                case 2:
                    step++;
                    stream.push(Buffer.from("0022003900100000000055\u0000"));
                    break;
            }
        });

        let sessionControlClient = new SessionControlClient({
            stream: stream
        });

        sessionControlClient.on("data", (data) => {
            if (step === 3) {
                expect(data.mid).to.be.equal(39);
                sessionControlClient.close();
                done();
            }

            if (step === 2) {
                step++;
                stream.push(Buffer.from("0022003900100000000055\u0000"));                
            }
        });

        sessionControlClient.on("connect", (data) => {
            sessionControlClient.sendMid(1212);
        });

        sessionControlClient.connect();
    });

    it("Should request readTimeUpload and reply", (done) => {

        let sessionControlClient;
        let step = 0;

        let stream = createStreamHelper((data) => {
            switch (step) {
                case 0:
                    stream.push(Buffer.from("00570002001000000000010001020103Airbag1                  \u0000"));
                    step += 1;
                    break;

                case 1:
                    stream.push(Buffer.from("003900810010000000002018-06-21:14:14:00\u0000"));
                    step += 1;
                    break;
            }
        });

        sessionControlClient = new SessionControlClient({
            stream: stream
        });

        sessionControlClient.on("data", data => {
            // console.log("SCC - Data:", data);
        });

        sessionControlClient.on("error", err => {
            console.log("SCC - Error:", err);
        });

        sessionControlClient.on("connect", () => {

            sessionControlClient.request("readTimeUpload", null, (err, data) => {

                let mid = {
                    mid: 81,
                    revision: 1,
                    noAck: false,
                    stationID: 1,
                    spindleID: 1,
                    sequenceNumber: 0,
                    messageParts: 0,
                    messageNumber: 0,
                    payload: {
                        time: '2018-06-21:14:14:00'
                    }
                };

                expect(data).to.be.deep.equal(mid);
                expect(err).to.be.null;
                sessionControlClient.close();
                done();
            });
        });

        sessionControlClient.connect();
    });

    it("Should request generic", (done) => {

        let sessionControlClient;
        let step = 0;

        let stream = createStreamHelper((data) => {

            switch (step) {
                case 0:
                    stream.push(Buffer.from("00570002001000000000010001020103Airbag1                  \u0000"));
                    step += 1;
                    break;

                case 1:
                    stream.push(Buffer.from("003900810010000000002018-06-21:14:14:00\u0000"));
                    step += 1;
                    break;
            }
        });

        sessionControlClient = new SessionControlClient({
            stream: stream,
            genericMode: true
        });

        sessionControlClient.on("data", data => {
            // console.log("SCC - Data:", data);
        });

        sessionControlClient.on("error", err => {
            console.log("SCC - Error:", err);
        });

        sessionControlClient.on("connect", () => {

            sessionControlClient.request("readTimeUpload", null, (err, data) => {

                let mid = {
                    mid: 81,
                    revision: 1,
                    noAck: false,
                    stationID: 1,
                    spindleID: 1,
                    sequenceNumber: 0,
                    messageParts: 0,
                    messageNumber: 0,
                    payload: {
                        time: '2018-06-21:14:14:00'
                    }
                };

                expect(data).to.be.deep.equal(mid);
                expect(err).to.be.null;
                sessionControlClient.close();
                done();

            });
        });

        sessionControlClient.connect();
    });

    it("Should subscribe generic", (done) => {

        let sessionControlClient;
        let step = 0;

        let stream = createStreamHelper((data) => {
            switch (step) {
                case 0:
                    stream.push(Buffer.from("00570002001000000000010001020103Airbag1                  \u0000"));
                    step += 1;
                    break;

                case 1:
                    stream.push(Buffer.from("002400050010000000000008\u0000"));
                    step += 1;
                    break;
            }
        });

        sessionControlClient = new SessionControlClient({
            stream: stream,
            genericMode: true
        });

        sessionControlClient.on("error", err => {
            console.log("SCC - Error:", err);
        });

        sessionControlClient.on("connect", () => {
            
            sessionControlClient.subscribe("psetSelected", {}, (err, data) =>{

                let mid = {
                    mid: 5,
                    revision: 1,
                    noAck: false,
                    stationID: 1,
                    spindleID: 1,
                    sequenceNumber: 0,
                    messageParts: 0,
                    messageNumber: 0,
                    payload: {
                        midNumber: 8
                    }
                };
    
                expect(data).to.be.deep.equal(mid);
                sessionControlClient.close();
                done();

            });
        });

        sessionControlClient.connect();
    });

    it("Should unsubscribe generic", (done) => {

        let sessionControlClient;
        let step = 0;

        let stream = createStreamHelper((data) => {
            //console.log("Receiver", data.toString());
            switch (step) {
                case 0:
                    stream.push(Buffer.from("00570002001000000000010001020103Airbag1                  \u0000"));
                    step += 1;
                    break;

                case 1:
                    stream.push(Buffer.from("002400050010000000000009\u0000"));
                    step += 1;
                    break;
            }
        });

        sessionControlClient = new SessionControlClient({
            stream: stream,
            genericMode: true
        });

        sessionControlClient.on("error", err => {
            console.log("SCC - Error:", err);
        });

        sessionControlClient.on("connect", () => {
            sessionControlClient.unsubscribe("psetSelected", (err, data) => {
                
                let mid = {
                    mid: 5,
                    revision: 1,
                    noAck: false,
                    stationID: 1,
                    spindleID: 1,
                    sequenceNumber: 0,
                    messageParts: 0,
                    messageNumber: 0,
                    payload: {
                        midNumber: 9
                    }
                };
    
                expect(data).to.be.deep.equal(mid);
                sessionControlClient.close();
                done();

            });
        });

        sessionControlClient.connect();
    });

    it("Should handle error of generic communication with reply of request MID0004 Error ~ 74/76 - Based Test 04/07/2018", (done) => {

        /*
            S 00200001006001010000
            R 01790002006     0000010000020003PA160LDA2                04ACT052.2                0610.15.6            07                   08Silver (Ag)             09D240003   1000111001121130

            S 00209999001001010100
            R 00249997        02009999

            R 00209999        0100
            S 002499970010010102009999


            S 00209999001001010200
            R 00249997        03009999

            R 00209999        0200
            S 002499970010010103009999

            S 00209999001001010300
            R 00249997        04009999

            R 00209999        0300
            S 002499970010010104009999

            S 00290006001001010400008000100
            R 00249997        05000006
            R 00260004        0400000675
            S 002499970010010105000004
        */

        let sessionControlClient;
        let step = 0;

        let stream = createStreamHelper((data) => {

            //console.log("Receiver", step, data.toString());

            switch (step) {
                case 0:
                    stream.push(Buffer.from("01790002006     0000010000020003PA160LDA2                04ACT052.2                0610.15.6            07                   08Silver (Ag)             09D240003   1000111001121130\u0000"));
                    step += 1;
                    break;

                case 1:
                    stream.push(Buffer.from("00249997        02009999\u0000"));
                    stream.push(Buffer.from("00209999        0100\u0000"));
                    step += 1;
                    break;

                case 2:
                    step += 1;
                    break;

                case 3:
                    stream.push(Buffer.from("00249997        03009999\u0000"));
                    stream.push(Buffer.from("00209999        0200\u0000"));
                    step += 1;
                    break;

                case 4:
                    step += 1;
                    break;

                case 5:
                    stream.push(Buffer.from("00249997        04009999\u0000"));
                    stream.push(Buffer.from("00209999        0300\u0000"));
                    step += 1;
                    break;

                case 6:

                    sessionControlClient.request("readTimeUpload", (err, data) => {
                        expect(err).to.be.an("error");
                    });

                    step += 1;
                    break;

                case 7:
                    stream.push(Buffer.from("00249997        05000006\u0000"));
                    stream.push(Buffer.from("00260004        0400000675\u0000"));
                    step += 1;
                    break;

                case 8:

                    let str = "002499970010010105000004\u0000";
                    expect(str).to.be.deep.equal(data.toString("ascii"));
                    sessionControlClient.close();                    
                    done();

                    step += 1;
                    break;

                default:
                    //console.log("Default", step);
                    step += 1;
                    break;

            }
        });

        sessionControlClient = new SessionControlClient({
            stream: stream,
            genericMode: true,
            keepAlive: 200
        });

        sessionControlClient.connect();
    });

});