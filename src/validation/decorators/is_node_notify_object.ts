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

import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
    isString,
    maxLength,
    isNumber,
    min,
    max,
    isBoolean
} from 'class-validator';
import { constants } from '../../common/constant';
import { NodeNotifyObject, NodePermissions } from '../../consumer/rpc/v3_3';

function validateTriggerN(triggerN: string | number | boolean) {
    return (isNumber(triggerN) || isString(triggerN) || isNumber(triggerN));
}

function validateTriggerT(triggerT: number) {
    return (isNumber(triggerT) && min(triggerT, 0) && max(triggerT, 4294967295));
}

function validateStringObject(value: string) {
    return (isString(value) &&
    maxLength(value, constants.DT_STRING_MAXLEN));
}

function validatePermissionsObject(permissions: NodePermissions) {
    return (isBoolean(permissions.config) ||
        isBoolean(permissions.read) ||
        isBoolean(permissions.write));
}

export function isNodeNotifyObject(value: NodeNotifyObject) {
    return (value.description != null && validateStringObject(value.description)) ||
    (value.flags != null && isNumber(value.flags)) ||
    (value.dataType != null && isNumber(value.dataType)) ||
    (value.triggerMode != null && isNumber(value.triggerMode)) ||
    (value.triggerN != null && validateTriggerN(value.triggerN)) ||
    (value.triggerT != null && validateTriggerT(value.triggerT)) ||
    (value.triggerDomain != null && isNumber(value.triggerDomain)) ||
    (value.qosLevel != null && isNumber(value.qosLevel)) ||
    (value.format != null && validateStringObject(value.format)) ||
    (value.scalingFactor != null && isNumber(value.scalingFactor)) ||
    (value.scalingOffset != null && isNumber(value.scalingOffset)) ||
    (value.writeRangeMin != null && isNumber(value.writeRangeMin)) ||
    (value.writeRangeMax != null && isNumber(value.writeRangeMax)) ||
    (value.permissions != null && validatePermissionsObject(value.permissions));
}

@ValidatorConstraint({ name: 'isNodeNotifyObject', async: true })
export class isNodeNotifyObjectConstraint implements ValidatorConstraintInterface {
    validate(data: any, _args: ValidationArguments) {
        return isNodeNotifyObject(data);
    }
}

export function IsNodeNotifyObject(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: isNodeNotifyObjectConstraint
        });
    };
}
