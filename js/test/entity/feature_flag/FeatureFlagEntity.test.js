
const envlocal = __dirname + '/../../../.env.local'
require('../../utility').loadEnvLocal(envlocal)

const Path = require('node:path')
const Fs = require('node:fs')

const { test, describe, afterEach } = require('node:test')
const assert = require('node:assert')
const { createLiveTransport } = require('../../live-runner')
const { runLiveEntity } = require('../../live-entity')


const { MixpanelFeatureFlagsManagementSDK, BaseFeature, stdutil, config } = require('../../..')

const {
  envOverride,
  liveClientOptions,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
} = require('../../utility')


describe('FeatureFlagEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MIXPANEL_FEATURE_FLAGS_MANAGEMENT_TEST_LIVE=TRUE.
  afterEach(liveDelay('MIXPANEL_FEATURE_FLAGS_MANAGEMENT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MixpanelFeatureFlagsManagementSDK.test()
    const ent = testsdk.FeatureFlag()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"context":{"a":true,"h":"Context","n":"context","r":true,"t":"`$STRING`","key$":"context","index$":0},"data_group_id":{"a":true,"h":"Data Group Id","n":"data_group_id","r":false,"t":"`$STRING`","union":{"branches":2,"count":1,"depth":0},"key$":"data_group_id","index$":1},"description":{"a":true,"h":"Description","n":"description","r":false,"t":"`$STRING`","key$":"description","index$":2},"experiment_id":{"a":true,"h":"Experiment Id","n":"experiment_id","r":false,"t":"`$STRING`","key$":"experiment_id","index$":3},"hash_salt":{"a":true,"h":"Hash Salt","n":"hash_salt","r":false,"t":"`$ANY`","key$":"hash_salt","index$":4},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":5},"is_experiment_active":{"a":true,"h":"Is Experiment Active","n":"is_experiment_active","r":false,"t":"`$BOOLEAN`","key$":"is_experiment_active","index$":6},"key":{"a":true,"h":"Key","n":"key","r":true,"t":"`$STRING`","key$":"key","index$":7},"name":{"a":true,"h":"Name","n":"name","r":true,"t":"`$STRING`","key$":"name","index$":8},"reset_hash_salt":{"a":true,"h":"Reset Hash Salt","n":"reset_hash_salt","r":false,"t":"`$ANY`","key$":"reset_hash_salt","index$":9},"ruleset":{"a":true,"h":"Ruleset","n":"ruleset","r":true,"t":"`$OBJECT`","union":{"branches":3,"count":1,"depth":5},"key$":"ruleset","index$":10},"serving_method":{"a":true,"h":"Serving Method","n":"serving_method","r":true,"t":"`$STRING`","key$":"serving_method","index$":11},"status":{"a":true,"h":"Status","n":"status","r":false,"t":"`$STRING`","key$":"status","index$":12},"tags":{"a":true,"h":"Tags","n":"tags","r":true,"t":"`$ARRAY`","key$":"tags","index$":13},"workspace_id":{"a":true,"h":"Workspace Id","n":"workspace_id","r":false,"t":"`$STRING`","key$":"workspace_id","index$":14}},"id":{"field":"id","name":"id"},"name":"feature_flag","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /projects/{project_id}/workspaces/{workspace_id}/feature-flags","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$INTEGER`","index$":0},{"a":true,"k":"param","n":"workspace_id","or":"workspace_id","r":true,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"POST","o":"/projects/{project_id}/workspaces/{workspace_id}/feature-flags","q":{"exist":["project_id","workspace_id"]},"r":{},"s":[{"lit":"projects"},{"var":"project_id"},{"lit":"workspaces"},{"var":"workspace_id"},{"lit":"feature-flags"}],"t":{"req":{"context":"`reqdata.context`","data_group_id":"`reqdata.data_group_id`","description":"`reqdata.description`","experiment_id":"`reqdata.experiment_id`","hash_salt":"`reqdata.hash_salt`","is_experiment_active":"`reqdata.is_experiment_active`","key":"`reqdata.key`","name":"`reqdata.name`","reset_hash_salt":"`reqdata.reset_hash_salt`","ruleset":"`reqdata.ruleset`","serving_method":"`reqdata.serving_method`","status":"`reqdata.status`","tags":"`reqdata.tag`","workspace_id":"`reqdata.workspace_id`"},"res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /projects/{project_id}/workspaces/{workspace_id}/feature-flags/{flag_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"flag_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$INTEGER`","index$":1},{"a":true,"k":"param","n":"workspace_id","or":"workspace_id","r":true,"t":"`$INTEGER`","index$":2}]},"k":"http","m":"GET","o":"/projects/{project_id}/workspaces/{workspace_id}/feature-flags/{flag_id}","q":{"exist":["id","project_id","workspace_id"]},"r":{"param":{"flag_id":"id"}},"s":[{"lit":"projects"},{"var":"project_id"},{"lit":"workspaces"},{"var":"workspace_id"},{"lit":"feature-flags"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /projects/{project_id}/workspaces/{workspace_id}/feature-flags/{flag_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"flag_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$INTEGER`","index$":1},{"a":true,"k":"param","n":"workspace_id","or":"workspace_id","r":true,"t":"`$INTEGER`","index$":2}]},"k":"http","m":"DELETE","o":"/projects/{project_id}/workspaces/{workspace_id}/feature-flags/{flag_id}","q":{"exist":["id","project_id","workspace_id"]},"r":{"param":{"flag_id":"id"}},"s":[{"lit":"projects"},{"var":"project_id"},{"lit":"workspaces"},{"var":"workspace_id"},{"lit":"feature-flags"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PUT /projects/{project_id}/workspaces/{workspace_id}/feature-flags/{flag_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"flag_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$INTEGER`","index$":1},{"a":true,"k":"param","n":"workspace_id","or":"workspace_id","r":true,"t":"`$INTEGER`","index$":2}]},"k":"http","m":"PUT","o":"/projects/{project_id}/workspaces/{workspace_id}/feature-flags/{flag_id}","q":{"exist":["id","project_id","workspace_id"]},"r":{"param":{"flag_id":"id"}},"s":[{"lit":"projects"},{"var":"project_id"},{"lit":"workspaces"},{"var":"workspace_id"},{"lit":"feature-flags"},{"var":"id"}],"t":{"req":{"context":"`reqdata.context`","data_group_id":"`reqdata.data_group_id`","description":"`reqdata.description`","experiment_id":"`reqdata.experiment_id`","hash_salt":"`reqdata.hash_salt`","is_experiment_active":"`reqdata.is_experiment_active`","key":"`reqdata.key`","name":"`reqdata.name`","reset_hash_salt":"`reqdata.reset_hash_salt`","ruleset":"`reqdata.ruleset`","serving_method":"`reqdata.serving_method`","status":"`reqdata.status`","tags":"`reqdata.tag`","workspace_id":"`reqdata.workspace_id`"},"res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"feature_flag","name__orig":"feature_flag","Name":"FeatureFlag","name_":"feature_flag","name-":"feature-flag","NAME":"FEATURE_FLAG","index$":0}, {"active":true,"entity":"feature_flag","key$":"BasicFeatureFlagFlow","kind":"basic","name":"BasicFeatureFlagFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"feature_flag_ref01"},"m":{"project_id":"project01","workspace_id":"workspace01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{"project_id":"project01","workspace_id":"workspace01"},"i":{"ref":"feature_flag_ref01","srcdatavar":"feature_flag_ref01_data","suffix":"_up0","textfield":"context"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-feature_flag_ref01"}}],"v":[],"index$":1},{"a":true,"d":{},"i":{"ref":"feature_flag_ref01","srcdatavar":"feature_flag_ref01_data","suffix":"_dt0"},"m":{"id":"feature_flag01","project_id":"project01","workspace_id":"workspace01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-feature_flag_ref01"}}],"index$":2},{"a":true,"d":{},"i":{"ref":"feature_flag_ref01","suffix":"_rm0"},"m":{"id":"feature_flag01","project_id":"project01","workspace_id":"workspace01"},"o":"remove","s":[],"v":[],"index$":3}]}, 'FeatureFlag', {"POST /projects/{project_id}/workspaces/{workspace_id}/feature-flags":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"additionalProperties":false,"properties":{"name":{"maxLength":255,"minLength":1,"title":"","type":"string","key$":"name"},"key":{"maxLength":255,"minLength":1,"title":"","type":"string","key$":"key"},"description":{"anyOf":[{"type":"string"},{"type":"null"}],"default":null,"title":"","key$":"description"},"tags":{"items":{"type":"string"},"title":"","type":"array","key$":"tags"},"experiment_id":{"anyOf":[{"format":"uuid4","type":"string"},{"type":"null"}],"default":null,"title":"","key$":"experiment_id"},"status":{"enum":["enabled","disabled","archived"],"title":"FeatureFlagStatus","type":"string","default":"disabled","x-ref":"#/components/schemas/FeatureFlagStatus","key$":"status"},"context":{"maxLength":255,"minLength":1,"title":"","type":"string","key$":"context"},"data_group_id":{"anyOf":[{"type":"string"},{"type":"integer"},{"type":"null"}],"default":null,"title":"","key$":"data_group_id"},"serving_method":{"enum":["client","server","remote_or_local","remote_only"],"title":"ServingMethod","type":"string","x-ref":"#/components/schemas/ServingMethod","key$":"serving_method"},"ruleset":{"additionalProperties":false,"properties":{"variants":{"items":{"additionalProperties":false,"properties":{},"required":[],"title":"ManagementVariant","type":"object","x-ref":"#/components/schemas/ManagementVariant"},"maxItems":11,"title":"","type":"array"},"rollout":{"items":{"additionalProperties":false,"properties":{},"required":[],"title":"ManagementRollout","type":"object","x-ref":"#/components/schemas/ManagementRollout"},"title":"","type":"array"},"test":{"anyOf":[{},{}],"default":null,"title":""}},"required":["variants","rollout"],"title":"ManagementRuleSet","type":"object","x-ref":"#/components/schemas/ManagementRuleSet","key$":"ruleset"},"workspace_id":{"anyOf":[{"type":"integer"},{"type":"null"}],"default":null,"title":"","key$":"workspace_id"},"is_experiment_active":{"anyOf":[{"type":"boolean"},{"type":"null"}],"default":null,"title":"","key$":"is_experiment_active"},"hash_salt":{"anyOf":[{"maxLength":32,"minLength":32,"type":"string"},{"type":"null"}],"default":null,"title":"","key$":"hash_salt"},"reset_hash_salt":{"anyOf":[{"type":"boolean"},{"type":"null"}],"default":null,"title":"","key$":"reset_hash_salt"}},"required":["name","key","tags","context","serving_method","ruleset"],"title":"FeatureFlagApiPayload","type":"object","x-ref":"#/components/schemas/FeatureFlagRequest","index$":1}}}},"parameters":[{"name":"project_id","in":"path","schema":{"type":"integer"},"required":true,"x-ref":"#/components/parameters/ProjectId","index$":0},{"name":"workspace_id","in":"path","schema":{"type":"integer"},"required":true,"x-ref":"#/components/parameters/WorkspaceId","index$":1}]},"GET /projects/{project_id}/workspaces/{workspace_id}/feature-flags/{flag_id}":{"protocol":"http","parameters":[{"name":"project_id","in":"path","schema":{"type":"integer"},"required":true,"x-ref":"#/components/parameters/ProjectId","index$":0},{"name":"workspace_id","in":"path","schema":{"type":"integer"},"required":true,"x-ref":"#/components/parameters/WorkspaceId","index$":1},{"name":"flag_id","in":"path","schema":{"type":"string"},"required":true,"x-ref":"#/components/parameters/FlagId","index$":2}]},"DELETE /projects/{project_id}/workspaces/{workspace_id}/feature-flags/{flag_id}":{"protocol":"http","parameters":[{"name":"project_id","in":"path","schema":{"type":"integer"},"required":true,"x-ref":"#/components/parameters/ProjectId","index$":0},{"name":"workspace_id","in":"path","schema":{"type":"integer"},"required":true,"x-ref":"#/components/parameters/WorkspaceId","index$":1},{"name":"flag_id","in":"path","schema":{"type":"string"},"required":true,"x-ref":"#/components/parameters/FlagId","index$":2}]},"PUT /projects/{project_id}/workspaces/{workspace_id}/feature-flags/{flag_id}":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"additionalProperties":false,"properties":{"name":{"maxLength":255,"minLength":1,"title":"","type":"string","key$":"name"},"key":{"maxLength":255,"minLength":1,"title":"","type":"string","key$":"key"},"description":{"anyOf":[{"type":"string"},{"type":"null"}],"default":null,"title":"","key$":"description"},"tags":{"items":{"type":"string"},"title":"","type":"array","key$":"tags"},"experiment_id":{"anyOf":[{"format":"uuid4","type":"string"},{"type":"null"}],"default":null,"title":"","key$":"experiment_id"},"status":{"enum":["enabled","disabled","archived"],"title":"FeatureFlagStatus","type":"string","default":"disabled","x-ref":"#/components/schemas/FeatureFlagStatus","key$":"status"},"context":{"maxLength":255,"minLength":1,"title":"","type":"string","key$":"context"},"data_group_id":{"anyOf":[{"type":"string"},{"type":"integer"},{"type":"null"}],"default":null,"title":"","key$":"data_group_id"},"serving_method":{"enum":["client","server","remote_or_local","remote_only"],"title":"ServingMethod","type":"string","x-ref":"#/components/schemas/ServingMethod","key$":"serving_method"},"ruleset":{"additionalProperties":false,"properties":{"variants":{"items":{"additionalProperties":false,"properties":{},"required":[],"title":"ManagementVariant","type":"object","x-ref":"#/components/schemas/ManagementVariant"},"maxItems":11,"title":"","type":"array"},"rollout":{"items":{"additionalProperties":false,"properties":{},"required":[],"title":"ManagementRollout","type":"object","x-ref":"#/components/schemas/ManagementRollout"},"title":"","type":"array"},"test":{"anyOf":[{},{}],"default":null,"title":""}},"required":["variants","rollout"],"title":"ManagementRuleSet","type":"object","x-ref":"#/components/schemas/ManagementRuleSet","key$":"ruleset"},"workspace_id":{"anyOf":[{"type":"integer"},{"type":"null"}],"default":null,"title":"","key$":"workspace_id"},"is_experiment_active":{"anyOf":[{"type":"boolean"},{"type":"null"}],"default":null,"title":"","key$":"is_experiment_active"},"hash_salt":{"anyOf":[{"maxLength":32,"minLength":32,"type":"string"},{"type":"null"}],"default":null,"title":"","key$":"hash_salt"},"reset_hash_salt":{"anyOf":[{"type":"boolean"},{"type":"null"}],"default":null,"title":"","key$":"reset_hash_salt"}},"required":["name","key","tags","context","serving_method","ruleset"],"title":"FeatureFlagApiPayload","type":"object","x-ref":"#/components/schemas/FeatureFlagRequest","index$":1}}}},"parameters":[{"name":"project_id","in":"path","schema":{"type":"integer"},"required":true,"x-ref":"#/components/parameters/ProjectId","index$":0},{"name":"workspace_id","in":"path","schema":{"type":"integer"},"required":true,"x-ref":"#/components/parameters/WorkspaceId","index$":1},{"name":"flag_id","in":"path","schema":{"type":"string"},"required":true,"x-ref":"#/components/parameters/FlagId","index$":2}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const feature_flag_ref01_ent = client.FeatureFlag()
    let feature_flag_ref01_data = setup.data.new.feature_flag['feature_flag_ref01']
    feature_flag_ref01_data['project_id'] = setup.idmap['project01']
    feature_flag_ref01_data['workspace_id'] = setup.idmap['workspace01']

    feature_flag_ref01_data = (await feature_flag_ref01_ent.create(feature_flag_ref01_data)).data()
    assert(null != feature_flag_ref01_data.id)


    // UPDATE
    const feature_flag_ref01_data_up0 = {}
    feature_flag_ref01_data_up0.id = feature_flag_ref01_data.id
    feature_flag_ref01_data_up0 ['project_id'] = setup.idmap['project_id']
    feature_flag_ref01_data_up0 ['workspace_id'] = setup.idmap['workspace_id']

    const feature_flag_ref01_markdef_up0 = { name: 'context', value: 'Mark01-feature_flag_ref01_' + setup.now }
    feature_flag_ref01_data_up0 [feature_flag_ref01_markdef_up0.name] = feature_flag_ref01_markdef_up0.value

    const feature_flag_ref01_resdata_up0 = (await feature_flag_ref01_ent.update(feature_flag_ref01_data_up0)).data()
    assert(feature_flag_ref01_resdata_up0.id === feature_flag_ref01_data_up0.id)

    assert(feature_flag_ref01_resdata_up0[feature_flag_ref01_markdef_up0.name] === feature_flag_ref01_markdef_up0.value)


    // LOAD
    const feature_flag_ref01_match_dt0 = {}
    feature_flag_ref01_match_dt0.id = feature_flag_ref01_data.id
    const feature_flag_ref01_data_dt0 = (await feature_flag_ref01_ent.load(feature_flag_ref01_match_dt0)).data()
    assert(feature_flag_ref01_data_dt0.id === feature_flag_ref01_data.id)


    // REMOVE
    const feature_flag_ref01_match_rm0 = {}
    feature_flag_ref01_match_rm0.id = feature_flag_ref01_data.id
    await feature_flag_ref01_ent.remove(feature_flag_ref01_match_rm0)
  

  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/feature_flag/FeatureFlagTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = MixpanelFeatureFlagsManagementSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['feature_flag01','feature_flag02','feature_flag03','project01','workspace01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MIXPANEL_FEATURE_FLAGS_MANAGEMENT_TEST_FEATURE_FLAG_ENTID': idmap,
    'MIXPANEL_FEATURE_FLAGS_MANAGEMENT_TEST_LIVE': 'FALSE',
    'MIXPANEL_FEATURE_FLAGS_MANAGEMENT_TEST_EXPLAIN': 'FALSE',
    'MIXPANEL_FEATURE_FLAGS_MANAGEMENT_APIKEY': '',
    'MIXPANEL_FEATURE_FLAGS_MANAGEMENT_SERVER_REGIONANDDOMAIN': "mixpanel",
  })

  idmap = env['MIXPANEL_FEATURE_FLAGS_MANAGEMENT_TEST_FEATURE_FLAG_ENTID']

  const live = 'TRUE' === env.MIXPANEL_FEATURE_FLAGS_MANAGEMENT_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MIXPANEL_FEATURE_FLAGS_MANAGEMENT_TEST_FEATURE_FLAG_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new MixpanelFeatureFlagsManagementSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.MIXPANEL_FEATURE_FLAGS_MANAGEMENT_APIKEY,
        server: {
          regionAndDomain: env.MIXPANEL_FEATURE_FLAGS_MANAGEMENT_SERVER_REGIONANDDOMAIN,
        },
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when
      // the last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey and
      // server values above and handed the SDK undefined.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
