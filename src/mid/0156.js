//@ts-check
/*
  Copyright: (c) 2018-2020, Smart-Tech Controle e Automação
  GNU General Public License v3.0+ (see LICENSE or https://www.gnu.org/licenses/gpl-3.0.txt)
*/

function parser(msg, opts, cb) {
    let buffer = msg.payload;
    msg.payload = buffer.toString("ascii");
    cb(null, msg);
}

function serializer(msg, opts, cb) {
    let buf = Buffer.from("");
    msg.payload = buf;
    cb(null, msg);
}

function revision() {
    return [1];
}

module.exports = {
    parser,
    serializer,
    revision
};