import { Component } from "react";
import PropTypes from 'prop-types'
import styles from "./ToggleButton.module.css"

export default class ToggleButton extends Component {
    static propTypes = {
        className: PropTypes.string,
        dark: PropTypes.bool,
        style: PropTypes.object,
        active: PropTypes.bool,
        onToggle: PropTypes.func,
        id: PropTypes.string
    }

    constructor(props) {
        super()
        const { active } = props
        this.state = { active }
    }

    toggleButton(e) {
        const { onToggle, id } = this.props
        const { active } = this.state
        e.target.blur()
        this.setState({ active: !active })
        if (onToggle !== undefined) {
            onToggle({ id, active: !active })
        }
    }

    render() {
        const { children, className, dark, style } = this.props
        const { active } = this.state
        let realChildren = (children !== undefined) ? children : (active) ? "ON" : "OFF"
        return (<button type="button" style={style} className={`${styles.ToggleButton} ${dark && styles.Dark} ${(active) && styles.active} ${className} `} onClick={this.toggleButton.bind(this)}>{realChildren}</button>)
    }
}