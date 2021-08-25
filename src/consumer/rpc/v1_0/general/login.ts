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
    Equals,
    IsBoolean, IsDefined, IsInt, IsNumber, IsOptional, IsString, Max,
    MaxLength, Min, ValidateNested
} from 'class-validator';
import { constants } from '../../../../common/constant';
import { KolibriRequestMethods } from '../../../kolibri_request_methods';
import { IsKolibriUser } from '../../../../validation/decorators/is_kolibri_user';
import { JsonRpcId } from '../../../jsonrpc';
import { KolibriRequest } from '../../../kolibri_request';
import { KolibriSuccessResponse } from '../../../kolibri_response';

export class LoginParams {
    @IsInt()
    @Equals(0)
    version: number

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

    constructor(version: number, user: string, password: string, interval: number, timeout: number,
        pendingTransactions?: boolean) {
        this.version = version;
        this.user = user;
        this.password = password;
        this.interval = interval;
        this.timeout = timeout;
        this.pendingTransactions = pendingTransactions;
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

export class LoginResult {
    @IsNumber()
    result: number;

    constructor(result: number) {
        this.result = result;
    }
}

export class LoginResponse extends KolibriSuccessResponse<LoginResult> {
    result: LoginResult;
    constructor(id: JsonRpcId, result: LoginResult) {
        super(id, result);
        this.result = result;
    }
}
