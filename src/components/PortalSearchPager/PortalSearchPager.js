import React, { useState } from "react";
import "./PortalSearchPager.css";
import arrow from "../../assets/images/arrow_down.svg";
import arrowdim from "../../assets/images/arrow_dim.svg";

const PortalSearchPager = (props) => {

  const { onPage, onPageChange, pages, pHolder } = props;

  function handleClick(dir) {
    let newPage = onPage + dir;
    if ((newPage > pages || newPage < 1)) {
      newPage = newPage - dir;
    } else { onPageChange(newPage); };
    // 
    console.log(onPage);
  }

  const backIsOn = (onPage == 1) ? false : true;
  const fwdIsOn = (onPage == pages) ? false : true;
  const numPos = (onPage > 9) ? "20px" : "25px";
  let showPager = null;
  if (pages > 1) {
    showPager = <div className="pager">
      <img src={backIsOn ? arrow : arrowdim} className="buttons" onClick={() => handleClick(-1)}></img>
      <span style={{ right: numPos }} id="pagerNum">{onPage}</span>
      <img src={fwdIsOn ? arrow : arrowdim} className="buttons" onClick={() => handleClick(1)}></img>
    </div>
  }

  return (
    <div className="pspBox">
      <div className="search">
        <input placeholder={pHolder}></input>
      </div>
      {showPager}
    </div>
  );
};
{/* <PortalSearchPager onPage={Current page on render} pages={The total number of pages} pHolder={"חיפוש משתמשים"} ononPagehange={a Function In Parent}/> put into parent/ } */ }

export default PortalSearchPager;
