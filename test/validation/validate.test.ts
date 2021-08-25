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
import { constants } from '../../src/common/constant';
import { errorcode } from '../../src/common/errorcode';
import { validate } from '../../src/validation';

describe('validate : ', function () {
    describe('validate.triggerN', function () {
        it('should throw an error if the data type is invalid', () => {
            expect(() => validate.triggerN(null, null)).toThrowError(errorcode.INVALID_PARAMETER);
            expect(() => validate.triggerN(
                null, constants.DT_UNSIGNED_8BIT - 1)).toThrowError(errorcode.INVALID_PARAMETER);
            expect(() => validate.triggerN(
                null, constants.DT_FLOATING_64BIT + 1)).toThrowError(errorcode.INVALID_PARAMETER);
        });

        it('should throw an error if the data type is not a number', () => {
            expect(() => validate.triggerN(null, 'abc')).toThrowError(errorcode.INVALID_VALUE);
        });

        it('should throw an error if the input value in not valid', () => {
            expect(() => validate.triggerN(
                constants.DT_FLOAT64_MAX_INT + 1,
                constants.DT_UNSIGNED_64BIT)).toThrowError(errorcode.INVALID_VALUE);
        });
        it('should not throw an error if the input value and data types are correct', () => {
            validate.triggerN(null, constants.DT_UNSIGNED_64BIT);
            validate.triggerN(Long.ZERO.add(1), constants.DT_UNSIGNED_64BIT);
        });
    });

    describe('validate.value', function () {
        it('should throw an error if the input value is null', () => {
            expect(() => validate.pointValue(null, null)).toThrowError(errorcode.INVALID_VALUE);
        });
        it('case DT_BOOLEAN: throw an exception if the value is not bool but is expected', () => {
            expect(() => validate.pointValue(
                'notBoolean', constants.DT_BOOLEAN)).toThrowError(errorcode.INVALID_VALUE);
            validate.pointValue(true, constants.DT_BOOLEAN);
        });
        it('case DT_UNSIGNED_8BIT:throw an exception if the value is not an 8-bit unsigned but is expected', () => {
            expect(() => validate.pointValue(
                null, constants.DT_UNSIGNED_8BIT)).toThrowError(errorcode.INVALID_VALUE);
            expect(() => validate.pointValue(
                -1, constants.DT_UNSIGNED_8BIT)).toThrowError(errorcode.INVALID_VALUE);
            expect(() => validate.pointValue(
                256, constants.DT_UNSIGNED_8BIT)).toThrowError(errorcode.INVALID_VALUE);
            validate.pointValue(1, constants.DT_UNSIGNED_8BIT);
        });
        it('case DT_SIGNED_8BIT: throw an exception if the value is not an 8-bit signed but is expected', () => {
            expect(() => validate.pointValue(
                null, constants.DT_SIGNED_8BIT)).toThrowError(errorcode.INVALID_VALUE);
            expect(() => validate.pointValue(
                -129, constants.DT_SIGNED_8BIT)).toThrowError(errorcode.INVALID_VALUE);
            expect(() => validate.pointValue(
                128, constants.DT_SIGNED_8BIT)).toThrowError(errorcode.INVALID_VALUE);
            validate.pointValue(1, constants.DT_SIGNED_8BIT);
        });
        it('case DT_UNSIGNED_16BIT: throw an exception if the value is not a 16-bit unsigned but is expected', () => {
            expect(() => validate.pointValue(
                null, constants.DT_UNSIGNED_16BIT)).toThrowError(errorcode.INVALID_VALUE);
            expect(() => validate.pointValue(
                -1, constants.DT_UNSIGNED_16BIT)).toThrowError(errorcode.INVALID_VALUE);
            expect(() => validate.pointValue(
                65535 + 1, constants.DT_UNSIGNED_16BIT)).toThrowError(errorcode.INVALID_VALUE);
            validate.pointValue(1, constants.DT_UNSIGNED_16BIT);
        });
        it('case DT_SIGNED_16BIT: throw an exception if the value is not a 16-bit signed but is expected', () => {
            expect(() => validate.pointValue(
                null, constants.DT_SIGNED_16BIT)).toThrowError(errorcode.INVALID_VALUE);
            expect(() => validate.pointValue(
                -32768 - 1, constants.DT_SIGNED_16BIT)).toThrowError(errorcode.INVALID_VALUE);
            expect(() => validate.pointValue(
                32767 + 1, constants.DT_SIGNED_16BIT)).toThrowError(errorcode.INVALID_VALUE);
            validate.pointValue(1, constants.DT_SIGNED_16BIT);
        });
        it('case DT_UNSIGNED_32BIT: throw an exception if the value is not a 32-bit unsigned but is expected', () => {
            expect(() => validate.pointValue(
                null, constants.DT_UNSIGNED_32BIT)).toThrowError(errorcode.INVALID_VALUE);
            expect(() => validate.pointValue(
                -1, constants.DT_UNSIGNED_32BIT)).toThrowError(errorcode.INVALID_VALUE);
            expect(() => validate.pointValue(
                4294967295 + 1, constants.DT_UNSIGNED_32BIT)).toThrowError(errorcode.INVALID_VALUE);
            validate.pointValue(1, constants.DT_UNSIGNED_32BIT);
        });
        it('case DT_SIGNED_32BIT: throw an exception if the value is not a 32-bit signed but is expectede', () => {
            expect(() => validate.pointValue(
                null, constants.DT_SIGNED_32BIT)).toThrowError(errorcode.INVALID_VALUE);
            expect(() => validate.pointValue(
                -2147483648 - 1, constants.DT_SIGNED_32BIT)).toThrowError(errorcode.INVALID_VALUE);
            expect(() => validate.pointValue(
                2147483647 + 1, constants.DT_SIGNED_32BIT)).toThrowError(errorcode.INVALID_VALUE);
            validate.pointValue(1, constants.DT_SIGNED_32BIT);
        });
        it('case DT_UNSIGNED_64BIT: throw an exception if the value is not a 64-bit unsigned but is expected', () => {
            expect(() => validate.pointValue(
                null, constants.DT_UNSIGNED_64BIT)).toThrowError(errorcode.INVALID_VALUE);
            // eslint-disable-next-line no-undef
            expect(() => validate.pointValue(Long.ZERO.sub(1), constants.DT_UNSIGNED_64BIT)).toThrowError();
            // eslint-disable-next-line no-undef
            expect(() => validate.pointValue(Long.MAX_VALUE.add(1), constants.DT_UNSIGNED_64BIT)).toThrowError();
            validate.pointValue(1, constants.DT_UNSIGNED_64BIT);
        });
        it('case DT_SIGNED_64BIT: throw an exception if the value is not a 64-bit signed but is expected', () => {
            expect(() => validate.pointValue(null, constants.DT_SIGNED_64BIT)).toThrowError(errorcode.INVALID_VALUE);
            expect(() => validate.pointValue(1.0, constants.DT_SIGNED_64BIT)).toThrowError();
            validate.pointValue('123', constants.DT_SIGNED_64BIT);
        });
        it('case DT_FLOATING_32: throw an exception if the value is not a 32-bit floating but is expected', () => {
            expect(() => validate.pointValue(null, constants.DT_FLOATING_32BIT)).toThrowError(errorcode.INVALID_VALUE);
            const minFloat = (1.176 - 1.0).toExponential(38);
            const maxFloat = (3.4028 + 1.0).toExponential(38);
            expect(() => validate.pointValue(minFloat, constants.DT_FLOATING_32BIT)).toThrowError();
            expect(() => validate.pointValue(maxFloat, constants.DT_FLOATING_32BIT)).toThrowError();
            expect(() => validate.pointValue(1.0, constants.DT_FLOATING_32BIT)).not.toThrowError();
        });
        it('case DT_FLOATING64: throw an exception if the value is not a 64-bit floating but is expected', () => {
            expect(() => validate.pointValue(
                null, constants.DT_FLOATING_64BIT)).toThrowError(errorcode.INVALID_VALUE);
            validate.pointValue(1.0, constants.DT_FLOATING_64BIT);
        });
        it('case DT_STRING: throw an exception if the value is not a valid string but is expected', () => {
            expect(() => validate.pointValue(null, constants.DT_STRING)).toThrowError(errorcode.INVALID_VALUE);
            let testString = '';
            for (let i = 0; i < constants.DT_STRING_MAXLEN + 1; i++) { testString += 'a'; }
            expect(() => validate.pointValue(
                testString, constants.DT_STRING)).toThrowError(errorcode.INVALID_VALUE); // String too long
            validate.pointValue('abc123', constants.DT_STRING); // String ok
        });
        it('case DT_BYTEARRAY: throw an exception if the value is not a valid byte array but is expected', () => {
            expect(() => validate.pointValue(
                null, constants.DT_BYTEARRAY)).toThrowError(errorcode.INVALID_VALUE);
            const testArray = new Uint8Array((1024 * 4) + 1);

            expect(() => validate.pointValue(
                testArray, constants.DT_BYTEARRAY)).toThrowError(errorcode.INVALID_VALUE); // too large
            expect(() => validate.pointValue(
                'abc', constants.DT_BYTEARRAY)).toThrowError(errorcode.INVALID_VALUE); // is string

            const testArrayWithSpecialChar = new Uint8Array(8);
            testArrayWithSpecialChar.set(['?' as any]);
            expect(() => validate.pointValue(
                testArrayWithSpecialChar, constants.DT_BYTEARRAY)).toThrowError(errorcode.INVALID_VALUE);

            let testArray2 = new Uint8Array(1);
            expect(() => validate.pointValue(
                testArray2, constants.DT_BYTEARRAY)).toThrowError(errorcode.INVALID_VALUE);

            let testInput = 'ffffff112233445566deadbea00998877fffffff';
            validate.pointValue(testInput, constants.DT_BYTEARRAY);
        });
        it('default case: invalid data type', () => {
            expect(() => validate.pointValue(1, -1)).toThrowError(errorcode.INVALID_DATA_TYPE);
        });
    });
});
