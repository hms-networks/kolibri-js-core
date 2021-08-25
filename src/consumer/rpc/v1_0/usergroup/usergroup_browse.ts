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
import { IsOptional, ValidateNested } from 'class-validator';
import { KolibriRequestMethods } from '../../../kolibri_request_methods';
import { IsKolibriProject } from '../../../../validation/decorators/is_kolibri_project';
import { JsonRpcId } from '../../../jsonrpc';
import { KolibriRequest } from '../../../kolibri_request';
import { KolibriSuccessResponse } from '../../../kolibri_response';

export class UserGroupBrowseParams {
    @IsOptional()
    @IsKolibriProject()
    project?: string;

    constructor(project?: string) {
        this.project = project;
    }
}

export class UserGroupBrowseRequest extends KolibriRequest<UserGroupBrowseParams> {
    @IsOptional()
    @ValidateNested()
    @Type(() => UserGroupBrowseParams)
    params?: UserGroupBrowseParams;

    constructor(id: JsonRpcId, params?: UserGroupBrowseParams) {
        super(id, KolibriRequestMethods.UsergroupBrowseRequestMethod);
        this.params = params;
    }
}

export class UserGroupBrowseResult {
    usergroup: string;
    description: string;
    constructor(usergroup: string, description: string) {
        this.usergroup = usergroup;
        this.description = description;
    }
}

export class UserGroupBrowseResponse extends KolibriSuccessResponse<UserGroupBrowseResult[]> { }

export function isUserGroupBrowseRequest(request: KolibriRequest<UserGroupBrowseParams>):
    request is UserGroupBrowseRequest {
    return (request as KolibriRequest<UserGroupBrowseParams>)
        .method === KolibriRequestMethods.UsergroupBrowseRequestMethod;
}

export function toUserGroupBrowseRequest(json: KolibriRequest<UserGroupBrowseParams>): UserGroupBrowseRequest {
    return plainToClass(UserGroupBrowseRequest, json);
}
