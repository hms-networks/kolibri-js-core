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

/**
* Parts of the code is:
* The MIT License (MIT)
* Copyright (c) 2016 Rick Carlino
*/


/** A String specifying the version of the JSON-RPC protocol. MUST be exactly "2.0". */
export type JsonRpcVersion = '2.0';

/** Method names that begin with the word rpc followed by a period character
 * (U+002E or ASCII 46) are reserved for rpc-internal methods and extensions
 *  and MUST NOT be used for anything else. */
export type JsonRpcReservedMethod = string;

/** An identifier established by the Client that MUST contain a String, Number,
 *  or NULL value if included. If it is not included it is assumed to be a
 *  notification. The value SHOULD normally not be Null and Numbers SHOULD
 *  NOT contain fractional parts [2] */
export type JsonRpcId = number | string | void;

export interface JsonRpcRequest<T> {
    jsonrpc: JsonRpcVersion;
    method: string,
    id: JsonRpcId;
    params?: T;
}

export interface JsonRpcError<T> {
    /** Must be an integer */
    code: number;
    message: string;
    data?: T;
}

export interface JsonRpcResponse {
    jsonrpc: JsonRpcVersion;
    id: JsonRpcId;
}

export interface JsonRpcSuccess<T> extends JsonRpcResponse {
    result: T;
}

export interface JsonRpcFailure<T> extends JsonRpcResponse {
    error: JsonRpcError<T>;
}


//
// PRE-DEFINED ERROR CODES
//
//
/** An error occurred on the server while parsing the JSON text. */
export const PARSE_ERROR = -32700;
/** The JSON sent is not a valid Request object. */
export const INVALID_REQUEST = -32600;
/** The method does not exist / is not available. */
export const METHOD_NOT_FOUND = -32601;
/** Invalid method parameter(s). */
export const INVALID_PARAMS = -32602;
/** Internal JSON-RPC error. */
export const INTERNAL_ERROR = -32603;

//
// TYPE GUARDS (for convenience)
//
//
/** Determine if data is a properly formatted JSONRPC 2.0 ID. */
export function isJsonRpcId(input: JsonRpcId | any): input is JsonRpcId {
    switch (typeof input) {
        case 'string':
            return true;
        case 'number':
            return input % 1 !== 0;
        case 'object':
            let isNull = input === null;
            if (isNull) {
                console.warn('Use of null ID in JSONRPC 2.0 is discouraged.');
                return true;
            }
            else {
                return false;
            }
        default:
            return false;
    }
}

export function isJsonRpcError<T>(json: unknown): json is JsonRpcError<T> {
    const jsonAsError = (json as JsonRpcError<T>);
    return jsonAsError.code !== undefined && jsonAsError.message !== undefined;
}

export function isJsonRpcRequest<T>(json: JsonRpcRequest<T>): json is JsonRpcRequest<T> {
    const request = json as JsonRpcRequest<T>;

    if (!request || typeof request !== 'object') {
        return false;
    }
    if (!request.jsonrpc || request.jsonrpc !== '2.0') {
        return false;
    }
    if (!request.method || typeof request.method !== 'string') {
        return false;
    }
    if (request.params && typeof request.params !== 'object') {
        return false;
    }
    if (!request.id || (typeof request.id !== 'string' && typeof request.id !== 'number')) {
        return false;
    }
    return true;
}

export function isJsonRpcSuccess<T>(response: JsonRpcResponse): response is JsonRpcSuccess<T> {
    return (response as JsonRpcSuccess<T>).result !== undefined;
}

export function isJsonRpcFailure<T>(response: JsonRpcResponse): response is JsonRpcFailure<T> {
    const responseAsFailure = (response as JsonRpcFailure<T>);
    return responseAsFailure.error !== undefined && isJsonRpcError(responseAsFailure.error);
}
