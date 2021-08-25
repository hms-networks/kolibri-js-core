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
import { constants } from '../common/constant';
import { KolibriError, errorcode as ec } from '../common/errorcode';

// Node trigger mode parameter N
export function triggerN(value: any, dataType: any) {
    dataType = dataType || 0;
    // Only numeric data types can have a triggerN parameter
    if (dataType < constants.DT_UNSIGNED_8BIT || dataType > constants.DT_FLOATING_64BIT) {
        throw new KolibriError(ec.INVALID_PARAMETER, 'triggerN');
    }
    // triggerN has the corresponding unsigned data type for integer data types
    dataType = dataType > constants.DT_SIGNED_64BIT || dataType % 2 ? dataType : dataType - 1;
    if (dataType === constants.DT_UNSIGNED_64BIT) {
        let lv = Long.fromNumber(value, true);
        if (lv.lessThan(Long.ZERO) || lv.greaterThan(constants.DT_FLOAT64_MAX_INT)) {
            throw new KolibriError(
                ec.INVALID_VALUE,
                value === null ? '(null)' : value.toString()
            );
        }

        // 64-bit triggerN integer values are represented with 64-bit
        // floating point values internally.
        value = lv.toNumber();
        dataType = constants.DT_FLOATING_64BIT;
    }
    pointValue(value, dataType);
}

// Point value
export function pointValue(value: any, dataType: number | null): void {
    if (value === null) {
        throw new KolibriError(ec.INVALID_VALUE, '(null)');
    }

    switch (dataType) {
        case constants.DT_BOOLEAN:
            // boolean
            if (typeof value !== 'boolean') {
                throw new KolibriError(
                    ec.INVALID_VALUE, value.toString()
                );
            }
            break;
        case constants.DT_UNSIGNED_8BIT:
            // 8-bit unsigned
            if (typeof value !== 'number' || value < 0 || value > 255 || value % 1 !== 0) {
                throw new KolibriError(
                    ec.INVALID_VALUE, value.toString()
                );
            }
            break;
        case constants.DT_SIGNED_8BIT:
            // 8-bit signed
            if (typeof value !== 'number' || value < -128 || value > 127 || value % 1 !== 0) {
                throw new KolibriError(
                    ec.INVALID_VALUE, value.toString()
                );
            }
            break;
        case constants.DT_UNSIGNED_16BIT:
            // 16-bit unsigned
            if (typeof value !== 'number' || value < 0 || value > 65535 || value % 1 !== 0) {
                throw new KolibriError(
                    ec.INVALID_VALUE, value.toString()
                );
            }
            break;
        case constants.DT_SIGNED_16BIT:
            // 16-bit signed
            if (
                typeof value !== 'number' ||
                value < -32768 ||
                value > 32767 ||
                value % 1 !== 0
            ) {
                throw new KolibriError(
                    ec.INVALID_VALUE, value.toString()
                );
            }
            break;
        case constants.DT_UNSIGNED_32BIT:
            // 32-bit unsigned
            if (
                typeof value !== 'number' ||
                value < 0 ||
                value > 4294967295 ||
                value % 1 !== 0
            ) {
                throw new KolibriError(
                    ec.INVALID_VALUE, value.toString()
                );
            }
            break;
        case constants.DT_SIGNED_32BIT:
            // 32-bit signed
            if (
                typeof value !== 'number' ||
                value < -2147483648 ||
                value > 2147483647 ||
                value % 1 !== 0
            ) {
                throw new KolibriError(
                    ec.INVALID_VALUE, value.toString()
                );
            }
            break;
        case constants.DT_UNSIGNED_64BIT:
            {
                let long = value;
                // 64-bit unsigned
                if (typeof value === 'string') {
                    long = Long.fromString(value, true);
                }
                if (typeof value === 'number') {
                    long = Long.fromNumber(value, true);
                }
                if (!Long.isLong(long) || long.lessThan(Long.ZERO) ||
                    long.toString() !== value.toString()) {
                    throw new KolibriError(
                        ec.INVALID_VALUE, value.toString()
                    );
                }
            }
            break;
        case constants.DT_SIGNED_64BIT:
            {
                let long = value;
                // 64-bit signed
                if (typeof value === 'string') {
                    long = Long.fromString(value, false);
                }
                if (!Long.isLong(long) || long.lessThan(Long.MIN_VALUE) ||
                    long.greaterThan(Long.MAX_VALUE) || long.toString() !== value.toString()) {
                    throw new KolibriError(
                        ec.INVALID_VALUE, value.toString()
                    );
                }
            }
            break;
        case constants.DT_FLOATING_32BIT:
            // 32-bit floating point
            if (
                typeof value !== 'number' ||
                (value !== 0 &&
                    (Math.abs(value) < constants.DT_FLOATING_32BIT_MIN ||
                        Math.abs(value) > constants.DT_FLOATING_32BIT_MAX))
            ) {
                throw new KolibriError(
                    ec.INVALID_VALUE, value.toString()
                );
            }
            break;
        case constants.DT_FLOATING_64BIT:
            // 64-bit floating point
            if (typeof value !== 'number') {
                throw new KolibriError(
                    ec.INVALID_VALUE, value.toString()
                );
            }
            break;
        case constants.DT_STRING:
            // UTF-8 string
            if (typeof value !== 'string' || value.length > constants.DT_STRING_MAXLEN) {
                throw new KolibriError(
                    ec.INVALID_VALUE, value.toString()
                );
            }
            break;
        case constants.DT_BYTEARRAY:
            // Byte array
            if (
                typeof value !== 'string' ||
                value.length > constants.DT_BYTEARRAY_MAXLEN * 2 ||
                value.length % 2 ||
                value.match(/[^0-9a-fA-F]/)
            ) {
                throw new KolibriError(
                    ec.INVALID_VALUE, value.toString()
                );
            }
            break;
        default:
            throw new KolibriError(ec.INVALID_DATA_TYPE);
    }
}
