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

export class DeleteNodeOpcode extends Opcode {
    constructor() {
        super('deleteNode', 0x0f);
    }

    decode(data: any) {
        let kpo: any = {
            opcode: constants.OPCODE_DELETENODE
        };
        try {
            let ocBuf = new OpcodeBuffer(data);
            ocBuf.setIndex(1);
            kpo.sid = ocBuf.readUInt16();
            if (kpo.sid === 0) {
                throw new KolibriError(ec.INVALID_SEQUENCE_NUMBER, kpo);
            }
            kpo.type = ocBuf.readUInt8();
            switch (kpo.type) {
                case constants.POINT:
                case constants.GROUP:
                    kpo.nid = ocBuf.readUInt16();
                    break;
                case constants.PATH:
                    kpo.path = ocBuf.readAsciiString();
                    break;
                default:
                    throw new KolibriError(ec.INVALID_NODE_TYPE, kpo);
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
        ocBuf.writeUInt8(kpo.opcode);
        ocBuf.writeUInt16(kpo.sid);
        ocBuf.writeUInt8(kpo.type);
        switch (kpo.type) {
            case constants.POINT:
            case constants.GROUP:
                ocBuf.writeUInt16(kpo.nid);
                break;
            case constants.PATH:
                ocBuf.writeAsciiString(kpo.path);
                break;
            default:
                throw new KolibriError(ec.INVALID_NODE_TYPE);
        }
        return ocBuf.buf;
    }

    encodeLength(kpo: any) {
        return kpo.type === constants.PATH ? 6 + Buffer.byteLength(kpo.path, 'ascii') : 6;
    }
}

