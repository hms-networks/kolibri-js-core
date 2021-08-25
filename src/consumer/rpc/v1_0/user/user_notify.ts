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
import { ArrayNotEmpty, IsDefined, IsIn, IsInt, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { KolibriRequestMethods } from '../../../kolibri_request_methods';
import { IsKolibriUser } from '../../../../validation/decorators/is_kolibri_user';
import { JsonRpcId } from '../../../jsonrpc';
import { KolibriRequest } from '../../../kolibri_request';
import { KolibriSuccessResponse } from '../../../kolibri_response';

export class UserNotifyParams {
    @IsKolibriUser()
    user: string;

    @IsInt()
    timestamp: number;

    @IsString()
    @IsIn(['login', 'close', 'timeout', 'emergencies'])
    event: string;

    @IsNotEmpty()
    data: string | number;


    constructor(user: string, timestamp: number,
        event: string, data: string | number) {
        this.user = user;
        this.timestamp = timestamp;
        this.event = event;
        this.data = data;
    }
}

export class UserNotifyRequest extends KolibriRequest<UserNotifyParams[]> {
    @ValidateNested()
    @Type(() => UserNotifyParams)
    @IsDefined()
    @ArrayNotEmpty()
    params: UserNotifyParams[];

    constructor(id: JsonRpcId, params: UserNotifyParams[]) {
        super(id, KolibriRequestMethods.UserNotifyRequestMethod);
        this.params = params;
    }
}

export function isUserNotifyRequest(request: KolibriRequest<UserNotifyParams[]>): request is UserNotifyRequest {
    return (request as KolibriRequest<UserNotifyParams[]>).method === KolibriRequestMethods.UserNotifyRequestMethod;
}

export function toUserNotifyRequest(json: KolibriRequest<UserNotifyParams[]>): UserNotifyRequest {
    return plainToClass(UserNotifyRequest, json);
}

export class UserNotifyResult {
    result: number;

    constructor(result: number) {
        this.result = result;
    }
}

export class UserNotifyResponse extends KolibriSuccessResponse<UserNotifyResult> {
    result: UserNotifyResult;
    constructor(id: JsonRpcId, result: UserNotifyResult) {
        super(id, result);
        this.result = result;
    }
}
