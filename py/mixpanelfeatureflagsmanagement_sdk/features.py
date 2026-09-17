# MixpanelFeatureFlagsManagement SDK feature factory

from mixpanelfeatureflagsmanagement_sdk.feature.base_feature import MixpanelFeatureFlagsManagementBaseFeature
from mixpanelfeatureflagsmanagement_sdk.feature.debug_feature import MixpanelFeatureFlagsManagementDebugFeature
from mixpanelfeatureflagsmanagement_sdk.feature.idempotency_feature import MixpanelFeatureFlagsManagementIdempotencyFeature
from mixpanelfeatureflagsmanagement_sdk.feature.metrics_feature import MixpanelFeatureFlagsManagementMetricsFeature
from mixpanelfeatureflagsmanagement_sdk.feature.paging_feature import MixpanelFeatureFlagsManagementPagingFeature
from mixpanelfeatureflagsmanagement_sdk.feature.ratelimit_feature import MixpanelFeatureFlagsManagementRatelimitFeature
from mixpanelfeatureflagsmanagement_sdk.feature.retry_feature import MixpanelFeatureFlagsManagementRetryFeature
from mixpanelfeatureflagsmanagement_sdk.feature.test_feature import MixpanelFeatureFlagsManagementTestFeature
from mixpanelfeatureflagsmanagement_sdk.feature.timeout_feature import MixpanelFeatureFlagsManagementTimeoutFeature


_FEATURES = {
    "base": lambda: MixpanelFeatureFlagsManagementBaseFeature(),
    "debug": lambda: MixpanelFeatureFlagsManagementDebugFeature(),
    "idempotency": lambda: MixpanelFeatureFlagsManagementIdempotencyFeature(),
    "metrics": lambda: MixpanelFeatureFlagsManagementMetricsFeature(),
    "paging": lambda: MixpanelFeatureFlagsManagementPagingFeature(),
    "ratelimit": lambda: MixpanelFeatureFlagsManagementRatelimitFeature(),
    "retry": lambda: MixpanelFeatureFlagsManagementRetryFeature(),
    "test": lambda: MixpanelFeatureFlagsManagementTestFeature(),
    "timeout": lambda: MixpanelFeatureFlagsManagementTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
