import { Component } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

import styles from "./Home.module.css"
import GoogleLoginButton from "../components/GoogleLoginButton"
import Page from "../components/Page"
import Button from "../components/Button"
import TextInput from "../components/TextInput"

import { getInfo } from "../redux/actions/info"
import { loadCookies, login, redirectToGoogleLogin, signUp } from "../redux/actions/user"

const VALID_EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const VALID_USERNAME_REGEX = /^[a-zA-Z0-9]+$/

function mapStateToProps(store, ownProps) {
  return {
    dark_mode: store.settings.dark_mode,
    google_login_url: store.user.google_login_url,
    info_loading: store.info.loading,
    loggedin: store.user.loggedin,
    loggedin_check: store.user.loggedin_check,
    loggedin_loading: store.user.loggedin_loading,
    login_error: store.user.login_error
  }
}

class Home extends Component {
  constructor() {
    super();
    this.state = {
      create_account: false,
      error: undefined,
      lastError: undefined,
      username: "",
      password: "",
      email: "",
      confirm_password: ""
    }
  }

  componentDidMount() {
    const { google_login_url, info_loading, loggedin_check, loggedin_loading } = this.props
    if (google_login_url === undefined && !info_loading) {
      this.props.dispatch(getInfo())
    }
    if (!loggedin_check && !loggedin_loading) {
      this.props.dispatch(loadCookies())
    }
  }

  clearError() {
    this.setState({ error: undefined })
  }

  createAccountSawp(e) {
    this.clearError()
    const { create_account } = this.state
    e.target.blur()
    this.setState({ create_account: !create_account })
  }

  onTextChange(e) {
    this.setState({ [e.target.id]: e.target.value })
  }

  handleSubmit(e) {
    const { create_account } = this.state
    e.preventDefault()
    if (create_account) {
      this.signUp()
    } else {
      this.login()
    }
  }

  login() {
    this.clearError()
    const { username, password } = this.state
    this.props.dispatch(login(username, password))
    this.setState({ password: "" }) // Clear password
  }

  signUp() {
    this.clearError()
    const { username, password, email, confirm_password } = this.state
    if (username.match(VALID_USERNAME_REGEX) == null) {
      this.setState({ error: "Invalid username" })
    } else if (email.match(VALID_EMAIL_REGEX) == null) {
      this.setState({ error: "Invalid email" })
    } else if (password.length < 5) {
      this.setState({ error: "Password must be atleast 6 charcters long" })
    } else if (password !== confirm_password) {
      this.setState({ error: "Passwords do not match" })
    } else {
      this.props.dispatch(signUp(username, email, password))
    }
    this.setState({ password: "", confirm_password: "" }) // Clear password and confirmed password
  }

  onGoogleLoginClick() {
    this.props.dispatch(redirectToGoogleLogin())
  }

  componentDidUpdate() {
    const { login_error } = this.props
    const { lastError } = this.state
    if (login_error !== lastError) {
      this.setState({ lastError: login_error, error: login_error })
    }
  }

  render() {  // TODO forgot password
    const { dark_mode, loggedin } = this.props
    const { create_account, error, username, password, email, confirm_password } = this.state
    return (
      <Page className={styles.Page} dark={dark_mode}>
        {loggedin && <Redirect to="/current" />}  {/* Redirects user if they are logged in */}
        <header className={styles.Top}>
          <h1 className={styles.Header}>
            Let’s Get<br />
            Started
          </h1>
        </header>
        <form onSubmit={this.handleSubmit.bind(this)} className={styles.Bottom}>
          {(error !== undefined) &&
            <div className={styles.ErrorBox}>
              {(typeof error == "string") ? error : (error.response !== undefined) ? error.response.data.message : ""}
            </div>}
          <div className={styles.SubBottom}>
            <label className={styles.Label}>
              <p>Username:</p>
              <TextInput id="username" value={username} onChange={this.onTextChange.bind(this)} required />
            </label>
            {(create_account) &&
              <label className={styles.Label}>
                <p>Email:</p>
                <TextInput id="email" value={email} onChange={this.onTextChange.bind(this)} required />
              </label>
            }
            <label className={styles.Label}>
              <p>Password:</p>
              <TextInput id="password" value={password} password onChange={this.onTextChange.bind(this)} required />
            </label>
            {(create_account) &&
              <label className={styles.Label}>
                <p>Confirm Password:</p>
                <TextInput password id="confirm_password" value={confirm_password} onChange={this.onTextChange.bind(this)} required />
              </label>
            }
            {(!create_account) &&
              <div className={styles.SubSubBottom}>
                <Button className={styles.BottomButton} submit>Log In</Button>
                <div className={styles.BottomMidButtonSpacer}></div>
                <Button className={styles.BottomButton} onClick={this.createAccountSawp.bind(this)}>Sign up</Button>
              </div>
            }
            {(!create_account) &&
              <GoogleLoginButton
                dark
                className={styles.GoogleButton}
                onClick={this.onGoogleLoginClick.bind(this)}
              />
            }

            {(create_account) &&
              <div className={styles.SubSubBottom}>
                <Button className={styles.BottomButton} onClick={this.createAccountSawp.bind(this)}>Back</Button>
                <div className={styles.BottomMidButtonSpacer}></div>
                <Button className={styles.BottomButton} submit>Sign up</Button>
              </div>
            }

          </div>
        </form >
      </Page>
    )
  }
}

export default connect(mapStateToProps)(Home)