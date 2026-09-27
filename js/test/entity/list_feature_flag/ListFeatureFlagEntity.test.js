
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


describe('ListFeatureFlagEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MIXPANEL_FEATURE_FLAGS_MANAGEMENT_TEST_LIVE=TRUE.
  afterEach(liveDelay('MIXPANEL_FEATURE_FLAGS_MANAGEMENT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MixpanelFeatureFlagsManagementSDK.test()
    const ent = testsdk.ListFeatureFlag()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"list_feature_flag","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /projects/{project_id}/workspaces/{workspace_id}/feature-flags","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$INTEGER`","index$":0},{"a":true,"k":"param","n":"workspace_id","or":"workspace_id","r":true,"t":"`$INTEGER`","index$":1}],"query":[{"a":true,"k":"query","n":"include_archived","or":"include_archived","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/projects/{project_id}/workspaces/{workspace_id}/feature-flags","q":{"exist":["include_archived","project_id","workspace_id"]},"r":{},"s":[{"lit":"projects"},{"var":"project_id"},{"lit":"workspaces"},{"var":"workspace_id"},{"lit":"feature-flags"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"list_feature_flag","name__orig":"list_feature_flag","Name":"ListFeatureFlag","name_":"list_feature_flag","name-":"list-feature-flag","NAME":"LIST_FEATURE_FLAG","index$":1}, {"active":true,"entity":"list_feature_flag","key$":"BasicListFeatureFlagFlow","kind":"basic","name":"BasicListFeatureFlagFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"list_feature_flag_ref01","srcdatavar":"list_feature_flag_ref01_data","suffix":"_dt0"},"m":{"id":"list_feature_flag01","project_id":"project01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-list_feature_flag_ref01"}}],"index$":0}]}, 'ListFeatureFlag', {"GET /projects/{project_id}/workspaces/{workspace_id}/feature-flags":{"protocol":"http","parameters":[{"name":"project_id","in":"path","schema":{"type":"integer"},"required":true,"x-ref":"#/components/parameters/ProjectId","index$":0},{"name":"workspace_id","in":"path","schema":{"type":"integer"},"required":true,"x-ref":"#/components/parameters/WorkspaceId","index$":1},{"name":"include_archived","in":"query","schema":{"type":"string","enum":["true","false"]},"description":"Whether to include archived (soft-deleted) feature flags. Defaults to false.","index$":2}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let list_feature_flag_ref01_data = Object.values(setup.data.existing.list_feature_flag)[0]

    // LOAD
    const list_feature_flag_ref01_ent = client.ListFeatureFlag()
    const list_feature_flag_ref01_match_dt0 = {}
    const list_feature_flag_ref01_data_dt0 = (await list_feature_flag_ref01_ent.load(list_feature_flag_ref01_match_dt0)).data()
    assert(null != list_feature_flag_ref01_data_dt0)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/list_feature_flag/ListFeatureFlagTestData.json')

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
    ['list_feature_flag01','list_feature_flag02','list_feature_flag03','project01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MIXPANEL_FEATURE_FLAGS_MANAGEMENT_TEST_LIST_FEATURE_FLAG_ENTID': idmap,
    'MIXPANEL_FEATURE_FLAGS_MANAGEMENT_TEST_LIVE': 'FALSE',
    'MIXPANEL_FEATURE_FLAGS_MANAGEMENT_TEST_EXPLAIN': 'FALSE',
    'MIXPANEL_FEATURE_FLAGS_MANAGEMENT_APIKEY': '',
    'MIXPANEL_FEATURE_FLAGS_MANAGEMENT_SERVER_REGIONANDDOMAIN': "mixpanel",
  })

  idmap = env['MIXPANEL_FEATURE_FLAGS_MANAGEMENT_TEST_LIST_FEATURE_FLAG_ENTID']

  const live = 'TRUE' === env.MIXPANEL_FEATURE_FLAGS_MANAGEMENT_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MIXPANEL_FEATURE_FLAGS_MANAGEMENT_TEST_LIST_FEATURE_FLAG_ENTID']
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
  
