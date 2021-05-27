import { logPageView } from '../../../amplitude'

const orderApiPath = '/rest/v1/mq/order/channel'

logPageView('/create/mqchannel')

module.exports = {
  orderApiPath
}
