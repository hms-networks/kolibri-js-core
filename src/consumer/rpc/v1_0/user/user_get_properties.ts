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
import { KolibriSuccessResponse } from '../../../kolibri_response';

export class UserGetPropertiesParams {
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

export class UserGetPropertiesRequest extends KolibriRequest<UserGetPropertiesParams> {
    @ValidateNested()
    @Type(() => UserGetPropertiesParams)
    @IsDefined()
    params: UserGetPropertiesParams;

    constructor(id: JsonRpcId, params: UserGetPropertiesParams) {
        super(id, KolibriRequestMethods.UserGetPropertiesRequestMethod);
        this.params = params;
    }
}

export function isUserGetPropertiesRequest(request: KolibriRequest<UserGetPropertiesParams>):
    request is UserGetPropertiesRequest {
    return (request as KolibriRequest<UserGetPropertiesParams>)
        .method === KolibriRequestMethods.UserGetPropertiesRequestMethod;
}

export function toUserGetPropertiesRequest(json: KolibriRequest<UserGetPropertiesParams>): UserGetPropertiesRequest {
    return plainToClass(UserGetPropertiesRequest, json);
}

export class UserGetPropertiesResult {
    description: string;
    active: boolean;
    connected: boolean;
    loginPath: string;
    lastLogin: number;
    lastComunication: number;
    totalLogins: number;
    totalTimeouts: number;
    totalOctetsReceived: number;
    emergencies: number

    constructor(
        description: string,
        active: boolean,
        connected: boolean,
        loginPath: string,
        lastLogin: number,
        lastCommunication: number,
        totalLogins: number,
        totalTimeouts: number,
        totalOctetsReceived: number,
        emergencies: number) {
        this.description = description;
        this.active = active;
        this.connected = connected;
        this.loginPath = loginPath;
        this.lastLogin = lastLogin;
        this.lastComunication = lastCommunication;
        this.totalLogins = totalLogins;
        this.totalTimeouts = totalTimeouts;
        this.totalOctetsReceived = totalOctetsReceived;
        this.emergencies = emergencies;
    }
}

export class UserGetPropertiesResponse extends KolibriSuccessResponse<UserGetPropertiesResult> {
    result: UserGetPropertiesResult;
    constructor(id: JsonRpcId, result: UserGetPropertiesResult) {
        super(id, result);
        this.result = result;
    }
}
