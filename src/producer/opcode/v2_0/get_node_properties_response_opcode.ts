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


import { constants } from '../../../common/constant';
import {KolibriError, errorcode as ec} from '../../../common/errorcode';
import { OpcodeBuffer } from '../../buffer_utils/opcode_buffer';
import { Opcode } from '../opcode';

export class GetNodePropertiesResponseOpcode extends Opcode {
    constructor() {
        super('getNodePropertiesResponse', 0x0d);
    }

    decode(data: any) {
        let kpo: any = {
            opcode: constants.OPCODE_GETNODEPROPERTIES_RESPONSE
        };
        try {
            let ocBuf = new OpcodeBuffer(data);
            ocBuf.setIndex(1);
            kpo.sid = ocBuf.readUInt16();
            if (kpo.sid === 0) {
                throw new KolibriError(ec.INVALID_SEQUENCE_NUMBER, kpo);
            }
            kpo.type = ocBuf.readUInt8();
            kpo.nid = ocBuf.readUInt16();
            kpo.path = ocBuf.readAsciiString();
            kpo.description = ocBuf.readUtf8String();
            kpo.flags = ocBuf.readUInt8();
            if (kpo.type === constants.POINT) {
                kpo.dataType = ocBuf.readUInt8();
            }
            kpo.triggerMode = ocBuf.readUInt8();
            if (kpo.type === constants.POINT) {
                if (kpo.triggerMode === constants.TRIGGER_N || kpo.triggerMode === constants.TRIGGER_N_T) {
                    if (kpo.dataType < constants.DT_NUMERIC_MIN || kpo.dataType > constants.DT_NUMERIC_MAX) {
                        throw new KolibriError(ec.INVALID_DATA_TYPE, kpo);
                    }
                    kpo.triggerN = this.readTriggerN(ocBuf, kpo.dataType, kpo);
                }
            }
            if (kpo.triggerMode === constants.TRIGGER_R || kpo.triggerMode === constants.TRIGGER_R_T) {
                if (kpo.dataType < constants.DT_NUMERIC_MIN || kpo.dataType > constants.DT_NUMERIC_MAX) {
                    throw new KolibriError(ec.INVALID_DATA_TYPE, kpo);
                }
                kpo.triggerN = ocBuf.readFloat32();
            }
            if (kpo.triggerMode === constants.TRIGGER_T_S) {
                kpo.triggerN = ocBuf.readUInt32();
            }
            if (
                kpo.triggerMode === constants.TRIGGER_T ||
                kpo.triggerMode === constants.TRIGGER_N_T ||
                kpo.triggerMode === constants.TRIGGER_T_CHANGED ||
                kpo.triggerMode === constants.TRIGGER_R_T ||
                kpo.triggerMode === constants.TRIGGER_T_S
            ) {
                kpo.triggerT = ocBuf.readUInt32();
            }
            kpo.triggerDomain = ocBuf.readUInt8();
            kpo.qosLevel = ocBuf.readUInt8();
            kpo.history = ocBuf.readUInt16();
            if (kpo.type === constants.POINT) {
                kpo.format = ocBuf.readUtf8String();
                if (kpo.dataType >= constants.DT_NUMERIC_MIN && kpo.dataType <= constants.DT_NUMERIC_MAX) {
                    kpo.scalingFactor = ocBuf.readFloat64();
                    kpo.scalingOffset = ocBuf.readFloat64();
                    kpo.writeRangeMin = ocBuf.readFloat64();
                    kpo.writeRangeMax = ocBuf.readFloat64();
                }
            }
            if (!ocBuf.isEob()) {
                throw new KolibriError(ec.PROTOCOL_ERROR, kpo);
            }
        }
        catch (e) {
            if (e instanceof KolibriError) {
                throw e;
            }
            else {
                throw new KolibriError(ec.PROTOCOL_ERROR, kpo);
            }
        }
        return kpo;
    }

    encode(kpo: any) {
        let ocBuf = new OpcodeBuffer(this.encodeLength(kpo));
        ocBuf.writeUInt8(0x0d);
        ocBuf.writeUInt16(kpo.sid);
        ocBuf.writeUInt8(kpo.type);
        ocBuf.writeUInt16(kpo.nid);
        ocBuf.writeAsciiString(kpo.path);
        ocBuf.writeUtf8String(kpo.description);
        ocBuf.writeUInt8(kpo.flags);
        if (kpo.type === constants.POINT) {
            ocBuf.writeUInt8(kpo.dataType);
        }
        ocBuf.writeUInt8(kpo.triggerMode);
        if (kpo.type === constants.POINT) {
            if (kpo.triggerMode === constants.TRIGGER_N || kpo.triggerMode === constants.TRIGGER_N_T) {
                this.writeTriggerN(ocBuf, kpo.triggerN, kpo.dataType);
            }
        }
        if (kpo.triggerMode === constants.TRIGGER_R || kpo.triggerMode === constants.TRIGGER_R_T) {
            ocBuf.writeFloat32(kpo.triggerN);
        }
        if (kpo.triggerMode === constants.TRIGGER_T_S) {
            ocBuf.writeUInt32(kpo.triggerN);
        }
        if (
            kpo.triggerMode === constants.TRIGGER_T ||
            kpo.triggerMode === constants.TRIGGER_N_T ||
            kpo.triggerMode === constants.TRIGGER_T_CHANGED ||
            kpo.triggerMode === constants.TRIGGER_R_T ||
            kpo.triggerMode === constants.TRIGGER_T_S
        ) {
            ocBuf.writeUInt32(kpo.triggerT);
        }
        ocBuf.writeUInt8(kpo.triggerDomain);
        ocBuf.writeUInt8(kpo.qosLevel);
        ocBuf.writeUInt16(kpo.history);
        if (kpo.type === constants.POINT) {
            ocBuf.writeUtf8String(kpo.format);
            if (kpo.dataType >= constants.DT_NUMERIC_MIN && kpo.dataType <= constants.DT_NUMERIC_MAX) {
                ocBuf.writeFloat64(kpo.scalingFactor);
                ocBuf.writeFloat64(kpo.scalingOffset);
                ocBuf.writeFloat64(kpo.writeRangeMin);
                ocBuf.writeFloat64(kpo.writeRangeMax);
            }
        }
        return ocBuf.buf;
    }

    encodeLength(kpo: any) {
        let elen = 16;
        elen += Buffer.byteLength(kpo.path, 'ascii');
        elen += Buffer.byteLength(kpo.description, 'utf8');
        if (
            kpo.triggerMode === constants.TRIGGER_T ||
            kpo.triggerMode === constants.TRIGGER_N_T ||
            kpo.triggerMode === constants.TRIGGER_T_CHANGED ||
            kpo.triggerMode === constants.TRIGGER_R_T ||
            kpo.triggerMode === constants.TRIGGER_T_S
        ) {
            elen += 4;
        }
        if (kpo.type === constants.POINT) {
            elen += 3 + Buffer.byteLength(kpo.format, 'utf8');
            if (kpo.triggerMode === constants.TRIGGER_N || kpo.triggerMode === constants.TRIGGER_N_T) {
                if (kpo.dataType < constants.DT_NUMERIC_MIN || kpo.dataType > constants.DT_NUMERIC_MAX) {
                    throw new KolibriError(ec.INVALID_DATA_TYPE);
                }
                elen += this.getDataTypeSize(kpo.dataType);
            }
            else if (kpo.triggerMode === constants.TRIGGER_T_S) {
                elen += 4;
            }
            if (kpo.dataType >= constants.DT_NUMERIC_MIN && kpo.dataType <= constants.DT_NUMERIC_MAX) {
                elen += 32;
            }
        }
        if (kpo.triggerMode === constants.TRIGGER_R ||
            kpo.triggerMode === constants.TRIGGER_R_T) {
            elen += 4;
        }
        return elen;
    }
}
