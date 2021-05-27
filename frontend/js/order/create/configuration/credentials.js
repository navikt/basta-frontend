import { logPageView } from '../../../amplitude'

const orderApiPath = '/rest/orders/serviceuser/credential'

logPageView('/create/credential')

module.exports = {
  orderApiPath
}
