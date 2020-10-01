import React, { useContext,useState,useEffect } from 'react';
import './CourseDetailsPage.css'
// import PortalNavbar from '../../components/navbar/PortalNavbar';
import ActiveUserContext from '../../shared/activeUserContext'

import { Redirect } from 'react-router-dom'
import PortalTabView from '../../components/PortalTabView/PortalTabView';
import SaveIcon from "../../assets/images/noun_save.svg";
import CopyIcon from "../../assets/images/noun_copy.svg";
import BackArrowIcon from "../../assets/images/noun_back_arrow.svg";
import { Container,Row,Col } from 'react-bootstrap';
import server from '../../shared/server'
import TabTypeA from '../../components/TabTypeA/TabTypeA';
import TabTypeB from '../../components/TabTypeB/TabTypeB';
import TabTypeC from '../../components/TabTypeC/TabTypeC';
import PortalNavbar from '../../components/navbar/PortalNavbar';



const CourseDetailsPage = (props) => {
    const { handleLogout } = props;

    const activeUser = useContext(ActiveUserContext);

    const [courseShortNameH, setCourseShortNameH] = useState("")
    const [courseShortNameA, setCourseShortNameA] = useState("")
    const [courseFullName, setCourseFullName] = useState("")
    const [projectName, setProjectName] = useState("")
    const [tagsName, setTagsName] = useState([])
    const [cityId, setCityId] = useState("")    

    const [budgetName, setBudgetName] = useState("")
    const [teacherName, setTeacherName] = useState("")
    const [subjects, setSubjects] = useState([])

    const [tabToShow, setTabToShow] = useState("0")
   
    const [course, setCourse] = useState("")
 


    const handleTabSelection = (tabIndex) => {

        setTabToShow(tabIndex)        
   }

    const options = [{ key: "0", value: "קורס" },{ key: "1", value: "סילבוס" },{ key: "2", value: "סטודנטים" },{ key: "3", value: "מדריכים" }];

    // go to server ------------------------------------------- 

    useEffect(() => {
        
        const activeCourseId = localStorage.activeCourse
       
        const data = {courseid: activeCourseId};
        server(activeUser, data, "GetCourseById").then(res => {
            if (res.data.error) {
                alert("error in course");
            } else {
                
                const coursesToDisplay = res.data.courses
                setCourse(coursesToDisplay) 
                
                setCourseShortNameH(res.data.subname)
                setCourseShortNameA(res.data.subnameinarabic)
                setCourseFullName(res.data.name) 
                setProjectName(res.data.projectid) 
                setTagsName(res.data.tags) 
                setCityId(res.data.cityid)                            
                setBudgetName(res.data.yearbudgetid)                            
                setTeacherName(res.data.primaryTeacherName)                            
                setSubjects(res.data.subjects)                                                     
                                             
            }
        }, err => {
            console.error(err);
        })        
       

    }, [tabToShow])
    
    //-----------------------------------------------------------

       
    // conditional rendering tab
    const tabToRender = ((tabToShow==="0") ? 
    <TabTypeA fullName={courseFullName} shortNameH={courseShortNameA} shortNameH={courseShortNameA} project={projectName} tags ={tagsName} city={cityId} budget={budgetName} teacher={teacherName}/> :
     (tabToShow==="1") ? 
     <TabTypeB fullName={courseFullName} subjects={subjects} /> :     
     (tabToShow==="2") ? 
     <TabTypeC roleId={"1"} placeHolderSearch={"חיפוש חניך"} addRoleObject={"הוסף סטודנט"}/> :     
     <TabTypeC roleId={"2"} placeHolderSearch={"חיפוש מדריך"} />)

    
    if (!activeUser) {
        return <Redirect to='/' />
    }

    return (
        <div className="p-course-details">

            <PortalNavbar title={"קורסים"} handleLogout={handleLogout}/>            
            <Container>            
                <Row className="header">
                    <Col className="col-sm-2">
                        <h1>{courseShortNameH}</h1>
                        <p>{courseFullName}</p>
                    </Col>

                    <Col className="icons col-sm-9">
                        <img src={BackArrowIcon}></img>
                        <img src={CopyIcon}></img>
                        <img src={SaveIcon}></img>
                    </Col>                
                    
                </Row>

            </Container>
            
            <PortalTabView options={options} handleTabSelection={handleTabSelection}/>
            <div className="table">
                {tabToRender}
            </div>            

        </div>
    );
}

export default CourseDetailsPage;