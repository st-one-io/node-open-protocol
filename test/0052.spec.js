//@ts-check
/*
  Copyright: (c) 2018-2020, Smart-Tech Controle e Automação
  GNU General Public License v3.0+ (see LICENSE or https://www.gnu.org/licenses/gpl-3.0.txt)
*/

const {
    expect
} = require('chai');

const MID = require('../src/mid/0052.js');

describe("MID 0052", () => {

    it("parser rev 1", (done) => {
        
        let msg = {
            mid: 52,
            revision: 1,
            payload: Buffer.from("SDDFCVNJHGF5632DFREGHYTCV")
        };

        MID.parser(msg, {}, (err, data) => {

            if(err){
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 52,
                revision: 1,
                payload: {
                    numberVIN: "SDDFCVNJHGF5632DFREGHYTCV"
                }
            });

            done();
        });
    }); 

    it("parser rev 2", (done) => {
        
        let msg = {
            mid: 52,
            revision: 2,
            payload: Buffer.from("01AAAAAAAAAAAAAAAAAAAAAAAAA02BBBBBBBBBBBBBBBBBBBBBBBBB03CCCCCCCCCCCCCCCCCCCCCCCCC04DDDDDDDDDDDDDDDDDDDDDDDDD")
        };

        MID.parser(msg, {}, (err, data) => {

            if(err){
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 52,
                revision: 2,
                payload: {
                    numberVIN: "AAAAAAAAAAAAAAAAAAAAAAAAA",
                    identifierPart2: "BBBBBBBBBBBBBBBBBBBBBBBBB",
                    identifierPart3: "CCCCCCCCCCCCCCCCCCCCCCCCC",
                    identifierPart4: "DDDDDDDDDDDDDDDDDDDDDDDDD"
                }
            });

            done();
        });
    }); 

    it("serializer rev 1", (done) => {
        
        let msg = {
            mid: 52,
            revision: 1,
            payload: {
                numberVIN: "SDDFCVNJHGF5632DFREGHYTCV"
            }       
        };

        MID.serializer(msg, {}, (err, data) => {

            if(err){
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 52,
                revision: 1,
                payload: Buffer.from("SDDFCVNJHGF5632DFREGHYTCV")
            });

            done();
        });
    }); 

    it("serializer rev 2", (done) => {
        
        let msg = {
            mid: 52,
            revision: 2,
            payload: {
                numberVIN: "WSDERF652HGF965REDS201498",
                identifierPart2: "WSDGRFDESVBOERDLGFD85EDFR",
                identifierPart3: "QASWERFVBGT 98756412EDCGH",
                identifierPart4: "KJHNHY 985641WSXCFTHNMKOY"
            }     
        };

        MID.serializer(msg, {}, (err, data) => {

            if(err){
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 52,
                revision: 2,
                payload: Buffer.from("01WSDERF652HGF965REDS20149802WSDGRFDESVBOERDLGFD85EDFR03QASWERFVBGT 98756412EDCGH04KJHNHY 985641WSXCFTHNMKOY")
            });

            done();
        });
    }); 

    it("Should return error, parser with invalid revision", (done) => {

        let msg = {
            mid: 52,
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
            mid: 52,
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