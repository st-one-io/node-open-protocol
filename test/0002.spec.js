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

const MID = require('../src/mid/0002.js');

describe("MID 0002", () => {

    it("parser rev 1", (done) => {

        let msg = {
            mid: 2,
            revision: 1,
            payload: Buffer.from("010001020103Teste Airbag             ")
        };

        MID.parser(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 2,
                revision: 1,
                payload: {
                    cellID: 1,
                    channelID: 1,
                    controllerName: "Teste Airbag"
                }
            });

            done();
        });
    });

    it("parser rev 2", (done) => {

        let msg = {
            mid: 2,
            revision: 2,
            payload: Buffer.from("010001020103Teste Airbag             04ABC")
        };

        MID.parser(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 2,
                revision: 2,
                payload: {
                    cellID: 1,
                    channelID: 1,
                    controllerName: "Teste Airbag",
                    supplierCode: "ABC"
                }
            });

            done();
        });
    });

    it("parser rev 3", (done) => {

        let msg = {
            mid: 2,
            revision: 3,
            payload: Buffer.from("010001020103Teste Airbag             04ABC05AAAAAAAAAAAAAAAAAAA06BBBBBBBBBBBBBBBBBBB07CCCCCCCCCCCCCCCCCCC")
        };

        MID.parser(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 2,
                revision: 3,
                payload: {
                    cellID: 1,
                    channelID: 1,
                    controllerName: "Teste Airbag",
                    supplierCode: "ABC",
                    openProtocolVersion: "AAAAAAAAAAAAAAAAAAA",
                    controllerSoftwareVersion: "BBBBBBBBBBBBBBBBBBB",
                    toolSoftwareVersion: "CCCCCCCCCCCCCCCCCCC"
                }
            });

            done();
        });
    });

    it("parser rev 4", (done) => {

        let msg = {
            mid: 2,
            revision: 4,
            payload: Buffer.from("010001020103Teste Airbag             04ABC05AAAAAAAAAAAAAAAAAAA06BBBBBBBBBBBBBBBBBBB07CCCCCCCCCCCCCCCCCCC08AS254DFCVFDCVGTREDFGHJKL09123987ASD6")
        };

        MID.parser(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 2,
                revision: 4,
                payload: {
                    cellID: 1,
                    channelID: 1,
                    controllerName: "Teste Airbag",
                    supplierCode: "ABC",
                    openProtocolVersion: "AAAAAAAAAAAAAAAAAAA",
                    controllerSoftwareVersion: "BBBBBBBBBBBBBBBBBBB",
                    toolSoftwareVersion: "CCCCCCCCCCCCCCCCCCC",
                    rbuType: "AS254DFCVFDCVGTREDFGHJKL",
                    controllerSerialNumber: "123987ASD6"
                }
            });

            done();
        });
    });

    it("parser rev 5", (done) => {

        let msg = {
            mid: 2,
            revision: 5,
            payload: Buffer.from("010001020103Teste Airbag             04ABC05AAAAAAAAAAAAAAAAAAA06BBBBBBBBBBBBBBBBBBB07CCCCCCCCCCCCCCCCCCC08AS254DFCVFDCVGTREDFGHJKL09123987ASD61000311002")
        };

        MID.parser(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 2,
                revision: 5,
                payload: {
                    cellID: 1,
                    channelID: 1,
                    controllerName: "Teste Airbag",
                    supplierCode: "ABC",
                    openProtocolVersion: "AAAAAAAAAAAAAAAAAAA",
                    controllerSoftwareVersion: "BBBBBBBBBBBBBBBBBBB",
                    toolSoftwareVersion: "CCCCCCCCCCCCCCCCCCC",
                    rbuType: "AS254DFCVFDCVGTREDFGHJKL",
                    controllerSerialNumber: "123987ASD6",
                    systemType: 3,
                    systemSubtype: 2
                }
            });

            done();
        });
    });

    it("parser rev 6", (done) => {

        let msg = {
            mid: 2,
            revision: 6,
            payload: Buffer.from("010001020103Teste Airbag             04ABC05AAAAAAAAAAAAAAAAAAA06BBBBBBBBBBBBBBBBBBB07CCCCCCCCCCCCCCCCCCC08AS254DFCVFDCVGTREDFGHJKL09123987ASD61000311002120131")
        };

        MID.parser(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 2,
                revision: 6,
                payload: {
                    cellID: 1,
                    channelID: 1,
                    controllerName: "Teste Airbag",
                    supplierCode: "ABC",
                    openProtocolVersion: "AAAAAAAAAAAAAAAAAAA",
                    controllerSoftwareVersion: "BBBBBBBBBBBBBBBBBBB",
                    toolSoftwareVersion: "CCCCCCCCCCCCCCCCCCC",
                    rbuType: "AS254DFCVFDCVGTREDFGHJKL",
                    controllerSerialNumber: "123987ASD6",
                    systemType: 3,
                    systemSubtype: 2,
                    sequenceNumberSupport: 0,
                    linkingHandlingSupport: 1
                }
            });

            done();
        });
    });

    it("serializer rev 1", (done) => {

        let msg = {
            mid: 2,
            revision: 1,
            payload: {
                cellID: 1,
                channelID: 1,
                controllerName: "Teste Airbag"
            }
        };

        MID.serializer(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 2,
                revision: 1,
                payload: Buffer.from("010001020103Teste Airbag             ")
            });

            done();
        });
    });

    it("serializer rev 2", (done) => {

        let msg = {

            mid: 2,
            revision: 2,
            payload: {
                cellID: 1,
                channelID: 1,
                controllerName: "Teste Airbag",
                supplierCode: "ABC"
            }

        };

        MID.serializer(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 2,
                revision: 2,
                payload: Buffer.from("010001020103Teste Airbag             04ABC")
            });

            done();
        });
    });

    it("serializer rev 3", (done) => {

        let msg = {
            mid: 2,
            revision: 3,
            payload: {
                cellID: 1,
                channelID: 1,
                controllerName: "Teste Airbag",
                supplierCode: "ABC",
                openProtocolVersion: "AAAAAAAAAAAAAAAAAAA",
                controllerSoftwareVersion: "BBBBBBBBBBBBBBBBBBB",
                toolSoftwareVersion: "CCCCCCCCCCCCCCCCCCC"
            }
        };

        MID.serializer(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 2,
                revision: 3,
                payload: Buffer.from("010001020103Teste Airbag             04ABC05AAAAAAAAAAAAAAAAAAA06BBBBBBBBBBBBBBBBBBB07CCCCCCCCCCCCCCCCCCC")
            });

            done();
        });
    });

    it("serializer rev 4", (done) => {

        let msg = {
            mid: 2,
            revision: 4,
            payload: {
                cellID: 1,
                channelID: 1,
                controllerName: "Teste Airbag",
                supplierCode: "ABC",
                openProtocolVersion: "AAAAAAAAAAAAAAAAAAA",
                controllerSoftwareVersion: "BBBBBBBBBBBBBBBBBBB",
                toolSoftwareVersion: "CCCCCCCCCCCCCCCCCCC",
                rbuType: "AS254DFCVFDCVGTREDFGHJKL",
                controllerSerialNumber: "123987ASD6"
            }
        };

        MID.serializer(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 2,
                revision: 4,
                payload: Buffer.from("010001020103Teste Airbag             04ABC05AAAAAAAAAAAAAAAAAAA06BBBBBBBBBBBBBBBBBBB07CCCCCCCCCCCCCCCCCCC08AS254DFCVFDCVGTREDFGHJKL09123987ASD6")
            });

            done();
        });
    });

    it("serializer rev 5", (done) => {

        let msg = {
            mid: 2,
            revision: 5,
            payload: {
                cellID: 1,
                channelID: 1,
                controllerName: "Teste Airbag",
                supplierCode: "ABC",
                openProtocolVersion: "AAAAAAAAAAAAAAAAAAA",
                controllerSoftwareVersion: "BBBBBBBBBBBBBBBBBBB",
                toolSoftwareVersion: "CCCCCCCCCCCCCCCCCCC",
                rbuType: "AS254DFCVFDCVGTREDFGHJKL",
                controllerSerialNumber: "123987ASD6",
                systemType: 3,
                systemSubtype: 2
            }
        };

        MID.serializer(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 2,
                revision: 5,
                payload: Buffer.from("010001020103Teste Airbag             04ABC05AAAAAAAAAAAAAAAAAAA06BBBBBBBBBBBBBBBBBBB07CCCCCCCCCCCCCCCCCCC08AS254DFCVFDCVGTREDFGHJKL09123987ASD61000311002")
            });

            done();
        });
    });

    it("serializer rev 6", (done) => {

        let msg = {
            mid: 2,
            revision: 6,
            payload: {
                cellID: 1,
                channelID: 1,
                controllerName: "Teste Airbag",
                supplierCode: "ABC",
                openProtocolVersion: "AAAAAAAAAAAAAAAAAAA",
                controllerSoftwareVersion: "BBBBBBBBBBBBBBBBBBB",
                toolSoftwareVersion: "CCCCCCCCCCCCCCCCCCC",
                rbuType: "AS254DFCVFDCVGTREDFGHJKL",
                controllerSerialNumber: "123987ASD6",
                systemType: 3,
                systemSubtype: 2,
                sequenceNumberSupport: 0,
                linkingHandlingSupport: 1,
                stationID: "AESDR56RDT",
                stationName: "QASWWEDXCVFR562 DERF34EDF",
                clientID: 9
            }
        };

        MID.serializer(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 2,
                revision: 6,
                payload: Buffer.from("010001020103Teste Airbag             04ABC05AAAAAAAAAAAAAAAAAAA06BBBBBBBBBBBBBBBBBBB07CCCCCCCCCCCCCCCCCCC08AS254DFCVFDCVGTREDFGHJKL09123987ASD6100031100212013114AESDR56RDT15QASWWEDXCVFR562 DERF34EDF169")
            });

            done();
        });
    });

    it("Should return error, parser with invalid revision", (done) => {

        let msg = {
            mid: 2,
            revision: 12,
            payload: Buffer.from("")
        };

        MID.parser(msg, {}, (err, data) => {
            expect(err).to.be.an('error');
            done();
        });
    });

    it("Should return error, serializer with invalid revision", (done) => {

        let msg = {
            mid: 2,
            revision: 12,
            payload: {}
        };

        MID.serializer(msg, {}, (err, data) => {
            expect(err).to.be.an('error');
            done();
        });
    });

    it("Should return array revision", (done) => {

        let revisions = MID.revision();

        expect(revisions).to.have.lengthOf(6);
        done();
 
    });

});