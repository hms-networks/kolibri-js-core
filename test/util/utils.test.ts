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

import { isDefined } from '../../src/util';

describe('Utils : ', () => {
    describe('isDefined:', () => {
        it('should be defined', () => {
            const definedVar = 'defined';
            expect(isDefined(definedVar)).toBeTrue();
        });

        it('should undefined be not defined', () => {
            const undefinedVar = undefined;
            expect(isDefined(undefinedVar)).toBeFalse();
        });

        it('should null be not defined', () => {
            const undefinedVar = null;
            expect(isDefined(undefinedVar)).toBeFalse();
        });
    });
});
