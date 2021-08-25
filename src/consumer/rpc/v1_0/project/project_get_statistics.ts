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
import { IsOptional, ValidateNested } from 'class-validator';
import { KolibriRequestMethods } from '../../../kolibri_request_methods';
import { IsKolibriProject } from '../../../../validation/decorators/is_kolibri_project';
import { JsonRpcId } from '../../../jsonrpc';
import { KolibriRequest } from '../../../kolibri_request';
import { KolibriSuccessResponse } from '../../../kolibri_response';

export class ProjectGetStatisticsParams {
    @IsOptional()
    @IsKolibriProject()
    project?: string;

    constructor(project?: string) {
        this.project = project;
    }
}

export class ProjectGetStatisticsRequest extends KolibriRequest<ProjectGetStatisticsParams> {
    @ValidateNested()
    @Type(() => ProjectGetStatisticsParams)
    params: ProjectGetStatisticsParams;

    constructor(id: JsonRpcId, params: ProjectGetStatisticsParams) {
        super(id, KolibriRequestMethods.ProjectGetStatisticsRequestMethod);
        this.params = params;
    }
}

export function isProjectGetStatisticsRequest(request: KolibriRequest<ProjectGetStatisticsParams>):
request is ProjectGetStatisticsRequest {
    return (request as KolibriRequest<ProjectGetStatisticsParams>)
        .method === KolibriRequestMethods.ProjectGetStatisticsRequestMethod;
}

export function toProjectGetStatisticsRequest(
    json: KolibriRequest<ProjectGetStatisticsParams>): ProjectGetStatisticsRequest {
    return plainToClass(ProjectGetStatisticsRequest, json);
}

export class ProjectGetStatisticsResult {
    groupsTotal: number;
    pointsTotal: number;
    pointsActive: number;
    usersTotal: number;
    usersActive: number;
    connectedProducers: number;
    connectedConsumers: number;

    constructor(groupsTotal: number, pointsTotal: number, pointsActive: number,
        usersTotal: number, usersActive: number,
        connectedProducers: number, connectedConsumers: number) {
        this.groupsTotal = groupsTotal;
        this.pointsTotal = pointsTotal;
        this.pointsActive = pointsActive;
        this.usersTotal = usersTotal;
        this.usersActive = usersActive;
        this.connectedProducers = connectedProducers;
        this.connectedConsumers = connectedConsumers;
    }
}

export class ProjectGetStatisticsResponse extends KolibriSuccessResponse<ProjectGetStatisticsResult> {
    result: ProjectGetStatisticsResult;
    constructor(id: JsonRpcId, result: ProjectGetStatisticsResult) {
        super(id, result);
        this.result = result;
    }
}
