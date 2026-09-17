# MixpanelFeatureFlagsManagement SDK exists test

import pytest
from mixpanelfeatureflagsmanagement_sdk import MixpanelFeatureFlagsManagementSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = MixpanelFeatureFlagsManagementSDK.test(None, None)
        assert testsdk is not None
