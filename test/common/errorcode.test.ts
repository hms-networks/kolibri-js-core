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


import { errorFromCode, errorcode } from '../../src/common/errorcode';

describe('errorcode:', () => {
    describe('errorFromCode:', () => {
        it('should find error and return matched error', () => {
            const res = errorFromCode(errorcode.INVALID_REQUEST.code);
            expect(res.code).toBe(-32600);
            expect(res.message).toBe('invalid request');
        });

        it('should return general error ', () => {
            const res = errorFromCode(9999);
            expect(res.code).toBe(1);
            expect(res.message).toBe('general error');
        });
    });
});
