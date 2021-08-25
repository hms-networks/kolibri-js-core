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
import { hexToBuf } from '../../../test_utils';
import { DeleteNodeOpcode } from '../../../../src/producer/opcode/v1_0/delete_node_opcode';
import { errorcode } from '../../../../src/common/errorcode';

const deleteOpcode = new DeleteNodeOpcode();

describe('Opcode deleteNode: ', function () {
    let kpo = {
        opcode: 0x0f,
        sid: 125,
        type: 255,
        path: '/group1/group2/group3/point1'
    };
    let hex = '0f007dff001c2f67726f7570312f67726f7570322f67726f7570332f706f696e7431';

    it('.encode() should return expected buffer hex string', function () {
        assert.strictEqual(deleteOpcode.encode(kpo).toString('hex'), hex);
    });
    it('.decode() should throw PROTOCOL_ERROR error', function () {
        assert.strictEqual(
            JSON.stringify(deleteOpcode.decode(hexToBuf(hex))),
            JSON.stringify(kpo)
        );
    });
});

describe('Opcode deleteNode:', function () {
    let kpo = {
        opcode: 0x0f,
        sid: 65535,
        type: 0,
        nid: 12
    };
    let hex = '0fffff00000c';

    it('.encode() should return expected buffer hex string', function () {
        assert.strictEqual(deleteOpcode.encode(kpo).toString('hex'), hex);
    });
    it('.decode() should throw PROTOCOL_ERROR error', function () {
        assert.strictEqual(
            JSON.stringify(deleteOpcode.decode(hexToBuf(hex))),
            JSON.stringify(kpo)
        );
    });
});

describe('Opcode deleteNode: trailing byte:', function () {
    let hex = '0fffff00000c55';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = deleteOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (0x0f, hex);
});

describe('Opcode deleteNode: missing path:', function () {
    let kpo = {
        opcode: 0x0f,
        sid: 125,
        type: 255
    };
    let hex = '0f007dff001c2f67726f7570570332f706f696e7431';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = deleteOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (15, hex);
    it('.encode() should throw an Error', function () {
        expect(() => {
            deleteOpcode.encode(kpo);
        }).toThrowError();
    });
});

describe('Opcode deleteNode: missing type:', function () {
    let hex = '0f007dff001c2f677212f67726f7570322f67726f7570332f706f696e7431';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = deleteOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (15, hex);
});

describe('Opcode deleteNode: missing sid: type 255', function () {
    let kpo = {
        opcode: 0x0f,
        type: 255,
        path: '/group1/group2/group3/point1'
    };
    let hex = '0f007dff001c2ff7570312f67726f7570322f67726f7570332f706f696e7431';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = deleteOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (15, hex);
    it('.encode() should throw an Error', function () {
        try {
            let encoded = deleteOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode deleteNode: missing opcode:', function () {
    let kpo = {
        sid: 125,
        type: 255,
        path: '/group1/group2/group3/point1'
    };
    let hex = '0f007dff0026f7570312f67726f7570322f67726f7570332f706f696e7431';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = deleteOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (15, hex);
    it('.encode() should throw an Error', function () {
        try {
            let encoded = deleteOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode deleteNode: missing nid path present:', function () {
    let kpo = {
        opcode: 0x0f,
        sid: 125,
        type: 1,
        path: '/group1/group2/group3/point1'
    };
    let hex = '0f007dc2f67726f7570312f67726f7570322f67726f7570332f706f696e7431';

    it('.decode() should throw INVALID_NODE_TYPE error', function () {
        try {
            let decoded = deleteOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.INVALID_NODE_TYPE);
        }
    }); // (15, hex);
    it('.encode() should throw an Error', function () {
        try {
            let encoded = deleteOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode deleteNode: missing nid path not present:', function () {
    let kpo = {
        opcode: 0x0f,
        sid: 125,
        type: 1
    };
    let hex = '0fff001c2f67726f7570312f67726f7570322f67726f7570332f706f696e7431';

    it('.decode() should throw INVALID_NODE_TYPE error', function () {
        try {
            let decoded = deleteOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.INVALID_NODE_TYPE);
        }
    }); // (15, hex);
    it('.encode() should throw an Error', function () {
        try {
            let encoded = deleteOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode deleteNode: missing sid: type 1', function () {
    let kpo = {
        opcode: 0x0f,
        type: 1,
        nid: 2
    };
    let hex = '007dff001c2f67726f7570312f67726f7570322f67726f7570332f706f696e7431';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = deleteOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    });
    it('.encode() should throw an Error', function () {
        try {
            let encoded = deleteOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode deleteNode: invalid sid:', function () {
    /* let kpo = {
        opcode: 0x0f,
        sid: 0,
        type: 255,
        path: '/group1/group2/group3/point1'
    };*/

    let hex = '0f0000ff001c2f67726f7570312f67726f7570322f67726f7570332f706f696e7431';

    it('.decode() should throw INVALID_SEQUENCE_NUMBER error', function () {
        try {
            let decoded = deleteOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.INVALID_SEQUENCE_NUMBER);
        }
    });
});
