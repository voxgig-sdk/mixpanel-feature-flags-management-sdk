# Typed models for the MixpanelFeatureFlagsManagement SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class FeatureFlagRequired(TypedDict):
    context: str
    key: str
    name: str
    ruleset: dict
    serving_method: str
    tags: list


class FeatureFlag(FeatureFlagRequired, total=False):
    data_group_id: str
    description: str
    experiment_id: str
    hash_salt: Any
    id: str
    is_experiment_active: bool
    reset_hash_salt: Any
    status: str
    workspace_id: str


class FeatureFlagLoadMatch(TypedDict):
    id: str
    project_id: int
    workspace_id: int


class FeatureFlagCreateDataRequired(TypedDict):
    project_id: int
    workspace_id: int
    context: str
    key: str
    name: str
    ruleset: dict
    serving_method: str
    tags: list


class FeatureFlagCreateData(FeatureFlagCreateDataRequired, total=False):
    data_group_id: str
    description: str
    experiment_id: str
    hash_salt: Any
    id: str
    is_experiment_active: bool
    reset_hash_salt: Any
    status: str


class FeatureFlagUpdateDataRequired(TypedDict):
    id: str
    project_id: int
    workspace_id: int


class FeatureFlagUpdateData(FeatureFlagUpdateDataRequired, total=False):
    context: str
    data_group_id: str
    description: str
    experiment_id: str
    hash_salt: Any
    is_experiment_active: bool
    key: str
    name: str
    reset_hash_salt: Any
    ruleset: dict
    serving_method: str
    status: str
    tags: list


class FeatureFlagRemoveMatch(TypedDict):
    id: str
    project_id: int
    workspace_id: int


class ListFeatureFlag(TypedDict):
    pass


class ListFeatureFlagLoadMatchRequired(TypedDict):
    project_id: int
    workspace_id: int


class ListFeatureFlagLoadMatch(ListFeatureFlagLoadMatchRequired, total=False):
    include_archived: str


class Workspace(TypedDict):
    pass
