const SUPERUSER_GROUPS = getAccessGroups(process.env['SUPERUSER_GROUPS'])
const PROD_OPERATIONS_GROUPS = getAccessGroups(process.env['PROD_OPERATIONS_GROUPS'])
const OPERATION_GROUPS = getAccessGroups(process.env['OPERATION_GROUPS'])

function getAccessGroups(groupString) {
  if (groupString && groupString.length > 0) {
    return groupString.split(',').map(elem => elem.trim())
  }
  return []
}

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
}
