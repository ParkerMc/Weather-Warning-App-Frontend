import { Component } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { GoogleMap, LoadScript } from '@react-google-maps/api';

import BackButton from "../components/BackButton"
import Page from "../components/Page"

import { getInfo } from "../redux/actions/info"
import { loadCookies } from "../redux/actions/user"

import styles from "./Map.module.css"

function mapStateToProps(store, ownProps) {
  return {
    dark_mode: store.settings.dark_mode,
    loggedin: store.user.loggedin,
    loggedin_check: store.user.loggedin_check,
    loggedin_loading: store.user.loggedin_loading,
    googleAPIKey: store.info.googleAPIKey
  }
}
class Map extends Component {
  constructor() {
    super()
    this.state = { map: undefined }
  }
  componentDidMount() {
    const { loggedin_check, loggedin_loading, googleAPIKey, info_loading } = this.props
    if (googleAPIKey === undefined && !info_loading) {
      this.props.dispatch(getInfo())
    }
    if (!loggedin_check && !loggedin_loading) {
      this.props.dispatch(loadCookies())
    }
  }

  onBackButtonClicked(e) {
    this.props.history.push("/current")
  }

  onMapLoad(map) {
    this.setState({ map })
  }

  onMapUnmount(map) {
    this.setState({ map: undefined })
  }

  render() {
    const { dark_mode, loggedin, loggedin_loading, loggedin_check, googleAPIKey } = this.props
    return (
      <Page className={styles.Page} dark={dark_mode}>
        {!loggedin && !loggedin_loading && loggedin_check && <Redirect to="/" />}  {/* Redirects user if they are not logged in */}
        <h2 className={styles.Headder}>Map</h2>
        {(googleAPIKey !== undefined) &&
          <LoadScript
            googleMapsApiKey={googleAPIKey}
          >{/* TODO move to server */}
            <GoogleMap
              mapContainerClassName={styles.Map}
              center={{
                lat: 39.8282,
                lng: -98.5795
              }}
              zoom={3}
              onLoad={this.onMapLoad.bind(this)}
              onUnmount={this.onMapUnmount.bind(this)}
            >
              { /* TODO Child components, such as markers, info windows, etc. */}
              <></>
            </GoogleMap>
          </LoadScript>
        }
        {(googleAPIKey === undefined) &&
          <div className={styles.FakeMap}></div>
        }
        <BackButton dark={dark_mode} onClick={this.onBackButtonClicked.bind(this)} />
      </Page >
    )
  }
}

export default connect(mapStateToProps)(Map)