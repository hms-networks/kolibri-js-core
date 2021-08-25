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

import { constants } from '../../common/constant';
import { KolibriError, errorcode } from '../../common/errorcode';

export class BufferLengthBuilder {
    private length: number;
    constructor() {
        this.length = 0;
    }
    add(type: any, value?: any) {
        this.length += this.getDataTypeSize(type, value);
        return this;
    }

    build() {
        let l = this.length;
        this.length = 0;
        return l;
    }

    getDataTypeSize(dataType: any, value?: any) {
        switch (dataType) {
            case constants.DT_BOOLEAN:
            case constants.DT_UNSIGNED_8BIT:
            case constants.DT_SIGNED_8BIT:
                return 1;
            case constants.DT_UNSIGNED_16BIT:
            case constants.DT_SIGNED_16BIT:
                return 2;
            case constants.DT_UNSIGNED_32BIT:
            case constants.DT_SIGNED_32BIT:
            case constants.DT_FLOATING_32BIT:
                return 4;
            case constants.DT_UNSIGNED_64BIT:
            case constants.DT_SIGNED_64BIT:
            case constants.DT_FLOATING_64BIT:
                return 8;
            case constants.DT_STRING:
                return 2 + Buffer.byteLength(value, 'utf8');
            case constants.DT_BYTEARRAY:
                return 2 + Buffer.byteLength(value, 'hex');
            default:
                throw new KolibriError(errorcode.INVALID_DATA_TYPE);
        }
    }
}
