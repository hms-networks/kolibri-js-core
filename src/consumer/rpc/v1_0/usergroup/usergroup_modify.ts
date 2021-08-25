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
import { IsDefined, IsOptional, IsString, Length, ValidateNested } from 'class-validator';
import { constants } from '../../../../common/constant';
import { KolibriRequestMethods } from '../../../kolibri_request_methods';
import { IsKolibriProject } from '../../../../validation/decorators/is_kolibri_project';
import { IsKolibriUserGroup } from '../../../../validation/decorators/is_kolibri_usergroup';
import { JsonRpcId } from '../../../jsonrpc';
import { KolibriRequest } from '../../../kolibri_request';
import { DefaultKolibriResponse } from '../../../kolibri_response';

export class UserGroupModifyParams {
    @IsKolibriUserGroup()
    usergroup: string;

    @IsOptional()
    @IsString()
    @Length(0, constants.DT_STRING_MAXLEN)
    description?: string;

    @IsOptional()
    @IsKolibriProject()
    project?: string;

    constructor(usergroup: string, description?: string, project?: string) {
        this.project = project;
        this.usergroup = usergroup;
        this.description = description;
    }
}

export class UserGroupModifyRequest extends KolibriRequest<UserGroupModifyParams> {
    @ValidateNested()
    @Type(() => UserGroupModifyParams)
    @IsDefined()
    params: UserGroupModifyParams;

    constructor(id: JsonRpcId, params: UserGroupModifyParams) {
        super(id, KolibriRequestMethods.UserGroupModifyRequestMethod);
        this.params = params;
    }
}

export class UserGroupModifyResponse extends DefaultKolibriResponse { }

export function isUserGroupModifyRequest(request: KolibriRequest<UserGroupModifyParams>):
    request is UserGroupModifyRequest {
    return (request as KolibriRequest<UserGroupModifyParams>)
        .method === KolibriRequestMethods.UserGroupModifyRequestMethod;
}

export function toUserGroupModifyRequest(json: KolibriRequest<UserGroupModifyParams>): UserGroupModifyRequest {
    return plainToClass(UserGroupModifyRequest, json);
}
