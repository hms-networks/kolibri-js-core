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
import { IsDefined, IsInt, IsOptional, Min, ValidateNested } from 'class-validator';
import { KolibriRequestMethods } from '../../../kolibri_request_methods';
import { IsKolibriNodePath } from '../../../../validation/decorators/is_kolibri_node_path';
import { JsonRpcId } from '../../../jsonrpc';
import { KolibriRequest } from '../../../kolibri_request';
import { DefaultKolibriResponse } from '../../../kolibri_response';

export class NodeDeleteHistoryParams {
    @IsKolibriNodePath()
    path: string;

    @IsOptional()
    @IsInt()
    @Min(0)
    from: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    to: number;

    constructor(path: string, from: number, to: number) {
        this.path = path;
        this.from = from;
        this.to = to;
    }
}

export class NodeDeleteHistoryRequest extends KolibriRequest<NodeDeleteHistoryParams> {
    @ValidateNested()
    @Type(() => NodeDeleteHistoryParams)
    @IsDefined()
    params: NodeDeleteHistoryParams;

    constructor(id: JsonRpcId, params: NodeDeleteHistoryParams) {
        super(id, KolibriRequestMethods.NodeDeleteHistoryRequestMethod);
        this.params = params;
    }
}

export class NodeDeleteHistoryResponse extends DefaultKolibriResponse { }

export function isNodeDeleteHistoryRequest(request: KolibriRequest<NodeDeleteHistoryParams>):
    request is NodeDeleteHistoryRequest {
    return (request as KolibriRequest<NodeDeleteHistoryParams>)
        .method === KolibriRequestMethods.NodeDeleteHistoryRequestMethod;
}

export function toNodeDeleteHistoryRequest(json: KolibriRequest<NodeDeleteHistoryParams>): NodeDeleteHistoryRequest {
    return plainToClass(NodeDeleteHistoryRequest, json);
}
