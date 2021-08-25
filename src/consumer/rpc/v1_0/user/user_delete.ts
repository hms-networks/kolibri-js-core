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
import { JsonRpcId } from '../../../jsonrpc';
import { KolibriRequest } from '../../../kolibri_request';
import { DefaultKolibriResponse } from '../../../kolibri_response';

export class UserDeleteParams {
    @IsKolibriUser()
    user: string;

    @IsOptional()
    @IsKolibriProject()
    project?: string;
    constructor(user: string, project?: string) {
        this.project = project;
        this.user = user;
    }
}

export class UserDeleteRequest extends KolibriRequest<UserDeleteParams> {
    @ValidateNested()
    @Type(() => UserDeleteParams)
    @IsDefined()
    params: UserDeleteParams;

    constructor(id: JsonRpcId, params: UserDeleteParams) {
        super(id, KolibriRequestMethods.UserDeleteRequestMethod);
        this.params = params;
    }
}

export function isUserDeleteRequest(request: KolibriRequest<UserDeleteParams>): request is UserDeleteRequest {
    return (request as KolibriRequest<UserDeleteParams>)
        .method === KolibriRequestMethods.UserDeleteRequestMethod;
}

export function toUserDeleteRequest(json: KolibriRequest<UserDeleteParams>): UserDeleteRequest {
    return plainToClass(UserDeleteRequest, json);
}

export class UserDeleteResponse extends DefaultKolibriResponse { }
