import React, { Component } from 'react'
import PageHeading from '../../common/components/PageHeading'
import PropTypes from 'prop-types'
import { orderTypes } from './orderTypes'
import { connect } from 'react-redux'
import OrderGrid from '../../common/components/OrderGrid'
import OrderCard from '../../common/components/OrderCard'
import OrderFilter from '../../common/components/OrderFilter'
import { isAvailable } from '../../common/utils'

export class Create extends Component {
  constructor(props) {
    super(props)
    this.state = {
      orderTypes,
      filteredOrders: orderTypes
    }
  }

  filterString(filter) {
    const filteredOrders = this.state.orderTypes.filter(orderType => {
      return (
        orderType.tags.filter(tag => {
          return tag.match(filter)
        }).length > 0
      )
    })
    this.setState({ filteredOrders })
  }

  render() {
    return (
      <div>
        <PageHeading icon="fa-plus" heading="Create new order" description="" />
        <OrderFilter onChange={e => this.filterString(e)} />
        <OrderGrid>
          {this.state.filteredOrders.map((orderType, i) => {
            const { title, description, image, tags, url, access } = orderType
            return (
              <OrderCard
                key={i}
                label={title}
                description={description}
                image={image}
                tags={tags}
                url={url}
                access={access}
                enabled={isAvailable(access, this.props.user.userProfile.roles)}
              />
            )
          })}
        </OrderGrid>
      </div>
    )
  }
}

Create.propTypes = {}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps)(Create)
