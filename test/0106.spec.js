//@ts-check
/*
  Copyright: (c) 2018-2020, Smart-Tech Controle e Automação
  GNU General Public License v3.0+ (see LICENSE or https://www.gnu.org/licenses/gpl-3.0.txt)
*/

const {
    expect
} = require('chai');

const MID = require('../src/mid/0106.js');

describe("MID 0106", () => {

    it("parser rev 1", (done) => {
        
        // this has been manually written, as per the docs. Needs to replace with real data
        let msg = {
            mid: 106,
            revision: 1,
            payload: Buffer.from("01030201030123456789040105STATION-TEST        062019-03-08:10:28:29070108Mode 1              09110011                                        120213011411511611720.13001845.07201922.00002018.0000219999.992200.000013021411511611721.07001846.16101922.00002018.0000219999.992200.00002300")
        };

        MID.parser(msg, {}, (err, data) => {

            if(err){
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 106,
                revision: 1,
                payload: {
                    totalNoOfMessages: 3,
                    messageNumber: 1,
                    dataNoSystem: 123456789,
                    stationNo: 1,
                    stationName: "STATION-TEST",
                    time: "2019-03-08:10:28:29",
                    modeNo: 1,
                    modeName: "Mode 1",
                    simpleStatus: 1,
                    pmStatus: 0,
                    wpId: "",
                    numberOfBolts: 2,
                    bolts: [
                        {
                            ordinalBoltNumber: 1,
                            simpleBoltStatus: 1,
                            torqueStatus: 1,
                            angleStatus: 1,
                            boltT: 20.13,
                            boltA: 45.072,
                            boltTHighLimit: 22,
                            boltTLowLimit: 18,
                            boltAHighLimit: 9999.99,
                            boltALowLimit: 0
                        },
                        {
                            ordinalBoltNumber: 2,
                            simpleBoltStatus: 1,
                            torqueStatus: 1,
                            angleStatus: 1,
                            boltT: 21.07,
                            boltA: 46.161,
                            boltTHighLimit: 22,
                            boltTLowLimit: 18,
                            boltAHighLimit: 9999.99,
                            boltALowLimit: 0
                        }
                    ],
                    numberOfSpecialValues: 0,
                    specialValues: []
                }
            });

            done();
        });
    }); 

    it("parser rev 1 with special values", (done) => {

        // this has been manually written, as per the docs. Needs to replace with real data
        let msg = {
            mid: 106,
            revision: 1,
            payload: Buffer.from("01020201030123456789040105STATION-TEST        062019-03-08:10:28:29070108Mode 1              09110011                                        120113011411511611720.13001845.07201922.00002018.0000219999.992200.00002302specialTestVar1     UI06222222specialTestVar2     UI20This is a test      ")
        };

        MID.parser(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 106,
                revision: 1,
                payload: {
                    totalNoOfMessages: 2,
                    messageNumber: 1,
                    dataNoSystem: 123456789,
                    stationNo: 1,
                    stationName: "STATION-TEST",
                    time: "2019-03-08:10:28:29",
                    modeNo: 1,
                    modeName: "Mode 1",
                    simpleStatus: 1,
                    pmStatus: 0,
                    wpId: "",
                    numberOfBolts: 1,
                    bolts: [
                        {
                            ordinalBoltNumber: 1,
                            simpleBoltStatus: 1,
                            torqueStatus: 1,
                            angleStatus: 1,
                            boltT: 20.13,
                            boltA: 45.072,
                            boltTHighLimit: 22,
                            boltTLowLimit: 18,
                            boltAHighLimit: 9999.99,
                            boltALowLimit: 0
                        }
                    ],
                    numberOfSpecialValues: 2,
                    specialValues: [
                        {
                            variableName: "specialTestVar1",
                            variableType: "UI",
                            variableLength: 6,
                            variableValue: "222222"
                        },
                        {
                            variableName: "specialTestVar2",
                            variableType: "UI",
                            variableLength: 20,
                            variableValue: "This is a test"
                        }
                    ]
                }
            });

            done();
        });
    }); 

    it("parser rev 2", (done) => {
        
        // this has been manually written, as per the docs. Needs to replace with real data
        let msg = {
            mid: 106,
            revision: 2,
            payload: Buffer.from("01030201030123456789040105STATION-TEST        062019-03-08:10:28:29070108Mode 1              09110011                                        120213011411511611720.13001845.07201922.00002018.0000219999.992200.000013021411511611721.07001846.16101922.00002018.0000219999.992200.00002300")
        };

        MID.parser(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 106,
                revision: 2,
                payload: {
                    totalNoOfMessages: 3,
                    messageNumber: 1,
                    dataNoSystem: 123456789,
                    stationNo: 1,
                    stationName: "STATION-TEST",
                    time: "2019-03-08:10:28:29",
                    modeNo: 1,
                    modeName: "Mode 1",
                    simpleStatus: 1,
                    pmStatus: 0,
                    wpId: "",
                    numberOfBolts: 2,
                    bolts: [
                        {
                            ordinalBoltNumber: 1,
                            simpleBoltStatus: 1,
                            torqueStatus: 1,
                            angleStatus: 1,
                            boltT: 20.13,
                            boltA: 45.072,
                            boltTHighLimit: 22,
                            boltTLowLimit: 18,
                            boltAHighLimit: 9999.99,
                            boltALowLimit: 0
                        },
                        {
                            ordinalBoltNumber: 2,
                            simpleBoltStatus: 1,
                            torqueStatus: 1,
                            angleStatus: 1,
                            boltT: 21.07,
                            boltA: 46.161,
                            boltTHighLimit: 22,
                            boltTLowLimit: 18,
                            boltAHighLimit: 9999.99,
                            boltALowLimit: 0
                        }
                    ],
                    numberOfSpecialValues: 0,
                    specialValues: []
                }
            });

            done();
        });
    });

    it("parser rev 3", (done) => {

        // this has been manually written, as per the docs. Needs to replace with real data
        let msg = {
            mid: 106,
            revision: 3,
            payload: Buffer.from("01030201030123456789040105STATION-TEST        062019-03-08:10:28:29070108Mode 1              09110011                                        120213011411511611720.13001845.07201922.00002018.0000219999.992200.000013021411511611721.07001846.16101922.00002018.0000219999.992200.00002300")
        };

        MID.parser(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 106,
                revision: 3,
                payload: {
                    totalNoOfMessages: 3,
                    messageNumber: 1,
                    dataNoSystem: 123456789,
                    stationNo: 1,
                    stationName: "STATION-TEST",
                    time: "2019-03-08:10:28:29",
                    modeNo: 1,
                    modeName: "Mode 1",
                    simpleStatus: 1,
                    pmStatus: 0,
                    wpId: "",
                    numberOfBolts: 2,
                    bolts: [
                        {
                            ordinalBoltNumber: 1,
                            simpleBoltStatus: 1,
                            torqueStatus: 1,
                            angleStatus: 1,
                            boltT: 20.13,
                            boltA: 45.072,
                            boltTHighLimit: 22,
                            boltTLowLimit: 18,
                            boltAHighLimit: 9999.99,
                            boltALowLimit: 0
                        },
                        {
                            ordinalBoltNumber: 2,
                            simpleBoltStatus: 1,
                            torqueStatus: 1,
                            angleStatus: 1,
                            boltT: 21.07,
                            boltA: 46.161,
                            boltTHighLimit: 22,
                            boltTLowLimit: 18,
                            boltAHighLimit: 9999.99,
                            boltALowLimit: 0
                        }
                    ],
                    numberOfSpecialValues: 0,
                    specialValues: []
                }
            });

            done();
        });
    });

    it.skip("parser rev 4", (done) => {

        let msg = {
            mid: 106,
            revision: 4,
            payload: Buffer.from("????")
        };

        MID.parser(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 106,
                revision: 4,
                payload: {
                    //???
                }
            });

            done();
        });
    });
   
    it.skip("serializer rev 1", (done) => {
        
        let msg = {
            mid: 106,
            revision: 1,
            payload: {
                totalNoOfMessages: 3,
                messageNumber: 1,
                dataNoSystem: 123456789,
                stationNo: 1,
                stationName: "STATION-TEST",
                time: "2019-03-08:10:28:29",
                modeNo: 1,
                modeName: "Mode 1",
                simpleStatus: 1,
                pmStatus: 0,
                wpId: "",
                numberOfBolts: 2,
                bolts: [
                    {
                        ordinalBoltNumber: 1,
                        simpleBoltStatus: 1,
                        torqueStatus: 1,
                        angleStatus: 1,
                        boltT: 20.13,
                        boltA: 45.072,
                        boltTHighLimit: 22,
                        boltTLowLimit: 18,
                        boltAHighLimit: 9999.99,
                        boltALowLimit: 0
                    },
                    {
                        ordinalBoltNumber: 2,
                        simpleBoltStatus: 1,
                        torqueStatus: 1,
                        angleStatus: 1,
                        boltT: 21.07,
                        boltA: 46.161,
                        boltTHighLimit: 22,
                        boltTLowLimit: 18,
                        boltAHighLimit: 9999.99,
                        boltALowLimit: 0
                    }
                ],
                numberOfSpecialValues: 0,
                specialValues: []
            }
        };

        MID.serializer(msg, {}, (err, data) => {

            if(err){
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 106,
                revision: 1,
                payload: Buffer.from("01030201030123456789040105STATION-TEST        062019-03-08:10:28:29070108Mode 1              09110011                                        120213011411511611720.13001845.07201922.00002018.0000219999.992200.000013021411511611721.07001846.16101922.00002018.0000219999.992200.00002300")
            });

            done();
        });
    }); 

    it.skip("serializer rev 2", (done) => {
        
        let msg = {
            mid: 106,
            revision: 2,
            payload: {
                totalNoOfMessages: 3,
                messageNumber: 1,
                dataNoSystem: 123456789,
                stationNo: 1,
                stationName: "STATION-TEST",
                time: "2019-03-08:10:28:29",
                modeNo: 1,
                modeName: "Mode 1",
                simpleStatus: 1,
                pmStatus: 0,
                wpId: "",
                numberOfBolts: 2,
                bolts: [
                    {
                        ordinalBoltNumber: 1,
                        simpleBoltStatus: 1,
                        torqueStatus: 1,
                        angleStatus: 1,
                        boltT: 20.13,
                        boltA: 45.072,
                        boltTHighLimit: 22,
                        boltTLowLimit: 18,
                        boltAHighLimit: 9999.99,
                        boltALowLimit: 0
                    },
                    {
                        ordinalBoltNumber: 2,
                        simpleBoltStatus: 1,
                        torqueStatus: 1,
                        angleStatus: 1,
                        boltT: 21.07,
                        boltA: 46.161,
                        boltTHighLimit: 22,
                        boltTLowLimit: 18,
                        boltAHighLimit: 9999.99,
                        boltALowLimit: 0
                    }
                ],
                numberOfSpecialValues: 0,
                specialValues: []
            }
        };

        MID.serializer(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 106,
                revision: 2,
                payload: Buffer.from("01030201030123456789040105STATION-TEST        062019-03-08:10:28:29070108Mode 1              09110011                                        120213011411511611720.13001845.07201922.00002018.0000219999.992200.000013021411511611721.07001846.16101922.00002018.0000219999.992200.00002300")
            });

            done();
        });
    });

    it.skip("serializer rev 3", (done) => {

        let msg = {
            mid: 106,
            revision: 3,
            payload: {
                totalNoOfMessages: 3,
                messageNumber: 1,
                dataNoSystem: 123456789,
                stationNo: 1,
                stationName: "STATION-TEST",
                time: "2019-03-08:10:28:29",
                modeNo: 1,
                modeName: "Mode 1",
                simpleStatus: 1,
                pmStatus: 0,
                wpId: "",
                numberOfBolts: 2,
                bolts: [
                    {
                        ordinalBoltNumber: 1,
                        simpleBoltStatus: 1,
                        torqueStatus: 1,
                        angleStatus: 1,
                        boltT: 20.13,
                        boltA: 45.072,
                        boltTHighLimit: 22,
                        boltTLowLimit: 18,
                        boltAHighLimit: 9999.99,
                        boltALowLimit: 0
                    },
                    {
                        ordinalBoltNumber: 2,
                        simpleBoltStatus: 1,
                        torqueStatus: 1,
                        angleStatus: 1,
                        boltT: 21.07,
                        boltA: 46.161,
                        boltTHighLimit: 22,
                        boltTLowLimit: 18,
                        boltAHighLimit: 9999.99,
                        boltALowLimit: 0
                    }
                ],
                numberOfSpecialValues: 0,
                specialValues: []
            }
        };

        MID.serializer(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 106,
                revision: 3,
                payload: Buffer.from("01030201030123456789040105STATION-TEST        062019-03-08:10:28:29070108Mode 1              09110011                                        120213011411511611720.13001845.07201922.00002018.0000219999.992200.000013021411511611721.07001846.16101922.00002018.0000219999.992200.00002300")
            });

            done();
        });
    });

    it.skip("serializer rev 4", (done) => {

        let msg = {
            mid: 106,
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
                mid: 106,
                revision: 4,
                payload: Buffer.from("????")
            });

            done();
        });
    });

    it("Should return error, parser with invalid revision", (done) => {

        let msg = {
            mid: 106,
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
            mid: 106,
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

        expect(revisions).to.have.lengthOf(3);
        done();
 
    });

});