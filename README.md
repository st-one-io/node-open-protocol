# Node Open Protocol

A library to interface with Power Tools using the Atlas Copco Open Protocol
 
This node was created by [Smart-Tech](https://netsmarttech.com) as part of the [ST-One](https://netsmarttech.com/page/st-one) project.

Documentation: [Open Protocol R 2.8.0](docs/OpenProtocolSpecification_R280.pdf)

## What is Open Protocol?

Open Protocol is an interface for building applications for remote control or data subscription of industrial tightening 
controllers. It's an open specification led by Atlas Copco Industrial Technique AB, though it is implemented by most of 
the other tightening controller manufacturers.

## What is this node?

This node is a [Node.js](https://nodejs.org/) library that implements the Atlas Copco's Open Protocol, being possible 
establish communication with tightening controllers. This library has several and the most 
common [MIDs](docs/ImplementedMIDs.md) implemented.

## Features

- **Full protocol support**: This library features not only simple MID parsing and serializing, but also establishing and 
managing the whole lifecycle of an Open Protocol connection. The library user needs only to configure the IP Address and 
port number and to call the needed functions. All the logic necessary to securely perform the communication, including 
message queuing, acknowledgement and validation, is performed by the library internally.

- **Structured implementation**: The library is implemented as different layers, making protocol logic separation clear 
and easy. Implementing support for a new MID is as easy as dropping a new file with the respective parser and serializer 
functions.

- **Support for out-of-spec MIDs**: Controllers may have an implementation that can be sligtly out-of-spec, and they 
would be therefore incompatible with this library. We aim to support these edge cases by disabling the parsing of the 
payload of selected MIDs, and they're delivered then as the original string as sent by the controller, so that the user 
can parse it. When sending a message, there's a specific function so the user can directly input the payload as it will 
be sent to the controller.

- **Support for multi-part messages**: In some cases, when a telegram is bigger than the maximum allowed telegram length, 
there's a mechanism so the tightening controller can split the payload into multiple messages. This library supports such 
messages, and all the parts are reassebled into a single payload so it can be correctly parsed.

- **LinkLayer support with auto-negotiation**: This library supports _Link Layer Acknowledgement_ (as per chapter 3.2.2) 
by implementing and exchanging MIDs 9997 and 9998. This is auto-negotiated on connection startup, but can be either 
enforced or fully disabled.

- **Generic MID request/subscription**: The use of _Generic Application data request_ (MID 0006) and _Generic Application 
data (un)subscription_ (MID 0008 and 0009) are supported by this library, as per chapter 3.9.3 and 3.9.4.
_Please consider the support of Generic MIDs experimental_ 
<!--This feature is also auto-negotiated on connection startup and can be enforced or disabled.--> 

## How use this node?

### Install

`npm install node-open-protocol`

### Instance and connection

The variable `options` is optional, in the example below it will be created with default values.

```javascript
const openProtocol = require('node-open-protocol');

let options = {

    // Weather to use LinkLayer Acknowledgement
    //true: enforce activation
    //false: enforce deactivation
    //undefined: auto negotiate
    linkLayerActivate: undefined,

    // Weather to user Generic MID request/subscription
    //true: use generics
    //false or undefined: don't use generics
    genericMode: undefined,

    // How oft we send keep-alive messages (MID 9999), in milliseconds
    keepAlive: 10000,

    // Weather the library will append a parameter "_raw" with the Buffer as received from the controller
    rawData: false,

    // How long we'll wait for an acknowledge of the controller to a message that we send, in milliseconds
    timeOut: 3000,

    // How many times we'll retry to send a message if we don't receive an answer
    retryTimes: 3,

    // A list of MIDs for which we'll not parse the payload
    disableMidParsing: {}
}

let controllerIp = "127.0.0.1";
let controllerPort = 4545;

let op = openProtocol.createClient(controllerIp, controllerPort, options, (data) => {
    console.log("Connected");
    console.log("MID 0002", data);
});
```

or then simply:

```javascript
const openProtocol = require('node-open-protocol');

let controllerIp = "127.0.0.1";
let controllerPort = "4545";

let op = openProtocol.createClient(controllerPort, controllerIp, (data) => {
    // data is the content of MID 0002
    console.log("Connected");
    console.log("MID 0002", data);
});
```

### Methods

All calls follow a standard structure:

```javascript
op.__OPERATION__(midGroup, opts, callback);
```
where:

 - `__OPERATION__` is either `subscribe`, `unsubscribe`, `request`, or `command`, depending on the category of the 
 intended MID.
 
 - `midGroup` is the "name" of the MID being called, as per this list [docs/MIDsGroups.md](docs/MIDsGroups.md).
 
 - `opts` may be optional. If it's sent, it will be assigned to the body of the MID. Otherwhise, it will use the 
 standard MID structure.
 
 - `callback` is also optionaland if not given, the method will return a `Promise` instead. They may contain any reply 
 data and eventual errors.

```javascript
//To MIDs not implemented
let opts = {
    revision: 1,
    payload: "mid body" //String or buffer
}

//To MIDs implemented with additional parameters
//Example MID 0018 - selectPset
let opts = {
    payload: {
        parameterSetID: 2
    }
}
```

#### Subscribe

The `subscribe` method is used to subscribe to controller events. The incoming data from these events will be then emitted 
as events, that can be listened to by using the `on` method.

[List of subscribe `midGroup`s](docs/MIDsGroups.md#subscribe-and-unsubcribe)

```javascript
op.subscribe(midGroup, opts, callback);
```

```javascript
op.on("lastTightening", (midData) => {  // will get the events
    console.log("Received data on subscribe", midData);
});

op.subscribe("lastTightening", (err, data) => {
    if (err) {
        console.log("Error on subscribing to 'lastTightening'", err);
        return;
    }

    console.log("Subscribed to 'lastTightening'");
});
```

#### Unsubscribe

The `unsubscribe` method is used to unsubscribe to controller events. The same events from `subscribe` are supported

[List of unsubscribe `midGroup`s](docs/MIDsGroups.md#subscribe-and-unsubcribe)

```javascript
op.unsubscribe(midGroup, opts, callback);
```

```javascript
op.unsubscribe("lastTightening", (err, data) => {
    if (err) {
        console.log("Error on unsubscribing to 'lastTightening'", err);
        return;
    }

    console.log("Unsubscribed to 'lastTightening'");
});
```

#### Request

The `request` method is used to request informations from the controller. `request` MIDs normally have a conterpart MID 
for the reply containing the requested data, that can here be received in the callback or the Promise.

- [List of request `midGroup`s](docs/MIDsGroups.md#request)

```javascript
op.request(midGroup, opts, callback);
```

```javascript
op.request("readTimeUpload", (err, data) => {
    if (err) {
        console.log("Error getting current time of the controller", err);
        return;
    }

    console.log("Controller clock is", data.payload);
});
```

#### Command

The `command` method is used to perform various actions on the controller.

- [List of command `midGroup`s](docs/MIDsGroups.md#command)

```javascript
op.command(midGroup, opts, callback);
```

- [`midGroup`](docs/MIDsGroups.md#command)

```javascript
op.command("disableTool", (err, data) => {
    if (err) {
        console.log("Error disabling the tool", err);
        return;
    }

    console.log("Tool disabled successfully");
});
```

#### SendMid
Method responsible for making a generic call, here it is possible to send a not implemented MID. If only `midNumber` 
is passed, the sent message will only contain default values and `revision = 1`, if you need to pass revision or others 
parameters use the `opts` parameter. The `callback` function is the function called in cases of error, passing the error 
as a parameter. The incoming data from these calls will be then emitted as events, that can be listened to by using 
the `on` method.

```javascript
op.sendMid(midNumber, opts, callback);
```

```javascript
op.on("data", (data) => {
    console.log("Data received", data);        
});

op.sendMid(1, (err) => {

    if (err) {
        console.log("Error", err);
        return;
    }

});
```

### Example

This example shows how to perform a subscribe in `lastTightening` and make a tightening call.

```javascript
const openProtocol = require('node-open-protocol');

let op = openProtocol.createClient(4545, "127.0.0.1", () => {
    console.log("Connected!");

    op.subscribe("lastTightening", (err, data) => {
        if (err) {
            return console.log("Error on Subscribe", err);
        }

        startTightening(1, "ASDEDCUHBG34563EDFRCVGFR6");
    });
});

op.on("error", (error) => {
    console.log("Error on OpenProtocol", error);
});

op.on("lastTightening", (midData) => {
    console.log("Tightening received!", JSON.stringify(midData));
});

function startTightening(parameterSetID, numberVIN) {
    // --> Abort Job --> Select Pset --> Set VehicleId --> Disable Tool --> Enable Tool

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

                        console.log("waiting for the operator to tighten");
                    });
                });
            });
        });
    });
}
```

Or then with async/await functions:

```javascript
const openProtocol = require('node-open-protocol');

async function onClientConnected() {
    console.log("Connected!");

    // subscribe to tightening results
    await op.subscribe("lastTightening");
    op.on("lastTightening", result => {
        console.log("Hooray! Result received!", result);
    });

    // start tigtening process
    // --> Abort Job --> Select Pset --> Set VehicleId --> Disable Tool --> Enable Tool
    let pset = 1;
    let vin = "ASDEDCUHBG34563EDFRCVGFR6";
    await op.command("abortJob");
    await op.command("selectPset", { payload: { parameterSetID: pset } });
    await op.command("vinDownload", { payload: { numberVIN: vin } });
    await op.command("disableTool");
    await op.command("enableTool");

    console.log(`Tightening started on VIN [${vin}] with pset [${pset}]`);
}

let op = openProtocol.createClient(4545, "127.0.0.1", data => {
    onClientConnected().catch(err => {
        console.log("¡Ay caramba!", err.toString());
    });
});
```

## Controllers supported
The marked controllers have been tested to some degree, so we can assure basic communication support.

- [x] Atlas Copco PowerFocus4000
- [x] Atlas Copco PowerFocus6000
- [x] Atlas Copco PowerMacs
- [x] Stanley Alpha 4

Please contact us by sending an e-mail to netsmarttech@netsmarttech.com if you'd like to have your controller tested and 
validated by us and to appear on this list.

## Disclaimer

<!-- TODO responsibility -->

- This software is not affiliated with Atlas Copco in any way. PowerFocus4000, PowerFocus6000, and PowerMacs are 
trademarks of Atlas Copco AB.

- This software is not affiliated with Stanley in any way. Alpha 4 are trademarks of Stanley Black & Decker, Inc.

## Contributing

For contributing see instructions in [CONTRIBUTING.md](CONTRIBUTING.md)

## License
Copyright: (c) 2018-2020, Smart-Tech

GNU General Public License v3.0+ (see [LICENSE](LICENSE) or https://www.gnu.org/licenses/gpl-3.0.txt)