
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

export namespace KolibriRequestMethods {
    // General
    export const CancelRequestMethod = 'kolibri.cancel';
    export const CloseRequestMethod = 'kolibri.close';
    export const UpdateTokenMethod = 'kolibri.updateToken';
    export const LogoutRequestMethod = 'kolibri.logout';
    export const GetChallengeRequestMethod = 'kolibri.getChallenge';
    export const GetRpcInfoRequestMethod = 'kolibri.getRpcInfo';
    export const GetStatisticsRequestMethod = 'kolibri.getStatistics';
    export const LoginRequestMethod = 'kolibri.login';
    export const ReadRequestMethod = 'kolibri.read';
    export const WriteRequestMethod = 'kolibri.write';
    export const CommitRequestMethod = 'kolibri.commit';
    export const SubscribeRequestMethod = 'kolibri.subscribe';
    export const UnsubscribeRequestMethod = 'kolibri.unsubscribe';
    // Node
    export const NodeBrowseRequestMethod = 'kolibri.node.browse';
    export const NodeCreateRequestMethod = 'kolibri.node.create';
    export const NodeDeleteRequestMethod = 'kolibri.node.delete';
    export const NodeGetHistoryRequestMethod = 'kolibri.node.getHistory';
    export const NodeGetPropertiesRequestMethod = 'kolibri.node.getProperties';
    export const NodeModifyRequestMethod = 'kolibri.node.modify';
    export const NodeDeleteHistoryRequestMethod = 'kolibri.node.deleteHistory';
    // Permission
    export const PermissionNodeListRequestMethod = 'kolibri.permission.node.list';
    export const PermissionNodeSetRequestMethod = 'kolibri.permission.node.set';
    export const PermissionRpcAddRequestMethod = 'kolibri.permission.rpc.add';
    export const PermissionRpcListRequestMethod = 'kolibri.permission.rpc.list';
    export const PermissionRpcRemoveRequestMethod = 'kolibri.permission.rpc.remove';
    export const PermissionUserListRequestMethod = 'kolibri.permission.user.list';
    // Project
    export const ProjectBrowseRequestMethod = 'kolibri.project.browse';
    export const ProjectCreateRequestMethod = 'kolibri.project.create';
    export const ProjectDeleteRequestMethod = 'kolibri.project.delete';
    export const ProjectGetPropertiesRequestMethod = 'kolibri.project.getProperties';
    export const ProjectGetStatisticsRequestMethod = 'kolibri.project.getStatistics';
    export const ProjectModifyRequestMethod = 'kolibri.project.modify';
    export const ProjectGetHistoryUsageRequestMethod = 'kolibri.project.getHistoryUsage';
    export const ProjectGetLiveUsageRequestMethod = 'kolibri.project.getLiveUsage';
    // User
    export const UserBrowseRequestMethod = 'kolibri.user.browse';
    export const UserCreateRequestMethod = 'kolibri.user.create';
    export const UserDeleteRequestMethod = 'kolibri.user.delete';
    export const UserGetHistoryRequestMethod = 'kolibri.user.getHistory';
    export const UserGetPropertiesRequestMethod = 'kolibri.user.getProperties';
    export const UserModifyRequestMethod = 'kolibri.user.modify';
    export const UserSubscribeRequestMethod = 'kolibri.user.subscribe';
    export const UserUnsubscribeRequestMethod = 'kolibri.user.unsubscribe';
    export const UserGetSessionRequestMethod = 'kolibri.user.getSessions';
    // Usergroup
    export const UserGroupAddMemberRequestMethod = 'kolibri.usergroup.addMember';
    export const UsergroupBrowseRequestMethod = 'kolibri.usergroup.browse';
    export const UsergroupCreateRequestMethod = 'kolibri.usergroup.create';
    export const UsergroupDeleteRequestMethod = 'kolibri.usergroup.delete';
    export const UserGroupGetPropertiesRequestMethod = 'kolibri.usergroup.getProperties';
    export const UserGroupIsMemberRequestMethod = 'kolibri.usergroup.isMember';
    export const UserGroupListMembersRequestMethod = 'kolibri.usergroup.listMembers';
    export const UserGroupModifyRequestMethod = 'kolibri.usergroup.modify';
    export const UserGroupRemoveMemberMethod = 'kolibri.usergroup.removeMember';

    // Broker to Consumer only
    export const UnsubscribedRequestMethod = 'kolibri.unsubscribed';
    export const UserNotifyRequestMethod = 'kolibri.user.notify';
}
