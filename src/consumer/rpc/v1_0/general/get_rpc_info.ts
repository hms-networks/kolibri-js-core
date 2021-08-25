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

import { plainToClass } from 'class-transformer';
import { IsEmpty } from 'class-validator';
import { KolibriRequestMethods } from '../../../kolibri_request_methods';
import { JsonRpcId } from '../../../jsonrpc';
import { KolibriRequest } from '../../../kolibri_request';

export class GetRpcInfoRequest extends KolibriRequest<undefined> {
    @IsEmpty()
    params: undefined;
    constructor(id: JsonRpcId) {
        super(id, KolibriRequestMethods.GetRpcInfoRequestMethod);
    }
}

export function isGetRpcInfoRequest(request: KolibriRequest<undefined>): request is GetRpcInfoRequest {
    return (request as KolibriRequest<undefined>).method === KolibriRequestMethods.GetRpcInfoRequestMethod;
}

export function toGetRpcInfoRequest(json: KolibriRequest<undefined>): GetRpcInfoRequest {
    return plainToClass(GetRpcInfoRequest, json);
}
