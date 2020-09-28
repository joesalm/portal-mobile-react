import React, { useContext, useEffect } from 'react';
import './users.css'
import PortalNavbar from '../../components/navbar/PortalNavbar';
import ActiveUserContext from '../../shared/activeUserContext'
import { Redirect, useParams } from 'react-router-dom'
import server from '../../shared/server';

const UserDetailsPage = (props) => {
    const { handleLogout } = props;
    const activeUser = useContext(ActiveUserContext);
    let { id } = useParams();
    const callData = {
        userId: id,
    }
    useEffect(() => {
        server(activeUser, callData, "GetUserProfileById").then(res => {
            console.log(res);
        })
    },
        []);

    if (!activeUser) {
        return <Redirect to='/' />
    }
    return (
        <div className="p-user-details">
            <PortalNavbar handleLogout={handleLogout} />
            <h1>פרטי משתמש</h1>
            <h1>{id}</h1>
        </div>
    );
}

export default UserDetailsPage;