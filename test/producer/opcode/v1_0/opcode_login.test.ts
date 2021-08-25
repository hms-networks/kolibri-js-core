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

import { errorcode } from '../../../../src/common/errorcode';
import { LoginOpcode } from '../../../../src/producer/opcode/v1_0/login_opcode';
import { stringToHash, hexToBuf } from '../../../test_utils';

const loginOpcode = new LoginOpcode();
describe('Opcode login: ', function () {
    let kpo = {
        opcode: 0x02,
        sid: 1453,
        version: 0,
        options: 4,
        user: 'jens',
        password: stringToHash('topsecret' + ':' + 'jens' + ':' + 'project'),
        interval: 20,
        timeout: 5
    };
    let hex = '0205ad000400046a656e731206b8cba65d0211b4f56504a36723e53c97a73a001405';

    it('.encode() should return expected buffer hex string', function () {
        expect(loginOpcode.encode(kpo).toString('hex')).toEqual(hex);
    });
    it('.decode() should throw PROTOCOL_ERROR error', function () {
        expect(JSON.stringify(loginOpcode.decode(hexToBuf(hex)))).toEqual(JSON.stringify(kpo));
    });
});

describe('Opcode login: trailing byte:', function () {
    let hex = '0205ad000400046a656e731206b8cba65d0211b4f56504a36723e53c97a73a00140500';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            loginOpcode.decode(hexToBuf(hex));
        }
        catch (err) {
            expect(err.kolibriError).toEqual(errorcode.PROTOCOL_ERROR);
        }
    }); // (0x02, hex);
});

describe('Opcode login: missing timeout:', function () {
    let kpo = {
        opcode: 0x02,
        sid: 1453,
        version: 0,
        options: 4,
        user: 'jens',
        password: stringToHash('topsecret' + ':' + 'jens' + ':' + 'project'),
        interval: 20
    };
    let hex = '0205ad000400046a656e731206b8cba65d0211b4f56504a36723e53c97a73a0014';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        expect(() => { loginOpcode.decode(hexToBuf(hex)); }).toThrowError(errorcode.PROTOCOL_ERROR);
    }); // (2, hex);
    it('.encode() should throw an Error', function () {
        expect(() => {
            loginOpcode.encode(kpo);
        }).toThrowError(TypeError);
    });
});

describe('Opcode login: missing interval:', function () {
    let kpo = {
        opcode: 0x02,
        sid: 1453,
        version: 0,
        options: 4,
        user: 'jens',
        password: stringToHash('topsecret' + ':' + 'jens' + ':' + 'project'),
        timeout: 5
    };
    let hex = '0205ad000400046a656e731206b8cba65d0211b4f56504a36723e53c97a73a05';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        expect(() => { loginOpcode.decode(hexToBuf(hex)); }).toThrowError(errorcode.PROTOCOL_ERROR);
    });
    it('.encode() should throw an Error', function () {
        expect(() => {
            loginOpcode.encode(kpo);
        }).toThrowError(TypeError);
    });
});

describe('Opcode login: missing password:', function () {
    let kpo = {
        opcode: 0x02,
        sid: 1453,
        version: 0,
        options: 4,
        user: 'jens',
        interval: 20,
        timeout: 5
    };
    let hex = '0205ad000400046a656e731206b8cba65d0211b4f5001405';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        expect(() => { loginOpcode.decode(hexToBuf(hex)); }).toThrowError(errorcode.PROTOCOL_ERROR);
    });
    it('.encode() should throw an Error', function () {
        expect(() => {
            loginOpcode.encode(kpo);
        }).toThrowError();
    });
});

describe('Opcode login: missing user:', function () {
    let kpo = {
        opcode: 0x02,
        sid: 1453,
        version: 0,
        options: 4,
        password: stringToHash('topsecret' + ':' + 'jens' + ':' + 'project'),
        interval: 20,
        timeout: 5
    };
    let hex = '0205ad00046504a36723e53c97a73a001405';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        expect(() => { loginOpcode.decode(hexToBuf(hex)); }).toThrowError(errorcode.PROTOCOL_ERROR);
    }); // (2, hex);
    it('.encode() should throw an Error', function () {
        expect(() => {
            loginOpcode.encode(kpo);
        }).toThrow();
    });
});

describe('Opcode login: missing options:', function () {
    let kpo = {
        opcode: 0x02,
        sid: 1453,
        version: 0,
        user: 'jens',
        password: stringToHash('topsecret' + ':' + 'jens' + ':' + 'project'),
        interval: 20,
        timeout: 5
    };
    let hex = '0205ad0000046a656e731206b8cba65d0211b4f56504a36723e53c97a73a001405';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        expect(() => { loginOpcode.decode(hexToBuf(hex)); }).toThrowError(errorcode.PROTOCOL_ERROR);
    }); // (2, hex);
    it('.encode() should throw an Error', function () {
        expect(() => {
            loginOpcode.encode(kpo);
        }).toThrowError();
    });
});

describe('Opcode login: missing version:', function () {
    let kpo = {
        opcode: 0x02,
        sid: 1453,
        options: 4,
        user: 'jens',
        password: stringToHash('topsecret' + ':' + 'jens' + ':' + 'project'),
        interval: 20,
        timeout: 5
    };
    let hex = '0205ad0400046a656e731206b8cba65d0211b4f56504a36723e53c97a73a001405';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        expect(() => { loginOpcode.decode(hexToBuf(hex)); }).toThrowError(errorcode.PROTOCOL_ERROR);
    }); // (2, hex);
    it('.encode() should throw an Error', function () {
        expect(() => {
            loginOpcode.encode(kpo);
        }).toThrow();
    });
});

describe('Opcode login: missing sid:', function () {
    let kpo = {
        opcode: 0x02,
        version: 0,
        options: 4,
        user: 'jens',
        password: stringToHash('topsecret' + ':' + 'jens' + ':' + 'project'),
        interval: 20,
        timeout: 5
    };
    let hex = '02000400046a656e731206b8cba65d0211b4f56504a36723e53c97a73a001405';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        expect(() => { loginOpcode.decode(hexToBuf(hex)); }).toThrowError(errorcode.PROTOCOL_ERROR);
    }); // (2, hex);
    it('.encode() should throw an Error', function () {
        expect(() => {
            loginOpcode.encode(kpo);
        }).toThrowError();
    });
});

describe('Opcode login: missing opcode:', function () {
    let kpo = {
        sid: 1453,
        version: 0,
        options: 4,
        user: 'jens',
        password: stringToHash('topsecret' + ':' + 'jens' + ':' + 'project'),
        interval: 20,
        timeout: 5
    };
    let hex = '05ad000400046a656e731206b8cba65d0211b4f56504a36723e53c97a73a001405';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        expect(() => { loginOpcode.decode(hexToBuf(hex)); }).toThrowError(errorcode.PROTOCOL_ERROR);
    }); // (2, hex);
    it('.encode() should throw an Error', function () {
        expect(() => {
            loginOpcode.encode(kpo);
        }).toThrowError();
    });
});

describe('Opcode login: invalid sid:', function () {
    /* let kpo = {
        opcode: 0x02,
        sid: 0,
        version: 0,
        options: 4,
        user: 'jens',
        password: stringToHash('topsecret' + ':' + 'jens' + ':' + 'project'),
        interval: 20,
        timeout: 5
    };*/
    let hex = '020000000400046a656e731206b8cba65d0211b4f56504a36723e53c97a73a001405';

    it('.decode() should throw INVALID_SEQUENCE_NUMBER error', function () {
        expect(() => {
            loginOpcode.decode(hexToBuf(hex));
        }).toThrowError(errorcode.INVALID_SEQUENCE_NUMBER);
    }); // (kpo.opcode, hex);
});
