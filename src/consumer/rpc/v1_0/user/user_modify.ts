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

export class UserModifyParams {
    @IsKolibriUser()
    user: string;

    @IsOptional()
    @IsKolibriProject()
    project?: string;

    @IsOptional()
    @IsString()
    @Length(0, constants.DT_STRING_MAXLEN)
    description?: string;

    @IsOptional()
    @IsString()
    @MaxLength(constants.PASSWORD_MAXLEN)
    password?: string;

    @IsOptional()
    @IsBoolean()
    active?: boolean;

    constructor(user: string, project?: string, description?: string, password?: string, active?: boolean) {
        this.project = project;
        this.user = user;
        this.description = description;
        this.password = password;
        this.active = active;
    }
}

export class UserModifyRequest extends KolibriRequest<UserModifyParams> {
    @ValidateNested()
    @Type(() => UserModifyParams)
    @IsDefined()
    params: UserModifyParams;

    constructor(id: JsonRpcId, params: UserModifyParams) {
        super(id, KolibriRequestMethods.UserModifyRequestMethod);
        this.params = params;
    }
}

export function isUserModifyRequest(request: KolibriRequest<UserModifyParams>): request is UserModifyRequest {
    return (request as KolibriRequest<UserModifyParams>).method === KolibriRequestMethods.UserModifyRequestMethod;
}

export function toUserModifyRequest(json: KolibriRequest<UserModifyParams>): UserModifyRequest {
    return plainToClass(UserModifyRequest, json);
}

export class UserModifyResponse extends DefaultKolibriResponse { }
