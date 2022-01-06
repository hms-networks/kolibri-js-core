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
    isDateString
} from 'class-validator';
import { format } from 'date-fns';


export function isKolibriDate(value: any) {
    const dateString = format(new Date(value), 'yyyy-MM-dd');
    return isDateString(value) && value === dateString;
}

@ValidatorConstraint({ name: 'isKolibriDate', async: true })
export class IsKolibriDateConstraint implements ValidatorConstraintInterface {
    validate(date: any, _args: ValidationArguments) {
        return isKolibriDate(date);
    }

    defaultMessage(_args: ValidationArguments) {
        return `date invalid`;
    }
}

export function IsKolibriDate(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsKolibriDateConstraint
        });
    };
}
