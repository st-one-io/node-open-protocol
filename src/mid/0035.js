//@ts-check
/*
  Copyright: (c) 2018-2020, Smart-Tech Controle e Automação
  GNU General Public License v3.0+ (see LICENSE or https://www.gnu.org/licenses/gpl-3.0.txt)
*/
const helpers = require("../helpers.js");
const processParser = helpers.processParser;
const processKey = helpers.processKey;

const rev1Keys = [
    ['jobID', 'number', 2],
    ['jobStatus', 'number', 1],
    ['jobBatchMode', 'number', 1],
    ['jobBatchSize', 'number', 4],
    ['jobBatchCounter', 'number', 4],
    ['timeStamp', 'string', 19]
];

const rev2Keys = [
    ['jobID', 'number', 4],
    ['jobStatus', 'number', 1],
    ['jobBatchMode', 'number', 1],
    ['jobBatchSize', 'number', 4],
    ['jobBatchCounter', 'number', 4],
    ['timeStamp', 'string', 19]
];

const rev3Keys = [
    ['jobID', 'number', 4],
    ['jobStatus', 'number', 1],
    ['jobBatchMode', 'number', 1],
    ['jobBatchSize', 'number', 4],
    ['jobBatchCounter', 'number', 4],
    ['timeStamp', 'string', 19],
    ['jobCurrentStep', 'number', 3],
    ['jobTotalSteps', 'number', 3],
    ['jobStepType', 'number', 2]
];

const rev4Keys = [
    ['jobID', 'number', 4],
    ['jobStatus', 'number', 1],
    ['jobBatchMode', 'number', 1],
    ['jobBatchSize', 'number', 4],
    ['jobBatchCounter', 'number', 4],
    ['timeStamp', 'string', 19],
    ['jobCurrentStep', 'number', 3],
    ['jobTotalSteps', 'number', 3],
    ['jobStepType', 'number', 2],
    ['jobTighteningStatus', 'number', 2]
];

const rev5Keys = [
    ['jobID', 'number', 4],
    ['jobStatus', 'number', 1],
    ['jobBatchMode', 'number', 1],
    ['jobBatchSize', 'number', 4],
    ['jobBatchCounter', 'number', 4],
    ['timeStamp', 'string', 19],
    ['jobCurrentStep', 'number', 3],
    ['jobTotalSteps', 'number', 3],
    ['jobStepType', 'number', 2],
    ['jobTighteningStatus', 'number', 2],
    ['jobSequenceNumber', 'number', 5],
    ['numberVIN', 'string', 25],
    ['identifierPart2', 'string', 25],
    ['identifierPart3', 'string', 25],
    ['identifierPart4', 'string', 25]
];

const revisionKeys = [rev1Keys, rev2Keys, rev3Keys, rev4Keys, rev5Keys];

function parser(msg, opts, cb) {
    let buffer = msg.payload;
    msg.payload = {};

    let status = true;

    let position = {
        value: 0
    };

    let revision = msg.revision || 1;

    const keys = revisionKeys[revision - 1];

    if (!keys){
        cb(new Error(`[Parser MID${msg.mid}] invalid revision [${msg.revision}]`));
        return;
    }

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        status =
            status &&
            processKey(msg, buffer, key[0], i + 1, 2, position, cb) &&
            processParser(msg, buffer, key[0], key[1], key[2], position, cb);
    }

    if (status) {
        cb(null, msg);
    }
}

function serializer(msg, opts, cb) {
    cb(new Error(`[Serializer MID${msg.mid}] still not implemented`));

    //let buf = Buffer.from("");
    //msg.payload = buf;
    //cb(null, msg);
}

function revision() {
    return [1, 2, 3, 4, 5];
}

module.exports = {
    parser,
    serializer,
    revision
};
