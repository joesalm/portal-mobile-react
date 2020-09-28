import React, { useContext,useState,useEffect } from 'react';
import './courses.css'
import PortalNavbar from '../../components/navbar/PortalNavbar';
import PortalTable from '../../components/PortalTable/PortalTable';
import PortalSearchPager from '../../components/PortalSearchPager/PortalSearchPager';
import UsersButtonSetComp from '../../components/usersButtonSetComp/UsersButtonSetComp';

import ActiveUserContext from '../../shared/activeUserContext'

import { Redirect } from 'react-router-dom'
import server from '../../shared/server'



const CoursesPage = (props) => {

    const { handleLogout } = props;
      
    const activeUser = useContext(ActiveUserContext);
    const [currentPage, setCurrentPage] = useState(0)
    const [currentSearch, setCurrentSearch] = useState("")
    const [coursesStatus, setCoursesStatus] = useState("1")

    const [courseRedirect, setCourseRedirect] = useState("") 


    const [courses, setCourses] = useState([])
    const [coursesNumPages, setCoursesNumPages] = useState(0)

    
    const handlePageClick = (newPage) => {
        setCurrentPage(newPage)        
    }

    const handleSearchSubmit = (value) => {
        setCurrentSearch(value)
        
    }

    const handleCourseOnClick = (activeCourse) => {        
        
        setCourseRedirect(activeCourse.courseid)
        
        // updates localStorage with the courseid that was selected    
        localStorage.activeCourse = activeCourse.courseid
            
    }

    const handleSelection = (e) => {

       const selected = (e===0) ? 1 : 0;
         setCoursesStatus(selected)
    }
    
    // props
    const headers = [{ key: "subname", header: "שם קורס מקוצר" }, { key: "project", header: "שם פרוייקט" }, { key: "teachers", header: "מדריך" }];
    //const options = [{ index: 1, value: "קורסים פעילים" },{ index: 0, value: " לא פעילים" }];
    const options = ["קורסים פעילים" , "לא פעילים"];
    
    

    // go to server --------------------------------
   
    useEffect(() => {
        
        const data = {search: currentSearch, sorting: "courseid", desc:false, coursestatus: coursesStatus, page: currentPage};
        server(activeUser, data, "SearchCourses").then(res => {
            if (res.data.error) {
                alert("error in courses");
            } else {
                
                const coursesToDisplay = res.data.courses
                setCourses(coursesToDisplay)
                setCoursesNumPages(res.data.pages) 
                console.log(res.data)                               
            }
        }, err => {
            console.error(err);
        })            
        

    }, [currentPage,currentSearch,coursesStatus]) 
	
    
    //---------------------------------------------------

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
                <p>קורסים</p>
                
                <div className="p-search-bar">
                    <PortalSearchPager currentPage={currentPage} pages={coursesNumPages} pHolder={"חיפוש קורסים"} 
                    onPageChange={handlePageClick} onSearchSubmit={handleSearchSubmit} />
                </div>

                <PortalTable headers={headers} data={courses} handleClick={handleCourseOnClick}/>
            
                <UsersButtonSetComp btnNames={options} handleClick={handleSelection}/>
            
            
        </div>
    );
}

export default CoursesPage;