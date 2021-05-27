import { logPageView } from '../../../amplitude'

const orderApiPath = '/rest/v1/mq/order/queue'

logPageView('/create/mqqueue')

module.exports = {
  orderApiPath
}
