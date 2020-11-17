import { Component } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

import BackButton from "../components/BackButton"
import Button from "../components/Button"
import Page from "../components/Page"
import TextInput from "../components/TextInput"

import { getUserInfo, loadCookies, logout, updateUserInfo } from "../redux/actions/user"

import styles from "./Profile.module.css"

function mapStateToProps(store, ownProps) {
  return {
    dark_mode: store.settings.dark_mode,
    loggedin: store.user.loggedin,
    loggedin_check: store.user.loggedin_check,
    loggedin_loading: store.user.loggedin_loadingm,
    username: store.user.username,
    token: store.user.token,
    name: store.user.name,
    email: store.user.email,
    phone_number: store.user.phone_number,
    info_loading: store.user.info_loading,
    update_error: store.user.update_error,
    show_update_saved: store.user.show_update_saved
  }
}

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      error: undefined,
      lastError: undefined,
      name: "",
      nameChanged: false,
      email: "",
      emailChanged: false,
      phoneNumber: "",
      phoneNumberChanged: false,
      password: "",
      confirm_password: ""
    }
  }

  componentDidMount() {
    const { loggedin_check, loggedin_loading, username, token } = this.props
    this.setState({
      name: "",
      nameChanged: false,
      email: "",
      emailChanged: false,
      phoneNumber: "",
      phoneNumberChanged: false,
      password: "",
      confirm_password: ""
    })
    if (!loggedin_check && !loggedin_loading) {
      this.props.dispatch(loadCookies())
    }
    if (username !== undefined && token !== undefined) {
      this.props.dispatch(getUserInfo(username, token))
    }
  }

  onTextChange(e) {
    this.setState({ [e.target.id]: e.target.value })
    switch (e.target.id) {
      case "name":
      case "email":
      case "phoneNumber":
        this.setState({ [e.target.id + "Changed"]: e.target.value })
        break
      default:
    }
  }

  onLogoutClicked() {
    const { username, token } = this.props
    this.props.dispatch(logout(username, token))
  }

  onBackButtonClicked(e) {
    this.props.history.push("/current")
  }

  handleSubmit(e) {
    e.preventDefault()
    this.clearError()
    const { username, token } = this.props
    const { name, email, password, confirm_password, phoneNumber } = this.state
    let good = true
    if (password !== "") {
      if (password.length < 5) {
        this.setState({ error: "Password must be atleast 6 charcters long" })
        good = false
      } else if (password !== confirm_password) {
        this.setState({ error: "Passwords do not match" })
        good = false
      }
    }
    if (good) {
      this.props.dispatch(updateUserInfo(username, token, name, email, phoneNumber, (password !== "") ? password : undefined))
    }
    this.setState({ password: "", confirm_password: "" }) // Clear password and confirmed password
  }

  clearError() {
    this.setState({ error: undefined })
  }

  componentDidUpdate() {
    const { name, email, phone_number, info_loading, username, token, update_error } = this.props
    const { nameChanged, emailChanged, phoneNumberChanged, lastError } = this.state
    if (!info_loading && (name === undefined || email === undefined || phone_number === undefined) && username !== undefined && token !== undefined) {
      this.props.dispatch(getUserInfo(username, token))
    }
    if (!nameChanged && name !== undefined && name !== this.state.name) {
      this.setState({ name })
    }
    if (!emailChanged && email !== undefined && email !== this.state.email) {
      this.setState({ email })
    }
    if (!phoneNumberChanged && phone_number !== undefined && phone_number !== this.state.phoneNumber) {
      this.setState({ phoneNumber: phone_number })
    }
    if (update_error !== lastError) {
      this.setState({ lastError: update_error, error: update_error })
    }
  }

  render() {
    const { dark_mode, loggedin, loggedin_loading, loggedin_check, show_update_saved } = this.props
    const { name, email, phoneNumber, password, confirm_password, error } = this.state
    return (
      <Page className={styles.Page} dark={dark_mode}>
        {!loggedin && !loggedin_loading && loggedin_check && <Redirect to="/" />}  {/* Redirects user if they are not logged in */}
        <h2 className={styles.Headder}>My Profile</h2>
        <form onSubmit={this.handleSubmit.bind(this)} className={`${styles.FieldDiv} ${dark_mode && styles.Dark}`}>
          {(error !== undefined) &&
            <div className={styles.ErrorBox}>
              {(typeof error == "string") ? error : error.response.data.message}
            </div>}
          {show_update_saved &&
            <div className={styles.SavedBox}>
              Saved
           </div>
          }
          <label className={styles.Label}>
            <p>Name:</p>
            <TextInput id="name" value={name} onChange={this.onTextChange.bind(this)} />
          </label>
          <label className={styles.Label}>
            <p>Email:</p>
            <TextInput id="email" value={email} onChange={this.onTextChange.bind(this)} required />
          </label>
          <label className={styles.Label}>
            <p>Phone Number:</p>
            <TextInput id="phoneNumber" value={phoneNumber} onChange={this.onTextChange.bind(this)} />
          </label>
          <label className={styles.Label}>
            <p>Password:</p>
            <TextInput id="password" value={password} password onChange={this.onTextChange.bind(this)} />
          </label>
          <label className={styles.Label}>
            <p>Confirm Password:</p>
            <TextInput password id="confirm_password" value={confirm_password} onChange={this.onTextChange.bind(this)} />
          </label>
          <div className={styles.ButtonBox}>
            <Button dark={dark_mode} className={styles.Button} onClick={this.onLogoutClicked.bind(this)}>Logout</Button>
            <Button dark={dark_mode} className={styles.Button} submit>Save</Button>
          </div>
        </form>
        <BackButton dark={dark_mode} onClick={this.onBackButtonClicked.bind(this)} />
      </Page >
    )
  }
}

export default connect(mapStateToProps)(Profile)