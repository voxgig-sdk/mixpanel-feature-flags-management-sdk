<?php
declare(strict_types=1);

// Typed models for the MixpanelFeatureFlagsManagement SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** FeatureFlag entity data model. */
class FeatureFlag
{
    public string $context;
    public ?string $data_group_id = null;
    public ?string $description = null;
    public ?string $experiment_id = null;
    public mixed $hash_salt = null;
    public ?string $id = null;
    public ?bool $is_experiment_active = null;
    public string $key;
    public string $name;
    public mixed $reset_hash_salt = null;
    public array $ruleset;
    public string $serving_method;
    public ?string $status = null;
    public array $tags;
    public ?string $workspace_id = null;
}

/** Request payload for FeatureFlag#load. */
class FeatureFlagLoadMatch
{
    public string $id;
    public int $project_id;
    public int $workspace_id;
}

/** Request payload for FeatureFlag#create. */
class FeatureFlagCreateData
{
    public int $project_id;
    public int $workspace_id;
    public string $context;
    public ?string $data_group_id = null;
    public ?string $description = null;
    public ?string $experiment_id = null;
    public mixed $hash_salt = null;
    public ?string $id = null;
    public ?bool $is_experiment_active = null;
    public string $key;
    public string $name;
    public mixed $reset_hash_salt = null;
    public array $ruleset;
    public string $serving_method;
    public ?string $status = null;
    public array $tags;
}

/** Request payload for FeatureFlag#update. */
class FeatureFlagUpdateData
{
    public string $id;
    public int $project_id;
    public int $workspace_id;
    public ?string $context = null;
    public ?string $data_group_id = null;
    public ?string $description = null;
    public ?string $experiment_id = null;
    public mixed $hash_salt = null;
    public ?bool $is_experiment_active = null;
    public ?string $key = null;
    public ?string $name = null;
    public mixed $reset_hash_salt = null;
    public ?array $ruleset = null;
    public ?string $serving_method = null;
    public ?string $status = null;
    public ?array $tags = null;
}

/** Request payload for FeatureFlag#remove. */
class FeatureFlagRemoveMatch
{
    public string $id;
    public int $project_id;
    public int $workspace_id;
}

/** ListFeatureFlag entity data model. */
class ListFeatureFlag
{
}

/** Request payload for ListFeatureFlag#load. */
class ListFeatureFlagLoadMatch
{
    public int $project_id;
    public int $workspace_id;
    public ?string $include_archived = null;
}

/** Workspace entity data model. */
class Workspace
{
}

