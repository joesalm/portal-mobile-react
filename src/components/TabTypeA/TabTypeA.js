import React from 'react';
import PropTypes from 'prop-types';
import "./TabTypeA.css"
import { Row,Col } from 'react-bootstrap';

const TabTypeA = (props) => {

   

    const { fullName,shortNameH,shortNameA,project,tags,city,budget,teacher } = props

    // const onSelection = (e) => {
    //     handleTabSelection(e.target.value);
   
    // }

    return (
        <div className="c-tab-type-a">
            <Row>
                <label>שם קורס</label>
                <p>{fullName}</p>
            </Row>
            <Row>
                <Col sm={6}>
                    <label>שם מקוצר עברית</label>
                    <p>{shortNameH}</p>

                </Col>
                <Col sm={6}>
                    <label>שם מקוצר ערבית</label>
                    <p>{shortNameH}</p>
                </Col>
            </Row>
            <Row>
                <label>פרוייקט</label>
                <p>{project}</p>
            </Row>
            <Row>
                <label>תגיות</label>
                <p>{tags}</p>
            </Row>
            <Row>
                <Col sm={4}>
                    <label>עיר</label>
                    <p>{city}</p>
                </Col>
                <Col sm={4}>
                    <label>שנת תקציב</label>
                    <p>{budget}</p>
                </Col>
            </Row>
            <Row>
                <label>מדריך</label>
                <p>{teacher}</p>
            </Row>
        
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
