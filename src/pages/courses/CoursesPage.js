import React, { useContext,useState,useEffect } from 'react';
import './courses.css'
import PortalNavbar from '../../components/navbar/PortalNavbar';
import PortalTable from '../../components/PortalTable/PortalTable';
import PortalSearchPager from '../../components/PortalSearchPager/PortalSearchPager';

import ActiveUserContext from '../../shared/activeUserContext'
import { Redirect } from 'react-router-dom'
import server from '../../shared/server'



const CoursesPage = (props) => {

    const { handleLogout } = props;
    const activeUser = useContext(ActiveUserContext);
    const [currentPage, setCurrentPage] = useState(1)
    const [currentSearch, setCurrentSearch] = useState("")

    const [courseRedirect, setCourseRedirect] = useState("") 


    const [courses, setCourses] = useState([])

    
    const handlePageClick = (newPage) => {
        setCurrentPage(newPage)        
    }

    const handleSearchSubmit = (value) => {
        setCurrentSearch(value)
        console.log(currentSearch)
    }

    const handleCourseOnClick = (e) => {        
        console.log(e.courseid)
        setCourseRedirect(e.courseid)
              
    }
    
    // hard coded headers
    const headers = [{ key: "subname", header: "שם קורס מקוצר" }, { key: "project", header: "שם פרוייקט" }, { key: "teachers", header: "מדריך" }];
     
    // go to server --------------------------------

   
    useEffect(() => {
        
        const data = {search: currentSearch, sorting: "courseid", desc:false, coursestatus: 1, page: currentPage};
        server(activeUser, data, "SearchCourses").then(res => {
            if (res.data.error) {
                alert("error in courses");
            } else {

                const coursesToDisplay = res.data.courses
                setCourses(coursesToDisplay) 
                               
            }
        }, err => {
            console.error(err);
        })            
        

    }, [currentPage,currentSearch]) 
	
	
    
    //----------------------------------------

    if (!activeUser) {
        return <Redirect to='/' />
    }

    // when clicking on spesific course
    if (courseRedirect !== "") {
        return <Redirect to={`/courses/:${courseRedirect}`} />
       
    } 
    
 

    return (
        <div className="p-courses">
            <PortalNavbar handleLogout={handleLogout}/>
            <h1>קורסים</h1>

            <div className="p-search-bar">
                <PortalSearchPager currentPage={currentPage} pages={25} pHolder={"חיפוש קורסים"} 
                onPageChange={handlePageClick} onSearchSubmit={handleSearchSubmit} />
            </div>

            <PortalTable headers={headers} data={courses} handleClick={handleCourseOnClick}/>
            
        </div>
    );
}

export default CoursesPage;