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
import { IsBoolean, IsDefined, IsOptional, ValidateNested } from 'class-validator';
import { KolibriRequestMethods } from '../../../kolibri_request_methods';
import { IsKolibriProject } from '../../../../validation/decorators/is_kolibri_project';
import { IsKolibriUser } from '../../../../validation/decorators/is_kolibri_user';
import { JsonRpcId } from '../../../jsonrpc';
import { KolibriRequest } from '../../../kolibri_request';
import { KolibriSuccessResponse } from '../../../kolibri_response';

export class UserGetSessionsParams {
    @IsKolibriUser()
    user: string;

    @IsOptional()
    @IsKolibriProject()
    project?: string;

    @IsOptional()
    @IsBoolean()
    connected?: boolean;

    constructor(user: string, project?: string, connected?: boolean) {
        this.project = project;
        this.user = user;
        this.connected = connected;
    }
}

export class UserGetSessionsRequest extends KolibriRequest<UserGetSessionsParams> {
    @ValidateNested()
    @Type(() => UserGetSessionsParams)
    @IsDefined()
    params: UserGetSessionsParams;

    constructor(id: JsonRpcId, params: UserGetSessionsParams) {
        super(id, KolibriRequestMethods.UserGetSessionRequestMethod);
        this.params = params;
    }
}

export function isUserGetSessionRequest(request: KolibriRequest<UserGetSessionsParams>):
    request is UserGetSessionsRequest {
    return (request as KolibriRequest<UserGetSessionsParams>)
        .method === KolibriRequestMethods.UserGetSessionRequestMethod;
}

export function toUserGetSessionsRequest(json: KolibriRequest<UserGetSessionsParams>): UserGetSessionsRequest {
    return plainToClass(UserGetSessionsRequest, json);
}

export class UserGetSessionsResult {
    client: string;
    rpcServer: boolean;
    connected: boolean;
    expiration: string;
    loginPath: string;
    timestampLogin: number;
    lastCommunication: number;
    timestampLogout: number;
    timeouts: number;
    emergencies: number;

    constructor(client: string, rpcServer: boolean, connected: boolean, expiration: string,
        loginPath: string, timestampLogin: number, lastCommunication: number,
        timestampLogout: number, timeouts: number, emergencies: number) {
        this.client = client;
        this.rpcServer = rpcServer;
        this.connected = connected;
        this.expiration = expiration;
        this.loginPath = loginPath;
        this.timestampLogin = timestampLogin;
        this.lastCommunication = lastCommunication;
        this.timestampLogout = timestampLogout;
        this.timeouts = timeouts;
        this.emergencies = emergencies;
    }
}

export class UserGetSessionsResponse extends KolibriSuccessResponse<UserGetSessionsResult[]> {
    result: UserGetSessionsResult[];
    constructor(id: JsonRpcId, result: UserGetSessionsResult[]) {
        super(id, result);
        this.result = result;
    }
}
