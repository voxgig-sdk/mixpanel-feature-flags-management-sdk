"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const DebugFeature_1 = require("./feature/debug/DebugFeature");
const IdempotencyFeature_1 = require("./feature/idempotency/IdempotencyFeature");
const MetricsFeature_1 = require("./feature/metrics/MetricsFeature");
const PagingFeature_1 = require("./feature/paging/PagingFeature");
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    debug: DebugFeature_1.DebugFeature,
    idempotency: IdempotencyFeature_1.IdempotencyFeature,
    metrics: MetricsFeature_1.MetricsFeature,
    paging: PagingFeature_1.PagingFeature,
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'MixpanelFeatureFlagsManagement',
        slug: "mixpanel-feature-flags-management",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        debug: {
            "options": {
                "active": false,
                "max": 100,
                "redact": [
                    "authorization",
                    "cookie",
                    "set-cookie",
                    "api-key",
                    "apikey",
                    "x-api-key",
                    "idempotency-key"
                ]
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "onEntry": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "none"
        },
        idempotency: {
            "options": {
                "active": false,
                "header": "Idempotency-Key",
                "methods": [
                    "POST",
                    "PUT",
                    "PATCH",
                    "DELETE"
                ],
                "ops": [
                    "create",
                    "update",
                    "remove"
                ]
            },
            "optspec": {
                "keygen": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "none"
        },
        metrics: {
            "options": {
                "active": false
            },
            "optspec": {
                "now": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "none"
        },
        paging: {
            "options": {
                "active": false,
                "afterVar": "after",
                "cursorParam": "cursor",
                "firstVar": "first",
                "limitParam": "limit",
                "pageParam": "page",
                "startPage": 1
            },
            "optspec": {
                "limit": "`$NUMBER`",
                "ops": "`$LIST`"
            },
            "strict": false,
            "transport": "none"
        },
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://{regionAndDomain}.com/api/app",
        server: {
            "regionAndDomain": "mixpanel",
        },
        auth: {
            prefix: 'Basic',
            basic: true,
        },
        headers: {
            "content-type": "application/json"
        },
        entity: {
            feature_flag: {},
            list_feature_flag: {},
            workspace: {},
        }
    };
    entity = {
        "feature_flag": {
            "fields": [
                {
                    "name": "context",
                    "req": true,
                    "type": "`$STRING`"
                },
                {
                    "name": "data_group_id",
                    "type": "`$STRING`",
                    "union": {
                        "branches": 2,
                        "count": 1,
                        "depth": 0
                    }
                },
                {
                    "name": "description",
                    "type": "`$STRING`"
                },
                {
                    "name": "experiment_id",
                    "type": "`$STRING`"
                },
                {
                    "name": "hash_salt",
                    "type": "`$ANY`"
                },
                {
                    "name": "id",
                    "type": "`$STRING`"
                },
                {
                    "name": "is_experiment_active",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "key",
                    "req": true,
                    "type": "`$STRING`"
                },
                {
                    "name": "name",
                    "req": true,
                    "type": "`$STRING`"
                },
                {
                    "name": "reset_hash_salt",
                    "type": "`$ANY`"
                },
                {
                    "name": "ruleset",
                    "req": true,
                    "type": "`$OBJECT`",
                    "union": {
                        "branches": 3,
                        "count": 1,
                        "depth": 5
                    }
                },
                {
                    "name": "serving_method",
                    "req": true,
                    "type": "`$STRING`"
                },
                {
                    "name": "status",
                    "type": "`$STRING`"
                },
                {
                    "name": "tags",
                    "req": true,
                    "type": "`$ARRAY`"
                },
                {
                    "name": "workspace_id",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "feature_flag",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "project_id",
                                        "orig": "project_id",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "param",
                                        "name": "workspace_id",
                                        "orig": "workspace_id",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "POST",
                            "orig": "/projects/{project_id}/workspaces/{workspace_id}/feature-flags",
                            "segments": [
                                {
                                    "lit": "projects"
                                },
                                {
                                    "var": "project_id"
                                },
                                {
                                    "lit": "workspaces"
                                },
                                {
                                    "var": "workspace_id"
                                },
                                {
                                    "lit": "feature-flags"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "project_id",
                                    "workspace_id"
                                ]
                            },
                            "transform": {
                                "req": {
                                    "context": "`reqdata.context`",
                                    "data_group_id": "`reqdata.data_group_id`",
                                    "description": "`reqdata.description`",
                                    "experiment_id": "`reqdata.experiment_id`",
                                    "hash_salt": "`reqdata.hash_salt`",
                                    "is_experiment_active": "`reqdata.is_experiment_active`",
                                    "key": "`reqdata.key`",
                                    "name": "`reqdata.name`",
                                    "reset_hash_salt": "`reqdata.reset_hash_salt`",
                                    "ruleset": "`reqdata.ruleset`",
                                    "serving_method": "`reqdata.serving_method`",
                                    "status": "`reqdata.status`",
                                    "tags": "`reqdata.tag`",
                                    "workspace_id": "`reqdata.workspace_id`"
                                },
                                "res": "`body`"
                            },
                            "parts": [
                                "projects",
                                "{project_id}",
                                "workspaces",
                                "{workspace_id}",
                                "feature-flags"
                            ]
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "flag_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "param",
                                        "name": "project_id",
                                        "orig": "project_id",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "param",
                                        "name": "workspace_id",
                                        "orig": "workspace_id",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/projects/{project_id}/workspaces/{workspace_id}/feature-flags/{flag_id}",
                            "rename": {
                                "param": {
                                    "flag_id": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "projects"
                                },
                                {
                                    "var": "project_id"
                                },
                                {
                                    "lit": "workspaces"
                                },
                                {
                                    "var": "workspace_id"
                                },
                                {
                                    "lit": "feature-flags"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id",
                                    "project_id",
                                    "workspace_id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "projects",
                                "{project_id}",
                                "workspaces",
                                "{workspace_id}",
                                "feature-flags",
                                "{id}"
                            ]
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "flag_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "param",
                                        "name": "project_id",
                                        "orig": "project_id",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "param",
                                        "name": "workspace_id",
                                        "orig": "workspace_id",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/projects/{project_id}/workspaces/{workspace_id}/feature-flags/{flag_id}",
                            "rename": {
                                "param": {
                                    "flag_id": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "projects"
                                },
                                {
                                    "var": "project_id"
                                },
                                {
                                    "lit": "workspaces"
                                },
                                {
                                    "var": "workspace_id"
                                },
                                {
                                    "lit": "feature-flags"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id",
                                    "project_id",
                                    "workspace_id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "projects",
                                "{project_id}",
                                "workspaces",
                                "{workspace_id}",
                                "feature-flags",
                                "{id}"
                            ]
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "flag_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "param",
                                        "name": "project_id",
                                        "orig": "project_id",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "param",
                                        "name": "workspace_id",
                                        "orig": "workspace_id",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "PUT",
                            "orig": "/projects/{project_id}/workspaces/{workspace_id}/feature-flags/{flag_id}",
                            "rename": {
                                "param": {
                                    "flag_id": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "projects"
                                },
                                {
                                    "var": "project_id"
                                },
                                {
                                    "lit": "workspaces"
                                },
                                {
                                    "var": "workspace_id"
                                },
                                {
                                    "lit": "feature-flags"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id",
                                    "project_id",
                                    "workspace_id"
                                ]
                            },
                            "transform": {
                                "req": {
                                    "context": "`reqdata.context`",
                                    "data_group_id": "`reqdata.data_group_id`",
                                    "description": "`reqdata.description`",
                                    "experiment_id": "`reqdata.experiment_id`",
                                    "hash_salt": "`reqdata.hash_salt`",
                                    "is_experiment_active": "`reqdata.is_experiment_active`",
                                    "key": "`reqdata.key`",
                                    "name": "`reqdata.name`",
                                    "reset_hash_salt": "`reqdata.reset_hash_salt`",
                                    "ruleset": "`reqdata.ruleset`",
                                    "serving_method": "`reqdata.serving_method`",
                                    "status": "`reqdata.status`",
                                    "tags": "`reqdata.tag`",
                                    "workspace_id": "`reqdata.workspace_id`"
                                },
                                "res": "`body`"
                            },
                            "parts": [
                                "projects",
                                "{project_id}",
                                "workspaces",
                                "{workspace_id}",
                                "feature-flags",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "project",
                        "workspace"
                    ]
                ]
            }
        },
        "list_feature_flag": {
            "fields": [],
            "name": "list_feature_flag",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "project_id",
                                        "orig": "project_id",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "param",
                                        "name": "workspace_id",
                                        "orig": "workspace_id",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "include_archived",
                                        "orig": "include_archived",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/projects/{project_id}/workspaces/{workspace_id}/feature-flags",
                            "segments": [
                                {
                                    "lit": "projects"
                                },
                                {
                                    "var": "project_id"
                                },
                                {
                                    "lit": "workspaces"
                                },
                                {
                                    "var": "workspace_id"
                                },
                                {
                                    "lit": "feature-flags"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "include_archived",
                                    "project_id",
                                    "workspace_id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "projects",
                                "{project_id}",
                                "workspaces",
                                "{workspace_id}",
                                "feature-flags"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "project",
                        "workspace"
                    ]
                ]
            }
        },
        "workspace": {
            "fields": [],
            "name": "workspace",
            "op": {},
            "relations": {
                "ancestors": [
                    [
                        "project"
                    ]
                ]
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map