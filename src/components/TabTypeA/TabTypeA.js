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
            <div className="row">
                <label>שם קורס :</label>
                <p>{fullName}</p>
            </div>
            <div className="row">
                <div className="col">
                    <label>שם מקוצר עברית :</label>
                    <p>{shortNameH}</p>
                </div>
                <div className="col">
                    <label>שם מקוצר ערבית :</label>
                    <p>{shortNameH}</p>
                </div>
            </div>
            <div className="row">
                <label>פרוייקט :</label>
                <p>{project}</p>
            </div>
            <div className="row">
                <label>תגיות :</label>
                <p>{tags}</p>
            </div>
            <div className="row">
                <div className="col">
                    <label>עיר :</label>
                    <p>{city}</p>
                </div>
                <div className="col">
                    <label>שנת תקציב :</label>
                    <p>{budget}</p>
                </div>
            </div>
            <div className="row">
                <label>מדריך :</label>
                <p>{teacher}</p>
            </div>
        
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
