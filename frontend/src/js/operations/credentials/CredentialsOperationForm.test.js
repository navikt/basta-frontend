import React from 'react'
import sinon from 'sinon'
import { shallow } from 'enzyme'
import { CredentialsOperationForm } from './CredentialsOperationForm'
import { ApplicationsDropDown, OperationsButtons } from '../../commonUi/formComponents'
import { InfoStripe, ErrorStripe } from '../../commonUi/formComponents/AlertStripe'

const props = {
  user: {
    userProfile: {
      roles: ['ROLE_USER', 'ROLE_SUPERUSER', 'ROLE_PROD_OPERATIONS', 'ROLE_OPERATIONS']
    }
  },
  existInAD: true,
  existInFasit: false
}

const form = {
  environmentClass: 'env',
  zone: 'zone',
  application: 'app'
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
    expect(wrapper.state().zone).toBe('party')
  })

  it('(submitHandler) dispatches right action with args', () => {
    wrapper.setState({ application: 'app' })
    wrapper.instance().submitHandler()

    expect(dispatch.args[0][0].type).toBe('CREDENTIAL_LOOKUP_REQUEST')
    expect(dispatch.args[1][0].type).toBe('SUBMIT_OPERATION')
    expect(dispatch.args[1][0].key).toBe('credentials')
    expect(dispatch.args[1][0].form).toEqual({
      environmentClass: 'u',
      zone: 'fss',
      application: 'app'
    })
  })

  it('(credentialLookup) dispatches right action with args', () => {
    wrapper.instance().credentialLookup(form)
    expect(dispatch.args[0][0].type).toBe('CREDENTIAL_LOOKUP_REQUEST')
    expect(dispatch.args[0][0].form).toBe(form)
  })

  it('(componentDidUpdate) credential lookup action is fired when local state changes', () => {
    wrapper.setState({ ...form })
    wrapper
      .instance()
      .componentDidUpdate(
        { ...props, existInAD: true, existInFasit: false },
        { ...form, zone: 'party' }
      )

    expect(dispatch.args[0][0].type).toBe('CREDENTIAL_LOOKUP_REQUEST')
    expect(dispatch.args[0][0].form).toEqual(form)
  })

  it('correct info message is shown of user is missing from fasit', () => {
    wrapper.setState({ ...form })
    wrapper.setProps({ existInAD: true, existInFasit: false })
    expect(
      wrapper
        .find(InfoStripe)
        .findWhere(n => n.prop('show') === true)
        .prop('message')
    ).toEqual(
      'Service user for app does not exist in fasit for this in this environment class and zone. Service user will only be deleted from AD.'
    )
  })

  it('correct info message is shown of user is missing from AD', () => {
    wrapper.setState({ ...form })
    wrapper.setProps({ existInAD: false, existInFasit: true })

    expect(
      wrapper
        .find(InfoStripe)
        .findWhere(n => n.prop('show') === true)
        .prop('message')
    ).toEqual(
      'Service user for app does not exist in AD for this in this environment class and zone. Service user will only be deleted from Fasit.'
    )
  })

  it('Error message is shown and delete button is disabled if user is missing from both fasit and AD', () => {
    wrapper.setState({ ...form })
    wrapper.setProps({ lookupComplete: true, existInAD: false, existInFasit: false })

    expect(wrapper.find(ErrorStripe).findWhere(n => n.prop('show') === true).length).toBe(1)
    expect(wrapper.find(OperationsButtons).prop('hasAccess')).toBe(false)
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

  it('renders ApplicationsDropDown once', () => {
    expect(wrapper.find(ApplicationsDropDown)).toHaveLength(1)
  })

  it('renders OperationsButtons once', () => {
    expect(wrapper.find(OperationsButtons)).toHaveLength(1)
  })
})
