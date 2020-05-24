//@ts-check
/*
  Copyright: (c) 2018-2020, Smart-Tech Controle e Automação
  GNU General Public License v3.0+ (see LICENSE or https://www.gnu.org/licenses/gpl-3.0.txt)
*/

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