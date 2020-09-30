import React, { useState,useContext,useEffect } from 'react';
import PropTypes from 'prop-types';
import "./TabTypeA.css"
import PortalSelect from '../../components/PortalSelect/PortalSelect';
import server from '../../shared/server'
import ActiveUserContext from '../../shared/activeUserContext'



const TabTypeA = (props) => {
   

    const { fullName,shortNameH,shortNameA,project,tags,city,budget,teacher } = props

    const activeUser = useContext(ActiveUserContext);

    const [projectsObjects, setProjectsObjects] = useState([])
    const [citiesObjects, setCitiesObjects] = useState([])
    const [budjetsObjects,setBudjetsObjects] = useState([])

    const [projectSelection, setProjectSelection] = useState("0")
    const [citySelection, setCitySelection] = useState("0")
    const [budjetSelection, setBudjetSelection] = useState("0")

    const handleProjectSelection = (e) => {
        setProjectSelection(e)
        console.log(e)
       
        // now we need to update the server:
     
    }

    const handleCitySelection = (e) => {    
        setCitySelection(e);      
        
        // now we need to update the server:
     
    }

    const handleBudjetSelection = (e) => {      
        setBudjetSelection(e)
        
        // now we need to update the server:
     
    }

    useEffect(() => {
    
        // get the projects list from server 
        const projects = {projectid:"",projectname:""};
        server(activeUser, projects, "GetProjects").then(res => {
            if (res.data.error) {
                alert("error in projects");
            } else {

                // converts server keys {projectid:"",projectname:""} to {key:"",value:""}
                const newArr = res.data.map(({ projectid, projectname }) => ({ key: projectid, value: projectname }));

                setProjectsObjects(newArr)                
                                             
            }
        }, err => {
            console.error(err);
        }) 
        
        // get the cities list from server 
        const cities = {cityid:"",name:""};
        server(activeUser, cities, "GetCities").then(res => {
            if (res.data.error) {
                alert("error in cities");
            } else {


                // converts server keys {cityid:"",name:""} to {key:"",value:""}
                const newArr = res.data.map(({ cityid, name }) => ({ key: cityid, value: name }));

                setCitiesObjects(newArr)
                //setCitiesObjects([{key:"0",value:"C"},{key:"1",value:"B"}])              
                
                                             
            }
        }, err => {
            console.error(err);
        })  

        // get the budjests list from server 
        const budjets = {yearbudgetid:"",year:""};
        server(activeUser, budjets, "GetActiveYearsBudget").then(res => {
            if (res.data.error) {
                alert("error in projects");
            } else {

                // converts server keys {yearbudgetid:"",year:""} to {key:"",value:""}
                const newArr = res.data.map(({ yearbudgetid, year }) => ({ key: yearbudgetid, value: year }));
                setBudjetsObjects(newArr)                
                                             
            }
        }, err => {
            console.error(err);
        }) 

    }, [projectSelection,citySelection,budjetSelection])

    

 

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
                <PortalSelect title={"פרוייקט :"} 
                options={projectsObjects} optionsKey={projectSelection} handleSelection={handleProjectSelection} />

            </div>

            
            <div className="row"> 
                <label>תגיות :</label>              
                <p>{tags}</p>
            </div>

            <div className="row">
                <div className="col">                   
                    <PortalSelect title={"עיר :"} options={citiesObjects} optionsKey={citySelection} handleSelection={handleCitySelection} />
                </div>
                <div className="col">              
                    <PortalSelect title={"שנת תקציב :"} options={budjetsObjects} optionsKey={budjetSelection} handleSelection={handleBudjetSelection}/>
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
