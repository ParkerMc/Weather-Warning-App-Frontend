import { Component } from "react";
import PropTypes from 'prop-types'
import styles from "./ToggleButton.module.css"

export default class ToggleButton extends Component {
    static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        active: PropTypes.bool,
        onToggle: PropTypes.func
    }

    constructor(props) {
        super()
        const { active } = props
        this.state = { active }
    }

    toggleButton(e) {
        const { onToggle } = this.props
        const { active } = this.state
        e.target.blur()
        this.setState({ active: !active })
        if (onToggle !== undefined) {
            onToggle(!active)
        }
    }

    render() {
        const { children, className, style } = this.props
        const { active } = this.state
        let realChildren = (children !== undefined) ? children : "TOGGLE"
        return (<button type="button" style={style} className={`${styles.ToggleButton} ${(active) && styles.active} ${className} `} onClick={this.toggleButton.bind(this)}>{realChildren}</button>)
    }
}