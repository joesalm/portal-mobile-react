import React from 'react';
import PropTypes from 'prop-types';
import "./TabTypeB.css"


const TabTypeB = (props) => {

   

    const { fullName,subjects } = props

    const syllabus = subjects.map((subject,index) => <div className="row" key={index}>
        <p>{subject.subject}</p>
        </div>)

    return (
        <div className="c-tab-type-b">
            <div>
                <label>שם קורס </label>
                <p>{fullName}</p>
            </div>
            <div>
                <label>סילבוס </label>
   
            </div>
            {/* <label>שם נושא</label> */}
            {syllabus}
            
                              
        </div>

    )
};

TabTypeB.propTypes = {
    fullName: PropTypes.string,
    subjects: PropTypes.arrayOf(PropTypes.string)
    
};

export default TabTypeB;
