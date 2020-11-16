import { Component } from "react"
import { connect } from "react-redux"

import styles from "./Home.module.css"
import Page from "../components/Page"
import { processGoogleLogin } from "../redux/actions/user"

function mapStateToProps(store, ownProps) {
  return {
    dark_mode: store.settings.dark_mode,
  }
}

class GoogleCallback extends Component {
  parseURLParams(search) {
    let fixedSearch = search
    if (fixedSearch[0] === "?") {
      fixedSearch = fixedSearch.slice(1)
    }
    let split = fixedSearch.replace(/\+/g, " ").split("&")
    let parms = {}

    for (let i = 0; i < split.length; i++) {
      let nv = split[i].split("=", 2);
      let n = decodeURIComponent(nv[0]);
      let v = decodeURIComponent(nv[1]);
      parms[n] = v;
    }
    return parms;
  }

  componentDidMount() {
    let GET_data = this.parseURLParams(this.props.location.search)
    if (!GET_data.code) {
      this.props.history.replace("/")
      return
    }
    this.props.dispatch(processGoogleLogin(GET_data.code))
    this.props.history.replace("/")
  }

  render() {
    const { dark_mode } = this.props
    return (
      <Page className={styles.Page} dark={dark_mode}>
      </Page>
    )
  }
}

export default connect(mapStateToProps)(GoogleCallback)