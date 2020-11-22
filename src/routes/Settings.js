import { Component } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

import { changeSettings, getSettings, resetSettingsMSGS } from "../redux/actions/settings"
import { loadCookies } from "../redux/actions/user"

import BackButton from "../components/BackButton"
import Button from "../components/Button"
import ToggleButton from "../components/ToggleButton"
import ScrollButton from "../components/ScrollButton"
import Page from "../components/Page"

import styles from "./Settings.module.css"

function mapStateToProps(store, ownProps) {
  return {
    username: store.user.username,
    token: store.user.token,
    loggedin: store.user.loggedin,
    loggedin_check: store.user.loggedin_check,
    loggedin_loading: store.user.loggedin_loading,

    darkMode: store.settings.darkMode,
    useGPS: store.settings.useGPS,
    useMetric: store.settings.useMetric,
    mainLocation: store.settings.mainLocation,

    savedMsg: store.settings.savedMsg,
    errorMsg: store.settings.errorMsg,
    locationPermissionMsg: store.settings.locationPermissionMsg,
  }
}

class Settings extends Component {
  componentDidMount() {
    const { loggedin_check, loggedin_loading, username, token } = this.props
    this.props.dispatch(resetSettingsMSGS())
    this.props.dispatch(getSettings(username, token)) // TODO make sure user is logged in
    if (!loggedin_check && !loggedin_loading) {
      this.props.dispatch(loadCookies())
    }
  }

  onSettingChange(e) {
    const { useGPS } = this.props
    if (!useGPS && e.id === "mainLocation") {
      e.val++
    }
    this.props.dispatch(changeSettings(e.id, e.val))
  }

  onUnitClick(e) {
    e.target.blur()
    const { useMetric } = this.props
    this.props.dispatch(changeSettings("useMetric", !useMetric))
  }

  onProfileClicked(e) {
    this.props.history.push("/settings/profile")
  }

  onLocationsClicked(e) {
    this.props.history.push("/settings/locations")
  }

  onBackButtonClicked(e) {
    this.props.history.push("/current")
  }

  getMessageBox() {
    const { savedMsg, errorMsg, locationPermissionMsg } = this.props
    if (errorMsg) {
      return (
        <div className={styles.ErrorBox}>
          {(locationPermissionMsg) ? "Location permission required" : "Error saving settings"}
        </div>
      )
    } else if (savedMsg) {
      return (
        <div className={styles.SavedBox}>
          Saved!
        </div>
      )
    } else {
      return (
        <div className={styles.FakeBox}>
          .
        </div>
      )
    }
  }

  render() {
    const {
      darkMode, loggedin, loggedin_loading, loggedin_check, useGPS, useMetric, mainLocation } = this.props
    let locationOptions = ["Device Location", "1st Location", "2ed Location", "3rd Location"]
    let locationCurrent = mainLocation

    if (!useGPS) {
      locationOptions.shift()
      locationCurrent--;
    }

    return (
      <Page className={`${styles.Page} ${darkMode && styles.Dark}`} dark={darkMode}>
        {!loggedin && !loggedin_loading && loggedin_check && <Redirect to="/" />}  {/* Redirects user if they are not logged in */}
        <h2 className={styles.Headder}>Settings</h2>
        {this.getMessageBox()}
        <div className={styles.Row}>
          <p className={styles.SettingLabel}>Dark Mode</p>
          <ToggleButton dark={darkMode} id="darkMode" active={darkMode} onToggle={this.onSettingChange.bind(this)} />
        </div>
        <div className={styles.Row}>
          <p className={styles.SettingLabel}>Use GPS</p>
          <ToggleButton dark={darkMode} id="useGPS" active={useGPS} onToggle={this.onSettingChange.bind(this)} />
        </div>
        <div className={styles.Row}>
          <p className={styles.SettingLabel}>Units</p>
          <Button dark={darkMode} onClick={this.onUnitClick.bind(this)}>{(useMetric) ? "Metric" : "Imperial"}</Button>
        </div>
        <div className={styles.Row}>
          <p className={styles.SettingLabel}>Main Location</p>
          <ScrollButton dark={darkMode} active current={locationCurrent} id="mainLocation" options={locationOptions} onChange={this.onSettingChange.bind(this)} />
        </div>
        <div className={styles.Spacer}></div>
        <div className={styles.BottomRow}>
          <Button dark={darkMode} className={styles.BottomButton} onClick={this.onProfileClicked.bind(this)}>Profile</Button>
          <Button dark={darkMode} className={styles.BottomButton} onClick={this.onLocationsClicked.bind(this)}>Locations</Button>
        </div>
        {/*
        <div className={styles.Row}>
          <ScrollButton dark={darkMode} options={["1st Location", "2ed Location", "3rd Location"]}
            enableToggle />
        </div>
        <div className={styles.Row}>
          <div className={styles.SettingMultiLabel}>
            <p className={styles.SettingLabel}>Time Interval</p>
            <p className={styles.SettingDescription}>How often we’ll check for changes in weather</p>
          </div>
          <ScrollButton dark={darkMode} active options={[...Array(59)].map((_, i) => 2 + i)} postfix=" mins" />
        </div>
        <div className={styles.NotificationRow}>
          <p className={styles.SettingLabel}>Notifications</p>
          <div className={styles.NotificationButtons}>
            <ToggleButton dark={darkMode}>Push</ToggleButton>
            <ToggleButton dark={darkMode}>Email</ToggleButton>
            <ToggleButton dark={darkMode}>Warnings</ToggleButton>
          </div>
        </div>
        <div className={styles.Row}>
          <p className={styles.SettingLabel}><span className={styles.Delta}>&Delta;</span>Temp.</p>
          <ScrollButton dark={darkMode} options={[...Array(100)].map((_, i) => 1 + i)} postfix="&deg;F"
            enableToggle />
        </div>
        <div className={styles.Row}>
          <p className={styles.SettingLabel}><span className={styles.Delta}>&Delta;</span>Pressure</p>
          <ScrollButton dark={darkMode} options={[...Array(50)].map((_, i) => 1 + i)} postfix={"\"Hg"}
            enableToggle />
        </div>
        <div className={styles.Row}>
          <p className={styles.SettingLabel}><span className={styles.Delta}>&Delta;</span>Humidity</p>
          <ScrollButton dark={darkMode} options={[...Array(100)].map((_, i) => 1 + i)} postfix="%"
            enableToggle />
        </div>
        <div className={styles.Row}>
          <div className={styles.SettingMultiLabel}>
            <p className={styles.SettingLabel}><span className={styles.Delta}>&Delta;</span>Wind Speed</p>
            <p className={styles.SettingDescription}>The minimum changes to be notified for</p>
          </div>
          <ScrollButton dark={darkMode} options={[...Array(100)].map((_, i) => 1 + i)} postfix=" mph"
            enableToggle />
        </div>
        <div className={styles.Row}>
          <p className={styles.SettingLabel}>Chance of Rain</p>
          <ScrollButton dark={darkMode} options={[...Array(100)].map((_, i) => 1 + i)} postfix="%"
            enableToggle />
        </div>
        */}
        <BackButton dark={darkMode} onClick={this.onBackButtonClicked.bind(this)} />
      </Page>
    )
  }
}

export default connect(mapStateToProps)(Settings)