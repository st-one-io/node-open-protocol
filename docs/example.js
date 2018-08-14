/*
   Copyright 2018 Smart-Tech Controle e Automação

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
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
