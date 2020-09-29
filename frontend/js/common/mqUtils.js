/* Fasit has several queue managers mapped to different scopes using different aliases. 
Basta only cares about the distinct queue managers so we transform the list of queue managers from fasit to the following format 
{
QUEUE_MANAGER_1_NAME: 
    { mqAddress: 'mq://quemanagerhostname:port/queueManagerName',
      aliases: [fasitAlias1, fasitAlias2] }
},
QUEUE_MANGER_2_NAME: 
    {...}
}

We also filter out queue managers mapped to different environments than the environment the user has selected as these are not relevant to show. 

*/

export const groupQueueManagersByName = (resources, environmentName) => {
  return resources
    .filter(
      resource => !resource.scope.environment || resource.scope.environment === environmentName
    )
    .map(resource => {
      return {
        alias: resource.alias,
        queueManagerName: resource.properties.name,
        mqAddress: `mq://${resource.properties.hostname}:${resource.properties.port}/${resource.properties.name}`
      }
    })
    .reduce((result, currentValue) => {
      const queueManagerName = currentValue['queueManagerName']

      if (!result.hasOwnProperty(queueManagerName)) {
        result[queueManagerName] = {}
        result[queueManagerName].mqAddress = currentValue['mqAddress']
        result[queueManagerName].aliases = new Set()
      }

      result[queueManagerName].aliases.add(currentValue['alias'])
      return result
    }, {})
}
