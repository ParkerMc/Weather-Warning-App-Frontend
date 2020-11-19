import { Component } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { GoogleMap, LoadScript, InfoWindow, Polygon } from '@react-google-maps/api';

import BackButton from "../components/BackButton"
import Page from "../components/Page"
import ToggleButton from "../components/ToggleButton"

import { getInfo } from "../redux/actions/info"
import { getAlerts } from "../redux/actions/map"
import { loadCookies } from "../redux/actions/user"

import styles from "./Map.module.css"
import Button from "../components/Button";

const updateMins = 5

function mapStateToProps(store, ownProps) {
  return {
    dark_mode: store.settings.dark_mode,
    loggedin: store.user.loggedin,
    loggedin_check: store.user.loggedin_check,
    loggedin_loading: store.user.loggedin_loading,
    googleAPIKey: store.info.googleAPIKey,
    advisories: store.map.advisories,
    warnings: store.map.warnings,
    watches: store.map.watches,
    alerts_loading: store.map.alerts_loading
  }
}
class Map extends Component { // TODO add location markers and current location
  constructor() {
    super()
    this.state = {
      advisories_visiable: true,
      warnings_visiable: true,
      watches_visiable: true,
      interval: undefined,
      map: undefined,
      infoWindow: undefined,
      cetner: {
        lat: 39.8282,
        lng: -98.5795
      },
      zoom: 3
    }
  }

  componentDidMount() {
    const { loggedin_check, loggedin_loading, googleAPIKey, info_loading } = this.props
    this.props.dispatch(getAlerts())
    this.setState({
      interval: setInterval(() => {
        this.props.dispatch(getAlerts())
      }, updateMins * 60000)
    })
    if (googleAPIKey === undefined && !info_loading) {
      this.props.dispatch(getInfo())
    }
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

  onBackButtonClicked(e) {
    this.props.history.push("/current")
  }

  onMapLoad(map) {
    this.setState({ map })
  }

  onMapUnmount(map) {
    this.setState({ map: undefined })
  }

  onToggleButton(e) {
    this.setState({ [e.id + "_visiable"]: e.active })
  }

  generatePolyClickCallback(alert) {
    return (e) => {
      const { map } = this.state
      this.setState({
        center: map.center,
        zoom: map.zoom,
        infoWindow: {
          position: e.latLng,
          title: alert.headline,
          description: alert.description
        }
      })
    }
  }

  render() {
    const { dark_mode, loggedin, loggedin_loading, loggedin_check, googleAPIKey, warnings, watches, advisories } = this.props
    const { cetner, zoom, infoWindow, advisories_visiable, warnings_visiable, watches_visiable } = this.state
    let polyWarnings;
    if (warnings !== undefined) {
      polyWarnings = warnings.map((i) => {
        return (<Polygon key={i.id} paths={i.paths}
          onClick={this.generatePolyClickCallback(i)}
          options={{
            fillColor: "red",
            strokeColor: "red",
            strokeWeight: 1,
            clickable: true
          }}></Polygon>)
      })
    }
    let polyWatches;
    if (watches !== undefined) {
      polyWatches = watches.map((i) => {
        return (<Polygon key={i.id} paths={i.paths}
          onClick={this.generatePolyClickCallback(i)}
          options={{
            fillColor: "yellow",
            strokeColor: "yellow",
            strokeWeight: 1,
            clickable: true
          }}></Polygon>)
      })
    }
    let polyAdvisories;
    if (advisories !== undefined) {
      polyAdvisories = advisories.map((i) => {
        return (<Polygon key={i.id} paths={i.paths}
          onClick={this.generatePolyClickCallback(i)}
          options={{
            fillColor: "blue",
            strokeColor: "blue",
            strokeWeight: 1,
            clickable: true
          }}></Polygon>)
      })
    }
    return (
      <Page className={styles.Page} dark={dark_mode}>
        {!loggedin && !loggedin_loading && loggedin_check && <Redirect to="/" />}  {/* Redirects user if they are not logged in */}
        {(googleAPIKey !== undefined) &&
          <LoadScript
            googleMapsApiKey={googleAPIKey}
          >
            <GoogleMap
              mapContainerClassName={styles.Map}
              center={cetner}
              zoom={zoom}
              onLoad={this.onMapLoad.bind(this)}
              onUnmount={this.onMapUnmount.bind(this)}
            >
              {warnings_visiable && polyWarnings}
              {watches_visiable && polyWatches}
              {advisories_visiable && polyAdvisories}

              {infoWindow !== undefined &&
                <InfoWindow
                  position={infoWindow.position}
                  onCloseClick={() => { this.setState({ infoWindow: undefined }) }}
                >
                  <div>
                    <h3>{infoWindow.title}</h3>
                    <p>{infoWindow.description}</p>
                  </div>
                </InfoWindow>
              }

            </GoogleMap>
          </LoadScript>
        }
        {(googleAPIKey === undefined) &&
          <div className={styles.FakeMap}></div>
        }
        <div className={styles.ButtonBox}>
          <ToggleButton id="advisories" className={styles.BottomButton} active={advisories_visiable} onToggle={this.onToggleButton.bind(this)}>Advisories</ToggleButton>
          <ToggleButton id="watches" className={styles.BottomButton} active={watches_visiable} onToggle={this.onToggleButton.bind(this)}>Watches</ToggleButton>
          <ToggleButton id="warnings" className={styles.BottomButton} active={warnings_visiable} onToggle={this.onToggleButton.bind(this)}>Warnings</ToggleButton>
        </div>
        <div className={styles.ButtonBox}>
          <Button className={styles.BottomButton}>Radar</Button>  {/* TODO add functinality */}
          <div className={styles.FakeButton}></div>
          <div className={styles.FakeButton}></div>
        </div>
        <BackButton dark={dark_mode} onClick={this.onBackButtonClicked.bind(this)} />
      </Page >
    )
  }
}

export default connect(mapStateToProps)(Map)