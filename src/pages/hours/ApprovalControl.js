import React from 'react';
import PropTypes from 'prop-types';
import "./ApprovalControl.css"

const ApprovalControl = (props) => {
    const {userid} = props;
    return (
        <div className="approval-control">
            <div className="radio reject">
                <input type="radio" id={"reject-rb" + userid} name="group" />
                <label htmlFor={"reject-rb" + userid}>דחה</label>
            </div>

            <div className="radio wait">
                <input type="radio" id={"wait-rb" + userid} name="group" />
                <label  htmlFor={"wait-rb" + userid}>ממתין</label>
            </div>

            <div className="radio accept">
                <input type="radio" id={"approve-rb" + userid} name="group" />
                <label htmlFor={"approve-rb" + userid}>אישור</label>
            </div>
        </div>
    );
};


ApprovalControl.propTypes = {
    userid: PropTypes.string.isRequired
};


export default ApprovalControl;
