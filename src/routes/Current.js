import { Component } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

import Button from "../components/Button"
import Page from "../components/Page"


import { loadCookies } from "../redux/actions/user"
import { getStationObservations, getForecast } from "../redux/actions/weather"

import styles from "./Current.module.css"

function mapStateToProps(store, ownProps) {
  return {
    dark_mode: store.settings.dark_mode,
    current_station: store.weather.current_station,
    current_forecast: store.weather.current_forecast,
    station_loading: store.weather.loading,
    loggedin: store.user.loggedin,
    loggedin_check: store.user.loggedin_check,
    loggedin_loading: store.user.loggedin_loading
  }
}

class Current extends Component {
  componentDidMount() {
    // TODO also update if data is old
    const { current_station, loggedin_check, loggedin_loading } = this.props
    if (Object.entries(current_station).length === 0) {
      this.props.dispatch(getStationObservations("KDFW")) // TODO replace with current station ID and zone ID
      this.props.dispatch(getForecast("FWD", 79, 108)) // TODO get gridpoint https://api.weather.gov/points/{lat},{lon}
    }
    if (!loggedin_check && !loggedin_loading) {
      this.props.dispatch(loadCookies())
    }
  }

  onMapClick(e) {
    this.props.history.push("/map")
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
    const { dark_mode, current_station, station_loading, current_forecast, loggedin, loggedin_loading, loggedin_check } = this.props
    return (  // TODO convert data
      <Page className={styles.Page} dark={dark_mode}>
        {!loggedin && !loggedin_loading && loggedin_check && <Redirect to="/" />}  {/* Redirects user if they are not logged in */}
        <h2 className={styles.Headder}>Current Weather</h2>
        <p className={styles.LocationText}>Location: <br />{(station_loading) ? "Loading" : this.propOrDefault(current_station.location, "DFW Airpot")/* TODO remove DFW part later */}</p>
        <p className={styles.DarkGrayText}>Current Temp: {this.propOrDefault(current_station.temperature, 0)} &deg;C</p>
        <p className={styles.TealText}>Highest Temp: {this.propOrDefault(current_station.high, 0)} &deg;C</p>
        <p className={styles.TealText}>Lowest Temp: {this.propOrDefault(current_station.low, 0)} &deg;C</p>
        <p className={styles.DarkGrayText}>Pressure: {this.propOrDefault(current_station.pressure, 0)} Pa</p>
        <p className={styles.DarkGrayText}>Humidity: {this.propOrDefault(current_station.humidity, 0)}%</p>
        <p className={styles.TealText}>Wind Speed: {this.propOrDefault(current_station.wind_speed, 0)} km/h</p>
        <p className={styles.DarkGrayText}>Chance of Rain: {this.propOrDefault(current_forecast.rain_chance, 0)}%</p>
        <div className={styles.ButtonBox}>
          <Button dark={dark_mode} onClick={this.onMapClick.bind(this)}>Map</Button>
          <Button dark={dark_mode} onClick={this.onNotificationsClick.bind(this)}>Notifications</Button>
          <Button dark={dark_mode} onClick={this.onSettingsClick.bind(this)}>Settings</Button>
        </div>
      </Page>
    )
  }
}

export default connect(mapStateToProps)(Current)