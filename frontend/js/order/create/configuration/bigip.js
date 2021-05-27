import { logPageView } from '../../../amplitude'

const orderApiPath = '/rest/v1/bigip'

logPageView('/create/bigip')

module.exports = {
  orderApiPath
}
