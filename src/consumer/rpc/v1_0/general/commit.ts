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

export class CommitParams {
    @IsUnsigned16Bit()
    tid: number;

    constructor(tid: number) {
        this.tid = tid;
    }
}

export class CommitRequest extends KolibriRequest<CommitParams> {
    @ValidateNested()
    @Type(() => CommitParams)
    @IsDefined()
    params: CommitParams;

    constructor(id: JsonRpcId, params: CommitParams) {
        super(id, KolibriRequestMethods.CommitRequestMethod);
        this.params = params;
    }
}

export function isCommitRequest(request: KolibriRequest<CommitParams>): request is CommitRequest {
    return (request as KolibriRequest<CommitParams>).method === KolibriRequestMethods.CommitRequestMethod;
}

export function toCommitRequest(json: KolibriRequest<CommitParams>): CommitRequest {
    return plainToClass(CommitRequest, json);
}
export class CommitResponse extends DefaultKolibriResponse {}
