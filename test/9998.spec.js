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

const MID = require('../src/mid/9998.js');

describe("MID 9998", () => {

    it("parser rev 1", (done) => {
        
        let msg = {
            mid: 9998,
            revision: 1,
            payload: Buffer.from("00050004")
        };

        MID.parser(msg, {}, (err, data) => {

            if(err){
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 9998,
                revision: 1,
                payload: {
                    midNumber: 5,
                    errorCode: 4                    
                }
            });

            done();
        });
    }); 

    it("serializer rev 1", (done) => {
        
        let msg = {
            mid: 9998,
            revision: 1,
            payload: {
                midNumber: 90,
                errorCode: 2                    
            }
        };

        MID.serializer(msg, {}, (err, data) => {

            if(err){
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 9998,
                revision: 1,
                payload: Buffer.from("00900002")
            });

            done();
        });
    }); 

    it("Should return error, parser with invalid revision", (done) => {

        let msg = {
            mid: 9998,
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
            mid: 9998,
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

        expect(revisions).to.have.lengthOf(1);
        done();
 
    });


});