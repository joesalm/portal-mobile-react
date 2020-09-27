import React from 'react';
import PropTypes from 'prop-types';
import "./ReportItemView.css";
import { Col, Row } from 'react-bootstrap';
import ApprovalControl from './ApprovalControl';

const ReportItemView = (props) => {
    const { userid, data, reportId } = props;

    const type=data.getReportStatus(reportId);

    return (
        <div className="c-report-item-view">
            <Row className={"item-header"}>
                <ApprovalControl userid={userid} />
            </Row>
            <Row className={"item-body "  +type}>
                <Col xs={3}><input type="checkbox" name="select-item" id="select-item" /></Col>
                <Col xs={3}><label htmlFor="item-date">תאריך:  {data.reportedDate(reportId)}</label></Col>
                <Col xs={3}><label htmlFor="item-hour">סה"כ שעות:  {data.reportHoures(reportId)}</label></Col>
            </Row>
            <Row className={"item-body " +type}>
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
    report: PropTypes.object
};


export default ReportItemView;
