import React from 'react'
import sinon from 'sinon'
import { shallow } from 'enzyme'
import { History } from './History'
import PageHeading from '../../common/components/PageHeading'
import BottomScrollListener from '../../common/components/BottomScrollListener'
import HistoryFilter from '../../common/components/HistoryFilter'
import OrderList from './order-list/OrderList'
import HistoryCounter from './history-counter/HistoryCounter'

const props = {
  totalOrders: 10,
  filteredOrderHistory: [
    {
      id: 24403,
      created: 1534318234218,
      createdBy: 'h151388',
      updated: 1534319387631,
      updatedBy: 'srvOrchestrator',
      updatedByDisplayName: 'Service User',
      createdByDisplayName: 'Even Hansen',
      orderType: 'VM',
      results: ['d26jbsl01518.test.local'],
      input: null,
      externalId:
        'https://orcprod.adeo.no:443/vco/api/workflows/110abd83-455e-4aef-b141-fc4512bafec2/executions/8a819397652704a001653c7e4cd2303d/',
      uri: 'https://basta.adeo.no/rest/orders/24403',
      status: 'SUCCESS',
      errorMessage: null,
      orderDescription: 'WILDFLY',
      orderOperation: 'CREATE',
      nextOrderId: null,
      previousOrderId: null,
      resultDetails: []
    },
    {
      id: 24402,
      created: 1534315029884,
      createdBy: 'srvfasit',
      updated: 1534315061586,
      updatedBy: 'srvOrchestrator',
      updatedByDisplayName: 'Service User',
      createdByDisplayName: 'Service User',
      orderType: 'VM',
      results: [],
      input: null,
      externalId:
        'https://orcprod.adeo.no:443/vco/api/workflows/557dccf4-863a-49b3-b9f5-53a70f5b9fc2/executions/8a819397652704a001653c4d65db2fd3/',
      uri: 'https://basta.adeo.no/rest/orders/24402',
      status: 'ERROR',
      errorMessage: null,
      orderDescription: 'JBOSS',
      orderOperation: 'DELETE',
      nextOrderId: null,
      previousOrderId: null,
      resultDetails: []
    },
    {
      id: 24401,
      created: 1534315028624,
      createdBy: 'srvfasit',
      updated: 1534315046622,
      updatedBy: 'srvOrchestrator',
      updatedByDisplayName: 'Service User',
      createdByDisplayName: 'Service User',
      orderType: 'VM',
      results: [],
      input: null,
      externalId:
        'https://orcprod.adeo.no:443/vco/api/workflows/f8f03155-fe07-436c-ad14-561158332130/executions/8a819397652704a001653c4d63102fce/',
      uri: 'https://basta.adeo.no/rest/orders/24401',
      status: 'ERROR',
      errorMessage: null,
      orderDescription: 'JBOSS',
      orderOperation: 'STOP',
      nextOrderId: null,
      previousOrderId: null,
      resultDetails: []
    },
    {
      id: 24400,
      created: 1534314352548,
      createdBy: 'o142910',
      updated: 1534314433699,
      updatedBy: 'unauthenticated',
      updatedByDisplayName: 'unauthenticated',
      createdByDisplayName: 'Anders Østby',
      orderType: 'OracleDB',
      results: ['SYFOGSAK_P'],
      input: null,
      externalId: '/em/cloud/dbaas/pluggabledbplatforminstance/byrequest/2101',
      uri: 'https://basta.adeo.no/rest/orders/24400',
      status: 'ERROR',
      errorMessage: null,
      orderDescription: 'Oracle',
      orderOperation: 'CREATE',
      nextOrderId: null,
      previousOrderId: null,
      resultDetails: []
    },
    {
      id: 24399,
      created: 1534311671217,
      createdBy: 's145839',
      updated: 1534312524436,
      updatedBy: 'srvOrchestrator',
      updatedByDisplayName: 'Service User',
      createdByDisplayName: 'Terje Sannum',
      orderType: 'VM',
      results: ['e34apvl00545.devillo.no'],
      input: null,
      externalId:
        'https://orcprod.adeo.no:443/vco/api/workflows/110abd83-455e-4aef-b141-fc4512bafec2/executions/8a819397652704a001653c1a27a82f4a/',
      uri: 'https://basta.adeo.no/rest/orders/24399',
      status: 'SUCCESS',
      errorMessage: null,
      orderDescription: 'PLAIN_LINUX',
      orderOperation: 'CREATE',
      nextOrderId: null,
      previousOrderId: null,
      resultDetails: []
    },
    {
      id: 24398,
      created: 1534302348325,
      createdBy: 'srvauraautodeploy',
      updated: 1534302348325,
      updatedBy: 'srvauraautodeploy',
      updatedByDisplayName: 'Service User',
      createdByDisplayName: 'Service User',
      orderType: 'ServiceUser',
      results: ['srvsyfomock@test.local'],
      input: null,
      externalId: 'N/A',
      uri: 'https://basta.adeo.no/rest/orders/24398',
      status: 'SUCCESS',
      errorMessage: null,
      orderDescription: 'Certificate',
      orderOperation: 'CREATE',
      nextOrderId: null,
      previousOrderId: null,
      resultDetails: []
    },
    {
      id: 24397,
      created: 1534252950659,
      createdBy: 't130787',
      updated: 1534296385682,
      updatedBy: 'unauthenticated',
      updatedByDisplayName: 'unauthenticated',
      createdByDisplayName: 'Håvard Tronhus',
      orderType: 'VM',
      results: [],
      input: null,
      externalId:
        'https://orcprod.adeo.no:443/vco/api/workflows/110abd83-455e-4aef-b141-fc4512bafec2/executions/8a819397652704a00165389a26d927d6/',
      uri: 'https://basta.adeo.no/rest/orders/24397',
      status: 'ERROR',
      errorMessage: null,
      orderDescription: 'WILDFLY',
      orderOperation: 'CREATE',
      nextOrderId: null,
      previousOrderId: null,
      resultDetails: []
    },
    {
      id: 24396,
      created: 1534249010252,
      createdBy: 'k134403',
      updated: 1534249093663,
      updatedBy: 'unauthenticated',
      updatedByDisplayName: 'unauthenticated',
      createdByDisplayName: 'Hilde Kveim',
      orderType: 'OracleDB',
      results: ['SECURITYTOKENSERVICE_Q1'],
      input: null,
      externalId: '/em/cloud/dbaas/pluggabledbplatforminstance/byrequest/2085',
      uri: 'https://basta.adeo.no/rest/orders/24396',
      status: 'ERROR',
      errorMessage: null,
      orderDescription: 'Oracle',
      orderOperation: 'CREATE',
      nextOrderId: null,
      previousOrderId: null,
      resultDetails: []
    },
    {
      id: 24395,
      created: 1534246507424,
      createdBy: 'R137915',
      updated: 1534246550290,
      updatedBy: 'srvOrchestrator',
      updatedByDisplayName: 'Service User',
      createdByDisplayName: 'Sten Ivar Røkke',
      orderType: 'VM',
      results: ['d26apvl00098.test.local'],
      input: null,
      externalId:
        'https://orcprod.adeo.no:443/vco/api/workflows/557dccf4-863a-49b3-b9f5-53a70f5b9fc2/executions/8a819397652704a001653837d5b126b4/',
      uri: 'https://basta.adeo.no/rest/orders/24395',
      status: 'WARNING',
      errorMessage: null,
      orderDescription: 'DOCKERHOST',
      orderOperation: 'DELETE',
      nextOrderId: null,
      previousOrderId: null,
      resultDetails: []
    },
    {
      id: 24394,
      created: 1534242722819,
      createdBy: 't130787',
      updated: 1534243927442,
      updatedBy: 'srvOrchestrator',
      updatedByDisplayName: 'Service User',
      createdByDisplayName: 'Håvard Tronhus',
      orderType: 'VM',
      results: ['d26jbsl01525.test.local'],
      input: null,
      externalId:
        'https://orcprod.adeo.no:443/vco/api/workflows/110abd83-455e-4aef-b141-fc4512bafec2/executions/8a819397652704a0016537fe144a2549/',
      uri: 'https://basta.adeo.no/rest/orders/24394',
      status: 'ERROR',
      errorMessage: null,
      orderDescription: 'WILDFLY',
      orderOperation: 'CREATE',
      nextOrderId: null,
      previousOrderId: null,
      resultDetails: []
    }
  ]
}

describe('(Component) History container rendering', () => {
  const dispatch = () => {}
  const wrapper = shallow(<History {...props} dispatch={dispatch} />)

  it('renders without exploding', () => {
    expect(wrapper.length).toBe(1)
  })

  it('renders BottomScrollListener once', () => {
    expect(wrapper.find(BottomScrollListener)).toHaveLength(1)
  })

  it('renders PageHeading once', () => {
    expect(wrapper.find(PageHeading)).toHaveLength(1)
  })

  it('renders HistoryCounter once with props', () => {
    expect(wrapper.find(HistoryCounter)).toHaveLength(1)
    expect(wrapper.find(HistoryCounter).props().totalOrders).toBe(10)
    wrapper.setState({ nMaxResults: 10 })
    expect(wrapper.find(HistoryCounter).props().displayingOrders).toBe(10)
  })

  it('renders HistoryFilter once with props', () => {
    expect(wrapper.find(HistoryFilter)).toHaveLength(1)
    expect(wrapper.find(HistoryFilter).props().handleSubmit).toBeDefined()
    expect(wrapper.find(HistoryFilter).props().handleChange).toBeDefined()
  })

  it('renders OrderList once', () => {
    expect(wrapper.find(OrderList)).toHaveLength(1)
    wrapper.setState({ nMaxResults: 5 })
    expect(wrapper.find(OrderList).props().orderHistory).toHaveLength(5)
  })
})

describe('(Component) History container logic', () => {
  const dispatch = sinon.spy()
  const wrapper = shallow(<History {...props} dispatch={dispatch} />)

  it('(handleSubmit) dispatches right action with args', () => {
    wrapper.setState({ filter: 'fiiiilter' })
    wrapper.instance().handleSubmit({ preventDefault: () => {} })
    expect(dispatch.args[1][0].type).toBe('HISTORY_APPLY_FILTER')
    expect(dispatch.args[1][0].filter).toBe('fiiiilter')
  })

  it('(handleChange) sets state with args', () => {
    wrapper.instance().handleChange({ target: { value: 'new filter' } })
    expect(wrapper.state().filter).toBe('new filter')
  })

  it('(onBottom) increments state', () => {
    wrapper.instance().onBottom({ target: { value: 'new filter' } })
    expect(wrapper.state().nMaxResults).toBe(10)
  })

  it('(componentDidMount) dispatches right action with args', () => {
    wrapper.setState({ filter: 'initial filter' })
    wrapper.instance().componentDidMount()
    expect(dispatch.args[2][0].type).toBe('HISTORY_APPLY_FILTER')
    expect(dispatch.args[2][0].filter).toBe('initial filter')
  })
})
