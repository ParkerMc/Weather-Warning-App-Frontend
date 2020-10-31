import styles from "./Home.module.css"
import GoogleLoginButton from "../components/GoogleLoginButton"
import Page from "../components/Page"
import Button from "../components/Button"
import { Component } from "react"

export default class Home extends Component {
  toCurrentPage() {
    this.props.history.push("/current")
  }

  render() {
    return (
      <Page className={styles.Page}>
        <header className={styles.Top}>
          <h1>Let’s Get<br />Started</h1>
        </header>
        <div className={styles.Bottom}>
          <div className={styles.BottomSpacer}></div>
          <GoogleLoginButton
            dark
            className={styles.GoogleButton}
            onClick={this.toCurrentPage.bind(this)}
          />
          <div className={styles.BottomMidSpacer}></div>
          <div className={styles.SubBottom}>
            <div className={styles.BottomButtonSpacer}></div>
            <Button onClick={this.toCurrentPage.bind(this)}>Log In</Button>
            <div className={styles.BottomMidButtonSpacer}></div>
            <Button onClick={this.toCurrentPage.bind(this)}>Create</Button>
            <div className={styles.BottomButtonSpacer}></div>
          </div>
          <div className={styles.BottomSpacer}></div>
        </div >
      </Page>
    )
  }
}
