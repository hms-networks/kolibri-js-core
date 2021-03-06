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
    matches
} from 'class-validator';
import { constants } from '../../common/constant';

export const IS_KOLIBRI_USER_GROUP = 'isKolibriUserGroup';


export function isKolibriUserGroup(value: any) {
    return isString(value) &&
        maxLength(value, constants.USER_NAME_MAXLEN) &&
        matches(value, /^(([a-z0-9])|([a-z0-9][a-z0-9_.-]{0,30}[a-z0-9]))$/i);
}

@ValidatorConstraint({ name: IS_KOLIBRI_USER_GROUP, async: true })
export class IsKolibriUserGroupConstraint implements ValidatorConstraintInterface {
    validate(user: any, _args: ValidationArguments) {
        return isKolibriUserGroup(user);
    }

    defaultMessage(_args: ValidationArguments) {
        return `UserGroup ($value) must start and end with a letter
        or digit ([a-zA-Z0-9]) and which may contain up to 32 characters from the character
        class [a-zA-Z0-9_.-]. The name is case-insensitive.`;
    }
}

export function IsKolibriUserGroup(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsKolibriUserGroupConstraint
        });
    };
}
