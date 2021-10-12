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
import { IsDefined, ValidateNested, IsBoolean } from 'class-validator';
import { KolibriRequestMethods } from '../../../kolibri_request_methods';
import { IsKolibriNodePath } from '../../../../validation/decorators/is_kolibri_node_path';
import { JsonRpcId } from '../../../jsonrpc';
import { KolibriRequest } from '../../../kolibri_request';
import { DefaultKolibriResponse } from '../../../kolibri_response';

export class NodeNotifyParams {
    @IsKolibriNodePath()
    path: string;

    @IsBoolean()
    active: boolean;

    constructor(path: string, active: boolean) {
        this.path = path;
        this.active = active;
    }
}

export class NodeNotifyRequest extends KolibriRequest<NodeNotifyParams> {
    @ValidateNested()
    @Type(() => NodeNotifyParams)
    @IsDefined()
    params: NodeNotifyParams;

    constructor(id: JsonRpcId, params: NodeNotifyParams) {
        super(id, KolibriRequestMethods.NodeNotifyRequestMethod);
        this.params = params;
    }
}

export class NodeNotifyResponse extends DefaultKolibriResponse { }

export function isNodeNotifyRequest(request: KolibriRequest<NodeNotifyParams>):
    request is NodeNotifyRequest {
    return (request as KolibriRequest<NodeNotifyParams>)
        .method === KolibriRequestMethods.NodeNotifyRequestMethod;
}

export function toNodeNotifyRequest(json: KolibriRequest<NodeNotifyParams>): NodeNotifyRequest {
    return plainToClass(NodeNotifyRequest, json);
}