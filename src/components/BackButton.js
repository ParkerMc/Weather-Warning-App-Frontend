import { Component } from "react";
import PropTypes from 'prop-types'
import styles from "./BackButton.module.css"

export default class BackButton extends Component {
    static propTypes = {
        className: PropTypes.string,
        dark: PropTypes.bool,
        onClick: PropTypes.func,
        style: PropTypes.object,
    }

    render() {
        const { className, dark, style, onClick } = this.props
        return (<div className={`${styles.Button} ${dark && styles.Dark} ${className}`} onClick={onClick} style={style}></div>)
    }
}