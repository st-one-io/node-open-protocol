//@ts-check
/*
  Copyright: (c) 2018-2020, Smart-Tech Controle e Automação
  GNU General Public License v3.0+ (see LICENSE or https://www.gnu.org/licenses/gpl-3.0.txt)
*/

const {
    expect
} = require('chai');

const OpenProtocolParser = require('../src/openProtocolParser.js');

const Stream = require('stream');

describe("Open Protocol Parser", () => {

    it('should be a stream', () => {
        expect(new OpenProtocolParser()).to.be.instanceOf(Stream);
    });

    it('should create a new instance', () => {
        expect(new OpenProtocolParser).to.be.instanceOf(Stream);
    });

    it('should emit an error when input is not a buffer', (done) => {
        let parser = new OpenProtocolParser();
        parser.on('error', (err) => {
            expect(err).to.be.an('error');
            done();
        });

        parser.write({});
    });

    it('should parse normally when the input is a string', (done) => {
        let parser = new OpenProtocolParser();
        parser.on('data', (data) => {
            expect(data).to.be.deep.equal({
                mid: 240,
                revision: 1,
                noAck: false,
                stationID: 1,
                spindleID: 1,
                sequenceNumber: 0,
                messageParts: 0,
                messageNumber: 0,
                payload: Buffer.from("20")
            });
            done();
        });

        // 002202400010        20[Null]
        parser.write('002202400010        20\u0000');
    });

    it('should parse normally when the input is a buffer', (done) => {
        let parser = new OpenProtocolParser();
        parser.on('data', (data) => {
            expect(data).to.be.deep.equal({
                mid: 240,
                revision: 1,
                noAck: false,
                stationID: 1,
                spindleID: 1,
                sequenceNumber: 0,
                messageParts: 0,
                messageNumber: 0,
                payload: Buffer.from("20")
            });
            done();
        });

        // 002202400010        20[Null]
        parser.write(Buffer.from("3030323230323430303031302020202020202020323000", "hex"));
    });

    it('should parse normally when the input is a two strings and first message greater than 20', (done) => {
        let parser = new OpenProtocolParser();
        parser.on('data', (data) => {
            expect(data).to.be.deep.equal({
                mid: 240,
                revision: 1,
                noAck: false,
                stationID: 1,
                spindleID: 1,
                sequenceNumber: 0,
                messageParts: 0,
                messageNumber: 0,
                payload: Buffer.from("20")
            });
            done();
        });

        // 002202400010        20[Null]
        parser.write("002202400010        2");
        parser.write("0\u0000");
    });

    it('should parse normally when the input is a two strings and first message less than 20', (done) => {
        let parser = new OpenProtocolParser();
        parser.on('data', (data) => {
            expect(data).to.be.deep.equal({
                mid: 240,
                revision: 1,
                noAck: false,
                stationID: 1,
                spindleID: 1,
                sequenceNumber: 0,
                messageParts: 0,
                messageNumber: 0,
                payload: Buffer.from("20")
            });
            done();
        });

        // 002202400010        20[Null]
        parser.write("002202");
        parser.write("400010        20\u0000");
    });

    it('should emit an error when input with wrong length', (done) => {
        let parser = new OpenProtocolParser();
        parser.on('error', (err) => {
            expect(err).to.be.an('error');
            done();
        });

        // AAB202400010        20[Null]
        parser.write('AAB202400010        20\u0000');
    });

    it('should emit an error when input with wrong mid', (done) => {
        let parser = new OpenProtocolParser();
        parser.on('error', (err) => {
            expect(err).to.be.an('error');
            done();
        });

        // 0022024A0010        20[Null]
        parser.write('0022024A0010        20\u0000');
    });

    it('should emit an error when input with wrong revision', (done) => {
        let parser = new OpenProtocolParser();
        parser.on('error', (err) => {
            expect(err).to.be.an('error');
            done();
        });

        // 0022024000A0        20[Null]
        parser.write('0022024000A0        20\u0000');
    });

    it('should emit an error when input with wrong no ack', (done) => {
        let parser = new OpenProtocolParser();
        parser.on('error', (err) => {
            expect(err).to.be.an('error');
            done();
        });

        // 00220240001A        20[Null]
        parser.write('00220240001A        20\u0000');
    });

    it('should emit an error when input with wrong station id', (done) => {
        let parser = new OpenProtocolParser();
        parser.on('error', (err) => {
            expect(err).to.be.an('error');
            done();
        });

        // 0022024000100A      20[Null]
        parser.write('0022024000100A      20\u0000');
    });

    it('should emit an error when input with wrong spindle id', (done) => {
        let parser = new OpenProtocolParser();
        parser.on('error', (err) => {
            expect(err).to.be.an('error');
            done();
        });

        // 002202400010  0B    20[Null]
        parser.write('002202400010  0B    20\u0000');
    });

    it('should emit an error when input with wrong sequence number', (done) => {
        let parser = new OpenProtocolParser();
        parser.on('error', (err) => {
            expect(err).to.be.an('error');
            done();
        });

        // 002202400010    0D  20[Null]
        parser.write('002202400010    0D  20\u0000');
    });

    it('should emit an error when input with wrong message parts', (done) => {
        let parser = new OpenProtocolParser();
        parser.on('error', (err) => {
            expect(err).to.be.an('error');
            done();
        });

        // 002202400010      A 20[Null]
        parser.write('002202400010      A 20\u0000');
    });

    it('should emit an error when input with wrong message number', (done) => {
        let parser = new OpenProtocolParser();
        parser.on('error', (err) => {
            expect(err).to.be.an('error');
            done();
        });

        // 002202400010       B20[Null]
        parser.write('002202400010       B20\u0000');
    });

    it('should parse normally when the input is a string with old defaulds', (done) => {
        let parser = new OpenProtocolParser();
        parser.on('data', (data) => {
            expect(data).to.be.deep.equal({
                mid: 240,
                revision: 1,
                noAck: false,
                stationID: 1,
                spindleID: 1,
                sequenceNumber: 0,
                messageParts: 0,
                messageNumber: 0,
                payload: Buffer.from("20")
            });
            done();
        });

        // 00220240    0000    20[Null]
        parser.write('00220240    0000    20\u0000');
    });

    it('should parse normally when the input is a string with and revision equal 000', (done) => {
        let parser = new OpenProtocolParser();
        parser.on('data', (data) => {
            expect(data).to.be.deep.equal({
                mid: 240,
                revision: 1,
                noAck: false,
                stationID: 1,
                spindleID: 1,
                sequenceNumber: 0,
                messageParts: 0,
                messageNumber: 0,
                payload: Buffer.from("20")
            });
            done();
        });

        // 00220240000 0000    20[Null]
        parser.write('00220240000 0000    20\u0000');
    });

    it('should emit an error when input with wrong message', (done) => {
        let parser = new OpenProtocolParser();
        parser.on('error', (err) => {
            expect(err).to.be.an('error');
            done();
        });

        // 002202400010        200
        parser.write('002202400010        200');
    });


    it('duas mensagens juntas', (done) => {
        let parser = new OpenProtocolParser();

        let response = [];

        parser.on('data', (data) => {

            response.push(data);

            if(response.length < 2) return;

            expect(response).to.be.deep.equal([{
                mid: 240,
                revision: 1,
                noAck: false,
                stationID: 1,
                spindleID: 1,
                sequenceNumber: 0,
                messageParts: 0,
                messageNumber: 0,
                payload: Buffer.from("20")
            },        
            {
                mid: 5555,
                revision: 1,
                noAck: false,
                stationID: 1,
                spindleID: 1,
                sequenceNumber: 0,
                messageParts: 0,
                messageNumber: 0,
                payload: Buffer.from("20")
            }]);
            done();
        });

        // 002202400010        20[Null]
        parser.write('002202400010        20\u0000002255550010        20\u0000');
    });


    it('MID0081 - should parse normally when the input is a string', (done) => {
        let parser = new OpenProtocolParser();
        parser.on('data', (data) => {
            expect(data).to.be.deep.equal({
                mid: 81,
                revision: 1,
                noAck: false,
                stationID: 1,
                spindleID: 1,
                sequenceNumber: 0,
                messageParts: 0,
                messageNumber: 0,
                payload: Buffer.from("2018-06-08:20:50:09")
            });
            done();
        });

        // 002202400010        20[Null]
        parser.write('0039008100          2018-06-08:20:50:09\u0000');
    });
    
});
