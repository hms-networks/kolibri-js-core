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

import { IsIn, IsInt, IsString, Min } from 'class-validator';
import { JsonRpcId, JsonRpcRequest, JsonRpcVersion } from './jsonrpc';
import { KolibriRequestMethods } from './kolibri_request_methods';

export abstract class KolibriRequest<T> implements JsonRpcRequest<T> {
    @IsString()
    jsonrpc: JsonRpcVersion = '2.0';

    @IsString()
    @IsIn(Object.values(KolibriRequestMethods))
    method: string;

    @IsInt()
    @Min(0)
    id: JsonRpcId;

    params?: T;

    constructor(id: JsonRpcId, method: string, params?: T) {
        this.id = id;
        this.method = method;
        this.params = params;
    }
}

export class KolibriRequestError extends Error {
    kolibriError: any;
    constructor(kolibriError: any) {
        super('KolibriRequest failed: ' + kolibriError.code);
        this.kolibriError = kolibriError;
        Error.captureStackTrace(this, this.constructor);
    }
}
