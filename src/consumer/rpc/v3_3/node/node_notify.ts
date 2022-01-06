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
import { IsDefined, ValidateNested, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { KolibriRequestMethods } from '../../../kolibri_request_methods';
import { IsKolibriNodePath } from '../../../../validation/decorators/is_kolibri_node_path';
import { JsonRpcId } from '../../../jsonrpc';
import { KolibriRequest } from '../../../kolibri_request';
import { DefaultKolibriResponse } from '../../../kolibri_response';
import { IsNodeNotifyObject } from '../../../../validation/decorators/is_node_notify_object';

export enum NotifyEvents {
    'created',
    'changed',
    'deleted',
    'permission-granted',
    'permission-revoked'
}

export class NodeNotifyParams {
    @IsEnum(NotifyEvents)
    event: string;

    @IsKolibriNodePath()
    path: string;

    @IsNumber()
    timestamp: number;

    @IsOptional()
    @IsNodeNotifyObject()
    data?: NodeNotifyObject | undefined;

    constructor(event: string, path: string, timestamp: number, data?: NodeNotifyObject) {
        this.event = event;
        this.path = path;
        this.timestamp = timestamp;
        this.data = data;
    }
}

export class NodeNotifyObject {
    description?: string;
    flags?: number;
    dataType?: number;
    triggerMode?: number;
    triggerN?: boolean | number | string;
    triggerT?: number;
    triggerDomain?: number;
    qosLevel?: number;
    history?: number;
    format?: string;
    scalingFactor?: number;
    scalingOffset?: number;
    writeRangeMin?: number;
    writeRangeMax?: number;
    permissions?: NodePermissions;

    constructor(description?: string, flags?: number, dataType?: number, triggerMode?: number,
        triggerN?: boolean | number | string, triggerT?: number, triggerDomain?: number, qosLevel?: number,
        history?: number, format?: string, scalingFactor?: number, scalingOffset?: number,
        writeRangeMin?: number, writeRangeMax?: number, permissions?: NodePermissions) {
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
        this.writeRangeMax = writeRangeMax;
        this.writeRangeMin = writeRangeMin;
        this.permissions = permissions;
    }
}
export class NodePermissions {
    constructor(
        public read?: boolean,
        public write?: boolean,
        public config?: boolean
    ) { }
}

export class NodeNotifyRequest extends KolibriRequest<NodeNotifyParams> {
    @ValidateNested()
    @Type(() => NodeNotifyParams)
    @IsDefined()
    params: NodeNotifyParams;

    constructor(id: JsonRpcId, params: NodeNotifyParams) {
        super(id, KolibriRequestMethods.NodeNotifyRequestMethod);
        this.params = params;
    }
}

export class NodeNotifyResponse extends DefaultKolibriResponse { }

export function isNodeNotifyRequest(request: KolibriRequest<NodeNotifyParams>):
    request is NodeNotifyRequest {
    return (request as KolibriRequest<NodeNotifyParams>)
        .method === KolibriRequestMethods.NodeNotifyRequestMethod;
}

export function toNodeNotifyRequest(json: KolibriRequest<NodeNotifyParams>): NodeNotifyRequest {
    return plainToClass(NodeNotifyRequest, json);
}
