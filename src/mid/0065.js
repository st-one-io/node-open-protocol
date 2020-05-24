//@ts-check
/*
  Copyright: (c) 2018-2020, Smart-Tech Controle e Automação
  GNU General Public License v3.0+ (see LICENSE or https://www.gnu.org/licenses/gpl-3.0.txt)
*/

/**
 * @class
 * @name MID0065
 * 
 * @param {object} MID0065_1 REV. 1
 * @param {number} MID0065_1.tighteningID
 * @param {string} MID0065_1.numberVIN
 * @param {number} MID0065_1.parameterSetID
 * @param {number} MID0065_1.batchCounter
 * @param {number} MID0065_1.tighteningStatus
 * @param {number} MID0065_1.torqueStatus
 * @param {number} MID0065_1.angleStatus
 * @param {number} MID0065_1.torque
 * @param {number} MID0065_1.angle
 * @param {string} MID0065_1.timeStamp
 * @param {number} MID0065_1.batchStatus
 * 
 * @param {object} MID0065_2 REV. 2
 * @param {number} MID0065_2.tighteningID
 * @param {string} MID0065_2.numberVIN
 * @param {number} MID0065_2.jobID
 * @param {number} MID0065_2.parameterSetID
 * @param {number} MID0065_2.strategy
 * @param {number} MID0065_2.strategyOptions
 * @param {number} MID0065_2.batchSize
 * @param {number} MID0065_2.batchCounter
 * @param {number} MID0065_2.tighteningStatus
 * @param {number} MID0065_2.batchStatus 
 * @param {number} MID0065_2.torqueStatus
 * @param {number} MID0065_2.angleStatus
 * @param {number} MID0065_2.rundownAngleStatus
 * @param {number} MID0065_2.currentMonitoringStatus
 * @param {number} MID0065_2.selftapStatus
 * @param {number} MID0065_2.prevailTorqueMonitoringStatus
 * @param {number} MID0065_2.prevailTorqueCompensateStatus
 * @param {number} MID0065_2.tighteningErrorStatus
 * @param {number} MID0065_2.torque
 * @param {number} MID0065_2.angle
 * @param {number} MID0065_2.rundownAngle
 * @param {number} MID0065_2.currentMonitoringValue
 * @param {number} MID0065_2.selftapTorque
 * @param {number} MID0065_2.prevailTorque
 * @param {number} MID0065_2.jobSequenceNumber
 * @param {number} MID0065_2.syncTighteningID
 * @param {string} MID0065_2.toolSerialNumber
 * @param {string} MID0065_2.timeStamp
 * 
 * @param {object} MID0065_3 REV. 3 [(REV. 2) +]
 * @param {number} MID0065_3.torqueValuesUnit
 * @param {number} MID0065_3.resultType
 * 
 * @param {object} MID0065_4 REV. 4 [(REV. 3) +]
 * @param {string} MID0065_4.identifierPart2
 * @param {string} MID0065_4.identifierPart3
 * @param {string} MID0065_4.identifierPart4
 * 
 * @param {object} MID0065_5 REV. 5 [(REV. 4) +]
 * @param {string} MID0065_5.customerToghteningErrorCode
 * 
 * @param {object} MID0065_6 REV. 6 [(REV. 5) +]
 * @param {number} MID0065_6.prevailTorqueCompensateValue
 * @param {number} MID0065_6.toghteningErrorStatus
 * 
 * @param {object} MID0065_7 REV. 7 [(REV. 6) +]
 * @param {number} MID0065_7.stationID
 * @param {string} MID0065_7.stationName
 * 
 */

const helpers = require("../helpers.js");
const processParser = helpers.processParser;
const processKey = helpers.processKey;
const serializerField = helpers.serializerField;
const serializerKey = helpers.serializerKey;

function parser(msg, opts, cb) {

    let buffer = msg.payload;
    msg.payload = {};

    let position = {
        value: 0
    };

    msg.revision = msg.revision || 1;

    switch (msg.revision) {
        case 7:
            processKey(msg, buffer, "tighteningID", 1, 2, position, cb) &&
                processParser(msg, buffer, "tighteningID", "number", 10, position, cb) &&
                processKey(msg, buffer, "numberVIN", 2, 2, position, cb) &&
                processParser(msg, buffer, "numberVIN", "rawString", 25, position, cb) &&
                processKey(msg, buffer, "jobID", 3, 2, position, cb) &&
                processParser(msg, buffer, "jobID", "number", 4, position, cb) &&
                processKey(msg, buffer, "parameterSetID", 4, 2, position, cb) &&
                processParser(msg, buffer, "parameterSetID", "number", 3, position, cb) &&
                processKey(msg, buffer, "strategy", 5, 2, position, cb) &&
                processParser(msg, buffer, "strategy", "number", 2, position, cb) &&
                processKey(msg, buffer, "strategyOptions", 6, 2, position, cb) &&
                processParser(msg, buffer, "strategyOptions", "number", 5, position, cb) &&
                processKey(msg, buffer, "batchSize", 7, 2, position, cb) &&
                processParser(msg, buffer, "batchSize", "number", 4, position, cb) &&
                processKey(msg, buffer, "batchCounter", 8, 2, position, cb) &&
                processParser(msg, buffer, "batchCounter", "number", 4, position, cb) &&
                processKey(msg, buffer, "tighteningStatus", 9, 2, position, cb) &&
                processParser(msg, buffer, "tighteningStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "batchStatus", 10, 2, position, cb) &&
                processParser(msg, buffer, "batchStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "torqueStatus", 11, 2, position, cb) &&
                processParser(msg, buffer, "torqueStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "angleStatus", 12, 2, position, cb) &&
                processParser(msg, buffer, "angleStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "rundownAngleStatus", 13, 2, position, cb) &&
                processParser(msg, buffer, "rundownAngleStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "currentMonitoringStatus", 14, 2, position, cb) &&
                processParser(msg, buffer, "currentMonitoringStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "selftapStatus", 15, 2, position, cb) &&
                processParser(msg, buffer, "selftapStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "prevailTorqueMonitoringStatus", 16, 2, position, cb) &&
                processParser(msg, buffer, "prevailTorqueMonitoringStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "prevailTorqueCompensateStatus", 17, 2, position, cb) &&
                processParser(msg, buffer, "prevailTorqueCompensateStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "tighteningErrorStatus", 18, 2, position, cb) &&
                processParser(msg, buffer, "tighteningErrorStatus", "number", 10, position, cb) &&
                processKey(msg, buffer, "torque", 19, 2, position, cb) &&
                processParser(msg, buffer, "torque", "number", 6, position, cb) &&
                processKey(msg, buffer, "angle", 20, 2, position, cb) &&
                processParser(msg, buffer, "angle", "number", 5, position, cb) &&
                processKey(msg, buffer, "rundownAngle", 21, 2, position, cb) &&
                processParser(msg, buffer, "rundownAngle", "number", 5, position, cb) &&
                processKey(msg, buffer, "currentMonitoringValue", 22, 2, position, cb) &&
                processParser(msg, buffer, "currentMonitoringValue", "number", 3, position, cb) &&
                processKey(msg, buffer, "selftapTorque", 23, 2, position, cb) &&
                processParser(msg, buffer, "selftapTorque", "number", 6, position, cb) &&
                processKey(msg, buffer, "prevailTorque", 24, 2, position, cb) &&
                processParser(msg, buffer, "prevailTorque", "number", 6, position, cb) &&
                processKey(msg, buffer, "jobSequenceNumber", 25, 2, position, cb) &&
                processParser(msg, buffer, "jobSequenceNumber", "number", 5, position, cb) &&
                processKey(msg, buffer, "syncTighteningID", 26, 2, position, cb) &&
                processParser(msg, buffer, "syncTighteningID", "number", 5, position, cb) &&
                processKey(msg, buffer, "toolSerialNumber", 27, 2, position, cb) &&
                processParser(msg, buffer, "toolSerialNumber", "string", 14, position, cb) &&
                processKey(msg, buffer, "timeStamp", 28, 2, position, cb) &&
                processParser(msg, buffer, "timeStamp", "string", 19, position, cb) &&
                processKey(msg, buffer, "torqueValuesUnit", 29, 2, position, cb) &&
                processParser(msg, buffer, "torqueValuesUnit", "number", 1, position, cb) &&
                processKey(msg, buffer, "resultType", 30, 2, position, cb) &&
                processParser(msg, buffer, "resultType", "number", 2, position, cb) &&
                processKey(msg, buffer, "identifierPart2", 31, 2, position, cb) &&
                processParser(msg, buffer, "identifierPart2", "string", 25, position, cb) &&
                processKey(msg, buffer, "identifierPart3", 32, 2, position, cb) &&
                processParser(msg, buffer, "identifierPart3", "string", 25, position, cb) &&
                processKey(msg, buffer, "identifierPart4", 33, 2, position, cb) &&
                processParser(msg, buffer, "identifierPart4", "string", 25, position, cb) &&
                processKey(msg, buffer, "customerToghteningErrorCode", 34, 2, position, cb) &&
                processParser(msg, buffer, "customerToghteningErrorCode", "string", 4, position, cb) &&
                processKey(msg, buffer, "prevailTorqueCompensateValue", 35, 2, position, cb) &&
                processParser(msg, buffer, "prevailTorqueCompensateValue", "number", 6, position, cb) &&
                processKey(msg, buffer, "toghteningErrorStatus", 36, 2, position, cb) &&
                processParser(msg, buffer, "toghteningErrorStatus", "number", 10, position, cb) &&
                processKey(msg, buffer, "stationID", 37, 2, position, cb) &&
                processParser(msg, buffer, "stationID", "number", 10, position, cb) &&
                processKey(msg, buffer, "stationName", 38, 2, position, cb) &&
                processParser(msg, buffer, "stationName", "string", 25, position, cb) &&
                cb(null, msg);
            break;

        case 6:
            processKey(msg, buffer, "tighteningID", 1, 2, position, cb) &&
                processParser(msg, buffer, "tighteningID", "number", 10, position, cb) &&
                processKey(msg, buffer, "numberVIN", 2, 2, position, cb) &&
                processParser(msg, buffer, "numberVIN", "rawString", 25, position, cb) &&
                processKey(msg, buffer, "jobID", 3, 2, position, cb) &&
                processParser(msg, buffer, "jobID", "number", 4, position, cb) &&
                processKey(msg, buffer, "parameterSetID", 4, 2, position, cb) &&
                processParser(msg, buffer, "parameterSetID", "number", 3, position, cb) &&
                processKey(msg, buffer, "strategy", 5, 2, position, cb) &&
                processParser(msg, buffer, "strategy", "number", 2, position, cb) &&
                processKey(msg, buffer, "strategyOptions", 6, 2, position, cb) &&
                processParser(msg, buffer, "strategyOptions", "number", 5, position, cb) &&
                processKey(msg, buffer, "batchSize", 7, 2, position, cb) &&
                processParser(msg, buffer, "batchSize", "number", 4, position, cb) &&
                processKey(msg, buffer, "batchCounter", 8, 2, position, cb) &&
                processParser(msg, buffer, "batchCounter", "number", 4, position, cb) &&
                processKey(msg, buffer, "tighteningStatus", 9, 2, position, cb) &&
                processParser(msg, buffer, "tighteningStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "batchStatus", 10, 2, position, cb) &&
                processParser(msg, buffer, "batchStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "torqueStatus", 11, 2, position, cb) &&
                processParser(msg, buffer, "torqueStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "angleStatus", 12, 2, position, cb) &&
                processParser(msg, buffer, "angleStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "rundownAngleStatus", 13, 2, position, cb) &&
                processParser(msg, buffer, "rundownAngleStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "currentMonitoringStatus", 14, 2, position, cb) &&
                processParser(msg, buffer, "currentMonitoringStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "selftapStatus", 15, 2, position, cb) &&
                processParser(msg, buffer, "selftapStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "prevailTorqueMonitoringStatus", 16, 2, position, cb) &&
                processParser(msg, buffer, "prevailTorqueMonitoringStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "prevailTorqueCompensateStatus", 17, 2, position, cb) &&
                processParser(msg, buffer, "prevailTorqueCompensateStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "tighteningErrorStatus", 18, 2, position, cb) &&
                processParser(msg, buffer, "tighteningErrorStatus", "number", 10, position, cb) &&
                processKey(msg, buffer, "torque", 19, 2, position, cb) &&
                processParser(msg, buffer, "torque", "number", 6, position, cb) &&
                processKey(msg, buffer, "angle", 20, 2, position, cb) &&
                processParser(msg, buffer, "angle", "number", 5, position, cb) &&
                processKey(msg, buffer, "rundownAngle", 21, 2, position, cb) &&
                processParser(msg, buffer, "rundownAngle", "number", 5, position, cb) &&
                processKey(msg, buffer, "currentMonitoringValue", 22, 2, position, cb) &&
                processParser(msg, buffer, "currentMonitoringValue", "number", 3, position, cb) &&
                processKey(msg, buffer, "selftapTorque", 23, 2, position, cb) &&
                processParser(msg, buffer, "selftapTorque", "number", 6, position, cb) &&
                processKey(msg, buffer, "prevailTorque", 24, 2, position, cb) &&
                processParser(msg, buffer, "prevailTorque", "number", 6, position, cb) &&
                processKey(msg, buffer, "jobSequenceNumber", 25, 2, position, cb) &&
                processParser(msg, buffer, "jobSequenceNumber", "number", 5, position, cb) &&
                processKey(msg, buffer, "syncTighteningID", 26, 2, position, cb) &&
                processParser(msg, buffer, "syncTighteningID", "number", 5, position, cb) &&
                processKey(msg, buffer, "toolSerialNumber", 27, 2, position, cb) &&
                processParser(msg, buffer, "toolSerialNumber", "string", 14, position, cb) &&
                processKey(msg, buffer, "timeStamp", 28, 2, position, cb) &&
                processParser(msg, buffer, "timeStamp", "string", 19, position, cb) &&
                processKey(msg, buffer, "torqueValuesUnit", 29, 2, position, cb) &&
                processParser(msg, buffer, "torqueValuesUnit", "number", 1, position, cb) &&
                processKey(msg, buffer, "resultType", 30, 2, position, cb) &&
                processParser(msg, buffer, "resultType", "number", 2, position, cb) &&
                processKey(msg, buffer, "identifierPart2", 31, 2, position, cb) &&
                processParser(msg, buffer, "identifierPart2", "string", 25, position, cb) &&
                processKey(msg, buffer, "identifierPart3", 32, 2, position, cb) &&
                processParser(msg, buffer, "identifierPart3", "string", 25, position, cb) &&
                processKey(msg, buffer, "identifierPart4", 33, 2, position, cb) &&
                processParser(msg, buffer, "identifierPart4", "string", 25, position, cb) &&
                processKey(msg, buffer, "customerToghteningErrorCode", 34, 2, position, cb) &&
                processParser(msg, buffer, "customerToghteningErrorCode", "string", 4, position, cb) &&
                processKey(msg, buffer, "prevailTorqueCompensateValue", 35, 2, position, cb) &&
                processParser(msg, buffer, "prevailTorqueCompensateValue", "number", 6, position, cb) &&
                processKey(msg, buffer, "toghteningErrorStatus", 36, 2, position, cb) &&
                processParser(msg, buffer, "toghteningErrorStatus", "number", 10, position, cb) &&
                cb(null, msg);
            break;

        case 5:
            processKey(msg, buffer, "tighteningID", 1, 2, position, cb) &&
                processParser(msg, buffer, "tighteningID", "number", 10, position, cb) &&
                processKey(msg, buffer, "numberVIN", 2, 2, position, cb) &&
                processParser(msg, buffer, "numberVIN", "rawString", 25, position, cb) &&
                processKey(msg, buffer, "jobID", 3, 2, position, cb) &&
                processParser(msg, buffer, "jobID", "number", 4, position, cb) &&
                processKey(msg, buffer, "parameterSetID", 4, 2, position, cb) &&
                processParser(msg, buffer, "parameterSetID", "number", 3, position, cb) &&
                processKey(msg, buffer, "strategy", 5, 2, position, cb) &&
                processParser(msg, buffer, "strategy", "number", 2, position, cb) &&
                processKey(msg, buffer, "strategyOptions", 6, 2, position, cb) &&
                processParser(msg, buffer, "strategyOptions", "number", 5, position, cb) &&
                processKey(msg, buffer, "batchSize", 7, 2, position, cb) &&
                processParser(msg, buffer, "batchSize", "number", 4, position, cb) &&
                processKey(msg, buffer, "batchCounter", 8, 2, position, cb) &&
                processParser(msg, buffer, "batchCounter", "number", 4, position, cb) &&
                processKey(msg, buffer, "tighteningStatus", 9, 2, position, cb) &&
                processParser(msg, buffer, "tighteningStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "batchStatus", 10, 2, position, cb) &&
                processParser(msg, buffer, "batchStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "torqueStatus", 11, 2, position, cb) &&
                processParser(msg, buffer, "torqueStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "angleStatus", 12, 2, position, cb) &&
                processParser(msg, buffer, "angleStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "rundownAngleStatus", 13, 2, position, cb) &&
                processParser(msg, buffer, "rundownAngleStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "currentMonitoringStatus", 14, 2, position, cb) &&
                processParser(msg, buffer, "currentMonitoringStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "selftapStatus", 15, 2, position, cb) &&
                processParser(msg, buffer, "selftapStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "prevailTorqueMonitoringStatus", 16, 2, position, cb) &&
                processParser(msg, buffer, "prevailTorqueMonitoringStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "prevailTorqueCompensateStatus", 17, 2, position, cb) &&
                processParser(msg, buffer, "prevailTorqueCompensateStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "tighteningErrorStatus", 18, 2, position, cb) &&
                processParser(msg, buffer, "tighteningErrorStatus", "number", 10, position, cb) &&
                processKey(msg, buffer, "torque", 19, 2, position, cb) &&
                processParser(msg, buffer, "torque", "number", 6, position, cb) &&
                processKey(msg, buffer, "angle", 20, 2, position, cb) &&
                processParser(msg, buffer, "angle", "number", 5, position, cb) &&
                processKey(msg, buffer, "rundownAngle", 21, 2, position, cb) &&
                processParser(msg, buffer, "rundownAngle", "number", 5, position, cb) &&
                processKey(msg, buffer, "currentMonitoringValue", 22, 2, position, cb) &&
                processParser(msg, buffer, "currentMonitoringValue", "number", 3, position, cb) &&
                processKey(msg, buffer, "selftapTorque", 23, 2, position, cb) &&
                processParser(msg, buffer, "selftapTorque", "number", 6, position, cb) &&
                processKey(msg, buffer, "prevailTorque", 24, 2, position, cb) &&
                processParser(msg, buffer, "prevailTorque", "number", 6, position, cb) &&
                processKey(msg, buffer, "jobSequenceNumber", 25, 2, position, cb) &&
                processParser(msg, buffer, "jobSequenceNumber", "number", 5, position, cb) &&
                processKey(msg, buffer, "syncTighteningID", 26, 2, position, cb) &&
                processParser(msg, buffer, "syncTighteningID", "number", 5, position, cb) &&
                processKey(msg, buffer, "toolSerialNumber", 27, 2, position, cb) &&
                processParser(msg, buffer, "toolSerialNumber", "string", 14, position, cb) &&
                processKey(msg, buffer, "timeStamp", 28, 2, position, cb) &&
                processParser(msg, buffer, "timeStamp", "string", 19, position, cb) &&
                processKey(msg, buffer, "torqueValuesUnit", 29, 2, position, cb) &&
                processParser(msg, buffer, "torqueValuesUnit", "number", 1, position, cb) &&
                processKey(msg, buffer, "resultType", 30, 2, position, cb) &&
                processParser(msg, buffer, "resultType", "number", 2, position, cb) &&
                processKey(msg, buffer, "identifierPart2", 31, 2, position, cb) &&
                processParser(msg, buffer, "identifierPart2", "string", 25, position, cb) &&
                processKey(msg, buffer, "identifierPart3", 32, 2, position, cb) &&
                processParser(msg, buffer, "identifierPart3", "string", 25, position, cb) &&
                processKey(msg, buffer, "identifierPart4", 33, 2, position, cb) &&
                processParser(msg, buffer, "identifierPart4", "string", 25, position, cb) &&
                processKey(msg, buffer, "customerToghteningErrorCode", 34, 2, position, cb) &&
                processParser(msg, buffer, "customerToghteningErrorCode", "string", 4, position, cb) &&
                cb(null, msg);
            break;

        case 4:
            processKey(msg, buffer, "tighteningID", 1, 2, position, cb) &&
                processParser(msg, buffer, "tighteningID", "number", 10, position, cb) &&
                processKey(msg, buffer, "numberVIN", 2, 2, position, cb) &&
                processParser(msg, buffer, "numberVIN", "rawString", 25, position, cb) &&
                processKey(msg, buffer, "jobID", 3, 2, position, cb) &&
                processParser(msg, buffer, "jobID", "number", 4, position, cb) &&
                processKey(msg, buffer, "parameterSetID", 4, 2, position, cb) &&
                processParser(msg, buffer, "parameterSetID", "number", 3, position, cb) &&
                processKey(msg, buffer, "strategy", 5, 2, position, cb) &&
                processParser(msg, buffer, "strategy", "number", 2, position, cb) &&
                processKey(msg, buffer, "strategyOptions", 6, 2, position, cb) &&
                processParser(msg, buffer, "strategyOptions", "number", 5, position, cb) &&
                processKey(msg, buffer, "batchSize", 7, 2, position, cb) &&
                processParser(msg, buffer, "batchSize", "number", 4, position, cb) &&
                processKey(msg, buffer, "batchCounter", 8, 2, position, cb) &&
                processParser(msg, buffer, "batchCounter", "number", 4, position, cb) &&
                processKey(msg, buffer, "tighteningStatus", 9, 2, position, cb) &&
                processParser(msg, buffer, "tighteningStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "batchStatus", 10, 2, position, cb) &&
                processParser(msg, buffer, "batchStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "torqueStatus", 11, 2, position, cb) &&
                processParser(msg, buffer, "torqueStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "angleStatus", 12, 2, position, cb) &&
                processParser(msg, buffer, "angleStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "rundownAngleStatus", 13, 2, position, cb) &&
                processParser(msg, buffer, "rundownAngleStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "currentMonitoringStatus", 14, 2, position, cb) &&
                processParser(msg, buffer, "currentMonitoringStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "selftapStatus", 15, 2, position, cb) &&
                processParser(msg, buffer, "selftapStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "prevailTorqueMonitoringStatus", 16, 2, position, cb) &&
                processParser(msg, buffer, "prevailTorqueMonitoringStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "prevailTorqueCompensateStatus", 17, 2, position, cb) &&
                processParser(msg, buffer, "prevailTorqueCompensateStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "tighteningErrorStatus", 18, 2, position, cb) &&
                processParser(msg, buffer, "tighteningErrorStatus", "number", 10, position, cb) &&
                processKey(msg, buffer, "torque", 19, 2, position, cb) &&
                processParser(msg, buffer, "torque", "number", 6, position, cb) &&
                processKey(msg, buffer, "angle", 20, 2, position, cb) &&
                processParser(msg, buffer, "angle", "number", 5, position, cb) &&
                processKey(msg, buffer, "rundownAngle", 21, 2, position, cb) &&
                processParser(msg, buffer, "rundownAngle", "number", 5, position, cb) &&
                processKey(msg, buffer, "currentMonitoringValue", 22, 2, position, cb) &&
                processParser(msg, buffer, "currentMonitoringValue", "number", 3, position, cb) &&
                processKey(msg, buffer, "selftapTorque", 23, 2, position, cb) &&
                processParser(msg, buffer, "selftapTorque", "number", 6, position, cb) &&
                processKey(msg, buffer, "prevailTorque", 24, 2, position, cb) &&
                processParser(msg, buffer, "prevailTorque", "number", 6, position, cb) &&
                processKey(msg, buffer, "jobSequenceNumber", 25, 2, position, cb) &&
                processParser(msg, buffer, "jobSequenceNumber", "number", 5, position, cb) &&
                processKey(msg, buffer, "syncTighteningID", 26, 2, position, cb) &&
                processParser(msg, buffer, "syncTighteningID", "number", 5, position, cb) &&
                processKey(msg, buffer, "toolSerialNumber", 27, 2, position, cb) &&
                processParser(msg, buffer, "toolSerialNumber", "string", 14, position, cb) &&
                processKey(msg, buffer, "timeStamp", 28, 2, position, cb) &&
                processParser(msg, buffer, "timeStamp", "string", 19, position, cb) &&
                processKey(msg, buffer, "torqueValuesUnit", 29, 2, position, cb) &&
                processParser(msg, buffer, "torqueValuesUnit", "number", 1, position, cb) &&
                processKey(msg, buffer, "resultType", 30, 2, position, cb) &&
                processParser(msg, buffer, "resultType", "number", 2, position, cb) &&
                processKey(msg, buffer, "identifierPart2", 31, 2, position, cb) &&
                processParser(msg, buffer, "identifierPart2", "string", 25, position, cb) &&
                processKey(msg, buffer, "identifierPart3", 32, 2, position, cb) &&
                processParser(msg, buffer, "identifierPart3", "string", 25, position, cb) &&
                processKey(msg, buffer, "identifierPart4", 33, 2, position, cb) &&
                processParser(msg, buffer, "identifierPart4", "string", 25, position, cb) &&
                cb(null, msg);
            break;

        case 3:
            processKey(msg, buffer, "tighteningID", 1, 2, position, cb) &&
                processParser(msg, buffer, "tighteningID", "number", 10, position, cb) &&
                processKey(msg, buffer, "numberVIN", 2, 2, position, cb) &&
                processParser(msg, buffer, "numberVIN", "rawString", 25, position, cb) &&
                processKey(msg, buffer, "jobID", 3, 2, position, cb) &&
                processParser(msg, buffer, "jobID", "number", 4, position, cb) &&
                processKey(msg, buffer, "parameterSetID", 4, 2, position, cb) &&
                processParser(msg, buffer, "parameterSetID", "number", 3, position, cb) &&
                processKey(msg, buffer, "strategy", 5, 2, position, cb) &&
                processParser(msg, buffer, "strategy", "number", 2, position, cb) &&
                processKey(msg, buffer, "strategyOptions", 6, 2, position, cb) &&
                processParser(msg, buffer, "strategyOptions", "number", 5, position, cb) &&
                processKey(msg, buffer, "batchSize", 7, 2, position, cb) &&
                processParser(msg, buffer, "batchSize", "number", 4, position, cb) &&
                processKey(msg, buffer, "batchCounter", 8, 2, position, cb) &&
                processParser(msg, buffer, "batchCounter", "number", 4, position, cb) &&
                processKey(msg, buffer, "tighteningStatus", 9, 2, position, cb) &&
                processParser(msg, buffer, "tighteningStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "batchStatus", 10, 2, position, cb) &&
                processParser(msg, buffer, "batchStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "torqueStatus", 11, 2, position, cb) &&
                processParser(msg, buffer, "torqueStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "angleStatus", 12, 2, position, cb) &&
                processParser(msg, buffer, "angleStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "rundownAngleStatus", 13, 2, position, cb) &&
                processParser(msg, buffer, "rundownAngleStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "currentMonitoringStatus", 14, 2, position, cb) &&
                processParser(msg, buffer, "currentMonitoringStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "selftapStatus", 15, 2, position, cb) &&
                processParser(msg, buffer, "selftapStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "prevailTorqueMonitoringStatus", 16, 2, position, cb) &&
                processParser(msg, buffer, "prevailTorqueMonitoringStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "prevailTorqueCompensateStatus", 17, 2, position, cb) &&
                processParser(msg, buffer, "prevailTorqueCompensateStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "tighteningErrorStatus", 18, 2, position, cb) &&
                processParser(msg, buffer, "tighteningErrorStatus", "number", 10, position, cb) &&
                processKey(msg, buffer, "torque", 19, 2, position, cb) &&
                processParser(msg, buffer, "torque", "number", 6, position, cb) &&
                processKey(msg, buffer, "angle", 20, 2, position, cb) &&
                processParser(msg, buffer, "angle", "number", 5, position, cb) &&
                processKey(msg, buffer, "rundownAngle", 21, 2, position, cb) &&
                processParser(msg, buffer, "rundownAngle", "number", 5, position, cb) &&
                processKey(msg, buffer, "currentMonitoringValue", 22, 2, position, cb) &&
                processParser(msg, buffer, "currentMonitoringValue", "number", 3, position, cb) &&
                processKey(msg, buffer, "selftapTorque", 23, 2, position, cb) &&
                processParser(msg, buffer, "selftapTorque", "number", 6, position, cb) &&
                processKey(msg, buffer, "prevailTorque", 24, 2, position, cb) &&
                processParser(msg, buffer, "prevailTorque", "number", 6, position, cb) &&
                processKey(msg, buffer, "jobSequenceNumber", 25, 2, position, cb) &&
                processParser(msg, buffer, "jobSequenceNumber", "number", 5, position, cb) &&
                processKey(msg, buffer, "syncTighteningID", 26, 2, position, cb) &&
                processParser(msg, buffer, "syncTighteningID", "number", 5, position, cb) &&
                processKey(msg, buffer, "toolSerialNumber", 27, 2, position, cb) &&
                processParser(msg, buffer, "toolSerialNumber", "string", 14, position, cb) &&
                processKey(msg, buffer, "timeStamp", 28, 2, position, cb) &&
                processParser(msg, buffer, "timeStamp", "string", 19, position, cb) &&
                processKey(msg, buffer, "torqueValuesUnit", 29, 2, position, cb) &&
                processParser(msg, buffer, "torqueValuesUnit", "number", 1, position, cb) &&
                processKey(msg, buffer, "resultType", 30, 2, position, cb) &&
                processParser(msg, buffer, "resultType", "number", 2, position, cb) &&
                cb(null, msg);
            break;

        case 2:
            processKey(msg, buffer, "tighteningID", 1, 2, position, cb) &&
                processParser(msg, buffer, "tighteningID", "number", 10, position, cb) &&
                processKey(msg, buffer, "numberVIN", 2, 2, position, cb) &&
                processParser(msg, buffer, "numberVIN", "rawString", 25, position, cb) &&
                processKey(msg, buffer, "jobID", 3, 2, position, cb) &&
                processParser(msg, buffer, "jobID", "number", 4, position, cb) &&
                processKey(msg, buffer, "parameterSetID", 4, 2, position, cb) &&
                processParser(msg, buffer, "parameterSetID", "number", 3, position, cb) &&
                processKey(msg, buffer, "strategy", 5, 2, position, cb) &&
                processParser(msg, buffer, "strategy", "number", 2, position, cb) &&
                processKey(msg, buffer, "strategyOptions", 6, 2, position, cb) &&
                processParser(msg, buffer, "strategyOptions", "number", 5, position, cb) &&
                processKey(msg, buffer, "batchSize", 7, 2, position, cb) &&
                processParser(msg, buffer, "batchSize", "number", 4, position, cb) &&
                processKey(msg, buffer, "batchCounter", 8, 2, position, cb) &&
                processParser(msg, buffer, "batchCounter", "number", 4, position, cb) &&
                processKey(msg, buffer, "tighteningStatus", 9, 2, position, cb) &&
                processParser(msg, buffer, "tighteningStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "batchStatus", 10, 2, position, cb) &&
                processParser(msg, buffer, "batchStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "torqueStatus", 11, 2, position, cb) &&
                processParser(msg, buffer, "torqueStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "angleStatus", 12, 2, position, cb) &&
                processParser(msg, buffer, "angleStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "rundownAngleStatus", 13, 2, position, cb) &&
                processParser(msg, buffer, "rundownAngleStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "currentMonitoringStatus", 14, 2, position, cb) &&
                processParser(msg, buffer, "currentMonitoringStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "selftapStatus", 15, 2, position, cb) &&
                processParser(msg, buffer, "selftapStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "prevailTorqueMonitoringStatus", 16, 2, position, cb) &&
                processParser(msg, buffer, "prevailTorqueMonitoringStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "prevailTorqueCompensateStatus", 17, 2, position, cb) &&
                processParser(msg, buffer, "prevailTorqueCompensateStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "tighteningErrorStatus", 18, 2, position, cb) &&
                processParser(msg, buffer, "tighteningErrorStatus", "number", 10, position, cb) &&
                processKey(msg, buffer, "torque", 19, 2, position, cb) &&
                processParser(msg, buffer, "torque", "number", 6, position, cb) &&
                processKey(msg, buffer, "angle", 20, 2, position, cb) &&
                processParser(msg, buffer, "angle", "number", 5, position, cb) &&
                processKey(msg, buffer, "rundownAngle", 21, 2, position, cb) &&
                processParser(msg, buffer, "rundownAngle", "number", 5, position, cb) &&
                processKey(msg, buffer, "currentMonitoringValue", 22, 2, position, cb) &&
                processParser(msg, buffer, "currentMonitoringValue", "number", 3, position, cb) &&
                processKey(msg, buffer, "selftapTorque", 23, 2, position, cb) &&
                processParser(msg, buffer, "selftapTorque", "number", 6, position, cb) &&
                processKey(msg, buffer, "prevailTorque", 24, 2, position, cb) &&
                processParser(msg, buffer, "prevailTorque", "number", 6, position, cb) &&
                processKey(msg, buffer, "jobSequenceNumber", 25, 2, position, cb) &&
                processParser(msg, buffer, "jobSequenceNumber", "number", 5, position, cb) &&
                processKey(msg, buffer, "syncTighteningID", 26, 2, position, cb) &&
                processParser(msg, buffer, "syncTighteningID", "number", 5, position, cb) &&
                processKey(msg, buffer, "toolSerialNumber", 27, 2, position, cb) &&
                processParser(msg, buffer, "toolSerialNumber", "string", 14, position, cb) &&
                processKey(msg, buffer, "timeStamp", 28, 2, position, cb) &&
                processParser(msg, buffer, "timeStamp", "string", 19, position, cb) &&
                cb(null, msg);
            break;

        case 1:
            processKey(msg, buffer, "tighteningID", 1, 2, position, cb) &&
                processParser(msg, buffer, "tighteningID", "number", 10, position, cb) &&
                processKey(msg, buffer, "numberVIN", 2, 2, position, cb) &&
                processParser(msg, buffer, "numberVIN", "rawString", 25, position, cb) &&
                processKey(msg, buffer, "parameterSetID", 3, 2, position, cb) &&
                processParser(msg, buffer, "parameterSetID", "number", 3, position, cb) &&
                processKey(msg, buffer, "batchCounter", 4, 2, position, cb) &&
                processParser(msg, buffer, "batchCounter", "number", 4, position, cb) &&
                processKey(msg, buffer, "tighteningStatus", 5, 2, position, cb) &&
                processParser(msg, buffer, "tighteningStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "torqueStatus", 6, 2, position, cb) &&
                processParser(msg, buffer, "torqueStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "angleStatus", 7, 2, position, cb) &&
                processParser(msg, buffer, "angleStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "torque", 8, 2, position, cb) &&
                processParser(msg, buffer, "torque", "number", 6, position, cb) &&
                processKey(msg, buffer, "angle", 9, 2, position, cb) &&
                processParser(msg, buffer, "angle", "number", 5, position, cb) &&
                processKey(msg, buffer, "timeStamp", 10, 2, position, cb) &&
                processParser(msg, buffer, "timeStamp", "string", 19, position, cb) &&
                processKey(msg, buffer, "batchStatus", 11, 2, position, cb) &&
                processParser(msg, buffer, "batchStatus", "number", 1, position, cb) &&
                cb(null, msg);
            break;

        default:
            cb(new Error(`[Parser MID${msg.mid}] invalid revision [${msg.revision}]`));
            break;
    }
}

function serializer(msg, opts, cb) {

    let buf;
    let statusprocess = false;

    let position = {
        value: 0
    };

    msg.revision = msg.revision || 1;

    switch (msg.revision) {

        case 7:
            buf = Buffer.alloc(359);

            position.value = 359;

            statusprocess =
                serializerField(msg, buf, "stationName", "string", 25, position, cb) &&
                serializerKey(msg, buf, 38, 2, position, cb) &&
                serializerField(msg, buf, "stationID", "number", 10, position, cb) &&
                serializerKey(msg, buf, 37, 2, position, cb);

        case 6:

            if (buf === undefined) {
                buf = Buffer.alloc(320);
                statusprocess = true;
                position.value = 320;
            }

            if (!statusprocess) {
                return;
            }

            statusprocess =
                serializerField(msg, buf, "toghteningErrorStatus", "number", 10, position, cb) &&
                serializerKey(msg, buf, 36, 2, position, cb) &&
                serializerField(msg, buf, "prevailTorqueCompensateValue", "number", 6, position, cb) &&
                serializerKey(msg, buf, 35, 2, position, cb);

        case 5:

            if (buf === undefined) {
                buf = Buffer.alloc(300);
                statusprocess = true;
                position.value = 300;
            }

            if (!statusprocess) {
                return;
            }

            statusprocess =
                serializerField(msg, buf, "customerToghteningErrorCode", "string", 4, position, cb) &&
                serializerKey(msg, buf, 34, 2, position, cb);

        case 4:

            if (buf === undefined) {
                buf = Buffer.alloc(294);
                statusprocess = true;
                position.value = 294;
            }

            if (!statusprocess) {
                return;
            }

            statusprocess =
                serializerField(msg, buf, "identifierPart4", "string", 25, position, cb) &&
                serializerKey(msg, buf, 33, 2, position, cb) &&
                serializerField(msg, buf, "identifierPart3", "string", 25, position, cb) &&
                serializerKey(msg, buf, 32, 2, position, cb) &&
                serializerField(msg, buf, "identifierPart2", "string", 25, position, cb) &&
                serializerKey(msg, buf, 31, 2, position, cb);

        case 3:

            if (buf === undefined) {
                buf = Buffer.alloc(213);
                statusprocess = true;
                position.value = 213;
            }

            if (!statusprocess) {
                return;
            }

            statusprocess =
                serializerField(msg, buf, "resultType", "number", 2, position, cb) &&
                serializerKey(msg, buf, 30, 2, position, cb) &&
                serializerField(msg, buf, "torqueValuesUnit", "number", 1, position, cb) &&
                serializerKey(msg, buf, 29, 2, position, cb);

        case 2:

            if (buf === undefined) {
                buf = Buffer.alloc(206);
                statusprocess = true;
                position.value = 206;
            }

            if (!statusprocess) {
                return;
            }

            statusprocess =
                serializerField(msg, buf, "timeStamp", "string", 19, position, cb) &&
                serializerKey(msg, buf, 28, 2, position, cb) &&
                serializerField(msg, buf, "toolSerialNumber", "string", 14, position, cb) &&
                serializerKey(msg, buf, 27, 2, position, cb) &&
                serializerField(msg, buf, "syncTighteningID", "number", 5, position, cb) &&
                serializerKey(msg, buf, 26, 2, position, cb) &&
                serializerField(msg, buf, "jobSequenceNumber", "number", 5, position, cb) &&
                serializerKey(msg, buf, 25, 2, position, cb) &&
                serializerField(msg, buf, "prevailTorque", "number", 6, position, cb) &&
                serializerKey(msg, buf, 24, 2, position, cb) &&
                serializerField(msg, buf, "selftapTorque", "number", 6, position, cb) &&
                serializerKey(msg, buf, 23, 2, position, cb) &&
                serializerField(msg, buf, "currentMonitoringValue", "number", 3, position, cb) &&
                serializerKey(msg, buf, 22, 2, position, cb) &&
                serializerField(msg, buf, "rundownAngle", "number", 5, position, cb) &&
                serializerKey(msg, buf, 21, 2, position, cb) &&
                serializerField(msg, buf, "angle", "number", 5, position, cb) &&
                serializerKey(msg, buf, 20, 2, position, cb) &&
                serializerField(msg, buf, "torque", "number", 6, position, cb) &&
                serializerKey(msg, buf, 19, 2, position, cb) &&
                serializerField(msg, buf, "tighteningErrorStatus", "number", 10, position, cb) &&
                serializerKey(msg, buf, 18, 2, position, cb) &&
                serializerField(msg, buf, "prevailTorqueCompensateStatus", "number", 1, position, cb) &&
                serializerKey(msg, buf, 17, 2, position, cb) &&
                serializerField(msg, buf, "prevailTorqueMonitoringStatus", "number", 1, position, cb) &&
                serializerKey(msg, buf, 16, 2, position, cb) &&
                serializerField(msg, buf, "selftapStatus", "number", 1, position, cb) &&
                serializerKey(msg, buf, 15, 2, position, cb) &&
                serializerField(msg, buf, "currentMonitoringStatus", "number", 1, position, cb) &&
                serializerKey(msg, buf, 14, 2, position, cb) &&
                serializerField(msg, buf, "rundownAngleStatus", "number", 1, position, cb) &&
                serializerKey(msg, buf, 13, 2, position, cb) &&
                serializerField(msg, buf, "angleStatus", "number", 1, position, cb) &&
                serializerKey(msg, buf, 12, 2, position, cb) &&
                serializerField(msg, buf, "torqueStatus", "number", 1, position, cb) &&
                serializerKey(msg, buf, 11, 2, position, cb) &&
                serializerField(msg, buf, "batchStatus", "number", 1, position, cb) &&
                serializerKey(msg, buf, 10, 2, position, cb) &&
                serializerField(msg, buf, "tighteningStatus", "number", 1, position, cb) &&
                serializerKey(msg, buf, 9, 2, position, cb) &&
                serializerField(msg, buf, "batchCounter", "number", 4, position, cb) &&
                serializerKey(msg, buf, 8, 2, position, cb) &&
                serializerField(msg, buf, "batchSize", "number", 4, position, cb) &&
                serializerKey(msg, buf, 7, 2, position, cb) &&
                serializerField(msg, buf, "strategyOptions", "number", 5, position, cb) &&
                serializerKey(msg, buf, 6, 2, position, cb) &&
                serializerField(msg, buf, "strategy", "number", 2, position, cb) &&
                serializerKey(msg, buf, 5, 2, position, cb) &&
                serializerField(msg, buf, "parameterSetID", "number", 3, position, cb) &&
                serializerKey(msg, buf, 4, 2, position, cb) &&
                serializerField(msg, buf, "jobID", "number", 4, position, cb) &&
                serializerKey(msg, buf, 3, 2, position, cb) &&
                serializerField(msg, buf, "numberVIN", "string", 25, position, cb) &&
                serializerKey(msg, buf, 2, 2, position, cb) &&
                serializerField(msg, buf, "tighteningID", "number", 10, position, cb) &&
                serializerKey(msg, buf, 1, 2, position, cb);

            if (!statusprocess) {
                return;
            }

            msg.payload = buf;

            cb(null, msg);

            break;

        case 1:

            buf = Buffer.alloc(98);

            position.value = 98;

            statusprocess =
                serializerField(msg, buf, "batchStatus", "number", 1, position, cb) &&
                serializerKey(msg, buf, 11, 2, position, cb) &&
                serializerField(msg, buf, "timeStamp", "string", 19, position, cb) &&
                serializerKey(msg, buf, 10, 2, position, cb) &&
                serializerField(msg, buf, "angle", "number", 5, position, cb) &&
                serializerKey(msg, buf, 9, 2, position, cb) &&
                serializerField(msg, buf, "torque", "number", 6, position, cb) &&
                serializerKey(msg, buf, 8, 2, position, cb) &&
                serializerField(msg, buf, "angleStatus", "number", 1, position, cb) &&
                serializerKey(msg, buf, 7, 2, position, cb) &&
                serializerField(msg, buf, "torqueStatus", "number", 1, position, cb) &&
                serializerKey(msg, buf, 6, 2, position, cb) &&
                serializerField(msg, buf, "tighteningStatus", "number", 1, position, cb) &&
                serializerKey(msg, buf, 5, 2, position, cb) &&
                serializerField(msg, buf, "batchCounter", "number", 4, position, cb) &&
                serializerKey(msg, buf, 4, 2, position, cb) &&
                serializerField(msg, buf, "parameterSetID", "number", 3, position, cb) &&
                serializerKey(msg, buf, 3, 2, position, cb) &&
                serializerField(msg, buf, "numberVIN", "rawString", 25, position, cb) &&
                serializerKey(msg, buf, 2, 2, position, cb) &&
                serializerField(msg, buf, "tighteningID", "number", 10, position, cb) &&
                serializerKey(msg, buf, 1, 2, position, cb);

            if (!statusprocess) {
                return;
            }

            msg.payload = buf;

            cb(null, msg);

            break;

        default:
            cb(new Error(`[Serializer MID${msg.mid}] invalid revision [${msg.revision}]`));
            break;
    }
}

function revision() {
    return [7, 6, 5, 4, 3, 2, 1];
}

module.exports = {
    parser,
    serializer,
    revision
};