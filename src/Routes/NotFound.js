import { Component } from "react"
import styles from "./NotFound.module.css"


export default class NotFound extends Component{
  render() {
    return (
      <main className={styles.Main}>
        <h2>Error: 404<br/>
        Page Not Found</h2>
      </main >
    )
  }
}
