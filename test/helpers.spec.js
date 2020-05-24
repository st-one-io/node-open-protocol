//@ts-check
/*
  Copyright: (c) 2018-2020, Smart-Tech Controle e Automação
  GNU General Public License v3.0+ (see LICENSE or https://www.gnu.org/licenses/gpl-3.0.txt)
*/

const {
    expect
} = require('chai');

const helpers = require('../src/helpers.js');
const testNul = helpers.testNul;
const padLeft = helpers.padLeft;
const padRight = helpers.padRight;
const processKey = helpers.processKey;
const processParser = helpers.processParser;
const processDataFields = helpers.processDataFields;
const processResolutionFields = helpers.processResolutionFields;
const serializerField = helpers.serializerField;
const serializerKey = helpers.serializerKey;

describe("Helpers", () => {

    it("check padLeft string ok", (done) => {
        expect(padLeft("Teste", 5, 10, " ", false)).to.be.deep.equal("Teste");
        done();
    });

    it("check padLeft string ok", (done) => {
        expect(padLeft("Teste", 10, 10, " ", false)).to.be.deep.equal("     Teste");
        done();
    });

    it("check padLeft string ok", (done) => {
        expect(padLeft("Teste", 3, 10, " ", false)).to.be.deep.equal("Tes");
        done();
    });

    it("check padLeft string ok", (done) => {
        expect(padLeft("Teste", 3, 10, " ", true)).to.be.deep.equal("ste");
        done();
    });

    it("check padRight string ok", (done) => {
        expect(padRight("Teste", 5, 10, " ", false)).to.be.deep.equal("Teste");
        done();
    });

    it("check padRight string ok", (done) => {
        expect(padRight("Teste", 10, 10, " ", false)).to.be.deep.equal("Teste     ");
        done();
    });

    it("check padRight string ok", (done) => {
        expect(padRight("Teste", 3, 10, " ", false)).to.be.deep.equal("Tes");
        done();
    });

    it("check padRight string ok", (done) => {
        expect(padRight("Teste", 3, 10, " ", true)).to.be.deep.equal("ste");
        done();
    });

    it("check padLeft number ok", (done) => {
        expect(padLeft(123, 3)).to.be.deep.equal("123");
        done();
    });

    it("check padLeft number ok", (done) => {
        expect(padLeft(123, 5)).to.be.deep.equal("00123");
        done();
    });

    it("check padRight string ok", (done) => {
        expect(padRight(98765, 5)).to.be.deep.equal("98765");
        done();
    });

    it("check padRight string ok", (done) => {
        expect(padRight(98765, 7)).to.be.deep.equal("9876500");
        done();
    });

    it("check processParser String ok", (done) => {

        let obj = {};
        obj.payload = {};

        let buffer = Buffer.from("teste");
        let position = {
            value: 0
        };

        let obj_final = {
            payload: {
                name: "teste"
            }
        };

        processParser(obj, buffer, "name", "string", 5, position, () => {});

        expect(obj).to.be.deep.equal(obj_final);
        done();
    });

    it("check processParser rawString error", (done) => {

        let obj = {};
        obj.payload = {};

        let buffer = Buffer.from("T45");
        let position = {
            value: 0
        };

        let obj_final = {
            payload: {
                name: "T45te"
            }
        };

        processParser(obj, buffer, "name", "rawString", 5, position, (err) => {

            expect(err).to.be.an('error');
            done();
        });

    });

    it("check processParser Number ok", (done) => {

        let obj = {};
        obj.payload = {};

        let buffer = Buffer.from("12345");
        let position = {
            value: 0
        };

        let obj_final = {
            payload: {
                name: 12345
            }
        };

        processParser(obj, buffer, "name", "number", 5, position, () => {});

        expect(obj).to.be.deep.equal(obj_final);
        done();
    });

    it("check processParser Number error", (done) => {

        let obj = {};
        obj.payload = {};

        let buffer = Buffer.from("T45te");
        let position = {
            value: 0
        };

        let obj_final = {
            payload: {
                name: 1452
            }
        };

        processParser(obj, buffer, "name", "number", 5, position, (err) => {

            expect(err).to.be.an('error');
            done();
        });

    });

    it("check processParser parameterType error", (done) => {

        let obj = {};
        obj.payload = {};

        let buffer = Buffer.from("teste");
        let position = {
            value: 0
        };

        let obj_final = {
            payload: {
                name: "teste"
            }
        };

        processParser(obj, buffer, "name", "invalid", 5, position, (err) => {

            expect(err).to.be.an('error');
            done();
        });

    });

    it("check testNul ok", (done) => {

        let obj = {};

        let buffer = Buffer.from("teste\u0000");
        let position = {
            value: 5
        };

        let value = testNul(obj, buffer, "char nul", position, () => {});
        expect(value).to.be.deep.equal(true);

        done();

    });

    it("check testNul ~nul error", (done) => {

        let obj = {};

        let buffer = Buffer.from("teste\u0000");
        let position = {
            value: 2
        };

        let value = testNul(obj, buffer, "char nul", position, (err) => {
            expect(err).to.be.an('error');
        });

        expect(value).to.be.deep.equal(false);
        done();

    });

    it("check testNul out range error", (done) => {

        let obj = {};

        let buffer = Buffer.from("teste\u0000");
        let position = {
            value: 9
        };

        let value = testNul(obj, buffer, "char nul", position, (err) => {
            expect(err).to.be.an('error');
        });

        expect(value).to.be.deep.equal(false);
        done();

    });

    it("check processKey ok", (done) => {

        let obj = {};

        let buffer = Buffer.from("01AAAA");
        let position = {
            value: 0
        };

        let value = processKey(obj, buffer, "check", 1, 2, position, () => {});
        expect(value).to.be.deep.equal(true);

        done();

    });

    it("check processKey ~number error", (done) => {

        let obj = {};

        let buffer = Buffer.from("01AAAA");
        let position = {
            value: 0
        };

        let value = processKey(obj, buffer, "check", 10, 2, position, (err) => {
            expect(err).to.be.an('error');
        });

        expect(value).to.be.deep.equal(false);

        done();

    });

    it("check serializerField invalid type error", (done) => {

        let obj = {};
        obj.payload = {
            test: "Diego"
        };

        let buffer = Buffer.alloc(10);
        let position = {
            value: 0
        };

        let value = serializerField(obj, buffer, "test", "web", 1, position, (err) => {
            expect(err).to.be.an('error');
        });

        expect(value).to.be.deep.equal(false);
        done();
    });

    it("check serializerKey invalid type error", (done) => {

        let obj = {};
        obj.payload = {
            test: "Diego"
        };

        let buffer = Buffer.alloc(10);
        let position = {
            value: 0
        };

        let value = serializerKey(obj, buffer, "AA", 2, position, (err) => {
            expect(err).to.be.an('error');
        });

        expect(value).to.be.deep.equal(false);
        done();
    });



    it("check processDataFields ok", (done) => {

        let obj = {};
        obj.payload = {};

        let buffer = Buffer.from("00002002050010012AB09999005999998562ERTFD");
        let position = {
            value: 0
        };

        let obj_final = {
            payload: {
                fields: [{
                        parameterID: "00002",
                        parameterName: "Station ID",
                        length: 2,
                        dataType: 5,
                        unit: "001",
                        unitName: "N-m",
                        stepNumber: 12,
                        dataValue: "AB"
                    },
                    {
                        parameterID: "09999",
                        parameterName: "",
                        length: 5,
                        dataType: 99,
                        unit: "999",
                        unitName: "",
                        stepNumber: 8562,
                        dataValue: "ERTFD"
                    }
                ]
            }
        };

        processDataFields(obj, buffer, "fields", 2, position, () => {});

        expect(obj).to.be.deep.equal(obj_final);
        done();
    });

    it("check processDataFields without interations ok", (done) => {

        let obj = {};
        obj.payload = {};

        let buffer = Buffer.from("");
        let position = {
            value: 0
        };

        let obj_final = {
            payload: {}
        };

        processDataFields(obj, buffer, "fields", 0, position, () => {});

        expect(obj).to.be.deep.equal(obj_final);
        done();
    });

    it("check processDataFields invalid parameterID error", (done) => {

        let obj = {};
        obj.payload = {};

        let buffer = Buffer.from("");
        let position = {
            value: 0
        };

        let obj_final = {
            payload: {
                fields: [{
                    parameterID: "00002",
                    parameterName: "Station ID",
                    length: 2,
                    dataType: 5,
                    unit: "001",
                    unitName: "N-m",
                    stepNumber: 12,
                    dataValue: "AB"
                }]
            }
        };

        let value = processDataFields(obj, buffer, "fields", 1, position, (err) => {
            expect(err).to.be.an('error');
        });

        expect(value).to.be.deep.equal(false);
        done();
    });

    it("check processDataFields invalid length error", (done) => {

        let obj = {};
        obj.payload = {};

        let buffer = Buffer.from("0000200A050010012AB");
        let position = {
            value: 0
        };

        let obj_final = {
            payload: {
                fields: [{
                    parameterID: "00002",
                    parameterName: "Station ID",
                    length: 2,
                    dataType: 5,
                    unit: "001",
                    unitName: "N-m",
                    stepNumber: 12,
                    dataValue: "AB"
                }]
            }
        };

        let value = processDataFields(obj, buffer, "fields", 1, position, (err) => {
            expect(err).to.be.an('error');
        });

        expect(value).to.be.deep.equal(false);
        done();
    });

    it("check processDataFields invalid dataType error", (done) => {

        let obj = {};
        obj.payload = {};

        let buffer = Buffer.from("00002002AA0010012AB");
        let position = {
            value: 0
        };

        let obj_final = {
            payload: {
                fields: [{
                    parameterID: "00002",
                    parameterName: "Station ID",
                    length: 2,
                    dataType: 5,
                    unit: "001",
                    unitName: "N-m",
                    stepNumber: 12,
                    dataValue: "AB"
                }]
            }
        };

        let value = processDataFields(obj, buffer, "fields", 1, position, (err) => {
            expect(err).to.be.an('error');
        });

        expect(value).to.be.deep.equal(false);
        done();
    });

    it("check processDataFields invalid unit error", (done) => {

        let obj = {};
        obj.payload = {};

        let buffer = Buffer.from("0000200205   0012AB");
        let position = {
            value: 0
        };

        let obj_final = {
            payload: {
                fields: [{
                    parameterID: "00002",
                    parameterName: "Station ID",
                    length: 2,
                    dataType: 5,
                    unit: "001",
                    unitName: "N-m",
                    stepNumber: 12,
                    dataValue: "AB"
                }]
            }
        };

        let value = processDataFields(obj, buffer, "fields", 1, position, (err) => {
            expect(err).to.be.an('error');
        });

        expect(value).to.be.deep.equal(false);
        done();
    });

    it("check processDataFields invalid stepNumber error", (done) => {

        let obj = {};
        obj.payload = {};

        let buffer = Buffer.from("000020020500100ZZAB");
        let position = {
            value: 0
        };

        let obj_final = {
            payload: {
                fields: [{
                    parameterID: "00002",
                    parameterName: "Station ID",
                    length: 2,
                    dataType: 5,
                    unit: "001",
                    unitName: "N-m",
                    stepNumber: 12,
                    dataValue: "AB"
                }]
            }
        };

        let value = processDataFields(obj, buffer, "fields", 1, position, (err) => {
            expect(err).to.be.an('error');
        });

        expect(value).to.be.deep.equal(false);
        done();
    });

    it("check processDataFields invalid dataValue error", (done) => {

        let obj = {};
        obj.payload = {};

        let buffer = Buffer.from("00002002050010012  ");
        let position = {
            value: 0
        };

        let obj_final = {
            payload: {
                fields: [{
                    parameterID: "00002",
                    parameterName: "Station ID",
                    length: 2,
                    dataType: 5,
                    unit: "001",
                    unitName: "N-m",
                    stepNumber: 12,
                    dataValue: "AB"
                }]
            }
        };

        let value = processDataFields(obj, buffer, "fields", 1, position, (err) => {
            expect(err).to.be.an('error');
        });

        expect(value).to.be.deep.equal(false);
        done();
    });

    it("check processResolutionFields ok", (done) => {

        let obj = {};
        obj.payload = {};

        let buffer = Buffer.from("0000100010005020011234500105060230020109988");
        let position = {
            value: 0
        };

        let obj_final = {
            payload: {
                resolutions: [{
                        firstIndex: 1,
                        lastIndex: 10,
                        length: 5,
                        dataType: 2,
                        unit: "001",
                        unitName: "N-m",
                        timeValue: "12345"
                    },
                    {
                        firstIndex: 105,
                        lastIndex: 6023,
                        length: 2,
                        dataType: 1,
                        unit: "099",
                        unitName: "",
                        timeValue: "88"
                    }
                ]
            }
        };

        let value = processResolutionFields(obj, buffer, "resolutions", 2, position, () => {});
        expect(obj).to.be.deep.equal(obj_final);
        expect(value).to.be.deep.equal(true);
        done();
    });

    it("check processResolutionFields without interations ok", (done) => {

        let obj = {};
        obj.payload = {};

        let buffer = Buffer.from("");
        let position = {
            value: 0
        };

        let obj_final = {
            payload: {}
        };

        let value = processResolutionFields(obj, buffer, "resolutions", 0, position, () => {});
        expect(obj).to.be.deep.equal(obj_final);
        expect(value).to.be.deep.equal(true);
        done();
    });

    it("check processResolutionFields firstIntex error", (done) => {

        let obj = {};
        obj.payload = {};

        let buffer = Buffer.from("0000A000100050200112345");
        let position = {
            value: 0
        };

        let obj_final = {
            payload: {
                resolutions: [{
                    firstIndex: 1,
                    lastIndex: 10,
                    length: 5,
                    dataType: 2,
                    unit: "001",
                    unitName: "N-m",
                    timeValue: "12345"
                }]
            }
        };

        let value = processResolutionFields(obj, buffer, "resolutions", 1, position, (err) => {
            expect(err).to.be.an('error');
        });

        expect(value).to.be.deep.equal(false);
        done();
    });

    it("check processResolutionFields lastIndex error", (done) => {

        let obj = {};
        obj.payload = {};

        let buffer = Buffer.from("00001000AA0050200112345");
        let position = {
            value: 0
        };

        let obj_final = {
            payload: {
                resolutions: [{
                    firstIndex: 1,
                    lastIndex: 10,
                    length: 5,
                    dataType: 2,
                    unit: "001",
                    unitName: "N-m",
                    timeValue: "12345"
                }]
            }
        };

        let value = processResolutionFields(obj, buffer, "resolutions", 1, position, (err) => {
            expect(err).to.be.an('error');
        });

        expect(value).to.be.deep.equal(false);
        done();
    });

    it("check processResolutionFields length error", (done) => {

        let obj = {};
        obj.payload = {};

        let buffer = Buffer.from("000010001000A0200112345");
        let position = {
            value: 0
        };

        let obj_final = {
            payload: {
                resolutions: [{
                    firstIndex: 1,
                    lastIndex: 10,
                    length: 5,
                    dataType: 2,
                    unit: "001",
                    unitName: "N-m",
                    timeValue: "12345"
                }]
            }
        };

        let value = processResolutionFields(obj, buffer, "resolutions", 1, position, (err) => {
            expect(err).to.be.an('error');
        });

        expect(value).to.be.deep.equal(false);
        done();
    });

    it("check processResolutionFields dataType error", (done) => {

        let obj = {};
        obj.payload = {};

        let buffer = Buffer.from("0000100010005-200112345");
        let position = {
            value: 0
        };

        let obj_final = {
            payload: {
                resolutions: [{
                    firstIndex: 1,
                    lastIndex: 10,
                    length: 5,
                    dataType: 2,
                    unit: "001",
                    unitName: "N-m",
                    timeValue: "12345"
                }]
            }
        };

        let value = processResolutionFields(obj, buffer, "resolutions", 1, position, (err) => {
            expect(err).to.be.an('error');
        });

        expect(value).to.be.deep.equal(false);
        done();
    });

    it("check processResolutionFields unit error", (done) => {

        let obj = {};
        obj.payload = {};

        let buffer = Buffer.from("000010001000502   12345");
        let position = {
            value: 0
        };

        let obj_final = {
            payload: {
                resolutions: [{
                    firstIndex: 1,
                    lastIndex: 10,
                    length: 5,
                    dataType: 2,
                    unit: "001",
                    unitName: "N-m",
                    timeValue: "12345"
                }]
            }
        };

        let value = processResolutionFields(obj, buffer, "resolutions", 1, position, (err) => {
            expect(err).to.be.an('error');
        });

        expect(value).to.be.deep.equal(false);
        done();
    });

    it("check processResolutionFields timeValue error", (done) => {

        let obj = {};
        obj.payload = {};

        let buffer = Buffer.from("000010001000502001     ");
        let position = {
            value: 0
        };

        let obj_final = {
            payload: {
                resolutions: [{
                    firstIndex: 1,
                    lastIndex: 10,
                    length: 5,
                    dataType: 2,
                    unit: "001",
                    unitName: "N-m",
                    timeValue: "12345"
                }]
            }
        };

        let value = processResolutionFields(obj, buffer, "resolutions", 1, position, (err) => {
            expect(err).to.be.an('error');
        });

        expect(value).to.be.deep.equal(false);
        done();
    });

});