import React, { useState } from "react";
import "./PortalSearchPager.css";
import arrow from "../../assets/images/arrow_down.svg";
import arrowdim from "../../assets/images/arrow_dim.svg";

const PortalSearchPager = (props) => {
  const [page, setPage] = useState(props.onPage);
  var pageC;

  function handleClick(dir) {
    pageC = page;
    pageC = pageC + dir;
    if ((pageC > props.pages || pageC < 1)) {
      pageC = pageC - dir;
    };
    setPage(pageC);
    // props.onPageChange(pageC);
    console.log(page);
  }

  var backIsOn = (page == 1) ? false : true;
  var fwdIsOn = (page == props.pages) ? false : true;
  var numPos = (page > 9) ? "20px" : "25px";

  return (
    <div className="pspBox">
      <div className="search">
        <input placeholder={props.pHolder}></input>
      </div>
      <div className="pager">

        <img src={backIsOn ? arrow : arrowdim} className="buttons" onClick={() => handleClick(-1)}></img>
        <span style={{ right: numPos }} id="pagerNum">{page}</span>
        <img src={fwdIsOn ? arrow : arrowdim} className="buttons" onClick={() => handleClick(1)}></img>
      </div>
    </div>
  );
};
{/* <PortalSearchPager onPage={Current page on render} pages={The total number of pages} pHolder={"חיפוש משתמשים"} onPageChange={a Function In Parent}/> put into parent/ } */ }

export default PortalSearchPager;
