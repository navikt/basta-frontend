import React from 'react'
import { Route, Switch, Layout } from 'react-router'

import History from '../containers/history/History'
import Operate from '../containers/operate/Operate'
import Create from '../containers/create/Create'
import { NotFound } from '../containers/notfound/NotFound'
import OrderForm from '../order/OrderForm'
import OperationsForm from './components/OperationsForm'
import OrderDetails from '../containers/order/OrderDetails'
import MqQueue from '../order/create/MqQueue'
import BigIPOrderForm from '../order/create/BigIPOrderForm'
import CertificateOrderForm from '../order/create/CertificateOrderForm'
import OracleDbOrderForm from '../order/create/OracleDbOrderForm'
import MqChannel from '../order/create/MqChannel'
import NodeOperationsForm from './components/Operations/NodeOperationsForm'
import CredentialsOperationsForm from './components/Operations/CredentialsOperationForm'
import CredentialOrderForm from '../order/create/CredentialOrderForm';

// Routes
export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={History} />
      <Route path="/orders/:orderId" component={OrderDetails} />
      <Route exact path="/operate" component={Operate} />
      <Route path="/operate/nodes" component={NodeOperationsForm} />
      <Route path="/operate/credentials" component={CredentialsOperationsForm} />
      <Route path="/operate/:orderType" component={OperationsForm} />
      <Route exact path="/create" component={Create} />
      <Route exact path="/create/bigip" component={BigIPOrderForm} />
      <Route exact path="/create/certificate" component={CertificateOrderForm} />
      <Route exact path="/create/credential" component={CredentialOrderForm} />
      <Route exact path="/create/mqqueue" component={MqQueue} />
      <Route exact path="/create/mqchannel" component={MqChannel} />
      <Route exact path="/create/oracle" component={OracleDbOrderForm} />
      <Route path="/create/:orderType" component={OrderForm} />
      <Route path="*" component={NotFound} />
    </Switch>
  )
}
