import { Component } from "react"
import { connect } from "react-redux"

import { changeSettings } from "../redux/actions/settings"

import ToggleButton from "../components/ToggleButton"
import Page from "../components/Page"

import styles from "./Settings.module.css"

function mapStateToProps(store, ownProps) {
  return {
    dark_mode: store.settings.dark_mode
  }
}

class Settings extends Component {
  componentDidMount() {
    // TODO get settings
  }

  onDarkModeToggle(a) {
    this.props.dispatch(changeSettings({ dark_mode: a }))
  }

  onBackButtonClicked(e) {
    this.props.history.push("/current")
  }

  render() {
    const { dark_mode } = this.props
    return (  // TODO convert data
      <Page className={`${styles.Page} ${dark_mode && styles.Dark}`} dark={dark_mode}>
        <h2 className={styles.Headder}>Settings</h2>
        <div className={styles.Row}>
          <p className={styles.SettingLabel}>Use GPS</p>
          <ToggleButton dark={dark_mode} />
        </div>
        <div className={styles.Row}>
          <p className={styles.SettingLabel}>SetLocation</p> {/* TODO make set location and program in to redux*/}
          <ToggleButton dark={dark_mode} /> {/* TODO need new button/thingy*/}
        </div>
        <div className={styles.Row}>
          <div className={styles.SettingMultiLabel}>
            <p className={styles.SettingLabel}>Time Interval</p>
            <p className={styles.SettingDescription}>How often we’ll check for changes in weather</p>
          </div>
          <ToggleButton dark={dark_mode} /> {/* TODO need new button/thingy*/}
        </div>
        <div className={styles.NotificationRow}>
          <p className={styles.SettingLabel}>Notifications</p>
          <div className={styles.NotificationButtons}>
            <ToggleButton dark={dark_mode}>Temp.</ToggleButton>
            <ToggleButton dark={dark_mode}>Pressure</ToggleButton>
            <ToggleButton dark={dark_mode}>Humidity</ToggleButton>
          </div>
          <div className={styles.NotificationSpacer} />
          <div className={styles.NotificationButtons}>
            <ToggleButton dark={dark_mode}>Wind</ToggleButton>
            <ToggleButton dark={dark_mode}>Email</ToggleButton>
            <ToggleButton dark={dark_mode}>Rain</ToggleButton>
          </div>
        </div>
        <div className={styles.Row}>
          <p className={styles.SettingLabel}><span className={styles.Delta}>&Delta;</span>Temperature</p>
          <ToggleButton dark={dark_mode} /> {/* TODO need new button/thingy*/}
        </div>
        <div className={styles.Row}>
          <p className={styles.SettingLabel}><span className={styles.Delta}>&Delta;</span>Pressure</p>
          <ToggleButton dark={dark_mode} /> {/* TODO need new button/thingy*/}
        </div>
        <div className={styles.Row}>
          <p className={styles.SettingLabel}><span className={styles.Delta}>&Delta;</span>Humidity</p>
          <ToggleButton dark={dark_mode} /> {/* TODO need new button/thingy*/}
        </div>
        <div className={styles.Row}>
          <div className={styles.SettingMultiLabel}>
            <p className={styles.SettingLabel}><span className={styles.Delta}>&Delta;</span>Wind Speed</p>
            <p className={styles.SettingDescription}>The minimum changes to be notified for</p>
          </div>
          <ToggleButton dark={dark_mode} /> {/* TODO need new button/thingy*/}
        </div>
        <div className={styles.Row}>
          <p className={styles.SettingLabel}>Chance of Rain</p>
          <ToggleButton dark={dark_mode} /> {/* TODO need new button/thingy*/}
        </div>
        <div className={styles.Row}>
          <p className={styles.SettingLabel}>Dark Mode</p>
          <ToggleButton dark={dark_mode} active={dark_mode} onToggle={this.onDarkModeToggle.bind(this)} />
        </div>
        <div className={styles.BackButton} onClick={this.onBackButtonClicked.bind(this)}></div>
      </Page>
    )
  }
}

export default connect(mapStateToProps)(Settings)