
import React, { useContext,useState,useEffect } from 'react';
import ActiveUserContext from '../../shared/activeUserContext'

import PropTypes from 'prop-types';
import "./TabTypeC.css"
import PortalSearchPager from '../../components/PortalSearchPager/PortalSearchPager';
import PortalTable from '../../components/PortalTable/PortalTable';
import UsersButtonSetComp from '../../components/usersButtonSetComp/UsersButtonSetComp';
import server from '../../shared/server'




const TabTypeC = (props) => {
   

    const { roleId } = props

    const activeUser = useContext(ActiveUserContext);


    const [currentPage, setCurrentPage] = useState(0)
    const [currentSearch, setCurrentSearch] = useState("")

    const [students, setStudents] = useState([])
    const [studentsNumPages, setStudentsNumPages] = useState(0)

    const handlePageClick = (newPage) => {
        setCurrentPage(newPage)        
    }

    const handleSearchSubmit = (value) => {
        setCurrentSearch(value)
        
    }

    const handleStudentOnClick = (activeStudent) => {        
        
        alert("redirect to student")
        // updates localStorage with the courseid that was selected    
        localStorage.activeStudent = activeStudent.studentid
            
    }

    const handleSelection = (e) => {
        alert("create new student")
     }

    const headers = [{ key: "firstname", header: "שם" }, { key: "lastname", header: "שם משפחה" }, { key: "email", header: "אימייל" }];
    const options = ["הוסף סטודנט"];

    // go to server ------------------------------------------- 
     
    useEffect(() => {       
        
        const activeCourseId = localStorage.activeCourse
       
        const data = {courseid: activeCourseId, page: currentPage, search: currentSearch, roleid: roleId };
        //const data = {courseid: "59", page: 0, search: "", roleid: 1 };
        server(activeUser, data, "GetCourseEnrollmentProfiles").then(res => {
            if (res.data.error) {
                alert("error in course");
            } else {
                
                const studentsToDisplay = res.data.enrolled

                setStudents(studentsToDisplay)     
                setStudentsNumPages(res.data.pages)                                    
                                             
            }
        }, err => {
            console.error(err);
        })            
        

    }, [currentPage,currentSearch])
    
    //-----------------------------------------------------------

    return (
        <div className="c-tab-type-c">
            <PortalSearchPager currentPage={currentPage} pages={studentsNumPages} pHolder={"חיפוש חניך"} 
                onPageChange={handlePageClick} onSearchSubmit={handleSearchSubmit} />

            <PortalTable keyName={"userid"} headers={headers} data={students} handleClick={handleStudentOnClick}/>
            <UsersButtonSetComp btnNames={options} handleClick={handleSelection}/>
    
               
        </div>

    )
};


export default TabTypeC;
