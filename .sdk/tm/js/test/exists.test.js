
const { test, describe } = require('node:test')
const { equal } = require('node:assert')


const { MixpanelFeatureFlagsManagementSDK } = require('..')


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await MixpanelFeatureFlagsManagementSDK.test()
    equal(null !== testsdk, true)
  })

})
