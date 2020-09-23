import React, { useContext } from 'react';
import './courses.css'
import PortalNavbar from '../../components/navbar/PortalNavbar';
import ActiveUserContext from '../../shared/activeUserContext'
import { Redirect } from 'react-router-dom'
import PortalMonthPicker from '../../components/PortalMonthPicker/PortalMonthPicker';

const CoursesPage = (props) => {
    const { handleLogout } = props;
    const activeUser = useContext(ActiveUserContext);
    
    if (!activeUser) {
        return <Redirect to='/' />
    }

    return (
        <div className="p-courses">
            {/* <PortalNavbar handleLogout={handleLogout}/> */}
            <PortalMonthPicker />
            <h1>קורסים</h1>
        </div>
    );
}

export default CoursesPage;