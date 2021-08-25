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
    isObject
} from 'class-validator';
import { KolibriRpcServer } from '../../consumer';
import { isKolibriClient } from './is_kolibri_client';
import { isKolibriUser } from './is_kolibri_user';

export function isKolibriRpcServer(value: unknown) {
    return isKolibriUser(value) || (isObject(value) &&
        isKolibriUser((value as KolibriRpcServer).user) &&
        isKolibriClient((value as KolibriRpcServer).client));
}

@ValidatorConstraint({ name: 'isKolibriRpcServer', async: true })
export class IsKolibriServerRpcConstraint implements ValidatorConstraintInterface {
    validate(server: any, _args: ValidationArguments) {
        return isKolibriRpcServer(server);
    }

    defaultMessage(_args: ValidationArguments) {
        return `_server field must be an object with user and client fields.`;
    }
}

export function IsKolibriRpcServer(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsKolibriServerRpcConstraint
        });
    };
}
