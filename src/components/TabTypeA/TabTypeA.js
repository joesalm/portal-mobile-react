import React from 'react';
import PropTypes from 'prop-types';
import "./TabTypeA.css"


const TabTypeA = (props) => {

   

    const { fullName,shortNameH,shortNameA,project,tags,city,budget,teacher } = props

    // const onSelection = (e) => {
    //     handleTabSelection(e.target.value);
   
    // }

    return (
        <div className="c-tab-type-a">
            <h3>שם קורס</h3>
            <p>{fullName}</p>
            <h3>שם מקוצר עברית</h3>
            <p>{shortNameH}</p>
            <h3>שם מקוצר ערבית</h3>
            <p>{shortNameH}</p>
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

TabTypeA.propTypes = {
    fullName: PropTypes.string,
    shortNameH: PropTypes.string,
    shortNameA: PropTypes.string,
    project: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    city: PropTypes.string,
    budget: PropTypes.string,
    teacher: PropTypes.string    
};

export default TabTypeA;
