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
    IsBoolean, IsDefined, IsInt, IsOptional, IsString, Max,
    MaxLength, Min, ValidateNested
} from 'class-validator';
import { constants } from '../../../../common/constant';
import { KolibriRequestMethods } from '../../../kolibri_request_methods';
import { IsKolibriClient } from '../../../../validation/decorators/is_kolibri_client';
import { IsKolibriUser } from '../../../../validation/decorators/is_kolibri_user';
import { JsonRpcId } from '../../../jsonrpc';
import { KolibriRequest } from '../../../kolibri_request';
import { KolibriSuccessResponse } from '../../../kolibri_response';

export class LoginParams {
    @IsKolibriUser()
    user: string;

    @IsString()
    @MaxLength(constants.PASSWORD_MAXLEN)
    password: string;

    @IsInt()
    @Max(3600)
    @Min(15)
    interval: number;

    @IsInt()
    @Min(1)
    @Max(255)
    timeout: number;

    @IsOptional()
    @IsBoolean()
    pendingTransactions?: boolean;

    @IsOptional()
    @IsKolibriClient()
    client?: string;

    @IsOptional()
    @IsInt()
    sessionExpire?: number;

    @IsOptional()
    @IsBoolean()
    rpcServer?: boolean;

    constructor(user: string, password: string, interval: number, timeout: number,
        pendingTransactions?: boolean, client?: string, sessionExpire?: number, rpcServer?: boolean) {
        this.user = user;
        this.password = password;
        this.interval = interval;
        this.timeout = timeout;
        this.pendingTransactions = pendingTransactions;
        this.client = client;
        this.sessionExpire = sessionExpire;
        this.rpcServer = rpcServer;
    }
}

export class LoginRequest extends KolibriRequest<LoginParams> {
    @ValidateNested()
    @Type(() => LoginParams)
    @IsDefined()
    params: LoginParams;

    constructor(id: JsonRpcId, params: LoginParams) {
        super(id, KolibriRequestMethods.LoginRequestMethod);
        this.params = params;
    }
}

export function isLoginRequest(request: KolibriRequest<LoginParams>): request is LoginRequest {
    return (request as KolibriRequest<LoginParams>).method === KolibriRequestMethods.LoginRequestMethod;
}

export function toLoginRequest(json: KolibriRequest<LoginParams>): LoginRequest {
    return plainToClass(LoginRequest, json);
}

export class WriteRateLimit {
    @IsInt()
    limit: number;
    @IsInt()
    period: number;

    constructor(limit: number, period: number) {
        this.limit = limit;
        this.period = period;
    }
}

export class LoginResult {
    @IsInt()
    status: number;

    @IsKolibriClient()
    client: string;

    @ValidateNested()
    writeRateLimit: WriteRateLimit

    constructor(status: number, client: string, writeRateLimit: WriteRateLimit) {
        this.status = status;
        this.client = client;
        this.writeRateLimit = writeRateLimit;
    }
}

export class LoginResponse extends KolibriSuccessResponse<LoginResult> {}
