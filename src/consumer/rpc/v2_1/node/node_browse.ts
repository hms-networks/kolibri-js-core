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
    IsNumber, ValidateNested, IsOptional, IsBoolean,
    IsDefined, IsIn
} from 'class-validator';
import { constants } from '../../../../common/constant';
import { KolibriRequestMethods } from '../../../kolibri_request_methods';
import { IsKolibriNodePath } from '../../../../validation/decorators/is_kolibri_node_path';
import { JsonRpcId } from '../../../jsonrpc';
import { KolibriRequest } from '../../../kolibri_request';
import { KolibriSuccessResponse } from '../../../kolibri_response';

export class NodeBrowseParams {
    @IsKolibriNodePath()
    path: string;

    @IsNumber()
    @IsIn([constants.POINT, constants.GROUP])
    type: number;

    @IsOptional()
    @IsBoolean()
    recursive?: boolean;

    @IsOptional()
    @IsBoolean()
    detailed?: boolean;

    constructor(path: string, type: number, recursive?: boolean, detailed?: boolean) {
        this.path = path;
        this.type = type;
        this.recursive = recursive;
        this.detailed = detailed;
    }
}

export class NodeBrowseRequest extends KolibriRequest<NodeBrowseParams> {
    @ValidateNested()
    @Type(() => NodeBrowseParams)
    @IsDefined()
    params: NodeBrowseParams;

    constructor(id: JsonRpcId, params: NodeBrowseParams) {
        super(id, KolibriRequestMethods.NodeBrowseRequestMethod);
        this.params = params;
    }
}

export class NodeBrowseResult {
    constructor(
        public path: string,
        public description: string,
        public published: boolean,
        public type?: number,
        public flags?: number,
        public triggerMode?: number,
        public triggerDomain?: number,
        public qosLevel?: number,
        public history?: number,
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

export class NodeBrowseResponse extends KolibriSuccessResponse<NodeBrowseResult[]> { }

export function isNodeBrowseRequest(request: KolibriRequest<NodeBrowseParams>): request is NodeBrowseRequest {
    return (request as KolibriRequest<NodeBrowseParams>).method === KolibriRequestMethods.NodeBrowseRequestMethod;
}

export function toNodeBrowseRequest(json: KolibriRequest<NodeBrowseParams>): NodeBrowseRequest {
    return plainToClass(NodeBrowseRequest, json);
}
