import React, { useContext, useEffect, useState } from 'react';
import './UserDetails.css'
import PortalNavbar from '../../components/navbar/PortalNavbar';
import ActiveUserContext from '../../shared/activeUserContext'
import { Redirect, useParams } from 'react-router-dom'
import server from '../../shared/server';
import arrow from "../../assets/images/arrowback.svg";
import { Container } from 'react-bootstrap';


const UserDetailsPage = (props) => {
    const { handleLogout } = props;
    const activeUser = useContext(ActiveUserContext);
    const [showUser, setShowUser] = useState({});
    let { id } = useParams();
    const callData = {
        userId: id,
    }

    useEffect(() => {
        server(activeUser, callData, "GetUserProfileById").then(res => {
            setShowUser(res);
            console.log(res);
        })
    },
        []);

    if (!activeUser) {
        return <Redirect to='/' />
    }
    return (
        <div className="p-user-details">
            {/* <PortalNavbar handleLogout={handleLogout} /> */}
            <Container className="topBackNav">
                <img className="backArrow"
                    alt="U"
                    src={arrow}
                ></img>
                <h6 className="navTitle">עובדים</h6>
            </Container>
            <h1>{id}</h1>
            <img className="backArrow"
                alt="U"
                src={arrow}
            ></img>
        </div>
    );
}

export default UserDetailsPage;