
import { inspect } from 'node:util'

import { MixpanelFeatureFlagsManagementEntityBase } from '../MixpanelFeatureFlagsManagementEntityBase'

import type {
  MixpanelFeatureFlagsManagementSDK,
} from '../MixpanelFeatureFlagsManagementSDK'


import type {
  Operation,
  Context,
  Control,
} from '../types'

import type {
  Workspace,
} from '../MixpanelFeatureFlagsManagementTypes'

// TODO: needs Entity superclass
class WorkspaceEntity extends MixpanelFeatureFlagsManagementEntityBase<Workspace> {

  constructor(client: MixpanelFeatureFlagsManagementSDK, entopts: any) {
    super(client, entopts)
    this.name = 'workspace'
    this.name_ = 'workspace'
    this.Name = 'Workspace'
  }


  make(this: WorkspaceEntity) {
    return new WorkspaceEntity(this._client, this.entopts())
  }







}


export {
  WorkspaceEntity
}
