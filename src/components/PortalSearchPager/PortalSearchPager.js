import React, { useState } from "react";
import "./PortalSearchPager.css";
import arrow from "../../assets/images/arrow_down.svg";
import arrowdim from "../../assets/images/arrow_dim.svg";

/*This is the Portal Search Pager stateless component.
Props are:
      onPage - number = The current page to render
      onPageChange - function => To call when page number is changed. Parent recieves the new page number in the call.
      pages - number = The total number of pages. Pager only renders if it is larger than >1
      pHolder - string = Place Holder 
      onSearchSubmit  - function => To call when a value is entered in the search.
Parent must manage the current page State
Rendring example:
    <PortalSearchPager onPage={onPage} pages={pages} pHolder={"חיפוש משתמשים"} onPageChange={handlePageChange} onSearchSubmit={handelSearchSubmit} />
 */

const PortalSearchPager = (props) => {
  const { onPage, onPageChange, pages, pHolder, onSearchSubmit } = props;

  const handleClick = (dir) => {
    let newPage = onPage + dir;
    if (!(newPage > pages || newPage < 1)) {
      onPageChange(newPage);
    }
  };

  const backSrc = onPage == 1 ? arrowdim : arrow;
  const fwdSrc = onPage == pages ? arrowdim : arrow;
  let showPager = null;
  if (pages > 1) {
    showPager = (
      <div className="pager">
        <img
          src={backSrc}
          className="buttons"
          onClick={() => handleClick(-1)}
        ></img>
        <span id="pagerNum">{onPage}</span>
        <img
          src={fwdSrc}
          className="buttons"
          onClick={() => handleClick(1)}
        ></img>
      </div>
    );
  }

  const input = React.createRef();

  function handleSubmit() {
    const value = input.current.value;
    if (value !== "") {
      onSearchSubmit(value);
    }
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

export default PortalSearchPager;
