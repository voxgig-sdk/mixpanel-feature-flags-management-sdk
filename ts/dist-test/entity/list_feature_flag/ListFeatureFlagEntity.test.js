"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('ListFeatureFlagEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when MIXPANEL_FEATURE_FLAGS_MANAGEMENT_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('MIXPANEL_FEATURE_FLAGS_MANAGEMENT_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.MixpanelFeatureFlagsManagementSDK.test();
        const ent = testsdk.ListFeatureFlag();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.MIXPANEL_FEATURE_FLAGS_MANAGEMENT_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'list_feature_flag.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [], "name": "list_feature_flag", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "project_id", "orig": "project_id", "reqd": true, "type": "`$INTEGER`", "index$": 0 }, { "active": true, "kind": "param", "name": "workspace_id", "orig": "workspace_id", "reqd": true, "type": "`$INTEGER`", "index$": 1 }], "query": [{ "active": true, "kind": "query", "name": "include_archived", "orig": "include_archived", "reqd": false, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /projects/{project_id}/workspaces/{workspace_id}/feature-flags", "json": "{\"operationId\":\"list-feature-flags\",\"parameters\":[{\"in\":\"path\",\"name\":\"project_id\",\"required\":true,\"schema\":{\"type\":\"integer\"}},{\"in\":\"path\",\"name\":\"workspace_id\",\"required\":true,\"schema\":{\"type\":\"integer\"}},{\"description\":\"Whether to include archived (soft-deleted) feature flags. Defaults to false.\",\"in\":\"query\",\"name\":\"include_archived\",\"schema\":{\"enum\":[\"true\",\"false\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"anyOf\":[{\"additionalProperties\":false,\"properties\":{\"results\":{\"items\":{\"additionalProperties\":false,\"properties\":{\"allow_staff_override\":{\"default\":false,\"title\":\"\",\"type\":\"boolean\"},\"can_pin\":{\"default\":false,\"title\":\"\",\"type\":\"boolean\"},\"can_share\":{\"default\":false,\"title\":\"\",\"type\":\"boolean\"},\"can_update_basic\":{\"default\":false,\"title\":\"\",\"type\":\"boolean\"},\"can_view\":{\"default\":false,\"title\":\"\",\"type\":\"boolean\"},\"content_environments_id\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"default\":null,\"title\":\"\"},\"content_type\":{\"const\":\"feature-flags\",\"title\":\"\",\"type\":\"string\"},\"context\":{\"maxLength\":255,\"minLength\":1,\"title\":\"\",\"type\":\"string\"},\"created\":{\"format\":\"date-time\",\"title\":\"\",\"type\":\"string\"},\"creator_email\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"\"},\"creator_id\":{\"anyOf\":[{\"type\":\"integer\"},{\"type\":\"null\"}],\"title\":\"\"},\"creator_name\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"\"},\"data_group_id\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"integer\"},{\"type\":\"null\"}],\"default\":null,\"title\":\"\"},\"deleted\":{\"anyOf\":[{\"format\":\"date-time\",\"type\":\"string\"},{\"type\":\"null\"}],\"default\":null,\"title\":\"\"},\"description\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"default\":null,\"title\":\"\"},\"enabled_at\":{\"anyOf\":[{\"format\":\"date-time\",\"type\":\"string\"},{\"type\":\"null\"}],\"default\":null,\"title\":\"\"},\"experiment_id\":{\"anyOf\":[{\"format\":\"uuid4\",\"type\":\"string\"},{\"type\":\"null\"}],\"default\":null,\"title\":\"\"},\"hash_salt\":{\"anyOf\":[{\"maxLength\":32,\"minLength\":32,\"type\":\"string\"},{\"type\":\"null\"}],\"default\":null,\"title\":\"\"},\"id\":{\"format\":\"uuid4\",\"title\":\"\",\"type\":\"string\"},\"is_experiment_active\":{\"anyOf\":[{\"type\":\"boolean\"},{\"type\":\"null\"}],\"default\":null,\"title\":\"\"},\"is_favorited\":{\"anyOf\":[{\"type\":\"boolean\"},{\"type\":\"null\"}],\"default\":null,\"title\":\"\"},\"is_shared_with_project\":{\"default\":false,\"title\":\"\",\"type\":\"boolean\"},\"is_superadmin\":{\"default\":false,\"title\":\"\",\"type\":\"boolean\"},\"key\":{\"maxLength\":255,\"minLength\":1,\"title\":\"\",\"type\":\"string\"},\"last_modified_by_email\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"default\":null,\"title\":\"\"},\"last_modified_by_id\":{\"anyOf\":[{\"type\":\"integer\"},{\"type\":\"null\"}],\"default\":null,\"title\":\"\"},\"last_modified_by_name\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"default\":null,\"title\":\"\"},\"modified\":{\"format\":\"date-time\",\"title\":\"\",\"type\":\"string\"},\"name\":{\"maxLength\":255,\"minLength\":1,\"title\":\"\",\"type\":\"string\"},\"pinned_date\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"default\":null,\"title\":\"\"},\"project_id\":{\"title\":\"\",\"type\":\"integer\"},\"project_name\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"default\":null,\"title\":\"\"},\"reset_hash_salt\":{\"anyOf\":[{\"type\":\"boolean\"},{\"type\":\"null\"}],\"default\":null,\"title\":\"\"},\"ruleset\":{\"additionalProperties\":false,\"properties\":{\"rollout\":{\"items\":{\"additionalProperties\":false,\"properties\":{\"cohort_definition\":{\"anyOf\":[{\"additionalProperties\":true,\"type\":\"object\"},{\"type\":\"null\"}],\"title\":\"\"},\"cohort_hash\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"default\":null,\"title\":\"\"},\"name\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"default\":null,\"title\":\"\"},\"rollout_percentage\":{\"maximum\":1,\"minimum\":0,\"title\":\"\",\"type\":\"number\"},\"runtime_evaluation_definition\":{\"anyOf\":[{\"additionalProperties\":true,\"type\":\"object\"},{\"type\":\"null\"}],\"title\":\"\"},\"runtime_evaluation_rule\":{\"anyOf\":[{\"additionalProperties\":true,\"type\":\"object\"},{\"type\":\"null\"}],\"default\":null,\"title\":\"\"},\"runtime_event_rule\":{\"anyOf\":[{\"additionalProperties\":false,\"description\":\"Configuration for first-time event targeting in rollout groups.\",\"properties\":{\"duration\":{\"anyOf\":[{\"enum\":[\"end_of_session\",\"indefinitely\"],\"title\":\"FirstTimeEventDuration\",\"type\":\"string\"},{\"type\":\"null\"}],\"default\":null,\"title\":\"\"},\"event_name\":{\"title\":\"\",\"type\":\"string\"},\"property_filters\":{\"anyOf\":[{\"additionalProperties\":true,\"type\":\"object\"},{\"type\":\"null\"}],\"default\":null,\"title\":\"\"},\"time_window\":{\"enum\":[\"while_flag_enabled\"],\"title\":\"RuntimeEventTimeWindow\",\"type\":\"string\"}},\"required\":[\"event_name\",\"time_window\"],\"title\":\"RuntimeEventRule\",\"type\":\"object\"},{\"type\":\"null\"}],\"default\":null,\"title\":\"\"},\"variant_override\":{\"anyOf\":[{\"additionalProperties\":false,\"description\":\"A pointer to the variant defined under ruleset.variants[<key>]\",\"properties\":{\"key\":{\"title\":\"\",\"type\":\"string\"}},\"required\":[\"key\"],\"title\":\"ManagementVariantOverride\",\"type\":\"object\"},{\"type\":\"null\"}],\"default\":null,\"title\":\"\"},\"variant_splits\":{\"additionalProperties\":{\"type\":\"number\"},\"title\":\"\",\"type\":\"object\"}},\"required\":[\"rollout_percentage\",\"variant_splits\"],\"title\":\"ManagementRollout\",\"type\":\"object\"},\"title\":\"\",\"type\":\"array\"},\"test\":{\"anyOf\":[{\"additionalProperties\":{\"additionalProperties\":{\"type\":\"string\"},\"type\":\"object\"},\"type\":\"object\"},{\"type\":\"null\"}],\"default\":null,\"title\":\"\"},\"variants\":{\"items\":{\"additionalProperties\":false,\"properties\":{\"description\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"default\":null,\"title\":\"\"},\"is_control\":{\"title\":\"\",\"type\":\"boolean\"},\"is_sticky\":{\"default\":false,\"title\":\"\",\"type\":\"boolean\"},\"key\":{\"title\":\"\",\"type\":\"string\"},\"split\":{\"maximum\":1,\"minimum\":0,\"title\":\"\",\"type\":\"number\"},\"value\":{\"anyOf\":[{\"type\":\"boolean\"},{\"maxLength\":32768,\"type\":\"string\"},{}],\"title\":\"\"}},\"required\":[\"key\",\"value\",\"is_control\",\"split\"],\"title\":\"ManagementVariant\",\"type\":\"object\"},\"maxItems\":11,\"title\":\"\",\"type\":\"array\"}},\"required\":[\"variants\",\"rollout\"],\"title\":\"ManagementRuleSet\",\"type\":\"object\"},\"serving_method\":{\"enum\":[\"client\",\"server\",\"remote_or_local\",\"remote_only\"],\"title\":\"ServingMethod\",\"type\":\"string\"},\"status\":{\"default\":\"disabled\",\"enum\":[\"enabled\",\"disabled\",\"archived\"],\"title\":\"FeatureFlagStatus\",\"type\":\"string\"},\"tags\":{\"items\":{\"type\":\"string\"},\"title\":\"\",\"type\":\"array\"},\"workspace_id\":{\"anyOf\":[{\"type\":\"integer\"},{\"type\":\"null\"}],\"default\":null,\"title\":\"\"}},\"required\":[\"name\",\"key\",\"tags\",\"context\",\"serving_method\",\"ruleset\",\"id\",\"project_id\",\"content_type\",\"created\",\"creator_id\",\"creator_name\",\"creator_email\",\"modified\"],\"title\":\"FeatureFlagApiResponse\",\"type\":\"object\"},\"title\":\"\",\"type\":\"array\"},\"status\":{\"title\":\"\",\"type\":\"string\"}},\"required\":[\"status\",\"results\"],\"title\":\"ListFeatureFlagApiResponse\",\"type\":\"object\"},{\"additionalProperties\":false,\"properties\":{\"error\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"object\"}],\"title\":\"\"},\"status\":{\"const\":\"error\",\"title\":\"\",\"type\":\"string\"},\"type\":{\"title\":\"\",\"type\":\"string\"}},\"required\":[\"status\",\"type\",\"error\"],\"title\":\"ManagementApiErrorResponse\",\"type\":\"object\"}]}}},\"description\":\"Success\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Details about the error that occurred\",\"type\":\"string\"},\"status\":{\"enum\":[\"error\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized\"},\"403\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Details about the error that occurred\",\"type\":\"string\"},\"status\":{\"enum\":[\"error\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Forbidden\"}},\"security\":[{\"ServiceAccount\":[]}],\"securitySchemes\":{\"OAuthToken\":{\"description\":\"OAuth Token\",\"scheme\":\"bearer\",\"type\":\"http\"},\"ProjectSecret\":{\"description\":\"Project Secret\",\"scheme\":\"basic\",\"type\":\"http\"},\"ServiceAccount\":{\"description\":\"Service Account\",\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/projects/{project_id}/workspaces/{workspace_id}/feature-flags", "segments": [{ "lit": "projects" }, { "var": "project_id" }, { "lit": "workspaces" }, { "var": "workspace_id" }, { "lit": "feature-flags" }], "select": { "exist": ["include_archived", "project_id", "workspace_id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [["project", "workspace"]] }, "key$": "list_feature_flag", "name__orig": "list_feature_flag", "Name": "ListFeatureFlag", "name_": "list_feature_flag", "name-": "list-feature-flag", "NAME": "LIST_FEATURE_FLAG", "index$": 1 }, { "active": true, "entity": "list_feature_flag", "key$": "BasicListFeatureFlagFlow", "kind": "basic", "name": "BasicListFeatureFlagFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "list_feature_flag_ref01", "srcdatavar": "list_feature_flag_ref01_data", "suffix": "_dt0" }, "match": { "id": "list_feature_flag01", "project_id": "project01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-list_feature_flag_ref01" } }], "index$": 0 }] }, 'ListFeatureFlag');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let list_feature_flag_ref01_data = Object.values(setup.data.existing.list_feature_flag)[0];
        // LOAD: skipped — no entity id field and load requires path params.
        // Entity-var is declared here so later flow steps still compile.
        const list_feature_flag_ref01_ent = client.ListFeatureFlag();
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/list_feature_flag/ListFeatureFlagTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.MixpanelFeatureFlagsManagementSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['list_feature_flag01', 'list_feature_flag02', 'list_feature_flag03', 'project01', 'project02', 'project03', 'workspace01', 'workspace02', 'workspace03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'MIXPANEL_FEATURE_FLAGS_MANAGEMENT_TEST_LIST_FEATURE_FLAG_ENTID': idmap,
        'MIXPANEL_FEATURE_FLAGS_MANAGEMENT_TEST_LIVE': 'FALSE',
        'MIXPANEL_FEATURE_FLAGS_MANAGEMENT_TEST_EXPLAIN': 'FALSE',
        'MIXPANEL_FEATURE_FLAGS_MANAGEMENT_APIKEY': '',
        'MIXPANEL_FEATURE_FLAGS_MANAGEMENT_SECRET': '',
        'MIXPANEL_FEATURE_FLAGS_MANAGEMENT_SERVER_REGIONANDDOMAIN': "mixpanel",
    });
    idmap = env['MIXPANEL_FEATURE_FLAGS_MANAGEMENT_TEST_LIST_FEATURE_FLAG_ENTID'];
    const live = 'TRUE' === env.MIXPANEL_FEATURE_FLAGS_MANAGEMENT_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['MIXPANEL_FEATURE_FLAGS_MANAGEMENT_TEST_LIST_FEATURE_FLAG_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.MixpanelFeatureFlagsManagementSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.MIXPANEL_FEATURE_FLAGS_MANAGEMENT_APIKEY,
                secret: env.MIXPANEL_FEATURE_FLAGS_MANAGEMENT_SECRET,
                server: {
                    regionAndDomain: env.MIXPANEL_FEATURE_FLAGS_MANAGEMENT_SERVER_REGIONANDDOMAIN,
                },
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.MIXPANEL_FEATURE_FLAGS_MANAGEMENT_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=ListFeatureFlagEntity.test.js.map