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
import { AckOpcode } from '../../../../src/producer/opcode/v1_0/ack_opcode';
import { hexToBuf } from '../../../test_utils';

const ackOpcode = new AckOpcode();

describe('Opcode ack:', function () {
    let kpo = {
        opcode: 0x00,
        sid: 1455
    };
    let hex = '0005af';

    it('.encode() should return expected buffer hex string', function () {
        expect(ackOpcode.encode(kpo).toString('hex')).toEqual(hex);
    });
    it('.decode() should throw PROTOCOL_ERROR error', function () {
        expect(JSON.stringify(ackOpcode.decode(hexToBuf(hex)))).toEqual(JSON.stringify(kpo));
    });
});

describe('Opcode ack: trailing byte:', function () {
    let hex = '0005af00';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = ackOpcode.decode(hexToBuf(hex));
            expect(decoded).toBeNull();
        }
        catch (err) {
            expect(err.kolibriError).toEqual(errorcode.PROTOCOL_ERROR);
        }
    });
});

describe('Opcode ack: missing sid:', function () {
    let hex = '00';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = ackOpcode.decode(hexToBuf(hex));
            expect(decoded).toBeNull();
        }
        catch (err) {
            expect(err.kolibriError).toEqual(errorcode.PROTOCOL_ERROR);
        }
    });
});

describe('Opcode decode ack: missing opcode:', function () {
    let hex = '05af';

    it('.decode() should throw PROTOCOL_ERROR error', function () {
        try {
            let decoded = ackOpcode.decode(hexToBuf(hex));
            expect(decoded).toBeNull();
        }
        catch (err) {
            expect(err.kolibriError).toEqual(errorcode.PROTOCOL_ERROR);
        }
    });
});

describe('Opcode encode ack: missing opcode:', function () {
    let kpo = {
        sid: 1455
    };

    it('.encode() should throw an Error', function () {
        try {
            let encoded = ackOpcode.encode(kpo);
            expect(encoded).toBeNull();
        }
        catch (err) {
            expect(err).toBeInstanceOf(Error);
        }
    });
});

describe('Opcode ack: sid as string:', function () {
    let kpo = {
        opcode: 0x00,
        sid: 'f'
    };

    it('.encode() should throw an Error', function () {
        try {
            let encoded = ackOpcode.encode(kpo);
            expect(encoded).toBeNull();
        }
        catch (err) {
            expect(err).toBeInstanceOf(Error);
        }
    });
});

describe('Opcode ack: opcode as string:', function () {
    let kpo = {
        opcode: '0x00',
        sid: 1455
    };

    it('.encode() should throw an Error', function () {
        try {
            let encoded = ackOpcode.encode(kpo);
            expect(encoded).toBeNull();
        }
        catch (err) {
            expect(err).toBeInstanceOf(Error);
        }
    });
});

describe('Opcode ack: invalid sid:', function () {
    let hex = '000000';

    it('.decode() should throw INVALID_SEQUENCE_NUMBER error', function () {
        try {
            let decoded = ackOpcode.decode(hexToBuf(hex));
            expect(decoded).toBeNull();
        }
        catch (err) {
            expect(err.kolibriError).toEqual(errorcode.INVALID_SEQUENCE_NUMBER);
        }
    });
});
