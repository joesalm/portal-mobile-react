import React from 'react';
import PropTypes from 'prop-types';
import "./TabTypeB.css"


const TabTypeB = (props) => {

   

    const { fullName,subjects } = props

    const syllabus = subjects.map((subject) => <p>{subject.subject}</p>)

    return (
        <div className="c-tab-type-b">
            <label>שם קורס</label>
            <p>{fullName}</p>
            <label>שם נושא</label>
            {syllabus}                  
        </div>

    )
};

TabTypeB.propTypes = {
    fullName: PropTypes.string,
    subjects: PropTypes.arrayOf(PropTypes.string)
    
};

export default TabTypeB;
