import { Component } from "react";
import PropTypes from 'prop-types'
import styles from "./GoogleLoginButton.module.css"

export default class GoogleLoginButton extends Component {
    static propTypes = {
        label: PropTypes.string,
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
        const { style, label, dark, className, disabled } = this.props;
        return (<div role="button" style={style} onClick={this.onClick.bind(this)}
            className={`${(disabled) ? styles.DisabledButton : ((dark) ? styles.DarkButton : styles.LightButton)} ${className}`} >
            <img className={styles.Icon} alt="Google Logo"></img>
            <span className={styles.Label}>{(label !== undefined) ? label : "Sign in with Google"}</span>
        </div>)
    }
}