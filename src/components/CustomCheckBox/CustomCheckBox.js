import React from 'react';
import PropTypes from 'prop-types';
import "./CustomCheckBox.css"

const CustomCheckBox = (props) => {
    const {text}=props;
    const [isChecked, setIsChecked] = React.useState(false)
    return (
        <label  className="container-check-box">{text}
            <input onChange={()=> setIsChecked(!isChecked)} type="checkbox" checked={isChecked} />
            <span className="checkmark"></span>
        </label>
    );
};


CustomCheckBox.propTypes = {
    text: PropTypes.string
};


export default CustomCheckBox;
