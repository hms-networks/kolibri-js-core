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

import { gt, satisfies } from 'semver';
import validRange from 'semver/ranges/valid';
import { KolibriVersion } from '../common/kolibri_version';

export class VersionService {
    static isValidRange(versionRange: any) {
        const isValidRange = validRange(versionRange);

        if (!isValidRange) {
            return false;
        }

        return true;
    }

    static isVersionInRange(version: KolibriVersion, range: string) {
        return satisfies(version.semVer, range);
    }

    static getMaxKolibriVersion(version: KolibriVersion[]): KolibriVersion {
        return version.reduce((max: KolibriVersion, current: KolibriVersion) => {
            if (gt(current.semVer, max.semVer)) {
                max = current;
            }
            return max;
        }, new KolibriVersion('kolibri'));
    }
}
