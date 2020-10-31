import { Component } from "react";
import PropTypes from 'prop-types'
import styles from "./GoogleLoginButton.module.css"

export default class GoogleLoginButton extends Component {
    static propTypes = {
        disabled: PropTypes.bool,
        dark: PropTypes.bool,
        onClick: PropTypes.func,
        style: PropTypes.object,
        className: PropTypes.string
    }

    onClick(e) {
        if (!this.props.disabled && this.props.onClick !== undefined) {
            this.props.onClick(e)
        }
    }

    render() {
        const { children, className, dark, disabled, style } = this.props;
        let label = (children !== undefined) ? children : "Sign in with Google"
        let buttonClass = (disabled) ? styles.DisabledButton :
            ((dark) ? styles.DarkButton : styles.LightButton)

        return (<div role="button" style={style} onClick={this.onClick.bind(this)}
            className={`${buttonClass} ${className}`} >
            <img className={styles.Icon} alt="Google Logo"></img>
            <span className={styles.Label}>{label}</span>
        </div>)
    }
}