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

export class RpcV10Mapper {
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
            node.timestamp = MapperUtils.mapTimestampFromMicroToSec(node.timestamp);
            node.timestampBroker = MapperUtils.mapTimestampFromMilliToSec(node.timestampBroker);
        });
        return rpc;
    }

    private mapKolibriUserNotify(rpc: any) {
        const params = rpc.params;
        params.forEach((param: any) => { param.timestamp = MapperUtils.mapTimestampFromMilliToSec(param.timestamp); });
        return rpc;
    }

    private mapResult(rpc: any) {
        if (rpc.result.hasOwnProperty('timestamp')) {
            rpc.result.timestamp = MapperUtils.mapTimestampFromMicroToSec(rpc.result.timestamp);
        }
        if (rpc.result.hasOwnProperty('timestampBroker')) {
            rpc.result.timestampBroker = MapperUtils.mapTimestampFromMilliToSec(rpc.result.timestampBroker);
        }
        if (rpc.result.hasOwnProperty('lastLogin')) {
            rpc.result.lastLogin = MapperUtils.mapTimestampFromMilliToSec(rpc.result.lastLogin);
        }
        if (rpc.result.hasOwnProperty('lastCommunication')) {
            rpc.result.lastCommunication = MapperUtils.mapTimestampFromMilliToSec(rpc.result.lastCommunication);
        }
        if (Array.isArray(rpc.result)) {
            this.mapResults(rpc.result);
        }
        return rpc;
    }

    private mapResults(results: any) {
        results.forEach((result: any) => {
            if (result.hasOwnProperty('timestamp')) {
                result.timestamp = MapperUtils.mapTimestampFromMicroToSec(result.timestamp);
            }
            if (result.hasOwnProperty('timestampBroker')) {
                result.timestampBroker = MapperUtils.mapTimestampFromMilliToSec(result.timestampBroker);
            }
            if (result.hasOwnProperty('timestampLogin')) {
                result.timestampLogin = MapperUtils.mapTimestampFromMilliToSec(result.timestampLogin);
            }
            if (result.hasOwnProperty('timestampLogout')) {
                result.timestampLogout = MapperUtils.mapTimestampFromMilliToSec(result.timestampLogout);
            }
        });
    }
}
