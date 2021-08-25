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
import { errorcode, KolibriError } from '../../../../src/common/errorcode';
import { CreateModifyNodeOpcode } from '../../../../src/producer/opcode/v1_0/create_modify_node_opcode';
import { CreateModifyNodeOpcode as V20CreateModifyNodeOpcode } from '../../../../src/producer/opcode/v2_0/create_modify_node_opcode';
import { hexToBuf } from '../../../test_utils';

describe.each([
    ['kolibri', {
        kpo: {
            opcode: 14,
            sid: 144,
            options: 8188,
            type: 0,
            path: 'smth',
            description: 'smth',
            flags: 1,
            dataType: 2,
            triggerMode: 4,
            triggerN: 2,
            triggerT: 3,
            triggerDomain: 2,
            qosLevel: 0,
            updateUrl: 'smth',
            history: 2,
            format: 'smth',
            scalingFactor: 34,
            scalingOffset: 344,
            writeRangeMin: 1,
            writeRangeMax: 3
        },
        opcode: new CreateModifyNodeOpcode(),
        hex:
            '0e00901ffc000004736d74680004736d7468010204020000000302000004736d74680002000473' +
            '6d7468404100000000000040758000000000003ff00000000000004008000000000000'
    }],
    ['v2.0.kolibri', {
        kpo: {
            opcode: 14,
            sid: 144,
            options: 7932, // updateUrl bit not set
            type: 0,
            path: 'smth',
            description: 'smth',
            flags: 1,
            dataType: 2,
            triggerMode: 8,
            triggerN: 2,
            triggerT: 3,
            triggerDomain: 2,
            qosLevel: 0,
            history: 2,
            format: 'smth',
            scalingFactor: 34,
            scalingOffset: 344,
            writeRangeMin: 1,
            writeRangeMax: 3
        },
        opcode: new V20CreateModifyNodeOpcode(),
        hex:
            '0e00901efc000004736d74680004736d7468010208400000000000000302000002000473' +
            '6d7468404100000000000040758000000000003ff00000000000004008000000000000'
    }]
])('Opcode createModifyNode: kolibri version: %s', (_kolibriVersion, input) => {
    it('.encode() should return expected buffer hex string', function () {
        let encoded = input.opcode.encode(input.kpo);
        let encodedHex = encoded.toString('hex');
        assert.strictEqual(encodedHex, input.hex);
    });
    it('.decode() should throw PROTOCOL_ERROR error', function () {
        let buffer = hexToBuf(input.hex);
        let decoded = JSON.stringify(input.opcode.decode(buffer));
        assert.strictEqual(decoded, JSON.stringify(input.kpo)
        );
    });

    it('Opcode createModifyNode: trailing byte: .decode() should throw PROTOCOL_ERROR error', function () {
        let hex =
            '0e00901ffc000004736d74680004736d7468010204020000000302000004736d746800020004736d746840' +
            '4100000000000040758000000000003ff0000000000000400800000000000011';
        try {
            let decoded = input.opcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    });
});

describe('Opcode createModifyNode: missing writeRangeMax:', function () {
    let kpo = {
        opcode: 14,
        sid: 144,
        options: 8188,
        type: 0,
        path: 'smth',
        description: 'smth',
        flags: 1,
        dataType: 2,
        triggerMode: 4,
        triggerN: 2,
        triggerT: 3,
        triggerDomain: 2,
        qosLevel: 0,
        updateUrl: 'smth',
        history: 2,
        format: 'smth',
        scalingFactor: 34,
        scalingOffset: 344,
        writeRangeMin: 1
    };
    let hex =
        '0e00901ffc04680004736d7468010204020000000302000004736d746800020004736d746840' +
        '4100000000000040758000000000003ff00000000000004008000000000000';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = new CreateModifyNodeOpcode().decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    });
    it('.encode() should throw an Error', function () {
        try {
            let encoded = new CreateModifyNodeOpcode().encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode createModifyNode: missing writeRangeMin:', function () {
    let kpo = {
        opcode: 14,
        sid: 144,
        options: 8188,
        type: 0,
        path: 'smth',
        description: 'smth',
        flags: 1,
        dataType: 2,
        triggerMode: 4,
        triggerN: 2,
        triggerT: 3,
        triggerDomain: 2,
        qosLevel: 0,
        updateUrl: 'smth',
        history: 2,
        format: 'smth',
        scalingFactor: 34,
        scalingOffset: 344,
        writeRangeMax: 3
    };
    let hex =
        '0e00901ffc000004736d74680004736d7468010204020000000302000004736d7468006d746840' +
        '4100000000000040758000000000003ff00000000000004008000000000000';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = new CreateModifyNodeOpcode().decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    });
    it('.encode() should throw an Error', function () {
        try {
            let encoded = new CreateModifyNodeOpcode().encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode createModifyNode: missing scalingOffset:', function () {
    let kpo = {
        opcode: 14,
        sid: 144,
        options: 8188,
        type: 0,
        path: 'smth',
        description: 'smth',
        flags: 1,
        dataType: 2,
        triggerMode: 4,
        triggerN: 2,
        triggerT: 3,
        triggerDomain: 2,
        qosLevel: 0,
        updateUrl: 'smth',
        history: 2,
        format: 'smth',
        scalingFactor: 34,
        writeRangeMin: 1,
        writeRangeMax: 3
    };
    let hex =
        '0e00901ffc000004736d74680004736d7468010204020000000302000004736d746800020004736d746840' +
        '41000000000000000000003ff00000000000004008000000000000';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = new CreateModifyNodeOpcode().decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    });
    it('.encode() should throw an Error', function () {
        try {
            let encoded = new CreateModifyNodeOpcode().encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode createModifyNode: missing scalingFactor:', function () {
    let kpo = {
        opcode: 14,
        sid: 144,
        options: 8188,
        type: 0,
        path: 'smth',
        description: 'smth',
        flags: 1,
        dataType: 2,
        triggerMode: 4,
        triggerN: 2,
        triggerT: 3,
        triggerDomain: 2,
        qosLevel: 0,
        updateUrl: 'smth',
        history: 2,
        format: 'smth',
        scalingOffset: 344,
        writeRangeMin: 1,
        writeRangeMax: 3
    };
    let hex =
        '0e00901ffc000004736d74680004736d7468010204020000000302000004004736d746840' +
        '4100000000000040758000000000003ff00000000000004008000000000000';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = new CreateModifyNodeOpcode().decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    });
    it('.encode() should throw an Error', function () {
        try {
            let encoded = new CreateModifyNodeOpcode().encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode createModifyNode: missing format:', function () {
    let kpo = {
        opcode: 14,
        sid: 144,
        options: 8188,
        type: 0,
        path: 'smth',
        description: 'smth',
        flags: 1,
        dataType: 2,
        triggerMode: 4,
        triggerN: 2,
        triggerT: 3,
        triggerDomain: 2,
        qosLevel: 0,
        updateUrl: 'smth',
        history: 2,
        scalingFactor: 34,
        scalingOffset: 344,
        writeRangeMin: 1,
        writeRangeMax: 3
    };
    let hex =
        '0e00901ffc000004736d74680004736d7468010204020000000302000004736d746800020004736d746840' +
        '4100000000000040758000000000003ff0000000000000000';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = new CreateModifyNodeOpcode().decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (14, hex);
    it('.encode() should throw an Error', function () {
        expect(() => {
            new CreateModifyNodeOpcode().encode(kpo);
        }).toThrowError();
    });
});

describe('Opcode createModifyNode: missing history:', function () {
    let kpo = {
        opcode: 14,
        sid: 144,
        options: 8188,
        type: 0,
        path: 'smth',
        description: 'smth',
        flags: 1,
        dataType: 2,
        triggerMode: 4,
        triggerN: 2,
        triggerT: 3,
        triggerDomain: 2,
        qosLevel: 0,
        updateUrl: 'smth',
        format: 'smth',
        scalingFactor: 34,
        scalingOffset: 344,
        writeRangeMin: 1,
        writeRangeMax: 3
    };
    let hex =
        '0e00901ffc000004736d74680004736d7468010204020000000302000004736d746800020004736d746840' +
        '41000000000000407583ff00000000000004008000000000000';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = new CreateModifyNodeOpcode().decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    });
    it('.encode() should throw an Error', function () {
        try {
            let encoded = new CreateModifyNodeOpcode().encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe.each([
    ['kolibri', {
        opcode: new CreateModifyNodeOpcode()
    }, true],
    ['v2.0.kolibri', {
        opcode: new V20CreateModifyNodeOpcode()
    }, false]
])('Opcode createModifyNode: missing updateUrl: kolibri version: %s', (_kolibriVersion, testRun, expected) => {
    it('.decode() should throw PROTOCOL_ERROR error', function () {
        let hex =
            '0e00901ffc000004736d74680004736d74680102040200000003020000020' +
            '004736d7468404100000000000040758000000000003ff00000000000004008000000000000';
        let error = null;
        try {
            let buffer = hexToBuf(hex);
            testRun.opcode.decode(buffer);
        }
        catch (err) {
            error = err;
        }
        finally {
            assert.strictEqual(error instanceof KolibriError, expected);
        }
    });
    it('.encode() should throw an Error', function () {
        let kpo = {
            opcode: 14,
            sid: 144,
            options: 8188,
            type: 0,
            path: 'smth',
            description: 'smth',
            flags: 1,
            dataType: 2,
            triggerMode: 4,
            triggerN: 2,
            triggerT: 3,
            triggerDomain: 2,
            qosLevel: 0,
            history: 2,
            format: 'smth',
            scalingFactor: 34,
            scalingOffset: 344,
            writeRangeMin: 1,
            writeRangeMax: 3
        };
        expect(() => {
            new CreateModifyNodeOpcode().encode(kpo);
        }).toThrowError();
    });
});

describe('Opcode createModifyNode: missing qosLevel:', function () {
    let kpo = {
        opcode: 14,
        sid: 144,
        options: 8188,
        type: 0,
        path: 'smth',
        description: 'smth',
        flags: 1,
        dataType: 2,
        triggerMode: 4,
        triggerN: 2,
        triggerT: 3,
        triggerDomain: 2,
        updateUrl: 'smth',
        history: 2,
        format: 'smth',
        scalingFactor: 34,
        scalingOffset: 344,
        writeRangeMin: 1,
        writeRangeMax: 3
    };
    let hex =
        '0e00901ffc000004736d74680004736d7468010204020000000302000004736d746800020004736d746840' +
        '41000000000000000003ff00000000000004008000000000000';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = new CreateModifyNodeOpcode().decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (14, hex);
    it('.encode() should throw an Error', function () {
        try {
            let encoded = new CreateModifyNodeOpcode().encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode createModifyNode: missing triggerDomain:', function () {
    let kpo = {
        opcode: 14,
        sid: 144,
        options: 8188,
        type: 0,
        path: 'smth',
        description: 'smth',
        flags: 1,
        dataType: 2,
        triggerMode: 4,
        triggerN: 2,
        triggerT: 3,
        qosLevel: 0,
        updateUrl: 'smth',
        history: 2,
        format: 'smth',
        scalingFactor: 34,
        scalingOffset: 344,
        writeRangeMin: 1,
        writeRangeMax: 3
    };
    let hex =
        '0e00901ffc000004736d74680004736d7468010204020000000302000004736d746800020004736d746840' +
        '4100000000000040758000000000000004008000000000000';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = new CreateModifyNodeOpcode().decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (14, hex);
    it('.encode() should throw an Error', function () {
        try {
            let encoded = new CreateModifyNodeOpcode().encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode createModifyNode: missing triggerT:', function () {
    let kpo = {
        opcode: 14,
        sid: 144,
        options: 8188,
        type: 0,
        path: 'smth',
        description: 'smth',
        flags: 1,
        dataType: 2,
        triggerMode: 4,
        triggerN: 2,
        triggerDomain: 2,
        qosLevel: 0,
        updateUrl: 'smth',
        history: 2,
        format: 'smth',
        scalingFactor: 34,
        scalingOffset: 344,
        writeRangeMin: 1,
        writeRangeMax: 3
    };
    let hex =
        '0e00901ffc000004736d74680004736d7468010204020000000302000004736d746800020004736d746840' +
        '410000000000004075803ff00000000000004008000000000000';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = new CreateModifyNodeOpcode().decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (14, hex);
    it('.encode() should throw an Error', function () {
        try {
            let encoded = new CreateModifyNodeOpcode().encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode createModifyNode: missing triggerN:', function () {
    let kpo = {
        opcode: 14,
        sid: 144,
        options: 8188,
        type: 0,
        path: 'smth',
        description: 'smth',
        flags: 1,
        dataType: 2,
        triggerMode: 4,
        triggerT: 3,
        triggerDomain: 2,
        qosLevel: 0,
        updateUrl: 'smth',
        history: 2,
        format: 'smth',
        scalingFactor: 34,
        scalingOffset: 344,
        writeRangeMin: 1,
        writeRangeMax: 3
    };
    let hex =
        '0e00901ffc000004736d74680004736d7468010204020000000302000004736d720004736d746840' +
        '4100000000000040758000000000003ff00000000000004008000000000000';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = new CreateModifyNodeOpcode().decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (14, hex);
    it('.encode() should throw an Error', function () {
        try {
            let encoded = new CreateModifyNodeOpcode().encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('TRIGGER_R Opcode createModifyNode: missing triggerN:', function () {
    let kpo = {
        opcode: 14,
        sid: 144,
        options: 8188,
        type: 0,
        path: 'smth',
        description: 'smth',
        flags: 1,
        dataType: 2,
        triggerMode: 4,
        triggerT: 3,
        triggerDomain: 2,
        qosLevel: 0,
        updateUrl: 'smth',
        history: 2,
        format: 'smth',
        scalingFactor: 34,
        scalingOffset: 344,
        writeRangeMin: 1,
        writeRangeMax: 3
    };
    let hex =
        '0e00901ffc000004736d74680004736d7468010204020000000302000004736d720004736d746840' +
        '4100000000000040758000000000003ff00000000000004008000000000000';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = new CreateModifyNodeOpcode().decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (14, hex);
    it('.encode() should throw an Error', function () {
        try {
            let encoded = new CreateModifyNodeOpcode().encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('TRIGGER_R_T Opcode createModifyNode: missing triggerT:', function () {
    let kpo = {
        opcode: 14,
        sid: 144,
        options: 8188,
        type: 0,
        path: 'smth',
        description: 'smth',
        flags: 1,
        dataType: 2,
        triggerMode: 4,
        triggerN: 3,
        triggerDomain: 2,
        qosLevel: 0,
        updateUrl: 'smth',
        history: 2,
        format: 'smth',
        scalingFactor: 34,
        scalingOffset: 344,
        writeRangeMin: 1,
        writeRangeMax: 3
    };
    let hex =
        '0e00901ffc000004736d74680004736d7468010204020000000302000004736d720004736d746840' +
        '4100000000000040758000000000003ff00000000000004008000000000000';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = new V20CreateModifyNodeOpcode().decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (14, hex);
    it('.encode() should throw an Error', function () {
        try {
            let encoded = new V20CreateModifyNodeOpcode().encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('TRIGGER_T_S Opcode createModifyNode: missing triggerN:', function () {
    let kpo = {
        opcode: 14,
        sid: 144,
        options: 8188,
        type: 0,
        path: 'smth',
        description: 'smth',
        flags: 1,
        dataType: 2,
        triggerMode: 9,
        triggerT: 3,
        triggerDomain: 2,
        qosLevel: 0,
        history: 2,
        format: 'smth',
        scalingFactor: 34,
        scalingOffset: 344,
        writeRangeMin: 1,
        writeRangeMax: 3
    };
    let hex =
        '0e00901ffc000004736d74680004736d7968010204020000000302000004736d720004736d746840' +
        '4100000000000040758000000000003ff00000000000004008000000000000';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = new V20CreateModifyNodeOpcode().decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (14, hex);
    it('.encode() should throw an Error', function () {
        try {
            let encoded = new V20CreateModifyNodeOpcode().encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('TRIGGER_T_S Opcode createModifyNode: missing triggerT:', function () {
    let kpo = {
        opcode: 14,
        sid: 144,
        options: 8188,
        type: 0,
        path: 'smth',
        description: 'smth',
        flags: 1,
        dataType: 2,
        triggerMode: 9,
        triggerT: 3,
        triggerDomain: 2,
        qosLevel: 0,
        history: 2,
        format: 'smth',
        scalingFactor: 34,
        scalingOffset: 344,
        writeRangeMin: 1,
        writeRangeMax: 3
    };
    let hex =
        '0e00901ffc000004736d79680004736d7468010204020000000302000004736d720004736d746840' +
        '4100000000000040758000000000003ff00000000000004008000000000000';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = new V20CreateModifyNodeOpcode().decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (14, hex);
    it('.encode() should throw an Error', function () {
        try {
            let encoded = new V20CreateModifyNodeOpcode().encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode createModifyNode: missing triggerMode:', function () {
    let kpo = {
        opcode: 14,
        sid: 144,
        options: 8188,
        type: 0,
        path: 'smth',
        description: 'smth',
        flags: 1,
        dataType: 2,
        triggerN: 2,
        triggerT: 3,
        triggerDomain: 2,
        qosLevel: 0,
        updateUrl: 'smth',
        history: 2,
        format: 'smth',
        scalingFactor: 34,
        scalingOffset: 344,
        writeRangeMin: 1,
        writeRangeMax: 3
    };
    let hex =
        '0e00901ffc000004736d74680004736d7468010204020000000302000004736d746800020004736d746840' +
        '4100000000000040758000000000003ff00000008000000000000';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = new CreateModifyNodeOpcode().decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (14, hex);
    it('.encode() should throw an Error', function () {
        try {
            let encoded = new CreateModifyNodeOpcode().encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode createModifyNode: missing dataType:', function () {
    let kpo = {
        opcode: 14,
        sid: 144,
        options: 8188,
        type: 0,
        path: 'smth',
        description: 'smth',
        flags: 1,
        triggerMode: 4,
        triggerN: 2,
        triggerT: 3,
        triggerDomain: 2,
        qosLevel: 0,
        updateUrl: 'smth',
        history: 2,
        format: 'smth',
        scalingFactor: 34,
        scalingOffset: 344,
        writeRangeMin: 1,
        writeRangeMax: 3
    };
    let hex =
        '0e00901ffc000004736d74680004736d7468010204020000000302000004736d746736d746840' +
        '4100000000000040758000000000003ff00000000000004008000000000000';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = new CreateModifyNodeOpcode().decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (14, hex);
    it('.encode() should throw INVALID_DATA_TYPE error', function () {
        try {
            let encoded = new CreateModifyNodeOpcode().encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.INVALID_DATA_TYPE);
        }
    });
});

describe('Opcode createModifyNode: missing flags:', function () {
    let kpo = {
        opcode: 14,
        sid: 144,
        options: 8188,
        type: 0,
        path: 'smth',
        description: 'smth',
        dataType: 2,
        triggerMode: 4,
        triggerN: 2,
        triggerT: 3,
        triggerDomain: 2,
        qosLevel: 0,
        updateUrl: 'smth',
        history: 2,
        format: 'smth',
        scalingFactor: 34,
        scalingOffset: 344,
        writeRangeMin: 1,
        writeRangeMax: 3
    };
    let hex =
        '0e00901ffc000004736d74680004736d746801020402004736d746800020004736d746840' +
        '4100000000000040758000000000003ff00000000000004008000000000000';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = new CreateModifyNodeOpcode().decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (14, hex);
    it('.encode() should throw an Error', function () {
        try {
            let encoded = new CreateModifyNodeOpcode().encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode createModifyNode: missing description:', function () {
    let kpo = {
        opcode: 14,
        sid: 144,
        options: 8188,
        type: 0,
        path: 'smth',
        flags: 1,
        dataType: 2,
        triggerMode: 4,
        triggerN: 2,
        triggerT: 3,
        triggerDomain: 2,
        qosLevel: 0,
        updateUrl: 'smth',
        history: 2,
        format: 'smth',
        scalingFactor: 34,
        scalingOffset: 344,
        writeRangeMin: 1,
        writeRangeMax: 3
    };
    let hex =
        '0e00901ffc000004736d74680004736d74604020000000302000004736d746800020004736d746840' +
        '4100000000000040758000000000003ff00000000000004008000000000000';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = new CreateModifyNodeOpcode().decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (14, hex);
    it('.encode() should throw an Error', function () {
        expect(() => {
            new CreateModifyNodeOpcode().encode(kpo);
        }).toThrowError();
    });
});

describe('Opcode createModifyNode: missing path:', function () {
    let kpo = {
        opcode: 14,
        sid: 144,
        options: 8188,
        type: 0,
        description: 'smth',
        flags: 1,
        dataType: 2,
        triggerMode: 4,
        triggerN: 2,
        triggerT: 3,
        triggerDomain: 2,
        qosLevel: 0,
        updateUrl: 'smth',
        history: 2,
        format: 'smth',
        scalingFactor: 34,
        scalingOffset: 344,
        writeRangeMin: 1,
        writeRangeMax: 3
    };
    let hex =
        '0e00901ffc000004736d7466d7468010204020000000302000004736d746800020004736d746840' +
        '4100000000000040758000000000003ff00000000000004008000000000000';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = new CreateModifyNodeOpcode().decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    });
    it('.encode() should throw an Error', function () {
        expect(() => {
            new CreateModifyNodeOpcode().encode(kpo);
        }).toThrowError();
    });
});

describe('Opcode createModifyNode: missing type:', function () {
    let kpo = {
        opcode: 14,
        sid: 144,
        options: 8188,
        path: 'smth',
        description: 'smth',
        flags: 1,
        dataType: 2,
        triggerMode: 4,
        triggerN: 2,
        triggerT: 3,
        triggerDomain: 2,
        qosLevel: 0,
        updateUrl: 'smth',
        history: 2,
        format: 'smth',
        scalingFactor: 34,
        scalingOffset: 344,
        writeRangeMin: 1,
        writeRangeMax: 3
    };
    let hex =
        '0e00901ffc00004680004736d7468010204020000000302000004736d746800020004736d746840' +
        '4100000000000040758000000000003ff00000000000004008000000000000';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = new CreateModifyNodeOpcode().decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    });
    it('.encode() should throw an Error', function () {
        try {
            let encoded = new CreateModifyNodeOpcode().encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode createModifyNode: missing options:', function () {
    let kpo = {
        opcode: 14,
        sid: 144,
        type: 0,
        path: 'smth',
        description: 'smth',
        flags: 1,
        dataType: 2,
        triggerMode: 4,
        triggerN: 2,
        triggerT: 3,
        triggerDomain: 2,
        qosLevel: 0,
        updateUrl: 'smth',
        history: 2,
        format: 'smth',
        scalingFactor: 34,
        scalingOffset: 344,
        writeRangeMin: 1,
        writeRangeMax: 3
    };
    let hex =
        '0e00901c000004736d74680004736d7468010204020000000302000004736d746800020004736d746840' +
        '4100000000000040758000000000003ff00000000000004008000000000000';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = new CreateModifyNodeOpcode().decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    });
    it('.encode() should throw an Error', function () {
        try {
            let encoded = new CreateModifyNodeOpcode().encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode createModifyNode: missing sid:', function () {
    let kpo = {
        opcode: 14,
        options: 8188,
        type: 0,
        path: 'smth',
        description: 'smth',
        flags: 1,
        dataType: 2,
        triggerMode: 4,
        triggerN: 2,
        triggerT: 3,
        triggerDomain: 2,
        qosLevel: 0,
        updateUrl: 'smth',
        history: 2,
        format: 'smth',
        scalingFactor: 34,
        scalingOffset: 344,
        writeRangeMin: 1,
        writeRangeMax: 3
    };
    let hex =
        '0effc000004736d74680004736d7468010204020000000302000004736d746800020004736d746840' +
        '4100000000000040758000000000003ff00000000000004008000000000000';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = new CreateModifyNodeOpcode().decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    });
    it('.encode() should throw an Error', function () {
        try {
            let encoded = new CreateModifyNodeOpcode().encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode createModifyNode: missing opcode:', function () {
    let kpo = {
        sid: 144,
        options: 8188,
        type: 0,
        path: 'smth',
        description: 'smth',
        flags: 1,
        dataType: 2,
        triggerMode: 4,
        triggerN: 2,
        triggerT: 3,
        triggerDomain: 2,
        qosLevel: 0,
        updateUrl: 'smth',
        history: 2,
        format: 'smth',
        scalingFactor: 34,
        scalingOffset: 344,
        writeRangeMin: 1,
        writeRangeMax: 3
    };
    let hex =
        '00901ffc000004736d74680004736d7468010204020000000302000004736d746800020004736d746840' +
        '4100000000000040758000000000003ff00000000000004008000000000000';

    it('.decode() should throw INVALID_OPTION error', function () {
        try {
            let decoded = new CreateModifyNodeOpcode().decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.INVALID_OPTION);
        }
    }); // (14, hex);
    it('.encode() should throw an Error', function () {
        expect(() => {
            new CreateModifyNodeOpcode().encode(kpo);
        }).toThrowError();
    });
});

describe('Opcode createModifyNode: invalid sid:', function () {
    let hex =
        '0e00001ffc000004736d74680004736d7468010204020000000302000004736d746800020004736d746840' +
        '4100000000000040758000000000003ff00000000000004008000000000000';

    it('.decode() should throw INVALID_SEQUENCE_NUMBER error', function () {
        try {
            let decoded = new CreateModifyNodeOpcode().decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.INVALID_SEQUENCE_NUMBER);
        }
    });
});
