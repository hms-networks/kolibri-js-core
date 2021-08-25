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
import { IsDefined, IsOptional, ValidateNested } from 'class-validator';
import { KolibriRequestMethods } from '../../../kolibri_request_methods';
import { IsKolibriDate } from '../../../../validation/decorators/is_kolibri_date';
import { IsKolibriNodePath } from '../../../../validation/decorators/is_kolibri_node_path';
import { IsKolibriProject } from '../../../../validation/decorators/is_kolibri_project';
import { JsonRpcId } from '../../../jsonrpc';
import { KolibriRequest } from '../../../kolibri_request';
import { KolibriSuccessResponse } from '../../../kolibri_response';

export class ProjectGetHistoryUsageParams {
    @IsKolibriDate()
    from: string;

    @IsKolibriDate()
    to: string;

    @IsOptional()
    @IsKolibriProject()
    project?: string;

    @IsOptional()
    @IsKolibriNodePath()
    path?: string;

    constructor(from: string, to: string, project?: string, path?: string) {
        this.from = from;
        this.to = to;
        this.project = project;
        this.path = path;
    }
}

export class ProjectGetHistoryUsageRequest extends KolibriRequest<ProjectGetHistoryUsageParams> {
    @ValidateNested()
    @Type(() => ProjectGetHistoryUsageParams)
    @IsDefined()
    params: ProjectGetHistoryUsageParams;

    constructor(id: JsonRpcId, params: ProjectGetHistoryUsageParams) {
        super(id, KolibriRequestMethods.ProjectGetHistoryUsageRequestMethod);
        this.params = params;
    }
}

export function isProjectGetHistoryUsageRequest(request: KolibriRequest<ProjectGetHistoryUsageParams>):
request is ProjectGetHistoryUsageRequest {
    return (request as KolibriRequest<ProjectGetHistoryUsageParams>)
        .method === KolibriRequestMethods.ProjectGetHistoryUsageRequestMethod;
}

export function toProjectGetHistoryUsageRequest(
    json: KolibriRequest<ProjectGetHistoryUsageParams>): ProjectGetHistoryUsageRequest {
    return plainToClass(ProjectGetHistoryUsageRequest, json);
}

export class ProjectGetHistoryUsageResult {
    date: string;
    stored: number;

    constructor(date: string, stored: number) {
        this.date = date;
        this.stored = stored;
    }
}

export class ProjectGetHistoryUsageResponse extends KolibriSuccessResponse<ProjectGetHistoryUsageResult> {}
