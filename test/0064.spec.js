//@ts-check
/*
  Copyright: (c) 2018-2020, Smart-Tech Controle e Automação
  GNU General Public License v3.0+ (see LICENSE or https://www.gnu.org/licenses/gpl-3.0.txt)
*/

const {
    expect
} = require('chai');

const MID = require('../src/mid/0064.js');

describe("MID 0064", () => {

    it("parser rev 1", (done) => {

        let msg = {
            mid: 64,
            revision: 1,
            payload: Buffer.from("1234567890")
        };

        MID.parser(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 64,
                revision: 1,
                payload: {
                    tighteningID: 1234567890
                }
            });

            done();
        });
    });

    it("parser rev [2, 3, 4, 5, 6, 7]", (done) => {

        for (let x = 2; x <= 7; x++) {

            let revision = x;

            let msg = {
                mid: 64,
                revision,
                payload: Buffer.from("1234567890")
            };

            MID.parser(msg, {}, (err, data) => {
                expect(err).to.be.null;
                expect(data).to.be.deep.equal({
                    mid: 64,
                    revision,
                    payload: {
                        tighteningID: 1234567890
                    }
                });
            });
        }

        done();

    });

    it("serializer rev 1", (done) => {

        let msg = {
            mid: 64,
            revision: 1,
            payload: {
                tighteningID: 1234567890
            }
        };

        MID.serializer(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 64,
                revision: 1,
                payload: Buffer.from("1234567890")
            });

            done();
        });
    });

    it("serializer rev [2, 3, 4, 5, 6, 7]", (done) => {

        for (let x = 2; x <= 7; x++) {

            let revision = x;

            let msg = {
                mid: 64,
                revision,
                payload: {
                    tighteningID: 1234567890
                }
            };

            MID.serializer(msg, {}, (err, data) => {
                expect(err).to.be.null;
                expect(data).to.be.deep.equal({
                    mid: 64,
                    revision,
                    payload: Buffer.from("1234567890")
                });
            });
        }

        done();

    });

    it("Should return error, parser with invalid revision", (done) => {

        let msg = {
            mid: 64,
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
            mid: 64,
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

        expect(revisions).to.have.lengthOf(7);
        done();

    });
});