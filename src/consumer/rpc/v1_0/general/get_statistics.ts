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
import { IsIn, IsOptional, IsString, ValidateNested } from 'class-validator';
import { KolibriRequestMethods } from '../../../kolibri_request_methods';
import { JsonRpcId } from '../../../jsonrpc';
import { KolibriRequest } from '../../../kolibri_request';


export class GetStatisticsParams {
    @IsOptional()
    @IsString()
    @IsIn(['version', 'uptime', 'load', 'memory', 'count', 'opcode', 'rpc'])
    category?: string;

    constructor(category?: string) {
        this.category = category;
    }
}

export class GetStatisticsRequest extends KolibriRequest<GetStatisticsParams> {
    @ValidateNested()
    @Type(() => GetStatisticsParams)
    params?: GetStatisticsParams;

    constructor(id: JsonRpcId, params?: GetStatisticsParams) {
        super(id, KolibriRequestMethods.GetStatisticsRequestMethod);
        this.params = params;
    }
}

export function isGetStatisticsRequest(request: KolibriRequest<GetStatisticsParams>): request is GetStatisticsRequest {
    return (request as KolibriRequest<GetStatisticsParams>).method === KolibriRequestMethods.GetStatisticsRequestMethod;
}

export function toGetStatisticsRequest(json: KolibriRequest<GetStatisticsParams>): GetStatisticsRequest {
    return plainToClass(GetStatisticsRequest, json);
}
