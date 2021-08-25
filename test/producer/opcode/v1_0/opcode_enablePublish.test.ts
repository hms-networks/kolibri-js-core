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
import { EnablePublishOpcode } from '../../../../src/producer/opcode/v1_0/enable_publish_opcode';
import { hexToBuf } from '../../../test_utils';

const enablePublishOpcode = new EnablePublishOpcode();

describe('Opcode enablePublish: sid: 58884', function () {
    let kpo = {
        opcode: 0x07,
        sid: 58884,
        options: 3
    };
    let hex = '07e60403';

    it('.encode() should return expected buffer hex string', function () {
        assert.strictEqual(enablePublishOpcode.encode(kpo).toString('hex'), hex);
    });
    it('.decode() should throw PROTOCOL_ERROR error', function () {
        assert.strictEqual(
            JSON.stringify(enablePublishOpcode.decode(hexToBuf(hex))),
            JSON.stringify(kpo)
        );
    });
});

describe('Opcode enablePublish: sid: 59', function () {
    let kpo = {
        opcode: 0x07,
        sid: 59,
        options: 0
    };
    let hex = '07003b00';

    it('.encode() should return expected buffer hex string', function () {
        assert.strictEqual(enablePublishOpcode.encode(kpo).toString('hex'), hex);
    });
    it('.decode() should throw PROTOCOL_ERROR error', function () {
        assert.strictEqual(
            JSON.stringify(enablePublishOpcode.decode(hexToBuf(hex))),
            JSON.stringify(kpo)
        );
    });
});

describe('Opcode enablePublish: trailing byte:', function () {
    let hex = '07003b0088';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = enablePublishOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (0x07, hex);
});

describe('Opcode enablePublish: missing options:', function () {
    let kpo = {
        opcode: 0x07,
        sid: 59
    };
    let hex = '07e604';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = enablePublishOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (7, hex);
    it('.encode() should throw an Error', function () {
        try {
            let encoded = enablePublishOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode enablePublish: missing sid:', function () {
    let kpo = {
        opcode: 0x07,
        options: 0
    };
    let hex = '0703';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = enablePublishOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (7, hex);
    it('.encode() should throw an Error', function () {
        try {
            let encoded = enablePublishOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode enablePublish: missing opcode:', function () {
    let kpo = {
        sid: 59,
        options: 0
    };
    let hex = 'e60403';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = enablePublishOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (7, hex);
    it('.encode() should throw an Error', function () {
        try {
            let encoded = enablePublishOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode enablePublish: opcode as string:', function () {
    let kpo = {
        opcode: '0x07',
        sid: 59,
        options: 0
    };

    it('.encode() should throw an Error', function () {
        try {
            let encoded = enablePublishOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode enablePublish: sid as string:', function () {
    let kpo = {
        opcode: 0x07,
        sid: 'f',
        options: 0
    };

    it('.encode() should throw an Error', function () {
        try {
            let encoded = enablePublishOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode enablePublish: options as string:', function () {
    let kpo = {
        opcode: 0x07,
        sid: 59,
        options: 'f'
    };

    it('.encode() should throw an Error', function () {
        try {
            let encoded = enablePublishOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode enablePublish: invalid sid:', function () {
    /* let kpo = {
        opcode: 0x07,
        sid: 0,
        options: 3
    };*/
    let hex = '07000003';

    it('.decode() should throw INVALID_SEQUENCE_NUMBER error', function () {
        try {
            let decoded = enablePublishOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.INVALID_SEQUENCE_NUMBER);
        }
    }); // (kpo.opcode, hex);
});
