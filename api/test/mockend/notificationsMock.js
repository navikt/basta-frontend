let activeNotifications = []

exports.postNotification = () => {
  return (req, res) => {
    const message = req.body.message

    const notification = {
      id: 69,
      created: 1571988153642,
      createdBy: 'x123456',
      updated: 1571988153642,
      updatedBy: 'x123456',
      updatedByDisplayName: 'Bjarne Melgaard',
      createdByDisplayName: 'Bjarne Melgaard',
      message: `${message}`,
      active: true,
      blockOperations: false
    }
    activeNotifications.push(notification)
    res.status(200).send()
  }
}

exports.getActiveNotifications = () => {
  return (req, res) => {
    res.status(200).json(activeNotifications)
  }
}
