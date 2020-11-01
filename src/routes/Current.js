import { Component } from "react"
import { connect } from "react-redux"

import Button from "../components/Button"
import Page from "../components/Page"

import { getStationData } from "../redux/actions/weather_stations"

import styles from "./Current.module.css"

function mapStateToProps(store, ownProps) {
  return {
    dark_mode: store.settings.dark_mode,
    current_station: store.weather_stations.current_station
  }
}

class Current extends Component {
  componentDidMount() {
    // TODO also update if data is old
    const { current_station } = this.props
    if (Object.entries(current_station).length === 0) {
      this.props.dispatch(getStationData("someID")) // TODO replace with current station ID
    }
  }

  onProfileClick(e) {
    this.props.history.push("/profile")
  }

  onNotificationsClick(e) {
    this.props.history.push("/notifications")
  }

  onSettingsClick(e) {
    this.props.history.push("/settings")
  }

  propOrDefault(prop, default_value) {
    if (prop !== undefined) {
      return prop
    } else {
      return default_value
    }
  }

  render() {
    const { dark_mode, current_station } = this.props
    return (
      <Page className={styles.Page} dark={dark_mode}>
        <h2 className={styles.Headder}>Current Weather</h2>
        <p className={styles.LocationText}>Location: {this.propOrDefault(current_station.location, "Loading")}</p>
        <p className={styles.DarkGrayText}>Current Temp: {this.propOrDefault(current_station.temperature, 0)} &deg;F</p>
        <p className={styles.TealText}>Highest Temp: {this.propOrDefault(current_station.high, 0)} &deg;F</p>
        <p className={styles.TealText}>Lowest Temp: {this.propOrDefault(current_station.low, 0)} &deg;F</p>
        <p className={styles.DarkGrayText}>Pressure: {this.propOrDefault(current_station.pressure, 0)} Hg</p>
        <p className={styles.DarkGrayText}>Humidity: {this.propOrDefault(current_station.humidity, 0)}%</p>
        <p className={styles.TealText}>Wind Speed: {this.propOrDefault(current_station.wind_speed, 0)} mph</p>
        <p className={styles.DarkGrayText}>Chance of Rain: {this.propOrDefault(current_station.rain_chance, 0)}%</p>
        <div className={styles.ButtonBox}>
          <Button onClick={this.onProfileClick.bind(this)}>Profile</Button>
          <Button onClick={this.onNotificationsClick.bind(this)}>Notifications</Button>
          <Button onClick={this.onSettingsClick.bind(this)}>Settings</Button>
        </div>
      </Page>
    )
  }
}

export default connect(mapStateToProps)(Current)