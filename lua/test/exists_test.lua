-- MixpanelFeatureFlagsManagement SDK exists test

local sdk = require("mixpanel-feature-flags-management_sdk")

describe("MixpanelFeatureFlagsManagementSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
