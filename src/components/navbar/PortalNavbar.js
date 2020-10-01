import React, { Component } from "react";
// import React, { useState } from 'react';
import "./navbar.css";
import appleseedsLogo from "../../assets/images/logo.png";
import ProfileIcon from "../../assets/images/profile_icon.svg";
import UsersIcon from "../../assets/images/users_icon.svg";
import CoursesIcon from "../../assets/images/courses_icon.svg";
import DisconnestIcon from "../../assets/images/disconnect_icon.svg";
// import ReportHoursIcon from "../../assets/images/report-hours.svg";
import ApprovementIcon from "../../assets/images/report-hours.svg";
import ReportHoursIcon from "../../assets/images/approvement_icon.svg";

class PortalNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.openSidebar = this.openSidebar.bind(this);
  }
  openSidebar() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <div className="c-navbar">
        {/* <nav className="aboveHamburger"> */}
          <div className="hamburger" onClick={this.openSidebar}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        {/* </nav> */}

        <div className={this.state.isOpen ? "sidebar-open" : null}>
          <div className="sidebar-background" onClick={this.openSidebar}></div>
          {/* <div className="sidebar-background"></div> */}
          <div className="sidebar-wrap">
            <div className="sidebar">
              <div className="sidebar-header">
                <span className="x-span" onClick={this.openSidebar}>
                  &#215;
                </span>
                <img
                  className="appleseeds-logo"
                  src={appleseedsLogo}
                  alt="appleseeds-logo"
                ></img>
              </div>

              <div className="profile-preview">
                <img
                  className="profile-image"
                  src={ProfileIcon}
                  alt="profile-icon"
                ></img>
              
                <div className="name-wrap">
                  <span className="user-name">אלמוני פלוני</span>
                </div>
              </div>

    {/* ////Links to sections */}
              <div className="sidebar-options">

                <a className="menu-item" href="#/users" >
                  
                  <img
                    className="icon"
                    src={UsersIcon}
                    alt="icon"
                  ></img>
                  <span className="menu-information" >משתמשים</span>
                  </a>

              <a className="menu-item"  href="#/courses">
                <img
                    className="icon"
                    src={CoursesIcon}
                    alt="courses-icon"  
                  >
                </img>
                <span className="menu-information">קורסים</span>
                </a> 

                <a className="menu-item"  href="#/hours-report">
                <img
                    className="icon"
                    src={ReportHoursIcon}
                    alt="ReportHoursIcon"
                  >
                </img>
                <span className="menu-information"> דיווח שעות</span>
                </a>

                <a className="menu-item" href="#/hours-approve">
                <img
                    className="icon"
                    src={ApprovementIcon}
                    alt="ApprovementIcon"
                  ></img>
                <span className="menu-information"> אישור שעות</span>
                </a>

                <a className = "menu-item" onClick={this.props.handleLogout}>
                <img
                    className="icon"
                    src={DisconnestIcon}
                    alt="DisconnestIcon"
                  ></img>
                <span className="menu-information last" >התנתקות</span> 
                </a>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PortalNavbar;
