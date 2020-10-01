import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import PortalDatePicker from '../../components/PortalDatePicker/PortalDatePicker';
import PortalNavbar from '../../components/navbar/PortalNavbar';
import ActiveUserContext from '../../shared/activeUserContext'
import { Redirect } from 'react-router-dom'
import PortalSelect from '../../components/PortalSelect/PortalSelect';
import IconButtonsSet from '../../components/iconButtonsSet/IconButtonsSet';
import server from "../../shared/server"
import OptionData from './data/OptionsData';
import { saveReport } from "./network/network"
import moment from "moment";
import { Col, Container, Row } from 'react-bootstrap';
import "./HoursNewReportPage.css"
import PortalInput from '../../components/PortalInput/PortalInput';


const HoursNewReportPage = (props) => {
    const { handleLogout } = props;


    const activeUser = useContext(ActiveUserContext);
    const [projectOptions, setProjectOptions] = React.useState([]);
    const [subjectOptions, setSubjectOptions] = React.useState([]);
    const [courseOptions, setCourseOptions] = React.useState([]);
    const [projectKey, setProjectKey] = React.useState("");
    const [courseKey, setCoursetKey] = React.useState("");
    const [subjectKey, setSubjectKey] = React.useState("");
    const [optionData, setOptionData] = React.useState(null);
    const [startHour, setStartHour] = React.useState("");
    const [finishHour, setFinisHhour] = React.useState("");
    const d = new Date();
    const [fulldate, setFullDate] = React.useState({
        date: d.getDate(),
        month: d.getMonth() + 1,
        year: d.getFullYear()
    });
    const [cost, setCost] = React.useState("");
    const [carKM, setCarKm] = React.useState("");
    const [comment, setComment] = React.useState("");


    const handleInputChangeCost = (value) => {
        setCost(value);
    }

    const handleInputChangeCarKM = (value) => {
        setCarKm(value);
    }

    const handleInputChangeComment = (value) => {
        setComment(value);
    }


    const handleInputChangeFinishHour = (value) => {
        setFinisHhour(value);
    }

    const handleInputChangeStartHour = (value) => {
        setStartHour(value);
    }


    const handleDateSelection = (year, month, date) => {
        setFullDate({
            date: date,
            month: month,
            year: year
        })
    }

    const handleProjectSelection = (keyValue) => {
        setProjectKey(keyValue);
        setCourseOptions(optionData.getCourses(keyValue));
        setSubjectOptions(optionData.getSubjects(keyValue));
    }

    const handleCourseSelection = (keyValue) => {
        setCoursetKey(keyValue);
    }

    const handleSubjectSelection = (keyValue) => {
        setSubjectKey(keyValue);
    }


    const handleSave = () => {
        const t1 = moment(finishHour, "hh:mm");
        const t2 = moment(startHour, "hh:mm");
        const t3 = t1 - t2;
        let hours = moment.utc(t3).format("HH:mm");


        // let hours = (moment(finishHour) - moment(startHour)).format("hh:mm");


        if (hours == "invlide date") {
            alert("שעות לא נכונות")
            return;
        }


        let courseName = courseOptions.find(item => item.key === courseKey)

        // console.log("save", `activeUser,
        // projectKey, courseKey, courseName, subjectKey,
        // startHour, finishHour, hours, fulldate
        // , cost, carKM, comment` , activeUser,
        //     projectKey, courseKey, courseKey, subjectKey,
        //     startHour, finishHour, hours, `${fulldate.date}/${fulldate.month}/${fulldate.year}`
        //     , cost, carKM, comment)



        saveReport(activeUser,
            projectKey, courseKey, courseName.key, subjectKey,
            startHour, finishHour, hours, `${fulldate.date}/${fulldate.month}/${fulldate.year}`
            , cost, carKM, comment
        ).then(response => {
            alert("נשמר")
            // console.log("response", response)
        })
    }

    React.useEffect(() => {
        let isSubscribed = true

        server(activeUser, {}, "GetMyReportingPerimeter").then(response => {
            let data = response.data;

            if (isSubscribed) {
                let optionData = new OptionData(data);
                setProjectOptions(optionData.getProjects());
                setOptionData(optionData)
            }
        })
        return () => {
            isSubscribed=false;
        };
    
    }, [activeUser]);


    if (!activeUser) {
        return <Redirect to='/' />
    }

    return (
        <div className="p-hours-new-report">
            <PortalNavbar handleLogout={handleLogout} />
            <Container fluid>
                <Row className="report-row">
                    <PortalDatePicker handleDateSelection={handleDateSelection} />
                </Row>
                <Row className="report-row">
                    <PortalSelect title="פרויקט" options={projectOptions} optionsKey={projectKey} handleSelection={handleProjectSelection} />
                </Row>
                <Row className="report-row">
                    <PortalSelect title="שם/מספר קורס" options={courseOptions} optionsKey={courseKey} handleSelection={handleCourseSelection} />
                </Row>
                <Row className="report-row">
                    <PortalSelect title="נושא פעילות" options={subjectOptions} optionsKey={subjectKey} handleSelection={handleSubjectSelection} />
                </Row>
                <Row className="report-row">
                <Col xs={6}>
                        <PortalInput className="report-text"
                            title='שעת התחלה'
                            placeholder=''
                            handleChange={handleInputChangeStartHour} />
                    </Col>
                    <Col xs={6}>
                        <PortalInput className="report-text"
                            title='שעת סיום'
                            placeholder=''
                            handleChange={handleInputChangeFinishHour} />
                    </Col>
                </Row>
                <Row className="report-row">
                    <Col xs={6}>
                        <PortalInput className="report-text"
                            title='רכב פרטי (ק"מ)'
                            placeholder=''
                            handleChange={handleInputChangeCarKM} />
                    </Col>
                    <Col xs={6}>
                        <PortalInput className="report-text"
                            title=' תחבורה ציבורית (ש"ח)'
                            placeholder=''
                            handleChange={handleInputChangeCost}
                        />
                    </Col>

                </Row>
                <Row className="report-row">
                    <PortalInput className="report-text" title="הערה"
                        placeholder=""
                        handleChange={handleInputChangeComment}
                    />
                </Row>

            </Container>
            <IconButtonsSet onCopy={null} onSave={handleSave} onDelete={null} onBack={null} onAdd={null} />

        </div >
    );
};


HoursNewReportPage.propTypes = {

};


export default HoursNewReportPage;
