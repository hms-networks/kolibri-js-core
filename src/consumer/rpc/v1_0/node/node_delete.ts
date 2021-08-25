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
import { DefaultKolibriResponse } from '../../../kolibri_response';

export class NodeDeleteParams {
    @IsKolibriNodePath()
    path: string;

    constructor(path: string) {
        this.path = path;
    }
}

export class NodeDeleteRequest extends KolibriRequest<NodeDeleteParams> {
    @ValidateNested()
    @Type(() => NodeDeleteParams)
    @IsDefined()
    params: NodeDeleteParams;

    constructor(id: JsonRpcId, params: NodeDeleteParams) {
        super(id, KolibriRequestMethods.NodeDeleteRequestMethod);
        this.params = params;
    }
}

export class NodeDeleteResponse extends DefaultKolibriResponse { }

export function isNodeDeleteRequest(request: KolibriRequest<NodeDeleteParams>): request is NodeDeleteRequest {
    return (request as KolibriRequest<NodeDeleteParams>).method === KolibriRequestMethods.NodeDeleteRequestMethod;
}

export function toNodeDeleteRequest(json: KolibriRequest<NodeDeleteParams>): NodeDeleteRequest {
    return plainToClass(NodeDeleteRequest, json);
}
