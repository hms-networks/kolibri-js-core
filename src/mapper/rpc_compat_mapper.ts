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


import { KolibriVersion } from '../common/kolibri_version';
import { VersionService } from '../util/version_service';
import { RpcV10Mapper } from './rpc_v10_mapper';
import { RpcV20Mapper } from './rpc_v20_mapper';

/**
 * Provide compatibility between different kolibri protocol versions
 * e.g. convert data that is in format of v2 to data format for v1
 */
export class RpcCompatMapper {
    private rpcV10Mapper: RpcV10Mapper = new RpcV10Mapper();
    private rpcV20Mapper: RpcV20Mapper = new RpcV20Mapper();

    constructor(
        private kolibriVersion: KolibriVersion
    ) { }

    map(rpc: any) {
        if (VersionService.isVersionInRange(this.kolibriVersion, '1.0')) {
            return this.rpcV10Mapper.map(rpc);
        }
        else if (VersionService.isVersionInRange(this.kolibriVersion, '>=2.0')) {
            return this.rpcV20Mapper.map(rpc);
        }
        else {
            throw new Error('Should never get here. All versions should be covered by the checks above');
        }
    }
}
