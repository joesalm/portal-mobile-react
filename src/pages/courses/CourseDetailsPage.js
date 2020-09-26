import React, { useContext } from 'react';
import './CourseDetailsPage.css'
import PortalNavbar from '../../components/navbar/PortalNavbar';
import ActiveUserContext from '../../shared/activeUserContext'
import { Redirect } from 'react-router-dom'
import PortalTabView from '../../components/PortalTabView/PortalTabView';
import SaveIcon from "../../assets/images/noun_save.svg";
import CopyIcon from "../../assets/images/noun_copy.svg";
import BackArrowIcon from "../../assets/images/noun_back_arrow.svg";
import { Row,Col } from 'react-bootstrap';



const CourseDetailsPage = (props) => {
    const { handleLogout } = props;
    const activeUser = useContext(ActiveUserContext);

    const handleSelection = (e) => {
        //setCoursesStatus(e)
   }

    const options = [{ key: 0, value: "פרופיל" },{ key: 1, value: "קורסים" },{ key: 2, value: "עובדים" },{ key: 3, value: "דיווח" }];

    
    if (!activeUser) {
        return <Redirect to='/' />
    }

    return (
        <div className="p-course-details">
            <PortalNavbar handleLogout={handleLogout}/>
            <p>קורסים</p>

            <Row className="header">
                <Col className="col-sm-2">
                    <h1>שם קורס מקוצר</h1>
                </Col>

                <Col className="icons col-sm-9">
                    <img src={BackArrowIcon}></img>
                    <img src={CopyIcon}></img>
                    <img src={SaveIcon}></img>
                </Col>                
                
            </Row>
            
            
            <PortalTabView options={options} handleSelection={handleSelection}/>

        </div>
    );
}

export default CourseDetailsPage;