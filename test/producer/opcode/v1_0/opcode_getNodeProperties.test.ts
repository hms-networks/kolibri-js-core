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
import { GetNodePropertiesOpcode } from '../../../../src/producer/opcode/v1_0/get_node_properties_opcode';
import { hexToBuf } from '../../../test_utils';

const getNodePropertiesOpcode = new GetNodePropertiesOpcode();

describe('Opcode getNodeProperties:', function () {
    let kpo = {
        opcode: 0x0c,
        sid: 1547,
        type: 0,
        nid: 152
    };
    let hex = '0c060b000098';

    it('.encode() should return expected buffer hex string', function () {
        assert.strictEqual(getNodePropertiesOpcode.encode(kpo).toString('hex'), hex);
    });
    it('.decode() should throw PROTOCOL_ERROR error', function () {
        assert.strictEqual(
            JSON.stringify(getNodePropertiesOpcode.decode(hexToBuf(hex))),
            JSON.stringify(kpo)
        );
    });
});

describe('Opcode getNodeProperties: path', function () {
    let kpo = {
        opcode: 0x0c,
        sid: 1547,
        type: 255,
        path: '/group/point'
    };
    let hex = '0c060bff000c2f67726f75702f706f696e74';

    it('.encode() should return expected buffer hex string', function () {
        assert.strictEqual(getNodePropertiesOpcode.encode(kpo).toString('hex'), hex);
    });
    it('.decode() should throw PROTOCOL_ERROR error', function () {
        assert.strictEqual(
            JSON.stringify(getNodePropertiesOpcode.decode(hexToBuf(hex))),
            JSON.stringify(kpo)
        );
    });
});

describe('Opcode getNodeProperties: trailing byte:', function () {
    let hex = '0c060bff000c2f67726f75702f706f696e7400';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = getNodePropertiesOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (0x0c, hex);
});

describe('Opcode getNodeProperties: missing path:', function () {
    let kpo = {
        opcode: 0x0c,
        sid: 125,
        type: 255
    };
    let hex = '0c060b';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = getNodePropertiesOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    });
    it('.encode() should throw an Error', function () {
        expect(() => {
            getNodePropertiesOpcode.encode(kpo);
        }).toThrowError();
    });
});

describe('Opcode getNodeProperties: missing type:', function () {
    let hex = '0c000098';

    it('.decode() should throw INVALID_SEQUENCE_NUMBER error', function () {
        try {
            let decoded = getNodePropertiesOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.INVALID_SEQUENCE_NUMBER);
        }
    });
});

describe('Opcode getNodeProperties: missing sid:', function () {
    let kpo = {
        opcode: 0x0c,
        type: 255,
        path: '/group1/group2/group3/point1'
    };
    let hex = '0c060bff000c2f67726f75';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = getNodePropertiesOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (12, hex);
    it('.encode() should throw an Error', function () {
        try {
            let encoded = getNodePropertiesOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode getNodeProperties: missing opcode:', function () {
    let kpo = {
        sid: 125,
        type: 255,
        path: '/group1/group2/group3/point1'
    };
    let hex = '060bff000c2f67726f75702f706f696e74';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = getNodePropertiesOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (12, hex);
    it('.encode() should throw an Error', function () {
        try {
            let encoded = getNodePropertiesOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode getNodeProperties: missing nid with path present:', function () {
    let kpo = {
        opcode: 0x0c,
        sid: 125,
        type: 1,
        path: '/group1/group2/group3/point1'
    };
    let hex = '0c060bff000c2ff75702f706f696e74';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = getNodePropertiesOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (12, hex);
    it('.encode() should throw an Error', function () {
        try {
            let encoded = getNodePropertiesOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode getNodeProperties: missing nid:', function () {
    let kpo = {
        opcode: 0x0c,
        sid: 125,
        type: 1
    };
    let hex = '0c060';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = getNodePropertiesOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (12, hex);
    it('.encode() should throw an Error', function () {
        try {
            let encoded = getNodePropertiesOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode getNodeProperties: missing sid: path', function () {
    let kpo = {
        opcode: 0x0c,
        type: 1,
        nid: 2
    };
    let hex = '0c000098';

    it('.decode() should throw INVALID_SEQUENCE_NUMBER error', function () {
        try {
            let decoded = getNodePropertiesOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.INVALID_SEQUENCE_NUMBER);
        }
    }); // (12, hex);
    it('.encode() should throw an Error', function () {
        try {
            let encoded = getNodePropertiesOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode getNodeProperties: invalid sid:', function () {
    /* let kpo = {
        opcode: 0x0c,
        sid: 0,
        type: 0,
        nid: 152
    };*/
    let hex = '0c0000000098';

    it('.decode() should throw INVALID_SEQUENCE_NUMBER error', function () {
        try {
            let decoded = getNodePropertiesOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.INVALID_SEQUENCE_NUMBER);
        }
    }); // (kpo.opcode, hex);
});
