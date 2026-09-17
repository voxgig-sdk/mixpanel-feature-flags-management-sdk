import { MixpanelFeatureFlagsManagementEntityBase } from '../MixpanelFeatureFlagsManagementEntityBase';
import type { MixpanelFeatureFlagsManagementSDK } from '../MixpanelFeatureFlagsManagementSDK';
import type { Control } from '../types';
import type { FeatureFlag, FeatureFlagLoadMatch, FeatureFlagCreateData, FeatureFlagUpdateData, FeatureFlagRemoveMatch } from '../MixpanelFeatureFlagsManagementTypes';
declare class FeatureFlagEntity extends MixpanelFeatureFlagsManagementEntityBase<FeatureFlag> {
    constructor(client: MixpanelFeatureFlagsManagementSDK, entopts: any);
    make(this: FeatureFlagEntity): FeatureFlagEntity;
    load(this: any, reqmatch?: FeatureFlagLoadMatch, ctrl?: Control): Promise<FeatureFlagEntity>;
    create(this: any, reqdata?: FeatureFlagCreateData, ctrl?: Control): Promise<FeatureFlagEntity>;
    update(this: any, reqdata?: FeatureFlagUpdateData, ctrl?: Control): Promise<FeatureFlagEntity>;
    remove(this: any, reqmatch?: FeatureFlagRemoveMatch, ctrl?: Control): Promise<FeatureFlagEntity>;
}
export { FeatureFlagEntity };
