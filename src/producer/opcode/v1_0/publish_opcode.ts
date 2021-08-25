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

export class PublishOpcode extends Opcode {
    constructor() {
        super('publish', 0x08);
    }

    decode(data: any) {
        let kpo: any = {
            opcode: constants.OPCODE_PUBLISH
        };
        try {
            let ocBuf = new OpcodeBuffer(data);
            ocBuf.setIndex(1);
            kpo.sid = ocBuf.readUInt16();
            if (kpo.sid === 0) {
                throw new KolibriError(ec.INVALID_SEQUENCE_NUMBER, kpo);
            }
            kpo.cmdflags = ocBuf.readUInt8();
            kpo.nodes = [];
            while (!ocBuf.isEob()) {
                let m: any = {};
                m.nid = ocBuf.readUInt16();
                m.path = ocBuf.readUtf8String();
                // Points only
                if (!(kpo.cmdflags & constants.PUBLISH_GROUP)) {
                    m.flags = ocBuf.readUInt8();
                    m.dataType = ocBuf.readUInt8();
                    m.triggerMode = ocBuf.readUInt8();
                    if (m.triggerMode === constants.TRIGGER_N || m.triggerMode === constants.TRIGGER_N_T) {
                        if (m.dataType < constants.DT_NUMERIC_MIN || m.dataType > constants.DT_NUMERIC_MAX) {
                            throw new KolibriError(ec.INVALID_DATA_TYPE, kpo);
                        }
                        m.triggerN = this.readTriggerN(ocBuf, m.dataType, kpo);
                    }
                    if (
                        m.triggerMode === constants.TRIGGER_T ||
                        m.triggerMode === constants.TRIGGER_N_T ||
                        m.triggerMode === constants.TRIGGER_T_CHANGED
                    ) {
                        m.triggerT = ocBuf.readUInt32();
                    }
                    m.triggerDomain = ocBuf.readUInt8();
                    m.qosLevel = ocBuf.readUInt8();
                }
                kpo.nodes.push(m);
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
        ocBuf.writeUInt8(kpo.opcode);
        ocBuf.writeUInt16(kpo.sid);
        if (kpo.sid === 0) {
            throw new KolibriError(ec.INVALID_SEQUENCE_NUMBER);
        }
        ocBuf.writeUInt8(kpo.cmdflags);
        for (let i = 0, len = kpo.nodes.length; i < len; i++) {
            let m = kpo.nodes[i];
            ocBuf.writeUInt16(m.nid);
            ocBuf.writeUtf8String(m.path);
            if (!(kpo.cmdflags & constants.PUBLISH_GROUP)) {
                ocBuf.writeUInt8(m.flags);
                ocBuf.writeUInt8(m.dataType);
                ocBuf.writeUInt8(m.triggerMode);
                if (m.triggerMode === constants.TRIGGER_N || m.triggerMode === constants.TRIGGER_N_T) {
                    this.writeTriggerN(ocBuf, m.triggerN, m.dataType);
                }
                if (
                    m.triggerMode === constants.TRIGGER_T ||
                    m.triggerMode === constants.TRIGGER_N_T ||
                    m.triggerMode === constants.TRIGGER_T_CHANGED
                ) {
                    ocBuf.writeUInt32(m.triggerT);
                }
                ocBuf.writeUInt8(m.triggerDomain);
                ocBuf.writeUInt8(m.qosLevel);
            }
        }
        return ocBuf.buf;
    }

    encodeLength(kpo: any) {
        let elen = 4;
        for (let i = 0, len = kpo.nodes.length; i < len; i++) {
            let m = kpo.nodes[i];
            elen += 4 + Buffer.byteLength(m.path, 'ascii');
            if (!(kpo.cmdflags & constants.PUBLISH_GROUP)) {
                elen += 5;
                if (m.triggerMode === constants.TRIGGER_N || m.triggerMode === constants.TRIGGER_N_T) {
                    if (m.dataType < constants.DT_NUMERIC_MIN || m.dataType > constants.DT_NUMERIC_MAX) {
                        throw new KolibriError(ec.INVALID_DATA_TYPE);
                    }
                    elen += this.getDataTypeSize(m.dataType);
                }
                if (
                    m.triggerMode === constants.TRIGGER_T ||
                    m.triggerMode === constants.TRIGGER_N_T ||
                    m.triggerMode === constants.TRIGGER_T_CHANGED
                ) {
                    elen += 4;
                }
            }
        }
        return elen;
    }
}

