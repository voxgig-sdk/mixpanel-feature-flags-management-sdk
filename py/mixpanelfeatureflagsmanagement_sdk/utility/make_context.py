# MixpanelFeatureFlagsManagement SDK utility: make_context

from mixpanelfeatureflagsmanagement_sdk.core.context import MixpanelFeatureFlagsManagementContext


def make_context_util(ctxmap, basectx):
    return MixpanelFeatureFlagsManagementContext(ctxmap, basectx)
