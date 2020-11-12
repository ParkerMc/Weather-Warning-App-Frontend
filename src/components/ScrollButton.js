import { Component } from "react";
import PropTypes from 'prop-types'
import styles from "./ScrollButton.module.css"

export default class ScrollButton extends Component {
    static propTypes = {
        className: PropTypes.string,
        dark: PropTypes.bool,
        style: PropTypes.object,
        active: PropTypes.bool,
        actives: PropTypes.array,
        enableToggle: PropTypes.bool,
        onToggle: PropTypes.func,
        onChange: PropTypes.func,
        options: PropTypes.array,
        loop: PropTypes.bool,
        current: PropTypes.number,
        postfix: PropTypes.string
    }

    constructor(props) {
        super()
        const { current, active, actives } = props
        this.state = { current, active, actives }
        if (current === undefined) {
            this.state.current = 0
        }
        if (actives !== undefined) {
            this.state.active = actives[this.state.current]
        }
    }


    toggleButton(e) {
        const { onToggle, enableToggle } = this.props
        const { active, current, actives } = this.state
        if (!enableToggle) {
            return;
        }
        e.target.blur()
        this.setState({ active: !active })
        if (actives !== undefined) {
            var newActives = [...actives]
            newActives[current] = !active
            this.setState({ actives: newActives })
        }
        if (onToggle !== undefined) {
            onToggle(!active)
        }
    }

    backButtonPress(e) {
        const { options, loop, onChange } = this.props
        const { current, actives } = this.state

        let newIndex = current - 1
        if (newIndex < 0) {
            if (!loop) {
                return;
            }
            newIndex = options.length - 1
        }
        this.setState({ current: newIndex })
        if (actives !== undefined) {
            this.setState({ active: actives[newIndex] })
        }
        if (onChange !== undefined) {
            onChange(newIndex)
        }
    }

    forwardButtonPress(e) {
        const { options, loop, onChange } = this.props
        const { current, actives } = this.state

        let newIndex = current + 1
        if (newIndex >= options.length) {
            if (!loop) {
                return;
            }
            newIndex = 0
        }
        this.setState({ current: newIndex })
        if (actives !== undefined) {
            this.setState({ active: actives[newIndex] })
        }
        if (onChange !== undefined) {
            onChange(newIndex)
        }
    }

    render() {
        const { className, dark, style, options, postfix } = this.props
        const { current, active } = this.state
        return (<div style={style} className={`${styles.ScrollButton} ${dark && styles.Dark} ${(active) && styles.active} ${className} `} >
            <div className={styles.BackButton} onClick={this.backButtonPress.bind(this)}></div>
            <div className={styles.Text} onClick={this.toggleButton.bind(this)}>
                {options[current]}{postfix}
            </div>
            <div className={styles.ForwardButton} onClick={this.forwardButtonPress.bind(this)}></div>
        </div>)
    }
}