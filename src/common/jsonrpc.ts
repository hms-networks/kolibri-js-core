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


//--------------------------------------------------------------------------
// JSON-RPC types
//--------------------------------------------------------------------------
export const type = {
    REQUEST: 1,
    NOTIFICATION: 2,
    RESULT: 3,
    ERROR: 4,
    REQUEST_ROUTED: 5,
    NOTIFICATION_ROUTED: 6,
    RESULT_ROUTED: 7,
    ERROR_ROUTED: 8,
    INVALID: 9
};

//--------------------------------------------------------------------------
// Function: getType(rpc)
//--------------------------------------------------------------------------
export function getType(rpc: any) {
    // JSON-RPC 2.0
    if (typeof rpc !== 'object' || !rpc.hasOwnProperty('jsonrpc') || rpc.jsonrpc !== '2.0') {
        return type.INVALID;
    }

    // Request or notification
    if (rpc.hasOwnProperty('method')) {
        if (rpc.hasOwnProperty('result') || rpc.hasOwnProperty('error')) {
            return type.INVALID;
        }
        if (rpc.hasOwnProperty('params') && typeof rpc.params !== 'object') {
            return type.INVALID;
        }
        if (rpc.hasOwnProperty('_server')) {
            return rpc.hasOwnProperty('id')
                ? type.REQUEST_ROUTED
                : type.NOTIFICATION_ROUTED;
        }
        else {
            return rpc.hasOwnProperty('id') ? type.REQUEST : type.NOTIFICATION;
        }
    }

    // Successful response
    if (rpc.hasOwnProperty('result')) {
        if (rpc.hasOwnProperty('error')) {
            return type.INVALID;
        }
        return rpc.hasOwnProperty('_server') ? type.RESULT_ROUTED : type.RESULT;
    }

    // Error response
    if (rpc.hasOwnProperty('error')) {
        if (
            typeof rpc.error !== 'object' ||
            !rpc.error.hasOwnProperty('code') ||
            !rpc.error.hasOwnProperty('message')
        ) {
            return type.INVALID;
        }
        return rpc.hasOwnProperty('_server') ? type.ERROR_ROUTED : type.ERROR;
    }

    return type.INVALID;
}

export function buildRequest(method: string, id: number, params?: any, server?: any) {
    let rpc: any = {
        jsonrpc: '2.0',
        method: method,
        id: id
    };
    if (server) {
        rpc._server = server;
    }
    if (params) {
        rpc.params = params;
    }
    return rpc;
}


export function buildResult(id: number, result: any, server?: any) {
    let rpc: any = {
        jsonrpc: '2.0',
        id: id,
        result: typeof result === 'undefined' ? null : result
    };
    if (server) {
        rpc._server = server;
    }
    return rpc;
}

export function buildError(id: number, error: any, server?: any) {
    let rpc: any = {
        jsonrpc: '2.0',
        id: id,
        error: error
    };
    if (server) {
        rpc._server = server;
    }
    return rpc;
}

//--------------------------------------------------------------------------
// Function: parse(data)
//--------------------------------------------------------------------------
export function parse(data: string) {
    return JSON.parse(String(data));
}
