import React, { useState,useContext,useEffect } from 'react';
import PropTypes from 'prop-types';
import "./TabTypeB.css"
import server from '../../shared/server'
import ActiveUserContext from '../../shared/activeUserContext'


const TabTypeB = (props) => {

   

    const { fullName,subjects } = props

    const activeUser = useContext(ActiveUserContext);

    const [syllabusSubs, setSyllabusSubs] = useState([])

//--------------------------------------------------------------------------- 

console.log(syllabusSubs)

//const arr = [{subject:"tamir"},{subject:"ron"},{subject:"liat"},[{subject:"bla"},{id:"bla"},{subject:"bla"}]]


const allSubjects = [];
JSON.stringify(syllabusSubs, (key, value) => {
  if (key === 'subject') allSubjects.push(value);
  return value;
});

console.log(allSubjects)

const syllabus = allSubjects.map((subject,index) => (subject==="חלק טכנולוגי") ? <div className="row" key={index}>
        <h1>{subject}</h1>
        </div>:
        <div className="row" key={index}>
        <p>{subject}</p>
        </div>)
   

//-----------------------------------------------------------------------------------    

    // const syllabus = subjects.map((subject,index) => <div className="row" key={index}>
    //     <p>{subject.subject}</p>
    //     </div>)

    useEffect(() => {
            
        const activeCourseId = localStorage.activeCourse
    
        const data = {courseid: activeCourseId};
        server(activeUser, data, "GetCourseById").then(res => {
            if (res.data.error) {
                alert("error in course");
            } else {                       
                                            
                setSyllabusSubs(res.data.subjects)
                //console.log(res.data.subjects)                                           
                                            
            }
        }, err => {
            console.error(err);
        })        
    

    }, [])    

    return (
        <div className="c-tab-type-b">
            <div>
                <label>שם קורס </label>
                <p>{fullName}</p>
            </div>
            <div>
                <label>סילבוס </label>
   
            </div>
            {/* <label>שם נושא</label> */}
            {syllabus}           
            
                              
        </div>

    )
};

TabTypeB.propTypes = {
    fullName: PropTypes.string,
    subjects: PropTypes.arrayOf(PropTypes.string)
    
};

export default TabTypeB;
