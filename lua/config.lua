-- MixpanelFeatureFlagsManagement SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "MixpanelFeatureFlagsManagement",
      slug = "mixpanel-feature-flags-management",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["debug"] = {
        ["options"] = {
          ["active"] = false,
          ["max"] = 100,
          ["redact"] = {
            "authorization",
            "cookie",
            "set-cookie",
            "api-key",
            "apikey",
            "x-api-key",
            "idempotency-key",
          },
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["onEntry"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "none",
      },
      ["idempotency"] = {
        ["options"] = {
          ["active"] = false,
          ["header"] = "Idempotency-Key",
          ["methods"] = {
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
          },
          ["ops"] = {
            "create",
            "update",
            "remove",
          },
        },
        ["optspec"] = {
          ["keygen"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "none",
      },
      ["metrics"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "none",
      },
      ["paging"] = {
        ["options"] = {
          ["active"] = false,
          ["afterVar"] = "after",
          ["cursorParam"] = "cursor",
          ["firstVar"] = "first",
          ["limitParam"] = "limit",
          ["pageParam"] = "page",
          ["startPage"] = 1,
        },
        ["optspec"] = {
          ["limit"] = "`$NUMBER`",
          ["ops"] = "`$LIST`",
        },
        ["strict"] = false,
        ["transport"] = "none",
      },
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://{regionAndDomain}.com/api/app",
      server = {
        ["regionAndDomain"] = "mixpanel",
      },
      auth = {
        prefix = "Basic",
      },
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["feature_flag"] = {},
        ["list_feature_flag"] = {},
      },
    },
    entity = {
      ["feature_flag"] = {
        ["fields"] = {
          {
            ["name"] = "context",
            ["title"] = "Context",
            ["type"] = "`$STRING`",
            ["req"] = true,
          },
          {
            ["name"] = "data_group_id",
            ["title"] = "Data Group Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "description",
            ["title"] = "Description",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "experiment_id",
            ["title"] = "Experiment Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "hash_salt",
            ["title"] = "Hash Salt",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "is_experiment_active",
            ["title"] = "Is Experiment Active",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "key",
            ["title"] = "Key",
            ["type"] = "`$STRING`",
            ["req"] = true,
          },
          {
            ["name"] = "name",
            ["title"] = "Name",
            ["type"] = "`$STRING`",
            ["req"] = true,
          },
          {
            ["name"] = "reset_hash_salt",
            ["title"] = "Reset Hash Salt",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "ruleset",
            ["title"] = "Ruleset",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
          },
          {
            ["name"] = "serving_method",
            ["title"] = "Serving Method",
            ["type"] = "`$STRING`",
            ["req"] = true,
          },
          {
            ["name"] = "status",
            ["title"] = "Status",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "tags",
            ["title"] = "Tags",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
          },
          {
            ["name"] = "workspace_id",
            ["title"] = "Workspace Id",
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "feature_flag",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/projects/{project_id}/workspaces/{workspace_id}/feature-flags",
                ["segments"] = {
                  {
                    ["lit"] = "projects",
                  },
                  {
                    ["var"] = "project_id",
                  },
                  {
                    ["lit"] = "workspaces",
                  },
                  {
                    ["var"] = "workspace_id",
                  },
                  {
                    ["lit"] = "feature-flags",
                  },
                },
                ["parts"] = {
                  "projects",
                  "{project_id}",
                  "workspaces",
                  "{workspace_id}",
                  "feature-flags",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = {
                    ["context"] = "`reqdata.context`",
                    ["data_group_id"] = "`reqdata.data_group_id`",
                    ["description"] = "`reqdata.description`",
                    ["experiment_id"] = "`reqdata.experiment_id`",
                    ["hash_salt"] = "`reqdata.hash_salt`",
                    ["is_experiment_active"] = "`reqdata.is_experiment_active`",
                    ["key"] = "`reqdata.key`",
                    ["name"] = "`reqdata.name`",
                    ["reset_hash_salt"] = "`reqdata.reset_hash_salt`",
                    ["ruleset"] = "`reqdata.ruleset`",
                    ["serving_method"] = "`reqdata.serving_method`",
                    ["status"] = "`reqdata.status`",
                    ["tags"] = "`reqdata.tag`",
                    ["workspace_id"] = "`reqdata.workspace_id`",
                  },
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "project_id",
                      ["orig"] = "project_id",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "workspace_id",
                      ["orig"] = "workspace_id",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "project_id",
                    "workspace_id",
                  },
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/projects/{project_id}/workspaces/{workspace_id}/feature-flags/{flag_id}",
                ["segments"] = {
                  {
                    ["lit"] = "projects",
                  },
                  {
                    ["var"] = "project_id",
                  },
                  {
                    ["lit"] = "workspaces",
                  },
                  {
                    ["var"] = "workspace_id",
                  },
                  {
                    ["lit"] = "feature-flags",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "projects",
                  "{project_id}",
                  "workspaces",
                  "{workspace_id}",
                  "feature-flags",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["flag_id"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "flag_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "project_id",
                      ["orig"] = "project_id",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "workspace_id",
                      ["orig"] = "workspace_id",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "project_id",
                    "workspace_id",
                  },
                },
              },
            },
          },
          ["remove"] = {
            ["input"] = "data",
            ["name"] = "remove",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/projects/{project_id}/workspaces/{workspace_id}/feature-flags/{flag_id}",
                ["segments"] = {
                  {
                    ["lit"] = "projects",
                  },
                  {
                    ["var"] = "project_id",
                  },
                  {
                    ["lit"] = "workspaces",
                  },
                  {
                    ["var"] = "workspace_id",
                  },
                  {
                    ["lit"] = "feature-flags",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "projects",
                  "{project_id}",
                  "workspaces",
                  "{workspace_id}",
                  "feature-flags",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["flag_id"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "flag_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "project_id",
                      ["orig"] = "project_id",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "workspace_id",
                      ["orig"] = "workspace_id",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "project_id",
                    "workspace_id",
                  },
                },
              },
            },
          },
          ["update"] = {
            ["input"] = "data",
            ["name"] = "update",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "PUT",
                ["orig"] = "/projects/{project_id}/workspaces/{workspace_id}/feature-flags/{flag_id}",
                ["segments"] = {
                  {
                    ["lit"] = "projects",
                  },
                  {
                    ["var"] = "project_id",
                  },
                  {
                    ["lit"] = "workspaces",
                  },
                  {
                    ["var"] = "workspace_id",
                  },
                  {
                    ["lit"] = "feature-flags",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "projects",
                  "{project_id}",
                  "workspaces",
                  "{workspace_id}",
                  "feature-flags",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["flag_id"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = {
                    ["context"] = "`reqdata.context`",
                    ["data_group_id"] = "`reqdata.data_group_id`",
                    ["description"] = "`reqdata.description`",
                    ["experiment_id"] = "`reqdata.experiment_id`",
                    ["hash_salt"] = "`reqdata.hash_salt`",
                    ["is_experiment_active"] = "`reqdata.is_experiment_active`",
                    ["key"] = "`reqdata.key`",
                    ["name"] = "`reqdata.name`",
                    ["reset_hash_salt"] = "`reqdata.reset_hash_salt`",
                    ["ruleset"] = "`reqdata.ruleset`",
                    ["serving_method"] = "`reqdata.serving_method`",
                    ["status"] = "`reqdata.status`",
                    ["tags"] = "`reqdata.tag`",
                    ["workspace_id"] = "`reqdata.workspace_id`",
                  },
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "flag_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "project_id",
                      ["orig"] = "project_id",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "workspace_id",
                      ["orig"] = "workspace_id",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "project_id",
                    "workspace_id",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["list_feature_flag"] = {
        ["fields"] = {},
        ["name"] = "list_feature_flag",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/projects/{project_id}/workspaces/{workspace_id}/feature-flags",
                ["segments"] = {
                  {
                    ["lit"] = "projects",
                  },
                  {
                    ["var"] = "project_id",
                  },
                  {
                    ["lit"] = "workspaces",
                  },
                  {
                    ["var"] = "workspace_id",
                  },
                  {
                    ["lit"] = "feature-flags",
                  },
                },
                ["parts"] = {
                  "projects",
                  "{project_id}",
                  "workspaces",
                  "{workspace_id}",
                  "feature-flags",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "project_id",
                      ["orig"] = "project_id",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "workspace_id",
                      ["orig"] = "workspace_id",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "include_archived",
                      ["orig"] = "include_archived",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "include_archived",
                    "project_id",
                    "workspace_id",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
