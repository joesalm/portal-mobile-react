import React, { useContext } from 'react';
import './courses.css'
import PortalNavbar from '../../components/navbar/PortalNavbar';
import ActiveUserContext from '../../shared/activeUserContext'
import { Redirect } from 'react-router-dom'
import PortalMonthPicker from '../../components/PortalMonthPicker/PortalMonthPicker';
import PortalDatePicker from '../../components/PortalDatePicker/PortalDatePicker';

const CoursesPage = (props) => {
    const { handleLogout } = props;
    const activeUser = useContext(ActiveUserContext);
    
    if (!activeUser) {
        return <Redirect to='/' />
    }

    // const onDateChange = (y, m, d) => {
    //  console.log(y, m, d);
    // }

    // const onMonthChange = (y, m) => {
    //     console.log(y, m);
    // }


    return (
        <div className="p-courses">
            {/* <PortalNavbar handleLogout={handleLogout}/> */}
            {/* <PortalMonthPicker handleMonthSelection={onMonthChange} />
            <PortalDatePicker dateInit={new Date()} handleDateSelection={onDateChange}/> */}
            <h1>קורסים</h1>
        </div>
    );
}

export default CoursesPage;