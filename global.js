import {TextEncoder, TextDecoder} from 'text-encoding';
import {Buffer} from 'buffer';
global.Buffer = Buffer;
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

if (typeof btoa === 'undefined') {
  global.btoa = str => Buffer.from(str, 'binary').toString('base64');
}

if (typeof atob === 'undefined') {
  global.atob = b64Encoded =>
    Buffer.from(b64Encoded, 'base64').toString('binary');
}
