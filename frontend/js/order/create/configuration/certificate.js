import { logPageView } from '../../../amplitude'

const orderApiPath = '/rest/orders/serviceuser/certificate'

logPageView('/create/certificate')

module.exports = {
  orderApiPath
}
