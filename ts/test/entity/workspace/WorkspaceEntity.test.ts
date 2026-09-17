

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { MixpanelFeatureFlagsManagementSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('WorkspaceEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MIXPANEL_FEATURE_FLAGS_MANAGEMENT_TEST_LIVE=TRUE.
  afterEach(liveDelay('MIXPANEL_FEATURE_FLAGS_MANAGEMENT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MixpanelFeatureFlagsManagementSDK.test()
    const ent = testsdk.Workspace()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.MIXPANEL_FEATURE_FLAGS_MANAGEMENT_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'workspace.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"workspace","op":{},"relations":{"ancestors":[["project"]]},"key$":"workspace","name__orig":"workspace","Name":"Workspace","name_":"workspace","name-":"workspace","NAME":"WORKSPACE","index$":2}, {"active":true,"entity":"workspace","key$":"BasicWorkspaceFlow","kind":"basic","name":"BasicWorkspaceFlow","param":{},"step":[]}, 'Workspace')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let workspace_ref01_data = Object.values(setup.data.existing.workspace)[0] as any

  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/workspace/WorkspaceTestData.json')

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
    ['workspace01','workspace02','workspace03','project01','project02','project03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MIXPANEL_FEATURE_FLAGS_MANAGEMENT_TEST_WORKSPACE_ENTID': idmap,
    'MIXPANEL_FEATURE_FLAGS_MANAGEMENT_TEST_LIVE': 'FALSE',
    'MIXPANEL_FEATURE_FLAGS_MANAGEMENT_TEST_EXPLAIN': 'FALSE',
    'MIXPANEL_FEATURE_FLAGS_MANAGEMENT_APIKEY': '',
    'MIXPANEL_FEATURE_FLAGS_MANAGEMENT_SECRET': '',
    'MIXPANEL_FEATURE_FLAGS_MANAGEMENT_SERVER_REGIONANDDOMAIN': "mixpanel",
  })

  idmap = env['MIXPANEL_FEATURE_FLAGS_MANAGEMENT_TEST_WORKSPACE_ENTID']

  const live = 'TRUE' === env.MIXPANEL_FEATURE_FLAGS_MANAGEMENT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MIXPANEL_FEATURE_FLAGS_MANAGEMENT_TEST_WORKSPACE_ENTID']
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
  
