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
import { ThrottleOpcode } from '../../../../src/producer/opcode/v1_0/throttle_opcode';
import { hexToBuf } from '../../../test_utils';

const throttleOpcode = new ThrottleOpcode();

describe('Opcode throttle: period 0', function () {
    let kpo = {
        opcode: 0x13,
        sid: 4185,
        limit: 0,
        period: 0
    };
    let hex = '13105900000000';

    it('.encode() should return expected buffer hex string', function () {
        assert.strictEqual(throttleOpcode.encode(kpo).toString('hex'), hex);
    });
    it('.decode() should throw PROTOCOL_ERROR error', function () {
        assert.strictEqual(
            JSON.stringify(throttleOpcode.decode(hexToBuf(hex))),
            JSON.stringify(kpo)
        );
    });
});

describe('Opcode throttle: period 0xffff', function () {
    let kpo = {
        opcode: 0x13,
        sid: 4185,
        limit: 65535,
        period: 0xffff
    };
    let hex = '131059ffffffff';

    it('.encode() should return expected buffer hex string', function () {
        assert.strictEqual(throttleOpcode.encode(kpo).toString('hex'), hex);
    });
    it('.decode() should throw PROTOCOL_ERROR error', function () {
        assert.strictEqual(
            JSON.stringify(throttleOpcode.decode(hexToBuf(hex))),
            JSON.stringify(kpo)
        );
    });
});

describe('Opcode throttle: trailing byte:', function () {
    let hex = '13105900000000aa';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = throttleOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    });
});

describe('Opcode throttle: invalid sid:', function () {
    let hex = '13000000010005';

    it('.decode() should throw INVALID_SEQUENCE_NUMBER error', function () {
        try {
            let decoded = throttleOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.INVALID_SEQUENCE_NUMBER);
        }
    });
});

describe('Opcode throttle: limit as string:', function () {
    let kpo = {
        opcode: 0x13,
        sid: 4185,
        limit: '1a',
        period: 0xffff
    };

    it('.encode() should throw an Error', function () {
        try {
            let encoded = throttleOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode throttle: missing period:', function () {
    let hex = '1310590001';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = throttleOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    });
});
