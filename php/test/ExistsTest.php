<?php
declare(strict_types=1);

// MixpanelFeatureFlagsManagement SDK exists test

require_once __DIR__ . '/../mixpanelfeatureflagsmanagement_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = MixpanelFeatureFlagsManagementSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
