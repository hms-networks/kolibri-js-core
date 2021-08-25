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

export const IS_UNSIGNED_16_BIT = 'isUnsigned16Bit';

export function isUnsigned16Bit(value: unknown): boolean {
    return isInt(value) && min(value, 0) && max(value, 65535);
}

@ValidatorConstraint({ name: IS_UNSIGNED_16_BIT, async: true })
export class IsUnsigned16BitConstraint implements ValidatorConstraintInterface {
    validate(value: any, _args: ValidationArguments) {
        return isUnsigned16Bit(value);
    }

    defaultMessage(_args: ValidationArguments) {
        return `$property must be an unsigned 16 bit number.`;
    }
}

export function IsUnsigned16Bit(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsUnsigned16BitConstraint
        });
    };
}
