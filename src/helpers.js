//@ts-check
/*
  Copyright: (c) 2023, Alejandro de la Mata Chico
  Copyright: (c) 2018-2020, Smart-Tech Controle e Automação
  GNU General Public License v3.0+ (see LICENSE or https://www.gnu.org/licenses/gpl-3.0.txt)
*/

const fs = require("fs");
const path = require("path");
const codes = require('./constants.json');
const encoding = codes.defaultEncoder;

let midList;

/**
 * @description Converts a string or a number to a string with a determined @param size length.
 * @param {number|String} n the element to be padded
 * @param {number} size the desired length of the string
 * @param {number} base the base used to convert @param n to a string when it's a number
 * @param {String} [elm='0'] the character used to fill the empty positions
 * @param {boolean} [trimLeft=false] whether we should remove the left side of the string if it's bigger than the size
 * @returns {String}
 */
function padLeft(n, size, base, elm, trimLeft) {
    n = n.toString(base || 10);
    n = trimLeft ? n.substring(n.length - size) : n.substring(0, size);
    return new Array(size - n.length + 1).join(elm || '0').concat(n);
}

/**
 * @description Converts a string or a number to a string with a determined @param size length.
 * @param {number|String} n the element to be padded
 * @param {number} size the desired length of the string
 * @param {number} base the base used to convert @param n to a string when it's a number
 * @param {String} [elm='0'] the character used to fill the empty positions
 * @param {boolean} [trimLeft=false] whether we should remove the left side of the string if it's bigger than the size
 * @returns {String}
 */
function padRight(n, size, base, elm, trimLeft) {
    n = n.toString(base || 10);
    n = trimLeft ? n.substring(n.length - size) : n.substring(0, size);
    return n.concat(new Array(size - n.length + 1).join(elm || '0'));
}

/**
 * @description This method returns all implemented MIDs. The implemented MIDs must be saved in "/node-open-protocol/src/mid".
 * @returns {Array}
 */
function getMids() {

    if (midList) {
        return midList;
    }

    midList = [];

    const listFiles = fs.readdirSync(path.join(__dirname, ".", "mid"));

    listFiles.forEach((file) => {

        if (path.extname(file) !== ".js") {
            return;
        }

        midList[Number(path.basename(file, ".js"))] = require("./mid/" + file);

    });

    return midList;
}

/**
 * @description This method serializes a field in [parameter] where,
 * the values are read from [message.payload[parameter]], check type with [type] and
 * add in [buffer] in position [position.value] with length [length].
 *
 * The [cb] function is called in cases of an error, sending the error as parameter.
 * The return of this function is a boolean, true: the process without errors or false: the process with an error.
 *
 * @param {object} message 
 * @param {buffer} buffer 
 * @param {string} parameter 
 * @param {string} type 
 * @param {number} length 
 * @param {object} position 
 * @param {Function} cb 
 * @returns {boolean}
 */
function serializerField(message, buffer, parameter, type, length, position, cb) {

    position.value -= length;
    
    if (message.payload[parameter] === undefined) {
        cb(new Error(`[Serializer] MID[${message.mid}] parameter [${parameter}] not exist`));
        return false;
    }

    switch (type) {

        case "string":
            buffer.write(padRight(message.payload[parameter], length, 10, " "), position.value, encoding);
            break;

        case "rawString":
            buffer.write(padRight(message.payload[parameter], length, 10, " "), position.value, encoding);
            break;

        case "number":

            if (isNaN(message.payload[parameter])) {
                cb(new Error(`[Serializer] MID[${message.mid}] - type invalid isNaN - parameter: [${parameter}] value: [${message.payload[parameter]}] `));
                return false;
            }

            buffer.write(padLeft(message.payload[parameter], length), position.value, encoding);
            break;

        default:
            cb(new Error(`[Serializer] MID[${message.mid}] - type is not defined`));
            return false;
    }

    return true;
}

/**
 * @description This method performs the serialization of key, the value to be serialized in [buffer]
 * comes from [key] on [position.value] with length [length].
 * The [key] must be a Number.
 *
 * The [cb] function is called in cases of error, sending the error as parameter.
 * The return of this function is boolean, true: the process without errors or false: the process with an error.
 *
 * @param {object} message 
 * @param {buffer} buffer 
 * @param {number} key 
 * @param {number} length 
 * @param {object} position 
 * @param {Function} cb 
 * @returns {boolean}
 */
function serializerKey(message, buffer, key, length, position, cb) {

    position.value -= length;

    if (isNaN(key)) {
        cb(new Error(`[Serializer] MID[${message.mid}] key invalid [${key}]`));
        return false;
    }

    buffer.write(padLeft(key, length), position.value, encoding);

    return true;
}

/**
 * @description This method perform the extraction of [parameter], the value extracted comes from [buffer] from
 * the position [position.value] with length [parameterlength] and being converted to [parameterType], this
 * value is add in [message.payload[parameter]].
 *
 * The [cb] function is called in cases of error, sending the error as parameter.
 * The return of this function is boolean, true: the process without errors or false: the process with an error.
 *
 * @param {object} message Object in use for update
 * @param {buffer} buffer Buffer with content for extracting information
 * @param {string} parameter Name of parameter extracted
 * @param {string} parameterType Type of information extracted "string" | "rawString" | "number"  
 * @param {number} parameterLength Size of information extracted
 * @param {object} position Position on buffer this information {value: position}
 * @param {Function} cb
 * @returns {boolean} status process
 */
function processParser(message, buffer, parameter, parameterType, parameterLength, position, cb) {

    let length = parameterLength;
    parameterLength = position.value + parameterLength;

    switch (parameterType) {
        case "string":
            message.payload[parameter] = buffer.toString(encoding, position.value, parameterLength).trim();
            if (parameter === 'unit') {
                message.payload.unitName = codes.UNIT[message.payload[parameter]] || "";
            }
            break;

        case "rawString":
            message.payload[parameter] = buffer.toString(encoding, position.value, parameterLength);
            if (message.payload[parameter].length !== length) {
                cb(new Error(`invalid value, mid: ${message.mid}, parameter: ${parameter}, payload: ${message.payload}`));
                return false;
            }
            break;

        case "number":
            message.payload[parameter] = Number(buffer.toString(encoding, position.value, parameterLength));
            if (isNaN(message.payload[parameter])) {
                cb(new Error(`invalid value, mid: ${message.mid}, parameter: ${parameter}, payload: ${message.payload}`));
                return false;
            }
            break;

        default:
            cb(new Error(`invalid parameterType`));
            return false;

    }

    position.value = parameterLength;

    return true;
}

/**
 * @description This method checks the key of [parameter], the value extracted comes from [buffer] from
 * the position [keyPosition.value] with length [keylength], this value is compared with [key].
 *
 * The return of this function is boolean, true: the value extracted is equal [key] or false: case not.
 * The [cb] function is called in cases of error, sending the error as parameter.
 *
 * @param {object} object 
 * @param {buffer} buffer 
 * @param {string} parameter 
 * @param {number} key 
 * @param {number} keyLength 
 * @param {number} keyPosition 
 * @param {Function} cb 
 * @returns {boolean}
 */
function processKey(object, buffer, parameter, key, keyLength, keyPosition, cb) {

    keyLength = keyPosition.value + keyLength;

    let receiver = Number(buffer.toString(encoding, keyPosition.value, keyLength));

    if (receiver !== key) {
        cb(new Error(`invalid key, mid: ${object.mid}, parameter: ${parameter}, expect: ${key}, receiver: ${receiver} payload: ${JSON.stringify(object.payload)}`));
        return false;
    }

    keyPosition.value = keyLength;

    return true;
}

/**
 * @description This method performs a check if in [position.value] of [buffer] the value is [NUL].
 * The return of this function is boolean, true: the value is [NUL] or false: case not.
 *
 * The [cb] function is called in cases of error, sending the error as parameter.
 *
 * @param {object} object
 * @param {buffer} buffer
 * @param {string} parameter
 * @param {object} position
 * @param {Function} cb
 * @returns {boolean}
 */
function testNul(object, buffer, parameter, position, cb) {

    if (buffer[position.value] !== 0) {
        cb(new Error(`invalid value, mid: ${object.mid}, parameter: ${parameter}, payload: ${object.payload}`));
        return false;
    }

    position.value += 1;

    return true;
}

/**
 * @description This method performs the extraction of the structure [Data Field], is perform [count] times,
 * from the position [position.value], these structures are stored in an array on [message.payload[parameter]].
 *
 * The [cb] function is called in cases of error, sending the error as parameter.
 * The return of this function is boolean, true: the process without errors or false: the process with an error.
 * 
 * @see Specification OpenProtocol_Specification_R_2_8_0_9836 4415 01.pdf Page 34
 * 
 * @param {object} message 
 * @param {buffer} buffer 
 * @param {string} parameter 
 * @param {number} count 
 * @param {object} position 
 * @param {Function} cb 
 * @returns {boolean}
 */
function processDataFields(message, buffer, parameter, count, position, cb) {

    let control = 0;

    if (count > 0) {

        message.payload[parameter] = [];

        while (control < count) {

            let dataFields = {};

            let parameterID = buffer.toString(encoding, position.value, position.value + 5).trim();

            if (parameterID === "" || isNaN(Number(parameterID)) || Number(parameterID) < 0) {
                cb(new Error(`invalid value, mid: ${message.mid}, parameter: ${parameter} - parameterID, payload: ${message.payload}`));
                return false;
            }
            dataFields.parameterID = parameterID;
            dataFields.parameterName = codes.PID[parameterID] || "";
            position.value += 5;

            let length = Number(buffer.toString(encoding, position.value, position.value + 3));

            if (isNaN(length) || length < 0) {
                cb(new Error(`invalid value, mid: ${message.mid}, parameter: ${parameter} - length, payload: ${message.payload}`));
                return false;
            }
            dataFields.length = length;
            position.value += 3;

            let dataType = Number(buffer.toString(encoding, position.value, position.value + 2));

            if (isNaN(dataType) || dataType < 0) {
                cb(new Error(`invalid value, mid: ${message.mid}, parameter: ${parameter} - dataType, payload: ${message.payload}`));
                return false;
            }
            dataFields.dataType = dataType;
            position.value += 2;

            let unit = buffer.toString(encoding, position.value, position.value + 3).trim();

            if (unit === "" || isNaN(Number(unit)) || Number(unit) < 0) {
                cb(new Error(`invalid value, mid: ${message.mid}, parameter: ${parameter} - unit, payload: ${message.payload}`));
                return false;
            }
            dataFields.unit = unit;
            dataFields.unitName = codes.UNIT[unit] || "";
            position.value += 3;

            let stepNumber = Number(buffer.toString(encoding, position.value, position.value + 4));

            if (isNaN(stepNumber) || stepNumber < 0) {
                cb(new Error(`invalid value, mid: ${message.mid}, parameter: ${parameter} - stepNumber, payload: ${message.payload}`));
                return false;
            }
            dataFields.stepNumber = stepNumber;
            position.value += 4;

            let dataValue = buffer.toString(encoding, position.value, position.value + length).trim();

            if (dataValue === "") {
                if (length === 0) {
                    dataValue = 0;
                } 
                else {
                    cb(new Error(`invalid value, mid: ${message.mid}, parameter: ${parameter} - dataValue, payload: ${message.payload}`));
                    return false;
                }
            }
            dataFields.dataValue = dataValue;
            position.value += length;

            message.payload[parameter].push(dataFields);

            control += 1;
        }
    }
    return true;
}

/**
 * @description This method performs the extraction of the structure [Resolution Field], is perform [count] times,
 * from the position [position.value], these structures are stored in an array on [message.payload[parameter]].
 *
 * The [cb] function is called in cases of error, sending the error as parameter.
 * The return of this function is boolean, true: the process without errors or false: the process with an error.
 *
 * @see Specification OpenProtocol_Specification_R_2_8_0_9836 4415 01.pdf Page 260
 * 
 * @param {object} message 
 * @param {buffer} buffer 
 * @param {string} parameter 
 * @param {number} count 
 * @param {object} position 
 * @param {function} cb 
 * @returns {boolean}
 */
function processResolutionFields(message, buffer, parameter, count, position, cb) {

    let control = 0;

    if (count > 0) {

        message.payload[parameter] = [];

        while (control < count) {

            let resolutionFields = {};

            let firstIndex = Number(buffer.toString(encoding, position.value, position.value + 5));

            if (isNaN(firstIndex) || firstIndex < 0) {
                cb(new Error(`invalid value, mid: ${message.mid}, parameter: ${parameter}, payload: ${message.payload}`));
                return false;
            }
            resolutionFields.firstIndex = firstIndex;
            position.value += 5;
 
            let lastIndex = Number(buffer.toString(encoding, position.value, position.value + 5));

            if (isNaN(lastIndex) || lastIndex < 0) {
                cb(new Error(`invalid value, mid: ${message.mid}, parameter: ${parameter}, payload: ${message.payload}`));
                return false;
            }
            resolutionFields.lastIndex = lastIndex;
            position.value += 5;
 
            let length = Number(buffer.toString(encoding, position.value, position.value + 3));

            if (isNaN(length) || length < 0) {
                cb(new Error(`invalid value, mid: ${message.mid}, parameter: ${parameter}, payload: ${message.payload}`));
                return false;
            }
            resolutionFields.length = length;
            position.value += 3;

            let dataType = Number(buffer.toString(encoding, position.value, position.value + 2));

            if (isNaN(dataType) || dataType < 0) {
                cb(new Error(`invalid value, mid: ${message.mid}, parameter: ${parameter}, payload: ${message.payload}`));
                return false;
            }
            resolutionFields.dataType = dataType;
            position.value += 2;

            let unit = buffer.toString(encoding, position.value, position.value + 3).trim();

            if (unit === "") {
                cb(new Error(`invalid value, mid: ${message.mid}, parameter: ${parameter}, payload: ${message.payload}`));
                return false;
            }
            resolutionFields.unit = unit;
            resolutionFields.unitName = codes.UNIT[unit] || "";
            position.value += 3;

            let timeValue = buffer.toString(encoding, position.value, position.value + length).trim();

            if (timeValue === "" || isNaN(Number(timeValue)) || Number(timeValue) < 0) {
                cb(new Error(`invalid value, mid: ${message.mid}, parameter: ${parameter}, payload: ${message.payload}`));
                return false;
            }
            resolutionFields.timeValue = Number(timeValue);
            position.value += length;

            message.payload[parameter].push(resolutionFields);

            control += 1;
        }
    }
    return true;
}

/**
 * @description This method performs the extraction of the trace, is perform [count] times,
 * from the position [position.value], these structures are stored in an array on [message.payload[parameter]].
 *
 * The [cb] function is called in cases of error, sending the error as parameter.
 * The return of this function is boolean, true: the process without errors or false: the process with an error.
 *
 * @see Specification OpenProtocol_Specification_R_2_8_0_9836 4415 01.pdf Page 260
 * 
 * @param {object} message 
 * @param {buffer} buffer 
 * @param {string} parameter 
 * @param {number} count 
 * @param {object} position 
 * @param {string} timeStamp
 * @param {number} timeValue
 * @param {string} unit   
 * @param {function} cb 
 * @returns {boolean}
 */
function processTraceSamples(message, buffer, parameter, count, position, timeStamp, timeValue, unit, cb) {

    let control = 0;
    let coefficient = 0;
    message.payload[parameter] = [];
    
    if (count > 0) {
        function firstPropertyWithGivenValue(value, object){
            for (var key in object) {
                    if (object[key].parameterName === value) 
                        if (object[key].parameterID === '02213') {
                            coefficient = 1 / object[key].dataValue;
                        }
                        else if (object[key].parameterID === '02214') {
                            coefficient = object[key].dataValue;
                        }
                        else {
                            cb(new Error(`invalid value, mid: ${message.mid}, parameter: ${object[key].parameterID}, payload: ${object[key].dataValue}`));
                            return false;
                        } 
                }
                    return coefficient;
                }

        firstPropertyWithGivenValue('Coefficient', message.payload.fieldData);       

        function toTimestamp(strDate){
            var datum = new Date(strDate);
            return datum;
        }


        let multiplier = 0;    

        if (unit === '200') {
            multiplier = 1000; // ms
        }
        else if (unit === '201') {
            multiplier = 60000; // ms
        }
        else if (unit === '202') {
            multiplier = 1; // ms
        }
        else if (unit === '203') {
            multiplier = 3600000; // ms
        }
        else {
            multiplier = 1;
        }

        while (control < count) {

            let traceSample ={};
            traceSample.timeStamp = toTimestamp(timeStamp);
            traceSample.value = buffer.toString('hex', position.value, position.value + 2);
            traceSample.value = parseInt(traceSample.value, 16);

            if ((traceSample.value & 0x8000) > 0) {
                traceSample.value = traceSample.value - 0x10000;
            }

            traceSample.value = traceSample.value * coefficient;
            
            traceSample.timeStamp.setTime(traceSample.timeStamp.getTime() + (timeValue * multiplier * control));

            message.payload[parameter].push(traceSample);

            position.value += 2;
            control += 1;
         }
    }
    return true;
}

module.exports = {
    getMids,
    testNul,
    padLeft,
    padRight,
    processKey,
    processParser,
    processDataFields,
    processResolutionFields: processResolutionFields,
    processTraceSamples,
    serializerField,
    serializerKey
};