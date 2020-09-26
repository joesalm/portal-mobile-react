import React, { useContext,useState,useEffect } from 'react';
import './CourseDetailsPage.css'
import PortalNavbar from '../../components/navbar/PortalNavbar';
import ActiveUserContext from '../../shared/activeUserContext'
import { Redirect } from 'react-router-dom'
import PortalTabView from '../../components/PortalTabView/PortalTabView';
import SaveIcon from "../../assets/images/noun_save.svg";
import CopyIcon from "../../assets/images/noun_copy.svg";
import BackArrowIcon from "../../assets/images/noun_back_arrow.svg";
import { Row,Col } from 'react-bootstrap';
import server from '../../shared/server'



const CourseDetailsPage = (props) => {
    const { handleLogout } = props;
    const activeUser = useContext(ActiveUserContext);

    const [courseShortName, setCourseShortName] = useState("")
    const [tabToShow, setTabToShow] = useState("0")
    const [currentCourseId, setCurrentCourseId] = useState("")
    const [course, setCourse] = useState([])



    const handleTabSelection = (e) => {

        setTabToShow(e)        
   }

    const options = [{ key: 0, value: "פרופיל" },{ key: 1, value: "קורסים" },{ key: 2, value: "עובדים" },{ key: 3, value: "דיווח" }];

    // go to server --------------------------------   
    useEffect(() => {
        
        const data = {courseid: 59};
        server(activeUser, data, "GetCourseById").then(res => {
            if (res.data.error) {
                alert("error in course");
            } else {
                
                const coursesToDisplay = res
                setCourse(coursesToDisplay) 
                console.log(coursesToDisplay)
                setCourseShortName(res.data.subname)                               
                                             
            }
        }, err => {
            console.error(err);
        })            
        

    }, [tabToShow])
    
    //--------------------------------------------------
    
    if (!activeUser) {
        return <Redirect to='/' />
    }

    return (
        <div className="p-course-details">
            <PortalNavbar handleLogout={handleLogout}/>
            <p>קורסים</p>

            <Row className="header">
                <Col className="col-sm-2">
                    <h1>{courseShortName}</h1>
                </Col>

                <Col className="icons col-sm-9">
                    <img src={BackArrowIcon}></img>
                    <img src={CopyIcon}></img>
                    <img src={SaveIcon}></img>
                </Col>                
                
            </Row>
            
            
            <PortalTabView options={options} handleSelection={handleTabSelection}/>

        </div>
    );
}

export default CourseDetailsPage;