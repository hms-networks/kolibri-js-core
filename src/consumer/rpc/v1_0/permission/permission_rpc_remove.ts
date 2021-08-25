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
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { KolibriRequestMethods } from '../../../kolibri_request_methods';
import { IsKolibriProject } from '../../../../validation/decorators/is_kolibri_project';
import { IsKolibriUser } from '../../../../validation/decorators/is_kolibri_user';
import { JsonRpcId } from '../../../jsonrpc';
import { KolibriRequest } from '../../../kolibri_request';
import { DefaultKolibriResponse } from '../../../kolibri_response';

export class PermissionRpcRemoveParams {
    @IsKolibriUser()
    user: string;

    @IsOptional()
    @IsKolibriProject()
    project?: string;

    @IsArray()
    @IsNotEmpty()
    rpcs: Array<string>;

    @IsOptional()
    @IsString()
    server?: string;

    constructor(user: string, rpcs: Array<string>, project?: string, server?: string) {
        this.user = user;
        this.rpcs = rpcs;
        this.project = project;
        this.server = server;
    }
}

export class PermissionRpcRemoveRequest extends KolibriRequest<PermissionRpcRemoveParams> {
    @ValidateNested()
    @Type(() => PermissionRpcRemoveParams)
    @IsNotEmpty()
    params: PermissionRpcRemoveParams;

    constructor(id: JsonRpcId, params: PermissionRpcRemoveParams) {
        super(id, KolibriRequestMethods.PermissionRpcRemoveRequestMethod);
        this.params = params;
    }
}

export function isPermissionRpcRemoveRequest(request: KolibriRequest<PermissionRpcRemoveParams>):
    request is PermissionRpcRemoveRequest {
    return (request as KolibriRequest<PermissionRpcRemoveParams>)
        .method === KolibriRequestMethods.PermissionRpcRemoveRequestMethod;
}

export function toPermissionRpcRemoveRequest(json: KolibriRequest<PermissionRpcRemoveParams>):
    PermissionRpcRemoveRequest {
    return plainToClass(PermissionRpcRemoveRequest, json);
}

export class PermissionRpcRemoveResponse extends DefaultKolibriResponse { }
