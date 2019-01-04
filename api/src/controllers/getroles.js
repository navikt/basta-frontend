const SUPERUSER_GROUPS = process.env['SUPERUSER_GROUPS'].split(',').map(elem => elem.trim())
const PROD_OPERATIONS_GROUPS = process.env['PROD_OPERATIONS_GROUPS']
  .split(',')
  .map(elem => elem.trim())
const OPERATION_GROUPS = process.env['OPERATION_GROUPS'].split(',').map(elem => elem.trim())

console.log('BABV ', SUPERUSER_GROUPS, PROD_OPERATIONS_GROUPS, OPERATION_GROUPS)

// match groups in token to roles
exports.matchRoles = groups => {
  let arrRoles = ['ROLE_USER']
  groups = JSON.parse(groups)
  groups.forEach(group => {
    Object.keys(roles).forEach(role => {
      if (roles[role].includes(group) && !arrRoles.includes(role)) {
        arrRoles.push(role)
      }
    })
  })
  return arrRoles
}

const roles = {
  ROLE_SUPERUSER: SUPERUSER_GROUPS,
  ROLE_PROD_OPERATIONS: PROD_OPERATIONS_GROUPS,
  ROLE_OPERATIONS: OPERATION_GROUPS
  // ROLE_USER: ['928636f4-fd0d-4149-978e-a6fb68bb19de', 'c10e6466-4d28-4467-8e93-43cacfbcff92'], //All ad users
  // TEST1: ['xxx', 'yyy'],
  // TEST2: ['yyy']
}
