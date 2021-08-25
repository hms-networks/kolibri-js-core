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
import { KolibriError, errorcode } from './../../common/errorcode';
import { constants } from '../../common/constant';
import { BufferLengthBuilder } from '../buffer_utils/buffer_length_builder';

export abstract class Opcode {
    protected bufferLengthBuilder: BufferLengthBuilder;
    private code: number;
    private name: string;
    constructor(name: string, code: number) {
        this.name = name;
        this.code = code;
        this.bufferLengthBuilder = new BufferLengthBuilder();
    }

    abstract encode(compatKpo: any): Buffer;

    abstract decode(buffer: any): unknown;

    getName() {
        return this.name;
    }

    getCode() {
        return this.code;
    }

    getDataTypeSize(dataType: any, value?: any) {
        return this.bufferLengthBuilder.getDataTypeSize(dataType, value);
    }

    writeTriggerN(ocBuf: any, triggerN: any, dataType: any) {
        let value =
            dataType === constants.DT_UNSIGNED_64BIT || dataType === constants.DT_SIGNED_64BIT
                ? Long.fromNumber(triggerN)
                : triggerN;
        ocBuf.writeDataType(value, dataType);
    }

    readTriggerN(ocBuf: any, dataType: any, kpo: any) {
        // triggerN has the corresponding unsigned data type for integer data types
        let dt = dataType > constants.DT_SIGNED_64BIT || dataType % 2 ? dataType : dataType - 1;
        let value = ocBuf.readDataType(dt);
        // 64-bit integer triggerN values are limited to [0, 2^53 - 1] and are
        // represented as 64-bit floating point values internally.
        if (dt === constants.DT_UNSIGNED_64BIT) {
            if (value.lessThan(Long.ZERO) || value.greaterThan(constants.DT_FLOAT64_MAX_INT)) {
                throw new KolibriError(errorcode.INVALID_VALUE, kpo);
            }
            return value.toNumber();
        }
        else {
            return value;
        }
    }
}

