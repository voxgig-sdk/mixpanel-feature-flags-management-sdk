# FeatureFlag entity test

import json
import os
import time

import pytest

from mixpanelfeatureflagsmanagement_sdk.utility.voxgig_struct import voxgig_struct as vs
from mixpanelfeatureflagsmanagement_sdk import MixpanelFeatureFlagsManagementSDK
from mixpanelfeatureflagsmanagement_sdk.core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestFeatureFlagEntity:

    def test_should_create_instance(self):
        testsdk = MixpanelFeatureFlagsManagementSDK.test(None, None)
        ent = testsdk.FeatureFlag(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _feature_flag_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "update", "load", "remove"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "feature_flag." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set MIXPANEL_FEATURE_FLAGS_MANAGEMENT_TEST_FEATURE_FLAG_ENTID JSON to run live")
        client = setup["client"]

        # CREATE
        feature_flag_ref01_ent = client.FeatureFlag(None)
        feature_flag_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.feature_flag"), "feature_flag_ref01"))
        feature_flag_ref01_data["project_id"] = setup["idmap"]["project01"]
        feature_flag_ref01_data["workspace_id"] = setup["idmap"]["workspace01"]

        feature_flag_ref01_data = helpers.to_map(runner.entity_data(feature_flag_ref01_ent.create(feature_flag_ref01_data, None)))
        assert feature_flag_ref01_data is not None
        assert feature_flag_ref01_data["id"] is not None

        # UPDATE
        feature_flag_ref01_data_up0_up = {
            "id": feature_flag_ref01_data["id"],
            "project_id": setup["idmap"]["project_id"],
            "workspace_id": setup["idmap"]["workspace_id"],
        }

        feature_flag_ref01_markdef_up0_name = "context"
        feature_flag_ref01_markdef_up0_value = "Mark01-feature_flag_ref01_" + str(setup["now"])
        feature_flag_ref01_data_up0_up[feature_flag_ref01_markdef_up0_name] = feature_flag_ref01_markdef_up0_value

        feature_flag_ref01_resdata_up0 = helpers.to_map(runner.entity_data(feature_flag_ref01_ent.update(feature_flag_ref01_data_up0_up, None)))
        assert feature_flag_ref01_resdata_up0 is not None
        assert feature_flag_ref01_resdata_up0["id"] == feature_flag_ref01_data_up0_up["id"]
        assert feature_flag_ref01_resdata_up0[feature_flag_ref01_markdef_up0_name] == feature_flag_ref01_markdef_up0_value

        # LOAD
        feature_flag_ref01_match_dt0 = {
            "id": feature_flag_ref01_data["id"],
        }
        feature_flag_ref01_data_dt0_loaded = feature_flag_ref01_ent.load(feature_flag_ref01_match_dt0, None)
        feature_flag_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(feature_flag_ref01_data_dt0_loaded))
        assert feature_flag_ref01_data_dt0_load_result is not None
        assert feature_flag_ref01_data_dt0_load_result["id"] == feature_flag_ref01_data["id"]

        # REMOVE
        feature_flag_ref01_match_rm0 = {
            "id": feature_flag_ref01_data["id"],
        }
        feature_flag_ref01_ent.remove(feature_flag_ref01_match_rm0, None)



def _feature_flag_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/feature_flag/FeatureFlagTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = MixpanelFeatureFlagsManagementSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["feature_flag01", "feature_flag02", "feature_flag03", "project01", "project02", "project03", "workspace01", "workspace02", "workspace03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "MIXPANEL_FEATURE_FLAGS_MANAGEMENT_TEST_FEATURE_FLAG_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "MIXPANEL_FEATURE_FLAGS_MANAGEMENT_TEST_FEATURE_FLAG_ENTID": idmap,
        "MIXPANEL_FEATURE_FLAGS_MANAGEMENT_TEST_LIVE": "FALSE",
        "MIXPANEL_FEATURE_FLAGS_MANAGEMENT_TEST_EXPLAIN": "FALSE",
        "MIXPANEL_FEATURE_FLAGS_MANAGEMENT_APIKEY": "",
        "MIXPANEL_FEATURE_FLAGS_MANAGEMENT_SERVER_REGIONANDDOMAIN": "mixpanel",
    })

    idmap_resolved = helpers.to_map(
        env.get("MIXPANEL_FEATURE_FLAGS_MANAGEMENT_TEST_FEATURE_FLAG_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)
    if idmap_resolved.get("project_id") is None:
        idmap_resolved["project_id"] = idmap_resolved.get("project01")
    if idmap_resolved.get("workspace_id") is None:
        idmap_resolved["workspace_id"] = idmap_resolved.get("workspace01")

    if env.get("MIXPANEL_FEATURE_FLAGS_MANAGEMENT_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            # FIRST, so the generated fields below win: sdk-test-control.json's
            # test.client.options adds to the live client, it does not
            # redirect it.
            runner.live_client_options(),
            {
                "apikey": env.get("MIXPANEL_FEATURE_FLAGS_MANAGEMENT_APIKEY"),
                "server": {
                    "regionAndDomain": env.get("MIXPANEL_FEATURE_FLAGS_MANAGEMENT_SERVER_REGIONANDDOMAIN"),
                },
            },
            extra or {},
        ])
        client = MixpanelFeatureFlagsManagementSDK(helpers.to_map(merged_opts))

    _live = env.get("MIXPANEL_FEATURE_FLAGS_MANAGEMENT_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("MIXPANEL_FEATURE_FLAGS_MANAGEMENT_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
