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

const MID = require('../src/mid/0039.js');

describe("MID 0039", () => {

    it("parser rev 1", (done) => {
        
        let msg = {
            mid: 39,
            revision: 1,
            payload: Buffer.from("99")
        };

        MID.parser(msg, {}, (err, data) => {

            if(err){
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 39,
                revision: 1,
                payload: {
                    jobID: 99                    
                }
            });

            done();
        });
    }); 

    it("parser rev 2", (done) => {
        
        let msg = {
            mid: 39,
            revision: 2,
            payload: Buffer.from("1212")
        };

        MID.parser(msg, {}, (err, data) => {

            if(err){
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 39,
                revision: 2,
                payload: {
                    jobID: 1212                    
                }
            });

            done();
        });
    }); 
   
    it("serializer rev 1", (done) => {
        
        let msg = {
            mid: 39,
            revision: 1,
            payload: {
                jobID: 99
            }
        };

        MID.serializer(msg, {}, (err, data) => {

            if(err){
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 39,
                revision: 1,
                payload: Buffer.from("99")
            });

            done();
        });
    }); 

    it("serializer rev 2", (done) => {
        
        let msg = {
            mid: 39,
            revision: 2,
            payload: {
                jobID: 1212
            }
        };

        MID.serializer(msg, {}, (err, data) => {

            if(err){
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 39,
                revision: 2,
                payload: Buffer.from("1212")
            });

            done();
        });
    }); 

    it("Should return error, parser with invalid revision", (done) => {

        let msg = {
            mid: 39,
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
            mid: 39,
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