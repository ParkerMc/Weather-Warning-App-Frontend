import { Component } from "react"
import { connect } from "react-redux"

import Page from "../components/Page"

import styles from "./NotFound.module.css"

function mapStateToProps(store, ownProps) {
  return {
    dark_mode: store.settings.dark_mode
  }
}

class NotFound extends Component {
  render() {
    const { dark_mode } = this.props
    return (
      <Page className={styles.Main} dark={dark_mode}>
        <h2>Error: 404<br />
        Page Not Found</h2>
      </Page>
    )
  }
}

export default connect(mapStateToProps)(NotFound)
