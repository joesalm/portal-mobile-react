import React, { useContext, useEffect, useState } from 'react';
import './UserDetails.css'
import PortalNavbar from '../../components/navbar/PortalNavbar';
import ActiveUserContext from '../../shared/activeUserContext'
import { Redirect, useParams } from 'react-router-dom'
import server from '../../shared/server';
import arrow from "../../assets/images/arrowback.svg";
import { Col, Container, Row } from 'react-bootstrap';
import BackArrowIcon from "../../assets/images/noun_back_arrow.svg";
import SaveIcon from "../../assets/images/noun_save.svg";
import CopyIcon from "../../assets/images/noun_copy.svg";


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
            setShowUser(res.data.profile);
            // console.log(res.data.profile);
        })
    },
        []);

    if (!activeUser) {
        return <Redirect to='/' />
    }
    console.log(showUser.firstname);

    return (
        <div className="p-user-details">
            <PortalNavbar handleLogout={handleLogout} />
            <Container>
                <Row className="header">
                    <Col className="col-sm-2">
                        <h3>{showUser.firstname}</h3>
                        <h3>{showUser.lastname}</h3>
                    </Col>

                    <Col className="icons col-sm-9">
                        <img src={SaveIcon}></img>
                        <img src={BackArrowIcon}></img>
                        <img src={CopyIcon}></img>
                    </Col>
                </Row>
            </Container>

            <h1>{id}</h1>
        </div>
    );
}

export default UserDetailsPage;