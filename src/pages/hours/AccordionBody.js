import React from 'react';
import PropTypes from 'prop-types';
import "./AccordionBody.css"
import ReportItemView from './ReportItemView';
import { Col, Row } from 'react-bootstrap';
import CustomCheckBox from '../../components/CustomCheckBox/CustomCheckBox';


const AccordionBody = (props) => {
    const { userid, data, updateStatus } = props;
    const [isCheckAll, setIsCheckAll] = React.useState(false);
    let obj = {}
    data.getReportIds().forEach(index => { obj[index] = false });
    const [checkBoxList, setCheckBoxList] = React.useState(obj);


    const handleCheckBoxChange = (value, reportID) => {
        let obj = {}

        if (checkBoxList[reportID])
            setIsCheckAll(false);

        for (let index in checkBoxList) {
            if (index === reportID) {
                obj[index] = !checkBoxList[index];
            }
            else
                obj[index] = checkBoxList[index];

        }
        setCheckBoxList(obj);
    }


    const handleSelectAll = () => {
        setIsCheckAll(!isCheckAll);
        let obj = {};
        for (let index in checkBoxList) {
            obj[index] = !isCheckAll;
        }
        setCheckBoxList(obj);
    }


    const handleSetStatus = (reportIdsArr, status) => {
        updateStatus(userid, reportIdsArr, status);
    }

    const handleSetStatusAll = (status) => {
        const reportIdsArr = Object.keys(checkBoxList).filter(index => checkBoxList[index] === true)
        updateStatus(userid, reportIdsArr, status);
    }

    return (
        <div className="accordion-body">
            <Row className="first-row">
                <Col xs={4} >
                    <CustomCheckBox checked={isCheckAll} onChange={handleSelectAll} text="סמן הכל" />
                </Col>
                <Col xs={4} className="radio-item">
                    <input className="accept" type="radio" id={userid + "rb1"} onClick={() => handleSetStatusAll("approve")} name="approve-option" />
                    <label htmlFor={userid + "rb1"}>אישור מזומנים</label>
                </Col>
                <Col xs={4} className="radio-item">
                    <input className="reject" type="radio" id={userid + "rb2"} onClick={() => handleSetStatusAll("reject")} name="approve-option" />
                    <label htmlFor={userid + "rb2"}>דחית מזומנים</label>
                </Col>

            </Row>
            <Row>
                {data.getReportIds().map(id => {
                    return <ReportItemView isChecked={checkBoxList[id]}
                        key={"report" + id} handleChange={handleCheckBoxChange}
                        handleSetStatus={handleSetStatus}
                        data={data} reportId={id} userid={userid} />
                })
                }
            </Row>
        </div >
    );
};


AccordionBody.propTypes = {
    userid: PropTypes.string.isRequired,
    date: PropTypes.object,
    handleSetStatus: PropTypes.func
};


export default AccordionBody;
