import React from 'react';
import PropTypes from 'prop-types';
import "./ApprovalControl.css"

const ApprovalControl = (props) => {
    const {controlId, handleClick} = props;


    return (
        <div className="approval-control">
            <div onChange={()=>handleClick("reject", controlId)}  className="radio reject">
                <input type="radio" id={"reject-rb" + controlId} name={"group"+controlId}  />
                <label htmlFor={"reject-rb" + controlId}>דחה</label>
            </div>

            <div onChange={()=>handleClick("wait", controlId)}  className="radio wait">
                <input type="radio" id={"wait-rb" + controlId} name={"group"+controlId} />
                <label  htmlFor={"wait-rb" + controlId}>ממתין</label>
            </div>

            <div onChange={()=>handleClick("approve", controlId)} className="radio accept">
                <input type="radio" id={"approve-rb" + controlId} name={"group"+controlId}  />
                <label htmlFor={"approve-rb" + controlId}>אישור</label>
            </div>
        </div>
    );
};


ApprovalControl.propTypes = {
    controlId: PropTypes.string.isRequired
};


export default ApprovalControl;
