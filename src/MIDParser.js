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
"use strict";
/*jshint esversion: 6, node: true*/

const {
    Transform
} = require('stream');

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
}

module.exports = MIDParser;
