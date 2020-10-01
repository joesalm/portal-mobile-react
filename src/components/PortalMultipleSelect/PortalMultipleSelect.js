import "./PortalMultipleSelect.css";
import React, { Component, useState } from 'react';
import plusSign from "../../assets/images/plus.svg";
import x from "../../assets/images/X.svg";
import { Container } from "react-bootstrap";

const PortalMultipleSelect = (props) => {
    const { title, optionsList, callSelected } = props;
    const [showDrop, setShowDrop] = useState(false);
    let newOptions = optionsList.slice();
    let checkOptions = false;
    for (let i = 0; i < newOptions.length; i++) { if (!optionsList[i].select) { checkOptions = true } };
    let selectedViewC = [];

    const handlePlusClick = () => {
        if (checkOptions) { setShowDrop(!showDrop) };
    }

    const handleOptionClick = (i) => {
        setShowDrop(false);
        newOptions[i].select = true;
        callSelected(newOptions, newOptions[i], true);
    }

    const handleDelete = (i) => {
        newOptions[i].select = false;
        callSelected(newOptions, newOptions[i], true);
    }

    let dropContent = [];
    for (let i = 0; i < newOptions.length; i++) {
        if (!newOptions[i].select) {
            dropContent.push(<li key={i} onClick={() => handleOptionClick(i)}>{newOptions[i].option}</li>)
        }
    };

    for (let i = 0; i < newOptions.length; i++) {
        if (newOptions[i].select) {
            selectedViewC.push(<div className="selItem" key={i} >{newOptions[i].option}{" "}<img className="x" src={x} onClick={() => handleDelete(i)} /></div>)
        }
    };
    console.log(newOptions);

    return (
        <Container>
            <div className="p-multi-select">
                <h6>{title}</h6>

                <div className="flexShow">
                    <img className="plus" src={plusSign} onClick={handlePlusClick} />
                    {showDrop ? <ul className="dropDown">{dropContent}</ul> : null}
                    {selectedViewC}
                </div>
            </div>
        </Container>
    );
}


export default PortalMultipleSelect;