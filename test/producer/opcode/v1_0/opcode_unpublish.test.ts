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
import { UnpublishOpcode } from '../../../../src/producer/opcode/v1_0/unpublish_opcode';
import { hexToBuf } from '../../../test_utils';
const unpublishOpcode = new UnpublishOpcode();

describe('Opcode unpublish: cmdflags 3', function () {
    let kpo = {
        opcode: 0x09,
        sid: 3345,
        cmdflags: 3,
        nodes: [
            {
                nid: 13
            },
            {
                nid: 14
            }
        ]
    };
    let hex = '090d1103000d000e';

    it('.encode() should return expected buffer hex string', function () {
        assert.strictEqual(unpublishOpcode.encode(kpo).toString('hex'), hex);
    });
    it('.decode() should throw PROTOCOL_ERROR error', function () {
        assert.strictEqual(
            JSON.stringify(unpublishOpcode.decode(hexToBuf(hex))),
            JSON.stringify(kpo)
        );
    });
});

describe('Opcode unpublish: cmdflages 0', function () {
    let kpo = {
        opcode: 0x09,
        sid: 3345,
        cmdflags: 0,
        nodes: [
            {
                nid: 76
            },
            {
                nid: 89
            }
        ]
    };
    let hex = '090d1100004c0059';

    it('.encode() should return expected buffer hex string', function () {
        assert.strictEqual(unpublishOpcode.encode(kpo).toString('hex'), hex);
    });
    it('.decode() should throw PROTOCOL_ERROR error', function () {
        assert.strictEqual(
            JSON.stringify(unpublishOpcode.decode(hexToBuf(hex))),
            JSON.stringify(kpo)
        );
    });
});

describe('Opcode unpublish: trailing byte:', function () {
    let hex = '090d1100004c005900';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = unpublishOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    });
});

describe('Opcode unpublish: missing nodes:', function () {
    let kpo = {
        opcode: 0x09,
        sid: 3345,
        cmdflags: 0
    };
    let hex = '090d1100';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = unpublishOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    });
    it('.encode() should throw an Error', function () {
        try {
            let encoded = unpublishOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode unpublish: missing cmdflags:', function () {
    let kpo = {
        opcode: 0x09,
        sid: 3345,
        nodes: [
            {
                nid: 76
            }
        ]
    };
    let hex = '090d11004c0059';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = unpublishOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    });
    it('.encode() should throw an Error', function () {
        try {
            let encoded = unpublishOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode unpublish: missing sid:', function () {
    let kpo = {
        opcode: 0x09,
        cmdflags: 0,
        nodes: [
            {
                nid: 76
            }
        ]
    };
    let hex = '0900004c0059';

    it('.decode() should throw INVALID_SEQUENCE_NUMBER error', function () {
        try {
            let decoded = unpublishOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.INVALID_SEQUENCE_NUMBER);
        }
    });
    it('.encode() should throw an Error', function () {
        try {
            let encoded = unpublishOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode unpublish: missing opcode:', function () {
    let kpo = {
        sid: 3345,
        cmdflags: 0,
        nodes: [
            {
                nid: 76
            }
        ]
    };
    let hex = '0d1100004c0059';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = unpublishOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    });
    it('.encode() should throw an Error', function () {
        try {
            let encoded = unpublishOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode unpublish: nid as string:', function () {
    let kpo = {
        opcode: 0x09,
        sid: 3345,
        cmdflags: 0,
        nodes: [
            {
                nid: 'f'
            }
        ]
    };

    it('.encode() should throw an Error', function () {
        try {
            let encoded = unpublishOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode unpublish: cmdflags as string:', function () {
    let kpo = {
        opcode: 0x09,
        sid: 3345,
        cmdflags: 'f',
        nodes: [
            {
                nid: 76
            }
        ]
    };

    it('.encode() should throw an Error', function () {
        try {
            let encoded = unpublishOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode unpublish: opcode as string:', function () {
    let kpo = {
        opcode: '0x09',
        sid: 3345,
        cmdflags: 0,
        nodes: [
            {
                nid: 76
            }
        ]
    };

    it('.encode() should throw an Error', function () {
        try {
            let encoded = unpublishOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode unpublish: invalid sid:', function () {
    /* let kpo = {
        opcode: 0x09,
        sid: 0,
        cmdflags: 3,
        nodes: [
            {
                nid: 13
            },
            {
                nid: 14
            }
        ]
    };*/
    let hex = '09000003000d000e';

    it('.decode() should throw INVALID_SEQUENCE_NUMBER error', function () {
        try {
            let decoded = unpublishOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.INVALID_SEQUENCE_NUMBER);
        }
    });
});
