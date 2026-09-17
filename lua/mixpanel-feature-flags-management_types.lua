-- Typed models for the MixpanelFeatureFlagsManagement SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class FeatureFlag
---@field context string
---@field data_group_id? string
---@field description? string
---@field experiment_id? string
---@field hash_salt? any
---@field id? string
---@field is_experiment_active? boolean
---@field key string
---@field name string
---@field reset_hash_salt? any
---@field ruleset table
---@field serving_method string
---@field status? string
---@field tags table
---@field workspace_id? string

---@class FeatureFlagLoadMatch
---@field id string
---@field project_id number
---@field workspace_id number

---@class FeatureFlagCreateData
---@field project_id number
---@field workspace_id number
---@field context string
---@field data_group_id? string
---@field description? string
---@field experiment_id? string
---@field hash_salt? any
---@field id? string
---@field is_experiment_active? boolean
---@field key string
---@field name string
---@field reset_hash_salt? any
---@field ruleset table
---@field serving_method string
---@field status? string
---@field tags table

---@class FeatureFlagUpdateData
---@field id string
---@field project_id number
---@field workspace_id number
---@field context? string
---@field data_group_id? string
---@field description? string
---@field experiment_id? string
---@field hash_salt? any
---@field is_experiment_active? boolean
---@field key? string
---@field name? string
---@field reset_hash_salt? any
---@field ruleset? table
---@field serving_method? string
---@field status? string
---@field tags? table

---@class FeatureFlagRemoveMatch
---@field id string
---@field project_id number
---@field workspace_id number

---@class ListFeatureFlag

---@class ListFeatureFlagLoadMatch
---@field project_id number
---@field workspace_id number
---@field include_archived? string

---@class Workspace

local M = {}

return M
