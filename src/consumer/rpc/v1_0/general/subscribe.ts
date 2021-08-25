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
import { ArrayNotEmpty, IsBoolean, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { KolibriRequestMethods } from '../../../kolibri_request_methods';
import { IsKolibriNodePath } from '../../../../validation/decorators/is_kolibri_node_path';
import { JsonRpcId } from '../../../jsonrpc';
import { KolibriRequest } from '../../../kolibri_request';
import { KolibriSuccessResponse } from '../../../kolibri_response';

export class SubscribeParams {
    @IsKolibriNodePath()
    path: string;

    @IsOptional()
    @IsBoolean()
    formatted?: boolean;

    @IsOptional()
    @IsBoolean()
    ignoreMissing?: boolean;

    @IsOptional()
    @IsBoolean()
    respectCommit?: boolean;

    constructor(path: string, formatted?: boolean, ignoreMissing?: boolean, respectCommit?: boolean) {
        this.path = path;
        this.formatted = formatted;
        this.ignoreMissing = ignoreMissing;
        this.respectCommit = respectCommit;
    }
}

export class SubscribeRequest extends KolibriRequest<SubscribeParams[]> {
    @ValidateNested()
    @Type(() => SubscribeParams)
    @ArrayNotEmpty()
    params: SubscribeParams[];

    constructor(id: JsonRpcId, params: SubscribeParams[]) {
        super(id, KolibriRequestMethods.SubscribeRequestMethod);
        this.params = params;
    }
}

export function isSubscribeRequest(request: KolibriRequest<SubscribeParams[]>): request is SubscribeRequest {
    return (request as KolibriRequest<SubscribeParams[]>).method === KolibriRequestMethods.SubscribeRequestMethod;
}

export function toSubscribeRequest(json: KolibriRequest<SubscribeParams[]>): SubscribeRequest {
    return plainToClass(SubscribeRequest, json);
}

export class SubscribeResult {
    @IsKolibriNodePath()
    path: string;

    @IsNumber()
    dataType?: number;

    @IsString()
    format?: string;

    @IsString()
    scalingFactor?: string;

    @IsString()
    scalingOffset?: string;

    constructor(path: string, dataType?: number, format?: string,
        scalingFactor?: string, scalingOffset?: string) {
        this.path = path;
        this.dataType = dataType;
        this.format = format;
        this.scalingFactor = scalingFactor;
        this.scalingOffset = scalingOffset;
    }
}

export class SubscribeResponse extends KolibriSuccessResponse<SubscribeResult[]> {
    result: SubscribeResult[];
    constructor(id: JsonRpcId, result: SubscribeResult[]) {
        super(id, result);
        this.result = result;
    }
}
