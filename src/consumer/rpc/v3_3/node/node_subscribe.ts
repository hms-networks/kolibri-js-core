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
import { IsDefined, IsBoolean, IsOptional, ValidateNested } from 'class-validator';
import { KolibriRequestMethods } from '../../../kolibri_request_methods';
import { IsKolibriNodePath } from '../../../../validation/decorators/is_kolibri_node_path';
import { JsonRpcId } from '../../../jsonrpc';
import { KolibriRequest } from '../../../kolibri_request';
import { DefaultKolibriResponse } from '../../../kolibri_response';

export class NodeSubscribeParams {
    @IsKolibriNodePath()
    path: string;

    @IsOptional()
    @IsBoolean()
    recursive?: boolean

    constructor(path: string, recursive?: boolean) {
        this.path = path;
        this.recursive = recursive;
    }
}

export class NodeSubscribeRequest extends KolibriRequest<NodeSubscribeParams> {
    @ValidateNested()
    @Type(() => NodeSubscribeParams)
    @IsDefined()
    params: NodeSubscribeParams;

    constructor(id: JsonRpcId, params: NodeSubscribeParams) {
        super(id, KolibriRequestMethods.NodeSubscribeRequestMethod);
        this.params = params;
    }
}

export class NodeSubscribeResponse extends DefaultKolibriResponse { }

export function isNodeSubscribeRequest(request: KolibriRequest<NodeSubscribeParams>):
    request is NodeSubscribeRequest {
    return (request as KolibriRequest<NodeSubscribeParams>)
        .method === KolibriRequestMethods.NodeSubscribeRequestMethod;
}

export function toNodeSubscribeRequest(json: KolibriRequest<NodeSubscribeParams>): NodeSubscribeRequest {
    return plainToClass(NodeSubscribeRequest, json);
}

