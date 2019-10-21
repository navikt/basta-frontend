import React from 'react'
import sinon from 'sinon'
import { shallow } from 'enzyme'
import { CredentialsOperationForm } from './CredentialsOperationForm'
import {
  ErrorPanel,
  InfoPanel,
  OrderButtonGroup,
  ApplicationsDropDown,
  OperationsButtons
} from '../../../commonUi/formComponents'

const props = {
  user: {
    userProfile: {
      roles: ['ROLE_USER', 'ROLE_SUPERUSER', 'ROLE_PROD_OPERATIONS', 'ROLE_OPERATIONS']
    }
  },
  credentialsInfo: {
    existInAD: true,
    existInFasit: false
  }
}

const form = {
  environmentClass: 'env',
  zone: 'zone',
  applicationMappingName: 'app'
}

describe('(Component) CredentialsOperationForm logic', () => {
  let dispatch
  let wrapper

  beforeEach(() => {
    dispatch = sinon.spy()
    wrapper = shallow(<CredentialsOperationForm {...props} dispatch={dispatch} />)
  })

  it('(handleChange) sets state with args', () => {
    wrapper.instance().handleChange('zone', 'party')
    expect(wrapper.state().form.zone).toBe('party')
  })

  it('(submitHandler) dispatches right action with args', () => {
    wrapper.setState({ form: 'form' })
    wrapper.instance().submitHandler('fish')
    expect(dispatch.args[0][0].type).toBe('SUBMIT_OPERATION')
    expect(dispatch.args[0][0].key).toBe('credentials')
    expect(dispatch.args[0][0].form).toBe('form')
    expect(dispatch.args[0][0].operation).toBe('fish')
  })

  it('(validateForm) returns !undefined if form is valid', () => {
    expect(wrapper.instance().validateForm(form)).toEqual('app')
  })

  it('(credentialLookup) dispatches right action with args', () => {
    wrapper.instance().credentialLookup(form)
    expect(dispatch.args[0][0].type).toBe('CREDENTIAL_LOOKUP_REQUEST')
    expect(dispatch.args[0][0].form).toBe(form)
  })

  it('(verifySchema) sets correct state', () => {
    wrapper.instance().verifySchema()
    expect(wrapper.state().messages[0]).toBe('Service user not found in Fasit.')
    expect(wrapper.state().hasAccess).toEqual(true)
  })

  it('(componentDidUpdate) dispatches right action with args', () => {
    wrapper.setState({ form })
    wrapper
      .instance()
      .componentDidUpdate(
        { ...props, credentialsInfo: { existInAD: true, existInFasit: false } },
        { ...form, zone: 'party' }
      )
    expect(dispatch.args[0][0].type).toBe('CREDENTIAL_LOOKUP_REQUEST')
    expect(dispatch.args[0][0].form).toBe(form)
    expect(wrapper.state().messages[0]).toBe('Service user not found in Fasit.')
    expect(wrapper.state().hasAccess).toEqual(true)
  })
})

describe('(Component) CredentialsOperationForm rendering', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<CredentialsOperationForm {...props} />)
  })

  it('Renders without exploding', () => {
    expect(wrapper.length).toBe(1)
  })

  it('renders OrderButtonGroup twice', () => {
    expect(wrapper.find(OrderButtonGroup)).toHaveLength(2)
  })

  it('renders ApplicationsDropDown once', () => {
    expect(wrapper.find(ApplicationsDropDown)).toHaveLength(1)
  })

  it('renders InfoPanel once', () => {
    expect(wrapper.find(InfoPanel)).toHaveLength(1)
  })

  it('renders ErrorPanel once', () => {
    expect(wrapper.find(ErrorPanel)).toHaveLength(1)
  })

  it('renders OperationsButtons once', () => {
    expect(wrapper.find(OperationsButtons)).toHaveLength(1)
  })
})
