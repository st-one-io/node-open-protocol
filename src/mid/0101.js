const helpers = require("../helpers.js");
const processParser = helpers.processParser;
const processKey = helpers.processKey;

// keys are the same for revisions 1,2,3
const revKeys = [
    ["numberOfSpindles", "number", 2],
    ["vinNumber", "string", 25],
    ["jobNumber", "number", 2],
    ["psetNumber", "number", 3],
    ["batchSize", "number", 4],
    ["batchCounter", "number", 4],
    ["batchStatus", "number", 1],
    ["torqueMinLimit", "number", 6],
    ["torqueMaxLimit", "number", 6],
    ["torqueFinalTarget", "number", 6],
    ["angleMin", "number", 5],
    ["angleMax", "number", 5],
    ["finalAngleTarget", "number", 5],
    ["lastPsetChangeTimestamp", "string", 19],
    ["timestamp", "string", 19],
    ["tighteningId", "number", 5],
    ["overallStatus", "number", 1]
];

// these repeat for each numberOfSpindles, starting at parameter number 18
const spindleKeys = [
    ["spindleNumber", "number", 2],
    ["spare", "number", 2],
    ["spindleOverallStatus", "number", 1],
    ["spindleTorqueStatus", "number", 1],
    ["spindleTorqueResult", "number", 6],
    ["spindleAngleStatus", "number", 1],
    ["spindleAngleResult", "number", 5],
];

function parser(msg, opts, cb) {
    let buffer = msg.payload;
    msg.payload = {};

    let status = true;

    let revision = msg.revision || 1;

    switch (revision) {
        case 1:
        case 2:
        case 3:
            let position = {
                value: 0
            };

            const keys = revKeys;

            keys.forEach(function (key, i) {
                status = status &&
                    processKey(msg, buffer, key[0], i + 1, 2, position, cb) &&
                    processParser(msg, buffer, key[0], key[1], key[2], position, cb);
            });

            if (!status) return; //we've already failed, return

            // these parameters repeat for each numberOfSpindles
            msg.payload.spindles = [];
            position.value += 2; //accounts for position number 18
            for (let spindleNumber = 0; spindleNumber < msg.payload.numberOfSpindles; spindleNumber++) {
                let spindlePart = {
                    mid: msg.mid,
                    payload: {}
                }

                spindleKeys.forEach(function (key) {
                    status = status &&
                        processParser(spindlePart, buffer, key[0], key[1], key[2], position, cb);
                });

                if (!status) return;

                msg.payload.spindles.push(spindlePart.payload);
            }

            break;
        default:
            cb(new Error(`[Parser MID${msg.mid}] invalid revision [${msg.revision}]`));
            return;
    }

    if (status) {
        cb(null, msg);
    }
}

function serializer(msg, opts, cb) {
    let buf = Buffer.from("");
    msg.payload = buf;
    cb(null, msg);
}

function revision() {
    return [1, 2, 3];
}

module.exports = {
    parser,
    serializer,
    revision
};
