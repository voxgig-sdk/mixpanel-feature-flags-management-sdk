import { MixpanelFeatureFlagsManagementEntityBase } from '../MixpanelFeatureFlagsManagementEntityBase';
import type { MixpanelFeatureFlagsManagementSDK } from '../MixpanelFeatureFlagsManagementSDK';
import type { Control } from '../types';
import type { ListFeatureFlag, ListFeatureFlagLoadMatch } from '../MixpanelFeatureFlagsManagementTypes';
declare class ListFeatureFlagEntity extends MixpanelFeatureFlagsManagementEntityBase<ListFeatureFlag> {
    constructor(client: MixpanelFeatureFlagsManagementSDK, entopts: any);
    make(this: ListFeatureFlagEntity): ListFeatureFlagEntity;
    load(this: any, reqmatch?: ListFeatureFlagLoadMatch, ctrl?: Control): Promise<ListFeatureFlagEntity>;
}
export { ListFeatureFlagEntity };
