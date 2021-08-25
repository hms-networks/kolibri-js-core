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

import { KolibriVersion } from '../../src/common';
import { LoginRequest } from '../../src/consumer/rpc/v1_0';
import { PlainToRequestMapper } from '../../src/util/plain_to_request_mapper';

describe('PlainToRequestMapper: ', function () {
    describe('getInstance', function () {
        it('should get instance', () => {
            const instance = PlainToRequestMapper.getInstance();
            expect(instance).toBeDefined();
        });
    });

    describe('plainToRequest', function () {
        const mapper = PlainToRequestMapper.getInstance();
        const plainLogin: any = {
            jsonrpc: '2.0',
            id: 1,
            method: 'kolibri.login',
            params: {
                user: 'username',
                password: 'passwd',
                interval: 1,
                timeout: 1
            }
        };
        it('should map plain request to class request', () => {
            const version = new KolibriVersion('kolibri');

            const request = mapper.plainToRequest(version, plainLogin);

            expect(request).toBeDefined();
            expect(request).toBeInstanceOf(LoginRequest);
        });

        it('should fail mapping with invalid kolibri version', () => {
            const version = new KolibriVersion('v99.c.kolibri');

            expect(() => {
                mapper.plainToRequest(version, plainLogin);
            }).toThrowError();
        });

        it('should fail mapping with invalid kolibri method', () => {
            const version = new KolibriVersion('kolibri');
            const invalidRequest: any = {
                jsonrpc: '2.0',
                id: 1,
                method: 'kolibri.invalid',
                params: {
                    user: 'username',
                    password: 'passwd',
                    interval: 1,
                    timeout: 1
                }
            };
            expect(() => {
                mapper.plainToRequest(version, invalidRequest);
            }).toThrowError();
        });
    });
});
