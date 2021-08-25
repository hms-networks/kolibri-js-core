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
import { IsDefined, IsOptional, ValidateNested } from 'class-validator';
import { KolibriRequestMethods } from '../../../kolibri_request_methods';
import { IsKolibriProject } from '../../../../validation/decorators/is_kolibri_project';
import { IsKolibriUserGroup } from '../../../../validation/decorators/is_kolibri_usergroup';
import { JsonRpcId } from '../../../jsonrpc';
import { KolibriRequest } from '../../../kolibri_request';
import { KolibriSuccessResponse } from '../../../kolibri_response';

export class UserGroupGetPropertiesParams {
    @IsKolibriUserGroup()
    usergroup: string;

    @IsOptional()
    @IsKolibriProject()
    project?: string;

    constructor(usergroup: string, project?: string) {
        this.usergroup = usergroup;
        this.project = project;
    }
}

export class UserGroupGetPropertiesRequest extends KolibriRequest<UserGroupGetPropertiesParams> {
    @ValidateNested()
    @Type(() => UserGroupGetPropertiesParams)
    @IsDefined()
    params: UserGroupGetPropertiesParams;

    constructor(id: JsonRpcId, params: UserGroupGetPropertiesParams) {
        super(id, KolibriRequestMethods.UserGroupGetPropertiesRequestMethod);
        this.params = params;
    }
}

export class UserGroupGetPropertiesResult {
    description: string;

    constructor(description: string) {
        this.description = description;
    }
}

export class UserGroupGetPropertiesResponse extends KolibriSuccessResponse<UserGroupGetPropertiesResult> { }

export function isUserGroupGetPropertiesRequest(request: KolibriRequest<UserGroupGetPropertiesParams>):
    request is UserGroupGetPropertiesRequest {
    return (request as KolibriRequest<UserGroupGetPropertiesParams>)
        .method === KolibriRequestMethods.UserGroupGetPropertiesRequestMethod;
}

export function toUserGroupGetPropertiesRequest(json: KolibriRequest<UserGroupGetPropertiesParams>):
    UserGroupGetPropertiesRequest {
    return plainToClass(UserGroupGetPropertiesRequest, json);
}
