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
import { IsBoolean, IsDefined, IsOptional, ValidateNested } from 'class-validator';
import { KolibriRequestMethods } from '../../../kolibri_request_methods';
import { IsKolibriDate } from '../../../../validation/decorators/is_kolibri_date';
import { IsKolibriNodePath } from '../../../../validation/decorators/is_kolibri_node_path';
import { IsKolibriProject } from '../../../../validation/decorators/is_kolibri_project';
import { IsKolibriUser } from '../../../../validation/decorators/is_kolibri_user';
import { JsonRpcId } from '../../../jsonrpc';
import { KolibriRequest } from '../../../kolibri_request';
import { KolibriSuccessResponse } from '../../../kolibri_response';

export class ProjectGetLiveUsageParams {
    @IsKolibriDate()
    from: string;

    @IsKolibriDate()
    to: string;

    @IsOptional()
    @IsKolibriProject()
    project?: string;

    @IsOptional()
    @IsKolibriUser()
    user?: string;

    @IsOptional()
    @IsKolibriNodePath()
    path?: string;

    @IsOptional()
    @IsBoolean()
    aggregate?: boolean;

    constructor(from: string, to: string, project?: string, user?: string, path?: string, aggregate?: boolean) {
        this.from = from;
        this.to = to;
        this.project = project;
        this.user = user;
        this.path = path;
        this.aggregate = aggregate;
    }
}

export class ProjectGetLiveUsageRequest extends KolibriRequest<ProjectGetLiveUsageParams> {
    @ValidateNested()
    @Type(() => ProjectGetLiveUsageParams)
    @IsDefined()
    params: ProjectGetLiveUsageParams;

    constructor(id: JsonRpcId, params: ProjectGetLiveUsageParams) {
        super(id, KolibriRequestMethods.ProjectGetLiveUsageRequestMethod);
        this.params = params;
    }
}

export function isProjectGetLiveUsageRequest(request: KolibriRequest<ProjectGetLiveUsageParams>):
    request is ProjectGetLiveUsageRequest {
    return (request as KolibriRequest<ProjectGetLiveUsageParams>)
        .method === KolibriRequestMethods.ProjectGetLiveUsageRequestMethod;
}

export function toProjectGetLiveUsageRequest(
    json: KolibriRequest<ProjectGetLiveUsageParams>): ProjectGetLiveUsageRequest {
    return plainToClass(ProjectGetLiveUsageRequest, json);
}

export class ProjectGetLiveUsageResult {
    date: string;
    in: number;
    out: number

    constructor(date: string, incoming: number, outgoing: number) {
        this.date = date;
        this.in = incoming;
        this.out = outgoing;
    }
}

export class ProjectGetLiveUsageResponse extends KolibriSuccessResponse<ProjectGetLiveUsageResult[]> { }
