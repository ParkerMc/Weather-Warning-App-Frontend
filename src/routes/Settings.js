import { Component } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

import { changeSettings } from "../redux/actions/settings"
import { loadCookies } from "../redux/actions/user"

import BackButton from "../components/BackButton"
import ToggleButton from "../components/ToggleButton"
import ScrollButton from "../components/ScrollButton"
import Page from "../components/Page"

import styles from "./Settings.module.css"

function mapStateToProps(store, ownProps) {
  return {
    use_gps: store.settings.use_gps,
    locations_enabled: store.settings.locations_enabled,
    time_interval: store.settings.time_interval,
    push_enabled: store.settings.push_enabled,
    email_enabled: store.settings.email_enabled,
    warnings_enabled: store.settings.warnings_enabled,
    temperature_enabled: store.settings.temperature_enabled,
    temperature_change: store.settings.temperature_change,
    pressure_enabled: store.settings.pressure_enabled,
    pressure_change: store.settings.pressure_change,
    humidity_enabled: store.settings.humidity_enabled,
    humidity_change: store.settings.humidity_change,
    wind_enabled: store.settings.wind_enabled,
    windspeed_change: store.settings.windspeed_change,
    rain_enabled: store.settings.rain_enabled,
    rain_change: store.settings.rain_change,
    dark_mode: store.settings.dark_mode,

    loggedin: store.user.loggedin,
    loggedin_check: store.user.loggedin_check,
    loggedin_loading: store.user.loggedin_loading
  }
}

class Settings extends Component {

  constructor(props) {
    super()
    this.state = { currentLocation: 0 }
  }
  componentDidMount() {
    // TODO get settings
    const { loggedin_check, loggedin_loading } = this.props
    if (!loggedin_check && !loggedin_loading) {
      this.props.dispatch(loadCookies())
    }
  }

  onDarkModeToggle(val) {
    this.props.dispatch(changeSettings({ dark_mode: val }))
  }

  onGPSToggle(val) {
    this.props.dispatch(changeSettings({ use_gps: val }))
  }

  onLocationChanged(val) {
    this.setState({ currentLocation: val })
  }

  onLocationToggle(val) {
    const { locations_enabled } = this.props
    const { currentLocation } = this.state
    var newVal = [...locations_enabled]
    newVal[currentLocation] = val
    this.props.dispatch(changeSettings({ locations_enabled: newVal }))
  }

  onTimeChanged(val) {
    this.props.dispatch(changeSettings({ time_interval: val + 2 }))
  }

  onPushToggled(val) {
    this.props.dispatch(changeSettings({ push_enabled: val }))
  }

  onEmailToggled(val) {
    this.props.dispatch(changeSettings({ email_enabled: val }))
  }

  onWarningsToggled(val) {
    this.props.dispatch(changeSettings({ warnings_enabled: val }))
  }

  onTempToggle(val) {
    this.props.dispatch(changeSettings({ temperature_enabled: val }))
  }

  onTempChange(val) {
    this.props.dispatch(changeSettings({ temperature_change: val + 1 }))
  }

  onPressureToggle(val) {
    this.props.dispatch(changeSettings({ pressure_enabled: val }))
  }

  onPressureChange(val) {
    this.props.dispatch(changeSettings({ pressure_change: val + 1 }))
  }

  onHumidityToggle(val) {
    this.props.dispatch(changeSettings({ humidity_enabled: val }))
  }

  onHumidityChange(val) {
    this.props.dispatch(changeSettings({ humidity_change: val + 1 }))
  }

  onWindspeedToggle(val) {
    this.props.dispatch(changeSettings({ wind_enabled: val }))
  }

  onWindspeedChange(val) {
    this.props.dispatch(changeSettings({ windspeed_change: val + 1 }))
  }

  onRainToggle(val) {
    this.props.dispatch(changeSettings({ rain_enabled: val }))
  }

  onRainChange(val) {
    this.props.dispatch(changeSettings({ rain_change: val + 1 }))
  }

  onBackButtonClicked(e) {
    this.props.history.push("/current")
  }

  render() {
    const { use_gps, locations_enabled, time_interval, push_enabled, warnings_enabled, email_enabled,
      temperature_enabled, temperature_change, pressure_enabled, pressure_change, humidity_enabled, humidity_change,
      wind_enabled, windspeed_change, rain_enabled, rain_change, dark_mode,
      loggedin, loggedin_loading, loggedin_check } = this.props
    const { currentLocation } = this.state
    return (
      <Page className={`${styles.Page} ${dark_mode && styles.Dark}`} dark={dark_mode}>
        {!loggedin && !loggedin_loading && loggedin_check && <Redirect to="/" />}  {/* Redirects user if they are not logged in */}
        <h2 className={styles.Headder}>Settings</h2>
        <div className={styles.Row}>
          <p className={styles.SettingLabel}>Use GPS</p>
          <ToggleButton dark={dark_mode} active={use_gps}
            onToggle={this.onGPSToggle.bind(this)} />
        </div>
        <div className={styles.Row}>
          <p className={styles.SettingLabel}>SetLocation</p> {/* TODO Add set location page*/}
          <ScrollButton dark={dark_mode} actives={locations_enabled} current={currentLocation} options={["1st Location", "2ed Location", "3rd Location"]}
            enableToggle onToggle={this.onLocationToggle.bind(this)} onChange={this.onLocationChanged.bind(this)} />
        </div>
        <div className={styles.Row}>
          <div className={styles.SettingMultiLabel}>
            <p className={styles.SettingLabel}>Time Interval</p>
            <p className={styles.SettingDescription}>How often we’ll check for changes in weather</p>
          </div>
          <ScrollButton dark={dark_mode} active current={time_interval - 2} options={[...Array(59)].map((_, i) => 2 + i)} postfix=" mins"
            onChange={this.onTimeChanged.bind(this)} />
        </div>
        <div className={styles.NotificationRow}>
          <p className={styles.SettingLabel}>Notifications</p>
          <div className={styles.NotificationButtons}>
            <ToggleButton dark={dark_mode} active={push_enabled}
              onToggle={this.onPushToggled.bind(this)}>Push</ToggleButton>
            <ToggleButton dark={dark_mode} active={email_enabled}
              onToggle={this.onEmailToggled.bind(this)}>Email</ToggleButton>
            <ToggleButton dark={dark_mode} active={warnings_enabled}
              onToggle={this.onWarningsToggled.bind(this)}>Warnings</ToggleButton>
          </div>
        </div>
        <div className={styles.Row}>
          <p className={styles.SettingLabel}><span className={styles.Delta}>&Delta;</span>Temp.</p>
          <ScrollButton dark={dark_mode} active={temperature_enabled} current={temperature_change - 1} options={[...Array(100)].map((_, i) => 1 + i)} postfix="&deg;F"
            enableToggle onToggle={this.onTempToggle.bind(this)} onChange={this.onTempChange.bind(this)} />
        </div>
        <div className={styles.Row}>
          <p className={styles.SettingLabel}><span className={styles.Delta}>&Delta;</span>Pressure</p>
          <ScrollButton dark={dark_mode} active={pressure_enabled} current={pressure_change - 1} options={[...Array(50)].map((_, i) => 1 + i)} postfix={"\"Hg"}
            enableToggle onToggle={this.onPressureToggle.bind(this)} onChange={this.onPressureChange.bind(this)} />
        </div>
        <div className={styles.Row}>
          <p className={styles.SettingLabel}><span className={styles.Delta}>&Delta;</span>Humidity</p>
          <ScrollButton dark={dark_mode} active={humidity_enabled} current={humidity_change - 1} options={[...Array(100)].map((_, i) => 1 + i)} postfix="%"
            enableToggle onToggle={this.onHumidityToggle.bind(this)} onChange={this.onHumidityChange.bind(this)} />
        </div>
        <div className={styles.Row}>
          <div className={styles.SettingMultiLabel}>
            <p className={styles.SettingLabel}><span className={styles.Delta}>&Delta;</span>Wind Speed</p>
            <p className={styles.SettingDescription}>The minimum changes to be notified for</p>
          </div>
          <ScrollButton dark={dark_mode} active={wind_enabled} current={windspeed_change - 1} options={[...Array(100)].map((_, i) => 1 + i)} postfix=" mph"
            enableToggle onToggle={this.onWindspeedToggle.bind(this)} onChange={this.onWindspeedChange.bind(this)} />
        </div>
        <div className={styles.Row}>
          <p className={styles.SettingLabel}>Chance of Rain</p>
          <ScrollButton dark={dark_mode} active={rain_enabled} current={rain_change - 1} options={[...Array(100)].map((_, i) => 1 + i)} postfix="%"
            enableToggle onToggle={this.onRainToggle.bind(this)} onChange={this.onRainChange.bind(this)} />
        </div>
        <div className={styles.Row}>
          <p className={styles.SettingLabel}>Dark Mode</p>
          <ToggleButton dark={dark_mode} active={dark_mode} onToggle={this.onDarkModeToggle.bind(this)} />
        </div>
        <BackButton dark={dark_mode} onClick={this.onBackButtonClicked.bind(this)} />
      </Page>
    )
  }
}

export default connect(mapStateToProps)(Settings)