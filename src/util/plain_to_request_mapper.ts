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

import { KolibriVersion } from '../common';
import { cV10, cV21, cV30, cV31, cV32, cV33, KolibriRequest, KolibriRequestMethods } from '../consumer';

export interface PlainToRequestMapperFunction<T extends KolibriRequest<unknown>> {
    (kolibriRequest: T): T;
}

export class PlainToRequestMapper {
    private static instance: PlainToRequestMapper;
    private static map = new Map<string, Map<string, PlainToRequestMapperFunction<any>>>();
    private constructor() { this.init(); }

    static getInstance() {
        if (!PlainToRequestMapper.instance) {
            PlainToRequestMapper.instance = new PlainToRequestMapper();
        }
        return PlainToRequestMapper.instance;
    }

    plainToRequest<T extends KolibriRequest<unknown>>(version: KolibriVersion, plainRequest: T): T | never {
        const mapOfVersionedMapperFunctions = PlainToRequestMapper.map.get(version.semVer.raw);

        if (!mapOfVersionedMapperFunctions) {
            throw new Error(`mappers for version ${version} not found`);
        }

        const plainToRequestMapperFunction = mapOfVersionedMapperFunctions.get(plainRequest.method);

        if (!plainToRequestMapperFunction) {
            throw new Error(`mapper function for method ${plainRequest.method} not found`);
        }

        return plainToRequestMapperFunction(plainRequest);
    }

    private init() {
        this.initV1ConsumerKolibriRequestMappers();
        this.initV21ConsumerKolibriRequestMappers();
        this.initV30ConsumerKolibriRequestMappers();
        this.initV31ConsumerKolibriRequestMappers();
        this.initV32ConsumerKolibriRequestMappers();
        this.initV33ConsumerKolibriRequestMappers();
    }

    private initV1ConsumerKolibriRequestMappers() {
        const version = new KolibriVersion('kolibri');
        const map = new Map<string, PlainToRequestMapperFunction<any>>();
        map.set(KolibriRequestMethods.GetChallengeRequestMethod, cV10.toGetChallengeRequest);
        map.set(KolibriRequestMethods.GetRpcInfoRequestMethod, cV10.toGetRpcInfoRequest);
        map.set(KolibriRequestMethods.GetStatisticsRequestMethod, cV10.toGetStatisticsRequest);
        map.set(KolibriRequestMethods.LoginRequestMethod, cV10.toLoginRequest);
        map.set(KolibriRequestMethods.CloseRequestMethod, cV10.toCloseRequest);
        map.set(KolibriRequestMethods.SubscribeRequestMethod, cV10.toSubscribeRequest);
        map.set(KolibriRequestMethods.UnsubscribeRequestMethod, cV10.toUnsubscribeRequest);
        map.set(KolibriRequestMethods.ReadRequestMethod, cV10.toReadRequest);
        map.set(KolibriRequestMethods.WriteRequestMethod, cV10.toWriteRequest);
        map.set(KolibriRequestMethods.CommitRequestMethod, cV10.toCommitRequest);
        map.set(KolibriRequestMethods.CancelRequestMethod, cV10.toCancelRequest);
        map.set(KolibriRequestMethods.UserSubscribeRequestMethod, cV10.toUserSubscribeRequest);
        map.set(KolibriRequestMethods.UserUnsubscribeRequestMethod, cV10.toUserUnsubscribeRequest);
        map.set(KolibriRequestMethods.ProjectBrowseRequestMethod, cV10.toProjectBrowseRequest);
        map.set(KolibriRequestMethods.ProjectCreateRequestMethod, cV10.toProjectCreateRequest);
        map.set(KolibriRequestMethods.ProjectModifyRequestMethod, cV10.toProjectModifyRequest);
        map.set(KolibriRequestMethods.ProjectDeleteRequestMethod, cV10.toProjectDeleteRequest);
        map.set(KolibriRequestMethods.ProjectGetPropertiesRequestMethod, cV10.toProjectGetPropertiesRequest);
        map.set(KolibriRequestMethods.ProjectGetStatisticsRequestMethod, cV10.toProjectGetStatisticsRequest);
        map.set(KolibriRequestMethods.NodeBrowseRequestMethod, cV10.toNodeBrowseRequest);
        map.set(KolibriRequestMethods.NodeCreateRequestMethod, cV10.toNodeCreateRequest);
        map.set(KolibriRequestMethods.NodeModifyRequestMethod, cV10.toNodeModifyRequest);
        map.set(KolibriRequestMethods.NodeDeleteRequestMethod, cV10.toNodeDeleteRequest);
        map.set(KolibriRequestMethods.NodeGetPropertiesRequestMethod, cV10.toNodeGetPropertiesRequest);
        map.set(KolibriRequestMethods.NodeGetHistoryRequestMethod, cV10.toNodeGetHistoryRequest);
        map.set(KolibriRequestMethods.UserBrowseRequestMethod, cV10.toUserBrowseRequest);
        map.set(KolibriRequestMethods.UserCreateRequestMethod, cV10.toUserCreateRequest);
        map.set(KolibriRequestMethods.UserModifyRequestMethod, cV10.toUserModifyRequest);
        map.set(KolibriRequestMethods.UserDeleteRequestMethod, cV10.toUserDeleteRequest);
        map.set(KolibriRequestMethods.UserGetPropertiesRequestMethod, cV10.toUserGetPropertiesRequest);
        map.set(KolibriRequestMethods.UserGetHistoryRequestMethod, cV10.toUserGetHistoryRequest);
        map.set(KolibriRequestMethods.UsergroupBrowseRequestMethod, cV10.toUserGroupBrowseRequest);
        map.set(KolibriRequestMethods.UsergroupCreateRequestMethod, cV10.toUserGroupCreateRequest);
        map.set(KolibriRequestMethods.UserGroupModifyRequestMethod, cV10.toUserGroupModifyRequest);
        map.set(KolibriRequestMethods.UsergroupDeleteRequestMethod, cV10.toUserGroupDeleteRequest);
        map.set(KolibriRequestMethods.UserGroupGetPropertiesRequestMethod, cV10.toUserGroupGetPropertiesRequest);
        map.set(KolibriRequestMethods.UserGroupListMembersRequestMethod, cV10.toUserGroupListMembersRequest);
        map.set(KolibriRequestMethods.UserGroupAddMemberRequestMethod, cV10.toUserGroupAddMemberRequest);
        map.set(KolibriRequestMethods.UserGroupRemoveMemberMethod, cV10.toUserGroupRemoveMemberRequest);
        map.set(KolibriRequestMethods.UserGroupIsMemberRequestMethod, cV10.toUserGroupIsMemberRequest);
        map.set(KolibriRequestMethods.PermissionNodeSetRequestMethod, cV10.toPermissionNodeSetRequest);
        map.set(KolibriRequestMethods.PermissionNodeListRequestMethod, cV10.toPermissionNodeListRequest);
        map.set(KolibriRequestMethods.PermissionRpcAddRequestMethod, cV10.toPermissionRpcAddRequest);
        map.set(KolibriRequestMethods.PermissionRpcRemoveRequestMethod, cV10.toPermissionRpcRemoveRequest);
        map.set(KolibriRequestMethods.PermissionRpcListRequestMethod, cV10.toPermissionRpcListRequest);
        map.set(KolibriRequestMethods.PermissionRpcListRequestMethod, cV10.toPermissionRpcListRequest);
        PlainToRequestMapper.map.set(version.semVer.raw, map);
    }

    private initV21ConsumerKolibriRequestMappers() {
        const version = new KolibriVersion('v2.1.kolibri');
        const map = new Map<string, PlainToRequestMapperFunction<any>>();
        map.set(KolibriRequestMethods.GetRpcInfoRequestMethod, cV10.toGetRpcInfoRequest);
        map.set(KolibriRequestMethods.GetStatisticsRequestMethod, cV10.toGetStatisticsRequest);
        map.set(KolibriRequestMethods.CloseRequestMethod, cV10.toCloseRequest);
        map.set(KolibriRequestMethods.SubscribeRequestMethod, cV10.toSubscribeRequest);
        map.set(KolibriRequestMethods.UnsubscribeRequestMethod, cV10.toUnsubscribeRequest);
        map.set(KolibriRequestMethods.ReadRequestMethod, cV10.toReadRequest);
        map.set(KolibriRequestMethods.CommitRequestMethod, cV10.toCommitRequest);
        map.set(KolibriRequestMethods.CancelRequestMethod, cV10.toCancelRequest);
        map.set(KolibriRequestMethods.ProjectBrowseRequestMethod, cV10.toProjectBrowseRequest);
        map.set(KolibriRequestMethods.ProjectCreateRequestMethod, cV10.toProjectCreateRequest);
        map.set(KolibriRequestMethods.ProjectDeleteRequestMethod, cV10.toProjectDeleteRequest);
        map.set(KolibriRequestMethods.ProjectGetPropertiesRequestMethod, cV10.toProjectGetPropertiesRequest);
        map.set(KolibriRequestMethods.ProjectGetStatisticsRequestMethod, cV10.toProjectGetStatisticsRequest);
        map.set(KolibriRequestMethods.NodeModifyRequestMethod, cV10.toNodeModifyRequest);
        map.set(KolibriRequestMethods.NodeDeleteRequestMethod, cV10.toNodeDeleteRequest);
        map.set(KolibriRequestMethods.NodeGetPropertiesRequestMethod, cV10.toNodeGetPropertiesRequest);
        map.set(KolibriRequestMethods.UserBrowseRequestMethod, cV10.toUserBrowseRequest);
        map.set(KolibriRequestMethods.UserCreateRequestMethod, cV10.toUserCreateRequest);
        map.set(KolibriRequestMethods.UserModifyRequestMethod, cV10.toUserModifyRequest);
        map.set(KolibriRequestMethods.UserDeleteRequestMethod, cV10.toUserDeleteRequest);
        map.set(KolibriRequestMethods.UserGetPropertiesRequestMethod, cV10.toUserGetPropertiesRequest);
        map.set(KolibriRequestMethods.UsergroupBrowseRequestMethod, cV10.toUserGroupBrowseRequest);
        map.set(KolibriRequestMethods.UsergroupCreateRequestMethod, cV10.toUserGroupCreateRequest);
        map.set(KolibriRequestMethods.UserGroupModifyRequestMethod, cV10.toUserGroupModifyRequest);
        map.set(KolibriRequestMethods.UsergroupDeleteRequestMethod, cV10.toUserGroupDeleteRequest);
        map.set(KolibriRequestMethods.UserGroupGetPropertiesRequestMethod, cV10.toUserGroupGetPropertiesRequest);
        map.set(KolibriRequestMethods.UserGroupListMembersRequestMethod, cV10.toUserGroupListMembersRequest);
        map.set(KolibriRequestMethods.UserGroupAddMemberRequestMethod, cV10.toUserGroupAddMemberRequest);
        map.set(KolibriRequestMethods.UserGroupRemoveMemberMethod, cV10.toUserGroupRemoveMemberRequest);
        map.set(KolibriRequestMethods.UserGroupIsMemberRequestMethod, cV10.toUserGroupIsMemberRequest);
        map.set(KolibriRequestMethods.PermissionNodeSetRequestMethod, cV10.toPermissionNodeSetRequest);
        map.set(KolibriRequestMethods.PermissionNodeListRequestMethod, cV10.toPermissionNodeListRequest);
        map.set(KolibriRequestMethods.PermissionRpcAddRequestMethod, cV10.toPermissionRpcAddRequest);
        map.set(KolibriRequestMethods.PermissionRpcRemoveRequestMethod, cV10.toPermissionRpcRemoveRequest);
        map.set(KolibriRequestMethods.PermissionRpcListRequestMethod, cV10.toPermissionRpcListRequest);
        map.set(KolibriRequestMethods.PermissionRpcListRequestMethod, cV10.toPermissionRpcListRequest);
        map.set(KolibriRequestMethods.LoginRequestMethod, cV21.toLoginRequest);
        map.set(KolibriRequestMethods.WriteRequestMethod, cV21.toWriteRequest);
        map.set(KolibriRequestMethods.UserSubscribeRequestMethod, cV21.toUserSubscribeRequest);
        map.set(KolibriRequestMethods.UserUnsubscribeRequestMethod, cV21.toUserUnsubscribeRequest);
        map.set(KolibriRequestMethods.UserGetSessionRequestMethod, cV21.toUserGetSessionsRequest);
        map.set(KolibriRequestMethods.ProjectModifyRequestMethod, cV21.toProjectModifyRequest);
        map.set(KolibriRequestMethods.NodeBrowseRequestMethod, cV21.toNodeBrowseRequest);
        map.set(KolibriRequestMethods.NodeCreateRequestMethod, cV21.toNodeCreateRequest);
        map.set(KolibriRequestMethods.NodeGetHistoryRequestMethod, cV21.toNodeGetHistoryRequest);
        map.set(KolibriRequestMethods.UserGetHistoryRequestMethod, cV21.toUserGetHistoryRequest);
        PlainToRequestMapper.map.set(version.semVer.raw, map);
    }
    private initV30ConsumerKolibriRequestMappers() {
        const version = new KolibriVersion('v3.0.c.kolibri');
        const map = new Map<string, PlainToRequestMapperFunction<any>>();
        map.set(KolibriRequestMethods.GetRpcInfoRequestMethod, cV10.toGetRpcInfoRequest);
        map.set(KolibriRequestMethods.GetStatisticsRequestMethod, cV10.toGetStatisticsRequest);
        map.set(KolibriRequestMethods.CloseRequestMethod, cV10.toCloseRequest);
        map.set(KolibriRequestMethods.SubscribeRequestMethod, cV10.toSubscribeRequest);
        map.set(KolibriRequestMethods.UnsubscribeRequestMethod, cV10.toUnsubscribeRequest);
        map.set(KolibriRequestMethods.ReadRequestMethod, cV10.toReadRequest);
        map.set(KolibriRequestMethods.CommitRequestMethod, cV10.toCommitRequest);
        map.set(KolibriRequestMethods.CancelRequestMethod, cV10.toCancelRequest);
        map.set(KolibriRequestMethods.ProjectBrowseRequestMethod, cV10.toProjectBrowseRequest);
        map.set(KolibriRequestMethods.ProjectDeleteRequestMethod, cV10.toProjectDeleteRequest);
        map.set(KolibriRequestMethods.ProjectGetPropertiesRequestMethod,
            cV10.toProjectGetPropertiesRequest);
        map.set(KolibriRequestMethods.ProjectGetStatisticsRequestMethod,
            cV10.toProjectGetStatisticsRequest);
        map.set(KolibriRequestMethods.NodeModifyRequestMethod, cV10.toNodeModifyRequest);
        map.set(KolibriRequestMethods.NodeDeleteRequestMethod, cV10.toNodeDeleteRequest);
        map.set(KolibriRequestMethods.NodeGetPropertiesRequestMethod, cV10.toNodeGetPropertiesRequest);
        map.set(KolibriRequestMethods.UserBrowseRequestMethod, cV10.toUserBrowseRequest);
        map.set(KolibriRequestMethods.UserCreateRequestMethod, cV10.toUserCreateRequest);
        map.set(KolibriRequestMethods.UserModifyRequestMethod, cV10.toUserModifyRequest);
        map.set(KolibriRequestMethods.UserDeleteRequestMethod, cV10.toUserDeleteRequest);
        map.set(KolibriRequestMethods.UserGetPropertiesRequestMethod, cV10.toUserGetPropertiesRequest);
        map.set(KolibriRequestMethods.UsergroupBrowseRequestMethod, cV10.toUserGroupBrowseRequest);
        map.set(KolibriRequestMethods.UsergroupCreateRequestMethod, cV10.toUserGroupCreateRequest);
        map.set(KolibriRequestMethods.UserGroupModifyRequestMethod, cV10.toUserGroupModifyRequest);
        map.set(KolibriRequestMethods.UsergroupDeleteRequestMethod, cV10.toUserGroupDeleteRequest);
        map.set(KolibriRequestMethods.UserGroupGetPropertiesRequestMethod,
            cV10.toUserGroupGetPropertiesRequest);
        map.set(KolibriRequestMethods.UserGroupListMembersRequestMethod,
            cV10.toUserGroupListMembersRequest);
        map.set(KolibriRequestMethods.UserGroupAddMemberRequestMethod, cV10.toUserGroupAddMemberRequest);
        map.set(KolibriRequestMethods.UserGroupRemoveMemberMethod, cV10.toUserGroupRemoveMemberRequest);
        map.set(KolibriRequestMethods.UserGroupIsMemberRequestMethod, cV10.toUserGroupIsMemberRequest);
        map.set(KolibriRequestMethods.PermissionNodeSetRequestMethod, cV10.toPermissionNodeSetRequest);
        map.set(KolibriRequestMethods.PermissionNodeListRequestMethod, cV10.toPermissionNodeListRequest);
        map.set(KolibriRequestMethods.PermissionRpcAddRequestMethod, cV10.toPermissionRpcAddRequest);
        map.set(KolibriRequestMethods.PermissionRpcRemoveRequestMethod, cV10.toPermissionRpcRemoveRequest);
        map.set(KolibriRequestMethods.PermissionRpcListRequestMethod, cV10.toPermissionRpcListRequest);
        map.set(KolibriRequestMethods.PermissionRpcListRequestMethod, cV10.toPermissionRpcListRequest);
        map.set(KolibriRequestMethods.LoginRequestMethod, cV21.toLoginRequest);
        map.set(KolibriRequestMethods.WriteRequestMethod, cV21.toWriteRequest);
        map.set(KolibriRequestMethods.UserSubscribeRequestMethod, cV21.toUserSubscribeRequest);
        map.set(KolibriRequestMethods.UserUnsubscribeRequestMethod, cV21.toUserUnsubscribeRequest);
        map.set(KolibriRequestMethods.UserGetSessionRequestMethod, cV21.toUserGetSessionsRequest);
        map.set(KolibriRequestMethods.NodeBrowseRequestMethod, cV21.toNodeBrowseRequest);
        map.set(KolibriRequestMethods.NodeCreateRequestMethod, cV21.toNodeCreateRequest);
        map.set(KolibriRequestMethods.NodeGetHistoryRequestMethod, cV21.toNodeGetHistoryRequest);
        map.set(KolibriRequestMethods.UserGetHistoryRequestMethod, cV21.toUserGetHistoryRequest);
        map.set(KolibriRequestMethods.ProjectCreateRequestMethod, cV30.toProjectCreateRequest);
        map.set(KolibriRequestMethods.ProjectModifyRequestMethod, cV30.toProjectModifyRequest);
        PlainToRequestMapper.map.set(version.semVer.raw, map);
    }

    private initV31ConsumerKolibriRequestMappers() {
        const version = new KolibriVersion('v3.1.c.kolibri');
        const map = new Map<string, PlainToRequestMapperFunction<any>>();
        map.set(KolibriRequestMethods.GetRpcInfoRequestMethod, cV10.toGetRpcInfoRequest);
        map.set(KolibriRequestMethods.GetStatisticsRequestMethod, cV10.toGetStatisticsRequest);
        map.set(KolibriRequestMethods.CloseRequestMethod, cV10.toCloseRequest);
        map.set(KolibriRequestMethods.SubscribeRequestMethod, cV10.toSubscribeRequest);
        map.set(KolibriRequestMethods.UnsubscribeRequestMethod, cV10.toUnsubscribeRequest);
        map.set(KolibriRequestMethods.ReadRequestMethod, cV10.toReadRequest);
        map.set(KolibriRequestMethods.CommitRequestMethod, cV10.toCommitRequest);
        map.set(KolibriRequestMethods.CancelRequestMethod, cV10.toCancelRequest);
        map.set(KolibriRequestMethods.ProjectBrowseRequestMethod, cV10.toProjectBrowseRequest);
        map.set(KolibriRequestMethods.ProjectDeleteRequestMethod, cV10.toProjectDeleteRequest);
        map.set(KolibriRequestMethods.ProjectGetPropertiesRequestMethod, cV10.toProjectGetPropertiesRequest);
        map.set(KolibriRequestMethods.ProjectGetStatisticsRequestMethod, cV10.toProjectGetStatisticsRequest);
        map.set(KolibriRequestMethods.NodeModifyRequestMethod, cV10.toNodeModifyRequest);
        map.set(KolibriRequestMethods.NodeDeleteRequestMethod, cV10.toNodeDeleteRequest);
        map.set(KolibriRequestMethods.NodeGetPropertiesRequestMethod, cV10.toNodeGetPropertiesRequest);
        map.set(KolibriRequestMethods.UserBrowseRequestMethod, cV10.toUserBrowseRequest);
        map.set(KolibriRequestMethods.UserCreateRequestMethod, cV10.toUserCreateRequest);
        map.set(KolibriRequestMethods.UserModifyRequestMethod, cV10.toUserModifyRequest);
        map.set(KolibriRequestMethods.UserDeleteRequestMethod, cV10.toUserDeleteRequest);
        map.set(KolibriRequestMethods.UserGetPropertiesRequestMethod, cV10.toUserGetPropertiesRequest);
        map.set(KolibriRequestMethods.UsergroupBrowseRequestMethod, cV10.toUserGroupBrowseRequest);
        map.set(KolibriRequestMethods.UsergroupCreateRequestMethod, cV10.toUserGroupCreateRequest);
        map.set(KolibriRequestMethods.UserGroupModifyRequestMethod, cV10.toUserGroupModifyRequest);
        map.set(KolibriRequestMethods.UsergroupDeleteRequestMethod, cV10.toUserGroupDeleteRequest);
        map.set(KolibriRequestMethods.UserGroupGetPropertiesRequestMethod, cV10.toUserGroupGetPropertiesRequest);
        map.set(KolibriRequestMethods.UserGroupListMembersRequestMethod, cV10.toUserGroupListMembersRequest);
        map.set(KolibriRequestMethods.UserGroupAddMemberRequestMethod, cV10.toUserGroupAddMemberRequest);
        map.set(KolibriRequestMethods.UserGroupRemoveMemberMethod, cV10.toUserGroupRemoveMemberRequest);
        map.set(KolibriRequestMethods.UserGroupIsMemberRequestMethod, cV10.toUserGroupIsMemberRequest);
        map.set(KolibriRequestMethods.PermissionNodeSetRequestMethod, cV10.toPermissionNodeSetRequest);
        map.set(KolibriRequestMethods.PermissionNodeListRequestMethod, cV10.toPermissionNodeListRequest);
        map.set(KolibriRequestMethods.PermissionRpcAddRequestMethod, cV10.toPermissionRpcAddRequest);
        map.set(KolibriRequestMethods.PermissionRpcRemoveRequestMethod, cV10.toPermissionRpcRemoveRequest);
        map.set(KolibriRequestMethods.PermissionRpcListRequestMethod, cV10.toPermissionRpcListRequest);
        map.set(KolibriRequestMethods.PermissionRpcListRequestMethod, cV10.toPermissionRpcListRequest);
        map.set(KolibriRequestMethods.LoginRequestMethod, cV21.toLoginRequest);
        map.set(KolibriRequestMethods.WriteRequestMethod, cV21.toWriteRequest);
        map.set(KolibriRequestMethods.UserSubscribeRequestMethod, cV21.toUserSubscribeRequest);
        map.set(KolibriRequestMethods.UserUnsubscribeRequestMethod, cV21.toUserUnsubscribeRequest);
        map.set(KolibriRequestMethods.UserGetSessionRequestMethod, cV21.toUserGetSessionsRequest);
        map.set(KolibriRequestMethods.NodeBrowseRequestMethod, cV21.toNodeBrowseRequest);
        map.set(KolibriRequestMethods.NodeCreateRequestMethod, cV21.toNodeCreateRequest);
        map.set(KolibriRequestMethods.NodeGetHistoryRequestMethod, cV21.toNodeGetHistoryRequest);
        map.set(KolibriRequestMethods.UserGetHistoryRequestMethod, cV21.toUserGetHistoryRequest);
        map.set(KolibriRequestMethods.ProjectCreateRequestMethod, cV30.toProjectCreateRequest);
        map.set(KolibriRequestMethods.ProjectModifyRequestMethod, cV30.toProjectModifyRequest);
        map.set(KolibriRequestMethods.ProjectGetHistoryUsageRequestMethod, cV31.toProjectGetHistoryUsageRequest);
        map.set(KolibriRequestMethods.ProjectGetLiveUsageRequestMethod, cV31.toProjectGetLiveUsageRequest);
        PlainToRequestMapper.map.set(version.semVer.raw, map);
    }
    private initV32ConsumerKolibriRequestMappers() {
        const version = new KolibriVersion('v3.2.c.kolibri');
        const map = new Map<string, PlainToRequestMapperFunction<any>>();
        map.set(KolibriRequestMethods.GetRpcInfoRequestMethod, cV10.toGetRpcInfoRequest);
        map.set(KolibriRequestMethods.GetStatisticsRequestMethod, cV10.toGetStatisticsRequest);
        map.set(KolibriRequestMethods.CloseRequestMethod, cV10.toCloseRequest);
        map.set(KolibriRequestMethods.UnsubscribeRequestMethod, cV10.toUnsubscribeRequest);
        map.set(KolibriRequestMethods.ReadRequestMethod, cV10.toReadRequest);
        map.set(KolibriRequestMethods.CommitRequestMethod, cV10.toCommitRequest);
        map.set(KolibriRequestMethods.CancelRequestMethod, cV10.toCancelRequest);
        map.set(KolibriRequestMethods.ProjectBrowseRequestMethod, cV10.toProjectBrowseRequest);
        map.set(KolibriRequestMethods.ProjectDeleteRequestMethod, cV10.toProjectDeleteRequest);
        map.set(KolibriRequestMethods.ProjectGetPropertiesRequestMethod, cV10.toProjectGetPropertiesRequest);
        map.set(KolibriRequestMethods.ProjectGetStatisticsRequestMethod, cV10.toProjectGetStatisticsRequest);
        map.set(KolibriRequestMethods.NodeModifyRequestMethod, cV10.toNodeModifyRequest);
        map.set(KolibriRequestMethods.NodeDeleteRequestMethod, cV10.toNodeDeleteRequest);
        map.set(KolibriRequestMethods.NodeGetPropertiesRequestMethod, cV10.toNodeGetPropertiesRequest);
        map.set(KolibriRequestMethods.UserBrowseRequestMethod, cV10.toUserBrowseRequest);
        map.set(KolibriRequestMethods.UserCreateRequestMethod, cV10.toUserCreateRequest);
        map.set(KolibriRequestMethods.UserModifyRequestMethod, cV10.toUserModifyRequest);
        map.set(KolibriRequestMethods.UserDeleteRequestMethod, cV10.toUserDeleteRequest);
        map.set(KolibriRequestMethods.UserGetPropertiesRequestMethod, cV10.toUserGetPropertiesRequest);
        map.set(KolibriRequestMethods.UsergroupBrowseRequestMethod, cV10.toUserGroupBrowseRequest);
        map.set(KolibriRequestMethods.UsergroupCreateRequestMethod, cV10.toUserGroupCreateRequest);
        map.set(KolibriRequestMethods.UserGroupModifyRequestMethod, cV10.toUserGroupModifyRequest);
        map.set(KolibriRequestMethods.UsergroupDeleteRequestMethod, cV10.toUserGroupDeleteRequest);
        map.set(KolibriRequestMethods.UserGroupGetPropertiesRequestMethod, cV10.toUserGroupGetPropertiesRequest);
        map.set(KolibriRequestMethods.UserGroupListMembersRequestMethod, cV10.toUserGroupListMembersRequest);
        map.set(KolibriRequestMethods.UserGroupAddMemberRequestMethod, cV10.toUserGroupAddMemberRequest);
        map.set(KolibriRequestMethods.UserGroupRemoveMemberMethod, cV10.toUserGroupRemoveMemberRequest);
        map.set(KolibriRequestMethods.UserGroupIsMemberRequestMethod, cV10.toUserGroupIsMemberRequest);
        map.set(KolibriRequestMethods.PermissionNodeSetRequestMethod, cV10.toPermissionNodeSetRequest);
        map.set(KolibriRequestMethods.PermissionNodeListRequestMethod, cV10.toPermissionNodeListRequest);
        map.set(KolibriRequestMethods.PermissionRpcAddRequestMethod, cV10.toPermissionRpcAddRequest);
        map.set(KolibriRequestMethods.PermissionRpcRemoveRequestMethod, cV10.toPermissionRpcRemoveRequest);
        map.set(KolibriRequestMethods.PermissionRpcListRequestMethod, cV10.toPermissionRpcListRequest);
        map.set(KolibriRequestMethods.PermissionRpcListRequestMethod, cV10.toPermissionRpcListRequest);
        map.set(KolibriRequestMethods.LoginRequestMethod, cV21.toLoginRequest);
        map.set(KolibriRequestMethods.WriteRequestMethod, cV21.toWriteRequest);
        map.set(KolibriRequestMethods.UserSubscribeRequestMethod, cV21.toUserSubscribeRequest);
        map.set(KolibriRequestMethods.UserUnsubscribeRequestMethod, cV21.toUserUnsubscribeRequest);
        map.set(KolibriRequestMethods.UserGetSessionRequestMethod, cV21.toUserGetSessionsRequest);
        map.set(KolibriRequestMethods.NodeBrowseRequestMethod, cV21.toNodeBrowseRequest);
        map.set(KolibriRequestMethods.NodeCreateRequestMethod, cV21.toNodeCreateRequest);
        map.set(KolibriRequestMethods.NodeGetHistoryRequestMethod, cV21.toNodeGetHistoryRequest);
        map.set(KolibriRequestMethods.UserGetHistoryRequestMethod, cV21.toUserGetHistoryRequest);
        map.set(KolibriRequestMethods.ProjectCreateRequestMethod, cV30.toProjectCreateRequest);
        map.set(KolibriRequestMethods.ProjectModifyRequestMethod, cV30.toProjectModifyRequest);
        map.set(KolibriRequestMethods.ProjectGetHistoryUsageRequestMethod, cV31.toProjectGetHistoryUsageRequest);
        map.set(KolibriRequestMethods.ProjectGetLiveUsageRequestMethod, cV31.toProjectGetLiveUsageRequest);
        map.set(KolibriRequestMethods.SubscribeRequestMethod, cV32.toSubscribeRequest);
        map.set(KolibriRequestMethods.NodeDeleteHistoryRequestMethod, cV32.toNodeDeleteHistoryRequest);
        map.set(KolibriRequestMethods.PermissionUserListRequestMethod, cV32.toPermissionUserListRequest);
        PlainToRequestMapper.map.set(version.semVer.raw, map);
    }

    private initV33ConsumerKolibriRequestMappers() {
        const version = new KolibriVersion('v3.3.c.kolibri');
        const map = new Map<string, PlainToRequestMapperFunction<any>>();
        map.set(KolibriRequestMethods.GetRpcInfoRequestMethod, cV10.toGetRpcInfoRequest);
        map.set(KolibriRequestMethods.GetStatisticsRequestMethod, cV10.toGetStatisticsRequest);
        map.set(KolibriRequestMethods.CloseRequestMethod, cV10.toCloseRequest);
        map.set(KolibriRequestMethods.UnsubscribeRequestMethod, cV10.toUnsubscribeRequest);
        map.set(KolibriRequestMethods.ReadRequestMethod, cV10.toReadRequest);
        map.set(KolibriRequestMethods.CommitRequestMethod, cV10.toCommitRequest);
        map.set(KolibriRequestMethods.CancelRequestMethod, cV10.toCancelRequest);
        map.set(KolibriRequestMethods.ProjectBrowseRequestMethod, cV10.toProjectBrowseRequest);
        map.set(KolibriRequestMethods.ProjectDeleteRequestMethod, cV10.toProjectDeleteRequest);
        map.set(KolibriRequestMethods.ProjectGetPropertiesRequestMethod, cV10.toProjectGetPropertiesRequest);
        map.set(KolibriRequestMethods.ProjectGetStatisticsRequestMethod, cV10.toProjectGetStatisticsRequest);
        map.set(KolibriRequestMethods.NodeModifyRequestMethod, cV10.toNodeModifyRequest);
        map.set(KolibriRequestMethods.NodeDeleteRequestMethod, cV10.toNodeDeleteRequest);
        map.set(KolibriRequestMethods.NodeGetPropertiesRequestMethod, cV10.toNodeGetPropertiesRequest);
        map.set(KolibriRequestMethods.UserBrowseRequestMethod, cV10.toUserBrowseRequest);
        map.set(KolibriRequestMethods.UserCreateRequestMethod, cV10.toUserCreateRequest);
        map.set(KolibriRequestMethods.UserModifyRequestMethod, cV10.toUserModifyRequest);
        map.set(KolibriRequestMethods.UserDeleteRequestMethod, cV10.toUserDeleteRequest);
        map.set(KolibriRequestMethods.UserGetPropertiesRequestMethod, cV10.toUserGetPropertiesRequest);
        map.set(KolibriRequestMethods.UsergroupBrowseRequestMethod, cV10.toUserGroupBrowseRequest);
        map.set(KolibriRequestMethods.UsergroupCreateRequestMethod, cV10.toUserGroupCreateRequest);
        map.set(KolibriRequestMethods.UserGroupModifyRequestMethod, cV10.toUserGroupModifyRequest);
        map.set(KolibriRequestMethods.UsergroupDeleteRequestMethod, cV10.toUserGroupDeleteRequest);
        map.set(KolibriRequestMethods.UserGroupGetPropertiesRequestMethod, cV10.toUserGroupGetPropertiesRequest);
        map.set(KolibriRequestMethods.UserGroupListMembersRequestMethod, cV10.toUserGroupListMembersRequest);
        map.set(KolibriRequestMethods.UserGroupAddMemberRequestMethod, cV10.toUserGroupAddMemberRequest);
        map.set(KolibriRequestMethods.UserGroupRemoveMemberMethod, cV10.toUserGroupRemoveMemberRequest);
        map.set(KolibriRequestMethods.UserGroupIsMemberRequestMethod, cV10.toUserGroupIsMemberRequest);
        map.set(KolibriRequestMethods.PermissionNodeSetRequestMethod, cV10.toPermissionNodeSetRequest);
        map.set(KolibriRequestMethods.PermissionNodeListRequestMethod, cV10.toPermissionNodeListRequest);
        map.set(KolibriRequestMethods.PermissionRpcAddRequestMethod, cV10.toPermissionRpcAddRequest);
        map.set(KolibriRequestMethods.PermissionRpcRemoveRequestMethod, cV10.toPermissionRpcRemoveRequest);
        map.set(KolibriRequestMethods.PermissionRpcListRequestMethod, cV10.toPermissionRpcListRequest);
        map.set(KolibriRequestMethods.PermissionRpcListRequestMethod, cV10.toPermissionRpcListRequest);
        map.set(KolibriRequestMethods.WriteRequestMethod, cV21.toWriteRequest);
        map.set(KolibriRequestMethods.UserSubscribeRequestMethod, cV21.toUserSubscribeRequest);
        map.set(KolibriRequestMethods.UserUnsubscribeRequestMethod, cV21.toUserUnsubscribeRequest);
        map.set(KolibriRequestMethods.UserGetSessionRequestMethod, cV21.toUserGetSessionsRequest);
        map.set(KolibriRequestMethods.NodeBrowseRequestMethod, cV21.toNodeBrowseRequest);
        map.set(KolibriRequestMethods.NodeCreateRequestMethod, cV21.toNodeCreateRequest);
        map.set(KolibriRequestMethods.NodeGetHistoryRequestMethod, cV21.toNodeGetHistoryRequest);
        map.set(KolibriRequestMethods.UserGetHistoryRequestMethod, cV21.toUserGetHistoryRequest);
        map.set(KolibriRequestMethods.ProjectCreateRequestMethod, cV30.toProjectCreateRequest);
        map.set(KolibriRequestMethods.ProjectModifyRequestMethod, cV30.toProjectModifyRequest);
        map.set(KolibriRequestMethods.ProjectGetHistoryUsageRequestMethod, cV31.toProjectGetHistoryUsageRequest);
        map.set(KolibriRequestMethods.ProjectGetLiveUsageRequestMethod, cV31.toProjectGetLiveUsageRequest);
        map.set(KolibriRequestMethods.SubscribeRequestMethod, cV32.toSubscribeRequest);
        map.set(KolibriRequestMethods.NodeDeleteHistoryRequestMethod, cV32.toNodeDeleteHistoryRequest);
        map.set(KolibriRequestMethods.PermissionUserListRequestMethod, cV32.toPermissionUserListRequest);
        map.set(KolibriRequestMethods.LoginRequestMethod, cV33.toLoginRequest);
        map.set(KolibriRequestMethods.LogoutRequestMethod, cV33.toLogoutRequest);
        map.set(KolibriRequestMethods.UpdateTokenMethod, cV33.toUpdateTokenRequest);
        PlainToRequestMapper.map.set(version.semVer.raw, map);
    }
}
