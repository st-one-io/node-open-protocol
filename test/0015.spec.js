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

const MID = require('../src/mid/0015.js');

describe("MID 0015", () => {

    it("parser rev 1", (done) => {
        
        let msg = {
            mid: 15,
            revision: 1,
            payload: Buffer.from("5552018-05-28:10:29:59")
        };

        MID.parser(msg, {}, (err, data) => {

            expect(data).to.be.deep.equal({
                mid: 15,
                revision: 1,
                payload: {
                    parameterSetID: 555,
                    dateLastChange: "2018-05-28:10:29:59"
                }
            });

            done();
        });
    }); 

    it("parser rev 2", (done) => {
        
        let msg = {
            mid: 15,
            revision: 2,
            payload: Buffer.from("0155502Teste Diego              032018-05-28:10:29:5904105880611111107222222083333330944444105555511666661277777713888888")
        };

        MID.parser(msg, {}, (err, data) => {

            expect(data).to.be.deep.equal({
                mid: 15,
                revision: 2,
                payload: {
                    parameterSetID: 555,
                    dateLastChange: "2018-05-28:10:29:59",
                    parameterSetName: "Teste Diego",
                    rotationDirection: 1,
                    batchSize: 88,
                    torqueMin: 111111,
                    torqueMax: 222222,
                    torqueTarget: 333333,
                    angleMin: 44444,
                    angleMax: 55555,
                    angleTarget: 66666,
                    firstTarget: 777777,
                    startFinalAngle: 888888
                }
            });

            done();
        });
    }); 

    it("serializer rev 1", (done) => {
        
        let msg = {
            mid: 15,
            revision: 1,
            payload: {
                    parameterSetID: 555,
                    dateLastChange: "2018-05-28:10:29:59"
                }           
        };

        MID.serializer(msg, {}, (err, data) => {

            expect(data).to.be.deep.equal({
                mid: 15,
                revision: 1,
                payload: Buffer.from("5552018-05-28:10:29:59")
            });

            done();
        });
    }); 

    it("serializer rev 2", (done) => {
        
        let msg = {
            mid: 15,
            revision: 2,
            payload: {
                    parameterSetID: 555,
                    dateLastChange: "2018-05-28:10:29:59",
                    parameterSetName: "Teste Diego",
                    rotationDirection: 1,
                    batchSize: 88,
                    torqueMin: 111111,
                    torqueMax: 222222,
                    torqueTarget: 333333,
                    angleMin: 44444,
                    angleMax: 55555,
                    angleTarget: 66666,
                    firstTarget: 777777,
                    startFinalAngle: 888888             
                }           
        };

        MID.serializer(msg, {}, (err, data) => {

            expect(data).to.be.deep.equal({
                mid: 15,
                revision: 2,
                payload: Buffer.from("0155502Teste Diego              032018-05-28:10:29:5904105880611111107222222083333330944444105555511666661277777713888888")
            });

            done();
        });
    }); 

    it("Should return error, parser with invalid revision", (done) => {

        let msg = {
            mid: 15,
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
            mid: 15,
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

        expect(revisions).to.have.lengthOf(2);
        done();
 
    });
    

});