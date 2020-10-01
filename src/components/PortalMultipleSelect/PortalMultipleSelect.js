import "./PortalMultipleSelect.css";
import React, { Component, useState } from 'react';
import plusSign from "../../assets/images/plus.svg";
import x from "../../assets/images/X.svg";
import { Container } from "react-bootstrap";

const PortalMultipleSelect = (props) => {
    const { title, optionsList, callSelected } = props;
    const [showDrop, setShowDrop] = useState(false);
    let checkOptions = false;
    for (let i = 0; i < optionsList.length; i++) { if (!optionsList[i].select) { checkOptions = true } };
    let selectedViewC = [];

    const handlePlusClick = () => {
        if (checkOptions) { setShowDrop(!showDrop) };
    }

    const handleOptionClick = (i) => {
        let newOptions = optionsList.slice();
        setShowDrop(false);
        newOptions[i].select = true;
        callSelected(newOptions, newOptions[i], true);
    }

    const handleDelete = (i) => {
        let newOptions = optionsList.slice();
        newOptions[i].select = false;
        callSelected(newOptions, newOptions[i], true);
    }

    let dropContent = [];
    for (let i = 0; i < optionsList.length; i++) {
        if (!optionsList[i].select) {
            dropContent.push(<li key={i} onClick={() => handleOptionClick(i)}>{optionsList[i].option}</li>)
        }
    };


    for (let i = 0; i < optionsList.length; i++) {

        if (optionsList[i].select) {
            selectedViewC.push(<div className="selItem" key={i} >{optionsList[i].option}{" "}<img className="x" src={x} onClick={() => handleDelete(i)} /></div>)
        }
    };
    console.log(optionsList);

    return (
        <div className="p-multi-select">
            <h6>{title}</h6>
            <div className="flexShow">
                <img className="plus" src={plusSign} onClick={handlePlusClick} />
                {showDrop ? <ul className="dropDown">{dropContent}</ul> : null}
                {selectedViewC}
            </div>
        </div>
    );
}


export default PortalMultipleSelect;

// put in parent:
// const [optionsList, setOptionsList] = useState([{
//     option: "גלידה",
//     optionLabel: "1",
//     select: false,
//   }, {
//     option: "פנקייק",
//     optionLabel: "2",
//     select: false,
//   }, {
//     option: "צ'יפס",
//     optionLabel: "3",
//     select: false,
//   }, {
//     option: "שוקולד",
//     optionLabel: "4",
//     select: false,
//   }, {
//     option: "ופל בלגי",
//     optionLabel: "5",
//     select: false,
//   }, {
//     option: "שניצל",
//     optionLabel: "6",
//     select: false,
//   }, {
//     option: "קטשופ",
//     optionLabel: "7",
//     select: false,
//   }, {
//     option: "תפוצ'יפס",
//     optionLabel: "8",
//     select: false,
//   }, {
//     option: "וזהו",
//     optionLabel: "9",
//     select: false,
//   }
//   ]);

// const title = "ארוחת בקר";

//   const handleSelectedChange = (selectedItems, currentItem, addOrErase) => {
//     console.log(selectedItems, currentItem, addOrErase);
//     setOptionsList(selectedItems)
//   }