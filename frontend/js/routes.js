import React from 'react'
import { Route, Switch, Layout } from 'react-router'

import History from './history/History'
import Operate from './operations/Operate'
import Create from './order/Create'
import { NotFound } from './containers/notfound/NotFound'
import ServerOrderForm from './order/create/ServerOrderForm'
import OperationsForm from './common/components/OperationsForm'
import NotificationsManagement from './notifications/NotificationsManagement'
import OrderDetails from './containers/order/OrderDetails'
import MqQueueOrderForm from './order/create/MqQueueOrderForm'
import BigIPOrderForm from './order/create/BigIPOrderForm'
import CertificateOrderForm from './order/create/CertificateOrderForm'
import OracleDbOrderForm from './order/create/OracleDbOrderForm'
import MqChannelOrderForm from './order/create/MqChannelOrderForm'
import NodeOperationsForm from './operations/node/NodeOperationsForm'
import CredentialsOperationsForm from './operations/credentials/CredentialsOperationForm'
import CredentialOrderForm from './order/create/CredentialOrderForm'
import CustomCredentialOrderForm from './order/create/CustomCredentialOrderForm'
import AdGroupsOrderForm from './order/create/AdGroupOrderForm'
import CustomAdGroupsOrderForm from './order/create/CustomAdGroupOrderForm'
import AdGroupsOperationsForm from './operations/adgroups/AdGroupOperationForm'
import MqQueueOperationsForm from './operations/mq/mqQueueOperationsForm'
import MqChannelOperationsForm from './operations/mq/mqChannelOperationsForm'

// Routes
export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={History} />
      <Route path="/orders/:orderId" component={OrderDetails} />
      <Route exact path="/operate" component={Operate} />
      <Route exact path="/notify" component={NotificationsManagement} />
      <Route path="/operate/nodes" component={NodeOperationsForm} />
      <Route path="/operate/credentials" component={CredentialsOperationsForm} />
      <Route path="/operate/adgroups" component={AdGroupsOperationsForm} />
      <Route path="/operate/mqqueues" component={MqQueueOperationsForm} />
      <Route path="/operate/mqchannels" component={MqChannelOperationsForm} />
      <Route exact path="/create" component={Create} />
      <Route exact path="/create/bigip" component={BigIPOrderForm} />
      <Route exact path="/create/certificate" component={CertificateOrderForm} />
      <Route exact path="/create/credential" component={CredentialOrderForm} />
      <Route exact path="/create/customcredential" component={CustomCredentialOrderForm} />
      <Route exact path="/create/adgroups" component={AdGroupsOrderForm} />
      <Route exact path="/create/customadgroups" component={CustomAdGroupsOrderForm} />
      <Route exact path="/create/mqqueue" component={MqQueueOrderForm} />
      <Route exact path="/create/mqchannel" component={MqChannelOrderForm} />
      <Route exact path="/create/oracle" component={OracleDbOrderForm} />
      <Route path="/create/:orderType" component={ServerOrderForm} />
      <Route path="*" component={NotFound} />
    </Switch>
  )
}
