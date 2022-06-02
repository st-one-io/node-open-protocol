//@ts-check
/*
  Copyright: (c) 2018-2020, Smart-Tech Controle e Automação
  GNU General Public License v3.0+ (see LICENSE or https://www.gnu.org/licenses/gpl-3.0.txt)
*/

/**
 * @class
 * @name MID0061
 * @param {object} MID0061_1 REV. 1
 * @param {number} MID0061_1.cellID
 * @param {number} MID0061_1.channelID
 * @param {string} MID0061_1.torqueControllerName
 * @param {string} MID0061_1.numberVIN
 * @param {number} MID0061_1.jobID
 * @param {number} MID0061_1.parameterSetID
 * @param {number} MID0061_1.batchSize
 * @param {number} MID0061_1.batchCounter
 * @param {number} MID0061_1.tighteningStatus
 * @param {number} MID0061_1.torqueStatus
 * @param {number} MID0061_1.angleStatus
 * @param {number} MID0061_1.torqueMinLimit
 * @param {number} MID0061_1.torqueMaxLimit
 * @param {number} MID0061_1.torqueFinalTarget
 * @param {number} MID0061_1.torque
 * @param {number} MID0061_1.angleMin
 * @param {number} MID0061_1.angleMax 
 * @param {number} MID0061_1.finalAngleTarget
 * @param {number} MID0061_1.angle
 * @param {string} MID0061_1.timeStamp
 * @param {string} MID0061_1.timeLastChange
 * @param {number} MID0061_1.batchStatus 
 * @param {number} MID0061_1.tighteningID
 *  
 * @param {object} MID0061_2 REV. 2
 * @param {number} MID0061_2.cellID
 * @param {number} MID0061_2.channelID
 * @param {string} MID0061_2.torqueControllerName
 * @param {string} MID0061_2.numberVIN
 * @param {number} MID0061_2.jobID
 * @param {number} MID0061_2.parameterSetID
 * @param {number} MID0061_2.strategy
 * @param {number} MID0061_2.strategyOptions
 * @param {number} MID0061_2.batchSize
 * @param {number} MID0061_2.batchCounter
 * @param {number} MID0061_2.tighteningStatus
 * @param {number} MID0061_2.batchStatus
 * @param {number} MID0061_2.torqueStatus
 * @param {number} MID0061_2.angleStatus
 * @param {number} MID0061_2.rundownAngleStatus
 * @param {number} MID0061_2.currentMonitoringStatus
 * @param {number} MID0061_2.selftapStatus
 * @param {number} MID0061_2.prevailTorqueMonitoringStatus
 * @param {number} MID0061_2.prevailTorqueCompensateStatus
 * @param {number} MID0061_2.tighteningErrorStatus
 * @param {number} MID0061_2.torqueMinLimit
 * @param {number} MID0061_2.torqueMaxLimit
 * @param {number} MID0061_2.torqueFinalTarget
 * @param {number} MID0061_2.torque
 * @param {number} MID0061_2.angleMin
 * @param {number} MID0061_2.angleMax 
 * @param {number} MID0061_2.finalAngleTarget
 * @param {number} MID0061_2.angle
 * @param {number} MID0061_2.rundownAngleMin 
 * @param {number} MID0061_2.rundownAngleMax
 * @param {number} MID0061_2.rundownAngle
 * @param {number} MID0061_2.currentMonitoringMin
 * @param {number} MID0061_2.currentMonitoringMax
 * @param {number} MID0061_2.currentMonitoringValue
 * @param {number} MID0061_2.selftapMin
 * @param {number} MID0061_2.selftapMax
 * @param {number} MID0061_2.selftapTorque
 * @param {number} MID0061_2.prevailTorqueMonitoringMin
 * @param {number} MID0061_2.prevailTorqueMonitoringMax
 * @param {number} MID0061_2.prevailTorque
 * @param {number} MID0061_2.tighteningID
 * @param {number} MID0061_2.jobSequenceNumber
 * @param {number} MID0061_2.syncTighteningID
 * @param {string} MID0061_2.toolSerialNumber
 * @param {string} MID0061_2.timeStamp
 * @param {string} MID0061_2.timeLastChange 
 * 
 * @param {object} MID0061_3 REV. 3 [(REV. 2) +] 
 * @param {string} MID0061_3.parameterSetName
 * @param {number} MID0061_3.torqueValuesUnit
 * @param {number} MID0061_3.resultType
 * 
 * @param {object} MID0061_4 REV. 4 [(REV. 3) +] 
 * @param {string} MID0061_4.identifierPart2
 * @param {string} MID0061_4.identifierPart3
 * @param {string} MID0061_4.identifierPart4
 *  
 * @param {object} MID0061_5 REV. 5 [(REV. 4) +] 
 * @param {string} MID0061_5.customerToghteningErrorCode 
 * 
 * @param {object} MID0061_6 REV. 6 [(REV. 5) +] 
 * @param {number} MID0061_6.prevailTorqueCompensateValue
 * @param {number} MID0061_6.toghteningErrorStatus
 * 
 * @param {object} MID0061_7 REV. 7 [(REV. 6) +] 
 * @param {number} MID0061_7.compensatedAngle
 * @param {number} MID0061_7.finalAngleDecimal
 * 
 * @param {object} MID0061_998 REV. 998 [(REV. 6) +] 
 * @param {number} MID0061_998.numberStagesMultiStage
 * @param {number} MID0061_998.numberStageResults
 * @param {string} MID0061_998.stageResult
 * 
 * @param {object} MID0061_999 
 * @param {string} MID0061_999.numberVIN
 * @param {number} MID0061_999.jobID
 * @param {number} MID0061_999.parameterSetID
 * @param {number} MID0061_999.batchSize
 * @param {number} MID0061_999.batchCounter
 * @param {number} MID0061_999.batchStatus
 * @param {number} MID0061_999.tighteningStatus
 * @param {number} MID0061_999.torqueStatus
 * @param {number} MID0061_999.angleStatus
 * @param {number} MID0061_999.torque
 * @param {number} MID0061_999.angle
 * @param {string} MID0061_999.timeStamp
 * @param {string} MID0061_999.timeLastChange
 * @param {number} MID0061_999.tighteningID
 */

const helpers = require("../helpers.js");
const processParser = helpers.processParser;
const processKey = helpers.processKey;
const serializerField = helpers.serializerField;
const serializerKey = helpers.serializerKey;

const constantsMID = require("./MidConstants/MID0061");

function parser(msg, opts, cb) {

    let buffer = msg.payload;
    msg.payload = {};

    let status = true;

    let position = {
        value: 0
    };

    let revision = msg.revision || 1;

    switch (revision) {

        case 998:

            position = {
                value: 506
            };

            status =
                processKey(msg, buffer, "numberStagesMultiStage", 56, 2, position, cb) &&
                processParser(msg, buffer, "numberStagesMultiStage", "number", 2, position, cb) &&
                processKey(msg, buffer, "numberStageResults", 57, 2, position, cb) &&
                processParser(msg, buffer, "numberStageResults", "number", 2, position, cb) &&
                processKey(msg, buffer, "stageResult", 58, 2, position, cb) &&
                processParser(msg, buffer, "stageResult", "string", (11 * msg.payload.numberStageResults), position, cb);

            revision = 6;

            break;

        case 7:

            position = {
                value: 506
            };

            status =
                processKey(msg, buffer, "compensatedAngle", 56, 2, position, cb) &&
                processParser(msg, buffer, "compensatedAngle", "number", 7, position, cb) &&
                processKey(msg, buffer, "finalAngleDecimal", 57, 2, position, cb) &&
                processParser(msg, buffer, "finalAngleDecimal", "number", 7, position, cb);

            if (status) {
                msg.payload.compensatedAngle = (msg.payload.compensatedAngle / 100);
                msg.payload.finalAngleDecimal = (msg.payload.finalAngleDecimal / 100);
                revision = 6;
            }

            break;
    }

    switch (revision) {

        case 999:

            position = {
                value: 0
            };

            status =
                processParser(msg, buffer, "numberVIN", "rawString", 25, position, cb) &&
                processParser(msg, buffer, "jobID", "number", 2, position, cb) &&
                processParser(msg, buffer, "parameterSetID", "number", 3, position, cb) &&
                processParser(msg, buffer, "batchSize", "number", 4, position, cb) &&
                processParser(msg, buffer, "batchCounter", "number", 4, position, cb) &&
                processParser(msg, buffer, "batchStatus", "number", 1, position, cb) &&
                processParser(msg, buffer, "tighteningStatus", "number", 1, position, cb) &&
                processParser(msg, buffer, "torqueStatus", "number", 1, position, cb) &&
                processParser(msg, buffer, "angleStatus", "number", 1, position, cb) &&
                processParser(msg, buffer, "torque", "number", 6, position, cb) &&
                processParser(msg, buffer, "angle", "number", 5, position, cb) &&
                processParser(msg, buffer, "timeStamp", "string", 19, position, cb) &&
                processParser(msg, buffer, "timeLastChange", "string", 19, position, cb) &&
                processParser(msg, buffer, "tighteningID", "number", 10, position, cb);

            if (status) {
                msg.payload._torqueStatus = msg.payload.torqueStatus;
                msg.payload.torqueStatus = constantsMID["status"][msg.payload.torqueStatus.toString()];

                msg.payload._angleStatus = msg.payload.angleStatus;
                msg.payload.angleStatus = constantsMID["status"][msg.payload.angleStatus.toString()];

                msg.payload.torque = (msg.payload.torque / 100);

                msg.payload._tighteningStatus = msg.payload.tighteningStatus;
                msg.payload.tighteningStatus = checkOK(msg.payload.tighteningStatus);

                msg.payload._batchStatus = msg.payload.batchStatus;
                msg.payload.batchStatus = checkOK(msg.payload.batchStatus);

                cb(null, msg);
            }

            break;

        case 6:

            position = {
                value: 486
            };

            status =
                processKey(msg, buffer, "prevailTorqueCompensateValue", 54, 2, position, cb) &&
                processParser(msg, buffer, "prevailTorqueCompensateValue", "number", 6, position, cb) &&
                processKey(msg, buffer, "tighteningErrorStatus2", 55, 2, position, cb) &&
                processParser(msg, buffer, "tighteningErrorStatus2", "number", 10, position, cb);

            if (status) {
                msg.payload._tighteningErrorStatus2 = msg.payload.tighteningErrorStatus2;
                msg.payload.tighteningErrorStatus2 = checkBitMap("tighteningErrorStatus2", msg.payload.tighteningErrorStatus2, 32);
                msg.payload.prevailTorqueCompensateValue = (msg.payload.prevailTorqueCompensateValue / 100);
            }

        case 5:

            position = {
                value: 480
            };

            status =
                processKey(msg, buffer, "customerToghteningErrorCode", 53, 2, position, cb) &&
                processParser(msg, buffer, "customerToghteningErrorCode", "string", 4, position, cb);

        case 4:

            position = {
                value: 399
            };

            status =
                processKey(msg, buffer, "identifierPart2", 50, 2, position, cb) &&
                processParser(msg, buffer, "identifierPart2", "string", 25, position, cb) &&
                processKey(msg, buffer, "identifierPart3", 51, 2, position, cb) &&
                processParser(msg, buffer, "identifierPart3", "string", 25, position, cb) &&
                processKey(msg, buffer, "identifierPart4", 52, 2, position, cb) &&
                processParser(msg, buffer, "identifierPart4", "string", 25, position, cb);


        case 3:

            position = {
                value: 365
            };

            status =
                processKey(msg, buffer, "parameterSetName", 47, 2, position, cb) &&
                processParser(msg, buffer, "parameterSetName", "string", 25, position, cb) &&
                processKey(msg, buffer, "torqueValuesUnit", 48, 2, position, cb) &&
                processParser(msg, buffer, "torqueValuesUnit", "number", 1, position, cb) &&
                processKey(msg, buffer, "resultType", 49, 2, position, cb) &&
                processParser(msg, buffer, "resultType", "number", 2, position, cb);

            if (status) {

                msg.payload._torqueValuesUnit = msg.payload.torqueValuesUnit;
                msg.payload.torqueValuesUnit = constantsMID["torqueValuesUnit"][msg.payload.torqueValuesUnit.toString()];

                msg.payload._resultType = msg.payload.resultType;
                msg.payload.resultType = constantsMID["resultType"][msg.payload.resultType.toString()];

            }


        case 2:

            position = {
                value: 0
            };

            status =
                processKey(msg, buffer, "cellID", 1, 2, position, cb) &&
                processParser(msg, buffer, "cellID", "number", 4, position, cb) &&
                processKey(msg, buffer, "channelID", 2, 2, position, cb) &&
                processParser(msg, buffer, "channelID", "number", 2, position, cb) &&
                processKey(msg, buffer, "torqueControllerName", 3, 2, position, cb) &&
                processParser(msg, buffer, "torqueControllerName", "string", 25, position, cb) &&
                processKey(msg, buffer, "numberVIN", 4, 2, position, cb) &&
                processParser(msg, buffer, "numberVIN", "rawString", 25, position, cb) &&
                processKey(msg, buffer, "jobID", 5, 2, position, cb) &&
                processParser(msg, buffer, "jobID", "number", 4, position, cb) &&
                processKey(msg, buffer, "parameterSetID", 6, 2, position, cb) &&
                processParser(msg, buffer, "parameterSetID", "number", 3, position, cb) &&
                processKey(msg, buffer, "strategy", 7, 2, position, cb) &&
                processParser(msg, buffer, "strategy", "number", 2, position, cb) &&
                processKey(msg, buffer, "strategyOptions", 8, 2, position, cb) &&
                processParser(msg, buffer, "strategyOptions", "number", 5, position, cb) &&
                processKey(msg, buffer, "batchSize", 9, 2, position, cb) &&
                processParser(msg, buffer, "batchSize", "number", 4, position, cb) &&
                processKey(msg, buffer, "batchCounter", 10, 2, position, cb) &&
                processParser(msg, buffer, "batchCounter", "number", 4, position, cb) &&
                processKey(msg, buffer, "tighteningStatus", 11, 2, position, cb) &&
                processParser(msg, buffer, "tighteningStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "batchStatus", 12, 2, position, cb) &&
                processParser(msg, buffer, "batchStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "torqueStatus", 13, 2, position, cb) &&
                processParser(msg, buffer, "torqueStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "angleStatus", 14, 2, position, cb) &&
                processParser(msg, buffer, "angleStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "rundownAngleStatus", 15, 2, position, cb) &&
                processParser(msg, buffer, "rundownAngleStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "currentMonitoringStatus", 16, 2, position, cb) &&
                processParser(msg, buffer, "currentMonitoringStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "selftapStatus", 17, 2, position, cb) &&
                processParser(msg, buffer, "selftapStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "prevailTorqueMonitoringStatus", 18, 2, position, cb) &&
                processParser(msg, buffer, "prevailTorqueMonitoringStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "prevailTorqueCompensateStatus", 19, 2, position, cb) &&
                processParser(msg, buffer, "prevailTorqueCompensateStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "tighteningErrorStatus", 20, 2, position, cb) &&
                processParser(msg, buffer, "tighteningErrorStatus", "number", 10, position, cb) &&
                processKey(msg, buffer, "torqueMinLimit", 21, 2, position, cb) &&
                processParser(msg, buffer, "torqueMinLimit", "number", 6, position, cb) &&
                processKey(msg, buffer, "torqueMaxLimit", 22, 2, position, cb) &&
                processParser(msg, buffer, "torqueMaxLimit", "number", 6, position, cb) &&
                processKey(msg, buffer, "torqueFinalTarget", 23, 2, position, cb) &&
                processParser(msg, buffer, "torqueFinalTarget", "number", 6, position, cb) &&
                processKey(msg, buffer, "torque", 24, 2, position, cb) &&
                processParser(msg, buffer, "torque", "number", 6, position, cb) &&
                processKey(msg, buffer, "angleMin", 25, 2, position, cb) &&
                processParser(msg, buffer, "angleMin", "number", 5, position, cb) &&
                processKey(msg, buffer, "angleMax", 26, 2, position, cb) &&
                processParser(msg, buffer, "angleMax", "number", 5, position, cb) &&
                processKey(msg, buffer, "finalAngleTarget", 27, 2, position, cb) &&
                processParser(msg, buffer, "finalAngleTarget", "number", 5, position, cb) &&
                processKey(msg, buffer, "angle", 28, 2, position, cb) &&
                processParser(msg, buffer, "angle", "number", 5, position, cb) &&
                processKey(msg, buffer, "rundownAngleMin", 29, 2, position, cb) &&
                processParser(msg, buffer, "rundownAngleMin", "number", 5, position, cb) &&
                processKey(msg, buffer, "rundownAngleMax", 30, 2, position, cb) &&
                processParser(msg, buffer, "rundownAngleMax", "number", 5, position, cb) &&
                processKey(msg, buffer, "rundownAngle", 31, 2, position, cb) &&
                processParser(msg, buffer, "rundownAngle", "number", 5, position, cb) &&
                processKey(msg, buffer, "currentMonitoringMin", 32, 2, position, cb) &&
                processParser(msg, buffer, "currentMonitoringMin", "number", 3, position, cb) &&
                processKey(msg, buffer, "currentMonitoringMax", 33, 2, position, cb) &&
                processParser(msg, buffer, "currentMonitoringMax", "number", 3, position, cb) &&
                processKey(msg, buffer, "currentMonitoringValue", 34, 2, position, cb) &&
                processParser(msg, buffer, "currentMonitoringValue", "number", 3, position, cb) &&
                processKey(msg, buffer, "selftapMin", 35, 2, position, cb) &&
                processParser(msg, buffer, "selftapMin", "number", 6, position, cb) &&
                processKey(msg, buffer, "selftapMax", 36, 2, position, cb) &&
                processParser(msg, buffer, "selftapMax", "number", 6, position, cb) &&
                processKey(msg, buffer, "selftapTorque", 37, 2, position, cb) &&
                processParser(msg, buffer, "selftapTorque", "number", 6, position, cb) &&
                processKey(msg, buffer, "prevailTorqueMonitoringMin", 38, 2, position, cb) &&
                processParser(msg, buffer, "prevailTorqueMonitoringMin", "number", 6, position, cb) &&
                processKey(msg, buffer, "prevailTorqueMonitoringMax", 39, 2, position, cb) &&
                processParser(msg, buffer, "prevailTorqueMonitoringMax", "number", 6, position, cb) &&
                processKey(msg, buffer, "prevailTorque", 40, 2, position, cb) &&
                processParser(msg, buffer, "prevailTorque", "number", 6, position, cb) &&
                processKey(msg, buffer, "tighteningID", 41, 2, position, cb) &&
                processParser(msg, buffer, "tighteningID", "number", 10, position, cb) &&
                processKey(msg, buffer, "jobSequenceNumber", 42, 2, position, cb) &&
                processParser(msg, buffer, "jobSequenceNumber", "number", 5, position, cb) &&
                processKey(msg, buffer, "syncTighteningID", 43, 2, position, cb) &&
                processParser(msg, buffer, "syncTighteningID", "number", 5, position, cb) &&
                processKey(msg, buffer, "toolSerialNumber", 44, 2, position, cb) &&
                processParser(msg, buffer, "toolSerialNumber", "string", 14, position, cb) &&
                processKey(msg, buffer, "timeStamp", 45, 2, position, cb) &&
                processParser(msg, buffer, "timeStamp", "string", 19, position, cb) &&
                processKey(msg, buffer, "timeLastChange", 46, 2, position, cb) &&
                processParser(msg, buffer, "timeLastChange", "string", 19, position, cb);

            if (status) {
                msg.payload._strategy = msg.payload.strategy;
                msg.payload.strategy = constantsMID["strategy"][msg.payload.strategy.toString()];

                msg.payload._strategyOptions = msg.payload.strategyOptions;
                msg.payload.strategyOptions = checkBitMap("strategyOptions", msg.payload.strategyOptions, 11);

                msg.payload._torqueStatus = msg.payload.torqueStatus;
                msg.payload.torqueStatus = constantsMID["status"][msg.payload.torqueStatus.toString()];

                msg.payload._angleStatus = msg.payload.angleStatus;
                msg.payload.angleStatus = constantsMID["status"][msg.payload.angleStatus.toString()];

                msg.payload._rundownAngleStatus = msg.payload.rundownAngleStatus;
                msg.payload.rundownAngleStatus = constantsMID["status"][msg.payload.rundownAngleStatus.toString()];

                msg.payload._currentMonitoringStatus = msg.payload.currentMonitoringStatus;
                msg.payload.currentMonitoringStatus = constantsMID["status"][msg.payload.currentMonitoringStatus.toString()];

                msg.payload._selftapStatus = msg.payload.selftapStatus;
                msg.payload.selftapStatus = constantsMID["status"][msg.payload.selftapStatus.toString()];

                msg.payload._prevailTorqueMonitoringStatus = msg.payload.prevailTorqueMonitoringStatus;
                msg.payload.prevailTorqueMonitoringStatus = constantsMID["status"][msg.payload.prevailTorqueMonitoringStatus.toString()];

                msg.payload._prevailTorqueCompensateStatus = msg.payload.prevailTorqueCompensateStatus;
                msg.payload.prevailTorqueCompensateStatus = constantsMID["status"][msg.payload.prevailTorqueCompensateStatus.toString()];

                msg.payload._tighteningErrorStatus = msg.payload.tighteningErrorStatus;
                msg.payload.tighteningErrorStatus = checkBitMap("tighteningErrorStatus", msg.payload.tighteningErrorStatus, 32);

                msg.payload.torqueMinLimit = (msg.payload.torqueMinLimit / 100);

                msg.payload.torqueMaxLimit = (msg.payload.torqueMaxLimit / 100);

                msg.payload.torqueFinalTarget = (msg.payload.torqueFinalTarget / 100);

                msg.payload.torque = (msg.payload.torque / 100);

                msg.payload.selftapMin = (msg.payload.selftapMin / 100);

                msg.payload.selftapMax = (msg.payload.selftapMax / 100);

                msg.payload.selftapTorque = (msg.payload.selftapTorque / 100);

                msg.payload.prevailTorqueMonitoringMin = (msg.payload.prevailTorqueMonitoringMin / 100);

                msg.payload.prevailTorqueMonitoringMax = (msg.payload.prevailTorqueMonitoringMax / 100);

                msg.payload.prevailTorque = (msg.payload.prevailTorque / 100);

                msg.payload._tighteningStatus = msg.payload.tighteningStatus;
                msg.payload.tighteningStatus = checkOK(msg.payload.tighteningStatus);

                msg.payload._batchStatus = msg.payload.batchStatus;
                msg.payload.batchStatus = checkOK(msg.payload.batchStatus);

                cb(null, msg);
            }
            break;

        case 1:

            position = {
                value: 0
            };

            status =
                processKey(msg, buffer, "cellID", 1, 2, position, cb) &&
                processParser(msg, buffer, "cellID", "number", 4, position, cb) &&
                processKey(msg, buffer, "channelID", 2, 2, position, cb) &&
                processParser(msg, buffer, "channelID", "number", 2, position, cb) &&
                processKey(msg, buffer, "torqueControllerName", 3, 2, position, cb) &&
                processParser(msg, buffer, "torqueControllerName", "string", 25, position, cb) &&
                processKey(msg, buffer, "numberVIN", 4, 2, position, cb) &&
                processParser(msg, buffer, "numberVIN", "rawString", 25, position, cb) &&
                processKey(msg, buffer, "jobID", 5, 2, position, cb) &&
                processParser(msg, buffer, "jobID", "number", 2, position, cb) &&
                processKey(msg, buffer, "parameterSetID", 6, 2, position, cb) &&
                processParser(msg, buffer, "parameterSetID", "number", 3, position, cb) &&
                processKey(msg, buffer, "batchSize", 7, 2, position, cb) &&
                processParser(msg, buffer, "batchSize", "number", 4, position, cb) &&
                processKey(msg, buffer, "batchCounter", 8, 2, position, cb) &&
                processParser(msg, buffer, "batchCounter", "number", 4, position, cb) &&
                processKey(msg, buffer, "tighteningStatus", 9, 2, position, cb) &&
                processParser(msg, buffer, "tighteningStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "torqueStatus", 10, 2, position, cb) &&
                processParser(msg, buffer, "torqueStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "angleStatus", 11, 2, position, cb) &&
                processParser(msg, buffer, "angleStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "torqueMinLimit", 12, 2, position, cb) &&
                processParser(msg, buffer, "torqueMinLimit", "number", 6, position, cb) &&
                processKey(msg, buffer, "torqueMaxLimit", 13, 2, position, cb) &&
                processParser(msg, buffer, "torqueMaxLimit", "number", 6, position, cb) &&
                processKey(msg, buffer, "torqueFinalTarget", 14, 2, position, cb) &&
                processParser(msg, buffer, "torqueFinalTarget", "number", 6, position, cb) &&
                processKey(msg, buffer, "torque", 15, 2, position, cb) &&
                processParser(msg, buffer, "torque", "number", 6, position, cb) &&
                processKey(msg, buffer, "angleMin", 16, 2, position, cb) &&
                processParser(msg, buffer, "angleMin", "number", 5, position, cb) &&
                processKey(msg, buffer, "angleMax", 17, 2, position, cb) &&
                processParser(msg, buffer, "angleMax", "number", 5, position, cb) &&
                processKey(msg, buffer, "finalAngleTarget", 18, 2, position, cb) &&
                processParser(msg, buffer, "finalAngleTarget", "number", 5, position, cb) &&
                processKey(msg, buffer, "angle", 19, 2, position, cb) &&
                processParser(msg, buffer, "angle", "number", 5, position, cb) &&
                processKey(msg, buffer, "timeStamp", 20, 2, position, cb) &&
                processParser(msg, buffer, "timeStamp", "string", 19, position, cb) &&
                processKey(msg, buffer, "timeLastChange", 21, 2, position, cb) &&
                processParser(msg, buffer, "timeLastChange", "string", 19, position, cb) &&
                processKey(msg, buffer, "batchStatus", 22, 2, position, cb) &&
                processParser(msg, buffer, "batchStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "tighteningID", 23, 2, position, cb) &&
                processParser(msg, buffer, "tighteningID", "number", 10, position, cb);

            if (status) {

                msg.payload._torqueStatus = msg.payload.torqueStatus;
                msg.payload.torqueStatus = constantsMID["status"][msg.payload.torqueStatus.toString()];

                msg.payload._angleStatus = msg.payload.angleStatus;
                msg.payload.angleStatus = constantsMID["status"][msg.payload.angleStatus.toString()];

                msg.payload.torqueMinLimit = (msg.payload.torqueMinLimit / 100);

                msg.payload.torqueMaxLimit = (msg.payload.torqueMaxLimit / 100);

                msg.payload.torqueFinalTarget = (msg.payload.torqueFinalTarget / 100);

                msg.payload.torque = (msg.payload.torque / 100);

                msg.payload._tighteningStatus = msg.payload.tighteningStatus;
                msg.payload.tighteningStatus = checkOK(msg.payload.tighteningStatus);

                msg.payload._batchStatus = msg.payload.batchStatus;
                msg.payload.batchStatus = checkOK(msg.payload.batchStatus);

                cb(null, msg);
            }

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
    let revision = msg.revision;

    switch (revision) {
        case 7:

            buf = Buffer.alloc(524);

            position.value = 524;

            msg.payload.finalAngleDecimal = Math.trunc((msg.payload.finalAngleDecimal * 100));
            msg.payload.compensatedAngle = Math.trunc((msg.payload.compensatedAngle * 100));

            statusprocess =
                serializerField(msg, buf, "finalAngleDecimal", "number", 7, position, cb) &&
                serializerKey(msg, buf, 57, 2, position, cb) &&
                serializerField(msg, buf, "compensatedAngle", "number", 7, position, cb) &&
                serializerKey(msg, buf, 56, 2, position, cb);

            revision = 6;

            break;

        case 998:

            buf = Buffer.alloc(527);

            position.value = 527;

            statusprocess =
                serializerField(msg, buf, "stageResult", "string", (11 * msg.payload.numberStageResults), position, cb) &&
                serializerKey(msg, buf, 58, 2, position, cb) &&
                serializerField(msg, buf, "numberStageResults", "number", 2, position, cb) &&
                serializerKey(msg, buf, 57, 2, position, cb) &&
                serializerField(msg, buf, "numberStagesMultiStage", "number", 2, position, cb) &&
                serializerKey(msg, buf, 56, 2, position, cb);

            revision = 6;

            break;

        case 999:

            buf = Buffer.alloc(101);

            position.value = 101;

            msg.payload.tighteningStatus = serializerStatus(msg.payload.tighteningStatus);
            msg.payload.torqueStatus = serializerStatus(msg.payload.torqueStatus);
            msg.payload.angleStatus = serializerStatus(msg.payload.angleStatus);
            msg.payload.batchStatus = serializerStatus(msg.payload.batchStatus);

            msg.payload.torque = Math.trunc((msg.payload.torque * 100));

            statusprocess =
                serializerField(msg, buf, "tighteningID", "number", 10, position, cb) &&
                serializerField(msg, buf, "timeLastChange", "string", 19, position, cb) &&
                serializerField(msg, buf, "timeStamp", "string", 19, position, cb) &&
                serializerField(msg, buf, "angle", "number", 5, position, cb) &&
                serializerField(msg, buf, "torque", "number", 6, position, cb) &&
                serializerField(msg, buf, "angleStatus", "number", 1, position, cb) &&
                serializerField(msg, buf, "torqueStatus", "number", 1, position, cb) &&
                serializerField(msg, buf, "tighteningStatus", "number", 1, position, cb) &&
                serializerField(msg, buf, "batchStatus", "number", 1, position, cb) &&
                serializerField(msg, buf, "batchCounter", "number", 4, position, cb) &&
                serializerField(msg, buf, "batchSize", "number", 4, position, cb) &&
                serializerField(msg, buf, "parameterSetID", "number", 3, position, cb) &&
                serializerField(msg, buf, "jobID", "number", 2, position, cb) &&
                serializerField(msg, buf, "numberVIN", "rawString", 25, position, cb);

            if (!statusprocess) {
                return;
            }

            msg.payload = buf;

            cb(null, msg);

            break;
    }

    switch (revision) {

        case 999:
            break;

        case 6:

            if (buf === undefined) {
                buf = Buffer.alloc(506);
                position.value = 506;
                statusprocess = true;
            }

            if (!statusprocess) {
                return;
            }

            msg.payload.tighteningErrorStatus2 = serializerBitMap(msg.payload.tighteningErrorStatus2, 32);
            msg.payload.prevailTorqueCompensateValue = Math.trunc(msg.payload.prevailTorqueCompensateValue * 100);

            statusprocess =
                serializerField(msg, buf, "tighteningErrorStatus2", "number", 10, position, cb) &&
                serializerKey(msg, buf, 55, 2, position, cb) &&
                serializerField(msg, buf, "prevailTorqueCompensateValue", "number", 6, position, cb) &&
                serializerKey(msg, buf, 54, 2, position, cb);

        case 5:

            if (buf === undefined) {
                buf = Buffer.alloc(486);
                position.value = 486;
                statusprocess = true;
            }

            if (!statusprocess) {
                return;
            }

            statusprocess =
                serializerField(msg, buf, "customerToghteningErrorCode", "string", 4, position, cb) &&
                serializerKey(msg, buf, 53, 2, position, cb);


        case 4:

            if (buf === undefined) {
                buf = Buffer.alloc(480);
                position.value = 480;
                statusprocess = true;
            }

            if (!statusprocess) {
                return;
            }

            statusprocess =
                serializerField(msg, buf, "identifierPart4", "string", 25, position, cb) &&
                serializerKey(msg, buf, 52, 2, position, cb) &&
                serializerField(msg, buf, "identifierPart3", "string", 25, position, cb) &&
                serializerKey(msg, buf, 51, 2, position, cb) &&
                serializerField(msg, buf, "identifierPart2", "string", 25, position, cb) &&
                serializerKey(msg, buf, 50, 2, position, cb);

        case 3:

            if (buf === undefined) {
                buf = Buffer.alloc(399);
                position.value = 399;
                statusprocess = true;
            }

            if (!statusprocess) {
                return;
            }

            msg.payload.torqueValuesUnit = serializerOptions("serializer-torqueValuesUnit", msg.payload.torqueValuesUnit);
            msg.payload.resultType = serializerOptions("serializer-resultType", msg.payload.resultType);

            statusprocess =
                serializerField(msg, buf, "resultType", "number", 2, position, cb) &&
                serializerKey(msg, buf, 49, 2, position, cb) &&
                serializerField(msg, buf, "torqueValuesUnit", "number", 1, position, cb) &&
                serializerKey(msg, buf, 48, 2, position, cb) &&
                serializerField(msg, buf, "parameterSetName", "string", 25, position, cb) &&
                serializerKey(msg, buf, 47, 2, position, cb);
        case 2:

            if (buf === undefined) {
                buf = Buffer.alloc(365);
                position.value = 365;
                statusprocess = true;
            }

            if (!statusprocess) {
                return;
            }

            msg.payload.prevailTorque = Math.trunc(msg.payload.prevailTorque * 100);
            msg.payload.prevailTorqueMonitoringMax = Math.trunc(msg.payload.prevailTorqueMonitoringMax * 100);
            msg.payload.prevailTorqueMonitoringMin = Math.trunc(msg.payload.prevailTorqueMonitoringMin * 100);
            msg.payload.selftapTorque = Math.trunc(msg.payload.selftapTorque * 100);
            msg.payload.selftapMax = Math.trunc(msg.payload.selftapMax * 100);
            msg.payload.selftapMin = Math.trunc(msg.payload.selftapMin * 100);
            msg.payload.torque = Math.trunc(msg.payload.torque * 100);
            msg.payload.torqueFinalTarget = Math.trunc(msg.payload.torqueFinalTarget * 100);
            msg.payload.torqueMaxLimit = Math.trunc(msg.payload.torqueMaxLimit * 100);
            msg.payload.torqueMinLimit = Math.trunc(msg.payload.torqueMinLimit * 100);

            msg.payload.tighteningErrorStatus = serializerBitMap(msg.payload.tighteningErrorStatus, 32);
            msg.payload.strategyOptions = serializerBitMap(msg.payload.strategyOptions, 10);

            msg.payload.prevailTorqueCompensateStatus = serializerStatus(msg.payload.prevailTorqueCompensateStatus);
            msg.payload.prevailTorqueMonitoringStatus = serializerStatus(msg.payload.prevailTorqueMonitoringStatus);
            msg.payload.selftapStatus = serializerStatus(msg.payload.selftapStatus);
            msg.payload.currentMonitoringStatus = serializerStatus(msg.payload.currentMonitoringStatus);
            msg.payload.rundownAngleStatus = serializerStatus(msg.payload.rundownAngleStatus);
            msg.payload.angleStatus = serializerStatus(msg.payload.angleStatus);
            msg.payload.torqueStatus = serializerStatus(msg.payload.torqueStatus);
            msg.payload.batchStatus = serializerStatus(msg.payload.batchStatus);
            msg.payload.tighteningStatus = serializerStatus(msg.payload.tighteningStatus);

            msg.payload.strategy = serializerOptions("serializer-strategy", msg.payload.strategy);

            statusprocess =
                serializerField(msg, buf, "timeLastChange", "string", 19, position, cb) &&
                serializerKey(msg, buf, 46, 2, position, cb) &&
                serializerField(msg, buf, "timeStamp", "string", 19, position, cb) &&
                serializerKey(msg, buf, 45, 2, position, cb) &&
                serializerField(msg, buf, "toolSerialNumber", "string", 14, position, cb) &&
                serializerKey(msg, buf, 44, 2, position, cb) &&
                serializerField(msg, buf, "syncTighteningID", "number", 5, position, cb) &&
                serializerKey(msg, buf, 43, 2, position, cb) &&
                serializerField(msg, buf, "jobSequenceNumber", "number", 5, position, cb) &&
                serializerKey(msg, buf, 42, 2, position, cb) &&
                serializerField(msg, buf, "tighteningID", "number", 10, position, cb) &&
                serializerKey(msg, buf, 41, 2, position, cb) &&
                serializerField(msg, buf, "prevailTorque", "number", 6, position, cb) &&
                serializerKey(msg, buf, 40, 2, position, cb) &&
                serializerField(msg, buf, "prevailTorqueMonitoringMax", "number", 6, position, cb) &&
                serializerKey(msg, buf, 39, 2, position, cb) &&
                serializerField(msg, buf, "prevailTorqueMonitoringMin", "number", 6, position, cb) &&
                serializerKey(msg, buf, 38, 2, position, cb) &&
                serializerField(msg, buf, "selftapTorque", "number", 6, position, cb) &&
                serializerKey(msg, buf, 37, 2, position, cb) &&
                serializerField(msg, buf, "selftapMax", "number", 6, position, cb) &&
                serializerKey(msg, buf, 36, 2, position, cb) &&
                serializerField(msg, buf, "selftapMin", "number", 6, position, cb) &&
                serializerKey(msg, buf, 35, 2, position, cb) &&
                serializerField(msg, buf, "currentMonitoringValue", "number", 3, position, cb) &&
                serializerKey(msg, buf, 34, 2, position, cb) &&
                serializerField(msg, buf, "currentMonitoringMax", "number", 3, position, cb) &&
                serializerKey(msg, buf, 33, 2, position, cb) &&
                serializerField(msg, buf, "currentMonitoringMin", "number", 3, position, cb) &&
                serializerKey(msg, buf, 32, 2, position, cb) &&
                serializerField(msg, buf, "rundownAngle", "number", 5, position, cb) &&
                serializerKey(msg, buf, 31, 2, position, cb) &&
                serializerField(msg, buf, "rundownAngleMax", "number", 5, position, cb) &&
                serializerKey(msg, buf, 30, 2, position, cb) &&
                serializerField(msg, buf, "rundownAngleMin", "number", 5, position, cb) &&
                serializerKey(msg, buf, 29, 2, position, cb) &&
                serializerField(msg, buf, "angle", "number", 5, position, cb) &&
                serializerKey(msg, buf, 28, 2, position, cb) &&
                serializerField(msg, buf, "finalAngleTarget", "number", 5, position, cb) &&
                serializerKey(msg, buf, 27, 2, position, cb) &&
                serializerField(msg, buf, "angleMax", "number", 5, position, cb) &&
                serializerKey(msg, buf, 26, 2, position, cb) &&
                serializerField(msg, buf, "angleMin", "number", 5, position, cb) &&
                serializerKey(msg, buf, 25, 2, position, cb) &&
                serializerField(msg, buf, "torque", "number", 6, position, cb) &&
                serializerKey(msg, buf, 24, 2, position, cb) &&
                serializerField(msg, buf, "torqueFinalTarget", "number", 6, position, cb) &&
                serializerKey(msg, buf, 23, 2, position, cb) &&
                serializerField(msg, buf, "torqueMaxLimit", "number", 6, position, cb) &&
                serializerKey(msg, buf, 22, 2, position, cb) &&
                serializerField(msg, buf, "torqueMinLimit", "number", 6, position, cb) &&
                serializerKey(msg, buf, 21, 2, position, cb) &&
                serializerField(msg, buf, "tighteningErrorStatus", "number", 10, position, cb) &&
                serializerKey(msg, buf, 20, 2, position, cb) &&
                serializerField(msg, buf, "prevailTorqueCompensateStatus", "number", 1, position, cb) &&
                serializerKey(msg, buf, 19, 2, position, cb) &&
                serializerField(msg, buf, "prevailTorqueMonitoringStatus", "number", 1, position, cb) &&
                serializerKey(msg, buf, 18, 2, position, cb) &&
                serializerField(msg, buf, "selftapStatus", "number", 1, position, cb) &&
                serializerKey(msg, buf, 17, 2, position, cb) &&
                serializerField(msg, buf, "currentMonitoringStatus", "number", 1, position, cb) &&
                serializerKey(msg, buf, 16, 2, position, cb) &&
                serializerField(msg, buf, "rundownAngleStatus", "number", 1, position, cb) &&
                serializerKey(msg, buf, 15, 2, position, cb) &&
                serializerField(msg, buf, "angleStatus", "number", 1, position, cb) &&
                serializerKey(msg, buf, 14, 2, position, cb) &&
                serializerField(msg, buf, "torqueStatus", "number", 1, position, cb) &&
                serializerKey(msg, buf, 13, 2, position, cb) &&
                serializerField(msg, buf, "batchStatus", "number", 1, position, cb) &&
                serializerKey(msg, buf, 12, 2, position, cb) &&
                serializerField(msg, buf, "tighteningStatus", "number", 1, position, cb) &&
                serializerKey(msg, buf, 11, 2, position, cb) &&
                serializerField(msg, buf, "batchCounter", "number", 4, position, cb) &&
                serializerKey(msg, buf, 10, 2, position, cb) &&
                serializerField(msg, buf, "batchSize", "number", 4, position, cb) &&
                serializerKey(msg, buf, 9, 2, position, cb) &&
                serializerField(msg, buf, "strategyOptions", "number", 5, position, cb) &&
                serializerKey(msg, buf, 8, 2, position, cb) &&
                serializerField(msg, buf, "strategy", "number", 2, position, cb) &&
                serializerKey(msg, buf, 7, 2, position, cb) &&
                serializerField(msg, buf, "parameterSetID", "number", 3, position, cb) &&
                serializerKey(msg, buf, 6, 2, position, cb) &&
                serializerField(msg, buf, "jobID", "number", 4, position, cb) &&
                serializerKey(msg, buf, 5, 2, position, cb) &&
                serializerField(msg, buf, "numberVIN", "rawString", 25, position, cb) &&
                serializerKey(msg, buf, 4, 2, position, cb) &&
                serializerField(msg, buf, "torqueControllerName", "string", 25, position, cb) &&
                serializerKey(msg, buf, 3, 2, position, cb) &&
                serializerField(msg, buf, "channelID", "number", 2, position, cb) &&
                serializerKey(msg, buf, 2, 2, position, cb) &&
                serializerField(msg, buf, "cellID", "number", 4, position, cb) &&
                serializerKey(msg, buf, 1, 2, position, cb);

            if (!statusprocess) {
                return;
            }

            msg.payload = buf;

            cb(null, msg);

            break;

        case 1:

            buf = Buffer.alloc(211);

            position.value = 211;

            msg.payload.angleStatus = serializerStatus(msg.payload.angleStatus);
            msg.payload.torqueStatus = serializerStatus(msg.payload.torqueStatus);
            msg.payload.batchStatus = serializerStatus(msg.payload.batchStatus);
            msg.payload.tighteningStatus = serializerStatus(msg.payload.tighteningStatus);

            msg.payload.torque = Math.trunc(msg.payload.torque * 100);
            msg.payload.torqueFinalTarget = Math.trunc(msg.payload.torqueFinalTarget * 100);
            msg.payload.torqueMaxLimit = Math.trunc(msg.payload.torqueMaxLimit * 100);
            msg.payload.torqueMinLimit = Math.trunc(msg.payload.torqueMinLimit * 100);

            statusprocess =
                serializerField(msg, buf, "tighteningID", "number", 10, position, cb) &&
                serializerKey(msg, buf, 23, 2, position, cb) &&
                serializerField(msg, buf, "batchStatus", "number", 1, position, cb) &&
                serializerKey(msg, buf, 22, 2, position, cb) &&
                serializerField(msg, buf, "timeLastChange", "string", 19, position, cb) &&
                serializerKey(msg, buf, 21, 2, position, cb) &&
                serializerField(msg, buf, "timeStamp", "string", 19, position, cb) &&
                serializerKey(msg, buf, 20, 2, position, cb) &&
                serializerField(msg, buf, "angle", "number", 5, position, cb) &&
                serializerKey(msg, buf, 19, 2, position, cb) &&
                serializerField(msg, buf, "finalAngleTarget", "number", 5, position, cb) &&
                serializerKey(msg, buf, 18, 2, position, cb) &&
                serializerField(msg, buf, "angleMax", "number", 5, position, cb) &&
                serializerKey(msg, buf, 17, 2, position, cb) &&
                serializerField(msg, buf, "angleMin", "number", 5, position, cb) &&
                serializerKey(msg, buf, 16, 2, position, cb) &&
                serializerField(msg, buf, "torque", "number", 6, position, cb) &&
                serializerKey(msg, buf, 15, 2, position, cb) &&
                serializerField(msg, buf, "torqueFinalTarget", "number", 6, position, cb) &&
                serializerKey(msg, buf, 14, 2, position, cb) &&
                serializerField(msg, buf, "torqueMaxLimit", "number", 6, position, cb) &&
                serializerKey(msg, buf, 13, 2, position, cb) &&
                serializerField(msg, buf, "torqueMinLimit", "number", 6, position, cb) &&
                serializerKey(msg, buf, 12, 2, position, cb) &&
                serializerField(msg, buf, "angleStatus", "number", 1, position, cb) &&
                serializerKey(msg, buf, 11, 2, position, cb) &&
                serializerField(msg, buf, "torqueStatus", "number", 1, position, cb) &&
                serializerKey(msg, buf, 10, 2, position, cb) &&
                serializerField(msg, buf, "tighteningStatus", "number", 1, position, cb) &&
                serializerKey(msg, buf, 9, 2, position, cb) &&
                serializerField(msg, buf, "batchCounter", "number", 4, position, cb) &&
                serializerKey(msg, buf, 8, 2, position, cb) &&
                serializerField(msg, buf, "batchSize", "number", 4, position, cb) &&
                serializerKey(msg, buf, 7, 2, position, cb) &&
                serializerField(msg, buf, "parameterSetID", "number", 3, position, cb) &&
                serializerKey(msg, buf, 6, 2, position, cb) &&
                serializerField(msg, buf, "jobID", "number", 2, position, cb) &&
                serializerKey(msg, buf, 5, 2, position, cb) &&
                serializerField(msg, buf, "numberVIN", "rawString", 25, position, cb) &&
                serializerKey(msg, buf, 4, 2, position, cb) &&
                serializerField(msg, buf, "torqueControllerName", "string", 25, position, cb) &&
                serializerKey(msg, buf, 3, 2, position, cb) &&
                serializerField(msg, buf, "channelID", "number", 2, position, cb) &&
                serializerKey(msg, buf, 2, 2, position, cb) &&
                serializerField(msg, buf, "cellID", "number", 4, position, cb) &&
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

function checkBitMap(type, number, length) {

    let retorno = new Array(length);

    for (let i = 0; i < length; i++) {

        if (((1 << i) & number) > 0) {
            retorno[i] = constantsMID[type][i];
        } else {
            retorno[i] = undefined;
        }

    }

    return retorno;
}

function checkOK(value) {
    switch (value) {
        case 0:
            return "NOK";
        case 1:
            return "OK";
        default:
            return "NOT USED";
    }
}

function serializerStatus(value) {

    if(typeof value !== "string"){
        return value;
    }
    
    value = value.toUpperCase();

    if ("OK" === value) {
        return 1;
    }

    if ("LOW" === value || "NOK" === value) {
        return 0;
    }

    if ("HIGH" === value || "NOT USED" === value) {
        return 2;
    }

    return value;
}

function serializerBitMap(data, length){

    let retorno = 0;

    if(!isNaN(data)){
        return data;
    }

    for(let i = 0; i < length; i++){
        if(data[i]){
            retorno  |= 1 << i;
        }
    }

    return retorno;
}

function serializerOptions(type, data){

    if(!isNaN(data)){
        return data;
    }

    return constantsMID[type][data];    
}

function revision() {
    return [7, 6, 5, 4, 3, 2, 1]; //MID 999 e 998 fora do auto revision
}

module.exports = {
    parser,
    serializer,
    revision
};
