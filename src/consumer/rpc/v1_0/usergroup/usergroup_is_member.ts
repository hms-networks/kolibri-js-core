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
import { IsKolibriUser } from '../../../../validation/decorators/is_kolibri_user';
import { IsKolibriUserGroup } from '../../../../validation/decorators/is_kolibri_usergroup';
import { JsonRpcId } from '../../../jsonrpc';
import { KolibriRequest } from '../../../kolibri_request';
import { KolibriSuccessResponse } from '../../../kolibri_response';

export class UserGroupIsMemberParams {
    @IsKolibriUserGroup()
    usergroup: string;

    @IsKolibriUser()
    user: string;

    @IsOptional()
    @IsKolibriProject()
    project?: string;

    constructor(usergroup: string, user: string, project?: string) {
        this.project = project;
        this.usergroup = usergroup;
        this.user = user;
    }
}

export class UserGroupIsMemberRequest extends KolibriRequest<UserGroupIsMemberParams> {
    @ValidateNested()
    @Type(() => UserGroupIsMemberParams)
    @IsDefined()
    params: UserGroupIsMemberParams;

    constructor(id: JsonRpcId, params: UserGroupIsMemberParams) {
        super(id, KolibriRequestMethods.UserGroupIsMemberRequestMethod);
        this.params = params;
    }
}

export class UserGroupIsMemberResponse extends KolibriSuccessResponse<boolean> { }

export function isUserGroupIsMemberRequest(request: KolibriRequest<UserGroupIsMemberParams>):
    request is UserGroupIsMemberRequest {
    return (request as KolibriRequest<UserGroupIsMemberParams>)
        .method === KolibriRequestMethods.UserGroupIsMemberRequestMethod;
}

export function toUserGroupIsMemberRequest(json: KolibriRequest<UserGroupIsMemberParams>): UserGroupIsMemberRequest {
    return plainToClass(UserGroupIsMemberRequest, json);
}
