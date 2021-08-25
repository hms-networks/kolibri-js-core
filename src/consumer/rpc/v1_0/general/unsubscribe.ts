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
import { ArrayNotEmpty, IsDefined, ValidateNested } from 'class-validator';
import { KolibriRequestMethods } from '../../../kolibri_request_methods';
import { IsKolibriNodePath } from '../../../../validation/decorators/is_kolibri_node_path';
import { JsonRpcId } from '../../../jsonrpc';
import { KolibriRequest } from '../../../kolibri_request';
import { DefaultKolibriResponse } from '../../../kolibri_response';

export class UnsubscribeParams {
    @IsKolibriNodePath()
    path: string;

    constructor(path: string) {
        this.path = path;
    }
}

export class UnsubscribeRequest extends KolibriRequest<UnsubscribeParams[]> {
    @ValidateNested()
    @Type(() => UnsubscribeParams)
    @IsDefined()
    @ArrayNotEmpty()
    params: UnsubscribeParams[];

    constructor(id: JsonRpcId, params: UnsubscribeParams[]) {
        super(id, KolibriRequestMethods.UnsubscribeRequestMethod);
        this.params = params;
    }
}

export function isUnsubscribeRequest(request: KolibriRequest<UnsubscribeParams[]>): request is UnsubscribeRequest {
    return (request as KolibriRequest<UnsubscribeParams[]>).method === KolibriRequestMethods.UnsubscribeRequestMethod;
}

export function toUnsubscribeRequest(json: KolibriRequest<UnsubscribeParams[]>): UnsubscribeRequest {
    return plainToClass(UnsubscribeRequest, json);
}

export class UnsubscribeResponse extends DefaultKolibriResponse {}
