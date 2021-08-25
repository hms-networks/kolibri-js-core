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
import { IsDefined, IsString, ValidateNested } from 'class-validator';
import { KolibriRequestMethods } from '../../../kolibri_request_methods';
import { JsonRpcId } from '../../../jsonrpc';
import { KolibriRequest } from '../../../kolibri_request';
import { DefaultKolibriResponse } from '../../../kolibri_response';

export class UpdateTokenParams {
    @IsString()
    token: string

    constructor(token: string) {
        this.token = token;
    }
}

export class UpdateTokenRequest extends KolibriRequest<UpdateTokenParams> {
    @ValidateNested()
    @Type(() => UpdateTokenParams)
    @IsDefined()
    params: UpdateTokenParams;
    constructor(id: JsonRpcId, params: UpdateTokenParams) {
        super(id, KolibriRequestMethods.UpdateTokenMethod);
        this.params = params;
    }
}

export class UpdateTokenResponse extends DefaultKolibriResponse { }

export function isUpdateTokenRequest(request: KolibriRequest<UpdateTokenParams>): request is UpdateTokenRequest {
    return (request as KolibriRequest<UpdateTokenParams>).method === KolibriRequestMethods.UpdateTokenMethod;
}

export function toUpdateTokenRequest(json: KolibriRequest<UpdateTokenParams>): UpdateTokenRequest {
    return plainToClass(UpdateTokenRequest, json);
}
