import { Component } from "react";
import PropTypes from 'prop-types'
import styles from "./Button.module.css"

export default class Button extends Component {
    static propTypes = {
        className: PropTypes.string,
        dark: PropTypes.bool,
        onClick: PropTypes.func,
        style: PropTypes.object,
        submit: PropTypes.bool
    }

    render() {
        const { children, className, dark, style, onClick, submit } = this.props
        let realChildren = (children !== undefined) ? children : "BUTTON"
        return (<button type={(submit) ? "submit" : "button"} style={style} className={`${styles.Button} ${dark && styles.Dark} ${className} `} onClick={onClick}>{realChildren}</button>)
    }
}