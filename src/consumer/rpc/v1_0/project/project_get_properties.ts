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

export class ProjectGetPropertiesParams {
    @IsOptional()
    @IsKolibriProject()
    project?: string;

    constructor(project?: string) {
        this.project = project;
    }
}

export class ProjectGetPropertiesRequest extends KolibriRequest<ProjectGetPropertiesParams> {
    @ValidateNested()
    @Type(() => ProjectGetPropertiesParams)
    params: ProjectGetPropertiesParams;

    constructor(id: JsonRpcId, params: ProjectGetPropertiesParams) {
        super(id, KolibriRequestMethods.ProjectGetPropertiesRequestMethod);
        this.params = params;
    }
}

export function isProjectGetPropertiesRequest(request: KolibriRequest<ProjectGetPropertiesParams>):
request is ProjectGetPropertiesRequest {
    return (request as KolibriRequest<ProjectGetPropertiesParams>)
        .method === KolibriRequestMethods.ProjectGetPropertiesRequestMethod;
}

export function toProjectGetPropertiesRequest(
    json: KolibriRequest<ProjectGetPropertiesParams>): ProjectGetPropertiesRequest {
    return plainToClass(ProjectGetPropertiesRequest, json);
}

export class ProjectGetPropertiesResult {
    description: string;
    limitHistoryPoint: number;
    limitHistoryUser: number;
    active: boolean;
    kolibriProdVersionRange: string;
    kolibriConsVersionRange: string;

    constructor(description: string, limitHistoryPoint: number, limitHistoryUser: number,
        active: boolean, kolibriProdVersionRange: string, kolibriConsVersionRange: string) {
        this.description = description;
        this.limitHistoryPoint = limitHistoryPoint;
        this.limitHistoryUser = limitHistoryUser;
        this.active = active;
        this.kolibriProdVersionRange = kolibriProdVersionRange;
        this.kolibriConsVersionRange = kolibriConsVersionRange;
    }
}

export class ProjectGetPropertiesResponse extends KolibriSuccessResponse<ProjectGetPropertiesResult> {
    result: ProjectGetPropertiesResult;
    constructor(id: JsonRpcId, result: ProjectGetPropertiesResult) {
        super(id, result);
        this.result = result;
    }
}
