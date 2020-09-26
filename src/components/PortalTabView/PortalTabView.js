import React from 'react';
import PropTypes from 'prop-types';
import "./PortalTabView.css"


const PortalTabView = (props) => {
   

    const { options,handleSelection } = props

    const onSelection = (e) => {
        handleSelection(e.target.value);
   
    }

    return (
        <div className="c-portal-tab-view">

            {options.map(option => (option.key===0) ?
                 <button onClick={onSelection} key={option.key} value={option.key} autoFocus >{option.value}</button>
                 :
                 <button onClick={onSelection} key={option.key} value={option.key}>{option.value}</button>
                        )
            }    
    
            
        </div>

    )
};



PortalTabView.propTypes = {    
    options: PropTypes.arrayOf(PropTypes.object),    
    handleSelection: PropTypes.func
};


export default PortalTabView;
