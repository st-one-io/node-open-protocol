//@ts-check
/*
  Copyright: (c) 2018-2020, Smart-Tech Controle e Automação
  GNU General Public License v3.0+ (see LICENSE or https://www.gnu.org/licenses/gpl-3.0.txt)
*/

const {
    expect
} = require('chai');

const helpers = require('../src/helpers');
const mids = helpers.getMids();

describe("Simple MIDs", () => {

    it("MID0003", (done) => {

        let midTest = 3;
        let revisions = 1;

        let mid = mids[midTest];
        let msg = {
            payload: Buffer.from("MID-Teste")
        };

        mid.parser(msg, {}, (err, data) => {
            expect(err).to.be.null;
            expect(data).to.be.deep.equal({
                payload: "MID-Teste"
            });

            mid.serializer(data, {}, (err, data) => {
                expect(err).to.be.null;
                expect(data).to.be.deep.equal(msg);
            });

            expect(mid.revision()).to.have.lengthOf(revisions);
            done();
        });
    });

    it("MID0010", (done) => {

        let midTest = 10;
        let revisions = 3;

        let mid = mids[midTest];
        let msg = {
            payload: Buffer.from("MID-Teste")
        };

        mid.parser(msg, {}, (err, data) => {
            expect(err).to.be.null;
            expect(data).to.be.deep.equal({
                payload: "MID-Teste"
            });

            mid.serializer(data, {}, (err, data) => {
                expect(err).to.be.null;
                expect(data).to.be.deep.equal(msg);
            });

            expect(mid.revision()).to.have.lengthOf(revisions);
            done();
        });
    });

    it("MID0022", (done) => {

        let midTest = 22;
        let revisions = 1;

        let mid = mids[midTest];
        let msg = {
            payload: Buffer.from("MID-Teste")
        };

        mid.parser(msg, {}, (err, data) => {
            expect(err).to.be.null;
            expect(data).to.be.deep.equal({
                payload: "MID-Teste"
            });

            mid.serializer(data, {}, (err, data) => {
                expect(err).to.be.null;
                expect(data).to.be.deep.equal(msg);
            });

            expect(mid.revision()).to.have.lengthOf(revisions);
            done();
        });
    });

    it("MID0025", (done) => {

        let midTest = 25;
        let revisions = 1;

        let mid = mids[midTest];
        let msg = {
            payload: Buffer.from("MID-Teste")
        };

        mid.parser(msg, {}, (err, data) => {
            expect(err).to.be.null;
            expect(data).to.be.deep.equal({
                payload: "MID-Teste"
            });

            mid.serializer(data, {}, (err, data) => {
                expect(err).to.be.null;
                expect(data).to.be.deep.equal(msg);
            });

            expect(mid.revision()).to.have.lengthOf(revisions);
            done();
        });
    });

    it("MID0030", (done) => {

        let midTest = 30;
        let revisions = 1;

        let mid = mids[midTest];
        let msg = {
            payload: Buffer.from("MID-Teste")
        };

        mid.parser(msg, {}, (err, data) => {
            expect(err).to.be.null;
            expect(data).to.be.deep.equal({
                payload: "MID-Teste"
            });

            mid.serializer(data, {}, (err, data) => {
                expect(err).to.be.null;
                expect(data).to.be.deep.equal(msg);
            });

            expect(mid.revision()).to.have.lengthOf(revisions);
            done();
        });
    });

    it("MID0040", (done) => {

        let midTest = 40;
        let revisions = 5;

        let mid = mids[midTest];
        let msg = {
            payload: Buffer.from("MID-Teste")
        };

        mid.parser(msg, {}, (err, data) => {
            expect(err).to.be.null;
            expect(data).to.be.deep.equal({
                payload: "MID-Teste"
            });

            mid.serializer(data, {}, (err, data) => {
                expect(err).to.be.null;
                expect(data).to.be.deep.equal(msg);
            });

            expect(mid.revision()).to.have.lengthOf(revisions);
            done();
        });
    });

    it("MID0042", (done) => {

        let midTest = 42;
        let revisions = 1;

        let mid = mids[midTest];
        let msg = {
            payload: Buffer.from("MID-Teste")
        };

        mid.parser(msg, {}, (err, data) => {
            expect(err).to.be.null;
            expect(data).to.be.deep.equal({
                payload: "MID-Teste"
            });

            mid.serializer(data, {}, (err, data) => {
                expect(err).to.be.null;
                expect(data).to.be.deep.equal(msg);
            });

            expect(mid.revision()).to.have.lengthOf(revisions);
            done();
        });
    });

    it("MID0043", (done) => {

        let midTest = 43;
        let revisions = 1;

        let mid = mids[midTest];
        let msg = {
            payload: Buffer.from("MID-Teste")
        };

        mid.parser(msg, {}, (err, data) => {
            expect(err).to.be.null;
            expect(data).to.be.deep.equal({
                payload: "MID-Teste"
            });

            mid.serializer(data, {}, (err, data) => {
                expect(err).to.be.null;
                expect(data).to.be.deep.equal(msg);
            });

            expect(mid.revision()).to.have.lengthOf(revisions);
            done();
        });
    });

    it("MID0044", (done) => {

        let midTest = 44;
        let revisions = 1;

        let mid = mids[midTest];
        let msg = {
            payload: Buffer.from("MID-Teste")
        };

        mid.parser(msg, {}, (err, data) => {
            expect(err).to.be.null;
            expect(data).to.be.deep.equal({
                payload: "MID-Teste"
            });

            mid.serializer(data, {}, (err, data) => {
                expect(err).to.be.null;
                expect(data).to.be.deep.equal(msg);
            });

            expect(mid.revision()).to.have.lengthOf(revisions);
            done();
        });
    });

    it("MID0080", (done) => {

        let midTest = 80;
        let revisions = 1;

        let mid = mids[midTest];
        let msg = {
            payload: Buffer.from("MID-Teste")
        };

        mid.parser(msg, {}, (err, data) => {
            expect(err).to.be.null;
            expect(data).to.be.deep.equal({
                payload: "MID-Teste"
            });

            mid.serializer(data, {}, (err, data) => {
                expect(err).to.be.null;
                expect(data).to.be.deep.equal(msg);
            });

            expect(mid.revision()).to.have.lengthOf(revisions);
            done();
        });
    });

    it("MID0091", (done) => {

        let midTest = 91;
        let revisions = 1;

        let mid = mids[midTest];
        let msg = {
            payload: Buffer.from("MID-Teste")
        };

        mid.parser(msg, {}, (err, data) => {
            expect(err).to.be.null;
            expect(data).to.be.deep.equal({
                payload: "MID-Teste"
            });

            mid.serializer(data, {}, (err, data) => {
                expect(err).to.be.null;
                expect(data).to.be.deep.equal(msg);
            });

            expect(mid.revision()).to.have.lengthOf(revisions);
            done();
        });
    });

    it("MID0113", (done) => {

        let midTest = 113;
        let revisions = 1;

        let mid = mids[midTest];
        let msg = {
            payload: Buffer.from("MID-Teste")
        };

        mid.parser(msg, {}, (err, data) => {
            expect(err).to.be.null;
            expect(data).to.be.deep.equal({
                payload: "MID-Teste"
            });

            mid.serializer(data, {}, (err, data) => {
                expect(err).to.be.null;
                expect(data).to.be.deep.equal(msg);
            });

            expect(mid.revision()).to.have.lengthOf(revisions);
            done();
        });
    });

    it("MID0121", (done) => {

        let midTest = 121;
        let revisions = 1;

        let mid = mids[midTest];
        let msg = {
            payload: Buffer.from("MID-Teste")
        };

        mid.parser(msg, {}, (err, data) => {
            expect(err).to.be.null;
            expect(data).to.be.deep.equal({
                payload: "MID-Teste"
            });

            mid.serializer(data, {}, (err, data) => {
                expect(err).to.be.null;
                expect(data).to.be.deep.equal(msg);
            });

            expect(mid.revision()).to.have.lengthOf(revisions);
            done();
        });
    });

    it("MID0127", (done) => {

        let midTest = 127;
        let revisions = 1;

        let mid = mids[midTest];
        let msg = {
            payload: Buffer.from("MID-Teste")
        };

        mid.parser(msg, {}, (err, data) => {
            expect(err).to.be.null;
            expect(data).to.be.deep.equal({
                payload: "MID-Teste"
            });

            mid.serializer(data, {}, (err, data) => {
                expect(err).to.be.null;
                expect(data).to.be.deep.equal(msg);
            });

            expect(mid.revision()).to.have.lengthOf(revisions);
            done();
        });
    });

    it("MID0128", (done) => {

        let midTest = 128;
        let revisions = 1;

        let mid = mids[midTest];
        let msg = {
            payload: Buffer.from("MID-Teste")
        };

        mid.parser(msg, {}, (err, data) => {
            expect(err).to.be.null;
            expect(data).to.be.deep.equal({
                payload: "MID-Teste"
            });

            mid.serializer(data, {}, (err, data) => {
                expect(err).to.be.null;
                expect(data).to.be.deep.equal(msg);
            });

            expect(mid.revision()).to.have.lengthOf(revisions);
            done();
        });
    });

    it("MID0131", (done) => {

        let midTest = 131;
        let revisions = 1;

        let mid = mids[midTest];
        let msg = {
            payload: Buffer.from("MID-Teste")
        };

        mid.parser(msg, {}, (err, data) => {
            expect(err).to.be.null;
            expect(data).to.be.deep.equal({
                payload: "MID-Teste"
            });

            mid.serializer(data, {}, (err, data) => {
                expect(err).to.be.null;
                expect(data).to.be.deep.equal(msg);
            });

            expect(mid.revision()).to.have.lengthOf(revisions);
            done();
        });
    });

    it("MID0132", (done) => {

        let midTest = 132;
        let revisions = 1;

        let mid = mids[midTest];
        let msg = {
            payload: Buffer.from("MID-Teste")
        };

        mid.parser(msg, {}, (err, data) => {
            expect(err).to.be.null;
            expect(data).to.be.deep.equal({
                payload: "MID-Teste"
            });

            mid.serializer(data, {}, (err, data) => {
                expect(err).to.be.null;
                expect(data).to.be.deep.equal(msg);
            });

            expect(mid.revision()).to.have.lengthOf(revisions);
            done();
        });
    });

    it("MID0133", (done) => {

        let midTest = 133;
        let revisions = 1;

        let mid = mids[midTest];
        let msg = {
            payload: Buffer.from("MID-Teste")
        };

        mid.parser(msg, {}, (err, data) => {
            expect(err).to.be.null;
            expect(data).to.be.deep.equal({
                payload: "MID-Teste"
            });

            mid.serializer(data, {}, (err, data) => {
                expect(err).to.be.null;
                expect(data).to.be.deep.equal(msg);
            });

            expect(mid.revision()).to.have.lengthOf(revisions);
            done();
        });
    });

    it("MID0152", (done) => {

        let midTest = 152;
        let revisions = 1;

        let mid = mids[midTest];
        let msg = {
            payload: Buffer.from("MID-Teste")
        };

        mid.parser(msg, {}, (err, data) => {
            expect(err).to.be.null;
            expect(data).to.be.deep.equal({
                payload: "MID-Teste"
            });

            mid.serializer(data, {}, (err, data) => {
                expect(err).to.be.null;
                expect(data).to.be.deep.equal(msg);
            });

            expect(mid.revision()).to.have.lengthOf(revisions);
            done();
        });
    });

    it("MID0155", (done) => {

        let midTest = 155;
        let revisions = 1;

        let mid = mids[midTest];
        let msg = {
            payload: Buffer.from("MID-Teste")
        };

        mid.parser(msg, {}, (err, data) => {
            expect(err).to.be.null;
            expect(data).to.be.deep.equal({
                payload: "MID-Teste"
            });

            mid.serializer(data, {}, (err, data) => {
                expect(err).to.be.null;
                expect(data).to.be.deep.equal(msg);
            });

            expect(mid.revision()).to.have.lengthOf(revisions);
            done();
        });
    });

    it("MID0156", (done) => {

        let midTest = 156;
        let revisions = 1;

        let mid = mids[midTest];
        let msg = {
            payload: Buffer.from("MID-Teste")
        };

        mid.parser(msg, {}, (err, data) => {
            expect(err).to.be.null;
            expect(data).to.be.deep.equal({
                payload: "MID-Teste"
            });

            mid.serializer(data, {}, (err, data) => {
                expect(err).to.be.null;
                expect(data).to.be.deep.equal(msg);
            });

            expect(mid.revision()).to.have.lengthOf(revisions);
            done();
        });
    });

    it("MID0157", (done) => {

        let midTest = 157;
        let revisions = 1;

        let mid = mids[midTest];
        let msg = {
            payload: Buffer.from("MID-Teste")
        };

        mid.parser(msg, {}, (err, data) => {
            expect(err).to.be.null;
            expect(data).to.be.deep.equal({
                payload: "MID-Teste"
            });

            mid.serializer(data, {}, (err, data) => {
                expect(err).to.be.null;
                expect(data).to.be.deep.equal(msg);
            });

            expect(mid.revision()).to.have.lengthOf(revisions);
            done();
        });
    });

    it("MID0211", (done) => {

        let midTest = 211;
        let revisions = 1;

        let mid = mids[midTest];
        let msg = {
            payload: Buffer.from("MID-Teste")
        };

        mid.parser(msg, {}, (err, data) => {
            expect(err).to.be.null;
            expect(data).to.be.deep.equal({
                payload: "MID-Teste"
            });

            mid.serializer(data, {}, (err, data) => {
                expect(err).to.be.null;
                expect(data).to.be.deep.equal(msg);
            });

            expect(mid.revision()).to.have.lengthOf(revisions);
            done();
        });
    });

    it("MID0242", (done) => {

        let midTest = 242;
        let revisions = 1;

        let mid = mids[midTest];
        let msg = {
            payload: Buffer.from("MID-Teste")
        };

        mid.parser(msg, {}, (err, data) => {
            expect(err).to.be.null;
            expect(data).to.be.deep.equal({
                payload: "MID-Teste"
            });

            mid.serializer(data, {}, (err, data) => {
                expect(err).to.be.null;
                expect(data).to.be.deep.equal(msg);
            });

            expect(mid.revision()).to.have.lengthOf(revisions);
            done();
        });
    });

    it("MID0251", (done) => {

        let midTest = 251;
        let revisions = 1;

        let mid = mids[midTest];
        let msg = {
            payload: Buffer.from("MID-Teste")
        };

        mid.parser(msg, {}, (err, data) => {
            expect(err).to.be.null;
            expect(data).to.be.deep.equal({
                payload: "MID-Teste"
            });

            mid.serializer(data, {}, (err, data) => {
                expect(err).to.be.null;
                expect(data).to.be.deep.equal(msg);
            });

            expect(mid.revision()).to.have.lengthOf(revisions);
            done();
        });
    });

    it("MID0260", (done) => {

        let midTest = 260;
        let revisions = 1;

        let mid = mids[midTest];
        let msg = {
            payload: Buffer.from("MID-Teste")
        };

        mid.parser(msg, {}, (err, data) => {
            expect(err).to.be.null;
            expect(data).to.be.deep.equal({
                payload: "MID-Teste"
            });

            mid.serializer(data, {}, (err, data) => {
                expect(err).to.be.null;
                expect(data).to.be.deep.equal(msg);
            });

            expect(mid.revision()).to.have.lengthOf(revisions);
            done();
        });
    });

    it("MID0262", (done) => {

        let midTest = 262;
        let revisions = 1;

        let mid = mids[midTest];
        let msg = {
            payload: Buffer.from("MID-Teste")
        };

        mid.parser(msg, {}, (err, data) => {
            expect(err).to.be.null;
            expect(data).to.be.deep.equal({
                payload: "MID-Teste"
            });

            mid.serializer(data, {}, (err, data) => {
                expect(err).to.be.null;
                expect(data).to.be.deep.equal(msg);
            });

            expect(mid.revision()).to.have.lengthOf(revisions);
            done();
        });
    });

    it("MID0270", (done) => {

        let midTest = 270;
        let revisions = 1;

        let mid = mids[midTest];
        let msg = {
            payload: Buffer.from("MID-Teste")
        };

        mid.parser(msg, {}, (err, data) => {
            expect(err).to.be.null;
            expect(data).to.be.deep.equal({
                payload: "MID-Teste"
            });

            mid.serializer(data, {}, (err, data) => {
                expect(err).to.be.null;
                expect(data).to.be.deep.equal(msg);
            });

            expect(mid.revision()).to.have.lengthOf(revisions);
            done();
        });
    });

    it("MID0401", (done) => {

        let midTest = 401;
        let revisions = 1;

        let mid = mids[midTest];
        let msg = {
            payload: Buffer.from("MID-Teste")
        };

        mid.parser(msg, {}, (err, data) => {
            expect(err).to.be.null;
            expect(data).to.be.deep.equal({
                payload: "MID-Teste"
            });

            mid.serializer(data, {}, (err, data) => {
                expect(err).to.be.null;
                expect(data).to.be.deep.equal(msg);
            });

            expect(mid.revision()).to.have.lengthOf(revisions);
            done();
        });
    });

    it("MID0410", (done) => {

        let midTest = 410;
        let revisions = 1;

        let mid = mids[midTest];
        let msg = {
            payload: Buffer.from("MID-Teste")
        };

        mid.parser(msg, {}, (err, data) => {
            expect(err).to.be.null;
            expect(data).to.be.deep.equal({
                payload: "MID-Teste"
            });

            mid.serializer(data, {}, (err, data) => {
                expect(err).to.be.null;
                expect(data).to.be.deep.equal(msg);
            });

            expect(mid.revision()).to.have.lengthOf(revisions);
            done();
        });
    });

    it("MID0421", (done) => {

        let midTest = 421;
        let revisions = 1;

        let mid = mids[midTest];
        let msg = {
            payload: Buffer.from("MID-Teste")
        };

        mid.parser(msg, {}, (err, data) => {
            expect(err).to.be.null;
            expect(data).to.be.deep.equal({
                payload: "MID-Teste"
            });

            mid.serializer(data, {}, (err, data) => {
                expect(err).to.be.null;
                expect(data).to.be.deep.equal(msg);
            });

            expect(mid.revision()).to.have.lengthOf(revisions);
            done();
        });
    });

    it("MID0501", (done) => {

        let midTest = 501;
        let revisions = 1;

        let mid = mids[midTest];
        let msg = {
            payload: Buffer.from("MID-Teste")
        };

        mid.parser(msg, {}, (err, data) => {
            expect(err).to.be.null;
            expect(data).to.be.deep.equal({
                payload: "MID-Teste"
            });

            mid.serializer(data, {}, (err, data) => {
                expect(err).to.be.null;
                expect(data).to.be.deep.equal(msg);
            });

            expect(mid.revision()).to.have.lengthOf(revisions);
            done();
        });
    });

    it("MID0504", (done) => {

        let midTest = 504;
        let revisions = 1;

        let mid = mids[midTest];
        let msg = {
            payload: Buffer.from("MID-Teste")
        };

        mid.parser(msg, {}, (err, data) => {
            expect(err).to.be.null;
            expect(data).to.be.deep.equal({
                payload: "MID-Teste"
            });

            mid.serializer(data, {}, (err, data) => {
                expect(err).to.be.null;
                expect(data).to.be.deep.equal(msg);
            });

            expect(mid.revision()).to.have.lengthOf(revisions);
            done();
        });
    });

    it("MID2600", (done) => {

        let midTest = 2600;
        let revisions = 1;

        let mid = mids[midTest];
        let msg = {
            payload: Buffer.from("MID-Teste")
        };

        mid.parser(msg, {}, (err, data) => {
            expect(err).to.be.null;
            expect(data).to.be.deep.equal({
                payload: "MID-Teste"
            });

            mid.serializer(data, {}, (err, data) => {
                expect(err).to.be.null;
                expect(data).to.be.deep.equal(msg);
            });

            expect(mid.revision()).to.have.lengthOf(revisions);
            done();
        });
    });
});