import React from 'react';
import PropTypes from 'prop-types';
import "./ReportItemView.css";
import { Col, Row } from 'react-bootstrap';

const ReportItemView = () => {
    return (
        <div className="c-report-item-view">
            <div>
                <Row>
                    <Col><input type="checkbox" name="select-item" id="select-item" /></Col>
                    <Col><label htmlFor="item-date">תאריך:</label></Col>
                    <Col><label htmlFor="item-hour">סה"כ שעות:</label></Col>
                    <Col/>
                    <Col/>
                </Row>
                <div className="title-row">
                </div>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>פרויקט</th>
                            <th>מספר קורס</th>
                            <th>נושא פעילות</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>פרויקט גמר</td>
                            <td>{"54654646"}</td>
                            <td>{"נושא חופשי"}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};


ReportItemView.propTypes = {

};


export default ReportItemView;
