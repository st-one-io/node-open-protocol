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

const MID = require('../src/mid/0035.js');

describe("MID 0035", () => {

    it("parser rev 1", (done) => {
        
        let msg = {
            mid: 35,
            revision: 1,
            payload: Buffer.from("0106020030040022050012062019-03-08:10:28:29")
        };

        MID.parser(msg, {}, (err, data) => {

            if(err){
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 35,
                revision: 1,
                payload: {
                    jobID: 6,
                    jobStatus: 0,
                    jobBatchMode: 0,
                    jobBatchSize: 22,
                    jobBatchCounter: 12,
                    timeStamp: "2019-03-08:10:28:29",
                }
            });

            done();
        });
    }); 

    it("parser rev 2", (done) => {
        
        let msg = {
            mid: 35,
            revision: 2,
            payload: Buffer.from("010006020030040022050012062019-03-08:10:28:29")
        };

        MID.parser(msg, {}, (err, data) => {

            if(err){
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 35,
                revision: 2,
                payload: {
                    jobID: 6,
                    jobStatus: 0,
                    jobBatchMode: 0,
                    jobBatchSize: 22,
                    jobBatchCounter: 12,
                    timeStamp: "2019-03-08:10:28:29",                  
                }
            });

            done();
        });
    });

    it.skip("parser rev 3", (done) => {

        let msg = {
            mid: 35,
            revision: 3,
            payload: Buffer.from("????")
        };

        MID.parser(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 35,
                revision: 3,
                payload: {
                    //???
                }
            });

            done();
        });
    });

    it.skip("parser rev 4", (done) => {

        let msg = {
            mid: 35,
            revision: 4,
            payload: Buffer.from("????")
        };

        MID.parser(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 35,
                revision: 4,
                payload: {
                    //???
                }
            });

            done();
        });
    });

    it.skip("parser rev 5", (done) => {

        let msg = {
            mid: 35,
            revision: 5,
            payload: Buffer.from("????")
        };

        MID.parser(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 35,
                revision: 5,
                payload: {
                    //???
                }
            });

            done();
        });
    });
   
    it.skip("serializer rev 1", (done) => {
        
        let msg = {
            mid: 35,
            revision: 1,
            payload: {
                jobID: 6,
                jobStatus: 0,
                jobBatchMode: 0,
                jobBatchSize: 22,
                jobBatchCounter: 12,
                timeStamp: "2019-03-08:10:28:29",
            }
        };

        MID.serializer(msg, {}, (err, data) => {

            if(err){
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 35,
                revision: 1,
                payload: Buffer.from("0106020030040022050012062019-03-08:10:28:29")
            });

            done();
        });
    }); 

    it.skip("serializer rev 2", (done) => {
        
        let msg = {
            mid: 35,
            revision: 2,
            payload: {
                jobID: 6,
                jobStatus: 0,
                jobBatchMode: 0,
                jobBatchSize: 22,
                jobBatchCounter: 12,
                timeStamp: "2019-03-08:10:28:29",
            }
        };

        MID.serializer(msg, {}, (err, data) => {

            if(err){
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 35,
                revision: 2,
                payload: Buffer.from("010006020030040022050012062019-03-08:10:28:29")
            });

            done();
        });
    });

    it.skip("serializer rev 3", (done) => {

        let msg = {
            mid: 35,
            revision: 3,
            payload: {
                //????
            }
        };

        MID.serializer(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 35,
                revision: 3,
                payload: Buffer.from("????")
            });

            done();
        });
    });

    it.skip("serializer rev 4", (done) => {

        let msg = {
            mid: 35,
            revision: 4,
            payload: {
                //????
            }
        };

        MID.serializer(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 35,
                revision: 4,
                payload: Buffer.from("????")
            });

            done();
        });
    });

    it.skip("serializer rev 5", (done) => {

        let msg = {
            mid: 35,
            revision: 5,
            payload: {
                //????
            }
        };

        MID.serializer(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 35,
                revision: 5,
                payload: Buffer.from("????")
            });

            done();
        });
    }); 

    it("Should return error, parser with invalid revision", (done) => {

        let msg = {
            mid: 35,
            revision: 7,
            payload: Buffer.from("0106020030040022050012062019-03-08:10:28:29")
        };

        MID.parser(msg, {}, (err, data) => {
            expect(err).to.be.an('error');
            done();
        });
    });

    it.skip("Should return error, serializer with invalid revision", (done) => {

        let msg = {
            mid: 38,
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

        expect(revisions).to.have.lengthOf(5);
        done();
 
    });

});