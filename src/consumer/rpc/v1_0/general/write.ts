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
import {
    IsArray, IsDefined, IsInt, IsOptional, Max, ValidateNested
} from 'class-validator';
import { constants } from '../../../../common/constant';
import { KolibriRequestMethods } from '../../../kolibri_request_methods';
import { IsKolibriNodePath } from '../../../../validation/decorators/is_kolibri_node_path';
import { JsonRpcId } from '../../../jsonrpc';
import { KolibriRequest } from '../../../kolibri_request';
import { DefaultKolibriResponse } from '../../../kolibri_response';

export class WriteNodeParam {
    @IsKolibriNodePath()
    path: string;

    @IsInt()
    timestamp: number;

    @IsInt()
    @Max(constants.QUALITY_MAX)
    quality: number;

    @IsDefined()
    value: any;

    constructor(path: string, timestamp: number, quality: number, value: any) {
        this.path = path;
        this.timestamp = timestamp;
        this.quality = quality;
        this.value = value;
    }
}

export class WriteParams {
    @ValidateNested()
    @IsArray()
    @Type(() => WriteNodeParam)
    nodes: WriteNodeParam[];

    @IsOptional()
    @IsInt()
    tid?: number;

    constructor(nodes: WriteNodeParam[], tid?: number) {
        this.nodes = nodes;
        this.tid = tid;
    }
}

export class WriteRequest extends KolibriRequest<WriteParams> {
    @ValidateNested()
    @Type(() => WriteParams)
    @IsDefined()
    params: WriteParams;

    constructor(id: JsonRpcId, params: WriteParams) {
        super(id, KolibriRequestMethods.WriteRequestMethod);
        this.params = params;
    }
}

export function isWriteRequest(request: KolibriRequest<WriteParams>): request is WriteRequest {
    return (request as KolibriRequest<WriteParams>).method === KolibriRequestMethods.WriteRequestMethod;
}

export function toWriteRequest(json: KolibriRequest<WriteParams>): WriteRequest {
    return plainToClass(WriteRequest, json);
}

export class WriteResponse extends DefaultKolibriResponse {}
