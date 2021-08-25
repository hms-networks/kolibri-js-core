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
import { IsBoolean, IsOptional, ValidateNested } from 'class-validator';
import { KolibriRequestMethods } from '../../../kolibri_request_methods';
import { IsKolibriProject } from '../../../../validation/decorators/is_kolibri_project';
import { JsonRpcId } from '../../../jsonrpc';
import { KolibriRequest } from '../../../kolibri_request';
import { KolibriSuccessResponse } from '../../../kolibri_response';

export class UserBrowseParams {
    @IsOptional()
    @IsKolibriProject()
    project?: string;

    @IsOptional()
    @IsBoolean()
    active?: boolean;

    @IsOptional()
    @IsBoolean()
    connected?: boolean;

    constructor(project?: string, active?: boolean, connected?: boolean) {
        this.project = project;
        this.active = active;
        this.connected = connected;
    }
}

export class UserBrowseRequest extends KolibriRequest<UserBrowseParams> {
    @ValidateNested()
    @Type(() => UserBrowseParams)
    params: UserBrowseParams;

    constructor(id: JsonRpcId, params: UserBrowseParams) {
        super(id, KolibriRequestMethods.UserBrowseRequestMethod);
        this.params = params;
    }
}

export function isUserBrowseRequest(request: KolibriRequest<UserBrowseParams>):
    request is UserBrowseRequest {
    return (request as KolibriRequest<UserBrowseParams>).method === KolibriRequestMethods.UserBrowseRequestMethod;
}

export function toUserBrowseRequest(json: KolibriRequest<UserBrowseParams>): UserBrowseRequest {
    return plainToClass(UserBrowseRequest, json);
}

export class UserBrowseResult {
    user: string;
    description: string;
    active: boolean;

    constructor(user: string, description: string, active: boolean) {
        this.user = user;
        this.description = description;
        this.active = active;
    }
}

export class UserBrowseResponse extends KolibriSuccessResponse<UserBrowseResult[]> {
    result: UserBrowseResult[];
    constructor(id: JsonRpcId, result: UserBrowseResult[]) {
        super(id, result);
        this.result = result;
    }
}
