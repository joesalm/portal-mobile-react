import React from 'react';
import PropTypes from 'prop-types';
import "./CustomCheckBox.css"

const CustomCheckBox = (props) => {
    const {text, onChange, checked }=props;
    return (
        <label  className="container-check-box">{text}
            <input checked = {checked} onChange = {(e)=> onChange(e.target.value)} type="checkbox" />
            <span className="checkmark"></span>
        </label>
    );
};


CustomCheckBox.propTypes = {
    text: PropTypes.string
};


export default CustomCheckBox;
