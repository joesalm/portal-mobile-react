import React from 'react';
import PropTypes from 'prop-types';
import "./TabTypeB.css"
import { Row,Col } from 'react-bootstrap';


const TabTypeB = (props) => {

   

    const { fullName,subjects } = props

    const syllabus = subjects.map((subject,index) => <Row key={index}>
        <p>{subject.subject}</p>
        </Row>)

    return (
        <div className="c-tab-type-b">
            <div>
                <label>שם קורס :</label>
                <p>{fullName}</p>
            </div>
            <div>
                <label>סילבוס :</label>
   
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
