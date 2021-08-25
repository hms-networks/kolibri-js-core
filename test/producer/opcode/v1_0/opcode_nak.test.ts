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
import { NakOpcode } from '../../../../src/producer/opcode/v1_0/nak_opcode';
import { hexToBuf } from '../../../test_utils';

const nakOpcode = new NakOpcode();

describe('Opcode nak:', function () {
    let kpo = {
        opcode: 0x01,
        sid: 152,
        error: 5
    };
    let hex = '01009805';

    it('.encode() should return expected buffer hex string', function () {
        assert.strictEqual(nakOpcode.encode(kpo).toString('hex'), hex);
    });
    it('.decode() should throw PROTOCOL_ERROR error', function () {
        assert.strictEqual(
            JSON.stringify(nakOpcode.decode(hexToBuf(hex))),
            JSON.stringify(kpo)
        );
    });
});

describe('Opcode nak: nid', function () {
    let kpo = {
        opcode: 0x01,
        sid: 152,
        error: 5,
        nid: 1
    };
    let hex = '010098050001';

    it('.encode() should return expected buffer hex string', function () {
        assert.strictEqual(nakOpcode.encode(kpo).toString('hex'), hex);
    });
    it('.decode() should throw PROTOCOL_ERROR error', function () {
        assert.strictEqual(
            JSON.stringify(nakOpcode.decode(hexToBuf(hex))),
            JSON.stringify(kpo)
        );
    });
});

describe('Opcode nak: trailing byte:', function () {
    let hex = '01009805000100';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = nakOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (0x01, hex);
});

describe('Opcode nak: missing error:', function () {
    let kpo = {
        opcode: 0x01,
        sid: 152,
        nid: 1
    };
    let hex = '0100980001';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = nakOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (1, hex);
    it('.encode() should throw an Error', function () {
        try {
            let encoded = nakOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode nak: missing sid:', function () {
    let kpo = {
        opcode: 0x01,
        error: 5,
        nid: 1
    };

    it('.encode() should throw an Error', function () {
        try {
            let encoded = nakOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode nak: missing opcode:', function () {
    let kpo = {
        sid: 152,
        error: 5,
        nid: 1
    };
    let hex = '0098050001';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = nakOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (1, hex);
    it('.encode() should throw an Error', function () {
        try {
            let encoded = nakOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode nak: opcode as string:', function () {
    let kpo = {
        opcode: '0x01',
        sid: 152,
        error: 5,
        nid: 1
    };

    it('.encode() should throw an Error', function () {
        try {
            let encoded = nakOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode nak: sid as string:', function () {
    let kpo = {
        opcode: 0x01,
        sid: 'f',
        error: 5,
        nid: 1
    };

    it('.encode() should throw an Error', function () {
        try {
            let encoded = nakOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode nak: error as string:', function () {
    let kpo = {
        opcode: 0x01,
        sid: 152,
        error: 'f',
        nid: 1
    };

    it('.encode() should throw an Error', function () {
        try {
            let encoded = nakOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode nak: nid as string:', function () {
    let kpo = {
        opcode: 0x01,
        sid: 152,
        error: 5,
        nid: 'f'
    };

    it('.encode() should throw an Error', function () {
        try {
            let encoded = nakOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode nak: invalid sid:', function () {
    /* let kpo = {
        opcode: 0x01,
        sid: 0,
        error: 5,
        nid: 1
    };*/

    let hex = '010000050001';

    it('.decode() should throw INVALID_SEQUENCE_NUMBER error', function () {
        try {
            let decoded = nakOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.INVALID_SEQUENCE_NUMBER);
        }
    }); // (kpo.opcode, hex);
});
