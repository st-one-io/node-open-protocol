//@ts-check
/*
  Copyright: (c) 2018-2020, Smart-Tech Controle e Automação
  GNU General Public License v3.0+ (see LICENSE or https://www.gnu.org/licenses/gpl-3.0.txt)
*/
//04-07-2018

/*
After that, the production can start with use of the following messages:
 Command Abort Job. MID 0127.
 Command Select Pset MID 0018.
 Command Set VIN. MID 0050 or MID 0150 handling
 Command Disable Tool. MID 0042.
 Command Enable Tool. MID 0043.
*/

let op = require(".");

let ipControlador = "127.0.0.1"; //"172.26.138.52"
let portControlador = 4545;

let optsSessionControl = {
    //Configurações Session Control
    defaultRevisions: undefined, // {"mid": rev, "mid": rev}
    linkLayerActivate: undefined, // true activate / false not activate / undefined autoNegotiation
    genericMode: false, // true activate / false ou undefined not activate  
    keepAlive: undefined, // Number, default 10000

    //Configuraçoes do LinkLayer
    rawData: undefined, // true activate / false ou undefined not activate 
    disableMidParsing: undefined, // true activate / false ou undefined not activate 
    timeOut: undefined, // Number, default 3000
    retryTimes: undefined // Number, default 3
};

let sc = connect();
// requestReadTimeUpload();
// requestReadTimeUpload();

function connect() {
    return op.createClient(portControlador, ipControlador, optsSessionControl, (data) => {
        console.log("CONNECT");
        console.log("MID0002", JSON.stringify(data));
    });
}

sc.on("error", (err) => {
    console.log("[Event][SessionControl][onError]", err);
});

sc.on("data", (data) => {
    //console.log("[Event][SessionControl][onData]", JSON.stringify(data));
});

sc.on("close", (err) => {
    console.log("[Event][SessionControl][onClose]", err);
});


//--> Start COMMANDS
//MID 0003
function commandCommunicationStop() {
    sc.command("communicationStop", (err, data) => {
        onCallback("Command", "communicationStop", err, data);
    });
}


//MID 0018
function commandSelectParameterSet(pset) {

    let opts = {
        payload: {
            parameterSetID: pset
        }
    };

    sc.command("selectParameterSet", opts, (err, data) => {
        onCallback("Command", "selectParameterSet", err, data);
    });
}

//MID 0042
function commandDisableTool() {
    sc.command("disableTool", (err, data) => {
        onCallback("Command", "disableTool", err, data);
    });
}

//MID 0043
function commandEnableTool() {
    sc.command("enableTool", (err, data) => {
        onCallback("Command", "enableTool", err, data);
    });
}

//MID 0050
//numberVin = String (25)
function commandVehicleIdNumberDownload(numberVIN) {

    let opts = {
        payload: {
            numberVIN
        }
    };

    sc.command("vehicleIdNumberDownload", opts, (err, data) => {
        onCallback("Command", "vehicleIdNumberDownload", err, data);
    });
}

//MID 0127
function commandAbortJob() {
    sc.command("abortJob", (err, data) => {
        onCallback("Command", "abortJob", err, data);
    });
}
//--> End COMMANDS

//--> Start SUBSCRIBES
//MID 0014
function subscribePsetSelected() {
    sc.subscribe("psetSelected", (err, data) => {
        onCallback("Subscribe", "psetSelected", err, data);
    });

    setListener("psetSelected");
}

//MID 0070
function subscribeAlarm(){
    sc.subscribe("alarm", (err, data) => {
        onCallback("Subscribe", "alarm", err, data);
    });

    setListener("alarm");
    setListener("alarmAcknowledged");
    setListener("alarmStatus");
}

//MID 0051
function subscribeVin() {
    sc.subscribe("vin", (err, data) => {
        onCallback("Subscribe", "vin", err, data);
    });

    setListener("vin");
}

//MID 0061
function subscribeLastTightening() {
    sc.subscribe("lastTightening", (err, data) => {
        onCallback("Subscribe", "lastTightening", err, data);
    });

    setListener("lastTightening");
}
//--> End SUBSCRIBES

//--> Start UNSUBSCRIBES
//MID 0017
function unsubscribePsetSelected() {
    sc.unsubscribe("psetSelected", (err, data) => {
        onCallback("Unsubscribe", "psetSelected", err, data);
    });
}

//MID 0054
function unsubscribeVin() {
    sc.unsubscribe("vin", (err, data) => {
        onCallback("Unsubscribe", "vin", err, data);
    });
}

//MID 0063
function unsubscribeLastTightening() {
    sc.unsubscribe("lastTightening", (err, data) => {
        onCallback("Unsubscribe", "lastTightening", err, data);
    });
}
//--> End SUBSCRIBES

//--> Start REQUESTS
//MID 0064 
//tighteningID = String (10)
function requestOldTighteningResultUpload(tighteningID) {

    let opts = {
        tighteningID
    };

    sc.request("oldTighteningResultUpload", opts, (err, data) => {
        onCallback("Request", "oldTighteningResultUpload", err, data);
    });
}

//MID 0080 
function requestReadTimeUpload() {
    sc.request("readTimeUpload", (err, data) => {
        onCallback("Request", "readTimeUpload", err, data);
    });
}
//--> End REQUESTS

//--> Start Generic Calls
function _subscribe(type, opts) {
    sc.subscribe(type, opts, (err, data) => {
        onCallback("Subscribe", type, err, data);
    });

    setListener(type);
}

function _unsubscribe(type, opts) {
    sc.unsubscribe(type, opts, (err, data) => {
        onCallback("Unsubscribe", type, err, data);
    });
}

function _request(type, opts) {
    sc.request(type, opts, (err, data) => {
        onCallback("Request", type, err, data);
    });
}

function _command(type, opts) {
    sc.command(type, opts, (err, data) => {
        onCallback("Command", type, err, data);
    });
}

function _sendMid(midNumber, opts) {
    sc.sendMid(midNumber, opts, (err, data) => {
        onCallback("SendMid", midNumber, err, data);
    });
}
//--> End Generic Calls


function chamarAperto(){
    commandAbortJob();
    commandSelectParameterSet(1);
    commandVehicleIdNumberDownload("ASDEDCUHBG34563EDFRCVGFR6");
    commandDisableTool();
    commandEnableTool();
}

function sendText(){

    let opts = {
        payload:"01006002003Teste Linha 1            04Teste Linha 2            05Teste Linha 3            06Teste Linha 4            "
    };    
    
    sc.command("displayUserTextOnGraph", opts, (err, data) =>{
        onCallback("Command", "Text", err, data);
    });
}

function subscribeMID900() {

    let opts = {
        payload: {
            midNumber: 900,
            revision: 1,
            dataLength: 35,
            extraData: "00000000000000000000000000000001001"
        }
    };

    sc.sendMid(8, opts, (err, data) => {
        onCallback("Subcribe", "MID 0900", err, data);
    });
}

function subscribeMID901() {

    let opts = {
        payload: {
            midNumber: 901,
            revision: 1,
            dataLength: 0,
            extraData: ""
        }
    };

    sc.sendMid(8, opts, (err, data) => {
        onCallback("Subcribe", "MID 0901", err, data);
    });
}

//--> Start Helpers
function setListener(type) {
    sc.on(type, (data) => {
        //console.log(`[Event][onData][${type}]`, JSON.stringify(data)));
    });
}

function onCallback(type, param, err, data) {
    if (err) {
        console.log(`${type}][${param}][Error]`, err);
        return;
    }
    console.log(`[${type}][${param}][Reply]`, JSON.stringify(data));
}
//--> End Helpers