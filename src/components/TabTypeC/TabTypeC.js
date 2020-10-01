
import React, { useContext,useState,useEffect } from 'react';
import ActiveUserContext from '../../shared/activeUserContext'

import PropTypes from 'prop-types';
import "./TabTypeC.css"
import PortalSearchPager from '../../components/PortalSearchPager/PortalSearchPager';
import PortalTable from '../../components/PortalTable/PortalTable';
import UsersButtonSetComp from '../../components/usersButtonSetComp/UsersButtonSetComp';
import server from '../../shared/server'




const TabTypeC = (props) => {
   
    // props:
    // roleId: 1 - for studentes, 2 - for teachers
    // placeHolderSearch: placeholder title on search bar
    // addRoleObject: button for adding another role object (optional)
    const { roleId,placeHolderSearch,addRoleObject } = props

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
    const options = [addRoleObject];

    // go to server ------------------------------------------- 
     
    useEffect(() => {       
        
        const activeCourseId = localStorage.activeCourse
       
        const data = {courseid: activeCourseId, page: currentPage, search: currentSearch, roleid: roleId };

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
        

    }, [roleId,currentPage,currentSearch])
    
    //-----------------------------------------------------------

    return (
        <div className="c-tab-type-c">
            <div className="search">
                <PortalSearchPager currentPage={currentPage} pages={studentsNumPages} pHolder={placeHolderSearch} 
                onPageChange={handlePageClick} onSearchSubmit={handleSearchSubmit} />
            </div>    
            <div className="table">
            <PortalTable keyName={"userid"} headers={headers} data={students} handleClick={handleStudentOnClick}/>
            </div>
            <UsersButtonSetComp btnNames={options} handleClick={handleSelection}/>
            
    
               
        </div>

    )
};

TabTypeC.propTypes = {
    roleId: PropTypes.string,
    placeHolderSearch: PropTypes.string,
    addRoleObject: PropTypes.string
};

export default TabTypeC;
