import "./PortalMultipleSelect.css";
import React, { Component, useState } from 'react';
import plusSign from "../../assets/images/plus.svg";
import { Container } from "react-bootstrap";

const PortalMultipleSelect = (props) => {
    const { title, optionsList, callSelected } = props;
    const [selected, setSelected] = useState([]);
    const [showDrop, setShowDrop] = useState(false);

    let newOptions = optionsList;

    const handlePlusClick = () => {
        setShowDrop(true)
    }
    const handleOptionClick = (i) => {
        setShowDrop(false);
        const newSelect = selected;
        newSelect.push(newOptions[i])
        newOptions.splice(i, 1);
        setSelected(newSelect);
    }

    let dropContent = [];
    for (let i = 0; i < optionsList.length; i++) {
        dropContent.push(<li key={i} onClick={() => handleOptionClick(i)}>{newOptions[i]}</li>)
    }
    console.log(selected);
    return (
        <Container>
            <div className="p-multi-select">
                <h6>{title}</h6>
                <div>
                    <img src={plusSign} onClick={handlePlusClick} />
                    <ul className="dropDown">{showDrop ? dropContent : ""}</ul>
                </div>
            </div>
        </Container>
    );
}


export default PortalMultipleSelect;