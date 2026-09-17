"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceEntity = void 0;
const MixpanelFeatureFlagsManagementEntityBase_1 = require("../MixpanelFeatureFlagsManagementEntityBase");
// TODO: needs Entity superclass
class WorkspaceEntity extends MixpanelFeatureFlagsManagementEntityBase_1.MixpanelFeatureFlagsManagementEntityBase {
    constructor(client, entopts) {
        super(client, entopts);
        this.name = 'workspace';
        this.name_ = 'workspace';
        this.Name = 'Workspace';
    }
    make() {
        return new WorkspaceEntity(this._client, this.entopts());
    }
}
exports.WorkspaceEntity = WorkspaceEntity;
//# sourceMappingURL=WorkspaceEntity.js.map