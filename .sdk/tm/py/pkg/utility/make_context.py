# MixpanelFeatureFlagsManagement SDK utility: make_context

from projectname_sdk.core.context import MixpanelFeatureFlagsManagementContext


def make_context_util(ctxmap, basectx):
    return MixpanelFeatureFlagsManagementContext(ctxmap, basectx)
