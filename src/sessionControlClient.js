//@ts-check
/*
  Copyright: (c) 2018-2020, Smart-Tech Controle e Automação
  GNU General Public License v3.0+ (see LICENSE or https://www.gnu.org/licenses/gpl-3.0.txt)
*/

const util = require("util");

const EventEmitter = require("events");
const LinkLayer = require("../src/linkLayer.js");
const helpers = require("./helpers.js");
const midGroupList = require("./midGroups.json");
const midData = require("./midData.json");
const constants = require("./constants.json");
const midRequest = require("./midRequest.json");
const midCommand = require("./midCommand.json");
const midReply = require("./midReply.json");

const mids = helpers.getMids();

var debug = util.debuglog("open-protocol");

const SUBSCRIBE = "subscribe";
const COMMAND = "command";
const REQUEST = "request";
const MANUAL = "manual";
const GENERIC = "generic";

//Status Connect
const CONN_NOT_CONNECT = 0;
const CONN_CONNECTING = 1;
const CONN_CONNECTED = 2;

function promisify(ref, method, mid, opts) {
  return new Promise(function (resolve, reject) {
    return ref[method](mid, opts, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function maybePromisify(ref, method, mid, opts, cb) {
  if (cb === undefined) {
    if (typeof opts === "function") {
      cb = opts;
      opts = {};
    } else {
      return promisify(ref, method, mid, opts);
    }
  }

  return ref[method](mid, opts, cb);
}

class SessionControlClient extends EventEmitter {
  /**
   * @event SessionControlClient#connect
   * @property {Object} data MID 0002 - Reply of the connection
   */

  /**
   * @event SessionControlClient#data
   * @property {Object} data All MID's received of the controller
   */

  /**
   * @event SessionControlClient#dataGroup
   * @property {Object} data data of subscribe
   *
   * @example
   *
   * //Subscribe lastTightening
   * sessionControlClient.subscribe("lastTightening");
   *
   * sessionControlClient.on("lastTightening", (data) => {
   *  console.log("Received MID 0061 / data of subscribed [lastTightening]", data);
   * });
   *
   * //Subscribe vin vehicleIdNumber
   * sessionControlClient.subscribe("vin");
   *
   * sessionControlClient.on("vin", (data) => {
   *  console.log("Received MID 0052 / data of subscribed [vin]", data);
   * });
   *
   */

  /**
   * @event SessionControlClient#error
   * @property {Error} err
   */

  /**
   * @event SessionControlClient#close
   * @property {Error} [err]
   */

  /**
   * @throws {error}
   * @param {*}       opts
   * @param {object}  [opts.defaultRevisions = {}]
   * @param {boolean} [opts.linkLayerActivate] true = activate LinkLayer / false = not activate LinkLayer / undefined = autoNegotiation LinkLayer
   * @param {boolean} [opts.genericMode]  true activate / false or undefined not activate
   * @param {number}  [opts.keepAlive = 10000]
   *
   * @param {stream}  opts.stream
   * @param {boolean} [opts.rawData]
   * @param {object}  [opts.disableMidParsing = {}]
   * @param {number}  [opts.timeOut = 3000]
   * @param {number}  [opts.retryTimes = 3]
   *
   * @example
   * // Instantiate SessionControlClient with default values
   * *
   * const OP = require("open-protocol");
   *
   * // Create a socket
   * const net = require("net");
   * let socket = net.createConnection(port, host);
   *
   * let opts = {
   *  stream: socket
   * }
   *
   * let sessionControlClient = new OP.SessionControlClient(opts);
   *
   * // Add a listener for the connect event
   * sessionControlClient.on("connect", (data) => {
   *  console.log("Connected");
   *  console.log("MID of reply", data);
   * });
   *
   * // Perform protocol connection
   * sessionControlClient.connect();
   *
   * @example
   *
   * // The SessionControlClient can also be instantiated in the library base,
   * // in this case, the library performs the connection and return a SessionControlClient ready.
   *
   * const OP = require("open-protocol");
   *
   * let ipController = "127.0.0.1";
   * let portController = 4545;
   * let optsSessionControl = {};
   *
   * let sessionControlClient = OP.createClient(portController, ipController, optsSessionControl, (data) => {
   *  console.log("Connected");
   *  console.log("MID of reply", data);
   * });
   *
   */
  constructor(opts) {
    debug("new SessionControlClient");

    super();

    opts = opts || {};

    if (opts.stream === undefined) {
      debug("SessionControlClient constructor err_stream_undefined");
      throw new Error("[Session Control Client] stream undefined");
    }

    this.defaultRevisions = opts.defaultRevisions || {};

    //LinkLayer
    //If true activate Link Layer
    //If false not activate Link Layer
    //If undefined autoNegotiation Link Layer
    this.useLinkLayer = opts.linkLayerActivate;

    //Generic Mode
    this.useGenerics = opts.genericMode || false;

    //Keep Alive
    this.keepAlive = opts.keepAlive || 10000;

    this.ll = new LinkLayer({
      stream: opts.stream,
      timeOut: opts.timeOut,
      retryTimes: opts.retryTimes,
      rawData: opts.rawData,
      disableMidParsing: opts.disableMidParsing,
    });

    this.ll.on("error", (err) => this._onErrorLinkLayer(err));

    this.changeRevisionGeneric = false;
    this.autoRevision = {};
    this.midInProcess = undefined;
    this.inOperation = false;
    this.changeRevision = false;
    this.midQueue = [];
    this.statusConnection = CONN_NOT_CONNECT;
    this.controllerData = null;

    this.keepAliveTimer = undefined;
    // this.receiverKeepAliveTimer = undefined;

    this.onClose = false;

    this.stream = opts.stream;

    this.stream.on("error", (err) => {
      debug("SessionControlClient stream_error", err);
      this.emit("error", err);
      this.close(err);
    });

    this.stream.on("close", () => {
      debug("SessionControlClient stream_close");
      this.close(new Error("Stream Close"));
    });
  }

  /**
   * @description Check if the connection with the controller is active.
   * @return {Boolean}
   */
  isConnected() {
    return this.statusConnection === CONN_CONNECTED;
  }

  /**
   * @description Check if the connection uses LinkLayer
   * @return {Boolean}
   */
  isLinkLayerActive() {
    return !!this.useLinkLayer;
  }

  /**
   * @description This method makes a connection with the controller.
   * If add a callback function, it will add as listener of connect @event.
   *
   * @param {function} cb function of callback
   */
  connect(cb) {
    debug("SessionControlClient connect");

    let midSend = {};

    if (this.connected) {
      if (typeof cb === "function") {
        return process.nextTick(cb, this.controllerData);
      } else {
        return new Promise(function (resolve) {
          resolve(this.controllerData);
        });
      }
    }

    let revision = 0;

    let sendMidOne = () => {
      debug("SessionControlClient sendMidOne");

      if (this.defaultRevisions["1"] === undefined) {
        if (this.autoRevision["1"] === undefined) {
          revision = mids[2].revision()[0];

          this.autoRevision["1"] = {
            value: revision,
            position: 0,
          };
        } else {
          revision = this.autoRevision["1"].value;
        }
      } else {
        revision = this.defaultRevisions["1"];
      }

      this.statusConnection = CONN_CONNECTING;

      midSend = {
        mid: 1,
        revision: revision,
      };

      this.ll.write(midSend);
    };

    let receivedReply = (data) => {
      debug("SessionControlClient receivedReply", data);

      this.ll.finishCycle();

      this.emit("data", data);

      if (data.mid === 4) {
        if (data.payload.midNumber !== 1) {
          let e = new Error(
            `[Session Control Client] [Connect] invalid acknowledge, expect MID[1], received MID[${data.payload.midNumber}]`
          );
          debug("SessionControlClient connect err_invalid_acknowledge", data);
          this.emit("error", e);
          return;
        }

        if (
          data.payload.errorCode === 97 &&
          this.defaultRevisions["1"] === undefined
        ) {
          let newPosition = this.autoRevision["1"].position + 1;
          this.autoRevision["1"].value = mids[2].revision()[newPosition];
          this.autoRevision["1"].position = newPosition;
          sendMidOne();
        } else {
          let errorCode = helpers.padLeft(data.payload.errorCode, 2);
          let e = new Error(
            `[Session Control Client] [Connect] negative acknowledge, MID[${data.payload.midNumber}], Error [${constants.ERROR[errorCode]}]`
          );
          debug(
            "SessionControlClient connect err_negative_acknowledge",
            data.payload.errorCode,
            this.defaultRevisions["1"]
          );
          this.emit("error", e);
        }

        return;
      }

      if (data.mid === 2) {
        /*

                Disabling revisions check because our simulator always respond Revision == "00 "

                if (data.revision !== midSend.revision) {
                    if (this.defaultRevisions["1"] !== undefined) {
                        this.emit("error", new Error(`[Session Control Client] [Connect] invalid revision MID[1], Revision [${midSend.revision}]`));
                        return;
                    }

                    let newPosition = this.autoRevision["1"].position + 1;
                    this.autoRevision["1"].value = mids[2].revision()[newPosition];
                    this.autoRevision["1"].position = newPosition;

                    sendMidOne();

                    return;
                }
                */

        this.ll.removeAllListeners();

        this.statusConnection = CONN_CONNECTED;
        this.controllerData = data;

        this.ll.on("data", (data) => this._onDataLinkLayer(data));
        this.ll.on("error", (err) => this._onErrorLinkLayer(err));
        this.ll.on("errorSerializer", (err) => this._onErrorSerializer(err));
        this.ll.on("errorParser", (err) => this._onErrorParser(err));

        process.nextTick(() => {
          this.emit("connect", data);
        });

        if (this.useLinkLayer === undefined) {
          if (data.payload.sequenceNumberSupport === 1) {
            this.ll.activateLinkLayer();
            this.useLinkLayer = true;
          } else {
            this.ll.deactivateLinkLayer();
            this.useLinkLayer = false;
          }
        } else if (this.useLinkLayer) {
          if (
            data.payload.sequenceNumberSupport !== 1 ||
            data.payload.linkingHandlingSupport !== 1
          ) {
            this.emit(
              "error",
              new Error(
                "[Session Control Client] [Force Link Layer] controller does not support link layer"
              )
            );
            debug(
              "SessionControlClient connect err_controller_not_support_link_layer",
              this.useLinkLayer,
              data.payload.sequenceNumberSupport,
              data.payload.linkingHandlingSupport
            );
            return;
          }
          this.ll.activateLinkLayer();
        } else {
          this.ll.deactivateLinkLayer();
        }

        clearTimeout(this.keepAliveTimer);
        this.keepAliveTimer = setTimeout(
          () => this._sendKeepAlive(),
          this.keepAlive
        );

        this.onClose = false;
        this.inOperation = false;

        this._sendingProcess();
      }
    };

    sendMidOne();

    this.ll.on("data", (data) => receivedReply(data));

    if (typeof cb === "function") {
      return this.once("connect", cb);
    } else {
      return new Promise((resolve, reject) => {
        this.once("connect", (data) => {
          resolve(data);
        });
        this.once("error", (err) => {
          reject(err);
        });
      });
    }
  }

  /**
   * @description This method destroys the connection and cleans all states of SessionControlClient.
   * @param {Error} [err]
   */
  close(err) {
    debug("SessionControlClient close", err);

    if (this.onClose) {
      return;
    }

    clearTimeout(this.keepAliveTimer);

    this.onClose = true;
    this.statusConnection = CONN_NOT_CONNECT;

    if (this.midQueue && this.midQueue.length > 0) {
      let e = new Error("service unavailable");
      this.midQueue.forEach((item) => {
        process.nextTick(() => item.doCallback(e));
      });
    }

    this.midInProcess = null;
    this.midQueue = [];

    this.autoRevision = {};

    // handles Node versions older than 8.x
    if (typeof this.ll.destroy === "function") {
      this.ll.destroy();
    } else {
      this.ll._destroy();
    }
    this.stream.end();

    this.emit("close", err);
  }

  /**
   * @description This method makes generic call, here it is possible to send a not implemented MID.
   * If add only [midNumber] the message will have default a body and revision = 1, for additional body settings,
   * add the [opts] object. The [cb] function is called in case of an error, sending the error as parameter. The incoming
   * data from these calls will be then emitted as events, that can be listened by using the `on` method.
   *
   * @example
   *  // Example of a call, adding only [midNumber].
   *  // In this case the client does not receives a feedback and the sent message go with midNumber and default body.
   *
   * sessionControlClient.sendMid(1);
   *
   * //result
   * {
   *  mid: 1,
   *  revision: 1,
   *  payload: ""
   * }
   *
   * @example
   *
   *  // Example of a call, adding [midNumber] and body values with [opts].
   *  // In this case the client does not receives a feedback and the sent message will have midNumber, body values of opts and
   *  // others fields with default values.
   *
   * let opts = {
   *   revision: 4,
   *   payload: "Test"
   * }
   *
   * sessionControlClient.sendMid(1, opts);
   *
   * //result
   * {
   *  mid: 1,
   *  revision: 4,
   *  payload: "Test"
   * }
   *
   * @example
   *
   * // Example of a complete call, adding [midNumber], body values with [opts] and a callback function.
   * // In this case the client, receives a feedback with status of the call and the is sent message will have midNumber, body
   * // values of opts and others fields with default values.
   *
   * let opts = {
   *   revision: 4,
   *   payload: "Test"
   * }
   *
   * sessionControlClient.on("data", (data) => {
   *    console.log("Data received", data);
   * });
   *
   * sessionControlClient.sendMid(1, opts, (err) => {
   *
   *  if (err) {
   *      console.log("an error has occurred", err);
   *      return;
   *  }
   *
   * });
   *
   * //result
   * {
   *  mid: 1,
   *  revision: 4,
   *  payload: "Test"
   * }
   *
   * @param {Number} midNumber
   * @param {Object} [opts]
   * @param {Function} [cb]
   */
  sendMid(midNumber, opts, cb) {
    return maybePromisify(this, "_sendMid", midNumber, opts, cb);
  }

  /**
   * @private
   * @param {*} midNumber
   * @param {*} opts
   * @param {*} cb
   */
  _sendMid(midNumber, opts, cb) {
    debug("SessionControlClient _sendMid", midNumber, opts);

    let mid = opts || {};
    mid.payload = mid.payload || "";

    mid.mid = midNumber;

    this.midQueue.push(new Message(mid, cb, MANUAL));
    this._sendingProcess();
  }

  /**
   * @description This method makes a request call, it uses [midGroup] as key for call.
   * If adding only [midGroup] the message will have a default body, for additional body settings,
   * add the [opts] object. The [cb] function is called in cases of an error, sending the error as
   * parameter and in success cases sending the MID of the reply.
   *
   * @param {String} midGroup
   * @param {Object} [opts]
   * @param {Function} [cb]
   */
  request(midGroup, opts, cb) {
    return maybePromisify(this, "_request", midGroup, opts, cb);
  }

  /**
   * @private
   * @param {*} midGroup
   * @param {*} opts
   * @param {*} cb
   */
  _request(midGroup, opts, cb) {
    debug("SessionControlClient _request", midGroup, opts);

    if (midRequest[midGroup] === undefined) {
      let err = new Error(
        `[Session Control Client] [Request] invalid midGroup [${midGroup}]`
      );
      debug("SessionControlClient _request err_invalid_midGroup");
      cb(err);
      return;
    }

    let mid = opts || {};

    let type = REQUEST;

    if (this.useGenerics && midRequest[midGroup].generic) {
      mid.mid = 6;
      type = GENERIC;

      let midNumber = midRequest[midGroup].request;
      let revision =
        mid.revision || this._calcRevision(midNumber, REQUEST, midGroup, true);
      let dataLength = mid.dataLength || 0;
      let extraData = mid.extraData || "";

      mid.payload = {
        midNumber,
        revision,
        dataLength,
        extraData,
      };
    } else {
      mid.payload = mid.payload || "";
      mid.mid = midRequest[midGroup].request;
    }

    this.midQueue.push(new Message(mid, cb, type, midGroup));

    this._sendingProcess();
  }

  /**
   * @description This method makes a command call, it uses [midGroup] as key for call.
   * If adding only [midGroup] the message will have a default body, for additional body settings,
   * add the [opts] object. The [cb] function is called in case of an error, sending the error as
   * parameter and in success cases sending the MID of reply.
   *
   * @param {String} midGroup
   * @param {Object} [opts]
   * @param {Function} [cb]
   */
  command(midGroup, opts, cb) {
    return maybePromisify(this, "_command", midGroup, opts, cb);
  }

  /**
   * @private
   * @param {*} midGroup
   * @param {*} opts
   * @param {*} cb
   */
  _command(midGroup, opts, cb) {
    debug("SessionControlClient _command", midGroup, opts);

    if (midCommand[midGroup] === undefined) {
      let err = new Error(
        `[Session Control Client] [Command] invalid midGroup [${midGroup}]`
      );
      debug("SessionControlClient _command err_invalid_midGroup");
      cb(err);
      return;
    }

    let mid = opts || {};

    let type = COMMAND;

    mid.payload = mid.payload || "";
    mid.mid = midCommand[midGroup].request;

    this.midQueue.push(new Message(mid, cb, type, midGroup));
    this._sendingProcess();
  }

  /**
   * @description This method makes a subscribe call, it uses [midGroup] as key for call.
   * If adding only [midGroup] the message will have a default body, for additional body settings,
   * add the [opts] object. The [cb] function is called in case of an error, sending the error as
   * parameter and in success cases sending the MID of the reply.
   * Data MIDs will be passed by the event named [midGroup].
   *
   * @see {@link /docs/MIDsGroups.md} The keys for use as [midGroup].
   *
   * @example
   * //Subscribe lastTightening
   * sessionControlClient.subscribe("lastTightening");
   *
   * //Listening lastTightening
   * sessionControlClient.on("lastTightening", (data) => {
   *  console.log("Receive MID 0061 / Data of subscribe lastTightening", data);
   * });
   *
   * @fires SessionControlClient#dataGroup
   *
   * @param {String} midGroup
   * @param {Object} [opts]
   * @param {Function} [cb]
   */
  subscribe(midGroup, opts, cb) {
    return maybePromisify(this, "_subscribe", midGroup, opts, cb);
  }

  /**
   * @private
   * @param {*} midGroup
   * @param {*} opts
   * @param {*} cb
   */
  _subscribe(midGroup, opts, cb) {
    debug("SessionControlClient _subscribe", midGroup, opts);

    if (midGroupList[midGroup] === undefined) {
      let err = new Error(
        `[Session Control Client] [Subscribe] invalid midGroup [${midGroup}]`
      );
      debug("SessionControlClient _subscribe err_invalid_midGroup");
      cb(err);
      return;
    }

    let mid = opts || {};

    let type = SUBSCRIBE;

    if (this.useGenerics && midGroupList[midGroup].generic) {
      mid.mid = 8;
      type = GENERIC;

      let midNumber = mid.midNumber || midGroupList[midGroup].subscribe;
      let revision =
        mid.revision ||
        this._calcRevision(midNumber, SUBSCRIBE, midGroup, true);
      let dataLength = mid.dataLength || 0;
      let extraData = mid.extraData || "";

      mid.payload = {
        midNumber,
        revision,
        dataLength,
        extraData,
      };
    } else {
      mid.payload = mid.payload || "";
      mid.mid = midGroupList[midGroup].subscribe;
    }

    this.midQueue.push(new Message(mid, cb, type, midGroup));
    this._sendingProcess();
  }

  /**
   * @description This method makes an unsubscribe call, it uses [midGroup] as key for call.
   * If adding only [midGroup] the message will have a default body, for additional body settings,
   * add the [opts] object. The [cb] function is called in case of the error, sending the error as
   * parameter and in success cases sending the MID of reply.
   *
   * @param {String} midGroup
   * @param {Object} [opts]
   * @param {Function} [cb]
   */
  unsubscribe(midGroup, opts, cb) {
    return maybePromisify(this, "_unsubscribe", midGroup, opts, cb);
  }

  /**
   * @private
   * @param {*} midGroup
   * @param {*} opts
   * @param {*} cb
   */
  _unsubscribe(midGroup, opts, cb) {
    debug("SessionControlClient _unsubscribe", midGroup, opts);

    if (midGroupList[midGroup] === undefined) {
      let err = new Error(
        `[Session Control Client] [Unsubscribe] invalid groupMid [${midGroup}]`
      );
      debug("SessionControlClient _unsubscribe err_invalid_midGroup");
      cb(err);
      return;
    }

    if (cb === undefined) {
      if (typeof opts === "function") {
        cb = opts;
        opts = {};
      } else {
        cb = () => {};
      }
    }

    let mid = opts || {};

    let type = SUBSCRIBE;

    if (this.useGenerics && midGroupList[midGroup].generic) {
      mid.mid = 9;
      type = GENERIC;

      let midNumber = mid.midNumber || midGroupList[midGroup].unsubscribe;
      let revision =
        mid.revision ||
        this._calcRevision(midNumber, SUBSCRIBE, midGroup, true);
      let dataLength = mid.dataLength || 0;
      let extraData = mid.extraData || "";

      mid.payload = {
        midNumber,
        revision,
        dataLength,
        extraData,
      };
    } else {
      mid.payload = mid.payload || "";
      mid.mid = midGroupList[midGroup].unsubscribe;
    }

    this.midQueue.push(new Message(mid, cb, type, midGroup));
    this._sendingProcess();
  }

  /**
   * @private
   */
  _sendingProcess() {
    debug("SessionControlClient _sendingProcess");

    if (this.onClose) {
      if (this.midQueue.length > 0) {
        let e = new Error("unavailable service");

        this.midQueue.forEach((item) => {
          process.nextTick(() => item.doCallback(e));
        });
      }
      return;
    }

    if (this.inOperation || this.statusConnection !== CONN_CONNECTED) {
      return;
    }

    if (this.midQueue.length > 0) {
      this.inOperation = true;
      this.midInProcess = this.midQueue.shift();
      this._transmitMid();
    }
  }

  /**
   * @private
   */
  _transmitMid() {
    debug("SessionControlClient _transmitMid", this.midInProcess);

    if (!this.changeRevision) {
      this.midInProcess.midRevision = this._calcRevision();
    } else {
      if (!this.changeRevisionGeneric) {
        this.midInProcess.midRevision = this._calcRevision();
      } else {
        this.midInProcess.genericRevision = this._calcRevision();
      }
    }

    if (this.midInProcess.midRevision === 0) {
      this.inOperation = false;
      this._sendingProcess();
      return;
    }

    clearTimeout(this.keepAliveTimer);

    this.keepAliveTimer = setTimeout(
      () => this._sendKeepAlive(),
      this.keepAlive
    );

    this.ll.write(this.midInProcess.mid);
  }

  /**
   * @private
   * @param {*} mid
   * @param {*} type
   * @param {*} group
   * @param {*} local
   */
  _calcRevision(mid, type, group, local) {
    debug("SessionControlClient _calcRevision", mid, type, group, local);

    let revision = 0;
    let midReference;

    if (this.midInProcess !== undefined) {
      mid = mid || this.midInProcess.midNumber;
      type = type || this.midInProcess.type;
      group = group || this.midInProcess.group;
    }

    if (this.changeRevision) {
      if (!this.changeRevisionGeneric) {
        if (
          this.midInProcess.baseMidRevision !== undefined ||
          this.defaultRevisions[mid] !== undefined ||
          this.autoRevision[mid].reference === 0
        ) {
          let e = new Error(
            `[Session Control Client] invalid revision, MID[${mid}], Revision [${this.autoRevision[mid].value}]`
          );
          debug(
            "SessionControlClient _calcRevision err_invalid_revision",
            this.midInProcess.baseMidRevision,
            this.defaultRevisions[mid],
            this.autoRevision[mid].reference
          );
          this.midInProcess.doCallback(e, null);
          return 0;
        }
      } else {
        mid = this.midInProcess.baseGenericMid;

        if (!this.autoRevision[mid] || this.autoRevision[mid].reference === 0) {
          let e = new Error(
            `[Session Control Client] invalid generic revision, MID[${mid}], Revision [${this.autoRevision[mid].value}]`
          );
          debug(
            "SessionControlClient _calcRevision err_generic_revision",
            mid,
            this.autoRevision[mid]
          );
          this.midInProcess.doCallback(e, null);
          return 0;
        }
      }

      if (type === SUBSCRIBE) {
        midReference = this.autoRevision[mid].reference;
      }

      if (type === REQUEST) {
        midReference = this.autoRevision[mid].reference;
      }

      let position = this.autoRevision[mid].position + 1;
      revision = mids[midReference].revision()[position];

      this.autoRevision[mid] = {
        value: revision,
        position: position,
        reference: midReference,
      };

      this.changeRevision = false;
      this.changeRevisionGeneric = false;

      return revision || 0;
    }

    if (local === true || this.midInProcess.baseMidRevision === undefined) {
      if (this.defaultRevisions[mid] === undefined) {
        if (this.autoRevision[mid] === undefined) {
          if (type === SUBSCRIBE) {
            midReference = midGroupList[group].data;
          }

          if (type === REQUEST) {
            midReference = midRequest[group].reply;
          }

          if (mids[midReference] === undefined) {
            revision = 1;
            midReference = 0;
          } else {
            revision = mids[midReference].revision()[0];
          }

          this.autoRevision[mid] = {
            value: revision,
            position: 0,
            reference: midReference,
          };
        } else {
          revision = this.autoRevision[mid].value;
        }
      } else {
        revision = this.defaultRevisions[mid];
      }
    } else {
      revision = this.midInProcess.midRevision;
    }

    return revision || 0;
  }

  /**
   * @private
   */
  _sendKeepAlive() {
    debug("SessionControlClient _sendKeepAlive");

    if (this.onClose) {
      clearTimeout(this.keepAliveTimer);
      return;
    }

    clearTimeout(this.keepAliveTimer);
    this.keepAliveTimer = setTimeout(
      () => this._sendKeepAlive(),
      this.keepAlive
    );

    this.request("keepAlive", (err) => {
      if (err) {
        debug("SessionControlClient _sendKeepAlive response-error", err);
        clearTimeout(this.keepAliveTimer);
        this.close();
      }
    });
  }

  /**
   * @private
   * @param {*} data
   */
  _onDataLinkLayer(data) {
    debug("SessionControlClient _onDataLinkLayer");
    // Call callback of Link Layer
    this.ll.finishCycle();

    // Send data to treatment
    this._receiverData(data);
  }

  _receiverData(data) {
    debug("SessionControlClient _receiverData", data);

    this.emit("data", data);

    if (!this.midInProcess) {
      return;
    }

    if (data.mid === 5) {
      //Positive acknowledge
      this.midInProcess.doCallback(null, data);
      this.inOperation = false;
      this._sendingProcess();
      return;
    }

    if (data.mid === 4) {
      // Reference MID
      let midNumber = data.payload.midNumber;

      // Verify that the mid referenced in the response is equal to the mid sent.
      if (midNumber !== this.midInProcess.midNumber) {
        let err = new Error(
          `[Session Control Client] invalid acknowledge, expect MID[${this.midInProcess.midNumber}], received MID[${midNumber}]`
        );
        debug(
          "SessionControlClient _receiverData err-invalid_acknowledge",
          midNumber,
          this.midInProcess.midNumber
        );
        this.midInProcess.doCallback(err);
        this.inOperation = false;
        this._sendingProcess();
        return;
      }

      if (
        (midNumber === 6 || midNumber === 8 || midNumber === 9) &&
        this.useGenerics
      ) {
        let errorCode = data.payload.errorCode;

        //Error 74: Subscribed MID Revision unsupported
        //Error 76: Requested MID Revision unsupported
        if (errorCode === 74 || errorCode === 76) {
          this.changeRevision = true;
          this.changeRevisionGeneric = true;
          this._transmitMid();
          return;
        }
      }

      //Error 97: MID revision unsupported
      if (data.mid === 4 && data.payload.errorCode === 97) {
        this.changeRevision = true;
        this._transmitMid();
        return;
      }

      let errorCode = helpers.padLeft(data.payload.errorCode, 2);
      let err = new Error(
        `[Session Control Client] negative acknowledge, MID[${midNumber}], Error[${constants.ERROR[errorCode]}]`
      );
      debug(
        "SessionControlClient _receiverData err_negative_acknowledge",
        midNumber,
        errorCode
      );
      this.midInProcess.doCallback(err);
      this.inOperation = false;
      this._sendingProcess();
      return;
    }

    if (this.midInProcess.type === MANUAL) {
      this.midInProcess.doCallback(null, data);
      return;
    }

    let receivedMid = data.mid.toString();
    let dataGroup = midData[receivedMid];
    let replyGroup = midReply[receivedMid];

    if (dataGroup !== undefined) {
      this.emit(dataGroup, data);

      let obj = {
        key: dataGroup,
        data,
      };

      this.emit("__SubscribeData__", obj);

      if (!this.useLinkLayer) {
        this.ll.write({
          mid: midGroupList[dataGroup].ack,
          isAck: true,
        });
        return;
      }
    }

    if (replyGroup !== undefined) {
      if (replyGroup === this.midInProcess.group) {
        this.midInProcess.doCallback(null, data);
      } else {
        let err = new Error(
          `[Session Control Client] invalid reply, expect MID[${this.midInProcess.group}], received [${replyGroup}]`
        );
        debug(
          "SessionControlClient _receiverData err_invalid_reply",
          replyGroup,
          this.midInProcess.group
        );
        this.midInProcess.doCallback(err);
      }

      this.inOperation = false;
      this._sendingProcess();
      return;
    }
  }

  /**
   * @private
   * @param {*} err
   */
  _onErrorLinkLayer(err) {
    debug("SessionControlClient _onErrorLinkLayer", err);
    this.close(err);
  }

  /**
   * @private
   * @param {*} err
   */
  _onErrorSerializer(err) {
    debug("SessionControlClient _onErrorSerializer", err);

    if (this.midInProcess) {
      this.midInProcess.doCallback(err);
    }

    this._sendKeepAlive();
    this.inOperation = false;
    this._sendingProcess();
  }
}

class Message {
  constructor(mid, callback, type, group) {
    debug("SessionControlClient new Message");

    this._mid = mid;
    this._callback = callback;
    this._type = type;
    this._group = group;
    this._baseMid = Object.assign({}, this._mid);
  }

  get mid() {
    return this._mid;
  }

  get type() {
    return this._type;
  }

  get group() {
    return this._group;
  }

  get midNumber() {
    return this._mid.mid;
  }

  get midRevision() {
    return this._mid.revision;
  }

  get baseMidRevision() {
    return this._baseMid.revision;
  }

  set midRevision(revision) {
    this._mid.revision = revision;
  }

  doCallback(err, data) {
    if (this._callback !== undefined) {
      this._callback(err, data);
      this._callback = undefined;
    }
  }
}

module.exports = SessionControlClient;
