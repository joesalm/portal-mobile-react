import React from 'react';
import { useAccordionToggle } from 'react-bootstrap';
import "./CustomToggle.css"
import { ReactComponent as Icon } from "../../assets/images/arrow_down.svg";
import AccordionContext from 'react-bootstrap/AccordionContext';


function CustomToggle(props) {
    const { children, eventKey, callback } = props;
    const currentEventKey = React.useContext(AccordionContext);
    const isCurrentEventKey = currentEventKey === eventKey;


    const decoratedOnClick = useAccordionToggle(eventKey, () => callback && callback(eventKey),
    );

    return (
        <div className={isCurrentEventKey ? "custom-toggle open" :"custom-toggle"} onClick={decoratedOnClick}>
            {children}
            <Icon />
        </div>
    );
}
export default CustomToggle;