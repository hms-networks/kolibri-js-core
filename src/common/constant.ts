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


export namespace constants {
    export const PROTOCOL_VERSION_1_0 = 0;
    export const JSON_RPC_VERSION = '2.0';
    export const JSON_RPC_PREFIX = 'kolibri.';
    export const UUID_NAMESPACE = 'd81e8927-e53c-49ec-98e7-5da39c5e3861';
    export const MANAGEMENT_PROJECT_PID = 1;

    // Opcodes
    export const OPCODE_ACK = 0x00;
    export const OPCODE_NAK = 0x01;
    export const OPCODE_LOGIN = 0x02;
    export const OPCODE_GETHASH = 0x03;
    export const OPCODE_GETHASH_RESPONSE = 0x04;
    export const OPCODE_GETTIME = 0x05;
    export const OPCODE_GETTIME_RESPONSE = 0x06;
    export const OPCODE_ENABLEPUBLISH = 0x07;
    export const OPCODE_PUBLISH = 0x08;
    export const OPCODE_UNPUBLISH = 0x09;
    export const OPCODE_WRITE = 0x0a;
    export const OPCODE_COMMIT = 0x0b;
    export const OPCODE_GETNODEPROPERTIES = 0x0c;
    export const OPCODE_GETNODEPROPERTIES_RESPONSE = 0x0d;
    export const OPCODE_CREATEMODIFYNODE = 0x0e;
    export const OPCODE_DELETENODE = 0x0f;
    export const OPCODE_EMERGENCY = 0x10;
    export const OPCODE_COMMITTEDWRITE = 0x11;
    export const OPCODE_CANCEL = 0x12;
    export const OPCODE_THROTTLE = 0x13;

    // Bitmap options
    export const LOGIN_NONE = 0x00;
    export const LOGIN_PUBLISH_POINTS_ACTIVE_ALL = 0x01;
    export const LOGIN_PUBLISH_POINTS_ACTIVE_CHANGED = 0x02;
    export const LOGIN_JSONRPC_SERVER = 0x04;
    export const LOGIN_PENDING_TRANSACTIONS = 0x08;
    export const LOGIN_RESERVED = 0xf0;

    export const GETHASH_NONE = 0x00000000;
    export const GETHASH_POINTS_ACTIVE = 0x00000001;
    export const GETHASH_POINTS_INACTIVE = 0x00000002;
    export const GETHASH_GROUPS = 0x00000004;
    export const GETHASH_NODE_INDEX = 0x00000008;
    export const GETHASH_VALUE = 0x00000010;
    export const GETHASH_TIMESTAMP = 0x00000020;
    export const GETHASH_QUALITY = 0x00000040;
    export const GETHASH_DESCRIPTION = 0x00000080;
    export const GETHASH_FLAGS = 0x00000100;
    export const GETHASH_DATATYPE = 0x00000200;
    export const GETHASH_TRIGGERMODE = 0x00000400;
    export const GETHASH_TRIGGERDOMAIN = 0x00000800;
    export const GETHASH_QOSLEVEL = 0x00001000;
    export const GETHASH_SCALING = 0x00002000;
    export const GETHASH_FORMAT = 0x00004000;
    export const GETHASH_WRITERANGE = 0x00008000;
    export const GETHASH_UPDATEURL = 0x00010000;
    export const GETHASH_HISTORY = 0x00020000;
    export const GETHASH_RESERVED = 0xfffc0000;

    export const ENABLEPUBLISH_NONE = 0x00;
    export const ENABLEPUBLISH_POINTS_ACTIVE_ALL = 0x01;
    export const ENABLEPUBLISH_POINTS_ACTIVE_CHANGED = 0x02;
    export const ENABLEPUBLISH_POINTS_INACTIVE_ALL = 0x04;
    export const ENABLEPUBLISH_POINTS_INACTIVE_CHANGED = 0x08;
    export const ENABLEPUBLISH_GROUPS_ALL = 0x10;
    export const ENABLEPUBLISH_GROUPS_CHANGED = 0x20;
    export const ENABLEPUBLISH_INCLUDE_ALL_PROPERTIES = 0x40;
    export const ENABLEPUBLISH_RESERVED = 0x80;

    export const PUBLISH_POINT = 0x00;
    export const PUBLISH_GROUP = 0x01;
    export const PUBLISH_FINISHED = 0x02;
    export const PUBLISH_DETAILED = 0x04;
    export const PUBLISH_RESERVED = 0xfc;

    export const CREATEMODIFYNODE_MODIFY = 0x0001;
    export const CREATEMODIFYNODE_INDEX = 0x0002;
    export const CREATEMODIFYNODE_DESCRIPTION = 0x0004;
    export const CREATEMODIFYNODE_FLAGS = 0x0008;
    export const CREATEMODIFYNODE_DATATYPE = 0x0010;
    export const CREATEMODIFYNODE_TRIGGERMODE = 0x0020;
    export const CREATEMODIFYNODE_TRIGGERDOMAIN = 0x0040;
    export const CREATEMODIFYNODE_QOSLEVEL = 0x0080;
    export const CREATEMODIFYNODE_UPDATEURL = 0x0100;
    export const CREATEMODIFYNODE_HISTORY = 0x0200;
    export const CREATEMODIFYNODE_FORMAT = 0x0400;
    export const CREATEMODIFYNODE_SCALING = 0x0800;
    export const CREATEMODIFYNODE_WRITERANGE = 0x1000;
    export const CREATEMODIFYNODE_RESERVED = 0xe000;

    export const NODE_NONE = 0x00;
    export const NODE_ACTIVE = 0x01;
    export const NODE_WRITEABLE = 0x02;
    export const NODE_DOMAINTRIGGER = 0x04;
    export const NODE_HIGHPRIORITY = 0x08;
    export const NODE_RETENTIVE = 0x10;
    export const NODE_RESERVED = 0xe0;

    // Node types
    export const POINT = 0;
    export const GROUP = 1;
    export const PATH = 255;

    // Data types
    export const DT_BOOLEAN = 0;
    export const DT_UNSIGNED_8BIT = 1;
    export const DT_SIGNED_8BIT = 2;
    export const DT_UNSIGNED_16BIT = 3;
    export const DT_SIGNED_16BIT = 4;
    export const DT_UNSIGNED_32BIT = 5;
    export const DT_SIGNED_32BIT = 6;
    export const DT_UNSIGNED_64BIT = 7;
    export const DT_SIGNED_64BIT = 8;
    export const DT_FLOATING_32BIT = 9;
    export const DT_FLOATING_64BIT = 10;
    export const DT_STRING = 12;
    export const DT_BYTEARRAY = 13;

    export const DT_MIN = 0;
    export const DT_MAX = 13;
    export const DT_RESERVED = 11;

    export const DT_UINT_32BIT_MAX = 4294967295;
    export const DT_UINT_16BIT_MAX = 65535;
    export const DT_FLOATING_32BIT_MIN = 1.176e-38;
    export const DT_FLOATING_32BIT_MAX = 3.4028e38;
    export const DT_FLOAT64_MAX_INT = '9007199254740991';
    export const DT_STRING_MAXLEN = 4096;
    export const DT_BYTEARRAY_MAXLEN = 4096;

    export const DT_NUMERIC_MIN = 1;
    export const DT_NUMERIC_MAX = 10;

    // Trigger modes
    export const TRIGGER_ANY_CHANGE = 0;
    export const TRIGGER_EXPLICIT_REQUEST = 1;
    export const TRIGGER_N = 2;
    export const TRIGGER_T = 3;
    export const TRIGGER_N_T = 4;
    export const TRIGGER_DOMAIN = 5;
    export const TRIGGER_T_CHANGED = 6;
    export const TRIGGER_R = 7;
    export const TRIGGER_R_T = 8;
    export const TRIGGER_T_S = 9;

    export const TRIGGER_MIN = 0;
    export const TRIGGER_MAX = 9;

    // Quality of service levels
    export const QOS_AT_MOST_ONCE = 0;
    export const QOS_AT_LEAST_ONCE = 1;
    export const QOS_AT_LEAST_ONCE_QUEUE = 2;
    export const QOS_EXACTLY_ONCE = 3;
    export const QOS_EXACTLY_ONCE_QUEUE = 4;

    export const QOS_MIN = 0;
    export const QOS_MAX = 4;

    // Point state qualities
    export const QUALITY_UNKNOWN = 0;
    export const QUALITY_VALID = 1;
    export const QUALITY_SIMULATED = 2;
    export const QUALITY_FORCED = 3;
    export const QUALITY_INVALID = 4;

    export const QUALITY_MIN = 0;
    export const QUALITY_MAX = 4;
    export const QUALITY_USER_MIN = 100;

    // Invalid values
    export const INVALID_NODE_INDEX = 0xffff;
    export const INVALID_SEQUENCE_NUMBER = 0;

    // Emergency states
    export const EMERGENCY_OUT_OF_MEMORY = 0;
    export const EMERGENCY_SEND_QUEUE = 1;
    export const EMERGENCY_RECEIVE_QUEUE = 2;

    // Miscellaneous constants
    export const GETHISTORY_LIMIT = 1000;
    export const PASSWORD_MAXLEN = 40;
    export const PROJECT_NAME_MAXLEN = 32;
    export const USER_NAME_MAXLEN = 32;
    export const CLIENT_ID_MAXLEN = 36;

    // message directions
    export const INCOMING_DIRECTION = 'incoming';
    export const OUTGOING_DIRECTION = 'outgoing';
}
