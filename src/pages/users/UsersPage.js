import React, { useContext, useState } from 'react';
import './users.css'
import PortalNavbar from '../../components/navbar/PortalNavbar';
import ActiveUserContext from '../../shared/activeUserContext'
import { Redirect } from 'react-router-dom'
import PortalSearchPager from '../../components/PortalSearchPager/PortalSearchPager';

const UsersPage = (props) => {
    const { handleLogout } = props;
    const activeUser = useContext(ActiveUserContext);
    const [onPage, setOnPage] = useState(1)
    if (!activeUser) {
        return <Redirect to='/' />
    }
    const handlePageChange = (newPage) => {
        setOnPage(newPage)
    }

    const handelSearchSubmit = (value) => {
        alert('A search was submitted: ' + value);
    }
    return (
        <div className="p-users">
            {/* <PortalNavbar handleLogout={handleLogout} /> */}
            <h1>משתמשים</h1>
            <PortalSearchPager onPage={onPage} pages={25} pHolder={"חיפוש משתמשים"} onPageChange={handlePageChange} onSearchSubmit={handelSearchSubmit} />
        </div>
    );
}

export default UsersPage;