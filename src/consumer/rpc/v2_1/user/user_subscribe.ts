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
import { ArrayNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { KolibriRequestMethods } from '../../../kolibri_request_methods';
import { IsKolibriClient } from '../../../../validation/decorators/is_kolibri_client';
import { IsKolibriUser } from '../../../../validation/decorators/is_kolibri_user';
import { JsonRpcId } from '../../../jsonrpc';
import { KolibriRequest } from '../../../kolibri_request';
import { KolibriSuccessResponse } from '../../../kolibri_response';

export class UserSubscribeParams {
    @IsKolibriUser()
    user: string;

    @IsOptional()
    @IsKolibriClient()
    client?: string;

    constructor(user: string, client?: string) {
        this.user = user;
        this.client = client;
    }
}

export class UserSubscribeRequest extends KolibriRequest<UserSubscribeParams[]> {
    @ValidateNested()
    @Type(() => UserSubscribeParams)
    @ArrayNotEmpty()
    params: UserSubscribeParams[];

    constructor(id: JsonRpcId, params: UserSubscribeParams[]) {
        super(id, KolibriRequestMethods.UserSubscribeRequestMethod);
        this.params = params;
    }
}

export function isUserSubscribeRequest(request: KolibriRequest<UserSubscribeParams[]>):
    request is UserSubscribeRequest {
    return (request as KolibriRequest<UserSubscribeParams[]>)
        .method === KolibriRequestMethods.UserSubscribeRequestMethod;
}

export function toUserSubscribeRequest(json: KolibriRequest<UserSubscribeParams[]>): UserSubscribeRequest {
    return plainToClass(UserSubscribeRequest, json);
}

export class UserSubscribeResult {
    user: string;
    client: string;
    connected: boolean;
    loginPath: string;
    emergencies: number;

    constructor(user: string, client: string, connected: boolean,
        loginPath: string, emergencies: number) {
        this.user = user;
        this.client = client;
        this.connected = connected;
        this.loginPath = loginPath;
        this.emergencies = emergencies;
    }
}

export class UserSubscribeResponse extends KolibriSuccessResponse<UserSubscribeResult[]> { }
