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
import {
    IsBoolean, IsDefined, IsInt, IsOptional,
    IsSemVer, IsString, Length, Min, ValidateNested
} from 'class-validator';
import { constants } from '../../../../common/constant';
import { KolibriRequestMethods } from '../../../kolibri_request_methods';
import { IsKolibriProject } from '../../../../validation/decorators/is_kolibri_project';
import { JsonRpcId } from '../../../jsonrpc';
import { KolibriRequest } from '../../../kolibri_request';
import { DefaultKolibriResponse } from '../../../kolibri_response';

export class ProjectModifyParams {
    @IsKolibriProject()
    project: string;

    @IsOptional()
    @IsString()
    @Length(0, constants.DT_STRING_MAXLEN)
    description?: string;

    @IsOptional()
    @IsInt()
    @Min(0)
    limitHistoryPoint?: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    limitHistoryUser?: number

    @IsOptional()
    @IsBoolean()
    active?: boolean

    @IsOptional()
    @IsSemVer()
    kolibriProdVersionRange?: string;

    @IsOptional()
    @IsSemVer()
    kolibriConsVersionRange?: string;

    constructor(project: string, description?: string, limitHistoryPoint?: number, limitHistoryUser?: number,
        active?: boolean, kolibriProdVersionRange?: string, kolibriConsVersionRange?: string) {
        this.project = project;
        this.description = description;
        this.limitHistoryPoint = limitHistoryPoint;
        this.limitHistoryUser = limitHistoryUser;
        this.active = active;
        this.kolibriProdVersionRange = kolibriProdVersionRange;
        this.kolibriConsVersionRange = kolibriConsVersionRange;
    }
}

export class ProjectModifyRequest extends KolibriRequest<ProjectModifyParams> {
    @ValidateNested()
    @Type(() => ProjectModifyParams)
    @IsDefined()
    params: ProjectModifyParams;

    constructor(id: JsonRpcId, params: ProjectModifyParams) {
        super(id, KolibriRequestMethods.ProjectModifyRequestMethod);
        this.params = params;
    }
}

export function isProjectModifyRequest(request: KolibriRequest<ProjectModifyParams>): request is ProjectModifyRequest {
    return (request as KolibriRequest<ProjectModifyParams>).method === KolibriRequestMethods.ProjectModifyRequestMethod;
}

export function toProjectModifyRequest(json: KolibriRequest<ProjectModifyParams>): ProjectModifyRequest {
    return plainToClass(ProjectModifyRequest, json);
}

export class ProjectModifyResponse extends DefaultKolibriResponse { }
