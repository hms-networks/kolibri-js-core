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
import { KolibriVersion } from '../../src/common/kolibri_version';
import { RpcCompatMapper } from '../../src/mapper/rpc_compat_mapper';

describe('RPC Compat Mapper : ', function () {
    it('should map v2 kolibri.write request to v1', () => {
        const rpc = {
            jsonrpc: '2.0',
            method: 'kolibri.write',
            id: 1,
            params: {
                nodes: [
                    {
                        path: 'device01/point1',
                        timestamp: Date.now() * 1e3,
                        timestampBroker: Date.now(),
                        quality: 1,
                        value: true
                    }
                ]
            }
        };

        const mappedRpc = new RpcCompatMapper(new KolibriVersion('kolibri')).map(rpc);

        expect(mappedRpc.method).toEqual('kolibri.write');
        expect(mappedRpc.params.nodes[0].timestamp.toString().length).toEqual(10);
    });

    it('should map v2 kolibri.user.notify request to v1', () => {
        const rpc = {
            jsonrpc: '2.0',
            method: 'kolibri.user.notify',
            id: 1,
            params: [{ user: 'user', timestamp: Date.now(), event: 'close', data: null }]
        };

        const mappedRpc = new RpcCompatMapper(new KolibriVersion('kolibri')).map(rpc);

        expect(mappedRpc.method).toEqual('kolibri.user.notify');
        expect(mappedRpc.params[0].timestamp.toString().length).toEqual(10);
    });

    it('should map v2 kolibri.node.getHistory result to v1', () => {
        const rpc = {
            jsonrpc: '2.0',
            id: 1,
            result: [{ value: 'value string', timestamp: Date.now() * 1e3, timestampBroker: Date.now() }]
        };

        const mappedRpc = new RpcCompatMapper(new KolibriVersion('kolibri')).map(rpc);

        expect(mappedRpc.result[0].value).toEqual('value string');
        expect(mappedRpc.result[0].timestamp.toString().length).toEqual(10);
        expect(mappedRpc.result[0].timestampBroker.toString().length).toEqual(10);
    });

    it('should map v1 kolibri.node.getHistory result to v2', () => {
        const rpc = {
            jsonrpc: '2.0',
            id: 1,
            result: [{ value: 'value string', timestamp: Date.now() * 1e3, timestampBroker: Date.now() }]
        };

        const mappedRpc = new RpcCompatMapper(new KolibriVersion('v2.0.kolibri')).map(rpc);

        expect(mappedRpc.result[0].value).toEqual('value string');
        expect(mappedRpc.result[0].timestamp.toString().length).toEqual(16);
        expect(mappedRpc.result[0].timestampBroker.toString().length).toEqual(16);
    });
});
