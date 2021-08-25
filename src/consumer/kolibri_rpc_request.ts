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

import { isDefined } from 'class-validator';
import { JsonRpcId } from './jsonrpc';
import { KolibriRequest } from './kolibri_request';
import { IsKolibriRpcServer } from '../validation/decorators/is_kolibri_rpc_server';
import { KolibriRpcServer } from './kolibri_rpc_server';

export class KolibriRpcRequest<T> extends KolibriRequest<T> {
    @IsKolibriRpcServer()
    _server: KolibriRpcServer

    constructor(id: JsonRpcId, _server: KolibriRpcServer, method: string, params?: T) {
        super(id, method);
        this._server = _server;
        this.params = params;
    }
}

export function isKolibriRpcRequest(request: KolibriRequest<unknown>): request is KolibriRpcRequest<unknown> {
    const kolibriRpcRequest = (request as KolibriRpcRequest<unknown>);
    return isDefined(kolibriRpcRequest._server) && isDefined(kolibriRpcRequest.method);
}
