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
import { ArrayNotEmpty, IsBoolean, IsDefined, IsOptional, ValidateNested } from 'class-validator';
import { KolibriRequestMethods } from '../../../kolibri_request_methods';
import { IsKolibriNodePath } from '../../../../validation/decorators/is_kolibri_node_path';
import { JsonRpcId } from '../../../jsonrpc';
import { KolibriRequest } from '../../../kolibri_request';
import { KolibriSuccessResponse } from '../../../kolibri_response';

export class ReadParams {
    @IsKolibriNodePath()
    path: string;

    @IsBoolean()
    @IsOptional()
    formatted?: boolean;

    constructor(path: string, formatted?: boolean) {
        this.path = path;
        this.formatted = formatted;
    }
}

export class ReadRequest extends KolibriRequest<ReadParams[]> {
    @ValidateNested()
    @Type(() => ReadParams)
    @ArrayNotEmpty()
    @IsDefined()
    params: ReadParams[];

    constructor(id: JsonRpcId, params: ReadParams[]) {
        super(id, KolibriRequestMethods.ReadRequestMethod);
        this.params = params;
    }
}

export function isReadRequest(request: KolibriRequest<ReadParams[]>): request is ReadRequest {
    return (request as KolibriRequest<ReadParams[]>).method === KolibriRequestMethods.ReadRequestMethod;
}

export function toReadRequest(json: KolibriRequest<ReadParams[]>): ReadRequest {
    return plainToClass(ReadRequest, json);
}

export class ReadResult {
    constructor(public path: string, public timestamp: number, public timestampBroker: number,
        public quality: number, public value: boolean | number | string, public dataType?: number,
        public scalingFactor?: number, public scalingOffset?: number, public format?: string) {
    }
}

export class ReadResponse extends KolibriSuccessResponse<ReadResult[]> {
    result: ReadResult[];
    constructor(id: JsonRpcId, result: ReadResult[]) {
        super(id, result);
        this.result = result;
    }
}
