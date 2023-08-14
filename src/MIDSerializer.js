//@ts-check
/*
  Copyright: (c) 2018-2020, Smart-Tech Controle e Automação
  GNU General Public License v3.0+ (see LICENSE or https://www.gnu.org/licenses/gpl-3.0.txt)
*/

const util = require('util');
const { Transform } = require('stream');

const helpers = require("./helpers.js");
const mids = helpers.getMids();

var debug = util.debuglog('open-protocol');

class MIDSerializer extends Transform {

    /**
     * @class MIDSerializer
     * @description This class performs the serialization of a MID body.
     * This transforms MID.payload (object) in MID.payload (Buffer).
     * This class uses the implemented MIDs in 'node-open-protocol/src/mid' for serializing MIDs.
     * In case of not a implemented MID, MID.payload (String | Buffer) is converted in a Buffer.
     * @param opts parameters to Transform stream
     */
    constructor(opts) {
        debug("new MIDSerializer");

        opts = opts || {};
        opts.writableObjectMode = true;
        opts.readableObjectMode = true;
        super(opts);
    }

    _transform(chunk, encoding, cb) {
        debug("MIDSerializer _transform", chunk);

        if(mids[chunk.mid]){

            mids[chunk.mid].serializer(chunk, null, (err, data) => {

                if(err){
                    cb(new Error(`Error on serializer [${err}]`));
                    debug('MIDSerializer _transform err-serializer', chunk, err);
                    return;
                }

                this.push(data);
                cb();
            });

        }else{

            if(chunk.payload === undefined){
                chunk.payload = "";
            }

            if(typeof chunk.payload !== "string" && !Buffer.isBuffer(chunk.payload)){
                cb(new Error(`Error on serializer - invalid payload MID [${chunk.mid}]`));
                debug('MIDSerializer _transform err-invalid_payload_MID', chunk);
                return;
            }

            chunk.payload = Buffer.from(chunk.payload);

            this.push(chunk);
            cb();
        }
    }

    _destroy() {
        //no-op, needed to handle older node versions
    }
}

module.exports = MIDSerializer;
