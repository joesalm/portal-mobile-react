import React from 'react';
import PropTypes from 'prop-types';
// import { Form, FormControl, InputGroup } from 'react-bootstrap';
import "./AccordionBody.css"
import ReportItemView from './ReportItemView';



const AccordionBody = (props) => {
    const { userid } = props;
    return (
        <div>
            <div  >
                <input type="checkbox" id={"cb"+userid} name={"check-all"+ userid} />
                <label htmlFor="1">סמן הכל</label>
            </div>

            <div className="radio-item">
                <input className="red" type="radio" id="2" name="approve-option"  />
                <label htmlFor="2">אישור מזומנים</label>

                <input className="green" type="radio" id="3" name="approve-option"  />
                <label htmlFor="3">דחית מזומנים</label>
            </div>


            <div className="radio red">
                <input type="radio" id={"reject-rb"+userid} name="group" />
                <label htmlFor={"reject-rb"+userid}>דחה</label>
            </div>

            <div className="radio yellow">
                <input type="radio" id={"wait-rb"+userid }name="group" />
                <label className="yellow" htmlFor={"wait-rb"+userid}>ממתין</label>
            </div>


            <div className="radio green">
                <input type="radio" id={"approve-rb"+userid} name="group" />
                <label htmlFor={"approve-rb"+userid}>אישור</label>
            </div>


            <ReportItemView/>


        </div>
    );
};


AccordionBody.propTypes = {
    userid: PropTypes.string.isRequired
};


export default AccordionBody;
