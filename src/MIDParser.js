//@ts-check
/*
  Copyright: (c) 2018-2020, Smart-Tech Controle e Automação
  GNU General Public License v3.0+ (see LICENSE or https://www.gnu.org/licenses/gpl-3.0.txt)
*/

const util = require('util');
const { Transform } = require('stream');

const helpers = require("./helpers.js");
const mids = helpers.getMids();

const constants = require("./constants.json");
const encodingOP = constants.defaultEncoder;

var debug = util.debuglog('open-protocol');

class MIDParser extends Transform {

    /**
     * @class MIDParser
     * @description This class performs the parsing of a MID body.
     * This transforms MID.payload (Buffer) in a MID.payload (Object).
     * This class uses the implemented MIDs in 'node-open-protocol/src/mid' for parsing MIDs.
     * In case of a not implemented MID, MID.payload is converted in to a String.
     * @param opts parameters to Transform stream
     */
    constructor(opts) {
        debug("new MIDParser");

        opts = opts || {};

        opts.writableObjectMode = true;        
        opts.readableObjectMode = true;

        super(opts);
    }

    _transform(chunk, encoding, cb) {
        debug("new MIDParser _transform", chunk);

        if(mids[chunk.mid]){

            mids[chunk.mid].parser(chunk, null, (err, data) => {
                
                if(err){
                    cb(new Error(`Error on parser [${err}]`));
                    debug("new MIDParser _transform err-parser", chunk, err);
                    return;
                }

                this.push(data);
                cb();                
            });
            
        }else{

            if(!Buffer.isBuffer(chunk.payload)){
                cb(new Error(`Error on parser - invalid payload MID [${chunk.mid}]`));
                debug("new MIDParser _transform err-invalid_payload_MID", chunk);
                return;
            }

            chunk.payload = chunk.payload.toString(encodingOP);

            this.push(chunk);
            cb();
        }
    }

    _destroy() {
        //no-op, needed to handle older node versions
    }
}

module.exports = MIDParser;
