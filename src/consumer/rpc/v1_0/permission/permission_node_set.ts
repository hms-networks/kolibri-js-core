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
import { IsBoolean, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { KolibriRequestMethods } from '../../../kolibri_request_methods';
import { IsKolibriNodePath } from '../../../../validation/decorators/is_kolibri_node_path';
import { IsKolibriProject } from '../../../../validation/decorators/is_kolibri_project';
import { IsKolibriUser } from '../../../../validation/decorators/is_kolibri_user';
import { JsonRpcId } from '../../../jsonrpc';
import { KolibriRequest } from '../../../kolibri_request';
import { DefaultKolibriResponse } from '../../../kolibri_response';

export class PermissionNodeSetParams {
    @IsOptional()
    @IsKolibriProject()
    project?: string;

    @IsKolibriUser()
    user: string;

    @IsKolibriNodePath()
    path: string;

    @IsOptional()
    @IsBoolean()
    read?: boolean;

    @IsOptional()
    @IsBoolean()
    write?: boolean;

    @IsOptional()
    @IsBoolean()
    config?: boolean;

    constructor(user: string, path: string, project?: string, read?: boolean, write?: boolean, config?: boolean) {
        this.project = project;
        this.user = user;
        this.path = path;
        this.read = read;
        this.write = write;
        this.config = config;
    }
}

export class PermissionNodeSetRequest extends KolibriRequest<PermissionNodeSetParams> {
    @ValidateNested()
    @Type(() => PermissionNodeSetParams)
    @IsNotEmpty()
    params: PermissionNodeSetParams;

    constructor(id: JsonRpcId, params: PermissionNodeSetParams) {
        super(id, KolibriRequestMethods.PermissionNodeSetRequestMethod);
        this.params = params;
    }
}

export function isPermissionNodeSetRequest(request: KolibriRequest<PermissionNodeSetParams>):
    request is PermissionNodeSetRequest {
    return (request as KolibriRequest<PermissionNodeSetParams>)
        .method === KolibriRequestMethods.PermissionNodeSetRequestMethod;
}

export function toPermissionNodeSetRequest(json: KolibriRequest<PermissionNodeSetParams>): PermissionNodeSetRequest {
    return plainToClass(PermissionNodeSetRequest, json);
}

export class PermissionNodeSetResponse extends DefaultKolibriResponse { }
