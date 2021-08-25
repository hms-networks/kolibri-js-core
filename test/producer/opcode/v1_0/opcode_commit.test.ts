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
import { CommitOpcode } from '../../../../src/producer/opcode/v1_0/commit_opcode';
import { hexToBuf } from '../../../test_utils';

const commitOpcode = new CommitOpcode();

describe('Opcode commit:', function () {
    let kpo = {
        opcode: 0x0b,
        sid: 125,
        tid: 128
    };
    let hex = '0b007d0080';

    it('.encode() should return expected buffer hex string', function () {
        assert.strictEqual(commitOpcode.encode(kpo).toString('hex'), hex);
    });
    it('.decode() should throw PROTOCOL_ERROR error', function () {
        assert.strictEqual(
            JSON.stringify(commitOpcode.decode(hexToBuf(hex))),
            JSON.stringify(kpo)
        );
    });
});

describe('Opcode commit: trailing byte:', function () {
    let hex = '0b007d008011';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = commitOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    });
});

describe('Opcode commit: missing sid:', function () {
    let kpo = {
        opcode: 0x0b,
        tid: 128
    };
    let hex = '0b0080';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = commitOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    });
    it('.encode() should throw an Error', function () {
        try {
            let encoded = commitOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode commit: missing opcode:', function () {
    let kpo = {
        sid: 125,
        tid: 128
    };
    let hex = '007d0080';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = commitOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    });
    it('.encode() should throw an Error', function () {
        try {
            let encoded = commitOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode commit: missing tid:', function () {
    let kpo = {
        opcode: 0x0b,
        sid: 125
    };
    let hex = '0b007d';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = commitOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    });
    it('.encode() should throw an Error', function () {
        try {
            let encoded = commitOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode commit: opcode as string:', function () {
    let kpo = {
        opcode: '0x0B',
        sid: 125,
        tid: 128
    };

    it('.encode() should throw an Error', function () {
        try {
            let encoded = commitOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode commit: sid as string:', function () {
    let kpo = {
        opcode: 0x0b,
        sid: 'f',
        tid: 128
    };

    it('.encode() should throw an Error', function () {
        try {
            let encoded = commitOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode commit: tid as string:', function () {
    let kpo = {
        opcode: 0x0b,
        sid: 125,
        tid: 'f'
    };

    it('.encode() should throw an Error', function () {
        try {
            let encoded = commitOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode commit: invalid sid:', function () {
    let hex = '0b00000080';

    it('.decode() should throw INVALID_SEQUENCE_NUMBER error', function () {
        try {
            let decoded = commitOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.INVALID_SEQUENCE_NUMBER);
        }
    });
});
