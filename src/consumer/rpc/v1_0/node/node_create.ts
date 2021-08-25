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
    IsDefined, IsIn, IsInt, IsNumber, IsOptional, IsString, Length,
    Max, Min, NotEquals, ValidateNested
} from 'class-validator';
import { constants } from '../../../../common/constant';
import { KolibriRequestMethods } from '../../../kolibri_request_methods';
import { IsKolibriNodePath } from '../../../../validation/decorators/is_kolibri_node_path';
import { IsKolibriNodeTriggerN } from '../../../../validation/decorators/is_kolibri_trigger_n';
import { IsKolibriUpdateUrl } from '../../../../validation/decorators/is_kolibri_update_url';
import { IsUnsigned16Bit } from '../../../../validation/decorators/is_unsigned_16_bit';
import { JsonRpcId } from '../../../jsonrpc';
import { KolibriRequest } from '../../../kolibri_request';
import { DefaultKolibriResponse } from '../../../kolibri_response';

export class NodeCreateParams {
    @IsKolibriNodePath()
    path: string;

    @IsInt()
    @IsIn([constants.POINT, constants.GROUP])
    type: number;

    @IsOptional()
    @IsString()
    @Length(0, constants.DT_STRING_MAXLEN)
    description?: string;

    @IsOptional()
    @IsInt()
    @Min(0)
    @Max(31)
    flags?: number;

    @IsOptional()
    @IsInt()
    @Min(constants.DT_MIN)
    @Max(constants.DT_MAX)
    @NotEquals(constants.DT_RESERVED)
    dataType?: number;

    @IsOptional()
    @IsInt()
    @Min(constants.TRIGGER_MIN)
    @Max(constants.TRIGGER_MAX)
    triggerMode?: number;

    @IsOptional()
    @IsKolibriNodeTriggerN()
    triggerN?: boolean | number | string;

    @IsOptional()
    @IsInt()
    @Min(0)
    @Max(4294967295)
    triggerT?: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    @Max(255)
    triggerDomain?: number;

    @IsOptional()
    @IsInt()
    @Min(constants.QOS_MIN)
    @Max(constants.QOS_MAX)
    qosLevel?: number;

    @IsOptional()
    @IsKolibriUpdateUrl()
    updateUrl?: string;

    @IsOptional()
    @IsUnsigned16Bit()
    history?: number;

    @IsOptional()
    @IsString()
    @Length(0, constants.DT_STRING_MAXLEN)
    format?: string;

    @IsOptional()
    @IsNumber()
    scalingFactor?: number;

    @IsOptional()
    @IsNumber()
    scalingOffset?: number;

    @IsOptional()
    @IsNumber()
    writeRangeMin?: number;

    @IsOptional()
    @IsNumber()
    writeRangeMax?: number;

    constructor(path: string, type: number, description?: string, flags?: number, dataType?: number,
        triggerMode?: number, triggerN?: boolean | number | string, triggerT?: number, triggerDomain?: number,
        qosLevel?: number, updateUrl?: string, history?: number, format?: string, scalingFactor?: number,
        scalingOffset?: number, writeRangeMin?: number, writeRangeMax?: number) {
        this.path = path;
        this.type = type;
        this.description = description;
        this.flags = flags;
        this.dataType = dataType;
        this.triggerMode = triggerMode;
        this.triggerN = triggerN;
        this.triggerT = triggerT;
        this.triggerDomain = triggerDomain;
        this.qosLevel = qosLevel;
        this.updateUrl = updateUrl;
        this.history = history;
        this.format = format;
        this.scalingFactor = scalingFactor;
        this.scalingOffset = scalingOffset;
        this.writeRangeMin = writeRangeMin;
        this.writeRangeMax = writeRangeMax;
    }
}

export class NodeCreateRequest extends KolibriRequest<NodeCreateParams> {
    @ValidateNested()
    @Type(() => NodeCreateParams)
    @IsDefined()
    params: NodeCreateParams;

    constructor(id: JsonRpcId, params: NodeCreateParams) {
        super(id, KolibriRequestMethods.NodeCreateRequestMethod);
        this.params = params;
    }
}

export class NodeCreateResponse extends DefaultKolibriResponse { }

export function isNodeCreateRequest(request: KolibriRequest<NodeCreateParams>): request is NodeCreateRequest {
    return (request as KolibriRequest<NodeCreateParams>).method === KolibriRequestMethods.NodeCreateRequestMethod;
}

export function toNodeCreateRequest(json: KolibriRequest<NodeCreateParams>): NodeCreateRequest {
    return plainToClass(NodeCreateRequest, json);
}
