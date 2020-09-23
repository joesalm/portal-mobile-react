import React from 'react';
// import React, { useState } from 'react';
import './navbar.css';
import appleseedsLogo from '../../assets/images/logo.png';
import ProfileIcon from '../../assets/images/profile_icon.svg';

const PortalNavbar = (props) => {
    const { handleLogout } = props;

    return (

        <div className="c-navbar">
            <div className="sidebar-open">
                {/* <div className="sidebar-background" onClick={closeSidebar}></div> */}
                <div className="sidebar-background"></div>
                <div className="sidebar-wrap">
                    <div className="sidebar">
                        <div className="sidebar-header">

                            <img className="appleseeds-logo" src={appleseedsLogo} alt="appleseeds-logo"></img>
                        </div>
                        <div className="profile-preview">
                            <img className="profile-image" src={ProfileIcon} alt="profile-icon"></img>
                            {/* <img className="profile-image" onClick={profileClick} src="images/profile_icon.svg"></img> */}
                            <div className="name-wrap">
                                <span className="user-name">
                                    אלמוני פלוני
                            </span>
                            </div>
                        </div>
                        <div className="sidebar-options">
                            <div className="menu-information" >
                                משתמשים
                    </div>
                            <div className="menu-information" >
                                קורסים
                    </div>
                            <div className="menu-information" >
                                דיווח שעות
                    </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default PortalNavbar;