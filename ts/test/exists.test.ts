
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { MixpanelFeatureFlagsManagementSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = MixpanelFeatureFlagsManagementSDK.test()
    equal(testsdk instanceof MixpanelFeatureFlagsManagementSDK, true,
      'MixpanelFeatureFlagsManagementSDK.test() must return a client synchronously')
  })

})
