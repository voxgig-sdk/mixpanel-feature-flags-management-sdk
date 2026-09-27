# MixpanelFeatureFlagsManagement SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "MixpanelFeatureFlagsManagement",
            "slug": "mixpanel-feature-flags-management",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "debug": {
        "options": {
          "active": False,
          "max": 100,
          "redact": [
            "authorization",
            "cookie",
            "set-cookie",
            "api-key",
            "apikey",
            "x-api-key",
            "idempotency-key",
          ],
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "onEntry": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "idempotency": {
        "options": {
          "active": False,
          "header": "Idempotency-Key",
          "methods": [
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
          ],
          "ops": [
            "create",
            "update",
            "remove",
          ],
        },
        "optspec": {
          "keygen": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "metrics": {
        "options": {
          "active": False,
        },
        "optspec": {
          "now": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "paging": {
        "options": {
          "active": False,
          "afterVar": "after",
          "cursorParam": "cursor",
          "firstVar": "first",
          "limitParam": "limit",
          "pageParam": "page",
          "startPage": 1,
        },
        "optspec": {
          "limit": "`$NUMBER`",
          "ops": "`$LIST`",
        },
        "strict": False,
        "transport": "none",
      },
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
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
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://{regionAndDomain}.com/api/app",
            "server": {
                "regionAndDomain": "mixpanel",
            },
            "auth": {
                "prefix": "Basic",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "feature_flag": {},
                "list_feature_flag": {},
            },
        },
        "entity": {
      "feature_flag": {
        "fields": [
          {
            "name": "context",
            "title": "Context",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "data_group_id",
            "title": "Data Group Id",
            "type": "`$STRING`",
          },
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
          },
          {
            "name": "experiment_id",
            "title": "Experiment Id",
            "type": "`$STRING`",
          },
          {
            "name": "hash_salt",
            "title": "Hash Salt",
            "type": "`$ANY`",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "is_experiment_active",
            "title": "Is Experiment Active",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "key",
            "title": "Key",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "reset_hash_salt",
            "title": "Reset Hash Salt",
            "type": "`$ANY`",
          },
          {
            "name": "ruleset",
            "title": "Ruleset",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "serving_method",
            "title": "Serving Method",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
          },
          {
            "name": "tags",
            "title": "Tags",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "workspace_id",
            "title": "Workspace Id",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "feature_flag",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/projects/{project_id}/workspaces/{workspace_id}/feature-flags",
                "segments": [
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "workspaces",
                  },
                  {
                    "var": "workspace_id",
                  },
                  {
                    "lit": "feature-flags",
                  },
                ],
                "parts": [
                  "projects",
                  "{project_id}",
                  "workspaces",
                  "{workspace_id}",
                  "feature-flags",
                ],
                "rename": {},
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
                    "workspace_id": "`reqdata.workspace_id`",
                  },
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "project_id",
                      "orig": "project_id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "workspace_id",
                      "orig": "workspace_id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "project_id",
                    "workspace_id",
                  ],
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/projects/{project_id}/workspaces/{workspace_id}/feature-flags/{flag_id}",
                "segments": [
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "workspaces",
                  },
                  {
                    "var": "workspace_id",
                  },
                  {
                    "lit": "feature-flags",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "projects",
                  "{project_id}",
                  "workspaces",
                  "{workspace_id}",
                  "feature-flags",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "flag_id": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "flag_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "project_id",
                      "orig": "project_id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "workspace_id",
                      "orig": "workspace_id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                    "project_id",
                    "workspace_id",
                  ],
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/projects/{project_id}/workspaces/{workspace_id}/feature-flags/{flag_id}",
                "segments": [
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "workspaces",
                  },
                  {
                    "var": "workspace_id",
                  },
                  {
                    "lit": "feature-flags",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "projects",
                  "{project_id}",
                  "workspaces",
                  "{workspace_id}",
                  "feature-flags",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "flag_id": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "flag_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "project_id",
                      "orig": "project_id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "workspace_id",
                      "orig": "workspace_id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                    "project_id",
                    "workspace_id",
                  ],
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PUT",
                "orig": "/projects/{project_id}/workspaces/{workspace_id}/feature-flags/{flag_id}",
                "segments": [
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "workspaces",
                  },
                  {
                    "var": "workspace_id",
                  },
                  {
                    "lit": "feature-flags",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "projects",
                  "{project_id}",
                  "workspaces",
                  "{workspace_id}",
                  "feature-flags",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "flag_id": "id",
                  },
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
                    "workspace_id": "`reqdata.workspace_id`",
                  },
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "flag_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "project_id",
                      "orig": "project_id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "workspace_id",
                      "orig": "workspace_id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                    "project_id",
                    "workspace_id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
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
                "kind": "http",
                "method": "GET",
                "orig": "/projects/{project_id}/workspaces/{workspace_id}/feature-flags",
                "segments": [
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "workspaces",
                  },
                  {
                    "var": "workspace_id",
                  },
                  {
                    "lit": "feature-flags",
                  },
                ],
                "parts": [
                  "projects",
                  "{project_id}",
                  "workspaces",
                  "{workspace_id}",
                  "feature-flags",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "project_id",
                      "orig": "project_id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "workspace_id",
                      "orig": "workspace_id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "include_archived",
                      "orig": "include_archived",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "include_archived",
                    "project_id",
                    "workspace_id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
