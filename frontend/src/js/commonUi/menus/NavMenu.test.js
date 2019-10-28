import React from 'react'
import { shallow } from 'enzyme'
import { NavMenu } from './NavMenu'

const unpriviligedUser = {
  userProfile: {
    roles: ['ROLE_USER']
  }
}

const priviligedUser = {
  userProfile: {
    roles: ['ROLE_SUPERUSER']
  }
}

describe('(Component) NavMenu', () => {
  const wrapper = shallow(<NavMenu dispatch={() => {}} user={unpriviligedUser} />)

  it('Renders without exploding', () => {
    expect(wrapper.length).toBe(1)
    expect(wrapper.find('ul').children().length).toBe(3)
  })
})

describe('(Component) NavMenu with notifications aceess', () => {
  const wrapper = shallow(<NavMenu dispatch={() => {}} user={priviligedUser} />)

  it('Superusers see the notifications meny item', () => {
    expect(wrapper.find('ul').children().length).toBe(4)
  })
})
