import React, { useState } from "react";
import "./PortalSearchPager.css";
import arrow from "../../assets/images/arrow_down.svg";
import arrowdim from "../../assets/images/arrow_dim.svg";
/*This is the Portal Search Pager stateless component.
Props are:
  onPage - number = The current page on render
  onPageChange - function => The function to call when page number is changed. Parent recieves the new page number in the call.
  pages - number = How many total pages. Pager only renders if >1
  pHolder - string = Place Holder 
  onSearchSubmit  - function => The function to call when a value is entered in the search.
Parent must manage page State

*/
const PortalSearchPager = (props) => {

  const { onPage, onPageChange, pages, pHolder, onSearchSubmit } = props;

  const handleClick = (dir) => {
    let newPage = onPage + dir;
    if (!(newPage > pages || newPage < 1)) {
      onPageChange(newPage);
    };
    console.log("in function: " + onPage);
  }
  console.log("out in App: " + onPage);

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



  const input = React.createRef();


  function handleSubmit() {
    if (input.current.value !== "") { onSearchSubmit(input.current.value); }
  }



  return (
    <div className="pspBox">
      <div className="search">
        <form className="searchForm" onSubmit={handleSubmit}>
          <input placeholder={pHolder} type="text" ref={input} />
        </form>
      </div>
      {showPager}
    </div>
  );
};
{/* <PortalSearchPager onPage={Current page on render} pages={The total number of pages} pHolder={"חיפוש משתמשים"} ononPagehange={a Function In Parent}/> put into parent/ } */ }

export default PortalSearchPager;
