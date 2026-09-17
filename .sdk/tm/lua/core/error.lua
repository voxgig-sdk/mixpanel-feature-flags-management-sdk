-- MixpanelFeatureFlagsManagement SDK error

local MixpanelFeatureFlagsManagementError = {}
MixpanelFeatureFlagsManagementError.__index = MixpanelFeatureFlagsManagementError


function MixpanelFeatureFlagsManagementError.new(code, msg, ctx)
  local self = setmetatable({}, MixpanelFeatureFlagsManagementError)
  self.is_sdk_error = true
  self.sdk = "MixpanelFeatureFlagsManagement"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function MixpanelFeatureFlagsManagementError:error()
  return self.msg
end


function MixpanelFeatureFlagsManagementError:__tostring()
  return self.msg
end


return MixpanelFeatureFlagsManagementError
