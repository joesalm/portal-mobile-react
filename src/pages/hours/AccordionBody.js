import React from 'react';
import PropTypes from 'prop-types';
// import { Form, FormControl, InputGroup } from 'react-bootstrap';
import "./AccordionBody.css"
import ReportItemView from './ReportItemView';
import { Col, Row } from 'react-bootstrap';
import CustomCheckBox from '../../components/CustomCheckBox/CustomCheckBox';



const AccordionBody = (props) => {
    const { userid, data } = props;

    return (
        <div className="accordion-body">
            <Row className="first-row">
                <Col xs={4} >
                    <CustomCheckBox text="סמן הכל" />
                </Col>
                <Col xs={4} className="radio-item">
                    <input className="reject" type="radio" id={userid + "rb1"} name="approve-option" />
                    <label htmlFor={userid + "rb1"}>אישור מזומנים</label>
                </Col>
                <Col xs={4} className="radio-item">
                    <input className="accept" type="radio" id={userid + "rb2"} name="approve-option" />
                    <label htmlFor={userid + "rb2"}>דחית מזומנים</label>
                </Col>

            </Row>
            <Row>
                {data? data.getReportIds().map(id =>
                    <ReportItemView data={data} reportId={id} userid={userid} />): null}
            </Row>
        </div >
    );
};


AccordionBody.propTypes = {
    userid: PropTypes.string.isRequired,
    date: PropTypes.object
};


export default AccordionBody;
