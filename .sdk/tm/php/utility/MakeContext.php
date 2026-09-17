<?php
declare(strict_types=1);

// MixpanelFeatureFlagsManagement SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class MixpanelFeatureFlagsManagementMakeContext
{
    public static function call(array $ctxmap, ?MixpanelFeatureFlagsManagementContext $basectx): MixpanelFeatureFlagsManagementContext
    {
        return new MixpanelFeatureFlagsManagementContext($ctxmap, $basectx);
    }
}
