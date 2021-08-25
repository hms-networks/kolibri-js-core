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
import {
    IsBoolean, IsInt, IsNotEmpty, IsOptional, Max, Min, ValidateNested
} from 'class-validator';
import { constants } from '../../../../common/constant';
import { KolibriRequestMethods } from '../../../kolibri_request_methods';
import { IsKolibriClient } from '../../../../validation/decorators/is_kolibri_client';
import { IsKolibriNodePath } from '../../../../validation/decorators/is_kolibri_node_path';
import { IsKolibriUser } from '../../../../validation/decorators/is_kolibri_user';
import { JsonRpcId } from '../../../jsonrpc';
import { KolibriRequest } from '../../../kolibri_request';
import { KolibriSuccessResponse } from '../../../kolibri_response';

export class UserGetHistoryParams {
    @IsOptional()
    @IsKolibriUser()
    user?: string;

    @IsOptional()
    @IsKolibriClient()
    client?: string;

    @IsOptional()
    @IsKolibriNodePath()
    path?: string;

    @IsOptional()
    @IsInt()
    @Min(0)
    from?: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    to?: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    @Max(constants.GETHISTORY_LIMIT)
    limit?: number;

    @IsOptional()
    @IsBoolean()
    ascending?: boolean;

    constructor(user?: string, client?: string, path?: string,
        from?: number, to?: number, limit?: number, ascending?: boolean) {
        this.user = user;
        this.client = client;
        this.path = path;
        this.from = from;
        this.to = to;
        this.limit = limit;
        this.ascending = ascending;
    }
}

export class UserGetHistoryRequest extends KolibriRequest<UserGetHistoryParams> {
    @ValidateNested()
    @Type(() => UserGetHistoryParams)
    @IsNotEmpty()
    params: UserGetHistoryParams;

    constructor(id: JsonRpcId, params: UserGetHistoryParams) {
        super(id, KolibriRequestMethods.UserGetHistoryRequestMethod);
        this.params = params;
    }
}

export function isUserGetHistoryRequest(request: KolibriRequest<UserGetHistoryParams>):
    request is UserGetHistoryRequest {
    return (request as KolibriRequest<UserGetHistoryParams>)
        .method === KolibriRequestMethods.UserGetHistoryRequestMethod;
}

export function toUserGetHistoryRequest(json: KolibriRequest<UserGetHistoryParams>): UserGetHistoryRequest {
    return plainToClass(UserGetHistoryRequest, json);
}

export class UserGetHistoryResult {
    user: string;
    client: string;
    path: string;
    timestampLogin: number;
    timestampLogout: number;
    timeouts: number;

    constructor(user: string, client: string, path: string,
        timestampLogin: number, timestampLogout: number, timeouts: number) {
        this.user = user;
        this.client = client;
        this.path = path;
        this.timestampLogin = timestampLogin;
        this.timestampLogout = timestampLogout;
        this.timeouts = timeouts;
    }
}

export class UserGetHistoryResponse extends KolibriSuccessResponse<UserGetHistoryResult[]> {
    result: UserGetHistoryResult[];
    constructor(id: JsonRpcId, result: UserGetHistoryResult[]) {
        super(id, result);
        this.result = result;
    }
}
