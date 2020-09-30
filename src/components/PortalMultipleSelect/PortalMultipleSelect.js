import "./PortalMultipleSelect.css";
import React, { Component, useState } from 'react';
import plusSign from "../../assets/images/plus.svg";
import x from "../../assets/images/X.svg";
import { Container } from "react-bootstrap";

const PortalMultipleSelect = (props) => {
    const { title, optionsList, callSelected } = props;
    const [selected, setSelected] = useState([]);
    const [selectedView, setSelectedView] = useState([]);
    const [showDrop, setShowDrop] = useState(false);
    let newOptions = optionsList;
    let selectedViewC = [];

    const handlePlusClick = () => {
        if (newOptions.length !== 0) {
            setShowDrop(!showDrop);
        }
    }

    const handleOptionClick = (i) => {
        setShowDrop(false);
        let newSelect = selected;
        newSelect.push(newOptions[i]);
        setSelected(newSelect);
        callSelected(selected, newOptions[i], true);
        newOptions.splice(i, 1);
    }

    const handleDelete = (i) => {
        console.log("Delete", selected[i]);
        let newSelect = selected;
        newOptions.push(selected[i]);
        let currentItem = selected[i];
        newSelect.splice(i, 1);
        setSelected(newSelect);
        callSelected(selected, currentItem, false);
        setSelectedView(selectedViewC);
    }

    let dropContent = [];
    for (let i = 0; i < newOptions.length; i++) {
        dropContent.push(<li key={i} onClick={() => handleOptionClick(i)}>{newOptions[i]}</li>)
    }

    for (let i = 0; i < selected.length; i++) {
        selectedViewC.push(<div key={i} >{selected[i]}<img src={x} onClick={() => handleDelete(i)} /></div>)
    };
    console.log(newOptions);

    return (
        <Container>
            <div className="p-multi-select">
                <h6>{title}</h6>

                <div>
                    <img className="plus" src={plusSign} onClick={handlePlusClick} />
                    {showDrop ? <ul className="dropDown">{dropContent}</ul> : null}
                    {selectedViewC}
                </div>
            </div>
        </Container>
    );
}


export default PortalMultipleSelect;