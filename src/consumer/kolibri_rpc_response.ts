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

import { JsonRpcError, JsonRpcId, JsonRpcResponse } from './jsonrpc';
import { IsKolibriRpcServer } from '../validation/decorators/is_kolibri_rpc_server';
import { KolibriErrorResponse, KolibriSuccessResponse } from './kolibri_response';
import { KolibriRpcServer } from './kolibri_rpc_server';

export class KolibriRpcSuccessResponse<T> extends KolibriSuccessResponse<T> {
    @IsKolibriRpcServer()
    _server: KolibriRpcServer

    constructor(id: JsonRpcId, _server: KolibriRpcServer, result: T) {
        super(id, result);
        this._server = _server;
    }
}
export class KolibriRpcErrorResponse<T> extends KolibriErrorResponse<T> {
    @IsKolibriRpcServer()
    _server: KolibriRpcServer

    constructor(id: JsonRpcId, _server: KolibriRpcServer, error: JsonRpcError<T>) {
        super(id, error);
        this._server = _server;
    }
}

export function isKolibriRpcSuccess(response: JsonRpcResponse): response is KolibriRpcSuccessResponse<unknown> {
    const kolibriRpcResponse = (response as KolibriRpcSuccessResponse<unknown>);
    return kolibriRpcResponse._server !== undefined && kolibriRpcResponse.result !== undefined;
}

export function isKolibriRpcError(response: JsonRpcResponse): response is KolibriRpcErrorResponse<unknown> {
    const kolibriRpcResponse = (response as KolibriRpcErrorResponse<unknown>);
    return kolibriRpcResponse._server !== undefined && kolibriRpcResponse.error !== undefined;
}
