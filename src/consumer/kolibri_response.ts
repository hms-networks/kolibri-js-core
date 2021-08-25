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

import { IsInt, IsString, ValidateNested } from 'class-validator';
import { JsonRpcError, JsonRpcFailure, JsonRpcId, JsonRpcSuccess, JsonRpcVersion } from './jsonrpc';

export abstract class KolibriSuccessResponse<T> implements JsonRpcSuccess<T> {
    @IsString()
    jsonrpc: JsonRpcVersion = '2.0';

    @IsInt()
    id: JsonRpcId;

    @ValidateNested()
    result: T;
    constructor(id: JsonRpcId, result: T) {
        this.id = id;
        this.result = result;
    }
}

export abstract class KolibriErrorResponse<T> implements JsonRpcFailure<T> {
    @IsString()
    jsonrpc: JsonRpcVersion = '2.0';

    @IsInt()
    id: JsonRpcId;

    error: JsonRpcError<T>;

    constructor(id: JsonRpcId, error: JsonRpcError<T>) {
        this.id = id;
        this.error = error;
    }
}

export class DefaultKolibriResponse extends KolibriSuccessResponse<number> {
    @IsInt()
    result = 0;
}

