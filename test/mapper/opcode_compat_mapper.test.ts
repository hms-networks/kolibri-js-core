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
import { constants } from '../../src/common/constant';
import { KolibriVersion } from '../../src/common/kolibri_version';
import { OpcodeCompatMapper } from '../../src/mapper/opcode_compat_mapper';

describe('Opcode Compat Mapper : ', function () {
    it('should map v2 opcode write to v1', () => {
        let kpo = {
            opcode: constants.OPCODE_WRITE,
            sid: 123,
            nodes: [
                {
                    nid: 912,
                    dataType: constants.DT_BOOLEAN,
                    timestamp: Date.now() * 1e3,
                    quality: constants.QOS_AT_LEAST_ONCE,
                    value: true
                }
            ]
        };

        const mappedKpo = new OpcodeCompatMapper(new KolibriVersion('kolibri')).map(kpo, constants.OUTGOING_DIRECTION);

        expect(mappedKpo.opcode).toEqual(constants.OPCODE_WRITE);
        expect(mappedKpo.nodes[0].timestamp.toString().length).toEqual(10);
    });

    it('pass v2 with micro seconds timestamp as it is back', () => {
        let kpo = {
            opcode: constants.OPCODE_WRITE,
            sid: 123,
            nodes: [
                {
                    nid: 912,
                    dataType: constants.DT_BOOLEAN,
                    timestamp: Date.now() * 1e3,
                    quality: constants.QOS_AT_LEAST_ONCE,
                    value: true
                }
            ]
        };

        const mappedKpo = new OpcodeCompatMapper(new KolibriVersion('v2.0.kolibri')).map(kpo, null);

        expect(mappedKpo.opcode).toEqual(constants.OPCODE_WRITE);
        expect(mappedKpo.nodes[0].timestamp.toString().length).toEqual(16);
    });
});
