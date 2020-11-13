import { Component } from "react"
import { connect } from "react-redux"

import styles from "./Home.module.css"
import GoogleLoginButton from "../components/GoogleLoginButton"
import Page from "../components/Page"
import Button from "../components/Button"
import TextInput from "../components/TextInput"

function mapStateToProps(store, ownProps) {
  return {
    dark_mode: store.settings.dark_mode
  }
}

class Home extends Component {
  constructor() {
    super();
    this.state = { create_account: false }
  }

  createAccountSawp(e) {
    const { create_account } = this.state
    e.target.blur()
    this.setState({ create_account: !create_account })
  }

  toCurrentPage() {
    this.props.history.push("/current")
  }

  render() {
    const { dark_mode } = this.props
    const { create_account } = this.state
    return (
      <Page className={styles.Page} dark={dark_mode}>
        <header className={styles.Top}>
          <h1 className={styles.Header}>
            Let’s Get<br />
            Started
          </h1>
        </header>
        <div className={styles.Bottom}>
          <div className={styles.SubBottom}>
            <label className={styles.Label}>
              <p>Username:</p>
              <TextInput />
            </label>
            {(create_account) &&
              <label className={styles.Label}>
                <p>Email:</p>
                <TextInput />
              </label>
            }
            <label className={styles.Label}>
              <p>Password:</p>
              <TextInput password />
            </label>
            {(create_account) &&
              <label className={styles.Label}>
                <p>Confirm Password:</p>
                <TextInput password />
              </label>
            }
            {(!create_account) &&
              <div className={styles.SubSubBottom}>
                <Button className={styles.BottomButton} onClick={this.toCurrentPage.bind(this)}>Log In</Button>
                <div className={styles.BottomMidButtonSpacer}></div>
                <Button className={styles.BottomButton} onClick={this.createAccountSawp.bind(this)}>Create</Button>
              </div>
            }
            {(!create_account) &&
              <GoogleLoginButton
                dark
                className={styles.GoogleButton}
                onClick={this.toCurrentPage.bind(this)}
              />
            }

            {(create_account) &&
              <div className={styles.SubSubBottom}>
                <Button className={styles.BottomButton} onClick={this.createAccountSawp.bind(this)}>Back</Button>
                <div className={styles.BottomMidButtonSpacer}></div>
                <Button className={styles.BottomButton} onClick={this.toCurrentPage.bind(this)}>Create</Button>
              </div>
            }

          </div>
        </div >
      </Page>
    )
  }
}

export default connect(mapStateToProps)(Home)