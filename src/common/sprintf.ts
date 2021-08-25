/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable max-len */
/*==============================================================================

  COPYRIGHT NOTIFICATION (c) 2014-2019 Beck IPC GmbH
  COPYRIGHT NOTIFICATION (c) 2019 HMS Industrial Networks AB

==============================================================================

  Module:
  sprintf

 Function:
  JavaScript sprintf implementation for the Kolibri platform.
  Modified version of sprintf-js by Alexandru Marasteanu
  (https:github.com/alexei/sprintf.js.git).

 License:
  Copyright (c) 2007-2013, Alexandru Marasteanu <hello [at) alexei (dot] ro>
  All rights reserved.

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:
  * Redistributions of source code must retain the above copyright
    notice, this list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright
    notice, this list of conditions and the following disclaimer in the
    documentation and/or other materials provided with the distribution.
  * Neither the name of this software nor the names of its contributors may be
    used to endorse or promote products derived from this software without
    specific prior written permission.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
  ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
  DISCLAIMED. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR
  ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
  SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

==============================================================================
*/

let re = {
    not_string: /[^s]/,
    number: /[def]/,
    text: /^[^\x25]+/,
    modulo: /^\x25{2}/,
    placeholder: /^\x25(?:([1-9]\d*)\$|\(([^)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?(?:\[([^)]+)\])?([b-fostuxX])/,
    key: /^([a-z_][a-z_\d]*)/i,
    key_access: /^\.([a-z_][a-z_\d]*)/i,
    index_access: /^\[(\d+)\]/,
    sign: /^[+-]/
};

export function sprintf(...args: any[]) {
    let key: any = args[0];
    let cache: any = sprintf.cache;
    if (!(cache[key] && cache.hasOwnProperty(key))) {
        cache[key] = sprintf.parse(key);
    }
    return sprintf.format.call(null, cache[key], args);
}

sprintf.format = function (parseTree: any, argv: any) {
    let cursor = 1;
    let treeLen = parseTree.length;
    let nodeType = '';
    let arg;
    let output = [];
    let i, k, match, pad, padChar, padLen;
    let isPositive = true;
    let sign = '';

    for (i = 0; i < treeLen; i++) {
        nodeType = getType(parseTree[i]);
        if (nodeType === 'string') {
            output[output.length] = parseTree[i];
        }
        else if (nodeType === 'array') {
            match = parseTree[i]; // convenience purposes only
            if (match[2]) {
                // keyword argument
                arg = argv[cursor];
                for (k = 0; k < match[2].length; k++) {
                    if (!arg.hasOwnProperty(match[2][k])) {
                        throw new Error(
                            sprintf('[sprintf] property "%s" does not exist', match[2][k])
                        );
                    }
                    arg = arg[match[2][k]];
                }
            }
            else if (match[1]) {
                // positional argument (explicit)
                arg = argv[match[1]];
            }
            else {
                // positional argument (implicit)
                arg = argv[cursor++];
            }

            if (getType(arg) === 'function') {
                arg = arg();
            }

            if (re.not_string.test(match[9]) && (getType(arg) !== 'number' && isNaN(arg))) {
                throw new TypeError(
                    sprintf('[sprintf] expecting number but found %s', getType(arg))
                );
            }

            if (re.number.test(match[9])) {
                isPositive = arg >= 0;
            }

            switch (match[9]) {
                case 'b':
                    arg = arg.toString(2);
                    break;
                case 'd':
                    arg = parseInt(arg, 10);
                    break;
                case 'e':
                    arg = match[7] ? arg.toExponential(match[7]) : arg.toExponential();
                    break;
                case 'f':
                    arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg);
                    break;
                case 'o':
                    arg = arg.toString(8);
                    break;
                case 's':
                    arg = (arg = String(arg)) && match[7] ? arg.substring(0, match[7]) : arg;
                    break;
                case 'u':
                    arg = arg >>> 0;
                    break;
                case 'x':
                    arg = arg.toString(16);
                    break;
                case 'X':
                    arg = arg.toString(16).toUpperCase();
                    break;
                case 't':
                    if (match[8]) {
                        arg = formatTimestamp(parseInt(arg, 10), match[8]);
                    }
                    else {
                        arg = formatTimestamp(parseInt(arg, 10), null);
                        arg =
                            (arg = String(arg)) && match[7] ? arg.substring(0, match[7]) : arg;
                    }
                    break;
            }
            if (!isPositive || (re.number.test(match[9]) && match[3])) {
                sign = isPositive ? '+' : '-';
                arg = arg.toString().replace(re.sign, '');
            }
            padChar = match[4] ? (match[4] === '0' ? '0' : match[4].charAt(1)) : ' ';
            padLen = match[6] - (sign + arg).length;
            pad = match[6] ? stringRepeat(padChar, padLen) : '';
            output[output.length] = match[5]
                ? sign + arg + pad
                : padChar === '0' ? sign + pad + arg : pad + sign + arg;
        }
    }
    return output.join('');
};

sprintf.cache = {};

sprintf.parse = function (fmt: any) {
    let _fmt = fmt;
    let match: any = [];
    let parseTree = [];
    let argNames = 0;
    while (_fmt) {
        if ((match = re.text.exec(_fmt)) !== null) {
            parseTree[parseTree.length] = match[0];
        }
        else if ((match = re.modulo.exec(_fmt)) !== null) {
            parseTree[parseTree.length] = '%';
        }
        else if ((match = re.placeholder.exec(_fmt)) !== null) {
            if (match[2]) {
                argNames |= 1;
                let fieldList = [];
                let replacementField = match[2];
                let fieldMatch: any = [];

                if ((fieldMatch = re.key.exec(replacementField)) !== null) {
                    fieldList[fieldList.length] = fieldMatch[1];
                    while (
                        (replacementField = replacementField.substring(
                            fieldMatch[0].length
                        )) !== ''
                    ) {
                        if ((fieldMatch = re.key_access.exec(replacementField)) !== null) {
                            fieldList[fieldList.length] = fieldMatch[1];
                        }
                        else if (
                            (fieldMatch = re.index_access.exec(replacementField)) !== null
                        ) {
                            fieldList[fieldList.length] = fieldMatch[1];
                        }
                        else {
                            throw new SyntaxError(
                                '[sprintf] failed to parse named argument key'
                            );
                        }
                    }
                }
                else {
                    throw new SyntaxError('[sprintf] failed to parse named argument key');
                }
                match[2] = fieldList;
            }
            else {
                argNames |= 2;
            }
            if (argNames === 3) {
                throw new Error(
                    '[sprintf] mixing positional and named placeholders is not (yet) supported'
                );
            }
            parseTree[parseTree.length] = match;
        }
        else {
            throw new SyntaxError('[sprintf] unexpected placeholder');
        }
        _fmt = _fmt.substring(match[0].length);
    }
    return parseTree;
};

export function vsprintf(fmt: any, argv: any, _argv: any) {
    _argv = (argv || []).slice(0);
    _argv.splice(0, 0, fmt);
    return sprintf.apply(null, _argv);
};

/**
 * helpers
 */
function getType(variable: any) {
    return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase();
}

function stringRepeat(input: any, multiplier: any) {
    return new Array(multiplier + 1).join(input);
}

function pad(n: any) {
    return n < 10 ? '0' + n : n;
}

function formatTimestamp(timestamp: any, flags: any) {
    let date = new Date(timestamp);

    if (!flags) {
        flags = 'Y-m-d H:M:S';
    }

    let result = '';
    for (let i = 0; i < flags.length; i++) {
        switch (flags.charAt(i)) {
            case 'Y':
                result = result + date.getUTCFullYear();
                break;

            case 'C':
                result = result + pad(date.getUTCFullYear() % 100);
                break;

            case 'H':
                result = result + pad(date.getUTCHours());
                break;

            case 'I':
                let hh = date.getUTCHours();
                hh = hh > 12 ? hh - 12 : hh;
                hh = hh === 0 ? 12 : hh;
                result = result + pad(hh);
                break;

            case 'M':
                result = result + pad(date.getUTCMinutes());
                break;

            case 'S':
                result = result + pad(date.getUTCSeconds());
                break;

            case 'p':
                result = result + (date.getUTCHours() < 12 ? 'AM' : 'PM');
                break;

            case 'm':
                result = result + pad(date.getUTCMonth() + 1);
                break;

            case 'd':
                result = result + pad(date.getUTCDate());
                break;

            case 'a':
                let weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                result = result + weekday[date.getUTCDay()];
                break;

            case 'h':
                let months = [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec'
                ];
                result = result + months[date.getUTCMonth()];
                break;

            case ':':
            case '.':
            case ',':
            case '-':
            case '/':
            case ' ':
                result = result + flags.charAt(i);
                break;

            default:
                throw new SyntaxError('Error parsing time format at ' + flags.charAt(i));
        }
    }
    return result;
}
