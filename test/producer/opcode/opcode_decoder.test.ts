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


import { KolibriVersion } from '../../../src';
import { OpcodeCompatMapper } from '../../../src/mapper/opcode_compat_mapper';
import { OpcodeDecoder } from '../../../src/producer/opcode/opcode_decoder';
import { AckOpcode } from '../../../src/producer/opcode/v1_0';

jest.mock('../../../src/producer/opcode/v1_0');
const MockOpcodeCompatMapper = <jest.MockedClass<typeof OpcodeCompatMapper>>OpcodeCompatMapper;
const MockAckOpcode = <jest.MockedClass<typeof AckOpcode>>AckOpcode;

describe('OpcodeDecoder:', () => {
    const kpo = {
        opcode: 0x00,
        sid: 1455
    };
    MockAckOpcode.prototype.getName.mockReturnValue('ack');
    MockAckOpcode.prototype.getCode.mockReturnValue(0x00);
    MockAckOpcode.prototype.decode.mockReturnValue(kpo);
    const ackMock = new MockAckOpcode();

    const opcodeCompatMapper = new MockOpcodeCompatMapper(new KolibriVersion('kolibri'));
    const opcodesMock = [ackMock];

    const opcodeDecoder: OpcodeDecoder = new OpcodeDecoder(opcodesMock, opcodeCompatMapper);
    describe('decode:', () => {
        it('should decode ack buffer', () => {
            const buffer = Buffer.alloc(1);
            buffer.writeInt8(0x00);
            const decoded = opcodeDecoder.decode(buffer);
            expect(decoded).not.toBeNull();
            expect(decoded).toEqual(kpo);
        });

        it('should throw error on unavailable kolibri protocol decoder', () => {
            const buffer = Buffer.alloc(1);
            buffer.writeInt8(0x50);
            expect(() => {
                opcodeDecoder.decode(buffer);
            }).toThrowError();
        });
    });

    describe('getNameFromOpcode:', () => {
        it('should get name of an opcode', () => {
            const opcodeName = opcodeDecoder.getNameFromOpcode(0x00);
            expect(opcodeName).not.toBeNull();
            expect(opcodeName).toEqual('ack');
        });
    });
});
