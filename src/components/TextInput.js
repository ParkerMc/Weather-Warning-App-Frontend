import { Component } from "react";
import PropTypes from 'prop-types'
import styles from "./TextInput.module.css"

export default class TextInput extends Component {
    static propTypes = {
        className: PropTypes.string,
        id: PropTypes.string,
        style: PropTypes.object,
        value: PropTypes.string,
        onChange: PropTypes.func,
        password: PropTypes.bool,
        required: PropTypes.bool
    }

    render() {
        const { className, id, style, value, onChange, password, required } = this.props
        return (<input type={(password) ? "password" : "text"} style={style} className={`${styles.Input} ${className} `} value={value} onChange={onChange} id={id} required={required} />)
    }
}