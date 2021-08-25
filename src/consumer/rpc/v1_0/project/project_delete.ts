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
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { KolibriRequestMethods } from '../../../kolibri_request_methods';
import { IsKolibriProject } from '../../../../validation/decorators/is_kolibri_project';
import { JsonRpcId } from '../../../jsonrpc';
import { KolibriRequest } from '../../../kolibri_request';
import { DefaultKolibriResponse } from '../../../kolibri_response';

export class ProjectDeleteParams {
    @IsKolibriProject()
    project: string;

    constructor(project: string) {
        this.project = project;
    }
}

export class ProjectDeleteRequest extends KolibriRequest<ProjectDeleteParams> {
    @ValidateNested()
    @Type(() => ProjectDeleteParams)
    @IsNotEmpty()
    params: ProjectDeleteParams;

    constructor(id: JsonRpcId, params: ProjectDeleteParams) {
        super(id, KolibriRequestMethods.ProjectDeleteRequestMethod);
        this.params = params;
    }
}

export function isProjectDeleteRequest(request: KolibriRequest<ProjectDeleteParams>):
request is ProjectDeleteRequest {
    return (request as KolibriRequest<ProjectDeleteParams>).method === KolibriRequestMethods.ProjectDeleteRequestMethod;
}

export function toProjectDeleteRequest(json: KolibriRequest<ProjectDeleteParams>): ProjectDeleteRequest {
    return plainToClass(ProjectDeleteRequest, json);
}

export class ProjectDeleteResponse extends DefaultKolibriResponse {}
