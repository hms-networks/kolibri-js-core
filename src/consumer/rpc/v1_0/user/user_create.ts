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
import { IsBoolean, IsDefined, IsOptional, IsString, Length, MaxLength, ValidateNested } from 'class-validator';
import { constants } from '../../../../common/constant';
import { KolibriRequestMethods } from '../../../kolibri_request_methods';
import { IsKolibriProject } from '../../../../validation/decorators/is_kolibri_project';
import { IsKolibriUser } from '../../../../validation/decorators/is_kolibri_user';
import { JsonRpcId } from '../../../jsonrpc';
import { KolibriRequest } from '../../../kolibri_request';
import { DefaultKolibriResponse } from '../../../kolibri_response';

export class UserCreateParams {
    @IsKolibriUser()
    user: string;

    @IsString()
    @MaxLength(40)
    password: string;

    @IsOptional()
    @IsKolibriProject()
    project?: string;

    @IsOptional()
    @IsString()
    @Length(0, constants.DT_STRING_MAXLEN)
    description?: string;

    @IsOptional()
    @IsBoolean()
    active?: boolean;

    constructor(user: string, password: string, project?: string, description?: string, active?: boolean) {
        this.password = password;
        this.user = user;
        this.project = project;
        this.description = description;
        this.active = active;
    }
}

export class UserCreateRequest extends KolibriRequest<UserCreateParams> {
    @ValidateNested()
    @Type(() => UserCreateParams)
    @IsDefined()
    params: UserCreateParams;

    constructor(id: JsonRpcId, params: UserCreateParams) {
        super(id, KolibriRequestMethods.UserCreateRequestMethod);
        this.params = params;
    }
}

export function isUserCreateRequest(request: KolibriRequest<UserCreateParams>): request is UserCreateRequest {
    return (request as KolibriRequest<UserCreateParams>).method === KolibriRequestMethods.UserCreateRequestMethod;
}

export function toUserCreateRequest(json: KolibriRequest<UserCreateParams>): UserCreateRequest {
    return plainToClass(UserCreateRequest, json);
}

export class UserCreateResponse extends DefaultKolibriResponse { }
