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
    IsDefined, IsInt, IsNumber, IsOptional, IsString, Length,
    Max, Min, NotEquals, ValidateNested
} from 'class-validator';
import { constants } from '../../../../common/constant';
import { KolibriRequestMethods } from '../../../kolibri_request_methods';
import { IsKolibriNodePath } from '../../../../validation/decorators/is_kolibri_node_path';
import { IsUnsigned16Bit } from '../../../../validation/decorators/is_unsigned_16_bit';
import { JsonRpcId } from '../../../jsonrpc';
import { KolibriRequest } from '../../../kolibri_request';
import { DefaultKolibriResponse } from '../../../kolibri_response';

export class NodeModifyParams {
    @IsKolibriNodePath()
    path: string;

    @IsOptional()
    @IsString()
    @Length(0, constants.DT_STRING_MAXLEN)
    description?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(255)
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
    triggerN?: boolean | number | string; // depends on triggerMode

    @IsOptional()
    @IsNumber()
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

    constructor(path: string, description?: string, flags?: number, dataType?: number,
        triggerMode?: number, triggerN?: boolean | number | string, triggerT?: number, triggerDomain?: number,
        qosLevel?: number, history?: number, format?: string, scalingFactor?: number,
        scalingOffset?: number, writeRangeMin?: number, writeRangeMax?: number) {
        this.path = path;
        this.description = description;
        this.flags = flags;
        this.dataType = dataType;
        this.triggerMode = triggerMode;
        this.triggerN = triggerN;
        this.triggerT = triggerT;
        this.triggerDomain = triggerDomain;
        this.qosLevel = qosLevel;
        this.history = history;
        this.format = format;
        this.scalingFactor = scalingFactor;
        this.scalingOffset = scalingOffset;
        this.writeRangeMin = writeRangeMin;
        this.writeRangeMax = writeRangeMax;
    }
}

export class NodeModifyRequest extends KolibriRequest<NodeModifyParams> {
    @ValidateNested()
    @Type(() => NodeModifyParams)
    @IsDefined()
    params: NodeModifyParams;

    constructor(id: JsonRpcId, params: NodeModifyParams) {
        super(id, KolibriRequestMethods.NodeModifyRequestMethod);
        this.params = params;
    }
}

export class NodeModifyResponse extends DefaultKolibriResponse { }

export function isNodeModifyRequest(request: KolibriRequest<NodeModifyParams>):
    request is NodeModifyRequest {
    return (request as KolibriRequest<NodeModifyParams>).method === KolibriRequestMethods.NodeModifyRequestMethod;
}

export function toNodeModifyRequest(json: KolibriRequest<NodeModifyParams>): NodeModifyRequest {
    return plainToClass(NodeModifyRequest, json);
}
