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
import { constants } from '../../../common/constant';
import { KolibriError, errorcode as ec } from '../../../common/errorcode';
import { OpcodeBuffer } from '../../buffer_utils/opcode_buffer';
import { Opcode } from '../opcode';

export class CommittedWriteOpcode extends Opcode {
    constructor() {
        super('committedWrite', 0x11);
    }

    decode(data: any) {
        let kpo: any = {
            opcode: constants.OPCODE_COMMITTEDWRITE
        };
        try {
            let ocBuf = new OpcodeBuffer(data);
            ocBuf.setIndex(1);
            kpo.sid = ocBuf.readUInt16();
            if (kpo.sid === 0) {
                throw new KolibriError(ec.INVALID_SEQUENCE_NUMBER, kpo);
            }

            kpo.tid = ocBuf.readUInt16();
            kpo.nodes = [];
            while (!ocBuf.isEob()) {
                let m: any = {};
                m.nid = ocBuf.readUInt16();
                m.dataType = ocBuf.readUInt8();
                m.timestamp = Long.fromValue(ocBuf.readUInt64()).toNumber();
                m.quality = ocBuf.readUInt8();
                m.value = ocBuf.readDataType(m.dataType);
                kpo.nodes.push(m);
            }
            if (kpo.nodes.length === 0) {
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
        ocBuf.writeUInt8(0x11);
        ocBuf.writeUInt16(kpo.sid);
        ocBuf.writeUInt16(kpo.tid);
        for (let i = 0, len = kpo.nodes.length; i < len; i++) {
            let m = kpo.nodes[i];
            ocBuf.writeUInt16(m.nid);
            ocBuf.writeUInt8(m.dataType);
            ocBuf.writeUInt64(m.timestamp);
            ocBuf.writeUInt8(m.quality);
            ocBuf.writeDataType(m.value, m.dataType);
        }
        return ocBuf.buf;
    }

    encodeLength(kpo: any) {
        let elen = 5;
        for (let i = 0, len = kpo.nodes.length; i < len; i++) {
            let m = kpo.nodes[i];
            elen += 12;
            elen += this.getDataTypeSize(m.dataType, m.value);
        }
        return elen;
    }
}

