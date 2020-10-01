import React from 'react';
import PropTypes from 'prop-types';
import "./ApprovalControl.css"
import { APPROVE, REJECT, WAIT, } from './data/global';


const ApprovalControl = (props) => {
    const { controlId, handleClick, selected } = props;


    return (
        <div className="approval-control">
            <div onClick={() => handleClick(REJECT, controlId)} className="radio reject">
                <input type="radio" checked={selected === REJECT}
                    onChange={() => handleClick(REJECT, controlId)}
                    id={REJECT + "rb" + controlId} name={"group" + controlId} />
                <label htmlFor={REJECT + "-rb" + controlId}>דחה</label>
            </div>
            <div onClick={() => handleClick(WAIT, controlId)} className="radio wait">
                <input type="radio" checked={selected === WAIT}
                    onChange={() => handleClick(WAIT, controlId)}
                    id={WAIT + "rb" + controlId} name={"group" + controlId} />
                <label htmlFor={WAIT + "rb" + controlId}>ממתין</label>
            </div>

            <div onClick={() => handleClick(APPROVE, controlId)} className="radio accept">
                <input type="radio" checked={selected === APPROVE} readOnly
                    onClick={() => handleClick(APPROVE, controlId)}
                    id={"approve-rb" + controlId} name={"group" + controlId} />
                <label htmlFor={APPROVE + "rb" + controlId}>אישור</label>
            </div>
        </div>
    );
};


ApprovalControl.propTypes = {
    controlId: PropTypes.string.isRequired
};


export default ApprovalControl;
