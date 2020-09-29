import { isAvailable } from './utils'

describe('isAvailable function', () => {
  const roles = ['ROLE1']
  const noAccess = ['NOMATCH']
  const access = ['ROLE1', 'ROLE2']
  const multipleRoles = ['ROLE1', 'ANOTHER']

  it('should return true if no access is required', () => {
    expect(isAvailable(undefined, roles)).toBeTruthy()
  })
  it('should return false if no match between roles and access', () => {
    expect(isAvailable(noAccess, roles)).toBeFalsy()
  })
  it('should return true if either access match role', () => {
    expect(isAvailable(access, roles)).toBeTruthy()
  })
  it('should return true if either role match access', () => {
    expect(isAvailable(access, multipleRoles))
  })
})
