import { Component } from "react"
import Button from "../components/Button"
import Page from "../components/Page"
import styles from "./Current.module.css"


export default class Current extends Component {
  onProfileClick(e) {
    this.props.history.push("/profile")
  }

  onNotificationsClick(e) {
    this.props.history.push("/notifications")
  }

  onSettingsClick(e) {
    this.props.history.push("/settings")
  }

  render() {
    return (
      <Page className={styles.Page}>
        <h2 className={styles.Headder}>Current Weather</h2>
        <p className={styles.LocationText}>Location: User's chosen location</p>
        <p className={styles.DarkGrayText}>Current Temp: XX &deg;F</p>
        <p className={styles.TealText}>Highest Temp: XX &deg;F</p>
        <p className={styles.TealText}>Lowest Temp: XX &deg;F</p>
        <p className={styles.DarkGrayText}>Pressure: XX Hg</p>
        <p className={styles.DarkGrayText}>Humidity: XX%</p>
        <p className={styles.TealText}>Wind Speed: XX mph</p>
        <p className={styles.DarkGrayText}>Chance of Rain: XX%</p>
        <div className={styles.ButtonBox}>
          <Button onClick={this.onProfileClick.bind(this)}>Profile</Button>
          <Button onClick={this.onNotificationsClick.bind(this)}>Notifications</Button>
          <Button onClick={this.onSettingsClick.bind(this)}>Settings</Button>
        </div>
      </Page>
    )
  }
}
