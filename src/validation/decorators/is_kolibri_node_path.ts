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
    matches,
    length
} from 'class-validator';
import { constants } from '../../common/constant';

@ValidatorConstraint({ name: 'isKolibriNodePath', async: true })
export class IsKolibriNodePathConstraint implements ValidatorConstraintInterface {
    validate(path: any, _args: ValidationArguments) {
        return isString(path) &&
            length(path, 1, constants.DT_STRING_MAXLEN) &&
            matches(path, /^\/([a-z0-9][a-z0-9_.-]{0,31}\/?)*$/i);
    }

    defaultMessage(_args: ValidationArguments) {
        return `The path identifier must start with a dash(/) and end with a letter or digit ([a-zA-Z0-9])
        and it may contain up to 4096 characters from the character class [a-zA-Z0-9_.-]. It is case-sensitive.`;
    }
}

export function IsKolibriNodePath(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsKolibriNodePathConstraint
        });
    };
}
