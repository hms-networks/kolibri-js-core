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
    isInt,
    min,
    max
} from 'class-validator';
import { constants } from '../../common/constant';
import { KolibriError, errorcode } from '../../common/errorcode';


export function isKolibriNodeTriggerT(value: any) {
    if (!isInt(value) || !min(value, 0) || !max(value, constants.DT_UINT_32BIT_MAX)) {
        throw new KolibriError(errorcode.INVALID_VALUE, 'triggerT invalid');
    }

    return true;
}

@ValidatorConstraint({ name: 'isKolibriNodeTriggerT', async: true })
export class IsKolibriNodeTriggerTConstraint implements ValidatorConstraintInterface {
    validate(triggerT: any, _args: ValidationArguments) {
        return isKolibriNodeTriggerT(triggerT);
    }

    defaultMessage(_args: ValidationArguments) {
        return `TriggerT invalid`;
    }
}

export function IsKolibriNodeTriggerT(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsKolibriNodeTriggerTConstraint
        });
    };
}
