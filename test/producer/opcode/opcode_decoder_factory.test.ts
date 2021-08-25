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

import { KolibriVersion } from '../../../src';
import { OpcodeDecoderFactory } from '../../../src/producer/opcode/opcode_decoder_factory';

describe('OpcodeDecoderFactory:', () => {
    describe('create:', () => {
        it('should create an OpcodeDecoder V1 instance', function () {
            const kolibriVersion = new KolibriVersion('kolibri');
            const opcodeDecoder = OpcodeDecoderFactory.create(kolibriVersion);
            expect(opcodeDecoder).not.toBeNull();
        });
        it('should create an OpcodeDecoder V2 instance', function () {
            const kolibriVersion = new KolibriVersion('v2.0.p.kolibri');
            const opcodeDecoder = OpcodeDecoderFactory.create(kolibriVersion);
            expect(opcodeDecoder).not.toBeNull();
        });

        it('should throw error on unavailable kolibri protocol decoder', function () {
            const kolibriVersion = new KolibriVersion('v99.0.p.kolibri');
            expect(() => {
                OpcodeDecoderFactory.create(kolibriVersion);
            }).toThrowError();
        });
    });
});
