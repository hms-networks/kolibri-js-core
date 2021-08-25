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
import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { KolibriRequestMethods } from '../../../kolibri_request_methods';
import { IsKolibriProject } from '../../../../validation/decorators/is_kolibri_project';
import { IsKolibriUser } from '../../../../validation/decorators/is_kolibri_user';
import { IsKolibriUserGroup } from '../../../../validation/decorators/is_kolibri_usergroup';
import { JsonRpcId } from '../../../jsonrpc';
import { KolibriRequest } from '../../../kolibri_request';
import { DefaultKolibriResponse } from '../../../kolibri_response';

export class UserGroupAddMemberParams {
    @IsKolibriUserGroup()
    usergroup: string;

    @IsKolibriUser()
    user: string;

    @IsOptional()
    @IsKolibriProject()
    project?: string;

    constructor(usergroup: string, user: string, project?: string) {
        this.usergroup = usergroup;
        this.user = user;
        this.project = project;
    }
}

export class UserGroupAddMemberRequest extends KolibriRequest<UserGroupAddMemberParams> {
    @ValidateNested()
    @Type(() => UserGroupAddMemberParams)
    @IsNotEmpty()
    params: UserGroupAddMemberParams;

    constructor(id: JsonRpcId, params: UserGroupAddMemberParams) {
        super(id, KolibriRequestMethods.UserGroupAddMemberRequestMethod);
        this.params = params;
    }
}

export class UserGroupAddMemberResponse extends DefaultKolibriResponse { }

export function isUserGroupAddMemberRequest(request: KolibriRequest<UserGroupAddMemberParams>):
    request is UserGroupAddMemberRequest {
    return (request as KolibriRequest<UserGroupAddMemberParams>)
        .method === KolibriRequestMethods.UserGroupAddMemberRequestMethod;
}

export function toUserGroupAddMemberRequest(json: KolibriRequest<UserGroupAddMemberParams>): UserGroupAddMemberRequest {
    return plainToClass(UserGroupAddMemberRequest, json);
}
