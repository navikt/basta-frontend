import { logPageView } from '../../../amplitude'

const orderApiPath = '/rest/v1/oracledb'

logPageView('/create/oracle')

module.exports = {
  orderApiPath
}
