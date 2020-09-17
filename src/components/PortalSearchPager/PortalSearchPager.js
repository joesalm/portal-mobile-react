import React from "react";
import "./PortalSearchPager.css";
import arrow from "../../assets/images/arrow_down.svg";

const PortalSearchPager = (props) => {
  return (
    <div className="portalBox">
      <div className="search">
        <input placeholder={"חיפוש קורס"}></input>
      </div>
      <div className="pager">
        <img src={arrow} className="buttons"></img>
        <span>#</span>
        <img src={arrow} className="buttons"></img>
      </div>
    </div>
  );
};

export default PortalSearchPager;
