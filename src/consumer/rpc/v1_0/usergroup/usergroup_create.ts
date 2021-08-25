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
import { IsNotEmpty, IsOptional, IsString, Length, ValidateNested } from 'class-validator';
import { constants } from '../../../../common/constant';
import { KolibriRequestMethods } from '../../../kolibri_request_methods';
import { IsKolibriProject } from '../../../../validation/decorators/is_kolibri_project';
import { IsKolibriUserGroup } from '../../../../validation/decorators/is_kolibri_usergroup';
import { JsonRpcId } from '../../../jsonrpc';
import { KolibriRequest } from '../../../kolibri_request';
import { DefaultKolibriResponse } from '../../../kolibri_response';

export class UserGroupCreateParams {
    @IsKolibriUserGroup()
    usergroup: string;

    @IsOptional()
    @IsKolibriProject()
    project?: string;

    @IsOptional()
    @IsString()
    @Length(0, constants.DT_STRING_MAXLEN)
    description?: string;

    constructor(usergroup: string, project?: string, description?: string) {
        this.project = project;
        this.usergroup = usergroup;
        this.description = description;
    }
}

export class UserGroupCreateRequest extends KolibriRequest<UserGroupCreateParams> {
    @ValidateNested()
    @Type(() => UserGroupCreateParams)
    @IsNotEmpty()
    params: UserGroupCreateParams;

    constructor(id: JsonRpcId, params: UserGroupCreateParams) {
        super(id, KolibriRequestMethods.UsergroupCreateRequestMethod);
        this.params = params;
    }
}

export class UserGroupCreateResponse extends DefaultKolibriResponse { }

export function isUserGroupCreateRequest(request: KolibriRequest<UserGroupCreateParams>):
    request is UserGroupCreateRequest {
    return (request as KolibriRequest<UserGroupCreateParams>)
        .method === KolibriRequestMethods.UsergroupCreateRequestMethod;
}

export function toUserGroupCreateRequest(json: KolibriRequest<UserGroupCreateParams>): UserGroupCreateRequest {
    return plainToClass(UserGroupCreateRequest, json);
}
