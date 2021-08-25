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
import { ArrayNotEmpty, ValidateNested } from 'class-validator';
import { KolibriRequestMethods } from '../../../kolibri_request_methods';
import { IsKolibriUser } from '../../../../validation/decorators/is_kolibri_user';
import { JsonRpcId } from '../../../jsonrpc';
import { KolibriRequest } from '../../../kolibri_request';
import { DefaultKolibriResponse } from '../../../kolibri_response';

export class UserUnsubscribeParams {
    @IsKolibriUser()
    user: string;

    constructor(user: string) {
        this.user = user;
    }
}

export class UserUnsubscribeRequest extends KolibriRequest<UserUnsubscribeParams[]> {
    @ValidateNested()
    @Type(() => UserUnsubscribeParams)
    @ArrayNotEmpty()
    params: UserUnsubscribeParams[];

    constructor(id: JsonRpcId, params: UserUnsubscribeParams[]) {
        super(id, KolibriRequestMethods.UserUnsubscribeRequestMethod);
        this.params = params;
    }
}

export function isUserUnsubscribeRequest(
    request: KolibriRequest<UserUnsubscribeParams[]>): request is UserUnsubscribeRequest {
    return (request as KolibriRequest<UserUnsubscribeParams[]>)
        .method === KolibriRequestMethods.UserUnsubscribeRequestMethod;
}

export function toUserUnsubscribeRequest(json: KolibriRequest<UserUnsubscribeParams[]>): UserUnsubscribeRequest {
    return plainToClass(UserUnsubscribeRequest, json);
}

export class UserUnsubscribeResponse extends DefaultKolibriResponse {}
