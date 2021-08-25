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
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { KolibriRequestMethods } from '../../../kolibri_request_methods';
import { IsKolibriProject } from '../../../../validation/decorators/is_kolibri_project';
import { IsKolibriUser } from '../../../../validation/decorators/is_kolibri_user';
import { JsonRpcId } from '../../../jsonrpc';
import { KolibriRequest } from '../../../kolibri_request';
import { KolibriSuccessResponse } from '../../../kolibri_response';

export class PermissionRpcListParams {
    @IsOptional()
    @IsKolibriProject()
    project?: string;

    @IsOptional()
    @IsKolibriUser()
    user?: string;

    @IsOptional()
    @IsString()
    server?: string

    constructor(project?: string, user?: string, server?: string) {
        this.project = project;
        this.user = user;
        this.server = server;
    }
}

export class PermissionRpcListRequest extends KolibriRequest<PermissionRpcListParams> {
    @ValidateNested()
    @Type(() => PermissionRpcListParams)
    params: PermissionRpcListParams;

    constructor(id: JsonRpcId, params: PermissionRpcListParams) {
        super(id, KolibriRequestMethods.PermissionRpcListRequestMethod);
        this.params = params;
    }
}

export function isPermissionRpcListRequest(request: KolibriRequest<PermissionRpcListParams>):
    request is PermissionRpcListRequest {
    return (request as KolibriRequest<PermissionRpcListParams>)
        .method === KolibriRequestMethods.PermissionRpcListRequestMethod;
}

export function toPermissionRpcListRequest(json: KolibriRequest<PermissionRpcListParams>): PermissionRpcListRequest {
    return plainToClass(PermissionRpcListRequest, json);
}

export class PermissionRpcListResult {
    user: string;
    rpc: string;
    server: string;

    constructor(user: string, rpc: string, server: string) {
        this.user = user;
        this.rpc = rpc;
        this.server = server;
    }
}

export class PermissionRpcListResponse extends KolibriSuccessResponse<PermissionRpcListResult[]> {
    result: PermissionRpcListResult[];
    constructor(id: JsonRpcId, result: PermissionRpcListResult[]) {
        super(id, result);
        this.result = result;
    }
}
