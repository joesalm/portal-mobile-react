import React from 'react';
import PropTypes from 'prop-types';
import "./ReportItemView.css";
import { Col, Row } from 'react-bootstrap';
import ApprovalControl from './ApprovalControl';

const ReportItemView = (props) => {
    const { data, reportId, isChecked, handleChange, handleSetStatus } = props;

    const handleClick = (status) => {
        handleSetStatus([reportId], status);
    }

    const type = data.getReportStatus(reportId);
    return (
        <div className="c-report-item-view">
            <Row className={"item-header"}>
                <ApprovalControl controlId={reportId} handleClick={handleClick} />
            </Row>
            <Row className={"item-body " + type}>
                {console.log("ischecked anat", isChecked)}
                <Col xs={3}>
                        <input type="checkbox" checked={isChecked} 
                            onChange={(e) =>  handleChange(e.target.value, reportId) }
                            name={"select-item" + reportId} id={"select-item" + reportId} />
                </Col>
                <Col xs={3}><label htmlFor="item-date">תאריך:  {data.reportedDate(reportId)}</label></Col>
                <Col xs={3}><label htmlFor="item-hour">סה"כ שעות:  {data.reportHoures(reportId)}</label></Col>
            </Row>
            <Row className={"item-body " + type}>
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

                            <td>{data.projectName(reportId)}</td>
                            <td>{data.courseName(reportId)}</td>
                            <td>{data.subjectName(reportId)}</td>
                        </tr>
                    </tbody>
                </table>
            </Row>
        </div >
    );
};


ReportItemView.propTypes = {
    userid: PropTypes.string,
    data: PropTypes.object,
    report: PropTypes.object,
    handleChange: PropTypes.func
};


export default ReportItemView;
