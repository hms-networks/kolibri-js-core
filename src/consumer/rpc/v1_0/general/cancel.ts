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
import { IsDefined, ValidateNested } from 'class-validator';
import { KolibriRequestMethods } from '../../../kolibri_request_methods';
import { IsUnsigned16Bit } from '../../../../validation/decorators/is_unsigned_16_bit';
import { JsonRpcId } from '../../../jsonrpc';
import { KolibriRequest } from '../../../kolibri_request';
import { DefaultKolibriResponse } from '../../../kolibri_response';

export class CancelParams {
    @IsUnsigned16Bit()
    tid: number;

    constructor(tid: number) {
        this.tid = tid;
    }
}

export class CancelRequest extends KolibriRequest<CancelParams> {
    @IsDefined()
    @ValidateNested()
    @Type(() => CancelParams)
    params: CancelParams;

    constructor(id: JsonRpcId, params: CancelParams) {
        super(id, KolibriRequestMethods.CancelRequestMethod);
        this.params = params;
    }
}

export function isCancelRequest(request: KolibriRequest<CancelParams>): request is CancelRequest {
    return (request as KolibriRequest<CancelParams>).method === KolibriRequestMethods.CancelRequestMethod;
}

export function toCancelRequest(json: KolibriRequest<CancelParams>): CancelRequest {
    return plainToClass(CancelRequest, json);
}


export class CancelResponse extends DefaultKolibriResponse { }
