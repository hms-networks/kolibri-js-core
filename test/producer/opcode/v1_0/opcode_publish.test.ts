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

import { PublishOpcode } from '../../../../src/producer/opcode/v1_0/publish_opcode';
import { PublishOpcode as V20PublishOpcode } from '../../../../src/producer/opcode/v2_0/publish_opcode';
import { errorcode } from '../../../../src/common/errorcode';
import { hexToBuf } from '../../../test_utils';
import assert from 'assert';

const publishOpcode = new PublishOpcode();
const v20PublishOpcode = new V20PublishOpcode();

describe('Opcode publish: two nodes', function () {
    let kpo = {
        opcode: 0x08,
        sid: 1235,
        cmdflags: 1,
        nodes: [
            {
                nid: 12,
                path: 'test'
            },
            {
                nid: 13,
                path: 'test2'
            }
        ]
    };
    let hex = '0804d301000c000474657374000d00057465737432';

    it('.encode() should return expected buffer hex string', function () {
        assert.strictEqual(publishOpcode.encode(kpo).toString('hex'), hex);
    });
    it('.decode() should throw PROTOCOL_ERROR error', function () {
        assert.strictEqual(
            JSON.stringify(publishOpcode.decode(hexToBuf(hex))),
            JSON.stringify(kpo)
        );
    });
});

describe('Opcode publish: three nodes', function () {
    let kpo = {
        opcode: 0x08,
        sid: 40000,
        cmdflags: 0,
        nodes: [
            {
                nid: 12,
                path: 'test',
                flags: 0,
                dataType: 0,
                triggerMode: 0,
                triggerDomain: 0,
                qosLevel: 0
            },
            {
                nid: 13,
                path: 'test2',
                flags: 0,
                dataType: 0,
                triggerMode: 0,
                triggerDomain: 0,
                qosLevel: 0
            },
            {
                nid: 14,
                path: 'test',
                flags: 0,
                dataType: 0,
                triggerMode: 0,
                triggerDomain: 0,
                qosLevel: 0
            }
        ]
    };
    let hex =
        '089c4000000c0004746573740000000000000d000574657374320000000000000e' +
        '0004746573740000000000';

    it('.encode() should return expected buffer hex string', function () {
        assert.strictEqual(publishOpcode.encode(kpo).toString('hex'), hex);
    });
    it('.decode() should throw PROTOCOL_ERROR error', function () {
        assert.strictEqual(
            JSON.stringify(publishOpcode.decode(hexToBuf(hex))),
            JSON.stringify(kpo)
        );
    });
});

describe('Opcode publish: no nodes:', function () {
    let kpo = {
        opcode: 0x08,
        sid: 1235,
        cmdflags: 3,
        nodes: []
    };
    let hex = '0804d303';

    it('.encode() should return expected buffer hex string', function () {
        assert.strictEqual(publishOpcode.encode(kpo).toString('hex'), hex);
    });
    it('.decode() should throw PROTOCOL_ERROR error', function () {
        assert.strictEqual(
            JSON.stringify(publishOpcode.decode(hexToBuf(hex))),
            JSON.stringify(kpo)
        );
    });
});

describe('Opcode publish: trailing byte:', function () {
    let hex =
        '089c4000000c0004746573740000000000000d000574657374320000000000000e' +
        '000474657374000000000088';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = publishOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (0x08, hex);
});

describe('Opcode publish: missing cmdflags:', function () {
    let kpo = {
        opcode: 0x08,
        sid: 1235,
        nodes: [
            {
                nid: 12,
                path: 'test'
            }
        ]
    };
    let hex = '0804d3000c000474657374';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = publishOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    });
    it('.encode() should throw an Error', function () {
        try {
            let encoded = publishOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode publish: missing sid:', function () {
    let kpo = {
        opcode: 0x08,
        cmdflags: 1,
        nodes: [
            {
                nid: 12,
                path: 'test'
            }
        ]
    };
    let hex = '0801000c000474657374';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = publishOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    });
    it('.encode() should throw an Error', function () {
        try {
            let encoded = publishOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode publish: missing opcode:', function () {
    let kpo = {
        sid: 1235,
        cmdflags: 1,
        nodes: [
            {
                nid: 12,
                path: 'test'
            }
        ]
    };
    let hex = '04d301000c000474657374';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = publishOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (8, hex);
    it('.encode() should throw an Error', function () {
        try {
            let encoded = publishOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode publish: missing nid:', function () {
    let kpo = {
        opcode: 0x08,
        sid: 1235,
        cmdflags: 1,
        nodes: [
            {
                path: 'test'
            }
        ]
    };
    let hex = '0804d301000474657374';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = publishOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    });
    it('.encode() should throw an Error', function () {
        try {
            let encoded = publishOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode publish: missing path:', function () {
    let kpo = {
        opcode: 0x08,
        sid: 1235,
        cmdflags: 1,
        nodes: [
            {
                nid: 12
            }
        ]
    };
    let hex = '0804d301000c';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = publishOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (8, hex);
    it('.encode() should throw an Error', function () {
        expect(() => {
            publishOpcode.encode(kpo);
        }).toThrowError();
    });
});

describe('Opcode publish: cmdflags as string:', function () {
    let kpo = {
        opcode: 0x08,
        sid: 1235,
        cmdflags: 'f',
        nodes: [
            {
                nid: 12,
                path: 'test'
            }
        ]
    };

    it('.encode() should throw an Error', function () {
        try {
            let encoded = publishOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode publish: sid as string:', function () {
    let kpo = {
        opcode: 0x08,
        sid: 'f',
        cmdflags: 1,
        nodes: [
            {
                nid: 12,
                path: 'test'
            }
        ]
    };

    it('.encode() should throw an Error', function () {
        try {
            let encoded = publishOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode publish: opcode as string:', function () {
    let kpo = {
        opcode: '0x08',
        sid: 1235,
        cmdflags: 1,
        nodes: [
            {
                nid: 12,
                path: 'test'
            }
        ]
    };

    it('.encode() should throw an Error', function () {
        try {
            let encoded = publishOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode publish: nid as string:', function () {
    let kpo = {
        opcode: 0x08,
        sid: 1235,
        cmdflags: 1,
        nodes: [
            {
                nid: 'f',
                path: 'test'
            }
        ]
    };

    it('.encode() should throw an Error', function () {
        try {
            let encoded = publishOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode publish: path as integer:', function () {
    let kpo = {
        opcode: 0x08,
        sid: 1235,
        cmdflags: 1,
        nodes: [
            {
                nid: 12,
                path: 12
            }
        ]
    };

    it('.encode() should throw an Error', function () {
        expect(() => {
            publishOpcode.encode(kpo);
        }).toThrowError();
    });
});

describe('Opcode publish: invalid sid:', function () {
    let hex = '080000000c000474657374';

    it('.decode() should throw INVALID_SEQUENCE_NUMBER error', function () {
        try {
            let decoded = publishOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.INVALID_SEQUENCE_NUMBER);
        }
    });
});

describe('v2.0.kolibri - Opcode publish: three group nodes detailed', function () {
    let kpo = {
        opcode: 0x08,
        sid: 40000,
        cmdflags: 7,
        nodes: [
            {
                type: 1,
                nid: 1,
                path: '/scope',
                description: 'my node to be published',
                flags: 1,
                triggerMode: 0,
                triggerT: 0,
                triggerDomain: 0,
                qosLevel: 0,
                history: 0
            },
            {
                type: 1,
                nid: 1,
                path: '/devicescope',
                description: 'another node to be published',
                flags: 1,
                triggerMode: 0,
                triggerT: 0,
                triggerDomain: 0,
                qosLevel: 0,
                history: 0
            },
            {
                type: 1,
                nid: 1,
                path: '/devicescope03',
                description: 'node description',
                flags: 1,
                triggerMode: 0,
                triggerT: 0,
                triggerDomain: 0,
                qosLevel: 0,
                history: 0
            }
        ]
    };

    let hex =
        '089c400701000100062f73636f706500176d79206e6f646520746f206265207075626c6' +
        '973686564010000000000010001000c2f64657669636573636f7065001c616e6f746865' +
        '72206e6f646520746f206265207075626c6973686564010000000000010001000e2f646' +
        '57669636573636f7065303300106e6f6465206465736372697074696f6e010000000000';

    it('.encode() should return expected buffer hex string', function () {
        let opcodeEncoded = v20PublishOpcode.encode(kpo);
        let opcodeHexed = opcodeEncoded.toString('hex');
        assert.strictEqual(opcodeHexed, hex);
    });
    it('.decode() should return decoded kpo equal to encoded kpo', function () {
        let decodedKpo = v20PublishOpcode.decode(hexToBuf(hex));
        let opcodeEncoded = v20PublishOpcode.encode(decodedKpo);
        let opcodeHexed = opcodeEncoded.toString('hex');
        assert.strictEqual(opcodeHexed, hex);
    });
});

describe('v2.0.kolibri - Opcode publish: point node simple', function () {
    let kpo = {
        opcode: 0x08,
        sid: 1,
        cmdflags: 0,
        nodes: [
            {
                nid: 6,
                path: '/com.beck/info/macid',
                flags: 1,
                triggerMode: 0,
                triggerDomain: 0,
                qosLevel: 1,
                dataType: 12
            }
        ]
    };

    let hex = '08000100000600142f636f6d2e6265636b2f696e666f2f6d61636964010c000001';

    it('.encode() should return expected buffer hex string', function () {
        let opcodeEncoded = v20PublishOpcode.encode(kpo);
        let opcodeHexed = opcodeEncoded.toString('hex');
        assert.strictEqual(opcodeHexed, hex);
    });
    it('.decode() should return decoded kpo equal to encoded kpo', function () {
        let decodedKpo = v20PublishOpcode.decode(hexToBuf(hex));
        let opcodeEncoded = v20PublishOpcode.encode(decodedKpo);
        let opcodeHexed = opcodeEncoded.toString('hex');
        assert.strictEqual(opcodeHexed, hex);
    });
});
