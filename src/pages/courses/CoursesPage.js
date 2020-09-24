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
    const [onPage, setOnPage] = useState(1)

    const [courses, setCourses] = useState([])

    
    const handlePageClick = (newPage) => {
        setOnPage(newPage)        
    }

    const handleUserClick = (e) => {
        alert(e)        
    }
    
    // hard coded headers
    const headers = [{ key: "courseid", header: "שם קורס מקוצר" }, { key: "project", header: "שם פרוייקט" }, { key: "teachers", header: "מדריך" }];
    //const data = [{ id: "12212", fname: "Front-End", lname: "React", email: "ניר חנס" }, { id: "2212", fname: "Back-End", lname: "PHP", email: "ג'ון דו" }]
    const data = courses
    
    // go to server --------------------------------

   
    useEffect(() => {
        
        const data = {'search': "", 'sorting': "courseid", 'desc':false, 'coursestatus': 1, 'page': onPage};
        server(activeUser, data, "SearchCourses").then(res => {
            if (res.data.error) {
                alert("error in courses");
            } else {
                console.log(res.data.courses);
                setOnPage(onPage)
                setCourses(res.data.courses)                
            }
        }, err => {
            console.error(err);
        })            
        

    }, [onPage]) 
	
	
    
    //----------------------------------------
    
    if (!activeUser) {
        return <Redirect to='/' />
    }

    return (
        <div className="p-courses">
            {/* <PortalNavbar handleLogout={handleLogout}/> */}
            <h1>קורסים</h1>

            <div className="p-search-bar">
                <PortalSearchPager onPage={onPage} pages={25} pHolder={"חיפוש קןרסים"} onPageChange={handlePageClick} />
            </div>

            <PortalTable key={data.id} headers={headers} data={courses} handleClick={handleUserClick}/>
            
        </div>
    );
}

export default CoursesPage;