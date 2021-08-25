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


import { coerce, SemVer } from 'semver';

export class KolibriVersion {
    private _subProtocol: string;
    private _semVer: SemVer;
    constructor(subProtocol: string) {
        this._subProtocol = subProtocol;
        this._semVer = this.convertKolibriVersionToSemver(subProtocol);
    }

    get subProtocol(): string {
        return this._subProtocol;
    }

    get semVer(): SemVer {
        return this._semVer;
    }

    private convertKolibriVersionToSemver(version: string): SemVer {
        if (version === 'kolibri') {
            version = 'v1.0.kolibri';
        }

        const semver: SemVer | null = coerce(version);
        if (!semver) {
            throw Error('Invalid Version string:' + version);
        }

        return semver;
    }
}
