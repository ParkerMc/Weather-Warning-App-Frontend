import { Component } from "react"
import { connect } from "react-redux"

import Page from "../components/Page"

import styles from "./NotFound.module.css"

function mapStateToProps(store, ownProps) {
  return {
    darkMode: store.settings.darkMode
  }
}

class NotFound extends Component {
  render() {
    const { darkMode } = this.props
    return (
      <Page className={styles.Main} dark={darkMode}>
        <h2>Error: 404<br />
        Page Not Found</h2>
      </Page>
    )
  }
}

export default connect(mapStateToProps)(NotFound)
