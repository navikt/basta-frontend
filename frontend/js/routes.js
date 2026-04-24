import React from 'react'
import { Route, Routes as RouterRoutes } from 'react-router'

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
    <RouterRoutes>
      <Route path="/" element={<History />} />
      <Route path="/orders/:orderId" element={<OrderDetails />} />
      <Route path="/operate" element={<Operate />} />
      <Route path="/notify" element={<NotificationsManagement />} />
      <Route path="/operate/nodes" element={<NodeOperationsForm />} />
      <Route path="/operate/credentials" element={<CredentialsOperationsForm />} />
      <Route path="/operate/adgroups" element={<AdGroupsOperationsForm />} />
      <Route path="/operate/mqqueues" element={<MqQueueOperationsForm />} />
      <Route path="/operate/mqchannels" element={<MqChannelOperationsForm />} />
      <Route path="/create" element={<Create />} />
      <Route path="/create/bigip" element={<BigIPOrderForm />} />
      <Route path="/create/certificate" element={<CertificateOrderForm />} />
      <Route path="/create/credential" element={<CredentialOrderForm />} />
      <Route path="/create/customcredential" element={<CustomCredentialOrderForm />} />
      <Route path="/create/adgroups" element={<AdGroupsOrderForm />} />
      <Route path="/create/customadgroups" element={<CustomAdGroupsOrderForm />} />
      <Route path="/create/mqqueue" element={<MqQueueOrderForm />} />
      <Route path="/create/mqchannel" element={<MqChannelOrderForm />} />
      <Route path="/create/oracle" element={<OracleDbOrderForm />} />
      <Route path="/create/:orderType" element={<ServerOrderForm />} />
      <Route path="*" element={<NotFound />} />
    </RouterRoutes>
  )
}
