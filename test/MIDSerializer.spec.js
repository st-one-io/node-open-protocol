//@ts-check
/*
  Copyright: (c) 2018-2020, Smart-Tech Controle e Automação
  GNU General Public License v3.0+ (see LICENSE or https://www.gnu.org/licenses/gpl-3.0.txt)
*/

const {
    expect
} = require('chai');

const MIDSerializer = require('../src/MIDSerializer.js');

describe("MIDSerializer", () => {

    it("Serializer MID0002-1 with exists serializer", (done) => {

        let msg = {
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
        };

        let serializer = new MIDSerializer();

        serializer.on('data', (data) => {
            expect(data).to.be.deep.equal({
                mid: 2,
                revision: 1,
                noAck: false,
                stationID: 1,
                spindleID: 1,
                sequenceNumber: 0,
                messageParts: 0,
                messageNumber: 0,
                payload: Buffer.from("010001020103Teste Airbag             ")
            });
            done();
        });

        serializer.write(msg);
    });

    it("Serializer MID0002-1 with exists serializer error", (done) => {

        let msg = {
            mid: 2,
            revision: 2,
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
        };

        let serializer = new MIDSerializer();

        serializer.on('error', (err) => {
            expect(err).to.be.an('error');
            done();
        });

        serializer.write(msg);
    });

    it("Serializer MID5555-1 without exists serializer", (done) => {

        let msg = {
            mid: 5555,
            revision: 1,
            noAck: false,
            stationID: 1,
            spindleID: 1,
            sequenceNumber: 0,
            messageParts: 0,
            messageNumber: 0,
            payload: "Teste Airbag"
        };

        let serializer = new MIDSerializer();

        serializer.on('data', (data) => {
            expect(data).to.be.deep.equal({
                mid: 5555,
                revision: 1,
                noAck: false,
                stationID: 1,
                spindleID: 1,
                sequenceNumber: 0,
                messageParts: 0,
                messageNumber: 0,
                payload: Buffer.from("Teste Airbag")
            });
            done();
        });

        serializer.write(msg);
    });

    it("Serializer MID5555-1 without exists serializer error", (done) => {

        let msg = {
            mid: 5555,
            revision: 1,
            noAck: false,
            stationID: 1,
            spindleID: 1,
            sequenceNumber: 0,
            messageParts: 0,
            messageNumber: 0,
            payload: {
                text: "Teste Airbag"
            }
        };

        let serializer = new MIDSerializer();

        serializer.on('error', (err) => {
            expect(err).to.be.an('error');
            done();
        });

        serializer.write(msg);
    });


});