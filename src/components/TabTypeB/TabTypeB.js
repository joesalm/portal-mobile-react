import React from 'react';
import PropTypes from 'prop-types';
import "./TabTypeB.css"


const TabTypeB = (props) => {

   

    const { fullName,subjects } = props

    // const onSelection = (e) => {
    //     handleTabSelection(e.target.value);
   
    // }

    return (
        <div className="c-tab-type-b">
            <h3>שם קורס</h3>
            <p>{fullName}</p>
            <h3>שם נושא</h3>
            <p>{subjects}</p>                  
        </div>

    )
};

TabTypeB.propTypes = {
    fullName: PropTypes.string,
    subjects: PropTypes.arrayOf(PropTypes.string)
    
};

export default TabTypeB;
