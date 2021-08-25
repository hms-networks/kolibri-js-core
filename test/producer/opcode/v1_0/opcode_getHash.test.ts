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
import { GetHashOpcode } from '../../../../src/producer/opcode/v1_0/get_hash_opcode';
import { hexToBuf } from '../../../test_utils';

const getHashOpcode = new GetHashOpcode();

describe('Opcode getHash: root path', function () {
    let kpo = {
        opcode: 0x03,
        sid: 1435,
        options: 10,
        path: 'kolibri://projekt.com-beck.de/'
    };
    let hex = '03059b0000000a001e6b6f6c696272693a2f2f70726f6a656b742e636f6d2d6265636b2e64652f';

    it('.encode() should return expected buffer hex string', function () {
        assert.strictEqual(getHashOpcode.encode(kpo).toString('hex'), hex);
    });
    it('.decode() should throw PROTOCOL_ERROR error', function () {
        assert.strictEqual(
            JSON.stringify(getHashOpcode.decode(hexToBuf(hex))),
            JSON.stringify(kpo)
        );
    });
});

describe('Opcode getHash: node1', function () {
    let kpo = {
        opcode: 0x03,
        sid: 48574,
        options: 12,
        path: 'kolibri://projekt.com-beck.de/node1'
    };
    let hex =
        '03bdbe0000000c00236b6f6c696272693a2f2f70726f6a656b742e636f6d2d6265636b2e64652f6e6f646531';

    it('.encode() should return expected buffer hex string', function () {
        assert.strictEqual(getHashOpcode.encode(kpo).toString('hex'), hex);
    });
    it('.decode() should throw PROTOCOL_ERROR error', function () {
        assert.strictEqual(
            JSON.stringify(getHashOpcode.decode(hexToBuf(hex))),
            JSON.stringify(kpo)
        );
    });
});

describe('Opcode getHash: trailing byte:', function () {
    let hex = '03059b0000000a001e6b6f6c696272693a2f2f70726f6a656b742e636f6d2d6265636b2e64652f55';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = getHashOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (0x03, hex);
});

describe('Opcode getHash: missing path:', function () {
    let kpo = {
        opcode: 0x03,
        sid: 48574,
        options: 12
    };
    let hex = '04ecb25204';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = getHashOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (3, hex);
    it('.encode() should throw an Error', function () {
        expect(() => {
            getHashOpcode.encode(kpo);
        }).toThrowError();
    });
});

describe('Opcode getHash: missing options:', function () {
    let kpo = {
        opcode: 0x03,
        sid: 48574,
        path: 'kolibri://projekt.com-beck.de/node1'
    };
    let hex = '04ecb24b5ea0f679ee78ec1a12904739e2904d';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = getHashOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (3, hex);
    it('.encode() should throw an Error', function () {
        try {
            let encoded = getHashOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode getHash: missing sid:', function () {
    let kpo = {
        opcode: 0x03,
        options: 12,
        path: 'kolibri://projekt.com-beck.de/node1'
    };
    let hex = '0452044b5ea0f679ee78ec1a12904739e2904d';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = getHashOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (3, hex);
    it('.encode() should throw an Error', function () {
        try {
            let encoded = getHashOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode getHash: missing opcode:', function () {
    let kpo = {
        sid: 48574,
        options: 12,
        path: 'kolibri://projekt.com-beck.de/node1'
    };
    let hex = 'ecb252044b5ea0f679ee78ec1a12904739e2904d';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = getHashOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.PROTOCOL_ERROR);
        }
    }); // (3, hex);
    it('.encode() should throw an Error', function () {
        try {
            let encoded = getHashOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode getHash: path as integer:', function () {
    let kpo = {
        opcode: 0x03,
        sid: 48574,
        options: 12,
        path: 12
    };

    it('.encode() should throw an Error', function () {
        expect(() => {
            getHashOpcode.encode(kpo);
        }).toThrowError();
    });
});

describe('Opcode getHash: options as string:', function () {
    let kpo = {
        opcode: 0x03,
        sid: 48574,
        options: 'f',
        path: 'kolibri://projekt.com-beck.de/node1'
    };

    it('.encode() should throw an Error', function () {
        try {
            let encoded = getHashOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode getHash: sid as string:', function () {
    let kpo = {
        opcode: 0x03,
        sid: 'f',
        options: 12,
        path: 'kolibri://projekt.com-beck.de/node1'
    };

    it('.encode() should throw an Error', function () {
        try {
            let encoded = getHashOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode getHash: opcode as string:', function () {
    let kpo = {
        opcode: '0x03',
        sid: 48574,
        options: 12,
        path: 'kolibri://projekt.com-beck.de/node1'
    };

    it('.encode() should throw an Error', function () {
        try {
            let encoded = getHashOpcode.encode(kpo);
            assert.strictEqual(encoded, null);
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
});

describe('Opcode getHash: invalid sid:', function () {
    /* let kpo = {
        opcode: 0x03,
        sid: 0,
        options: 10,
        path: 'kolibri://projekt.com-beck.de/'
    };*/
    let hex = '0300000000000a001e6b6f6c696272693a2f2f70726f6a656b742e636f6d2d6265636b2e64652f';

    it('.decode() should throw INVALID_SEQUENCE_NUMBER error', function () {
        try {
            let decoded = getHashOpcode.decode(hexToBuf(hex));
            assert.strictEqual(decoded, null);
        }
        catch (err) {
            assert.strictEqual(err.kolibriError, errorcode.INVALID_SEQUENCE_NUMBER);
        }
    }); // (kpo.opcode, hex);
});
