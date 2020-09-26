import React from 'react';
import PropTypes from 'prop-types';
import "./TabTypeA.css"


const TabTypeA = (props) => {

   

    const { fullName,shortName,project,tags,city,budget,teacher } = props

    // const onSelection = (e) => {
    //     handleTabSelection(e.target.value);
   
    // }

    return (
        <div className="c-tab-type-a">
            <h3>שם קורס</h3>
            <p>{fullName}</p>
            <h3>שם מקוצר</h3>
            <p>{shortName}</p>
            <h3>פרוייקט</h3>
            <p>{project}</p>
            <h3>תגיות</h3>
            <p>{tags}</p>
            <h3>עיר</h3>
            <p>{city}</p>
            <h3>שנת תקציב</h3>
            <p>{budget}</p>
            <p>{teacher}</p>           
        </div>
    )
};

export default TabTypeA;
