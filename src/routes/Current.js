import { Component } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

import Button from "../components/Button"
import Page from "../components/Page"


import { loadCookies } from "../redux/actions/user"
import { getCurrentWeather } from "../redux/actions/weather"

import styles from "./Current.module.css"

const updateMins = 5

function mapStateToProps(store, ownProps) {
  return {
    dark_mode: store.settings.dark_mode,
    current_weather: store.weather.current_weather,
    current_loading: store.weather.current_loading,
    loggedin: store.user.loggedin,
    loggedin_check: store.user.loggedin_check,
    loggedin_loading: store.user.loggedin_loading,
    username: store.user.username,
    token: store.user.token,
    use_metric: store.settings.use_metric
  }
}

class Current extends Component {
  constructor() {
    super()
    this.state = {
      interval: undefined
    }
  }
  componentDidMount() {
    const { loggedin_check, loggedin_loading, username, token, current_loading } = this.props
    this.props.dispatch(getCurrentWeather(username, token, 32.978313, -96.748451))// TODO make sure user is logged in
    this.setState({
      interval: setInterval(() => {
        if (!current_loading) {
          this.props.dispatch(getCurrentWeather(username, token, 32.978313, -96.748451))
        }
      }, updateMins * 60000)
    })
    if (!loggedin_check && !loggedin_loading) {
      this.props.dispatch(loadCookies())
    }
  }

  componentWillUnmount() {
    const { interval } = this.state
    if (interval !== undefined) {
      clearInterval(interval)
      this.setState({ interval: undefined })
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

  tempToImperial(temp) {
    return (temp * 9 / 5) + 32
  }

  render() {
    const { dark_mode, loggedin, loggedin_loading, loggedin_check, current_weather, current_loading, use_metric } = this.props
    let temp = this.propOrDefault(current_weather.temp, 0)
    let high = this.propOrDefault(current_weather.high, 0)
    let low = this.propOrDefault(current_weather.low, 0)
    let pressure = this.propOrDefault(current_weather.pressure, 0)
    let humidity = this.propOrDefault(current_weather.humidity, 0)
    let windSpeed = this.propOrDefault(current_weather.windSpeed, 0)
    let rainProbability = this.propOrDefault(current_weather.rainProbability, 0)
    if (!use_metric) {
      if (current_weather.temp !== undefined) {
        temp = this.tempToImperial(temp)
      }
      if (current_weather.high !== undefined) {
        high = this.tempToImperial(high)
      }
      if (current_weather.low !== undefined) {
        low = this.tempToImperial(low)
      }
      pressure = (pressure * 0.00029530).toFixed(2)
      windSpeed = windSpeed * 0.62137119223
    }
    return (
      <Page className={styles.Page} dark={dark_mode}>
        {!loggedin && !loggedin_loading && loggedin_check && <Redirect to="/" />}  {/* Redirects user if they are not logged in */}
        <h2 className={styles.Headder}>Current Weather</h2>
        <p className={styles.LocationText}>Location: <br />{(current_loading) ? "Loading" : this.propOrDefault(current_weather.locationName, "")}</p>
        <p className={styles.DarkGrayText}>Current Temp: {temp.toFixed(1)} &deg;{(use_metric) ? "C" : "F"}</p>
        <p className={styles.TealText}>Highest Temp: {high.toFixed(1)} &deg;{(use_metric) ? "C" : "F"}</p>
        <p className={styles.TealText}>Lowest Temp: {low.toFixed(1)} &deg;{(use_metric) ? "C" : "F"}</p>
        <p className={styles.DarkGrayText}>Pressure: {pressure} {(use_metric) ? "Pa" : "Hg\""}</p>
        <p className={styles.DarkGrayText}>Humidity: {humidity.toFixed(2)}%</p>
        <p className={styles.TealText}>Wind Speed: {windSpeed.toFixed(2)} {(use_metric) ? "km/h" : "mph"}</p>
        <p className={styles.DarkGrayText}>Chance of Rain: {rainProbability}%</p>
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