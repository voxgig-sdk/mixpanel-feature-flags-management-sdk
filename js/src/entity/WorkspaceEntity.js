
const { inspect } = require('node:util')

const { MixpanelFeatureFlagsManagementEntityBase } = require('../MixpanelFeatureFlagsManagementEntityBase')


// TODO: needs Entity superclass
class WorkspaceEntity extends MixpanelFeatureFlagsManagementEntityBase {

  constructor(client, entopts) {
    super(client, entopts)
    this.name = 'workspace'
    this.name_ = 'workspace'
    this.Name = 'Workspace'
  }


  make() {
    return new WorkspaceEntity(this._client, this.entopts())
  }







}


module.exports = {
  WorkspaceEntity
}
