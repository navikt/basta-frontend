import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { OrderTextBox } from '../commonUi/formComponents'
import SubmitButton from '../commonUi/formComponents/SubmitButton'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

export class ServerOrderForm extends Component {
  constructor(props) {
    super(props)
  }

  initialState() {}

  componentDidUpdate(prevProps, prevState) {}

  handleChange(field, value) {
    this.setState({ [field]: value })
  }

  validOrder() {}

  render() {
    return (
      <div>
        <div className="orderForm">
          <div className="orderFormImage">
            <img src={this.configuration.image} />
          </div>
          <div className="orderFormHeading">
            <div className="orderFormTitle">Notifications</div>
          </div>

          <SubmitButton
            disabled={!this.validOrder()}
            onClick={() =>
              dispatch(
                submitForm(this.currentComponent, this.state, this.configuration.orderApiPath)
              )
            }
          />
        </div>
      </div>
    )
  }
}

ServerOrderForm.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  orderFields: PropTypes.object,
  onSubmit: PropTypes.func,
  dispatch: PropTypes.func
}
const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default withRouter(connect(mapStateToProps)(ServerOrderForm))
