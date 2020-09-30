import React from 'react';
import PropTypes from 'prop-types';
import "./AccordionBody.css"
import ReportItemView from './ReportItemView';
import { Col, Row } from 'react-bootstrap';
import CustomCheckBox from '../../components/CustomCheckBox/CustomCheckBox';
import { APPROVE, REJECT } from './data/global';


const AccordionBody = (props) => {
    const { userid, data, updateStatus } = props;
    const [isCheckAll, setIsCheckAll] = React.useState(false);
    const [checkBoxList, setCheckBoxList] = React.useState([]);
    const [selectedActon, setSelectedAction]=React.useState();

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


    React.useEffect(() => {
        let obj = {}
        data.getReportIds().forEach(index => { obj[index] = false });
        setCheckBoxList(obj);
        setIsCheckAll(false);
        setSelectedAction(null);

    }, [data]);

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
                    <input className="accept" type="radio" id={userid + "rb1"} checked={selectedActon===APPROVE} onClick={() => {setSelectedAction(APPROVE) ; handleSetStatusAll(APPROVE)}} name="approve-option" />
                    <label htmlFor={userid + "rb1"}>אישור מזומנים</label>
                </Col>
                <Col xs={4} className="radio-item">
                    <input className="reject" type="radio" id={userid + "rb2"} checked={selectedActon===REJECT} onClick={() => {setSelectedAction(REJECT) ;handleSetStatusAll(REJECT)}} name="approve-option" />
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
