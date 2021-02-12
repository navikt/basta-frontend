process.env['SUPERUSER_GROUPS'] = 'superUserGroup'
process.env['PROD_OPERATIONS_GROUPS'] = 'prodOperationsGroup, superUserGroup'
process.env['OPERATION_GROUPS'] = 'operationGroups'

const getRoles = require('./getroles')

test('Returns default USER role when no specific matching roles', () => {
  expect(getRoles.matchRoles(['doesnotExist'])).toEqual(['ROLE_USER'])
})
test('Returns role matching group in addition to default USER role', () => {
  expect(getRoles.matchRoles(['prodOperationsGroup'])).toEqual([
    'ROLE_USER',
    'ROLE_PROD_OPERATIONS'
  ])
})
test('Returns multiple groups when a match is found', () => {
  expect(getRoles.matchRoles(['superUserGroup'])).toEqual([
    'ROLE_USER',
    'ROLE_SUPERUSER',
    'ROLE_PROD_OPERATIONS'
  ])
})
