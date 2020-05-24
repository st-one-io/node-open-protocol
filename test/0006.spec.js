//@ts-check
/*
  Copyright: (c) 2018-2020, Smart-Tech Controle e Automação
  GNU General Public License v3.0+ (see LICENSE or https://www.gnu.org/licenses/gpl-3.0.txt)
*/

const {
    expect
} = require('chai');

const MID = require('../src/mid/0006.js');

describe("MID 0006", () => {

    it("parser rev 1", (done) => {
        
        let msg = {
            mid: 6,
            revision: 1,
            payload: Buffer.from("001000200")
        };

        MID.parser(msg, {}, (err, data) => {

            expect(data).to.be.deep.equal({
                mid: 6,
                revision: 1,
                payload: {
                    midNumber: 10,                    
                    revision: 2,
                    dataLength: 0,
                    extraData: ""
                }
            });

            done();
        });
    }); 

    it("serializer rev 1", (done) => {
        
        let msg = {
            mid: 6,
            revision: 1,
            payload: {
                midNumber: 10,                    
                revision: 2,
                dataLength: 0,
                extraData: ""
            }
        };

        MID.serializer(msg, {}, (err, data) => {
            expect(data).to.be.deep.equal({
                mid: 6,
                revision: 1,
                payload: Buffer.from("001000200")
            });

            done();
        });
    }); 

    it("Should return error, parser with invalid revision", (done) => {

        let msg = {
            mid: 6,
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
            mid: 6,
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