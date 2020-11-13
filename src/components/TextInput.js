import { Component } from "react";
import PropTypes from 'prop-types'
import styles from "./TextInput.module.css"

export default class TextInput extends Component {
    static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        value: PropTypes.string,
        onChange: PropTypes.func,
        password: PropTypes.bool
    }

    render() {
        const { className, style, value, onChange, password } = this.props
        return (<input type={(password) ? "password" : "text"} style={style} className={`${styles.Input} ${className} `} value={value} onChange={onChange} />)
    }
}