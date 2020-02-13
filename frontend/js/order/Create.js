import React, { Component } from 'react'
import PageHeading from '../common/components/PageHeading'
import PropTypes from 'prop-types'
import { orderTypes } from './orderTypes'
import { connect } from 'react-redux'
import OrderGrid from './OrderGrid'
import OrderCard from './OrderCard'
import { isAvailable } from '../common/utils'

export class Create extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <PageHeading icon="fa-plus" heading="Create new order" description="" />
        <OrderGrid>
          {orderTypes.map((orderType, i) => {
            const { title, description, image, url, access } = orderType
            return (
              <OrderCard
                key={i}
                label={title}
                description={description}
                image={image}
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
