/*
* Copyright 2021 HMS Industrial Networks AB
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http: //www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

import assert from 'assert';
import Long from 'long';
import { errorcode } from '../../../../src/common/errorcode';
import { WriteOpcode } from '../../../../src/producer/opcode/v1_0/write_opcode';
import { hexToBuf } from '../../../test_utils';

const writeOpcode = new WriteOpcode();
describe('Opcode write: boolean value:', function () {
    let kpo = {
        opcode: 0x0a,
        sid: 555,
        nodes: [
            {
                nid: 99,
                dataType: 0,
                timestamp: 1234567890,
                quality: 1,
                value: true
            }
        ]
    };
    let hex = '0a022b006300499602d20101';

    it('.encode() should return expected buffer hex string', function () {
        assert.strictEqual(writeOpcode.encode(kpo).toString('hex'), hex);
    });
    it('.decode() should throw PROTOCOL_ERROR error', function () {
        assert.strictEqual(
            JSON.stringify(writeOpcode.decode(hexToBuf(hex))),
            JSON.stringify(kpo)
        );
    });
});

describe('Opcode write: 8-bit unsigned integer value:', function () {
    let kpo = {
        opcode: 0x0a,
        sid: 555,
        nodes: [
            {
                nid: 99,
                dataType: 1,
                timestamp: 1234567890,
                quality: 1,
                value: 200
            }
        ]
    };
    let hex = '0a022b006301499602d201c8';

    it('.encode() should return expected buffer hex string', function () {
        assert.strictEqual(writeOpcode.encode(kpo).toString('hex'), hex);
    });
    it('.decode() should throw PROTOCOL_ERROR error', function () {
        assert.strictEqual(
            JSON.stringify(writeOpcode.decode(hexToBuf(hex))),
            JSON.stringify(kpo)
        );
    });
});

describe('Opcode write: 8-bit signed integer value:', function () {
    let kpo = {
        opcode: 0x0a,
        sid: 555,
        nodes: [
            {
                nid: 99,
                dataType: 2,
                timestamp: 1234567890,
                quality: 1,
                value: -100
            }
        ]
    };
    let hex = '0a022b006302499602d2019c';

    it('.encode() should return expected buffer hex string', function () {
        assert.strictEqual(writeOpcode.encode(kpo).toString('hex'), hex);
    });
    it('.decode() should throw PROTOCOL_ERROR error', function () {
        assert.strictEqual(
            JSON.stringify(writeOpcode.decode(hexToBuf(hex))),
            JSON.stringify(kpo)
        );
    });
});

describe('Opcode write: 16-bit unsigned integer value:', function () {
    let kpo = {
        opcode: 0x0a,
        sid: 555,
        nodes: [
            {
                nid: 99,
                dataType: 3,
                timestamp: 1234567890,
                quality: 1,
                value: 50000
            }
        ]
    };
    let hex = '0a022b006303499602d201c350';

    it('.encode() should return expected buffer hex string', function () {
        assert.strictEqual(writeOpcode.encode(kpo).toString('hex'), hex);
    });
    it('.decode() should throw PROTOCOL_ERROR error', function () {
        assert.strictEqual(
            JSON.stringify(writeOpcode.decode(hexToBuf(hex))),
            JSON.stringify(kpo)
        );
    });
});

describe('Opcode write: 16-bit signed integer value:', function () {
    let kpo = {
        opcode: 0x0a,
        sid: 555,
        nodes: [
            {
                nid: 99,
                dataType: 4,
                timestamp: 1234567890,
                quality: 1,
                value: -10000
            }
        ]
    };
    let hex = '0a022b006304499602d201d8f0';

    it('.encode() should return expected buffer hex string', function () {
        assert.strictEqual(writeOpcode.encode(kpo).toString('hex'), hex);
    });
    it('.decode() should throw PROTOCOL_ERROR error', function () {
        assert.strictEqual(
            JSON.stringify(writeOpcode.decode(hexToBuf(hex))),
            JSON.stringify(kpo)
        );
    });
});

describe('Opcode write: 32-bit unsigned integer value:', function () {
    let kpo = {
        opcode: 0x0a,
        sid: 555,
        nodes: [
            {
                nid: 99,
                dataType: 5,
                timestamp: 1234567890,
                quality: 1,
                value: 1000000
            }
        ]
    };
    let hex = '0a022b006305499602d201000f4240';

    it('.encode() should return expected buffer hex string', function () {
        assert.strictEqual(writeOpcode.encode(kpo).toString('hex'), hex);
    });
    it('.decode() should throw PROTOCOL_ERROR error', function () {
        assert.strictEqual(
            JSON.stringify(writeOpcode.decode(hexToBuf(hex))),
            JSON.stringify(kpo)
        );
    });
});

describe('Opcode write: 32-bit signed integer value:', function () {
    let kpo = {
        opcode: 0x0a,
        sid: 555,
        nodes: [
            {
                nid: 99,
                dataType: 6,
                timestamp: 1234567890,
                quality: 1,
                value: -100000
            }
        ]
    };
    let hex = '0a022b006306499602d201fffe7960';

    it('.encode() should return expected buffer hex string', function () {
        assert.strictEqual(writeOpcode.encode(kpo).toString('hex'), hex);
    });
    it('.decode() should throw PROTOCOL_ERROR error', function () {
        assert.strictEqual(
            JSON.stringify(writeOpcode.decode(hexToBuf(hex))),
            JSON.stringify(kpo)
        );
    });
});

describe('Opcode write: 64-bit unsigned integer value:', function () {
    let kpo = {
        opcode: 0x0a,
        sid: 555,
        nodes: [
            {
                nid: 99,
                dataType: 7,
                timestamp: 1234567890,
                quality: 1,
                value: Long.fromString('5000000000000', true)
            }
        ]
    };
    let hex = '0a022b006307499602d2010000048c27395000';

    it('.encode() should return expected buffer hex string', function () {
        assert.strictEqual(writeOpcode.encode(kpo).toString('hex'), hex);
    });
    it('.decode() should throw PROTOCOL_ERROR error', function () {
        assert.strictEqual(
            JSON.stringify(writeOpcode.decode(hexToBuf(hex))),
            JSON.stringify(kpo)
        );
    });
});

describe('Opcode write: 64-bit signed integer value:', function () {
    let kpo = {
        opcode: 0x0a,
        sid: 555,
        nodes: [
            {
                nid: 99,
                dataType: 8,
                timestamp: 1234567890,
                quality: 1,
                value: Long.fromString('-100000000000000', false)
            }
        ]
    };
    let hex = '0a022b006308499602d201ffffa50cef85c000';

    it('.encode() should return expected buffer hex string', function () {
        assert.strictEqual(writeOpcode.encode(kpo).toString('hex'), hex);
    });
    it('.decode() should throw PROTOCOL_ERROR error', function () {
        assert.strictEqual(
            JSON.stringify(writeOpcode.decode(hexToBuf(hex))),
            JSON.stringify(kpo)
        );
    });
});

describe('Opcode write: 32-bit floating point value:', function () {
    let kpo = {
        opcode: 0x0a,
        sid: 555,
        nodes: [
            {
                nid: 99,
                dataType: 9,
                timestamp: 1234567890,
                quality: 1,
                value: -0.12345
            }
        ]
    };
    let hex = '0a022b006309499602d201bdfcd35b';

    it('.encode() should return expected buffer hex string', function () {
        assert.strictEqual(writeOpcode.encode(kpo).toString('hex'), hex);
    });
});

describe('Opcode write: 64-bit floating point value:', function () {
    let kpo = {
        opcode: 0x0a,
        sid: 555,
        nodes: [
            {
                nid: 99,
                dataType: 10,
                timestamp: 1234567890,
                quality: 1,
                value: -0.12345
            }
        ]
    };
    let hex = '0a022b00630a499602d201bfbf9a6b50b0f27c';

    it('.encode() should return expected buffer hex string', function () {
        assert.strictEqual(writeOpcode.encode(kpo).toString('hex'), hex);
    });
    it('.decode() should throw PROTOCOL_ERROR error', function () {
        assert.strictEqual(
            JSON.stringify(writeOpcode.decode(hexToBuf(hex))),
            JSON.stringify(kpo)
        );
    });
});

describe('Opcode write: utf-8 string value:', function () {
    let kpo = {
        opcode: 0x0a,
        sid: 555,
        nodes: [
            {
                nid: 99,
                dataType: 12,
                timestamp: 1234567890,
                quality: 1,
                value: '!!! abc ABC äöü ÄÖÜ @€µ²³ !!!'
            }
        ]
    };
    let hex =
        '0a022b00630c499602d2010028212121206162632041424320c3a4c3b6c3bc20c38' +
        '4c396c39c2040e282acc2b5c2b2c2b320212121';

    it('.encode() should return expected buffer hex string', function () {
        assert.strictEqual(writeOpcode.encode(kpo).toString('hex'), hex);
    });
    it('.decode() should throw PROTOCOL_ERROR error', function () {
        assert.strictEqual(
            JSON.stringify(writeOpcode.decode(hexToBuf(hex))),
            JSON.stringify(kpo)
        );
    });
});

describe('Opcode write: byte array value:', function () {
    let kpo = {
        opcode: 0x0a,
        sid: 555,
        nodes: [
            {
                nid: 99,
                dataType: 13,
                timestamp: 1234567890,
                quality: 1,
                value: '00010203040506070809fffefdfcfbfaf00000'
            }
        ]
    };
    let hex = '0a022b00630d499602d201001300010203040506070809fffefdfcfbfaf00000';

    it('.encode() should return expected buffer hex string', function () {
        assert.strictEqual(writeOpcode.encode(kpo).toString('hex'), hex);
    });
    it('.decode() should throw PROTOCOL_ERROR error', function () {
        assert.strictEqual(
            JSON.stringify(writeOpcode.decode(hexToBuf(hex))),
            JSON.stringify(kpo)
        );
    });
});

describe('Opcode unpublish: byte array value, trailing byte:', function () {
    let hex = '0a022b00630d499602d201001300010203040506070809fffefdfcfbfaf00000aa';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = writeOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    });
});

describe('Opcode unpublish: byte array value, missing byte:', function () {
    let hex = '0a022b00630d499602d201001300010203040506070809fffefdfcfbfaf000';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = writeOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    });
});

describe('Opcode write: missing sid:', function () {
    let kpo = {
        opcode: 0x0a,
        nodes: [
            {
                nid: 3,
                dataType: 1,
                timestamp: 871070522,
                quality: 0,
                value: 1
            }
        ]
    };
    let hex = '0a00030133eb7b3a0001';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = writeOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    });
    it('.encode() should throw an Error', function () {
        try {
            let encoded = writeOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode write: missing opcode:', function () {
    let kpo = {
        sid: 36987,
        nodes: [
            {
                nid: 3,
                dataType: 1,
                timestamp: 871070522,
                quality: 0,
                value: 1
            }
        ]
    };
    let hex = '907b00030133eb7b3a0001';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = writeOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    });
    it('.encode() should throw an Error', function () {
        try {
            let encoded = writeOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode write: missing nodes:', function () {
    let kpo = {
        opcode: 0x0a,
        sid: 36987
    };
    let hex = '0a907b';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = writeOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    });
    it('.encode() should throw an Error', function () {
        try {
            let encoded = writeOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode write: missing nid:', function () {
    let kpo = {
        opcode: 0x0a,
        sid: 145,
        nodes: [
            {
                dataType: 1,
                timestamp: 871070522,
                quality: 0,
                value: 1
            }
        ]
    };
    let hex = '0a907b0133eb7b3a0001';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = writeOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    });
    it('.encode() should throw an Error', function () {
        try {
            let encoded = writeOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode write: missing dataType:', function () {
    let kpo = {
        opcode: 0x0a,
        sid: 145,
        nodes: [
            {
                nid: 3,
                timestamp: 871070522,
                quality: 0,
                value: 1
            }
        ]
    };
    let hex = '0a907b000333eb7b3a0001';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = writeOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    });
    it('.encode() should throw INVALID_DATA_TYPE error', function () {
        try {
            writeOpcode.encode(kpo);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.INVALID_DATA_TYPE);
        }
    });
});

describe('Opcode write: missing timestamp:', function () {
    let kpo = {
        opcode: 0x0a,
        sid: 145,
        nodes: [
            {
                nid: 3,
                dataType: 1,
                quality: 0,
                value: 1
            }
        ]
    };
    let hex = '0a907b0003010001';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = writeOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    });
    it('.encode() should throw an Error', function () {
        try {
            let encoded = writeOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode write: missing quality:', function () {
    let kpo = {
        opcode: 0x0a,
        sid: 145,
        nodes: [
            {
                nid: 3,
                dataType: 1,
                timestamp: 871070522,
                value: 1
            }
        ]
    };
    let hex = '0a907b00030133eb7b3a';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = writeOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    });
    it('.encode() should throw an Error', function () {
        try {
            writeOpcode.encode(kpo);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode write: sid as string:', function () {
    let kpo = {
        opcode: 0x0a,
        sid: 'f',
        nodes: [
            {
                nid: 3,
                dataType: 1,
                timestamp: 871070522,
                quality: 0,
                value: 0
            }
        ]
    };

    it('.encode() should throw an Error', function () {
        try {
            writeOpcode.encode(kpo);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode write: opcode as string:', function () {
    let kpo = {
        opcode: '0x0A',
        sid: 145,
        nodes: [
            {
                nid: 3,
                dataType: 1,
                timestamp: 871070522,
                quality: 0,
                value: 0
            }
        ]
    };

    it('.encode() should throw an Error', function () {
        try {
            let encoded = writeOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode write: nid as string:', function () {
    let kpo = {
        opcode: 0x0a,
        sid: 145,
        nodes: [
            {
                nid: 'f',
                dataType: 1,
                timestamp: 871070522,
                quality: 0,
                value: 0
            }
        ]
    };

    it('.encode() should throw an Error', function () {
        try {
            let encoded = writeOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode write: dataType as string:', function () {
    let kpo = {
        opcode: 0x0a,
        sid: 145,
        nodes: [
            {
                nid: 3,
                dataType: 'f',
                timestamp: 871070522,
                quality: 0,
                value: 0
            }
        ]
    };

    it('.encode() should throw INVALID_DATA_TYPE error', function () {
        try {
            let encoded = writeOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.INVALID_DATA_TYPE);
        }
    });
});

describe('Opcode write: timestamp as string:', function () {
    let kpo = {
        opcode: 0x0a,
        sid: 145,
        nodes: [
            {
                nid: 3,
                dataType: 1,
                timestamp: '8710705f2',
                quality: 0,
                value: 0
            }
        ]
    };

    it('.encode() should throw an Error', function () {
        try {
            let encoded = writeOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode write: quality as string:', function () {
    let kpo = {
        opcode: 0x0a,
        sid: 145,
        nodes: [
            {
                nid: 3,
                dataType: 1,
                timestamp: 871070522,
                quality: 'f',
                value: 0
            }
        ]
    };

    it('.encode() should throw an Error', function () {
        try {
            let encoded = writeOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode write: value as string:', function () {
    let kpo = {
        opcode: 0x0a,
        sid: 145,
        nodes: [
            {
                nid: 3,
                dataType: 1,
                timestamp: 871070522,
                quality: 0,
                value: 'f'
            }
        ]
    };

    it('.encode() should throw an Error', function () {
        try {
            let encoded = writeOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode write: invalid sid:', function () {
    /* let kpo = {
        opcode: 0x0a,
        sid: 0,
        nodes: [
            {
                nid: 65,
                dataType: 1,
                timestamp: 549439504,
                quality: 1,
                value: 0
            }
        ]
    };*/
    let hex = '0a000000410120bfc8100100';

    it('.decode() should throw INVALID_SEQUENCE_NUMBER error', function () {
        try {
            let decoded = writeOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.INVALID_SEQUENCE_NUMBER);
        }
    });
});
