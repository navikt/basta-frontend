import { logPageView } from '../../../amplitude'

const orderApiPath = '/rest/orders/serviceuser/customcredential'

logPageView('/create/customcredential')

module.exports = {
  orderApiPath
}
