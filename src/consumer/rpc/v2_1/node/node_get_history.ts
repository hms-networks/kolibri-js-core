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
import { IsBoolean, IsDefined, IsInt, IsOptional, Max, Min, ValidateNested } from 'class-validator';
import { constants } from '../../../../common/constant';
import { KolibriRequestMethods } from '../../../kolibri_request_methods';
import { IsKolibriNodePath } from '../../../../validation/decorators/is_kolibri_node_path';
import { JsonRpcId } from '../../../jsonrpc';
import { KolibriRequest } from '../../../kolibri_request';
import { KolibriSuccessResponse } from '../../../kolibri_response';

export class NodeGetHistoryParams {
    @IsKolibriNodePath()
    path: string;

    @IsOptional()
    @IsInt()
    @Min(0)
    from?: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    to?: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    @Max(constants.GETHISTORY_LIMIT)
    limit?: number;

    @IsOptional()
    @IsBoolean()
    ascending?: boolean;

    constructor(path: string, from?: number, to?: number, limit?: number, ascending?: boolean) {
        this.path = path;
        this.from = from;
        this.to = to;
        this.limit = limit;
        this.ascending = ascending;
    }
}

export class NodeGetHistoryRequest extends KolibriRequest<NodeGetHistoryParams> {
    @ValidateNested()
    @Type(() => NodeGetHistoryParams)
    @IsDefined()
    params: NodeGetHistoryParams;

    constructor(id: JsonRpcId, params: NodeGetHistoryParams) {
        super(id, KolibriRequestMethods.NodeGetHistoryRequestMethod);
        this.params = params;
    }
}

export class NodeGetHistoryResult {
    constructor(
        public value: boolean | number | string,
        public timestamp: number,
        public timestampBroker: number,
        public quality: number,
        public dataType: number,
        public scalingFactor?: number,
        public scalingOffset?: number,
        public format?: string
    ) { }
}

export class NodeGetHistoryResponse extends KolibriSuccessResponse<NodeGetHistoryResult[]> { }

export function isNodeGetHistoryRequest(request: KolibriRequest<NodeGetHistoryParams>):
    request is NodeGetHistoryRequest {
    return (request as KolibriRequest<NodeGetHistoryParams>)
        .method === KolibriRequestMethods.NodeGetHistoryRequestMethod;
}

export function toNodeGetHistoryRequest(json: KolibriRequest<NodeGetHistoryParams>): NodeGetHistoryRequest {
    return plainToClass(NodeGetHistoryRequest, json);
}
