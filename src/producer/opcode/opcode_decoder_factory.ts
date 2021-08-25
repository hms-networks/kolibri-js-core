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

import { KolibriVersion, Opcode, pV10, pV20 } from '../..';
import { OpcodeCompatMapper } from '../../mapper/opcode_compat_mapper';
import { VersionService } from '../../util';
import { OpcodeDecoder } from './opcode_decoder';


export class OpcodeDecoderFactory {
    static create(kolibriVersion: KolibriVersion) {
        if (VersionService.isVersionInRange(kolibriVersion, '1.0')) {
            return this.createV1();
        }
        else if (VersionService.isVersionInRange(kolibriVersion, '2.0')) {
            return this.createV2();
        }
        else {
            throw new Error('Cannot create OpcodeDecoder for provided version');
        }
    }

    static createV1() {
        const kolibriVersion = new KolibriVersion('kolibri');
        const opcodeCompatMapper = new OpcodeCompatMapper(kolibriVersion);
        return new OpcodeDecoder(this.getV1Opcodes(), opcodeCompatMapper);
    }

    static createV2() {
        const kolibriVersion = new KolibriVersion('v2.0.kolibri');
        const opcodeCompatMapper = new OpcodeCompatMapper(kolibriVersion);
        return new OpcodeDecoder(this.getV2Opcodes(), opcodeCompatMapper);
    }

    private static getV1Opcodes(): Opcode[] {
        return [
            new pV10.AckOpcode(),
            new pV10.CancelOpcode(),
            new pV10.CommitOpcode(),
            new pV10.CommittedWriteOpcode(),
            new pV10.CreateModifyNodeOpcode(),
            new pV10.DeleteNodeOpcode(),
            new pV10.EmergencyOpcode(),
            new pV10.EnablePublishOpcode(),
            new pV10.GetHashOpcode(),
            new pV10.GetHashResponseOpcode(),
            new pV10.GetNodePropertiesOpcode(),
            new pV10.GetNodePropertiesResponseOpcode(),
            new pV10.GetTimeOpcode(),
            new pV10.GetTimeResponseOpcode(),
            new pV10.LoginOpcode(),
            new pV10.NakOpcode(),
            new pV10.PublishOpcode(),
            new pV10.ThrottleOpcode(),
            new pV10.UnpublishOpcode(),
            new pV10.WriteOpcode()
        ];
    }

    private static getV2Opcodes(): Opcode[] {
        return [
            new pV10.AckOpcode(),
            new pV10.CancelOpcode(),
            new pV10.CommitOpcode(),
            new pV10.DeleteNodeOpcode(),
            new pV10.EnablePublishOpcode(),
            new pV10.GetHashOpcode(),
            new pV10.GetHashResponseOpcode(),
            new pV10.GetNodePropertiesOpcode(),
            new pV10.GetTimeOpcode(),
            new pV10.NakOpcode(),
            new pV10.ThrottleOpcode(),
            new pV10.UnpublishOpcode(),
            new pV20.CommittedWriteOpcode(),
            new pV20.CreateModifyNodeOpcode(),
            new pV20.WriteOpcode(),
            new pV20.PublishOpcode(),
            new pV20.GetTimeResponseOpcode(),
            new pV20.LoginOpcode(),
            new pV20.GetNodePropertiesResponseOpcode(),
            new pV20.EmergencyOpcode()
        ];
    }
}
