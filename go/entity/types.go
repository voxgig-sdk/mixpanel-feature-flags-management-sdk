// Typed models for the MixpanelFeatureFlagsManagement SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/mixpanel-feature-flags-management-sdk/go/core"
)

// FeatureFlag is the typed data model for the feature_flag entity.
type FeatureFlag struct {
}

// FeatureFlagLoadMatch is the typed request payload for FeatureFlag.LoadTyped.
type FeatureFlagLoadMatch struct {
	Id string `json:"id"`
	ProjectId int `json:"project_id"`
	WorkspaceId int `json:"workspace_id"`
}

// FeatureFlagCreateData is the typed request payload for FeatureFlag.CreateTyped.
type FeatureFlagCreateData struct {
	ProjectId int `json:"project_id"`
	WorkspaceId int `json:"workspace_id"`
	Context string `json:"context"`
	DataGroupId *string `json:"data_group_id,omitempty"`
	Description *string `json:"description,omitempty"`
	ExperimentId *string `json:"experiment_id,omitempty"`
	HashSalt *any `json:"hash_salt,omitempty"`
	Id *string `json:"id,omitempty"`
	IsExperimentActive *bool `json:"is_experiment_active,omitempty"`
	Key string `json:"key"`
	Name string `json:"name"`
	ResetHashSalt *any `json:"reset_hash_salt,omitempty"`
	Ruleset map[string]any `json:"ruleset"`
	ServingMethod string `json:"serving_method"`
	Status *string `json:"status,omitempty"`
	Tags []any `json:"tags"`
}

// FeatureFlagUpdateData is the typed request payload for FeatureFlag.UpdateTyped.
type FeatureFlagUpdateData struct {
	Id string `json:"id"`
	ProjectId int `json:"project_id"`
	WorkspaceId int `json:"workspace_id"`
	Context *string `json:"context,omitempty"`
	DataGroupId *string `json:"data_group_id,omitempty"`
	Description *string `json:"description,omitempty"`
	ExperimentId *string `json:"experiment_id,omitempty"`
	HashSalt *any `json:"hash_salt,omitempty"`
	IsExperimentActive *bool `json:"is_experiment_active,omitempty"`
	Key *string `json:"key,omitempty"`
	Name *string `json:"name,omitempty"`
	ResetHashSalt *any `json:"reset_hash_salt,omitempty"`
	Ruleset *map[string]any `json:"ruleset,omitempty"`
	ServingMethod *string `json:"serving_method,omitempty"`
	Status *string `json:"status,omitempty"`
	Tags *[]any `json:"tags,omitempty"`
}

// FeatureFlagRemoveMatch is the typed request payload for FeatureFlag.RemoveTyped.
type FeatureFlagRemoveMatch struct {
	Id string `json:"id"`
	ProjectId int `json:"project_id"`
	WorkspaceId int `json:"workspace_id"`
}

// ListFeatureFlag is the typed data model for the list_feature_flag entity.
type ListFeatureFlag struct {
}

// ListFeatureFlagLoadMatch is the typed request payload for ListFeatureFlag.LoadTyped.
type ListFeatureFlagLoadMatch struct {
	ProjectId int `json:"project_id"`
	WorkspaceId int `json:"workspace_id"`
	IncludeArchived *string `json:"include_archived,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
