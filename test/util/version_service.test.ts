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

import { KolibriVersion } from '../../src/common/kolibri_version';
import { VersionService } from '../../src/util/version_service';

describe('VersionService : ', () => {
    describe('isValidRange:', () => {
        it('should be valid version', () => {
            expect(VersionService.isValidRange('1.2.3')).toBeTruthy();
        });

        it('should be invalid version', () => {
            expect(VersionService.isValidRange('1.2.a')).toBeFalsy();
        });
    });

    describe('isVersionInRange:', () => {
        it('should be in version range', () => {
            const version = new KolibriVersion('2.0.0');
            expect(VersionService.isVersionInRange(version, '<3.0.0')).toBeTruthy();
        });

        it('should be not in version range', () => {
            const version = new KolibriVersion('2.0.0');
            expect(VersionService.isVersionInRange(version, '<1.9.0')).toBeFalsy();
        });
    });

    describe('getMaxKolibriVersion:', () => {
        it('should get max version out of one', () => {
            const versions = [
                new KolibriVersion('2.0.0')
            ];
            const expectedMaxVersion = new KolibriVersion('2.0.0');

            const maxVersion = VersionService.getMaxKolibriVersion(versions);

            expect(maxVersion).toEqual(expectedMaxVersion);
        });

        it('should get max version out of three', () => {
            const versions = [
                new KolibriVersion('2.0.0'),
                new KolibriVersion('1.0.0'),
                new KolibriVersion('3.0.0')
            ];
            const expectedMaxVersion = new KolibriVersion('3.0.0');

            const maxVersion = VersionService.getMaxKolibriVersion(versions);

            expect(maxVersion).toEqual(expectedMaxVersion);
        });

        it('should get default version if none provided', () => {
            const versions: KolibriVersion[] = [];
            const expectedMaxVersion = new KolibriVersion('kolibri');

            const maxVersion = VersionService.getMaxKolibriVersion(versions);

            expect(maxVersion).toEqual(expectedMaxVersion);
        });
    });
});
