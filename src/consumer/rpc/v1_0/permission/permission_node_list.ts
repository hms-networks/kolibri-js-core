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
import { IsBoolean, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { KolibriRequestMethods } from '../../../kolibri_request_methods';
import { IsKolibriNodePath } from '../../../../validation/decorators/is_kolibri_node_path';
import { IsKolibriProject } from '../../../../validation/decorators/is_kolibri_project';
import { JsonRpcId } from '../../../jsonrpc';
import { KolibriRequest } from '../../../kolibri_request';
import { KolibriSuccessResponse } from '../../../kolibri_response';

export class PermissionNodeListParams {
    @IsOptional()
    @IsKolibriProject()
    project?: string;

    @IsKolibriNodePath()
    path: string;

    @IsOptional()
    @IsBoolean()
    inherited?: boolean;

    constructor(path: string, project?: string, inherited?: boolean) {
        this.project = project;
        this.path = path;
        this.inherited = inherited;
    }
}

export class PermissionNodeListRequest extends KolibriRequest<PermissionNodeListParams> {
    @ValidateNested()
    @Type(() => PermissionNodeListParams)
    @IsNotEmpty()
    params: PermissionNodeListParams;

    constructor(id: JsonRpcId, params: PermissionNodeListParams) {
        super(id, KolibriRequestMethods.PermissionNodeListRequestMethod);
        this.params = params;
    }
}

export function isPermissionNodeListRequest(request: KolibriRequest<PermissionNodeListParams>):
    request is PermissionNodeListRequest {
    return (request as KolibriRequest<PermissionNodeListParams>)
        .method === KolibriRequestMethods.PermissionNodeListRequestMethod;
}

export function toPermissionNodeListRequest(json: KolibriRequest<PermissionNodeListParams>): PermissionNodeListRequest {
    return plainToClass(PermissionNodeListRequest, json);
}

export class PermissionNodeListResult {
    user: string;
    path: string;
    read: boolean;
    write: boolean;
    config: boolean;

    constructor(user: string, path: string, read: boolean, write: boolean, config: boolean) {
        this.user = user;
        this.path = path;
        this.read = read;
        this.write = write;
        this.config = config;
    }
}

export class PermissionNodeListResponse extends KolibriSuccessResponse<PermissionNodeListResult[]> {
    result: PermissionNodeListResult[];
    constructor(id: JsonRpcId, result: PermissionNodeListResult[]) {
        super(id, result);
        this.result = result;
    }
}
