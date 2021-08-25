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
import { HashBuffer } from './hash_buffer';
import { OpcodeBuffer } from './opcode_buffer';

export class HashBufferV20 implements HashBuffer {
    encode(ho: any, dataType: any) {
        const hbuf = new OpcodeBuffer(this.encodeLength(ho, dataType));
        hbuf.writeAsciiString(ho.path);

        if (ho.hasOwnProperty('nid')) {
            hbuf.writeUInt16(ho.nid);
        }
        if (ho.hasOwnProperty('value')) {
            hbuf.writeDataType(ho.value, dataType);
        }
        if (ho.hasOwnProperty('timestamp')) {
            hbuf.writeUInt64(Long.fromValue(ho.timestamp));
        }
        if (ho.hasOwnProperty('quality')) {
            hbuf.writeUInt8(ho.quality);
        }
        if (ho.hasOwnProperty('description')) {
            hbuf.writeUtf8String(ho.description);
        }
        if (ho.hasOwnProperty('flags')) {
            hbuf.writeUInt8(ho.flags);
        }
        if (ho.hasOwnProperty('dataType')) {
            hbuf.writeUInt8(ho.dataType);
        }
        if (ho.hasOwnProperty('triggerMode')) {
            hbuf.writeUInt8(ho.triggerMode);
            if (ho.hasOwnProperty('triggerN')) {
                if (ho.triggerMode === constants.TRIGGER_R || ho.triggerMode === constants.TRIGGER_R_T) {
                    hbuf.writeFloat32(ho.triggerN);
                }
                else if (ho.triggerMode === constants.TRIGGER_T_S) {
                    hbuf.writeUInt32(ho.triggerN);
                }
                else {
                    hbuf.writeDataType(ho.triggerN, dataType);
                }
            }
            if (ho.hasOwnProperty('triggerT')) {
                hbuf.writeUInt32(ho.triggerT);
            }
        }
        if (ho.hasOwnProperty('triggerDomain')) {
            hbuf.writeUInt8(ho.triggerDomain);
        }
        if (ho.hasOwnProperty('qosLevel')) {
            hbuf.writeUInt8(ho.qosLevel);
        }
        if (ho.hasOwnProperty('scalingFactor')) {
            hbuf.writeFloat64(ho.scalingFactor);
        }
        if (ho.hasOwnProperty('scalingOffset')) {
            hbuf.writeFloat64(ho.scalingOffset);
        }
        if (ho.hasOwnProperty('format')) {
            hbuf.writeUtf8String(ho.format);
        }
        if (ho.hasOwnProperty('writeRangeMin')) {
            hbuf.writeFloat64(ho.writeRangeMin);
        }
        if (ho.hasOwnProperty('writeRangeMax')) {
            hbuf.writeFloat64(ho.writeRangeMax);
        }
        if (ho.hasOwnProperty('updateUrl')) {
            hbuf.writeUtf8String(ho.updateUrl);
        }
        if (ho.hasOwnProperty('history')) {
            hbuf.writeUInt16(ho.history);
        }
        return hbuf.buf;
    }

    encodeLength(ho: any, dataType: any) {
        let elen = 2 + Buffer.byteLength(ho.path, 'ascii');

        if (ho.hasOwnProperty('nid')) {
            elen += 2;
        }
        if (ho.hasOwnProperty('value')) {
            elen += this._getDataTypeSize(dataType, ho.value);
        }
        if (ho.hasOwnProperty('timestamp')) {
            elen += 8;
        }
        if (ho.hasOwnProperty('quality')) {
            elen += 1;
        }
        if (ho.hasOwnProperty('description')) {
            elen += 2 + Buffer.byteLength(ho.description, 'utf8');
        }
        if (ho.hasOwnProperty('flags')) {
            elen += 1;
        }
        if (ho.hasOwnProperty('dataType')) {
            elen += 1;
        }
        if (ho.hasOwnProperty('triggerMode')) {
            elen += 1;
            if (ho.hasOwnProperty('triggerN')) {
                if (ho.triggerMode === constants.TRIGGER_R || ho.triggerMode === constants.TRIGGER_R_T) {
                    elen += 4;
                }
                else if (ho.triggerMode === constants.TRIGGER_T_S) {
                    elen += 4;
                }
                else {
                    elen += this._getDataTypeSize(dataType);
                }
            }
            if (ho.hasOwnProperty('triggerT')) {
                elen += 4;
            }
        }
        if (ho.hasOwnProperty('triggerDomain')) {
            elen += 1;
        }
        if (ho.hasOwnProperty('qosLevel')) {
            elen += 1;
        }
        if (ho.hasOwnProperty('scalingFactor')) {
            elen += 8;
        }
        if (ho.hasOwnProperty('scalingOffset')) {
            elen += 8;
        }
        if (ho.hasOwnProperty('format')) {
            elen += 2 + Buffer.byteLength(ho.format, 'utf8');
        }
        if (ho.hasOwnProperty('writeRangeMin')) {
            elen += 8;
        }
        if (ho.hasOwnProperty('writeRangeMax')) {
            elen += 8;
        }
        if (ho.hasOwnProperty('history')) {
            elen += 2;
        }
        return elen;
    }

    _getDataTypeSize(dataType: any, value?: any) {
        switch (dataType) {
            case 0:
            case 1:
            case 2:
                return 1;
            case 3:
            case 4:
                return 2;
            case 5:
            case 6:
            case 9:
                return 4;
            case 7:
            case 8:
            case 10:
                return 8;
            case 12:
                return 2 + Buffer.byteLength(value, 'utf8');
            case 13:
                return 2 + Buffer.byteLength(value, 'hex');
            default:
                throw new RangeError();
        }
    }
}
