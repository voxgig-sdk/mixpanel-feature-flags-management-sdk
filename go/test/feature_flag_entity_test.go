package sdktest

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/mixpanel-feature-flags-management-sdk/go"
	"github.com/voxgig-sdk/mixpanel-feature-flags-management-sdk/go/core"

	vs "github.com/voxgig-sdk/mixpanel-feature-flags-management-sdk/go/utility/struct"
)

func TestFeatureFlagEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.FeatureFlag(nil)
		if ent == nil {
			t.Fatal("expected non-nil FeatureFlagEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := feature_flagBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "feature_flag." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set MIXPANEL_FEATURE_FLAGS_MANAGEMENT_TEST_FEATURE_FLAG_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		featureFlagRef01Ent := client.FeatureFlag(nil)
		featureFlagRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "feature_flag"}), "feature_flag_ref01"))
		featureFlagRef01Data["project_id"] = setup.idmap["project01"]
		featureFlagRef01Data["workspace_id"] = setup.idmap["workspace01"]

		featureFlagRef01DataResult, err := featureFlagRef01Ent.Create(featureFlagRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		featureFlagRef01Data = core.ToMapAny(entityData(featureFlagRef01DataResult))
		if featureFlagRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if featureFlagRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// UPDATE
		featureFlagRef01DataUp0Up := map[string]any{
			"id": featureFlagRef01Data["id"],
			"project_id": setup.idmap["project_id"],
			"workspace_id": setup.idmap["workspace_id"],
		}

		featureFlagRef01MarkdefUp0Name := "context"
		featureFlagRef01MarkdefUp0Value := fmt.Sprintf("Mark01-feature_flag_ref01_%d", setup.now)
		featureFlagRef01DataUp0Up[featureFlagRef01MarkdefUp0Name] = featureFlagRef01MarkdefUp0Value

		featureFlagRef01ResdataUp0Result, err := featureFlagRef01Ent.Update(featureFlagRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		featureFlagRef01ResdataUp0 := core.ToMapAny(entityData(featureFlagRef01ResdataUp0Result))
		if featureFlagRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if featureFlagRef01ResdataUp0["id"] != featureFlagRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}
		if featureFlagRef01ResdataUp0[featureFlagRef01MarkdefUp0Name] != featureFlagRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", featureFlagRef01MarkdefUp0Name, featureFlagRef01ResdataUp0[featureFlagRef01MarkdefUp0Name])
		}

		// LOAD
		featureFlagRef01MatchDt0 := map[string]any{
			"id": featureFlagRef01Data["id"],
		}
		featureFlagRef01DataDt0Loaded, err := featureFlagRef01Ent.Load(featureFlagRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		featureFlagRef01DataDt0LoadResult := core.ToMapAny(entityData(featureFlagRef01DataDt0Loaded))
		if featureFlagRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if featureFlagRef01DataDt0LoadResult["id"] != featureFlagRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

		// REMOVE
		featureFlagRef01MatchRm0 := map[string]any{
			"id": featureFlagRef01Data["id"],
		}
		_, err = featureFlagRef01Ent.Remove(featureFlagRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

	})
}

func feature_flagBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "feature_flag", "FeatureFlagTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read feature_flag test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse feature_flag test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"feature_flag01", "feature_flag02", "feature_flag03", "project01", "project02", "project03", "workspace01", "workspace02", "workspace03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("MIXPANEL_FEATURE_FLAGS_MANAGEMENT_TEST_FEATURE_FLAG_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"MIXPANEL_FEATURE_FLAGS_MANAGEMENT_TEST_FEATURE_FLAG_ENTID": idmap,
		"MIXPANEL_FEATURE_FLAGS_MANAGEMENT_TEST_LIVE":      "FALSE",
		"MIXPANEL_FEATURE_FLAGS_MANAGEMENT_TEST_EXPLAIN":   "FALSE",
		"MIXPANEL_FEATURE_FLAGS_MANAGEMENT_APIKEY":         "",
		"MIXPANEL_FEATURE_FLAGS_MANAGEMENT_SERVER_REGIONANDDOMAIN": "mixpanel",
	})

	idmapResolved := core.ToMapAny(env["MIXPANEL_FEATURE_FLAGS_MANAGEMENT_TEST_FEATURE_FLAG_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}
	// Add project_id alias for update test.
	if idmapResolved["project_id"] == nil {
		idmapResolved["project_id"] = idmapResolved["project01"]
	}
	// Add workspace_id alias for update test.
	if idmapResolved["workspace_id"] == nil {
		idmapResolved["workspace_id"] = idmapResolved["workspace01"]
	}

	if env["MIXPANEL_FEATURE_FLAGS_MANAGEMENT_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
				"apikey": env["MIXPANEL_FEATURE_FLAGS_MANAGEMENT_APIKEY"],
				"server": map[string]any{
					"regionAndDomain": env["MIXPANEL_FEATURE_FLAGS_MANAGEMENT_SERVER_REGIONANDDOMAIN"],
				},
			},
			extraOpts,
		})
		client = sdk.NewMixpanelFeatureFlagsManagementSDK(core.ToMapAny(mergedOpts))
	}

	live := env["MIXPANEL_FEATURE_FLAGS_MANAGEMENT_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["MIXPANEL_FEATURE_FLAGS_MANAGEMENT_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
