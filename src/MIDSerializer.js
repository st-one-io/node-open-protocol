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

var debug = util.debuglog('[OpenProtocol] MIDSerializer');

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
}

module.exports = MIDSerializer;
