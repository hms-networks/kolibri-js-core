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

export class LoginOpcode extends Opcode {
    constructor() {
        super('login', 0x02);
    }

    decode(data: any) {
        let kpo: any = {
            opcode: constants.OPCODE_LOGIN
        };
        try {
            let ocBuf = new OpcodeBuffer(data);
            ocBuf.setIndex(1);
            kpo.sid = ocBuf.readUInt16();
            if (kpo.sid === 0) {
                throw new KolibriError(ec.INVALID_SEQUENCE_NUMBER, kpo);
            }
            kpo.options = ocBuf.readUInt8();
            kpo.user = ocBuf.readUtf8String();
            kpo.password = ocBuf.readUtf8String();
            kpo.interval = ocBuf.readUInt16();
            kpo.timeout = ocBuf.readUInt8();
            kpo.publishOptions = ocBuf.readUInt8();

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
        let bufferLength = this.encodeLength(kpo);
        let ocBuf = new OpcodeBuffer(bufferLength);
        ocBuf.writeUInt8(0x02);
        ocBuf.writeUInt16(kpo.sid);
        ocBuf.writeUInt8(kpo.options);
        ocBuf.writeUtf8String(kpo.user);
        ocBuf.writeUtf8String(kpo.password);
        ocBuf.writeUInt16(kpo.interval);
        ocBuf.writeUInt8(kpo.timeout);
        ocBuf.writeUInt8(kpo.publishOptions);
        return ocBuf.buf;
    }

    encodeLength(kpo: any) {
        return 12 + Buffer.byteLength(kpo.user) + Buffer.byteLength(kpo.password);
    }
}

