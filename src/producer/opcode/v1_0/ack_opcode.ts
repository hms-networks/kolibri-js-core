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
import { KolibriError, errorcode as ec } from '../../../common/errorcode';
import { OpcodeBuffer } from '../../buffer_utils/opcode_buffer';
import { Opcode } from '../opcode';

export class AckOpcode extends Opcode {
    constructor() {
        super('ack', constants.OPCODE_ACK);
    }

    decode(data: any) {
        let kpo: any = {
            opcode: constants.OPCODE_ACK
        };
        try {
            let ocBuf = new OpcodeBuffer(data);
            ocBuf.setIndex(1);
            kpo.sid = ocBuf.readUInt16();
            if (kpo.sid === 0) {
                throw new KolibriError(ec.INVALID_SEQUENCE_NUMBER, kpo);
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
        let ocBuf = new OpcodeBuffer(this.encodeLength());
        ocBuf.writeUInt8(constants.OPCODE_ACK);
        ocBuf.writeUInt16(kpo.sid);
        return ocBuf.buf;
    }

    encodeLength() {
        return 3;
    }
}
