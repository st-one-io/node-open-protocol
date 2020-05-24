//@ts-check
/*
  Copyright: (c) 2018-2020, Smart-Tech Controle e Automação
  GNU General Public License v3.0+ (see LICENSE or https://www.gnu.org/licenses/gpl-3.0.txt)
*/

const openProtocol = require('open-protocol');

let op = openProtocol.createClient(4545, "127.0.0.1", onConnect);

op.on("error", (error) => {
    console.log("Error on OpenProtocol", error);
});

function onConnect(data) {
    performSubscribe();
}

function performSubscribe() {

    op.subscribe("lastTightening", (err, data) => {
        if (err) {
            return console.log("Error on Subscribe", err);
        }

        op.on("lastTightening", (midData) => onData(midData));

        startTightening(1, "ASDEDCUHBG34563EDFRCVGFR6");
    });
}

function onData(midData) {
    console.log("Receiver data on subscribe", JSON.stringify(midData));
}

function startTightening(parameterSetID, numberVIN) {
    // --> Abort Job --> Select Pset --> Set VehicleId --> Disable Tool --> Enable Tool -->

    op.command("abortJob", (err) => {
        if (err) {
            return console.log("Fail on abortJob", err);
        }

        op.command("selectPset", { payload: { parameterSetID } }, (err) => {

            if (err) {
                return console.log("Fail on selectPset", err);
            }

            op.command("vinDownload", { payload: { numberVIN } }, (err) => {

                if (err) {
                    return console.log("Fail on vinDownload", err);
                }

                op.command("disableTool", (err, data) => {

                    if (err) {
                        return console.log("Fail on disableTool", err);
                    }

                    op.command("enableTool", (err, data) => {

                        if (err) {
                            return console.log("Fail on enableTool", err);
                        }

                        console.log("waiting for the operator to tightening");
                    });
                });
            });
        });
    });
}
