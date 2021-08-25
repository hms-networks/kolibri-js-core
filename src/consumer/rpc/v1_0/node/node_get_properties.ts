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

import { plainToClass, Type } from 'class-transformer';
import { IsDefined, ValidateNested } from 'class-validator';
import { KolibriRequestMethods } from '../../../kolibri_request_methods';
import { IsKolibriNodePath } from '../../../../validation/decorators/is_kolibri_node_path';
import { JsonRpcId } from '../../../jsonrpc';
import { KolibriRequest } from '../../../kolibri_request';
import { KolibriSuccessResponse } from '../../../kolibri_response';

export class NodeGetPropertiesParams {
    @IsKolibriNodePath()
    path: string;

    constructor(path: string) {
        this.path = path;
    }
}

export class NodeGetPropertiesRequest extends KolibriRequest<NodeGetPropertiesParams> {
    @ValidateNested()
    @Type(() => NodeGetPropertiesParams)
    @IsDefined()
    params: NodeGetPropertiesParams;

    constructor(id: JsonRpcId, params: NodeGetPropertiesParams) {
        super(id, KolibriRequestMethods.NodeGetPropertiesRequestMethod);
        this.params = params;
    }
}

export class NodeGetPropertiesResult {
    constructor(
        public type: number,
        public description: string,
        public flags: number,
        public triggerMode: number,
        public triggerDomain: number,
        public qosLevel: number,
        public history: number,
        public dataType?: number,
        public triggerN?: number,
        public triggerT?: number,
        public format?: string,
        public scalingFactor?: number,
        public scalingOffset?: number,
        public writeRangeMin?: number,
        public writeRangeMax?: number
    ) { }
}

export class NodeGetPropertiesResponse extends KolibriSuccessResponse<NodeGetPropertiesResult> { }

export function isNodeGetPropertiesRequest(request: KolibriRequest<NodeGetPropertiesParams>):
    request is NodeGetPropertiesRequest {
    return (request as KolibriRequest<NodeGetPropertiesParams>)
        .method === KolibriRequestMethods.NodeGetPropertiesRequestMethod;
}

export function toNodeGetPropertiesRequest(json: KolibriRequest<NodeGetPropertiesParams>): NodeGetPropertiesRequest {
    return plainToClass(NodeGetPropertiesRequest, json);
}
