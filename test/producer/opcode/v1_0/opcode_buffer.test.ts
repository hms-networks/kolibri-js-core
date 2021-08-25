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

import { OpcodeBuffer } from '../../../../src/producer/buffer_utils/opcode_buffer';

describe('OpcodeBuffer: ', () => {
    describe('write to OpcodeBuffer: ', () => {
        describe('writeBoolean: ', () => {
            it('with true', () => {
                const opcodeBuffer = new OpcodeBuffer(1);
                opcodeBuffer.writeBoolean(true);

                expect(opcodeBuffer.isEob()).toBeTruthy();
            });

            it('with false', () => {
                const opcodeBuffer = new OpcodeBuffer(1);
                opcodeBuffer.writeBoolean(false);

                expect(opcodeBuffer.isEob()).toBeTruthy();
            });

            it('with number instead of boolean value', () => {
                const opcodeBuffer = new OpcodeBuffer(1);
                expect(() => {
                    // "as any" intended to check if case.
                    opcodeBuffer.writeBoolean(42 as any);
                }).toThrowError(TypeError);
            });

            it('with string instead of boolean value', () => {
                const opcodeBuffer = new OpcodeBuffer(1);
                expect(() => {
                    opcodeBuffer.writeBoolean('string value' as any);
                }).toThrowError(TypeError);
            });
        });

        describe('writeUInt8: ', () => {
            it('write valid value', () => {
                const opcodeBuffer = new OpcodeBuffer(1);
                opcodeBuffer.writeUInt8(4);

                expect(opcodeBuffer.isEob()).toBeTruthy();
            });
        });

        describe('writeInt8: ', () => {
            it('write valid value', () => {
                const opcodeBuffer = new OpcodeBuffer(1);
                opcodeBuffer.writeInt8(4);

                expect(opcodeBuffer.isEob()).toBeTruthy();
            });
        });

        describe('writeUInt16: ', () => {
            it('write valid value', () => {
                const opcodeBuffer = new OpcodeBuffer(2);
                opcodeBuffer.writeUInt16(25);

                expect(opcodeBuffer.isEob()).toBeTruthy();
            });
        });

        describe('writeInt16: ', () => {
            it('write valid value', () => {
                const opcodeBuffer = new OpcodeBuffer(2);
                opcodeBuffer.writeInt16(25);

                expect(opcodeBuffer.isEob()).toBeTruthy();
            });
        });

        describe('writeUInt32: ', () => {
            it('write valid value', () => {
                const opcodeBuffer = new OpcodeBuffer(4);
                opcodeBuffer.writeUInt32(25);

                expect(opcodeBuffer.isEob()).toBeTruthy();
            });
        });

        describe('writeInt32: ', () => {
            it('write valid value', () => {
                const opcodeBuffer = new OpcodeBuffer(4);
                opcodeBuffer.writeInt32(25);

                expect(opcodeBuffer.isEob()).toBeTruthy();
            });
        });

        describe('writeUInt64: ', () => {
            it('write valid value', () => {
                const opcodeBuffer = new OpcodeBuffer(8);
                opcodeBuffer.writeUInt64(25);

                expect(opcodeBuffer.isEob()).toBeTruthy();
            });

            it('write valid value less than zero', () => {
                const opcodeBuffer = new OpcodeBuffer(8);
                expect(() => {
                    opcodeBuffer.writeUInt64(-5);
                }).toThrowError(RangeError);
            });
        });

        describe('writeInt64: ', () => {
            it('write valid value', () => {
                const opcodeBuffer = new OpcodeBuffer(8);
                opcodeBuffer.writeInt64(25);

                expect(opcodeBuffer.isEob()).toBeTruthy();
            });

            it('write valid value less than zero', () => {
                const opcodeBuffer = new OpcodeBuffer(8);
                opcodeBuffer.writeInt64(-5);
                expect(opcodeBuffer.isEob()).toBeTruthy();
            });
        });

        describe('writeFloat32: ', () => {
            it('write valid value', () => {
                const opcodeBuffer = new OpcodeBuffer(4);
                opcodeBuffer.writeFloat32(25.5);

                expect(opcodeBuffer.isEob()).toBeTruthy();
            });

            it('write string as value', () => {
                const opcodeBuffer = new OpcodeBuffer(4);
                expect(() => {
                    opcodeBuffer.writeFloat32('float as string' as any);
                }).toThrowError(RangeError);
            });

            it('write value less then allowed', () => {
                const opcodeBuffer = new OpcodeBuffer(4);
                expect(() => {
                    opcodeBuffer.writeFloat32(0.175e-39);
                }).toThrowError(RangeError);
            });

            it('write value greater then allowed', () => {
                const opcodeBuffer = new OpcodeBuffer(4);
                expect(() => {
                    opcodeBuffer.writeFloat32(4.403e39);
                }).toThrowError(RangeError);
            });
        });

        describe('writeFloat64: ', () => {
            it('write valid value', () => {
                const opcodeBuffer = new OpcodeBuffer(8);
                opcodeBuffer.writeFloat64(25.5);

                expect(opcodeBuffer.isEob()).toBeTruthy();
            });

            it('write string as value', () => {
                const opcodeBuffer = new OpcodeBuffer(8);
                expect(() => {
                    opcodeBuffer.writeFloat64('float as string' as any);
                }).toThrowError(RangeError);
            });

            it('write value less then allowed', () => {
                const opcodeBuffer = new OpcodeBuffer(8);
                expect(() => {
                    opcodeBuffer.writeFloat64(Number.NEGATIVE_INFINITY);
                }).toThrowError(RangeError);
            });

            it('write value greater then allowed', () => {
                const opcodeBuffer = new OpcodeBuffer(8);
                expect(() => {
                    opcodeBuffer.writeFloat64(Number.POSITIVE_INFINITY);
                }).toThrowError(RangeError);
            });
        });

        describe('writeUtf8String: ', () => {
            it('write valid value', () => {
                const validString = 'valid string value';
                const opcodeBuffer = new OpcodeBuffer(2 + validString.length);
                opcodeBuffer.writeUtf8String(validString as any);
                expect(opcodeBuffer.isEob()).toBeTruthy();
            });

            it('write number as value', () => {
                const opcodeBuffer = new OpcodeBuffer(8);
                expect(() => {
                    opcodeBuffer.writeUtf8String(42);
                }).toThrowError(TypeError);
            });

            it('write value greater then allowed', () => {
                let str = ''; // temp string var

                for (let i = 0; i < 40; i++) {
                    str +=
                        '1111111111111111111111111111111111111111111' +
                        '111111111111111111111111111111111111111111111111111111111';
                }
                str +=
                    '11111111111111111111111111111111111111111111111111' +
                    '11111111111111111111111111111111111111111111111';
                const opcodeBuffer = new OpcodeBuffer(8);
                expect(() => {
                    opcodeBuffer.writeUtf8String(str as any);
                }).toThrowError(RangeError);
            });
        });

        describe('writeAsciiString: ', () => {
            it('write valid value', () => {
                const validString = 'valid string value';
                const opcodeBuffer = new OpcodeBuffer(2 + validString.length);
                opcodeBuffer.writeAsciiString(validString);
                expect(opcodeBuffer.isEob()).toBeTruthy();
            });

            it('write number as value', () => {
                const opcodeBuffer = new OpcodeBuffer(8);
                expect(() => {
                    opcodeBuffer.writeAsciiString(42 as any);
                }).toThrowError(TypeError);
            });

            it('write value greater then allowed', () => {
                let str = ''; // temp string var

                for (let i = 0; i < 40; i++) {
                    str +=
                        '1111111111111111111111111111111111111111111' +
                        '111111111111111111111111111111111111111111111111111111111';
                }
                str +=
                    '11111111111111111111111111111111111111111111111111' +
                    '11111111111111111111111111111111111111111111111';
                const opcodeBuffer = new OpcodeBuffer(8);
                expect(() => {
                    opcodeBuffer.writeAsciiString(str);
                }).toThrowError(RangeError);
            });
        });

        describe('writeByteArray: ', () => {
            it('write valid value', () => {
                const validString = 'valid string value';
                const length = Buffer.byteLength(validString, 'hex');
                const opcodeBuffer = new OpcodeBuffer(2 + length);
                opcodeBuffer.writeByteArray(validString);
                expect(opcodeBuffer.isEob()).toBeTruthy();
            });

            it('write number as value', () => {
                const opcodeBuffer = new OpcodeBuffer(8);
                expect(() => {
                    opcodeBuffer.writeByteArray(42 as any);
                }).toThrowError(TypeError);
            });

            it('write value greater then allowed', () => {
                let hex = 'FF';
                for (let i = 0; i <= 4095; i++) {
                    hex = hex + 'FF';
                }

                const opcodeBuffer = new OpcodeBuffer(8);
                expect(() => {
                    opcodeBuffer.writeByteArray(hex);
                }).toThrowError(RangeError);
            });
        });
    });

    describe('validate', () => {
        it('validate value', () => {
            const opcodeBuffer = new OpcodeBuffer(1);
            opcodeBuffer.validate('valid string');
        });

        it('validate null value', () => {
            const opcodeBuffer = new OpcodeBuffer(1);
            expect(() => {
                opcodeBuffer.validate(null);
            }).toThrowError(TypeError);
        });

        it('validate undefined value', () => {
            const opcodeBuffer = new OpcodeBuffer(1);
            expect(() => {
                opcodeBuffer.validate(undefined);
            }).toThrowError(TypeError);
        });
    });

    describe('validateNumber', () => {
        it('validate number', () => {
            const opcodeBuffer = new OpcodeBuffer(1);
            opcodeBuffer.validateNumber(42);
        });

        it('validate null value', () => {
            const opcodeBuffer = new OpcodeBuffer(1);
            expect(() => {
                opcodeBuffer.validateNumber(null as any);
            }).toThrowError(TypeError);
        });

        it('validate undefined value', () => {
            const opcodeBuffer = new OpcodeBuffer(1);
            expect(() => {
                opcodeBuffer.validateNumber(undefined as any);
            }).toThrowError(TypeError);
        });

        it('validate number as string', () => {
            const opcodeBuffer = new OpcodeBuffer(1);
            expect(() => {
                opcodeBuffer.validateNumber('43' as any);
            }).toThrowError(TypeError);
        });
    });
});
