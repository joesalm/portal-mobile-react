import server from "../../../shared/server.js"



 export   async function  saveReport(activeUser,
     projectid, courseid, coursename,subjectId, 
     starthour, finishhour,  hours, date,
     cost, carkm,
     comment
     )
    {


        
    let report = {
        reportid: "-1",
        approval: 0,
        automatic: 0,
        projectid: projectid,
        courseid: courseid,
        actionid: subjectId,
        isSetProject: true,
        isSetSubject: true,
        noInterstion: true,
        coursename: coursename,
        date: date,
        starthour: starthour,
        starthourvalid: true,
        finishhour: finishhour,
        finishhourvalid: true,
        hours: hours,
        hoursvalid: true,
        cost :cost,
        carkm: carkm,
        conment: comment,
        status: ""
    }

    return server(activeUser, {reports: [report]}, "SaveReports");
    
}




// if (report.automatic == 0) {
//     report.hoursvalid = true;
//     report.finishhourvalid = true;
//     report.starthourvalid = true;
//     report.noInterstion = true;
//     report.isSetProject = true;
//     report.isSetSubject = true;
//     var t1 = moment(report.finishhour, "hh:mm");
//     var t2 = moment(report.starthour, "hh:mm");
//     var t3 = moment.utc(moment(t1, "HH:mm").diff(moment(t2, "HH:mm"))).format("HH:mm");
//     if (t3 == 'Invalid date') {
//         report.hoursvalid = false;
//         validHours = false;
//     }
//     if (!report.projectid) {
//         containsProject = false;
//         report.isSetProject = false;
//     }
//     if (!report.actionid) {
//         report.isSetSubject = false;
//         containsSubject = false;
//     }
//     if (report.automatic == 0) {
//         let t1 = moment(report.finishhour, "hh:mm");
//         let t2 = moment(report.starthour, "hh:mm");
//         let t3 = moment.utc(moment(t1, "HH:mm").diff(moment(t2, "HH:mm"))).format("HH:mm");
//         if (t1 - t2 <= 0) {
//             report.finishhourvalid = false;
//             validFinishHour = false;
//         }
//     }
//     if(report.automatic==0)
//     {
//         let t1 = report.finishhour;
//         let t2 = report.starthour;
//         //formatted time
//         let ft1 = moment(report.finishhour, ["HH:mm", "HHmm"]).format("HH:mm");
//         let ft2 = moment(report.starthour, ["HH:mm", "HHmm"]).format("HH:mm");
//         if (report.starthour != ft2) {
//             report.starthour = ft2;
//             report.copyreport.starthour = ft2;
//             report.starthourvalid=false;
//             wasFormatted = false;
//         }
//         if (report.finishhour != ft1 ) {
//             report.finishhour = ft1;
//             report.copyreport.finishhour = ft1;
//             report.finishhourvalid=false;
//             wasFormatted = false;
//         }
//     }

// }