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


//--------------------------------------------------------------------------
// Function:
//  isValidPath
//
// Description:
//   Check if the specified path is a valid path according to the Kolibri
//   specification.
//
// Parameters:
//  path - (String) Path to check
//
// Result:
//  (Boolean) True or false
//--------------------------------------------------------------------------
export function isValidPath(path: any) {
    if (
        typeof path !== 'string' ||
        path.length === 0 ||
        path.length > 4096 ||
        path.charAt(0) !== '/'
    ) {
        return false;
    }

    if (path === '/') {
        return true;
    }

    let parts = path.split('/').slice(1);
    for (let i = 0, len = parts.length; i < len; i++) {
        if (!parts[i].match(/^[a-z0-9][a-z0-9_.-]{0,31}$/i)) {
            return false;
        }
    }

    return true;
}

//--------------------------------------------------------------------------
// Function:
//  join
//
// Description:
//  Join the second specified path with the first one and return the
//  resulting path.
//
// Parameters:
//  path1 - (String) Path
//  path2 - (String) Path to join
//
// Result:
//  (String) Joined path
//--------------------------------------------------------------------------
export function join(path1: any, path2: any) {
    if (path1 === '/') {
        return path2;
    }
    else if (path2 === '/') {
        return path1;
    }
    else {
        if (path2.charAt(0) === '/') {
            return [path1, path2.slice(1)].join('/');
        }
        else {
            return [path1, path2].join('/');
        }
    }
}

//--------------------------------------------------------------------------
// Function:
//  relative
//
// Description:
//  Return the relative part of the specified path to the specified root
//  path.
//
// Parameters:
//  path - (String) Path
//  rootPath - (String) Root path
//
// Result:
//  (String) Relative path
//--------------------------------------------------------------------------
export function relative(path: any, rootPath: any) {
    if (rootPath === '/') {
        return path;
    }
    return path.indexOf(rootPath) === 0 ? path.slice(rootPath.length) : path;
}

//--------------------------------------------------------------------------
// Function:
//  parent
//
// Description:
//  Return the parent path of the specified path. Return null if the path
//  has no parent.
//
// Parameters:
//  path - (String) Path
//
// Result:
//  (String) Parent path, or null
//--------------------------------------------------------------------------
export function parent(path: any) {
    let pos = path.lastIndexOf('/');
    if (pos < 2) {
        return null;
    }
    else {
        return path.slice(0, pos);
    }
}

//--------------------------------------------------------------------------
// Function:
//  parents
//
// Description:
//  Return an array with all parent paths of the specified path, without
//  the specified path itself. The root path ('/') is not included.
//
// Parameters:
//  path - (String) Path
//
// Result:
//  (Array) Parent paths, sorted from shortest to longest
//--------------------------------------------------------------------------
export function parents(path: any) {
    let parts = path.split('/').slice(1);
    let result = [];
    let p = '';

    while (parts.length) {
        p += '/' + parts.shift();
        result.push(p);
    }

    return result.slice(0, -1);
}

//--------------------------------------------------------------------------
// Function:
//  scope
//
// Description:
//  Return the scope of the specified path. In the Kolibri specification the
//  scope is the first component of a path (with a slash prepended).
//
// Parameters:
//  path - (String) Path
//
// Result:
//  (String) Scope path
//--------------------------------------------------------------------------
export function scope(path: any) {
    let pos = path.indexOf('/', 1);
    if (pos < 1) {
        return path;
    }
    else {
        return path.slice(0, pos);
    }
}

