import { Component } from "react";
import PropTypes from 'prop-types'
import styles from "./ScrollButton.module.css"

export default class ScrollButton extends Component {
    static propTypes = {
        className: PropTypes.string,
        dark: PropTypes.bool,
        style: PropTypes.object,
        active: PropTypes.bool,
        onChange: PropTypes.func,
        options: PropTypes.array,
        loop: PropTypes.bool,
        current: PropTypes.number,
        postfix: PropTypes.string,
        id: PropTypes.string
    }

    constructor(props) {
        super()
        const { current, active } = props
        this.state = {
            current,
            currentProp: current,
            active
        }
        if (current === undefined) {
            this.state.current = 0
        }
    }


    backButtonPress(e) {
        const { options, loop, onChange, id } = this.props
        const { current } = this.state

        let newIndex = current - 1
        if (newIndex < 0) {
            if (!loop) {
                return;
            }
            newIndex = options.length - 1
        }

        this.setState({ current: newIndex })

        if (onChange !== undefined) {
            onChange({ id, val: newIndex })
        }
    }

    forwardButtonPress(e) {
        const { options, loop, onChange, id } = this.props
        const { current } = this.state

        let newIndex = current + 1
        if (newIndex >= options.length) {
            if (!loop) {
                return;
            }
            newIndex = 0
        }

        this.setState({ current: newIndex })

        if (onChange !== undefined) {
            onChange({ id, val: newIndex })
        }
    }

    componentDidUpdate() {
        const { propCurrent } = this.state
        const { current } = this.props
        if (propCurrent !== current) {
            this.setState({
                current,
                propCurrent: current
            })
        }
    }

    render() {
        const { className, dark, style, options, postfix } = this.props
        const { current, active } = this.state
        return (<div style={style} className={`${styles.ScrollButton} ${dark && styles.Dark} ${(active) && styles.active} ${className} `} >
            <div className={styles.BackButton} onClick={this.backButtonPress.bind(this)}></div>
            <div className={styles.Text}>
                {options[current]}{postfix}
            </div>
            <div className={styles.ForwardButton} onClick={this.forwardButtonPress.bind(this)}></div>
        </div>)
    }
}