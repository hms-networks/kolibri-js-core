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

import { constants } from '../common/constant';
import { KolibriVersion } from '../common/kolibri_version';
import { VersionService } from '../util/version_service';
import { MapperUtils } from './mapper_utils';

export class OpcodeCompatMapper {
    private kolibriVersion: KolibriVersion;

    constructor(kolibriVersion: KolibriVersion) {
        this.kolibriVersion = kolibriVersion;
    }

    map(kpo: any, direction: any) {
        if (VersionService.isVersionInRange(this.kolibriVersion, '1.0')) {
            return this.mapKolibriKpo(kpo, direction);
        }
        if (VersionService.isVersionInRange(this.kolibriVersion, '>=2.0')) {
            return this.mapKolibriV20Kpo(kpo, direction);
        }
    }

    private mapKolibriKpo(kpo: any, direction: any) {
        if (direction === constants.INCOMING_DIRECTION) {
            this.mapIncomingKolibriKpo(kpo);
        }
        if (direction === constants.OUTGOING_DIRECTION) {
            this.mapOutgoingKolibriKpo(kpo);
        }
        return kpo;
    }

    private mapKolibriV20Kpo(kpo: any, direction: any) {
        if (direction === constants.OUTGOING_DIRECTION) {
            this.mapOutgoingKolibriV20Kpo(kpo);
        }
        return kpo;
    }

    private mapIncomingKolibriKpo(kpo: any) {
        if (kpo.hasOwnProperty('nodes')) {
            if (Array.isArray(kpo.nodes)) {
                kpo.nodes
                    .forEach((node: any) => {
                        if (node.hasOwnProperty('timestamp')) {
                            node.timestamp = MapperUtils
                                .mapTimestampFromSecToMicro(node.timestamp);
                        }
                    });
            }
        }
        if (kpo.hasOwnProperty('timestamp')) {
            kpo.timestamp = MapperUtils
                .mapTimestampFromSecToMicro(kpo.timestamp);
        }
    }

    private mapOutgoingKolibriKpo(kpo: any) {
        if (kpo.hasOwnProperty('nodes')) {
            if (Array.isArray(kpo.nodes)) {
                kpo.nodes
                    .forEach((node: any) => {
                        if (node.hasOwnProperty('timestamp')) {
                            node.timestamp = MapperUtils
                                .mapTimestampFromMicroToSec(node.timestamp);
                        }
                    });
            }
        }
        if (kpo.hasOwnProperty('timestamp')) {
            kpo.timestamp = MapperUtils.mapTimestampFromMilliToSec(kpo.timestamp);
        }
    }

    private mapOutgoingKolibriV20Kpo(kpo: any) {
        if (kpo.hasOwnProperty('timestamp')) {
            kpo.timestamp = MapperUtils.mapTimestampFromMilliToMicro(kpo.timestamp);
        }
    }
}
