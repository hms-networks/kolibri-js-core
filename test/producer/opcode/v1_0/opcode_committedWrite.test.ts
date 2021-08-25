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
import { errorcode } from '../../../../src/common/errorcode';
import { CommittedWriteOpcode } from '../../../../src/producer/opcode/v1_0/committed_write_opcode';
import { hexToBuf } from '../../../test_utils';

const opcodeCommittedWrite = new CommittedWriteOpcode();

describe('Opcode committed write:', function () {
    let kpo = {
        opcode: 0x11,
        sid: 145,
        tid: 12,
        nodes: [
            {
                nid: 65,
                dataType: 1,
                timestamp: 549439504,
                quality: 1,
                value: 0
            }
        ]
    };
    let hex = '110091000c00410120bfc8100100';

    it('.encode() should return expected buffer hex string', function () {
        assert.strictEqual(opcodeCommittedWrite.encode(kpo).toString('hex'), hex);
    });
    it('.decode() should throw PROTOCOL_ERROR error', function () {
        assert.strictEqual(
            JSON.stringify(opcodeCommittedWrite.decode(hexToBuf(hex))),
            JSON.stringify(kpo)
        );
    });
});

describe('Opcode committed write: quality 1:', function () {
    let kpo = {
        opcode: 0x11,
        sid: 36987,
        tid: 15,
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
    let hex = '11907b000f00030133eb7b3a0001';

    it('.encode() should return expected buffer hex string', function () {
        assert.strictEqual(opcodeCommittedWrite.encode(kpo).toString('hex'), hex);
    });
    it('.decode() should throw PROTOCOL_ERROR error', function () {
        assert.strictEqual(
            JSON.stringify(opcodeCommittedWrite.decode(hexToBuf(hex))),
            JSON.stringify(kpo)
        );
    });
});

describe('Opcode committed write: trailing byte:', function () {
    let hex = '11907b000f00030133eb7b3a000100';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = opcodeCommittedWrite.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    });
});

describe('Opcode committed write: missing tid:', function () {
    let kpo = {
        opcode: 0x11,
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
    let hex = '11907b00030133eb7b3a0001';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = opcodeCommittedWrite.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    });
    it('.encode() should throw an Error', function () {
        try {
            let encoded = opcodeCommittedWrite.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode committed write: missing sid:', function () {
    let kpo = {
        opcode: 0x11,
        tid: 15,
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
    let hex = '11000f00030133eb7b3a0001';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = opcodeCommittedWrite.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    });
    it('.encode() should throw an Error', function () {
        try {
            let encoded = opcodeCommittedWrite.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode committed write: missing opcode:', function () {
    let kpo = {
        sid: 36987,
        tid: 15,
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
    let hex = '907b000f00030133eb7b3a0001';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = opcodeCommittedWrite.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    });
    it('.encode() should throw an Error', function () {
        try {
            let encoded = opcodeCommittedWrite.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode committed write: missing nodes:', function () {
    let kpo = {
        opcode: 0x11,
        sid: 36987,
        tid: 15
    };
    let hex = '11907b000f';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = opcodeCommittedWrite.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    });
    it('.encode() should throw an Error', function () {
        try {
            let encoded = opcodeCommittedWrite.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode committed write: missing nid:', function () {
    let kpo = {
        opcode: 0x11,
        sid: 145,
        tid: 12,
        nodes: [
            {
                dataType: 1,
                timestamp: 871070522,
                quality: 0,
                value: 1
            }
        ]
    };
    let hex = '11907b000f0133eb7b3a0001';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = opcodeCommittedWrite.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    });
    it('.encode() should throw an Error', function () {
        try {
            let encoded = opcodeCommittedWrite.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode committed write: missing dataType:', function () {
    let kpo = {
        opcode: 0x11,
        sid: 145,
        tid: 12,
        nodes: [
            {
                nid: 3,
                timestamp: 871070522,
                quality: 0,
                value: 1
            }
        ]
    };
    let hex = '11907b000f000333eb7b3a0001';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = opcodeCommittedWrite.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    });
    it('.encode() should throw INVALID_DATA_TYPE error', function () {
        try {
            let encoded = opcodeCommittedWrite.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.INVALID_DATA_TYPE);
        }
    });
});

describe('Opcode committed write: missing timestamp:', function () {
    let kpo = {
        opcode: 0x11,
        sid: 145,
        tid: 12,
        nodes: [
            {
                nid: 3,
                dataType: 1,
                quality: 0,
                value: 1
            }
        ]
    };
    let hex = '11907b000f0003010001';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = opcodeCommittedWrite.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    });
    it('.encode() should throw an Error', function () {
        try {
            let encoded = opcodeCommittedWrite.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode committed write: missing quality:', function () {
    let kpo = {
        opcode: 0x11,
        sid: 145,
        tid: 12,
        nodes: [
            {
                nid: 3,
                dataType: 1,
                timestamp: 871070522,
                value: 1
            }
        ]
    };
    let hex = '11907b000f00030133eb7b3a01';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = opcodeCommittedWrite.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    });
    it('.encode() should throw an Error', function () {
        try {
            let encoded = opcodeCommittedWrite.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode committed write: missing value:', function () {
    let kpo = {
        opcode: 0x11,
        sid: 145,
        tid: 12,
        nodes: [
            {
                nid: 3,
                dataType: 1,
                timestamp: 871070522,
                quality: 0
            }
        ]
    };
    let hex = '11907b000f00030133eb7b3a00';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = opcodeCommittedWrite.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    });
    it('.encode() should throw an Error', function () {
        try {
            let encoded = opcodeCommittedWrite.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode committed write: sid as string:', function () {
    let kpo = {
        opcode: 0x11,
        sid: 'f',
        tid: 12,
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
            let encoded = opcodeCommittedWrite.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode committed write: tid as string:', function () {
    let kpo = {
        opcode: 0x11,
        sid: 145,
        tid: 'f',
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
            let encoded = opcodeCommittedWrite.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode committed write: opcode as string:', function () {
    let kpo = {
        opcode: '0x11',
        sid: 145,
        tid: 12,
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
            let encoded = opcodeCommittedWrite.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode committed write: nid as string:', function () {
    let kpo = {
        opcode: 0x11,
        sid: 145,
        tid: 12,
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
            let encoded = opcodeCommittedWrite.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode committed write: dataType as string:', function () {
    let kpo = {
        opcode: 0x11,
        sid: 145,
        tid: 12,
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
            let encoded = opcodeCommittedWrite.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.INVALID_DATA_TYPE);
        }
    });
});

describe('Opcode committed write: timestamp as string:', function () {
    let kpo = {
        opcode: 0x11,
        sid: 145,
        tid: 12,
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
            let encoded = opcodeCommittedWrite.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode committed write: quality as string:', function () {
    let kpo = {
        opcode: 0x11,
        sid: 145,
        tid: 12,
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
            let encoded = opcodeCommittedWrite.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode committed write: value as string:', function () {
    let kpo = {
        opcode: 0x11,
        sid: 145,
        tid: 12,
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
            let encoded = opcodeCommittedWrite.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode committed write: invalid sid:', function () {
    /* let kpo = {
        opcode: 0x11,
        sid: 0,
        tid: 12,
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
    let hex = '110000000c00410120bfc8100100';

    it('.decode() should throw INVALID_SEQUENCE_NUMBER error', function () {
        try {
            let decoded = opcodeCommittedWrite.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.INVALID_SEQUENCE_NUMBER);
        }
    });
});
