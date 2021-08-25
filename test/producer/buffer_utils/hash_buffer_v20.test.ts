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

import { HashBufferV20 } from '../../../src/producer/buffer_utils/hash_buffer_v20';

describe('HashBufferV20:', () => {
    let hashBuffer = new HashBufferV20();
    describe('encode:', () => {
        it('shall return 12 ', () => {
            const ho: any = {
                path: 'testtest',
                triggerMode: 2
            };
            let res = hashBuffer.encode(ho, 2).length;
            expect(res).toBe(11);
        });
        it('shall return 10 ', () => {
            const ho: any = {
                path: 'testtest'
            };
            let res = hashBuffer.encode(ho, 2).length;
            expect(res).toBe(10);
        });
        it('shall return 66 ', () => {
            const ho: any = {
                path: 'a',
                nid: 123,
                value: 1,
                timestamp: 123456789,
                quality: 1,
                description: 'a',
                flags: 1,
                dataType: 1,
                triggerMode: 7,
                triggerN: 2,
                triggerT: 1,
                triggerDomain: 1,
                qosLevel: 1,
                scalingFactor: 1.0,
                scalingOffset: 1.0,
                format: 'a',
                writeRangeMin: 0.1,
                writeRangeMax: 1.0
            };
            let res = hashBuffer.encode(ho, 2).length;
            expect(res).toBe(66);
        });
        it('shall return 30 ', () => {
            const ho: any = {
                path: 'a',
                nid: 123,
                value: 1,
                timestamp: 123456789,
                quality: 1,
                description: 'a',
                flags: 1,
                dataType: 1,
                triggerMode: 8,
                triggerN: 2,
                triggerT: 1,
                triggerDomain: 1
            };
            let res = hashBuffer.encode(ho, 2).length;
            expect(res).toBe(30);
        });
        it('shall return 30 ', () => {
            const ho: any = {
                path: 'a',
                nid: 123,
                value: 1,
                timestamp: 123456789,
                quality: 1,
                description: 'a',
                flags: 1,
                dataType: 1,
                triggerMode: 9,
                triggerN: 2,
                triggerT: 1,
                triggerDomain: 1
            };
            let res = hashBuffer.encode(ho, 2).length;
            expect(res).toBe(30);
        });
        it('shall return 27 ', () => {
            const ho: any = {
                path: 'a',
                nid: 123,
                value: 1,
                timestamp: 123456789,
                quality: 1,
                description: 'a',
                flags: 1,
                dataType: 1,
                triggerMode: 1,
                triggerN: 2,
                triggerT: 1,
                triggerDomain: 1
            };
            let res = hashBuffer.encode(ho, 2).length;
            expect(res).toBe(27);
        });
    });
    describe('_getDataTypeSize:', () => {
        it('shall throw an RangeError', async () => {
            await expect(() => hashBuffer._getDataTypeSize(14)).toThrowError(RangeError);
        });
    });
    describe('encodeLength', () => {
        it('shall return 11', () => {
            const ho: any = {
                path: 'testtest',
                triggerMode: 2
            };
            let res = hashBuffer.encodeLength(ho, 1);
            expect(res).toBe(11);
        });
        it('shall return 12', () => {
            const ho: any = {
                path: 'testtest',
                triggerMode: 2,
                triggerN: 2
            };
            let res = hashBuffer.encodeLength(ho, 0);
            expect(res).toBe(12);
        });
        it('shall return 10', () => {
            const ho: any = {
                path: 'testtest'
            };
            let res = hashBuffer.encodeLength(ho, 1);
            expect(res).toBe(10);
        });
        it('shall return 78', () => {
            const ho: any = {
                path: 'testtest',
                nid: 123,
                value: 2,
                timestamp: 123456789,
                quality: 1,
                description: 'test',
                flags: 1,
                dataType: 1,
                triggerMode: 1,
                triggerN: 'test',
                triggerT: 1,
                triggerDomain: 1,
                qosLevel: 1,
                scalingFactor: 1.0,
                scalingOffset: 1.0,
                format: 'test',
                writeRangeMin: 0.1,
                writeRangeMax: 1.0,
                updateUrl: 'test',
                history: 1
            };
            let res = hashBuffer.encodeLength(ho, 1);
            expect(res).toBe(78);
        });
        it('shall return 80', () => {
            const ho: any = {
                path: 'testtest',
                nid: 'test',
                value: null,
                timestamp: 123456789,
                quality: 1,
                description: 'test',
                flags: 1,
                dataType: 1,
                triggerMode: 1,
                triggerN: null,
                triggerT: 1,
                triggerDomain: 1,
                qosLevel: 1,
                scalingFactor: 1.0,
                scalingOffset: 1.0,
                format: 'test',
                writeRangeMin: 0.1,
                writeRangeMax: 1.0,
                updateUrl: 'test',
                history: 1
            };
            let res = hashBuffer.encodeLength(ho, 3);
            expect(res).toBe(80);
        });
        it('shall return 84', () => {
            const ho: any = {
                path: 'testtest',
                nid: 'test',
                value: 'test',
                timestamp: 123456789,
                quality: 1,
                description: 'test',
                flags: 1,
                dataType: 1,
                triggerMode: 1,
                triggerN: null,
                triggerT: 1,
                triggerDomain: 1,
                qosLevel: 1,
                scalingFactor: 1.0,
                scalingOffset: 1.0,
                format: 'test',
                writeRangeMin: 0.1,
                writeRangeMax: 1.0,
                updateUrl: 'test',
                history: 1
            };
            let res = hashBuffer.encodeLength(ho, 5);
            expect(res).toBe(84);
        });
        it('shall return 92', () => {
            const ho: any = {
                path: 'testtest',
                nid: 'test',
                value: 'test',
                timestamp: 123456789,
                quality: 1,
                description: 'test',
                flags: 1,
                dataType: 1,
                triggerMode: 1,
                triggerN: null,
                triggerT: 1,
                triggerDomain: 1,
                qosLevel: 1,
                scalingFactor: 1.0,
                scalingOffset: 1.0,
                format: 'test',
                writeRangeMin: 0.1,
                writeRangeMax: 1.0,
                updateUrl: 'test',
                history: 1
            };
            let res = hashBuffer.encodeLength(ho, 7);
            expect(res).toBe(92);
        });
        it('shall return 79', () => {
            const ho: any = {
                path: 'testtest',
                nid: 'test',
                value: '1',
                timestamp: 123456789,
                quality: 1,
                description: 'test',
                flags: 1,
                dataType: 1,
                triggerMode: 1,
                triggerT: 1,
                triggerDomain: 1,
                qosLevel: 1,
                scalingFactor: 1.0,
                scalingOffset: 1.0,
                format: 'test',
                writeRangeMin: 0.1,
                writeRangeMax: 1.0,
                updateUrl: 'test',
                history: 1
            };
            let res = hashBuffer.encodeLength(ho, 12);
            expect(res).toBe(79);
        });
        it('shall return 80', () => {
            const ho: any = {
                path: 'testtest',
                nid: 'test',
                value: '0x12',
                timestamp: 123456789,
                quality: 1,
                description: 'test',
                flags: 1,
                dataType: 1,
                triggerMode: 1,
                triggerT: 1,
                triggerDomain: 1,
                qosLevel: 1,
                scalingFactor: 1.0,
                scalingOffset: 1.0,
                format: 'test',
                writeRangeMin: 0.1,
                writeRangeMax: 1.0,
                updateUrl: 'test',
                history: 1
            };
            let res = hashBuffer.encodeLength(ho, 13);
            expect(res).toBe(80);
        });
    });
});
