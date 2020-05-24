//@ts-check
/*
  Copyright: (c) 2018-2020, Smart-Tech Controle e Automação
  GNU General Public License v3.0+ (see LICENSE or https://www.gnu.org/licenses/gpl-3.0.txt)
*/

const {
    expect
} = require('chai');

const MID = require('../src/mid/0071.js');

describe("MID 0071", () => {

    it("parser rev 1", (done) => {
        
        let msg = {
            mid: 71,
            revision: 1,
            payload: Buffer.from("01E404021031042008-06-02:10:14:26")
        };

        MID.parser(msg, {}, (err, data) => {

            if(err){
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 71,
                revision: 1,
                payload: {
                    errorCode: "E404",
                    controllerReadyStatus: 1,
                    toolReadyStatus: 1,
                    timeStamp: "2008-06-02:10:14:26"                  
                }
            });

            done();
        });
    }); 

    it("parser rev 2", (done) => {
        
        let msg = {
            mid: 71,
            revision: 2,
            payload: Buffer.from("01ER404021031042008-06-02:10:14:2605APERTO NOK - AQUICIMENTO DA FERRAMENTA            ")
        };

        MID.parser(msg, {}, (err, data) => {

            if(err){
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 71,
                revision: 2,
                payload: {
                    errorCode: "ER404",
                    controllerReadyStatus: 1,
                    toolReadyStatus: 1,
                    timeStamp: "2008-06-02:10:14:26",
                    alarmText: "APERTO NOK - AQUICIMENTO DA FERRAMENTA"                
                }
            });

            done();
        });
    }); 
   
    it("serializer rev 1", (done) => {
        
        let msg = {
            mid: 71,
            revision: 1,
            payload: {
                errorCode: "E404",
                controllerReadyStatus: 1,
                toolReadyStatus: 1,
                timeStamp: "2008-06-02:10:14:26"                  
            }
        };

        MID.serializer(msg, {}, (err, data) => {

            if(err){
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 71,
                revision: 1,
                payload: Buffer.from("01E404021031042008-06-02:10:14:26")
            });

            done();
        });
    }); 

    it("serializer rev 2", (done) => {
        
        let msg = {
            mid: 71,
            revision: 2,
            payload: {
                errorCode: "ER404",
                controllerReadyStatus: 1,
                toolReadyStatus: 1,
                timeStamp: "2008-06-02:10:14:26",
                alarmText: "APERTO NOK - AQUICIMENTO DA FERRAMENTA"                
            }
        };

        MID.serializer(msg, {}, (err, data) => {

            if(err){
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 71,
                revision: 2,
                payload: Buffer.from("01ER404021031042008-06-02:10:14:2605APERTO NOK - AQUICIMENTO DA FERRAMENTA            ")
            });

            done();
        });
    }); 

    it("Should return error, parser with invalid revision", (done) => {

        let msg = {
            mid: 71,
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
            mid: 71,
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