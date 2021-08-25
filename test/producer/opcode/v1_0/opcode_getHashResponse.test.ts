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
import { GetHashResponseOpcode } from '../../../../src/producer/opcode/v1_0/get_hash_response_opcode';
import { hexToBuf, stringToHash } from '../../../test_utils';

const getHashResponseOpcode = new GetHashResponseOpcode();

describe('Opcode getHashResponse:', function () {
    let kpo = {
        opcode: 0x04,
        sid: 14563,
        hash: stringToHash('string')
    };
    let hex = '0438e3ecb252044b5ea0f679ee78ec1a12904739e2904d';

    it('.encode() should return expected buffer hex string', function () {
        assert.strictEqual(getHashResponseOpcode.encode(kpo).toString('hex'), hex);
    });
    it('.decode() should throw PROTOCOL_ERROR error', function () {
        assert.strictEqual(
            JSON.stringify(getHashResponseOpcode.decode(hexToBuf(hex))),
            JSON.stringify(kpo)
        );
    });
});

describe('Opcode getHashResponse: trailing byte:', function () {
    let hex = '0438e3ecb252044b5ea0f679ee78ec1a12904739e2904d00';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = getHashResponseOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (0x04, hex);
});

describe('Opcode getHashResponse: missing hash:', function () {
    let kpo = {
        opcode: 0x04,
        sid: 14563
    };
    let hex = '0438e3';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = getHashResponseOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (4, hex);
    it('.encode() should throw an Error', function () {
        try {
            let encoded = getHashResponseOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode getHashResponse: missing sid:', function () {
    let kpo = {
        opcode: 0x04,
        hash: stringToHash('string')
    };
    let hex = '04ecb252044b5ea0f679ee78ec1a12904739e2904d';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = getHashResponseOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    });
    it('.encode() should throw an Error', function () {
        try {
            let encoded = getHashResponseOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode getHashResponse: missing opcode:', function () {
    let kpo = {
        sid: 14563,
        hash: stringToHash('string')
    };
    let hex = '38e3ecb252044b5ea0f679ee78ec1a12904739e2904d';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = getHashResponseOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (4, hex);
    it('.encode() should throw an Error', function () {
        try {
            let encoded = getHashResponseOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode getHashResponse: sid as string:', function () {
    let kpo = {
        opcode: 0x04,
        sid: 'f',
        hash: stringToHash('string')
    };

    it('.encode() should throw an Error', function () {
        try {
            let encoded = getHashResponseOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode getHashResponse: opcode as string:', function () {
    let kpo = {
        opcode: '0x04',
        sid: 14563,
        hash: stringToHash('string')
    };

    it('.encode() should throw an Error', function () {
        try {
            let encoded = getHashResponseOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode getHashResponse: invalid sid:', function () {
    /* let kpo = {
        opcode: 0x04,
        sid: 0,
        hash: stringToHash('string')
    };*/
    let hex = '040000ecb252044b5ea0f679ee78ec1a12904739e2904d';

    it('.decode() should throw INVALID_SEQUENCE_NUMBER error', function () {
        try {
            let decoded = getHashResponseOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.INVALID_SEQUENCE_NUMBER);
        }
    });
});
