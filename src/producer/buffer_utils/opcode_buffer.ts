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

import Long from 'long';
import { constants } from '../../common/constant';

export class OpcodeBuffer {
    private _buf: Buffer;
    private index: number;

    constructor(arg: number | Buffer) {
        if (typeof arg === 'number') {
            this._buf = Buffer.alloc(arg);
        }
        else {
            this._buf = arg;
        }
        this.index = 0;
    }

    get buf(): Buffer {
        return this._buf;
    }

    readBoolean(): boolean {
        let result = this.buf.readUInt8(this.index);
        this.index += 1;
        return result !== 0;
    };

    readUInt8(): number {
        let result = this.buf.readUInt8(this.index);
        this.index += 1;
        return result;
    };

    readInt8(): number {
        let result = this.buf.readInt8(this.index);
        this.index += 1;
        return result;
    };

    readUInt16(): number {
        let result = this.buf.readUInt16BE(this.index);
        this.index += 2;
        return result;
    };

    readInt16(): number {
        let result = this.buf.readInt16BE(this.index);
        this.index += 2;
        return result;
    };

    readUInt32(): number {
        let result = this.buf.readUInt32BE(this.index);
        this.index += 4;
        return result;
    };

    readInt32(): number {
        let result = this.buf.readInt32BE(this.index);
        this.index += 4;
        return result;
    };

    readUInt64(): Long {
        // @ts-ignore Long types not correct here
        const result = Long.fromBytesBE(this.buf.slice(this.index, this.index + 8), true);
        this.index += 8;
        return result;
    };

    readInt64(): Long {
        // @ts-ignore Long types not correct here
        const result = Long.fromBytesBE(this.buf.slice(this.index, this.index + 8), false);
        this.index += 8;
        return result;
    };

    readFloat32(): number {
        let result = this.buf.readFloatBE(this.index);
        this.index += 4;
        return result;
    };

    readFloat64(): number {
        let result = this.buf.readDoubleBE(this.index);
        this.index += 8;
        return result;
    };

    readUtf8String(): string {
        let length = this.readUInt16();
        if (length > constants.DT_STRING_MAXLEN) {
            throw new RangeError('string too long');
        }
        let result = this.buf.toString('utf8', this.index, this.index + length);
        this.index += length;
        return result;
    };

    readAsciiString(): string {
        let length = this.readUInt16();
        if (length > constants.DT_STRING_MAXLEN) {
            throw new RangeError('string too long');
        }
        let result = this.buf.toString('ascii', this.index, this.index + length);
        this.index += length;
        return result;
    };

    readByteArray(): string {
        let length = this.readUInt16();
        if (length > constants.DT_BYTEARRAY_MAXLEN) {
            throw new RangeError('byte array too long');
        }
        let result = this.buf.toString('hex', this.index, this.index + length);
        this.index += length;
        return result;
    };

    readOctets(length: number): Buffer {
        let result = Buffer.allocUnsafe(length);
        this.buf.copy(result, 0, this.index, this.index + length);
        this.index += length;
        return result;
    };

    readDataType(dataType: number): boolean | number | string | Long {
        switch (dataType) {
            case constants.DT_BOOLEAN:
                return this.readBoolean();
            case constants.DT_UNSIGNED_8BIT:
                return this.readUInt8();
            case constants.DT_SIGNED_8BIT:
                return this.readInt8();
            case constants.DT_UNSIGNED_16BIT:
                return this.readUInt16();
            case constants.DT_SIGNED_16BIT:
                return this.readInt16();
            case constants.DT_UNSIGNED_32BIT:
                return this.readUInt32();
            case constants.DT_SIGNED_32BIT:
                return this.readInt32();
            case constants.DT_UNSIGNED_64BIT:
                return this.readUInt64();
            case constants.DT_SIGNED_64BIT:
                return this.readInt64();
            case constants.DT_FLOATING_32BIT:
                return this.readFloat32();
            case constants.DT_FLOATING_64BIT:
                return this.readFloat64();
            case constants.DT_STRING:
                return this.readUtf8String();
            case constants.DT_BYTEARRAY:
                return this.readByteArray();
            default:
                throw new TypeError('invalid data type');
        }
    };

    //------------------------------------------------------------------------------
    // OpcodeBuffer write methods
    //------------------------------------------------------------------------------

    writeBoolean(value: boolean): void {
        if (typeof value !== 'boolean') {
            throw new TypeError('invalid data type');
        }
        this.buf[this.index] = value === true ? 1 : 0;
        this.index += 1;
    };

    writeUInt8(value: number): void {
        this.validate(value);
        this.validateNumber(value);
        this.buf.writeUInt8(value, this.index);
        this.index += 1;
    };

    writeInt8(value: number): void {
        this.validate(value);
        this.validateNumber(value);
        this.buf.writeInt8(value, this.index);
        this.index += 1;
    };

    writeUInt16(value: number): void {
        this.validate(value);
        this.validateNumber(value);
        this.buf.writeUInt16BE(value, this.index);
        this.index += 2;
    };

    writeInt16(value: number): void {
        this.validate(value);
        this.validateNumber(value);
        this.buf.writeInt16BE(value, this.index);
        this.index += 2;
    };

    writeUInt32(value: number): void {
        this.validate(value);
        this.validateNumber(value);
        this.buf.writeUInt32BE(value, this.index);
        this.index += 4;
    };

    writeInt32(value: number): void {
        this.validate(value);
        this.validateNumber(value);
        this.buf.writeInt32BE(value, this.index);
        this.index += 4;
    };

    writeUInt64(value: any): void {
        this.validate(value);
        let longValue = Long.fromValue(value);
        if (longValue.lessThan(Long.ZERO)) {
            throw new RangeError('value out of bounds');
        }
        Buffer.from(longValue.toBytesBE()).copy(this.buf, this.index);
        this.index += 8;
    };

    writeInt64(value: any): void {
        this.validate(value);
        let longValue = Long.fromValue(value);
        Buffer.from(longValue.toBytesBE()).copy(this.buf, this.index);
        this.index += 8;
    };

    writeFloat32(value: number): void {
        if (
            typeof value !== 'number' ||
            (value !== 0 && Math.abs(value) < constants.DT_FLOATING_32BIT_MIN) ||
            Math.abs(value) > constants.DT_FLOATING_32BIT_MAX
        ) {
            throw new RangeError('value out of bounds');
        }
        this.buf.writeFloatBE(value, this.index);
        this.index += 4;
    };

    writeFloat64(value: number): void {
        if (
            typeof value !== 'number' ||
            value === Number.NEGATIVE_INFINITY ||
            value === Number.POSITIVE_INFINITY
        ) {
            throw new RangeError('value out of bounds');
        }
        this.buf.writeDoubleBE(value, this.index);
        this.index += 8;
    };

    writeUtf8String(value: number): void {
        if (typeof value !== 'string') {
            throw new TypeError('invalid data type');
        }

        let length = Buffer.byteLength(value, 'utf8');
        if (length > constants.DT_STRING_MAXLEN) {
            throw new RangeError('string too long');
        }

        this.writeUInt16(length);
        this.buf.write(value, this.index, length, 'utf8');
        this.index += length;
    };

    writeAsciiString(value: string): void {
        if (typeof value !== 'string') {
            throw new TypeError('invalid data type');
        }

        let length = Buffer.byteLength(value, 'ascii');
        if (length > constants.DT_STRING_MAXLEN) {
            throw new RangeError('string too long');
        }

        this.writeUInt16(length);
        this.buf.write(value, this.index, length, 'ascii');
        this.index += length;
    };

    writeByteArray(value: string): void {
        if (typeof value !== 'string') {
            throw new TypeError('invalid data type');
        }

        let length = Buffer.byteLength(value, 'hex');
        if (length > constants.DT_BYTEARRAY_MAXLEN) {
            throw new RangeError('byte array too long');
        }

        this.writeUInt16(length);
        this.buf.write(value, this.index, length, 'hex');
        this.index += length;
    };

    writeOctets(value: Buffer, length: number): void {
        value.copy(this.buf, this.index, 0, length);
        this.index += length;
    };

    writeDataType(value: any, dataType: number): void {
        switch (dataType) {
            case constants.DT_BOOLEAN:
                this.writeBoolean(value);
                break;
            case constants.DT_UNSIGNED_8BIT:
                this.writeUInt8(value);
                break;
            case constants.DT_SIGNED_8BIT:
                this.writeInt8(value);
                break;
            case constants.DT_UNSIGNED_16BIT:
                this.writeUInt16(value);
                break;
            case constants.DT_SIGNED_16BIT:
                this.writeInt16(value);
                break;
            case constants.DT_UNSIGNED_32BIT:
                this.writeUInt32(value);
                break;
            case constants.DT_SIGNED_32BIT:
                this.writeInt32(value);
                break;
            case constants.DT_UNSIGNED_64BIT:
                this.writeUInt64(value);
                break;
            case constants.DT_SIGNED_64BIT:
                this.writeInt64(value);
                break;
            case constants.DT_FLOATING_32BIT:
                this.writeFloat32(value);
                break;
            case constants.DT_FLOATING_64BIT:
                this.writeFloat64(value);
                break;
            case constants.DT_STRING:
                this.writeUtf8String(value);
                break;
            case constants.DT_BYTEARRAY:
                this.writeByteArray(value);
                break;
            default:
                throw new TypeError('invalid data type');
        }
    };

    length(): number {
        return this.buf.length;
    };

    setIndex(index: number): void {
        if (index === undefined) {
            index = 0;
        }
        this.index = index;
    };

    isEob(): boolean {
        return this.index === this.buf.length;
    };

    // eslint-disable-next-line no-undef
    toString(encoding: BufferEncoding, start: number, end: number): string {
        return this.buf.toString(encoding, start, end);
    };

    validate(value: any): void {
        if (value === undefined || value === null) {
            throw TypeError('invalid value: ' + value);
        }
    };

    validateNumber(value: number): void {
        if (typeof value !== 'number') {
            throw TypeError('value is not a number: ' + value);
        }
    };
}
