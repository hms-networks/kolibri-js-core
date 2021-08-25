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

export const IS_KOLIBRI_CLIENT = 'isKolibriClient';

export function isKolibriClient(client: any) {
    return isString(client) && maxLength(client, constants.CLIENT_ID_MAXLEN) &&
        (matches(client, /^(([a-z0-9])|([a-z0-9][a-z0-9_.-]{0,30}[a-z0-9]))$/i) ||
            matches(client, /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i));
}
@ValidatorConstraint({ name: IS_KOLIBRI_CLIENT, async: true })
export class IsKolibriClientConstraint implements ValidatorConstraintInterface {
    validate(client: any, _args: ValidationArguments) {
        return isKolibriClient(client);
    }

    defaultMessage(_args: ValidationArguments) {
        return `Client ($value) must be an UUID or must start and end with a letter or
        digit ([a-zA-Z0-9]) and it may contain up to 36 characters from the character class [a-zA-Z0-9-].
        It is case-insensitive.`;
    }
}

export function IsKolibriClient(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsKolibriClientConstraint
        });
    };
}
