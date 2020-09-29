import React, { useState,useContext,useEffect } from 'react';
import PropTypes from 'prop-types';
import "./TabTypeA.css"
import PortalSelect from '../../components/PortalSelect/PortalSelect';
import server from '../../shared/server'
import ActiveUserContext from '../../shared/activeUserContext'



const TabTypeA = (props) => {
   

    const { fullName,shortNameH,shortNameA,project,tags,city,budget,teacher } = props

    const activeUser = useContext(ActiveUserContext);
    const [citiesObjects, setCitiesObjects] = useState(null)
    // const onSelection = (e) => {
    //     handleTabSelection(e.target.value);
   
    // }

    useEffect(() => {
    
        // get the cities list from server 
        const cities = {};
        server(activeUser, cities, "GetCities").then(res => {
            if (res.data.error) {
                alert("error in cities");
            } else {
                
                setCitiesObjects(res.data)
                console.log(citiesObjects)                                   
                                             
            }
        }, err => {
            console.error(err);
        })    

    }, [])

    return (
        <div className="c-tab-type-a">

            
            <div className="row"> 
                <label>שם קורס :</label>               
                <p>{fullName}</p>           

            </div>

            <div className="row">
                <div className="col">
                    <label>שם מקוצר עברית :</label>
                    <p>{shortNameH}</p>
                </div>
                <div className="col">
                    <label>שם מקוצר ערבית :</label>
                    <p>{shortNameA}</p>
                </div>
            </div>
            
            <div className="row">
                {/* <label>פרוייקט :</label>
                <p>{project}</p> */}
                <PortalSelect title={"פרוייקט :"} options={[{"0":"a"},{"1":"b"}]} optionsKey={"city"} />

            </div>

            
            <div className="row"> 
                <label>תגיות :</label>              
                <p>{tags}</p>
            </div>

            <div className="row">
                <div className="col">
                    {/* {<label>עיר :</label>} */}
                    {/* <p>{city}</p> */}
                    <PortalSelect title={"עיר :"} options={[{"0":"a"},{"1":"b"}]} optionsKey={"city"} />
                </div>
                <div className="col">
                    {/* <label>שנת תקציב :</label>
                    <p>{budget}</p> */}
                    <PortalSelect title={"שנת תקציב :"} options={[{"0":"a"},{"1":"b"}]} optionsKey={"city"} />
                </div>
            </div>

            
            <div className="row">
                <label>מדריך :</label>               
                <p>{teacher}</p>
            </div>
        
        </div>
    )
};

TabTypeA.propTypes = {
    fullName: PropTypes.string,
    shortNameH: PropTypes.string,
    shortNameA: PropTypes.string,
    project: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    city: PropTypes.string,
    budget: PropTypes.string,
    teacher: PropTypes.string    
};

export default TabTypeA;
