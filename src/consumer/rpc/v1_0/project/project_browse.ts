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
import { IsBoolean, IsOptional, ValidateNested } from 'class-validator';
import { KolibriRequestMethods } from '../../../kolibri_request_methods';
import { JsonRpcId } from '../../../jsonrpc';
import { KolibriRequest } from '../../../kolibri_request';
import { KolibriSuccessResponse } from '../../../kolibri_response';

export class ProjectBrowseParams {
    @IsOptional()
    @IsBoolean()
    active?: boolean;

    constructor(active?: boolean) {
        this.active = active;
    }
}

export class ProjectBrowseRequest extends KolibriRequest<ProjectBrowseParams> {
    @ValidateNested()
    @Type(() => ProjectBrowseParams)
    params: ProjectBrowseParams;

    constructor(id: JsonRpcId, params: ProjectBrowseParams) {
        super(id, KolibriRequestMethods.ProjectBrowseRequestMethod);
        this.params = params;
    }
}

export function isProjectBrowseRequest(request: KolibriRequest<ProjectBrowseParams>):
request is ProjectBrowseRequest {
    return (request as KolibriRequest<ProjectBrowseParams>).method === KolibriRequestMethods.ProjectBrowseRequestMethod;
}

export function toProjectBrowseRequest(json: KolibriRequest<ProjectBrowseParams>): ProjectBrowseRequest {
    return plainToClass(ProjectBrowseRequest, json);
}

export class ProjectBrowseResult {
    project: string;
    description: string;
    active: boolean;
    kolibriProdVersionRange: string;
    kolibriConsVersionRange: string;

    constructor(project: string, description: string, active: boolean,
        kolibriProdVersionRange: string, kolibriConsVersionRange: string) {
        this.project = project;
        this.description = description;
        this.active = active;
        this.kolibriProdVersionRange = kolibriProdVersionRange;
        this.kolibriConsVersionRange = kolibriConsVersionRange;
    }
}

export class ProjectBrowseResponse extends KolibriSuccessResponse<ProjectBrowseResult[]> {
    result: ProjectBrowseResult[];
    constructor(id: JsonRpcId, result: ProjectBrowseResult[]) {
        super(id, result);
        this.result = result;
    }
}
