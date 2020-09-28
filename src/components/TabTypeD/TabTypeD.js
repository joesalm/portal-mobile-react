import React, { useContext,useState,useEffect } from 'react';
import ActiveUserContext from '../../shared/activeUserContext'

import PropTypes from 'prop-types';
import "./TabTypeD.css"
import PortalSearchPager from '../../components/PortalSearchPager/PortalSearchPager';
import PortalTable from '../../components/PortalTable/PortalTable';
import server from '../../shared/server'

const TabTypeD = () => {


    const activeUser = useContext(ActiveUserContext);

    const [currentPage, setCurrentPage] = useState(1)
    const [currentSearch, setCurrentSearch] = useState("")

    const [students, setStudents] = useState([])
    const [studentsNumPages, setStudentsNumPages] = useState(0)

    const handlePageClick = (newPage) => {
        setCurrentPage(newPage)        
    }

    const handleSearchSubmit = (value) => {
        setCurrentSearch(value)
        
    }

    const handleTeacherOnClick = (activeTeacher) => {        
        
        alert("redirect to teacher")
        // updates localStorage with the courseid that was selected    
        localStorage.activeTeacher = activeTeacher.teacherid
            
            
    }


    const headers = [{ key: "fname", header: "שם" }, { key: "lname", header: "שם משפחה" }, { key: "email", header: "אימייל" }];

    // go to server ------------------------------------------- 
     
    useEffect(() => {     
        
       
        const data = {search: currentSearch, sorting: "courseid", desc:false, page: currentPage};
        server(activeUser, data, "SearchTeachers").then(res => {
            if (res.data.error) {
                alert("error in course");
            } else {
                
                const studentsToDisplay = res

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
            <PortalSearchPager currentPage={currentPage} pages={studentsNumPages} pHolder={"חיפוש מדריך"} 
                onPageChange={handlePageClick} onSearchSubmit={handleSearchSubmit} />

            <PortalTable headers={headers} data={students} handleClick={handleTeacherOnClick}/>
            
               
        </div>

    )
};


export default TabTypeD;
