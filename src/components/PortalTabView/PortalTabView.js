import React, { useState } from 'react';
import PropTypes from 'prop-types';
import "./PortalTabView.css"


const PortalTabView = (props) => {

   

    const { options, handleTabSelection } = props

    const [selectedTab, setSelectedTab] = useState("0")

    const onSelection = (e) => {
        handleTabSelection(e.target.value);
        setSelectedTab(e.target.value) 
        console.log(e.target.value)  
    }

    const optionToDisplay = options.map(option => (option.key===selectedTab) ?
        <button className="selected" onClick={onSelection} key={option.key} value={option.key}>{option.value}</button>
        :
        <button className="" onClick={onSelection} key={option.key} value={option.key}>{option.value}</button>
            )

    return (
        <div className="c-portal-tab-view">

            {optionToDisplay}    
    
            
        </div>

    )
};



PortalTabView.propTypes = {    
    options: PropTypes.arrayOf(PropTypes.object),    
    handleSelection: PropTypes.func
};


export default PortalTabView;
