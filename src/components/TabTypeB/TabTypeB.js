import React from 'react';
import PropTypes from 'prop-types';
import "./TabTypeB.css"
import { Row,Col } from 'react-bootstrap';


const TabTypeB = (props) => {

   

    const { fullName,subjects } = props

    const syllabus = subjects.map((subject,index) => <Row key={index}><label>שם נושא</label>
        <p>{subject.subject}</p>
        </Row>)

    return (
        <div className="c-tab-type-b">
            <Row>
                <label>שם קורס</label>
                <p>{fullName}</p>
            </Row>
            
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
