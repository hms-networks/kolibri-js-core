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
import { EmergencyOpcode } from '../../../../src/producer/opcode/v1_0/emergency_opcode';
import { hexToBuf } from '../../../test_utils';

const emergencyOpcode = new EmergencyOpcode();

describe('Opcode emergency: 0', function () {
    let kpo = {
        opcode: 0x10,
        sid: 1245,
        emergencies: 0,
        timestamp: 533507064
    };
    let hex = '1004dd000000001fccabf8';

    it('.encode() should return expected buffer hex string', function () {
        assert.strictEqual(emergencyOpcode.encode(kpo).toString('hex'), hex);
    });
    it('.decode() should throw PROTOCOL_ERROR error', function () {
        assert.strictEqual(
            JSON.stringify(emergencyOpcode.decode(hexToBuf(hex))),
            JSON.stringify(kpo)
        );
    });
});

describe('Opcode emergency: 2', function () {
    let kpo = {
        opcode: 0x10,
        sid: 55555,
        emergencies: 2,
        timestamp: 666666666
    };
    let hex = '10d9030000000227bc86aa';

    it('.encode() should return expected buffer hex string', function () {
        assert.strictEqual(emergencyOpcode.encode(kpo).toString('hex'), hex);
    });
    it('.decode() should throw PROTOCOL_ERROR error', function () {
        assert.strictEqual(
            JSON.stringify(emergencyOpcode.decode(hexToBuf(hex))),
            JSON.stringify(kpo)
        );
    });
});

describe('Opcode emergency: trailing byte:', function () {
    let hex = '10d9030000000227bc86aa00';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = emergencyOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (0x10, hex);
});

describe('Opcode emergency: missing timestamp:', function () {
    let kpo = {
        opcode: 0x10,
        sid: 55555,
        emergencies: 2
    };
    let hex = '10d90300000002';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = emergencyOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (16, hex);
    it('.encode() should throw an Error', function () {
        try {
            let encoded = emergencyOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode emergency: missing emergencies:', function () {
    let kpo = {
        opcode: 0x10,
        sid: 55555,
        timestamp: 666666666
    };
    let hex = '10d903000027bc86aa';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = emergencyOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (16, hex);
    it('.encode() should throw an Error', function () {
        try {
            let encoded = emergencyOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode emergency: missing sid:', function () {
    let kpo = {
        opcode: 0x10,
        emergencies: 2,
        timestamp: 666666666
    };
    let hex = '100000000227bc86aa';

    it('.decode() should throw INVALID_SEQUENCE_NUMBER error', function () {
        try {
            let decoded = emergencyOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.INVALID_SEQUENCE_NUMBER);
        }
    }); // (16, hex);
    it('.encode() should throw an Error', function () {
        try {
            let encoded = emergencyOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode emergency: missing opcode:', function () {
    let kpo = {
        sid: 55555,
        emergencies: 2,
        timestamp: 666666666
    };
    let hex = 'd9030000000227bc86aa';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = emergencyOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    });
    it('.encode() should throw an Error', function () {
        try {
            let encoded = emergencyOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode emergency: timestamp as string:', function () {
    let kpo = {
        opcode: 0x10,
        sid: 55555,
        emergencies: 2,
        timestamp: '66666f666'
    };

    it('.encode() should throw an Error', function () {
        try {
            let encoded = emergencyOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode emergency: emergencies as string:', function () {
    let kpo = {
        opcode: 0x10,
        sid: 55555,
        emergencies: 'f',
        timestamp: 666666666
    };

    it('.encode() should throw an Error', function () {
        try {
            let encoded = emergencyOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode emergency: sid as string:', function () {
    let kpo = {
        opcode: 0x10,
        sid: 'f',
        emergencies: 2,
        timestamp: 666666666
    };

    it('.encode() should throw an Error', function () {
        try {
            let encoded = emergencyOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode emergency: invalid sid:', function () {
    /* let kpo = {
        opcode: 0x10,
        sid: 0,
        emergencies: 2,
        timestamp: 666666666
    };*/

    let hex = '100000000000001fccabf8';

    it('.decode() should throw INVALID_SEQUENCE_NUMBER error', function () {
        try {
            let decoded = emergencyOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.INVALID_SEQUENCE_NUMBER);
        }
    });
});
