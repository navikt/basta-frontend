//const orders = require('../mockdata/orders.json')
// Uncomment line below if you need to test with a large list of orders (20000). Note: This will probably make the dev experience slow
const orders = require('../mockdata/large_order_list_for_pagination_test.json')

// Uncomment line below to use certificate order details instead of vm order details
//const order = require('../mockdata/certificate_order_mock.json')
//const order = require('../mockdata/custom_credential_order_mock.json')
//const order = require('../mockdata/vm_order_mock.json')
const statusLog = require('../mockdata/statuslog.json')
const orderMock = require('../mockdata/orderCreated.json')
const removedQueueOrderMock = require('../mockdata/removeQueueOrder.json')

const paginate = (pageId, pageSize, data) => {
  if (pageSize > 1000) throw 'Page size out of bounds (1000 Max value)'
  const startIndex = pageId * pageSize
  const endIndex = startIndex + pageSize
  return data.slice(startIndex, endIndex)
}

exports.getAllOrders = () => {
  return (req, res) => {
    res.status(200).json(orders)
  }
}

exports.removeMq = () => {
  return (req, res) => {
    res.status(200).json({ orderId: 1412 })
  }
}

exports.search = () => {
  return (req, res) => {
    const query = req.query.q.toLowerCase()
    const filteredOrders = orders.filter(order => {
      return (
        (order.createdByDisplayName && order.createdByDisplayName.toLowerCase().includes(query)) ||
        order.orderDescription.toLowerCase().includes(query) ||
        (order.results[0] && order.results[0].toLowerCase().includes(query))
      )
    })
    res
      .set('Total_count', filteredOrders.length)
      .status(200)
      .json(filteredOrders)
  }
}

exports.getOrders = () => {
  return async (req, res) => {
    let requestedData

    try {
      requestedData = await paginate(
        parseInt(req.params.pageId),
        parseInt(req.params.pageSize),
        orders
      )
    } catch (err) {
      console.log(err)
      res.status(500).send(err)
      return null
    }
    res
      .set('Total_count', orders.length)
      .status(200)
      .json(requestedData)
  }
}

exports.getOrder = () => {
  return (req, res) => {
    try {
      if (req.params.id === '6666') {
        res.status(200).json(orderMock[1])
      } else if (req.params.id === '1412') {
        res.status(200).json(removedQueueOrderMock)
      } else {
        res.status(200).json(orderMock[0])
      }
    } catch (err) {
      console.log(err)
      res.status(500).send(err)
    }
  }
}

exports.getStatusLog = () => {
  return (req, res) => {
    try {
      res.status(200).json(statusLog)
    } catch (err) {
      console.log(err)
      res.status(500).send(err)
    }
  }
}

exports.decommission = () => {
  return (req, res) => {
    res.status(200).json({ orderId: 6969 })
  }
}

exports.postOrder = () => {
  return (req, res) => {
    if (req.params.servertype === 'containerlinux') {
      res
        .status(500)
        .send(
          'This order is hardcoded to fail. Do not be confused. See postOrder function in orderMock.js.'
        )
    }
    try {
      // proper backend @ vm/orders/jboss
      res.status(200).json(orderMock[0])
    } catch (err) {
      res.status(500).send(err)
    }
  }
}

exports.postOrderWithDelay = () => {
  return (req, res) => {
    try {
      setTimeout(() => {
        res.status(200).send('6969')
      }, 3000)
      // proper backend @ vm/orders/jboss
    } catch (err) {
      res.status(500).send(err)
    }
  }
}
