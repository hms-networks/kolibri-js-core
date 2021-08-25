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

import { MapperUtils } from './mapper_utils';

export class RpcV20Mapper {
    map(rpc: any) {
        if (rpc.hasOwnProperty('method')) {
            return this.mapRequest(rpc);
        }
        if (rpc.hasOwnProperty('result')) {
            return this.mapResult(rpc);
        }
        return rpc;
    }

    private mapRequest(rpc: any) {
        if (rpc.method === 'kolibri.write') {
            return this.mapKolibriWrite(rpc);
        }
        if (rpc.method === 'kolibri.user.notify') {
            return this.mapKolibriUserNotify(rpc);
        }
        return rpc;
    }

    private mapKolibriWrite(rpc: any) {
        const nodes = rpc.params.nodes;
        nodes.forEach((node: any) => {
            node.timestampBroker = MapperUtils.mapTimestampFromMilliToMicro(node.timestampBroker);
        });
        return rpc;
    }

    private mapKolibriUserNotify(rpc: any) {
        const params = rpc.params;
        params.forEach(
            (param: any) => { param.timestamp = MapperUtils.mapTimestampFromMilliToMicro(param.timestamp); });
        return rpc;
    }

    private mapResult(rpc: any) {
        if (rpc.result.hasOwnProperty('updateUrl')) {
            delete rpc.result.updateUrl;
        }
        if (rpc.result.hasOwnProperty('timestampBroker')) {
            rpc.result.timestampBroker = MapperUtils.mapTimestampFromMilliToMicro(rpc.result.timestampBroker);
        }
        if (rpc.result.hasOwnProperty('timestampLogin')) {
            rpc.result.timestampLogin = MapperUtils.mapTimestampFromMilliToMicro(rpc.result.timestampLogin);
        }
        if (rpc.result.hasOwnProperty('timestampLogout')) {
            rpc.result.timestampLogout = MapperUtils.mapTimestampFromMilliToMicro(rpc.result.timestampLogout);
        }
        if (rpc.result.hasOwnProperty('lastLogin')) {
            rpc.result.lastLogin = MapperUtils.mapTimestampFromMilliToMicro(rpc.result.lastLogin);
        }
        if (rpc.result.hasOwnProperty('lastCommunication')) {
            rpc.result.lastCommunication = MapperUtils.mapTimestampFromMilliToMicro(rpc.result.lastCommunication);
        }
        if (rpc.result.hasOwnProperty('expiration')) {
            if (rpc.result.expiration > 0) {
                rpc.result.expiration = MapperUtils.mapTimestampFromMilliToMicro(rpc.result.expiration);
            }
        }
        if (Array.isArray(rpc.result)) {
            rpc.result.forEach((r: any) => {
                if (r.hasOwnProperty('timestampBroker')) {
                    r.timestampBroker = MapperUtils.mapTimestampFromMilliToMicro(r.timestampBroker);
                }
                if (r.hasOwnProperty('timestampLogin')) {
                    r.timestampLogin = MapperUtils.mapTimestampFromMilliToMicro(r.timestampLogin);
                }
                if (r.hasOwnProperty('timestampLogout')) {
                    r.timestampLogout = MapperUtils.mapTimestampFromMilliToMicro(r.timestampLogout);
                }
                if (r.hasOwnProperty('lastCommunication')) {
                    r.lastCommunication = MapperUtils.mapTimestampFromMilliToMicro(r.lastCommunication);
                }
                if (r.hasOwnProperty('expiration')) {
                    if (r.expiration > 0) {
                        r.expiration = MapperUtils.mapTimestampFromMilliToMicro(r.expiration);
                    }
                }
            });
        }
        return rpc;
    }
}
