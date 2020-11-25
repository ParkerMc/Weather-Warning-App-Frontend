import { Component } from "react"
import { connect } from "react-redux"

import BackButton from "../../components/BackButton"
import Page from "../../components/Page"

import styles from "./Locations.module.css"

function mapStateToProps(store, ownProps) {
  return {
    darkMode: store.settings.darkMode
  }
}

class Locations extends Component {
  onBackButtonClicked(e) {
    this.props.history.push("/settings")
  }

  render() {
    const { darkMode } = this.props
    return (
      <Page className={styles.Main} dark={darkMode}>
        <h2>Not Added Yet</h2>
        <BackButton dark={darkMode} onClick={this.onBackButtonClicked.bind(this)} />
      </Page>
    )
  }
}

export default connect(mapStateToProps)(Locations)
