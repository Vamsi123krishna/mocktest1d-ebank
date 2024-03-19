import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

class LoginRoute extends Component {
  state = {
    userid: '',
    pin: '',
    errorMsg: '',
    showSubmitError: false,
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onChangingUserId = event => {
    this.setState({userid: event.target.value})
  }

  onChangingPIN = event => {
    this.setState({pin: event.target.value})
  }

  onSubmittingForm = async event => {
    event.preventDefault()
    const {userid, pin} = this.state
    const userDetails = {userid, pin}
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderUserId = () => {
    const {userid} = this.state
    return (
      <div>
        <label htmlFor="UserId">User ID</label>
        <input
          id="UserId"
          type="text"
          placeholder="UserId"
          value={userid}
          onChange={this.onChangingUserId}
        />
      </div>
    )
  }

  renderPin = () => {
    const {pin} = this.state
    return (
      <div>
        <label htmlFor="pin">PIN</label>
        <input
          id="pin"
          type="password"
          placeholder="Enter PIN"
          value={pin}
          onChange={this.onChangingPIN}
        />
      </div>
    )
  }

  render() {
    const {errorMsg, showSubmitError} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div>
        <form onSubmit={this.onSubmittingForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
          />
          <h1>Welcome Back!</h1>
          {this.renderUserId()}
          {this.renderPin()}
          <button type="submit">Login</button>
          <div>{showSubmitError && <p>{errorMsg}</p>}</div>
        </form>
      </div>
    )
  }
}

export default LoginRoute
