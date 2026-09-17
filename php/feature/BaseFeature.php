<?php
declare(strict_types=1);

// MixpanelFeatureFlagsManagement SDK base feature

class MixpanelFeatureFlagsManagementBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(MixpanelFeatureFlagsManagementContext $ctx, array $options): void {}
    public function PostConstruct(MixpanelFeatureFlagsManagementContext $ctx): void {}
    public function PostConstructEntity(MixpanelFeatureFlagsManagementContext $ctx): void {}
    public function SetData(MixpanelFeatureFlagsManagementContext $ctx): void {}
    public function GetData(MixpanelFeatureFlagsManagementContext $ctx): void {}
    public function GetMatch(MixpanelFeatureFlagsManagementContext $ctx): void {}
    public function SetMatch(MixpanelFeatureFlagsManagementContext $ctx): void {}
    public function PrePoint(MixpanelFeatureFlagsManagementContext $ctx): void {}
    public function PreSpec(MixpanelFeatureFlagsManagementContext $ctx): void {}
    public function PreRequest(MixpanelFeatureFlagsManagementContext $ctx): void {}
    public function PreResponse(MixpanelFeatureFlagsManagementContext $ctx): void {}
    public function PreResult(MixpanelFeatureFlagsManagementContext $ctx): void {}
    public function PreDone(MixpanelFeatureFlagsManagementContext $ctx): void {}
    public function PreUnexpected(MixpanelFeatureFlagsManagementContext $ctx): void {}
}
