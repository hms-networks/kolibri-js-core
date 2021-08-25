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
import { CancelOpcode } from '../../../../src/producer/opcode/v1_0/cancel_opcode';
import { hexToBuf } from '../../../test_utils';

const cancelOpcode = new CancelOpcode();

describe('Opcode cancel:', function () {
    let kpo = {
        opcode: 0x12,
        sid: 4185,
        transactions: [1, 2, 3]
    };
    let hex = '121059000100020003';

    it('.encode() should return expected buffer hex string', function () {
        assert.strictEqual(cancelOpcode.encode(kpo).toString('hex'), hex);
    });
    it('.decode() should throw PROTOCOL_ERROR error', function () {
        assert.strictEqual(
            JSON.stringify(cancelOpcode.decode(hexToBuf(hex))),
            JSON.stringify(kpo)
        );
    });
});

describe('Opcode cancel: trailing byte:', function () {
    let hex = '12105900010002000300';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = cancelOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    });
});

describe('Opcode cancel: invalid sequence number:', function () {
    let hex = '120000000100020003';

    it('.decode() should throw INVALID_SEQUENCE_NUMBER error', function () {
        try {
            let decoded = cancelOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.INVALID_SEQUENCE_NUMBER);
        }
    });
});

describe('Opcode cancel: missing transactions:', function () {
    let hex = '121059';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = cancelOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    });
});

describe('Opcode cancel: invalid sid:', function () {
    let hex = '120000000100020003';

    it('.decode() should throw INVALID_SEQUENCE_NUMBER error', function () {
        try {
            let decoded = cancelOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.INVALID_SEQUENCE_NUMBER);
        }
    });
});
