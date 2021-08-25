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


import { constants } from '../../../common/constant';
import {KolibriError, errorcode as ec} from '../../../common/errorcode';
import { OpcodeBuffer } from '../../buffer_utils/opcode_buffer';
import { Opcode } from '../opcode';

export class PublishOpcode extends Opcode {
    constructor() {
        super('publish', 0x08);
    }

    decode(data: any) {
        let kpo: any;
        try {
            let ocBuf = new OpcodeBuffer(data);
            ocBuf.setIndex(1);
            kpo = this._decodeHeader(ocBuf);
            kpo.nodes = [];
            while (!ocBuf.isEob()) {
                let m: any = {};
                if (kpo.cmdflags & constants.PUBLISH_GROUP && !(kpo.cmdflags & constants.PUBLISH_DETAILED)) {
                    this._decodeSimpleGroupNode(ocBuf, m);
                }
                else if ((kpo.cmdflags & constants.PUBLISH_GROUP) && (kpo.cmdflags & constants.PUBLISH_DETAILED)) {
                    this._decodeDetailedGroupNode(ocBuf, m);
                }
                // Points
                else if (!(kpo.cmdflags & constants.PUBLISH_GROUP) && !(kpo.cmdflags & constants.PUBLISH_DETAILED)) {
                    this._decodeSimplePointNode(ocBuf, m);
                }
                else if (!(kpo.cmdflags & constants.PUBLISH_GROUP) && (kpo.cmdflags & constants.PUBLISH_DETAILED)) {
                    this._decodeDetailedPointNode(ocBuf, m);
                }
                kpo.nodes.push(m);
            }
        }
        catch (e) {
            if (e instanceof KolibriError) {
                throw e;
            }
            else {
                throw new KolibriError(ec.PROTOCOL_ERROR, kpo);
            }
        }
        return kpo;
    }

    encode(kpo: any) {
        if (kpo.sid === 0) {
            throw new KolibriError(ec.INVALID_SEQUENCE_NUMBER);
        }

        let ocBuf = new OpcodeBuffer(this.encodeLength(kpo));

        if (kpo.cmdflags & constants.PUBLISH_GROUP && !(kpo.cmdflags & constants.PUBLISH_DETAILED)) {
            this._encodeSimpleGroupNode(kpo, ocBuf);
        }
        else if ((kpo.cmdflags & constants.PUBLISH_GROUP) && (kpo.cmdflags & constants.PUBLISH_DETAILED)) {
            this._encodeDetailedGroupNode(kpo, ocBuf);
        }
        else if (!(kpo.cmdflags & constants.PUBLISH_GROUP) && !(kpo.cmdflags & constants.PUBLISH_DETAILED)) {
            this._encodeSimplePointNode(kpo, ocBuf);
        }
        else if (!(kpo.cmdflags & constants.PUBLISH_GROUP) && (kpo.cmdflags & constants.PUBLISH_DETAILED)) {
            this._encodeDetailedPointNode(kpo, ocBuf);
        }

        return ocBuf.buf;
    }

    _encodeHeader(kpo: any, ocBuf: any) {
        ocBuf.writeUInt8(0x08);
        ocBuf.writeUInt16(kpo.sid);
        ocBuf.writeUInt8(kpo.cmdflags);
    }

    _decodeHeader(ocBuf: any) {
        let kpo: any = {
            opcode: constants.OPCODE_PUBLISH
        };
        kpo.sid = ocBuf.readUInt16();
        if (kpo.sid === 0) {
            throw new KolibriError(ec.INVALID_SEQUENCE_NUMBER, kpo);
        }
        kpo.cmdflags = ocBuf.readUInt8();
        return kpo;
    }

    _encodeSimpleGroupNode(kpo: any, ocBuf: any) {
        this._encodeHeader(kpo, ocBuf);
        for (let i = 0, len = kpo.nodes.length; i < len; i++) {
            let m = kpo.nodes[i];
            ocBuf.writeUInt16(m.nid);
            ocBuf.writeAsciiString(m.path);
        }
    }

    _decodeSimpleGroupNode(ocBuf: any, node: any) {
        node.nid = ocBuf.readUInt16();
        node.path = ocBuf.readAsciiString();
    }

    _encodeDetailedGroupNode(kpo: any, ocBuf: any) {
        this._encodeHeader(kpo, ocBuf);
        for (let i = 0, len = kpo.nodes.length; i < len; i++) {
            let m = kpo.nodes[i];
            ocBuf.writeUInt8(m.type);
            ocBuf.writeUInt16(m.nid);
            ocBuf.writeAsciiString(m.path);
            ocBuf.writeUtf8String(m.description);
            ocBuf.writeUInt8(m.flags);
            ocBuf.writeUInt8(m.triggerMode);
            if (
                m.triggerMode === constants.TRIGGER_T ||
                m.triggerMode === constants.TRIGGER_N_T ||
                m.triggerMode === constants.TRIGGER_T_CHANGED ||
                m.triggerMode === constants.TRIGGER_R_T ||
                m.triggerMode === constants.TRIGGER_T_S
            ) {
                ocBuf.writeUInt32(m.triggerT);
            }
            ocBuf.writeUInt8(m.triggerDomain);
            ocBuf.writeUInt8(m.qosLevel);
            ocBuf.writeUInt16(m.history);
        }
    }

    _decodeDetailedGroupNode(ocBuf: any, node: any) {
        node.type = ocBuf.readUInt8();
        node.nid = ocBuf.readUInt16();
        node.path = ocBuf.readAsciiString();
        node.description = ocBuf.readUtf8String();
        node.flags = ocBuf.readUInt8();
        node.triggerMode = ocBuf.readUInt8();
        if (
            node.triggerMode === constants.TRIGGER_T ||
            node.triggerMode === constants.TRIGGER_N_T ||
            node.triggerMode === constants.TRIGGER_T_CHANGED ||
            node.triggerMode === constants.TRIGGER_R_T ||
            node.triggerMode === constants.TRIGGER_T_S
        ) {
            node.triggerT = ocBuf.readUInt32();
        }
        node.triggerDomain = ocBuf.readUInt8();
        node.qosLevel = ocBuf.readUInt8();
        node.history = ocBuf.readUInt16();
    }

    _encodeSimplePointNode(kpo: any, ocBuf: any) {
        this._encodeHeader(kpo, ocBuf);
        for (let i = 0, len = kpo.nodes.length; i < len; i++) {
            let m = kpo.nodes[i];
            ocBuf.writeUInt16(m.nid);
            ocBuf.writeAsciiString(m.path);
            ocBuf.writeUInt8(m.flags);
            ocBuf.writeUInt8(m.dataType);
            ocBuf.writeUInt8(m.triggerMode);
            if (m.triggerMode === constants.TRIGGER_N || m.triggerMode === constants.TRIGGER_N_T) {
                this.writeTriggerN(ocBuf, m.triggerN, m.dataType);
            }
            else if (m.triggerMode === constants.TRIGGER_R || m.triggerMode === constants.TRIGGER_R_T) {
                ocBuf.writeFloat32(m.triggerN);
            }
            else if (m.triggerMode === constants.TRIGGER_T_S) {
                ocBuf.writeUInt32(m.triggerN);
            }
            if (
                m.triggerMode === constants.TRIGGER_T ||
                m.triggerMode === constants.TRIGGER_N_T ||
                m.triggerMode === constants.TRIGGER_T_CHANGED ||
                m.triggerMode === constants.TRIGGER_R_T ||
                m.triggerMode === constants.TRIGGER_T_S
            ) {
                ocBuf.writeUInt32(m.triggerT);
            }
            ocBuf.writeUInt8(m.triggerDomain);
            ocBuf.writeUInt8(m.qosLevel);
        }
    }

    _decodeSimplePointNode(ocBuf: any, m: any) {
        m.nid = ocBuf.readUInt16();
        m.path = ocBuf.readAsciiString();
        m.flags = ocBuf.readUInt8();
        m.dataType = ocBuf.readUInt8();
        m.triggerMode = ocBuf.readUInt8();
        if (m.triggerMode === constants.TRIGGER_N || m.triggerMode === constants.TRIGGER_N_T) {
            if (m.dataType < constants.DT_NUMERIC_MIN || m.dataType > constants.DT_NUMERIC_MAX) {
                throw new KolibriError(ec.INVALID_DATA_TYPE, m);
            }
            m.triggerN = this.readTriggerN(ocBuf, m.dataType, m);
        }
        else if (m.triggerMode === constants.TRIGGER_R || m.triggerMode === constants.TRIGGER_R_T) {
            if (m.dataType < constants.DT_NUMERIC_MIN || m.dataType > constants.DT_NUMERIC_MAX) {
                throw new KolibriError(ec.INVALID_DATA_TYPE, m);
            }
            m.triggerN = ocBuf.readFloat32();
        }
        else if (m.triggerMode === constants.TRIGGER_T_S) {
            m.triggerN = ocBuf.readUInt32();
        }
        if (
            m.triggerMode === constants.TRIGGER_T ||
            m.triggerMode === constants.TRIGGER_N_T ||
            m.triggerMode === constants.TRIGGER_T_CHANGED ||
            m.triggerMode === constants.TRIGGER_R_T ||
            m.triggerMode === constants.TRIGGER_T_S
        ) {
            m.triggerT = ocBuf.readUInt32();
        }
        m.triggerDomain = ocBuf.readUInt8();
        m.qosLevel = ocBuf.readUInt8();
    }

    _encodeDetailedPointNode(kpo: any, ocBuf: any) {
        this._encodeHeader(kpo, ocBuf);
        for (let i = 0, len = kpo.nodes.length; i < len; i++) {
            let m = kpo.nodes[i];
            ocBuf.writeUInt8(m.type);
            ocBuf.writeUInt16(m.nid);
            ocBuf.writeAsciiString(m.path);
            ocBuf.writeUtf8String(m.description);
            ocBuf.writeUInt8(m.flags);
            ocBuf.writeUInt8(m.dataType);
            ocBuf.writeUInt8(m.triggerMode);

            if (m.triggerMode === constants.TRIGGER_N || m.triggerMode === constants.TRIGGER_N_T) {
                this.writeTriggerN(ocBuf, m.triggerN, m.dataType);
            }
            else if (m.triggerMode === constants.TRIGGER_R || m.triggerMode === constants.TRIGGER_R_T) {
                ocBuf.writeFloat32(m.triggerN);
            }
            else if (m.triggerMode === constants.TRIGGER_T_S) {
                ocBuf.writeUInt32(m.triggerN);
            }
            if (
                m.triggerMode === constants.TRIGGER_T ||
                m.triggerMode === constants.TRIGGER_N_T ||
                m.triggerMode === constants.TRIGGER_T_CHANGED ||
                m.triggerMode === constants.TRIGGER_R_T ||
                m.triggerMode === constants.TRIGGER_T_S
            ) {
                ocBuf.writeUInt32(m.triggerT);
            }
            ocBuf.writeUInt8(m.triggerDomain);
            ocBuf.writeUInt8(m.qosLevel);
            ocBuf.writeUInt16(m.history);
            ocBuf.writeUtf8String(m.format);
            if (m.dataType >= constants.DT_NUMERIC_MIN && m.dataType <= constants.DT_NUMERIC_MAX) {
                ocBuf.writeFloat64(m.scalingFactor);
                ocBuf.writeFloat64(m.scalingOffset);
                ocBuf.writeFloat64(m.writeRangeMin);
                ocBuf.writeFloat64(m.writeRangeMax);
            }
        }
    }

    _decodeDetailedPointNode(ocBuf: any, node: any) {
        node.type = ocBuf.readUInt8();
        node.nid = ocBuf.readUInt16();
        node.path = ocBuf.readAsciiString();
        node.description = ocBuf.readUtf8String();
        node.flags = ocBuf.readUInt8();
        node.dataType = ocBuf.readUInt8();
        node.triggerMode = ocBuf.readUInt8();
        if (node.triggerMode === constants.TRIGGER_N || node.triggerMode === constants.TRIGGER_N_T) {
            if (node.dataType < constants.DT_NUMERIC_MIN || node.dataType > constants.DT_NUMERIC_MAX) {
                throw new KolibriError(ec.INVALID_DATA_TYPE, node);
            }
            node.triggerN = this.readTriggerN(ocBuf, node.dataType, node);
        }
        if (node.triggerMode === constants.TRIGGER_R || node.triggerMode === constants.TRIGGER_R_T) {
            if (node.dataType < constants.DT_NUMERIC_MIN || node.dataType > constants.DT_NUMERIC_MAX) {
                throw new KolibriError(ec.INVALID_DATA_TYPE, node);
            }
            node.triggerN = ocBuf.readFloat32();
        }
        if (node.triggerMode === constants.TRIGGER_T_S) {
            node.triggerN = ocBuf.readUInt32();
        }
        if (
            node.triggerMode === constants.TRIGGER_T ||
            node.triggerMode === constants.TRIGGER_N_T ||
            node.triggerMode === constants.TRIGGER_T_CHANGED ||
            node.triggerMode === constants.TRIGGER_R_T ||
            node.triggerMode === constants.TRIGGER_T_S
        ) {
            node.triggerT = ocBuf.readUInt32();
        }
        node.triggerDomain = ocBuf.readUInt8();
        node.qosLevel = ocBuf.readUInt8();
        node.history = ocBuf.readUInt16();
        node.format = ocBuf.readUtf8String();
        if (node.dataType >= constants.DT_NUMERIC_MIN && node.dataType <= constants.DT_NUMERIC_MAX) {
            node.scalingFactor = ocBuf.readFloat64();
            node.scalingOffset = ocBuf.readFloat64();
            node.writeRangeMin = ocBuf.readFloat64();
            node.writeRangeMax = ocBuf.readFloat64();
        }
    }

    encodeLength(kpo: any) {
        this.bufferLengthBuilder
            .add(constants.DT_UNSIGNED_8BIT) // opcode
            .add(constants.DT_UNSIGNED_16BIT) // sid
            .add(constants.DT_UNSIGNED_8BIT); // cmdflags
        for (let i = 0, len = kpo.nodes.length; i < len; i++) {
            let m = kpo.nodes[i];
            if ((kpo.cmdflags & constants.PUBLISH_GROUP) && !(kpo.cmdflags & constants.PUBLISH_DETAILED)) {
                this.bufferLengthBuilder
                    .add(constants.DT_UNSIGNED_16BIT) // nid
                    .add(constants.DT_STRING, m.path); // path
            }
            if ((kpo.cmdflags & constants.PUBLISH_GROUP) && (kpo.cmdflags & constants.PUBLISH_DETAILED)) {
                this.bufferLengthBuilder
                    .add(constants.DT_UNSIGNED_8BIT) // type
                    .add(constants.DT_UNSIGNED_16BIT) // nid
                    .add(constants.DT_STRING, m.path) // path
                    .add(constants.DT_STRING, m.description) // description
                    .add(constants.DT_UNSIGNED_8BIT) // flags
                    .add(constants.DT_UNSIGNED_8BIT); // triggerMode

                if (m.triggerMode === constants.TRIGGER_T ||
                    m.triggerMode === constants.TRIGGER_N_T ||
                    m.triggerMode === constants.TRIGGER_T_CHANGED ||
                    m.triggerMode === constants.TRIGGER_R_T ||
                    m.triggerMode === constants.TRIGGER_T_S) {
                    this.bufferLengthBuilder.add(constants.DT_UNSIGNED_32BIT); // triggerT
                }
                this.bufferLengthBuilder
                    .add(constants.DT_UNSIGNED_8BIT) // triggerDomain
                    .add(constants.DT_UNSIGNED_8BIT) // qosLevel
                    .add(constants.DT_UNSIGNED_16BIT); // history
            }
            if (!(kpo.cmdflags & constants.PUBLISH_GROUP) && !(kpo.cmdflags & constants.PUBLISH_DETAILED)) {
                this.bufferLengthBuilder
                    .add(constants.DT_UNSIGNED_16BIT) // nid
                    .add(constants.DT_STRING, m.path) // path
                    .add(constants.DT_UNSIGNED_8BIT) // flags
                    .add(constants.DT_UNSIGNED_8BIT) // dataType
                    .add(constants.DT_UNSIGNED_8BIT); // triggerMode

                if (m.triggerMode === constants.TRIGGER_N || m.triggerMode === constants.TRIGGER_N_T) {
                    if (m.dataType < constants.DT_NUMERIC_MIN || m.dataType > constants.DT_NUMERIC_MAX) {
                        throw new KolibriError(ec.INVALID_DATA_TYPE);
                    }
                    this.bufferLengthBuilder.add(m.dataType); // triggerN datatype
                }
                if (m.triggerMode === constants.TRIGGER_R || m.triggerMode === constants.TRIGGER_R_T) {
                    if (m.dataType < constants.DT_NUMERIC_MIN || m.dataType > constants.DT_NUMERIC_MAX) {
                        throw new KolibriError(ec.INVALID_DATA_TYPE);
                    }
                    this.bufferLengthBuilder.add(constants.DT_FLOATING_32BIT);
                }
                if (m.triggerMode === constants.TRIGGER_T_S) {
                    this.bufferLengthBuilder.add(constants.DT_UNSIGNED_32BIT);
                }
                if (
                    m.triggerMode === constants.TRIGGER_T ||
                    m.triggerMode === constants.TRIGGER_N_T ||
                    m.triggerMode === constants.TRIGGER_T_CHANGED ||
                    m.triggerMode === constants.TRIGGER_R_T ||
                    m.triggerMode === constants.TRIGGER_T_S
                ) {
                    this.bufferLengthBuilder.add(constants.DT_UNSIGNED_32BIT); // triggerT
                }
                this.bufferLengthBuilder
                    .add(constants.DT_UNSIGNED_8BIT) // triggerDomain
                    .add(constants.DT_UNSIGNED_8BIT); // qosLevel
                if (!(kpo.cmdflags & constants.PUBLISH_GROUP) && (kpo.cmdflags & constants.PUBLISH_DETAILED)) {
                    this.bufferLengthBuilder
                        .add(constants.DT_UNSIGNED_8BIT) // type
                        .add(constants.DT_UNSIGNED_16BIT) // nid
                        .add(constants.DT_STRING, m.path) // path
                        .add(constants.DT_STRING, m.description) // description
                        .add(constants.DT_UNSIGNED_8BIT) // flags
                        .add(constants.DT_UNSIGNED_8BIT) // dataType
                        .add(constants.DT_UNSIGNED_8BIT); // triggerMode
                    if (m.triggerMode === constants.TRIGGER_N || m.triggerMode === constants.TRIGGER_N_T) {
                        if (m.dataType < constants.DT_NUMERIC_MIN || m.dataType > constants.DT_NUMERIC_MAX) {
                            throw new KolibriError(ec.INVALID_DATA_TYPE);
                        }
                        this.bufferLengthBuilder.add(m.dataType); // triggerN datatype
                    }
                    else if (m.triggerMode === constants.TRIGGER_R || m.triggerMode === constants.TRIGGER_R_T) {
                        if (m.dataType < constants.DT_NUMERIC_MIN || m.dataType > constants.DT_NUMERIC_MAX) {
                            throw new KolibriError(ec.INVALID_DATA_TYPE);
                        }
                        this.bufferLengthBuilder.add(constants.DT_FLOATING_32BIT); // triggerN datatype
                    }
                    else if (m.triggerMode === constants.TRIGGER_T_S) {
                        this.bufferLengthBuilder.add(constants.DT_UNSIGNED_32BIT); // triggerN datatype
                    }
                    if (
                        m.triggerMode === constants.TRIGGER_T ||
                        m.triggerMode === constants.TRIGGER_N_T ||
                        m.triggerMode === constants.TRIGGER_T_CHANGED ||
                        m.triggerMode === constants.TRIGGER_R_T ||
                        m.triggerMode === constants.TRIGGER_T_S
                    ) {
                        this.bufferLengthBuilder.add(constants.DT_UNSIGNED_32BIT); // triggerT
                    }
                    this.bufferLengthBuilder
                        .add(constants.DT_UNSIGNED_8BIT) // triggerDomain
                        .add(constants.DT_UNSIGNED_8BIT) // qosLevel
                        .add(constants.DT_UNSIGNED_16BIT) // history
                        .add(constants.DT_STRING); // format

                    if (kpo.dataType >= constants.DT_NUMERIC_MIN && kpo.dataType <= constants.DT_NUMERIC_MAX) {
                        this.bufferLengthBuilder
                            .add(constants.DT_FLOATING_64BIT) // scalingFactor
                            .add(constants.DT_FLOATING_64BIT) // scalingOffset
                            .add(constants.DT_FLOATING_64BIT) // writeRangeMin
                            .add(constants.DT_FLOATING_64BIT); // writeRangMax
                    }
                }
            }
        }
        return this.bufferLengthBuilder.build();
    }
}

