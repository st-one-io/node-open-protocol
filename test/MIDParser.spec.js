//@ts-check
/*
  Copyright: (c) 2018-2020, Smart-Tech Controle e Automação
  GNU General Public License v3.0+ (see LICENSE or https://www.gnu.org/licenses/gpl-3.0.txt)
*/

const {
    expect
} = require('chai');

const MIDParser = require('../src/MIDParser.js');

describe("MIDParser", () => {

    it("parser MID0002-1 with exists parser", (done) => {

        let msg = {
            mid: 2,
            revision: 1,
            noAck: false,
            stationID: 1,
            spindleID: 1,
            sequenceNumber: 0,
            messageParts: 0,
            messageNumber: 0,
            payload: Buffer.from("010001020103Teste Airbag             ")
        };

        let parser = new MIDParser();

        parser.on('data', (data) => {
            expect(data).to.be.deep.equal({
                mid: 2,
                revision: 1,
                noAck: false,
                stationID: 1,
                spindleID: 1,
                sequenceNumber: 0,
                messageParts: 0,
                messageNumber: 0,
                payload: {
                    cellID: 1,
                    channelID: 1,
                    controllerName: "Teste Airbag"
                }
            });
            done();
        });

        parser.write(msg);
    });

    it("parser MID0002-1 with exists parser error", (done) => {

        let msg = {
            mid: 2,
            revision: 2,
            noAck: false,
            stationID: 1,
            spindleID: 1,
            sequenceNumber: 0,
            messageParts: 0,
            messageNumber: 0,
            payload: Buffer.from("010001020103Teste Airbag             ")
        };

        let parser = new MIDParser();

        parser.on('error', (err) => {
            expect(err).to.be.an('error');
            done();
        });

        parser.write(msg);
    });

    it("parser MID5555-1 without exists parser", (done) => {

        let msg = {
            mid: 5555,
            revision: 1,
            noAck: false,
            stationID: 1,
            spindleID: 1,
            sequenceNumber: 0,
            messageParts: 0,
            messageNumber: 0,
            payload: Buffer.from("Teste de Validacao       ")
        };

        let parser = new MIDParser();

        parser.on('data', (data) => {
            expect(data).to.be.deep.equal({
                mid: 5555,
                revision: 1,
                noAck: false,
                stationID: 1,
                spindleID: 1,
                sequenceNumber: 0,
                messageParts: 0,
                messageNumber: 0,
                payload: "Teste de Validacao       "
            });
            done();
        });

        parser.write(msg);
    });

    it("parser MID5555-1 without exists parser error", (done) => {

        let msg = {
            mid: 5555,
            revision: 1,
            noAck: false,
            stationID: 1,
            spindleID: 1,
            sequenceNumber: 0,
            messageParts: 0,
            messageNumber: 0,
            payload: "Teste de Validacao       "
        };

        let parser = new MIDParser();

        parser.on('error', (err) => {
            expect(err).to.be.an('error');
            done();
        });

        parser.write(msg);
    });

});