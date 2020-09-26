import React, { useContext } from 'react';
import './courses.css'
import PortalNavbar from '../../components/navbar/PortalNavbar';
import ActiveUserContext from '../../shared/activeUserContext'
import { Redirect } from 'react-router-dom'
import PortalTabView from '../../components/PortalTabView/PortalTabView';


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
            <PortalTabView options={options} handleSelection={handleSelection}/>

        </div>
    );
}

export default CourseDetailsPage;