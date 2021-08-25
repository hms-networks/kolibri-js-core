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


export class MapperUtils {
    static mapTimestampFromMicroToSec(timestamp: number): number {
        this.validateNumber(timestamp);
        return Math.floor(timestamp / 1e6);
    }

    static mapTimestampFromMicroToMilli(timestamp: number): number {
        this.validateNumber(timestamp);
        return Math.floor(timestamp / 1e3);
    }

    static mapTimestampFromSecToMicro(timestamp: number): number {
        this.validateNumber(timestamp);
        return timestamp * 1e6;
    }

    static mapTimestampFromMilliToMicro(timestamp: number): number {
        this.validateNumber(timestamp);
        return timestamp * 1e3;
    }

    static mapTimestampFromMilliToSec(timestamp: number): number {
        this.validateNumber(timestamp);
        return Math.floor(timestamp / 1e3);
    }

    static mapTimestampFromSecToMilli(timestamp: number): number {
        this.validateNumber(timestamp);
        return timestamp * 1e3;
    }

    private static validateNumber(value: number) {
        if (typeof value !== 'number') {
            throw TypeError('timestamp is not a number: ' + value);
        }
    }
}
