import moment from 'moment'

export const tagOrders = orders => {
  return orders.map(e => {
    return {
      ...e,
      tags: buildTags(e)
    }
  })
}

export const filterOrders = (orders, filter) => {
  let multiArray = []
  let filteredArray = []
  const filters = filter.split(' ')
  filters.forEach((filter, i) => {
    multiArray[i] = filterArray(orders, filter)
    if (i > 0) {
      multiArray[i] = filterArray(multiArray[i - 1], filter)
    }
    filteredArray = multiArray[i]
  })
  return filteredArray
}

export const formatOrders = orders => {
  return orders.map(e => {
    return {
      ...e,
      created: formatTimestamp(e.created),
      orderDescription: formatString(e.orderDescription),
      orderOperation: formatString(e.orderOperation),
      orderType: e.orderType,
      updated: formatTimestamp(e.updated),
      tags: buildTags(e)
    }
  })
}

const filterArray = (array, filter) => {
  const regexp = new RegExp(filter, 'i')
  return array.filter(e => {
    let bool = false
    e.tags.forEach(tag => {
      if (typeof tag === 'object' && tag.length > 0 && tag[0] != null) {
        tag.forEach(result => {
          if (result.match(regexp)) bool = true
        })
      } else if (typeof tag != 'undefined' && tag && typeof tag === 'string') {
        if (tag.match(regexp)) bool = true
      } else {
        return null
      }
    })
    return bool
  })
}

const formatTimestamp = number => {
  if (number) {
    return moment(number).format('lll')
  }
}

const formatString = string => {
  if (string) {
    string = string
      .toLowerCase()
      .split('_')
      .join(' ')
    return string.replace(/\b\w/g, letter => {
      return letter.toUpperCase()
    })
  }
}

const buildTags = e => {
  return [
    e.createdBy,
    e.createdByDisplayName,
    e.orderDescription,
    e.orderOperation,
    e.orderType,
    e.results
  ]
}
