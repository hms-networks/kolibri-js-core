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
import { errorcode, KolibriError } from '../../common/errorcode';
import { OpcodeCompatMapper } from '../../mapper/opcode_compat_mapper';
import { Opcode } from './opcode';

export class OpcodeDecoder {
    private opcodesMap = new Map<number, Opcode>();

    constructor(
        readonly opcodes: any[],
        private opcodeCompatMapper: OpcodeCompatMapper
    ) {
        this.opcodes.forEach((opcode: any) => {
            this.opcodesMap.set(opcode.getCode(), opcode);
        });
    }

    getOpcode(code: number) {
        const opcode = this.opcodesMap.get(code);
        if (!opcode) {
            throw new KolibriError(errorcode.INVALID_OPCODE);
        }
        return opcode;
    }

    getNameFromOpcode(opcode: any) {
        return this.getOpcode(opcode).getName();
    }

    decode(buffer: Buffer) {
        const opcode = this.getOpcode(buffer[0]);

        const kpo = opcode.decode(buffer);
        return this.opcodeCompatMapper.map(kpo, constants.INCOMING_DIRECTION);
    }

    encode(kpo: any) {
        const opcode = this.getOpcode(kpo.opcode);

        let compatKpo = this.opcodeCompatMapper.map(kpo, constants.OUTGOING_DIRECTION);
        return opcode.encode(compatKpo);
    }
}
