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
import { IsBoolean, IsDefined, IsOptional, ValidateNested } from 'class-validator';
import { KolibriRequestMethods } from '../../../kolibri_request_methods';
import { IsKolibriProject } from '../../../../validation/decorators/is_kolibri_project';
import { IsKolibriUser } from '../../../../validation/decorators/is_kolibri_user';
import { JsonRpcId } from '../../../jsonrpc';
import { KolibriRequest } from '../../../kolibri_request';
import { KolibriSuccessResponse } from '../../../kolibri_response';

export class PermissionUserListParams {
    @IsKolibriUser()
    user: string;

    @IsOptional()
    @IsKolibriProject()
    project?: string;

    @IsOptional()
    @IsBoolean()
    effective?: boolean;

    constructor(user: string, project?: string, effective?: boolean) {
        this.project = project;
        this.user = user;
        this.effective = effective;
    }
}

export class PermissionUserListRequest extends KolibriRequest<PermissionUserListParams> {
    @ValidateNested()
    @Type(() => PermissionUserListParams)
    @IsDefined()
    params: PermissionUserListParams;

    constructor(id: JsonRpcId, params: PermissionUserListParams) {
        super(id, KolibriRequestMethods.PermissionUserListRequestMethod);
        this.params = params;
    }
}

export function isPermissionUserListRequest(request: KolibriRequest<PermissionUserListParams>):
    request is PermissionUserListRequest {
    return (request as KolibriRequest<PermissionUserListParams>)
        .method === KolibriRequestMethods.PermissionUserListRequestMethod;
}

export function toPermissionUserListRequest(json: KolibriRequest<PermissionUserListParams>):
    PermissionUserListRequest {
    return plainToClass(PermissionUserListRequest, json);
}

export class PermissionUserListResult {
    path: string;
    read: boolean;
    write: boolean;
    config: boolean;

    constructor(path: string, read: boolean, write: boolean, config: boolean) {
        this.path = path;
        this.read = read;
        this.write = write;
        this.config = config;
    }
}

export class PermissionUserListResponse extends KolibriSuccessResponse<PermissionUserListResult[]> {
    result: PermissionUserListResult[];
    constructor(id: JsonRpcId, result: PermissionUserListResult[]) {
        super(id, result);
        this.result = result;
    }
}
