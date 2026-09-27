package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "MixpanelFeatureFlagsManagement",
			"slug": "mixpanel-feature-flags-management",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"debug": map[string]any{
				"options": map[string]any{
					"active": false,
					"max": 100,
					"redact": []any{
						"authorization",
						"cookie",
						"set-cookie",
						"api-key",
						"apikey",
						"x-api-key",
						"idempotency-key",
					},
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"onEntry": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"idempotency": map[string]any{
				"options": map[string]any{
					"active": false,
					"header": "Idempotency-Key",
					"methods": []any{
						"POST",
						"PUT",
						"PATCH",
						"DELETE",
					},
					"ops": []any{
						"create",
						"update",
						"remove",
					},
				},
				"optspec": map[string]any{
					"keygen": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"metrics": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"paging": map[string]any{
				"options": map[string]any{
					"active": false,
					"afterVar": "after",
					"cursorParam": "cursor",
					"firstVar": "first",
					"limitParam": "limit",
					"pageParam": "page",
					"startPage": 1,
				},
				"optspec": map[string]any{
					"limit": "`$NUMBER`",
					"ops": "`$LIST`",
				},
				"strict": false,
				"transport": "none",
			},
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://{regionAndDomain}.com/api/app",
			"server": map[string]any{
				"regionAndDomain": "mixpanel",
			},
			"auth": map[string]any{
				"prefix": "Basic",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"feature_flag": map[string]any{},
				"list_feature_flag": map[string]any{},
			},
		},
		"entity": map[string]any{
			"feature_flag": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "context",
						"title": "Context",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "data_group_id",
						"title": "Data Group Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "experiment_id",
						"title": "Experiment Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "hash_salt",
						"title": "Hash Salt",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "is_experiment_active",
						"title": "Is Experiment Active",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "key",
						"title": "Key",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "reset_hash_salt",
						"title": "Reset Hash Salt",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "ruleset",
						"title": "Ruleset",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "serving_method",
						"title": "Serving Method",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "tags",
						"title": "Tags",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "workspace_id",
						"title": "Workspace Id",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "feature_flag",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/projects/{project_id}/workspaces/{workspace_id}/feature-flags",
								"segments": []any{
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "project_id",
									},
									map[string]any{
										"lit": "workspaces",
									},
									map[string]any{
										"var": "workspace_id",
									},
									map[string]any{
										"lit": "feature-flags",
									},
								},
								"parts": []any{
									"projects",
									"{project_id}",
									"workspaces",
									"{workspace_id}",
									"feature-flags",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": map[string]any{
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
										"workspace_id": "`reqdata.workspace_id`",
									},
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "project_id",
											"orig": "project_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "workspace_id",
											"orig": "workspace_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"project_id",
										"workspace_id",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/projects/{project_id}/workspaces/{workspace_id}/feature-flags/{flag_id}",
								"segments": []any{
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "project_id",
									},
									map[string]any{
										"lit": "workspaces",
									},
									map[string]any{
										"var": "workspace_id",
									},
									map[string]any{
										"lit": "feature-flags",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"projects",
									"{project_id}",
									"workspaces",
									"{workspace_id}",
									"feature-flags",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"flag_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "flag_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "project_id",
											"orig": "project_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "workspace_id",
											"orig": "workspace_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"project_id",
										"workspace_id",
									},
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/projects/{project_id}/workspaces/{workspace_id}/feature-flags/{flag_id}",
								"segments": []any{
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "project_id",
									},
									map[string]any{
										"lit": "workspaces",
									},
									map[string]any{
										"var": "workspace_id",
									},
									map[string]any{
										"lit": "feature-flags",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"projects",
									"{project_id}",
									"workspaces",
									"{workspace_id}",
									"feature-flags",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"flag_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "flag_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "project_id",
											"orig": "project_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "workspace_id",
											"orig": "workspace_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"project_id",
										"workspace_id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/projects/{project_id}/workspaces/{workspace_id}/feature-flags/{flag_id}",
								"segments": []any{
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "project_id",
									},
									map[string]any{
										"lit": "workspaces",
									},
									map[string]any{
										"var": "workspace_id",
									},
									map[string]any{
										"lit": "feature-flags",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"projects",
									"{project_id}",
									"workspaces",
									"{workspace_id}",
									"feature-flags",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"flag_id": "id",
									},
								},
								"transform": map[string]any{
									"req": map[string]any{
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
										"workspace_id": "`reqdata.workspace_id`",
									},
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "flag_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "project_id",
											"orig": "project_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "workspace_id",
											"orig": "workspace_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"project_id",
										"workspace_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"list_feature_flag": map[string]any{
				"fields": []any{},
				"name": "list_feature_flag",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/projects/{project_id}/workspaces/{workspace_id}/feature-flags",
								"segments": []any{
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "project_id",
									},
									map[string]any{
										"lit": "workspaces",
									},
									map[string]any{
										"var": "workspace_id",
									},
									map[string]any{
										"lit": "feature-flags",
									},
								},
								"parts": []any{
									"projects",
									"{project_id}",
									"workspaces",
									"{workspace_id}",
									"feature-flags",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "project_id",
											"orig": "project_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "workspace_id",
											"orig": "workspace_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "include_archived",
											"orig": "include_archived",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"include_archived",
										"project_id",
										"workspace_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "debug":
		if NewDebugFeatureFunc != nil {
			return NewDebugFeatureFunc()
		}
	case "idempotency":
		if NewIdempotencyFeatureFunc != nil {
			return NewIdempotencyFeatureFunc()
		}
	case "metrics":
		if NewMetricsFeatureFunc != nil {
			return NewMetricsFeatureFunc()
		}
	case "paging":
		if NewPagingFeatureFunc != nil {
			return NewPagingFeatureFunc()
		}
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
