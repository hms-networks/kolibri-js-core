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
import {GetTimeResponseOpcode} from '../../../../src/producer/opcode/v1_0/get_time_response_opcode';
import { hexToBuf } from '../../../test_utils';

const getTimeResponseOpcode = new GetTimeResponseOpcode();

describe('Opcode getTimeResponse:', function () {
    let kpo = {
        opcode: 0x06,
        sid: 3345,
        timestamp: 541562400
    };
    let hex = '060d1120479620';

    it('.encode() should return expected buffer hex string', function () {
        assert.strictEqual(getTimeResponseOpcode.encode(kpo).toString('hex'), hex);
    });
    it('.decode() should throw PROTOCOL_ERROR error', function () {
        assert.strictEqual(
            JSON.stringify(getTimeResponseOpcode.decode(hexToBuf(hex))),
            JSON.stringify(kpo)
        );
    });
});

describe('Opcode getTimeResponse: trailing byte:', function () {
    let hex = '060d112047962088';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = getTimeResponseOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (0x06, hex);
});

describe('Opcode getTimeResponse: missing timestamp:', function () {
    let kpo = {
        opcode: 0x06,
        sid: 3345
    };
    let hex = '060d11';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = getTimeResponseOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    });
    it('.encode() should throw an Error', function () {
        try {
            let encoded = getTimeResponseOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode getTimeResponse: missing sid:', function () {
    let kpo = {
        opcode: 0x06,
        timestamp: 541562400
    };
    let hex = '0620479620';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = getTimeResponseOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (6, hex);
    it('.encode() should throw an Error', function () {
        try {
            let encoded = getTimeResponseOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode getTimeResponse: missing opcode:', function () {
    let kpo = {
        sid: 3345,
        timestamp: 541562400
    };
    let hex = '0d1120479620';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = getTimeResponseOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (6, hex);
    it('.encode() should throw an Error', function () {
        try {
            let encoded = getTimeResponseOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode getTimeResponse: timestamp as string:', function () {
    let kpo = {
        opcode: 0x06,
        sid: 3345,
        timestamp: '54156f400'
    };

    it('.encode() should throw an Error', function () {
        try {
            let encoded = getTimeResponseOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode getTimeResponse: sid as string:', function () {
    let kpo = {
        opcode: 0x06,
        sid: 'f',
        timestamp: 541562400
    };

    it('.encode() should throw an Error', function () {
        try {
            let encoded = getTimeResponseOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode getTimeResponse: opcode as string:', function () {
    let kpo = {
        opcode: '0x06',
        sid: 3345,
        timestamp: 541562400
    };

    it('.encode() should throw an Error', function () {
        try {
            let encoded = getTimeResponseOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode getTimeResponse: invalid sid:', function () {
    /* let kpo = {
        opcode: 0x06,
        sid: 0,
        timestamp: 541562400
    };*/

    let hex = '06000000479620';

    it('.decode() should throw INVALID_SEQUENCE_NUMBER error', function () {
        try {
            let decoded = getTimeResponseOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.INVALID_SEQUENCE_NUMBER);
        }
    }); // (kpo.opcode, hex);
});
