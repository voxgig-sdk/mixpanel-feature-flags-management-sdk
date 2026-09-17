import { MixpanelFeatureFlagsManagementEntityBase } from '../MixpanelFeatureFlagsManagementEntityBase';
import type { MixpanelFeatureFlagsManagementSDK } from '../MixpanelFeatureFlagsManagementSDK';
import type { Workspace } from '../MixpanelFeatureFlagsManagementTypes';
declare class WorkspaceEntity extends MixpanelFeatureFlagsManagementEntityBase<Workspace> {
    constructor(client: MixpanelFeatureFlagsManagementSDK, entopts: any);
    make(this: WorkspaceEntity): WorkspaceEntity;
}
export { WorkspaceEntity };
