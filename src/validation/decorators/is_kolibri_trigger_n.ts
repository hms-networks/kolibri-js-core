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
    isBoolean,
    isString,
    isNumber
} from 'class-validator';


@ValidatorConstraint({ name: 'isKolibriNodeTriggerN', async: true })
export class IsKolibriNodeTriggerNConstraint implements ValidatorConstraintInterface {
    validate(triggerN: any, _args: ValidationArguments) {
        if (!isBoolean(triggerN) && !isString(triggerN) && !isNumber(triggerN)) {
            return false;
        }

        return true;
    }

    defaultMessage(_args: ValidationArguments) {
        return `TriggerT invalid`;
    }
}

export function IsKolibriNodeTriggerN(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsKolibriNodeTriggerNConstraint
        });
    };
}
