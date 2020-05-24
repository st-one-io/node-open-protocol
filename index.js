//@ts-check
/*
  Copyright: (c) 2018-2020, Smart-Tech Controle e Automação
  GNU General Public License v3.0+ (see LICENSE or https://www.gnu.org/licenses/gpl-3.0.txt)
*/

const OpenProtocolParser = require("./src/openProtocolParser.js");
const OpenProtocalSerializer = require("./src/openProtocolSerializer.js");
const MIDParser = require("./src/MIDParser.js");
const MIDSerializer = require("./src/MIDSerializer.js");
const helpers = require("./src/helpers.js");
const SessionControlClient = require("./src/sessionControlClient.js");

const midGroups = require("./src/midGroups.json");
const midCommand = require("./src/midCommand.json");
const midrequest = require("./src/midRequest.json");

const net = require("net");

function createClient(port, host, opts, connectionListener) {

    if (connectionListener === undefined) {
        if (typeof opts === "function") {
            connectionListener = opts;
            opts = {};
        } else {
            connectionListener = () => {
            };
        }
    }

    opts = opts || {};

    let socket = net.createConnection(port, host, () => {
        socket.setTimeout(0);
        client.connect(connectionListener);
    });

    socket.setTimeout(20000);

    socket.once("timeout", () => onTimeout());

    function onTimeout() {
        let e = new Error("Socket Timeout");
        e.code = "SOCKET_TIMEOUT";
        e.address = host;
        e.port = port;
        client.emit("error", e);
    }

    opts.stream = socket;

    let client = new SessionControlClient(opts);

    return client;
}

module.exports = {
    constants: {
        subscribes: midGroups,
        commands: midCommand,
        requests: midrequest
    },
    OpenProtocolParser,
    OpenProtocalSerializer,
    SessionControlClient,
    MIDParser,
    MIDSerializer,
    helpers,
    createClient
};