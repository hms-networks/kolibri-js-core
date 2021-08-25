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
    isString
} from 'class-validator';
import Url from 'url-parse';
import { constants } from '../../common/constant';


@ValidatorConstraint({ name: 'isKolibriUpdateUrl', async: true })
export class IsKolibriUpdateUrlConstraint implements ValidatorConstraintInterface {
    validate(updateUrl: any, _args: ValidationArguments) {
        if (isString(updateUrl) &&
            !(updateUrl.length > constants.DT_STRING_MAXLEN) &&
            updateUrl !== '') {
            const url = new Url(updateUrl);
            if (url.protocol === 'https:' ||
                url.protocol === 'http:' ||
                url.host === null
            ) {
                return true;
            }
        }
        return false;
    }

    defaultMessage(_args: ValidationArguments) {
        return `UpdateUrl invalid`;
    }
}

export function IsKolibriUpdateUrl(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsKolibriUpdateUrlConstraint
        });
    };
}
