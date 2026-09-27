// Typed models for the MixpanelFeatureFlagsManagement SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface FeatureFlag {
  context: string
  data_group_id?: string
  description?: string
  experiment_id?: string
  hash_salt?: any
  id?: string
  is_experiment_active?: boolean
  key: string
  name: string
  reset_hash_salt?: any
  ruleset: Record<string, any>
  serving_method: string
  status?: string
  tags: any[]
  workspace_id?: string
}

export interface FeatureFlagLoadMatch {
  id: string
  project_id: number
  workspace_id: number
}

export interface FeatureFlagCreateData {
  project_id: number
  workspace_id: number
  context: string
  data_group_id?: string
  description?: string
  experiment_id?: string
  hash_salt?: any
  id?: string
  is_experiment_active?: boolean
  key: string
  name: string
  reset_hash_salt?: any
  ruleset: Record<string, any>
  serving_method: string
  status?: string
  tags: any[]
}

export interface FeatureFlagUpdateData {
  id: string
  project_id: number
  workspace_id: number
  context?: string
  data_group_id?: string
  description?: string
  experiment_id?: string
  hash_salt?: any
  is_experiment_active?: boolean
  key?: string
  name?: string
  reset_hash_salt?: any
  ruleset?: Record<string, any>
  serving_method?: string
  status?: string
  tags?: any[]
}

export interface FeatureFlagRemoveMatch {
  id: string
  project_id: number
  workspace_id: number
}

export interface ListFeatureFlag {
}

export interface ListFeatureFlagLoadMatch {
  project_id: number
  workspace_id: number
  include_archived?: string
}

