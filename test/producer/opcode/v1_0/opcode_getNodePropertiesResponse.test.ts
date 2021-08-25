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
import { GetNodePropertiesResponseOpcode } from
    '../../../../src/producer/opcode/v1_0/get_node_properties_response_opcode';
import { hexToBuf } from '../../../test_utils';

const getNodePropertiesResponseOpcode = new GetNodePropertiesResponseOpcode();

describe('Opcode getNodePropertiesResponse: asdf', function () {
    let kpo = {
        opcode: 0x0d,
        sid: 1547,
        type: 0,
        nid: 12,
        path: 'asdf',
        description: 'fff',
        flags: 1,
        dataType: 1,
        triggerMode: 0,
        triggerDomain: 0,
        qosLevel: 0,
        updateUrl: 'bbb',
        history: 0,
        format: 'asdf',
        scalingFactor: 1,
        scalingOffset: 0,
        writeRangeMin: 1,
        writeRangeMax: 0
    };
    let hex =
        '0d060b00000c000461736466000366666601010000000003626262000000046173646' +
        '63ff000000000000000000000000000003ff00000000000000000000000000000';

    it('.encode() should return expected buffer hex string', function () {
        assert.strictEqual(getNodePropertiesResponseOpcode.encode(kpo).toString('hex'), hex);
    });
    it('.decode() should throw PROTOCOL_ERROR error', function () {
        assert.strictEqual(
            JSON.stringify(getNodePropertiesResponseOpcode.decode(hexToBuf(hex))),
            JSON.stringify(kpo)
        );
    });
});

describe('Opcode getNodePropertiesResponse: stairway to heaven', function () {
    let kpo = {
        opcode: 0x0d,
        sid: 58888,
        type: 0,
        nid: 12,
        path: 'stairway to heaven',
        description: 'example',
        flags: 1,
        dataType: 1,
        triggerMode: 0,
        triggerDomain: 0,
        qosLevel: 0,
        updateUrl: 'http://example.org',
        history: 0,
        format: 'unknown',
        scalingFactor: 1,
        scalingOffset: 0,
        writeRangeMin: 1,
        writeRangeMax: 0
    };
    let hex =
        '0de60800000c0012737461697277617920746f2068656176656e00076578616d706c65010100' +
        '00000012687474703a2f2f6578616d706c652e6f726700000007756e6b6e6f776e3ff0000000' +
        '00000000000000000000003ff00000000000000000000000000000';

    it('.encode() should return expected buffer hex string', function () {
        assert.strictEqual(getNodePropertiesResponseOpcode.encode(kpo).toString('hex'), hex);
    });
    it('.decode() should throw PROTOCOL_ERROR error', function () {
        assert.strictEqual(
            JSON.stringify(getNodePropertiesResponseOpcode.decode(hexToBuf(hex))),
            JSON.stringify(kpo)
        );
    });
});

describe('Opcode getNodePropertiesResponse: trailing byte:', function () {
    let hex =
        '0de60800000c0012737461697277617920746f2068656176656e00076578616d706c65010100' +
        '00000012687474703a2f2f6578616d706c652e6f726700000007756e6b6e6f776e3ff0000000' +
        '00000000000000000000003ff00000000000000000000000000000aa';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = getNodePropertiesResponseOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (0x0d, hex);
});

describe('Opcode getNodePropertiesResponse: missing writeRangeMax:', function () {
    let kpo = {
        opcode: 0x0d,
        sid: 58888,
        type: 0,
        nid: 12,
        path: 'stairway to heaven',
        description: 'example',
        flags: 1,
        dataType: 1,
        triggerMode: 0,
        triggerDomain: 0,
        qosLevel: 0,
        updateUrl: 'http://example.org',
        history: 0,
        format: 'unknown',
        scalingFactor: 1,
        scalingOffset: 0,
        writeRangeMin: 1
    };
    let hex =
        '0d060b00000c000461736466000366666601010000000003626262000000046173646' +
        '63ff000000000000000000000000000003ff0000000000000000000000000';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = getNodePropertiesResponseOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (13, hex);
    it('.encode() should throw an Error', function () {
        try {
            let encoded = getNodePropertiesResponseOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode getNodePropertiesResponse: missing writeRangeMin:', function () {
    let kpo = {
        opcode: 0x0d,
        sid: 58888,
        type: 0,
        nid: 12,
        path: 'stairway to heaven',
        description: 'example',
        flags: 1,
        dataType: 1,
        triggerMode: 0,
        triggerDomain: 0,
        qosLevel: 0,
        updateUrl: 'http://example.org',
        history: 0,
        format: 'unknown',
        scalingFactor: 1,
        scalingOffset: 0,
        writeRangeMax: 0
    };
    let hex =
        '0d060b00000c000461736466000366666601010000000003626262000000046173646' +
        '63ff000000000000000000000000000003ff000000000000000000000000';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = getNodePropertiesResponseOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (13, hex);
    it('.encode() should throw an Error', function () {
        try {
            let encoded = getNodePropertiesResponseOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode getNodePropertiesResponse: missing scalingOffset: writeRangeMin', function () {
    let kpo = {
        opcode: 0x0d,
        sid: 58888,
        type: 0,
        nid: 12,
        path: 'stairway to heaven',
        description: 'example',
        flags: 1,
        dataType: 1,
        triggerMode: 0,
        triggerDomain: 0,
        qosLevel: 0,
        updateUrl: 'http://example.org',
        history: 0,
        format: 'unknown',
        scalingFactor: 1,
        writeRangeMin: 1,
        writeRangeMax: 0
    };
    let hex =
        '0d060b00000c000461736466000366666601010000000003626262000000046173646' +
        '63ff000000000000000000000000000003ff0000000000000000000000';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = getNodePropertiesResponseOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (13, hex);
    it('.encode() should throw an Error', function () {
        try {
            let encoded = getNodePropertiesResponseOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode getNodePropertiesResponse: missing scalingOffset:', function () {
    let kpo = {
        opcode: 0x0d,
        sid: 58888,
        type: 0,
        nid: 12,
        path: 'stairway to heaven',
        description: 'example',
        flags: 1,
        dataType: 1,
        triggerMode: 0,
        triggerDomain: 0,
        qosLevel: 0,
        updateUrl: 'http://example.org',
        history: 0,
        format: 'unknown',
        scalingOffset: 0,
        writeRangeMin: 1,
        writeRangeMax: 0
    };
    let hex =
        '0d060b00000c000461736466000366666601010000000003626262000000046173646' +
        '63ff00000000000000000000000000000000000000000000000000000000';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = getNodePropertiesResponseOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (13, hex);
    it('.encode() should throw an Error', function () {
        try {
            let encoded = getNodePropertiesResponseOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode getNodePropertiesResponse: missing format:', function () {
    let kpo = {
        opcode: 0x0d,
        sid: 58888,
        type: 0,
        nid: 12,
        path: 'stairway to heaven',
        description: 'example',
        flags: 1,
        dataType: 1,
        triggerMode: 0,
        triggerDomain: 0,
        qosLevel: 0,
        updateUrl: 'http://example.org',
        history: 0,
        scalingFactor: 1,
        scalingOffset: 0,
        writeRangeMin: 1,
        writeRangeMax: 0
    };
    let hex =
        '0d060b00000c000461736466000366666601010000000003626262000000046173646' +
        '63ff00000000000000000003ff00000000000000000000000000000';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = getNodePropertiesResponseOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (13, hex);
    it('.encode() should throw an Error', function () {
        expect(() => {
            getNodePropertiesResponseOpcode.encode(kpo);
        }).toThrowError();
    });
});

describe('Opcode getNodePropertiesResponse: missing history:', function () {
    let kpo = {
        opcode: 0x0d,
        sid: 58888,
        type: 0,
        nid: 12,
        path: 'stairway to heaven',
        description: 'example',
        flags: 1,
        dataType: 1,
        triggerMode: 0,
        triggerDomain: 0,
        qosLevel: 0,
        updateUrl: 'http://example.org',
        format: 'unknown',
        scalingFactor: 1,
        scalingOffset: 0,
        writeRangeMin: 1,
        writeRangeMax: 0
    };
    let hex =
        '0d060b00000c000461736466000366666601010000000003626262000000046173646' +
        '000000000000000003ff00000000000000000000000000000';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = getNodePropertiesResponseOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (11, hex);
    it('.encode() should throw an Error', function () {
        try {
            let encoded = getNodePropertiesResponseOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode getNodePropertiesResponse: missing updateUrl:', function () {
    let kpo = {
        opcode: 0x0d,
        sid: 58888,
        type: 0,
        nid: 12,
        path: 'stairway to heaven',
        description: 'example',
        flags: 1,
        dataType: 1,
        triggerMode: 0,
        triggerDomain: 0,
        qosLevel: 0,
        history: 0,
        format: 'unknown',
        scalingFactor: 1,
        scalingOffset: 0,
        writeRangeMin: 1,
        writeRangeMax: 0
    };
    let hex =
        '0d060b00000c0004617364660003666666010100000000036262620000' +
        '63ff000000000000000000000000000003ff00000000000000000000000000000';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = getNodePropertiesResponseOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (13, hex);
    it('.encode() should throw an Error', function () {
        expect(() => {
            getNodePropertiesResponseOpcode.encode(kpo);
        }).toThrowError();
    });
});

describe('Opcode getNodePropertiesResponse: missing qosLevel:', function () {
    let kpo = {
        opcode: 0x0d,
        sid: 58888,
        type: 0,
        nid: 12,
        path: 'stairway to heaven',
        description: 'example',
        flags: 1,
        dataType: 1,
        triggerMode: 0,
        triggerDomain: 0,
        updateUrl: 'http://example.org',
        history: 0,
        format: 'unknown',
        scalingFactor: 1,
        scalingOffset: 0,
        writeRangeMin: 1,
        writeRangeMax: 0
    };
    let hex =
        '0d060b00000c00046173646600036000003626262000000046173646' +
        '63ff000000000000000000000000000003ff00000000000000000000000000000';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = getNodePropertiesResponseOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (13, hex);
    it('.encode() should throw an Error', function () {
        try {
            let encoded = getNodePropertiesResponseOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode getNodePropertiesResponse: missing triggerDomain:', function () {
    let kpo = {
        opcode: 0x0d,
        sid: 58888,
        type: 0,
        nid: 12,
        path: 'stairway to heaven',
        description: 'example',
        flags: 1,
        dataType: 1,
        triggerMode: 0,
        qosLevel: 0,
        updateUrl: 'http://example.org',
        history: 0,
        format: 'unknown',
        scalingFactor: 1,
        scalingOffset: 0,
        writeRangeMin: 1,
        writeRangeMax: 0
    };
    let hex =
        '0d060b00000c00046173646600036666660101000000000000046173646' +
        '63ff000000000000000000000000000003ff00000000000000000000000000000';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = getNodePropertiesResponseOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (13, hex);
    it('.encode() should throw an Error', function () {
        try {
            let encoded = getNodePropertiesResponseOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode getNodePropertiesResponse: missing triggerMode:', function () {
    let kpo = {
        opcode: 0x0d,
        sid: 58888,
        type: 0,
        nid: 12,
        path: 'stairway to heaven',
        description: 'example',
        flags: 1,
        dataType: 1,
        triggerDomain: 0,
        qosLevel: 0,
        updateUrl: 'http://example.org',
        history: 0,
        format: 'unknown',
        scalingFactor: 1,
        scalingOffset: 0,
        writeRangeMin: 1,
        writeRangeMax: 0
    };
    let hex =
        '0d060b00000466000366666601010000000003626262000000046173646' +
        '63ff000000000000000000000000000003ff00000000000000000000000000000';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = getNodePropertiesResponseOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (13, hex);
    it('.encode() should throw an Error', function () {
        try {
            let encoded = getNodePropertiesResponseOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode getNodePropertiesResponse: missing dataType:', function () {
    let kpo = {
        opcode: 0x0d,
        sid: 58888,
        type: 0,
        nid: 12,
        path: 'stairway to heaven',
        description: 'example',
        flags: 1,
        triggerMode: 0,
        triggerDomain: 0,
        qosLevel: 0,
        updateUrl: 'http://example.org',
        history: 0,
        format: 'unknown',
        scalingFactor: 1,
        scalingOffset: 0,
        writeRangeMin: 1,
        writeRangeMax: 0
    };
    let hex =
        '0d060b00000c000461736401010000000003626262000000046173646' +
        '63ff000000000000000000000000000003ff00000000000000000000000000000';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = getNodePropertiesResponseOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (13, hex);
    it('.encode() should throw an Error', function () {
        try {
            let encoded = getNodePropertiesResponseOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode getNodePropertiesResponse: missing flags:', function () {
    let kpo = {
        opcode: 0x0d,
        sid: 58888,
        type: 0,
        nid: 12,
        path: 'stairway to heaven',
        description: 'example',
        dataType: 1,
        triggerMode: 0,
        triggerDomain: 0,
        qosLevel: 0,
        updateUrl: 'http://example.org',
        history: 0,
        format: 'unknown',
        scalingFactor: 1,
        scalingOffset: 0,
        writeRangeMin: 1,
        writeRangeMax: 0
    };
    let hex =
        '0d060b00000c0004616601010000000003626262000000046173646' +
        '63ff000000000000000000000000000003ff00000000000000000000000000000';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = getNodePropertiesResponseOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    });
    it('.encode() should throw an Error', function () {
        try {
            let encoded = getNodePropertiesResponseOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode getNodePropertiesResponse: missing description:', function () {
    let kpo = {
        opcode: 0x0d,
        sid: 58888,
        type: 0,
        nid: 12,
        path: 'stairway to heaven',
        flags: 1,
        dataType: 1,
        triggerMode: 0,
        triggerDomain: 0,
        qosLevel: 0,
        updateUrl: 'http://example.org',
        history: 0,
        format: 'unknown',
        scalingFactor: 1,
        scalingOffset: 0,
        writeRangeMin: 1,
        writeRangeMax: 0
    };
    let hex =
        '0d060b00000c00036466000366666601010000000003626262000000046173646' +
        '63ff000000000000000000000000000003ff00000000000000000000000000000';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = getNodePropertiesResponseOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    });
    it('.encode() should throw an Error', function () {
        expect(() => {
            getNodePropertiesResponseOpcode.encode(kpo);
        }).toThrowError();
    });
});

describe('Opcode getNodePropertiesResponse: missing type:', function () {
    let kpo = {
        opcode: 0x0d,
        sid: 58888,
        type: 0,
        nid: 12,
        description: 'example',
        flags: 1,
        dataType: 1,
        triggerMode: 0,
        triggerDomain: 0,
        qosLevel: 0,
        updateUrl: 'http://example.org',
        history: 0,
        format: 'unknown',
        scalingFactor: 1,
        scalingOffset: 0,
        writeRangeMin: 1,
        writeRangeMax: 0
    };
    let hex =
        '0d060b00000c000461736466000366666601010262000000046173646' +
        '63ff000000000000000000000000000003ff00000000000000000000000000000';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = getNodePropertiesResponseOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    });
    it('.encode() should throw an Error', function () {
        expect(() => {
            getNodePropertiesResponseOpcode.encode(kpo);
        }).toThrowError();
    });
});

describe('Opcode getNodePropertiesResponse: missing nid:', function () {
    let kpo = {
        opcode: 0x0d,
        sid: 58888,
        type: 0,
        path: 'stairway to heaven',
        description: 'example',
        flags: 1,
        dataType: 1,
        triggerMode: 0,
        triggerDomain: 0,
        qosLevel: 0,
        updateUrl: 'http://example.org',
        history: 0,
        format: 'unknown',
        scalingFactor: 1,
        scalingOffset: 0,
        writeRangeMin: 1,
        writeRangeMax: 0
    };
    let hex =
        '0d060b00000c00046173646600010000000003626262000000046173646' +
        '63ff000000000000000000000000000003ff00000000000000000000000000000';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = getNodePropertiesResponseOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (13, hex);
    it('.encode() should throw an Error', function () {
        try {
            let encoded = getNodePropertiesResponseOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode getNodePropertiesResponse: missing type: path', function () {
    let kpo = {
        opcode: 0x0d,
        sid: 58888,
        nid: 12,
        path: 'stairway to heaven',
        description: 'example',
        flags: 1,
        dataType: 1,
        triggerMode: 0,
        triggerDomain: 0,
        qosLevel: 0,
        updateUrl: 'http://example.org',
        history: 0,
        format: 'unknown',
        scalingFactor: 1,
        scalingOffset: 0,
        writeRangeMin: 1,
        writeRangeMax: 0
    };
    let hex =
        '0d060b00000c000461766601010000000003626262000000046173646' +
        '63ff000000000000000000000000000003ff00000000000000000000000000000';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = getNodePropertiesResponseOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    });
    it('.encode() should throw an Error', function () {
        try {
            let encoded = getNodePropertiesResponseOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode getNodePropertiesResponse: missing sid:', function () {
    let kpo = {
        opcode: 0x0d,
        type: 0,
        nid: 12,
        path: 'stairway to heaven',
        description: 'example',
        flags: 1,
        dataType: 1,
        triggerMode: 0,
        triggerDomain: 0,
        qosLevel: 0,
        updateUrl: 'http://example.org',
        history: 0,
        format: 'unknown',
        scalingFactor: 1,
        scalingOffset: 0,
        writeRangeMin: 1,
        writeRangeMax: 0
    };
    let hex =
        '0d060b00000c0004666666601010000000003626262000000046173646' +
        '63ff000000000000000000000000000003ff00000000000000000000000000000';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = getNodePropertiesResponseOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    });
    it('.encode() should throw an Error', function () {
        try {
            let encoded = getNodePropertiesResponseOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode getNodePropertiesResponse: missing opcode:', function () {
    let kpo = {
        sid: 58888,
        type: 0,
        nid: 12,
        path: 'stairway to heaven',
        description: 'example',
        flags: 1,
        dataType: 1,
        triggerMode: 0,
        triggerDomain: 0,
        qosLevel: 0,
        updateUrl: 'http://example.org',
        history: 0,
        format: 'unknown',
        scalingFactor: 1,
        scalingOffset: 0,
        writeRangeMin: 1,
        writeRangeMax: 0
    };
    let hex =
        '060b00000c000461736466000366666601010000000003626262000000046173646' +
        '63ff000000000000000000000000000003ff00000000000000000000000000000';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = getNodePropertiesResponseOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (13, hex);
    it('.encode() should throw an Error', function () {
        try {
            let encoded = getNodePropertiesResponseOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode getNodePropertiesResponse: invalid sid:', function () {
    /* let kpo = {
        opcode: 0x0d,
        sid: 0,
        type: 0,
        nid: 12,
        path: 'asdf',
        description: 'fff',
        flags: 1,
        dataType: 1,
        triggerMode: 0,
        triggerDomain: 0,
        qosLevel: 0,
        updateUrl: 'bbb',
        history: 0,
        format: 'asdf',
        scalingFactor: 1,
        scalingOffset: 0,
        writeRangeMin: 1,
        writeRangeMax: 0
    };*/
    let hex =
        '0d000000000c000461736466000366666601010000000003626262000000046173646' +
        '63ff000000000000000000000000000003ff00000000000000000000000000000';

    it('.decode() should throw INVALID_SEQUENCE_NUMBER error', function () {
        try {
            let decoded = getNodePropertiesResponseOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.INVALID_SEQUENCE_NUMBER);
        }
    }); // (kpo.opcode, hex);
});
