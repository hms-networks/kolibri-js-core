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


import { sprintf } from '../../src/common/sprintf';

describe('sprintf:', () => {
    it('should return formated strings for simple placeholders', function () {
        expect(sprintf('%%')).toEqual('%');
        expect(sprintf('%b', 2)).toEqual('10');
        expect(sprintf('%d', 2)).toEqual('2');
        expect(sprintf('%d', '2')).toEqual('2');
        expect(sprintf('%e', 2)).toEqual('2e+0');
        expect(sprintf('%u', 2)).toEqual('2');
        expect(sprintf('%u', -2)).toEqual('4294967294');
        expect(sprintf('%f', 2.2)).toEqual('2.2');
        expect(sprintf('%o', 8)).toEqual('10');
        expect(sprintf('%s', '%s')).toEqual('%s');
        expect(sprintf('%x', 255)).toEqual('ff');
        expect(sprintf('%X', 255)).toEqual('FF');
        expect(sprintf('%2$s %3$s a %1$s', 'cracker', 'Polly', 'wants')).toEqual('Polly wants a cracker');
        expect(sprintf('Hello %(who)s!', { who: 'world' })).toEqual('Hello world!');
    });

    it('should return formated strings for complex placeholders', () => {
        // sign
        expect(sprintf('%d', 2)).toEqual('2');
        expect(sprintf('%d', -2)).toEqual('-2');
        expect(sprintf('%+d', 2)).toEqual('+2');
        expect(sprintf('%+d', -2)).toEqual('-2');
        expect(sprintf('%f', 2.2)).toEqual('2.2');
        expect(sprintf('%f', -2.2)).toEqual('-2.2');
        expect(sprintf('%+f', 2.2)).toEqual('+2.2');
        expect(sprintf('%+f', -2.2)).toEqual('-2.2');
        expect(sprintf('%+.1f', -2.34)).toEqual('-2.3');
        expect(sprintf('%+.1f', -0.01)).toEqual('-0.0');
        expect(sprintf('%+010d', -123)).toEqual('-000000123');
        expect(sprintf("%+'_10d", -123)).toEqual('______-123');
        // padding
        expect(sprintf('%05d', -2)).toEqual('-0002');
        expect(sprintf('%5s', '<')).toEqual('    <');
        expect(sprintf('%05s', '<')).toEqual('0000<');
        expect(sprintf("%'_5s", '<')).toEqual('____<');
        expect(sprintf('%-5s', '>')).toEqual('>    ');
        expect(sprintf('%0-5s', '>')).toEqual('>0000');
        expect(sprintf("%'_-5s", '>')).toEqual('>____');
        expect(sprintf('%5s', 'xxxxxx')).toEqual('xxxxxx');
        // precision
        expect(sprintf('%.1f', 2.345)).toEqual('2.3');
        expect(sprintf('%5.1f mBar', 15)).toEqual(' 15.0 mBar');
        expect(sprintf('%5.5s', 'xxxxxx')).toEqual('xxxxx');
        expect(sprintf('%5.1s', 'xxxxxx')).toEqual('    x');
    });

    it('should return formatted strings for callbacks', () => {
        let now = Date.now();
        expect(sprintf('%s', () => {
            return 'foobar';
        })).toEqual('foobar');

        expect(sprintf('%s', () => {
            return now;
        })).toEqual(now.toString());
    });

    it('should return formatted strings for %t function', () => {
        expect(sprintf('%t', 1302646983367)).toEqual('2011-04-12 22:23:03');
        expect(sprintf('%[Y C m d H I M S p a h :-.,/]t', 1302646983367))
            .toEqual('2011 11 04 12 22 10 23 03 PM Tue Apr :-.,/');
        expect(sprintf('Expected date: %[m/d/C]t', 1302646983367)).toEqual('Expected date: 04/12/11');
    });
});
