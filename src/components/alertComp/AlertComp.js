import React, { Component } from 'react';
import error_alert from '../../assets/images/error_alert.png'

import './AlertComp.css'



class AlertComp extends Component {

    constructor(props) {
        super(props);
    }
 
    render() {
        const {message ,type ,closeFunction} = this.props
        return (
            <div className="alertAnimation">
                <div className="c-alertComp">
                    <img className="alertImg" type={type} src={error_alert} />

                    <div className="alertText">
                        {message}
                    </div>
                    <div type="button"
                        onClick={closeFunction}
                        className="closeAlertBtn">&times;</div>
                </div>
            </div>
        );
    }
}

export default AlertComp;