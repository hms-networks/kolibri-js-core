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

export class CreateModifyNodeOpcode extends Opcode {
    constructor() {
        super('createModifyNode', 0x0e);
    }

    decode(data: any) {
        let kpo: any = {
            opcode: constants.OPCODE_CREATEMODIFYNODE
        };
        try {
            let ocBuf = new OpcodeBuffer(data);
            ocBuf.setIndex(1);
            kpo.sid = ocBuf.readUInt16();
            if (kpo.sid === 0) {
                throw new KolibriError(ec.INVALID_SEQUENCE_NUMBER, kpo);
            }
            kpo.options = ocBuf.readUInt16();
            if (kpo.options & constants.CREATEMODIFYNODE_RESERVED) {
                throw new KolibriError(ec.INVALID_OPTION, kpo);
            }
            kpo.type = ocBuf.readUInt8();
            if (kpo.options & constants.CREATEMODIFYNODE_INDEX) {
                if (!(kpo.options & constants.CREATEMODIFYNODE_MODIFY)) {
                    throw new KolibriError(ec.INVALID_OPTION, kpo);
                }
                kpo.nid = ocBuf.readUInt16();
            }
            else {
                kpo.path = ocBuf.readAsciiString();
            }
            if (kpo.options & constants.CREATEMODIFYNODE_DESCRIPTION) {
                kpo.description = ocBuf.readUtf8String();
            }
            if (kpo.options & constants.CREATEMODIFYNODE_FLAGS) {
                kpo.flags = ocBuf.readUInt8();
            }
            if (kpo.options & constants.CREATEMODIFYNODE_DATATYPE) {
                if (kpo.type === constants.GROUP) {
                    throw new KolibriError(ec.INVALID_OPTION, kpo);
                }
                kpo.dataType = ocBuf.readUInt8();
            }
            if (kpo.options & constants.CREATEMODIFYNODE_TRIGGERMODE) {
                kpo.triggerMode = ocBuf.readUInt8();
                if (kpo.triggerMode === constants.TRIGGER_N || kpo.triggerMode === constants.TRIGGER_N_T) {
                    if (!(kpo.options & constants.CREATEMODIFYNODE_DATATYPE)) {
                        throw new KolibriError(ec.INVALID_OPTION, kpo);
                    }
                    if (kpo.dataType < constants.DT_NUMERIC_MIN || kpo.dataType > constants.DT_NUMERIC_MAX) {
                        throw new KolibriError(ec.INVALID_DATA_TYPE, kpo);
                    }
                    kpo.triggerN = this.readTriggerN(ocBuf, kpo.dataType, kpo);
                }
                if (kpo.triggerMode === constants.TRIGGER_R ||
                    kpo.triggerMode === constants.TRIGGER_R_T) {
                    if (!(kpo.options & constants.CREATEMODIFYNODE_DATATYPE)) {
                        throw new KolibriError(ec.INVALID_OPTION, kpo);
                    }
                    if (kpo.dataType < constants.DT_NUMERIC_MIN || kpo.dataType > constants.DT_NUMERIC_MAX) {
                        throw new KolibriError(ec.INVALID_DATA_TYPE, kpo);
                    }
                    kpo.triggerN = ocBuf.readFloat32();
                }
                if (kpo.triggerMode === constants.TRIGGER_T_S) {
                    if (!(kpo.options & constants.CREATEMODIFYNODE_DATATYPE)) {
                        throw new KolibriError(ec.INVALID_OPTION, kpo);
                    }
                    if (kpo.dataType < constants.DT_NUMERIC_MIN || kpo.dataType > constants.DT_NUMERIC_MAX) {
                        throw new KolibriError(ec.INVALID_DATA_TYPE, kpo);
                    }
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
            }
            if (kpo.options & constants.CREATEMODIFYNODE_TRIGGERDOMAIN) {
                kpo.triggerDomain = ocBuf.readUInt8();
            }
            if (kpo.options & constants.CREATEMODIFYNODE_QOSLEVEL) {
                kpo.qosLevel = ocBuf.readUInt8();
            }
            if (kpo.options & constants.CREATEMODIFYNODE_HISTORY) {
                kpo.history = ocBuf.readUInt16();
            }
            if (
                kpo.options &
                (constants.CREATEMODIFYNODE_FORMAT +
                    constants.CREATEMODIFYNODE_SCALING +
                    constants.CREATEMODIFYNODE_WRITERANGE) &&
                kpo.type === constants.GROUP
            ) {
                throw new KolibriError(ec.INVALID_NODE_TYPE, kpo);
            }
            if (kpo.options & constants.CREATEMODIFYNODE_FORMAT) {
                kpo.format = ocBuf.readUtf8String();
            }
            if (kpo.options & constants.CREATEMODIFYNODE_SCALING) {
                if (kpo.dataType < constants.DT_NUMERIC_MIN || kpo.dataType > constants.DT_NUMERIC_MAX) {
                    throw new KolibriError(ec.INVALID_DATA_TYPE, kpo);
                }
                kpo.scalingFactor = ocBuf.readFloat64();
                kpo.scalingOffset = ocBuf.readFloat64();
            }
            if (kpo.options & constants.CREATEMODIFYNODE_WRITERANGE) {
                if (kpo.dataType < constants.DT_NUMERIC_MIN || kpo.dataType > constants.DT_NUMERIC_MAX) {
                    throw new KolibriError(ec.INVALID_DATA_TYPE, kpo);
                }
                kpo.writeRangeMin = ocBuf.readFloat64();
                kpo.writeRangeMax = ocBuf.readFloat64();
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
        ocBuf.writeUInt8(0x0e);
        ocBuf.writeUInt16(kpo.sid);
        ocBuf.writeUInt16(kpo.options);
        ocBuf.writeUInt8(kpo.type);
        if (kpo.options & constants.CREATEMODIFYNODE_INDEX) {
            ocBuf.writeUInt16(kpo.nid);
        }
        else {
            ocBuf.writeAsciiString(kpo.path);
        }
        if (kpo.options & constants.CREATEMODIFYNODE_DESCRIPTION) {
            ocBuf.writeUtf8String(kpo.description);
        }
        if (kpo.options & constants.CREATEMODIFYNODE_FLAGS) {
            ocBuf.writeUInt8(kpo.flags);
        }
        if (kpo.options & constants.CREATEMODIFYNODE_DATATYPE) {
            ocBuf.writeUInt8(kpo.dataType);
        }
        if (kpo.options & constants.CREATEMODIFYNODE_TRIGGERMODE) {
            ocBuf.writeUInt8(kpo.triggerMode);
            if (kpo.triggerMode === constants.TRIGGER_N || kpo.triggerMode === constants.TRIGGER_N_T) {
                this.writeTriggerN(ocBuf, kpo.triggerN, kpo.dataType);
            }
            else if (kpo.triggerMode === constants.TRIGGER_R || kpo.triggerMode === constants.TRIGGER_R_T) {
                ocBuf.writeFloat32(kpo.triggerN);
            }
            else if (kpo.triggerMode === constants.TRIGGER_T_S) {
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
        }
        if (kpo.options & constants.CREATEMODIFYNODE_TRIGGERDOMAIN) {
            ocBuf.writeUInt8(kpo.triggerDomain);
        }
        if (kpo.options & constants.CREATEMODIFYNODE_QOSLEVEL) {
            ocBuf.writeUInt8(kpo.qosLevel);
        }
        if (kpo.options & constants.CREATEMODIFYNODE_HISTORY) {
            ocBuf.writeUInt16(kpo.history);
        }
        if (kpo.options & constants.CREATEMODIFYNODE_FORMAT) {
            ocBuf.writeUtf8String(kpo.format);
        }
        if (kpo.options & constants.CREATEMODIFYNODE_SCALING) {
            ocBuf.writeFloat64(kpo.scalingFactor);
            ocBuf.writeFloat64(kpo.scalingOffset);
        }
        if (kpo.options & constants.CREATEMODIFYNODE_WRITERANGE) {
            ocBuf.writeFloat64(kpo.writeRangeMin);
            ocBuf.writeFloat64(kpo.writeRangeMax);
        }
        return ocBuf.buf;
    }

    encodeLength(kpo: any) {
        let elen = 6;
        if (kpo.options & constants.CREATEMODIFYNODE_INDEX) {
            if (!(kpo.options & constants.CREATEMODIFYNODE_MODIFY)) {
                throw new KolibriError(ec.INVALID_OPTION);
            }
            elen += 2;
        }
        else {
            elen += 2 + Buffer.byteLength(kpo.path, 'ascii');
        }
        if (kpo.options & constants.CREATEMODIFYNODE_DESCRIPTION) {
            elen += 2 + Buffer.byteLength(kpo.description, 'utf8');
        }
        if (kpo.options & constants.CREATEMODIFYNODE_FLAGS) {
            elen += 1;
        }
        if (kpo.options & constants.CREATEMODIFYNODE_DATATYPE) {
            if (kpo.type === constants.GROUP) {
                throw new KolibriError(ec.INVALID_NODE_TYPE);
            }
            elen += 1;
        }
        if (kpo.options & constants.CREATEMODIFYNODE_TRIGGERMODE) {
            elen += 1;
            if (kpo.triggerMode === constants.TRIGGER_N || kpo.triggerMode === constants.TRIGGER_N_T) {
                if (!(kpo.options & constants.CREATEMODIFYNODE_DATATYPE)) {
                    throw new KolibriError(ec.INVALID_OPTION);
                }
                elen += this.getDataTypeSize(kpo.dataType);
            }
            if (kpo.triggerMode === constants.TRIGGER_R || kpo.triggerMode === constants.TRIGGER_R_T) {
                elen += 4;
            }
            else if (kpo.triggerMode === constants.TRIGGER_T_S) {
                elen += 4;
            }
            if (
                kpo.triggerMode === constants.TRIGGER_T ||
                kpo.triggerMode === constants.TRIGGER_N_T ||
                kpo.triggerMode === constants.TRIGGER_T_CHANGED ||
                kpo.triggerMode === constants.TRIGGER_R_T ||
                kpo.triggerMode === constants.TRIGGER_T_S
            ) {
                elen += 4;
            }
        }
        if (kpo.options & constants.CREATEMODIFYNODE_TRIGGERDOMAIN) {
            elen += 1;
        }
        if (kpo.options & constants.CREATEMODIFYNODE_QOSLEVEL) {
            elen += 1;
        }
        if (kpo.options & constants.CREATEMODIFYNODE_HISTORY) {
            elen += 2;
        }
        if (
            kpo.options &
            (constants.CREATEMODIFYNODE_FORMAT +
                constants.CREATEMODIFYNODE_SCALING +
                constants.CREATEMODIFYNODE_WRITERANGE) &&
            kpo.type === constants.GROUP
        ) {
            throw new KolibriError(ec.INVALID_NODE_TYPE);
        }
        if (kpo.options & constants.CREATEMODIFYNODE_FORMAT) {
            elen += 2 + Buffer.byteLength(kpo.format, 'utf8');
        }
        if (kpo.options & constants.CREATEMODIFYNODE_SCALING) {
            if (kpo.dataType < constants.DT_NUMERIC_MIN || kpo.dataType > constants.DT_NUMERIC_MAX) {
                throw new KolibriError(ec.INVALID_DATA_TYPE);
            }
            elen += 16;
        }
        if (kpo.options & constants.CREATEMODIFYNODE_WRITERANGE) {
            if (kpo.dataType < constants.DT_NUMERIC_MIN || kpo.dataType > constants.DT_NUMERIC_MAX) {
                throw new KolibriError(ec.INVALID_DATA_TYPE);
            }
            elen += 16;
        }
        return elen;
    }
}
