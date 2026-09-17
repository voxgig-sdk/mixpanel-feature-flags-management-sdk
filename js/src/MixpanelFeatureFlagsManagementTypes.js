// Typed models for the MixpanelFeatureFlagsManagement SDK (JSDoc typedefs).
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
// edit by hand.

/**
 * @typedef {Object} FeatureFlag
 * @property {string} context
 * @property {string} [data_group_id]
 * @property {string} [description]
 * @property {string} [experiment_id]
 * @property {*} [hash_salt]
 * @property {string} [id]
 * @property {boolean} [is_experiment_active]
 * @property {string} key
 * @property {string} name
 * @property {*} [reset_hash_salt]
 * @property {Object} ruleset
 * @property {string} serving_method
 * @property {string} [status]
 * @property {Array} tags
 * @property {string} [workspace_id]
 */

/**
 * @typedef {Object} FeatureFlagLoadMatch
 * @property {string} id
 * @property {number} project_id
 * @property {number} workspace_id
 */

/**
 * @typedef {Object} FeatureFlagCreateData
 * @property {number} project_id
 * @property {number} workspace_id
 * @property {string} context
 * @property {string} [data_group_id]
 * @property {string} [description]
 * @property {string} [experiment_id]
 * @property {*} [hash_salt]
 * @property {string} [id]
 * @property {boolean} [is_experiment_active]
 * @property {string} key
 * @property {string} name
 * @property {*} [reset_hash_salt]
 * @property {Object} ruleset
 * @property {string} serving_method
 * @property {string} [status]
 * @property {Array} tags
 */

/**
 * @typedef {Object} FeatureFlagUpdateData
 * @property {string} id
 * @property {number} project_id
 * @property {number} workspace_id
 * @property {string} [context]
 * @property {string} [data_group_id]
 * @property {string} [description]
 * @property {string} [experiment_id]
 * @property {*} [hash_salt]
 * @property {boolean} [is_experiment_active]
 * @property {string} [key]
 * @property {string} [name]
 * @property {*} [reset_hash_salt]
 * @property {Object} [ruleset]
 * @property {string} [serving_method]
 * @property {string} [status]
 * @property {Array} [tags]
 */

/**
 * @typedef {Object} FeatureFlagRemoveMatch
 * @property {string} id
 * @property {number} project_id
 * @property {number} workspace_id
 */

/**
 * @typedef {Object} ListFeatureFlag
 */

/**
 * @typedef {Object} ListFeatureFlagLoadMatch
 * @property {number} project_id
 * @property {number} workspace_id
 * @property {string} [include_archived]
 */

/**
 * @typedef {Object} Workspace
 */

