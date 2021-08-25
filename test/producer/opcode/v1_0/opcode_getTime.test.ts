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
import { GetTimeOpcode } from '../../../../src/producer/opcode/v1_0/get_time_opcode';
import { hexToBuf } from '../../../test_utils';

const getTimeOpcode = new GetTimeOpcode();

describe('Opcode getTime: encode and decode', function () {
    let kpo = {
        opcode: 0x05,
        sid: 1234
    };
    let hex = '0504d2';

    it('.encode() should return expected buffer hex string', function () {
        assert.strictEqual(getTimeOpcode.encode(kpo).toString('hex'), hex);
    });
    it('.decode() should throw PROTOCOL_ERROR error', function () {
        assert.strictEqual(
            JSON.stringify(getTimeOpcode.decode(hexToBuf(hex))),
            JSON.stringify(kpo)
        );
    });
});

describe('Opcode getTime: trailing byte:', function () {
    let hex = '0504d200';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = getTimeOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (0x05, hex);
});

describe('Opcode getTime: missing sid:', function () {
    let kpo = {
        opcode: 0x05
    };
    let hex = '05';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = getTimeOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (5, hex);
    it('.encode() should throw an Error', function () {
        try {
            let encoded = getTimeOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode getTime: missing opcode:', function () {
    let kpo = {
        sid: 1455
    };
    let hex = '04d2';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = getTimeOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (5, hex);
    it('.encode() should throw an Error', function () {
        try {
            let encoded = getTimeOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode getTime: sid as string:', function () {
    let kpo = {
        opcode: 0x05,
        sid: 'f'
    };

    it('.encode() should throw an Error', function () {
        try {
            let encoded = getTimeOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode getTime: opcode as string:', function () {
    let kpo = {
        opcode: '0x05',
        sid: 1455
    };

    it('.encode() should throw an Error', function () {
        try {
            let encoded = getTimeOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode getTime: invalid sid:', function () {
    /* let kpo = {
        opcode: 0x05,
        sid: 0
    };*/
    let hex = '050000';

    it('.decode() should throw INVALID_SEQUENCE_NUMBER error', function () {
        try {
            let decoded = getTimeOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.INVALID_SEQUENCE_NUMBER);
        }
    }); // (kpo.opcode, hex);
});
