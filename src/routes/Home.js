import styles from "./Home.module.css"
import GoogleLoginButton from "../components/GoogleLoginButton"
import { Component } from "react"

export default class Home extends Component {
  toCurrentPage() {
    this.props.history.push("/current")
  }

  render() {
    return (
      <main>
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
          < div className={styles.BottomMidSpacer}></div>
          <div className={styles.SubBottom}>
            <div className={styles.BottomButtonSpacer}></div>
            <button type="button" className={styles.LoginButton} onClick={this.toCurrentPage.bind(this)}>LOG IN</button>
            <div className={styles.BottomMidButtonSpacer}></div>
            <button type="button" className={styles.CreateButton} onClick={this.toCurrentPage.bind(this)}>CREATE</button>
            <div className={styles.BottomButtonSpacer}></div>
          </div>
          <div className={styles.BottomSpacer}></div>
        </div >
      </main >
    );
  }
}
