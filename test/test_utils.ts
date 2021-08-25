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

import { createHash } from 'crypto';

export function hexToBuf(hex: any) {
    return Buffer.from(
        hex.match(/../g).map(function (x: any) {
            return parseInt(x, 16);
        })
    );
};

export function stringToHash(str: any) {
    let hash = createHash('sha1');
    hash.update(str);
    return hash.digest();
}

