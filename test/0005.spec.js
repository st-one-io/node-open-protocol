//@ts-check
/*
  Copyright: (c) 2018-2020, Smart-Tech Controle e Automação
  GNU General Public License v3.0+ (see LICENSE or https://www.gnu.org/licenses/gpl-3.0.txt)
*/

const {
    expect
} = require('chai');

const MID = require('../src/mid/0005.js');

describe("MID 0005", () => {

    it("parser rev 1", (done) => {

        let msg = {
            mid: 5,
            revision: 1,
            payload: Buffer.from("0022")
        };

        MID.parser(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 5,
                revision: 1,
                payload: {
                    midNumber: 22
                }
            });

            done();
        });
    });

    it("serializer rev 1", (done) => {

        let msg = {
            mid: 5,
            revision: 1,
            payload: {
                midNumber: 22
            }
        };

        MID.serializer(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 5,
                revision: 1,
                payload: Buffer.from("0022")
            });

            done();
        });
    });

    it("Should return error, parser with invalid revision", (done) => {

        let msg = {
            mid: 5,
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
            mid: 5,
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