import { Component } from "react";
import PropTypes from 'prop-types'
import styles from "./Page.module.css"

export default class Page extends Component {
    static propTypes = {
        dark: PropTypes.bool,
        style: PropTypes.object,
        className: PropTypes.string
    }

    render() {
        const { className, dark, style } = this.props
        let mainClass = (dark) ? styles.MainDark : styles.MainLight;
        return (<main className={`${mainClass} ${className}`} style={style} > { this.props.children}</main >)
    }
}