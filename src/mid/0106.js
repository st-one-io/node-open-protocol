//@ts-check
/*
  Copyright: (c) 2018-2020, Smart-Tech Controle e Automação
  GNU General Public License v3.0+ (see LICENSE or https://www.gnu.org/licenses/gpl-3.0.txt)
*/
const helpers = require("../helpers.js");
const processParser = helpers.processParser;
const processKey = helpers.processKey;

// keys are the same for revisions 1,2,3
const revKeys = [
    ["totalNoOfMessages", "number", 2],
    ["messageNumber", "number", 2],
    ["dataNoSystem", "number", 10],
    ["stationNo", "number", 2],
    ["stationName", "string", 20],
    ["time", "string", 19],
    ["modeNo", "number", 2],
    ["modeName", "string", 20],
    ["simpleStatus", "number", 1],
    ["pmStatus", "number", 1],
    ["wpId", "string", 40],
    ["numberOfBolts", "number", 2]
];

// these repeat for each numberOfBolts, starting at parameter number 13
const boltKeys = [
    ["ordinalBoltNumber", "number", 2],
    ["simpleBoltStatus", "number", 1],
    ["torqueStatus", "number", 1],
    ["angleStatus", "number", 1],
    ["boltT", "number", 7],
    ["boltA", "number", 7],
    ["boltTHighLimit", "number", 7],
    ["boltTLowLimit", "number", 7],
    ["boltAHighLimit", "number", 7],
    ["boltALowLimit", "number", 7]
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

            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                status = status &&
                    processKey(msg, buffer, key[0], i + 1, 2, position, cb) &&
                    processParser(msg, buffer, key[0], key[1], key[2], position, cb);
            }

            if (!status) return; //we've already failed, return

            // these parameters repeats for each numberOfBolts
            msg.payload.bolts = [];
            for (let boltNr = 0; boltNr < msg.payload.numberOfBolts; boltNr++){
                // let's fake a message for the parsing, so we can get it's payload
                // and copy to the real message later
                let boltPart = { 
                    mid: msg.mid,
                    payload: {}
                }

                // parse items
                for (let i = 0; i < boltKeys.length; i++) {
                    const key = boltKeys[i];
                    status = status &&
                        processKey(boltPart, buffer, key[0], i + 13, 2, position, cb) &&
                        processParser(boltPart, buffer, key[0], key[1], key[2], position, cb);
                }

                if (!status) return; //we've already failed, return

                //copy from fake message to real one
                msg.payload.bolts.push(boltPart.payload);
            }

            // get count of special values
            status = status &&
                processKey(msg, buffer, "numberOfSpecialValues", 23, 2, position, cb) &&
                processParser(msg, buffer, "numberOfSpecialValues", "number", 2, position, cb);

            // special values
            msg.payload.specialValues = Array(msg.payload.numberOfSpecialValues);
            for (let i = 0; i < msg.payload.specialValues.length; i++) {
                const specialValueMsg = { payload: {} };
                status = status &&
                    processParser(specialValueMsg, buffer, "variableName", "string", 20, position, cb) &&
                    processParser(specialValueMsg, buffer, "variableType", "string", 2, position, cb) &&
                    processParser(specialValueMsg, buffer, "variableLength", "number", 2, position, cb);

                // Open Protocol spec doesn"t seem to specify what possible values for the type are, so using string just in case
                status = status &&
                    processParser(specialValueMsg, buffer, "variableValue", "string", specialValueMsg.payload.variableLength, position, cb);
                msg.payload.specialValues[i] = specialValueMsg.payload;
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
