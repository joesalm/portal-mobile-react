import moment from "moment";
import { APPROVE, REJECT, WAIT } from "./global";

class EmployeeData {
    constructor(data) {
        Object.assign(this, data);
    }

    // Getter
    // get area() {
    //     return this.calcArea();
    // }
    // Method
    // timeStringToAmount(timeString) {
    //     var hoursMinutes = timeString.split(":");
    //     var hours = parseInt(hoursMinutes[0]);
    //     var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1]) : 0;
    //     return hours + minutes / 60;
    // }

    reportHoures(id) {
        const report = this.reports.find(item => item.reportid === id)
        const t1 = moment(report.finishhour, "hh:mm");
        const t2 = moment(report.starthour, "hh:mm");
        const t3 = (t1 - t2) / (60 * 60 * 1000);
        return t3;
    }


    approvedHoures() {
        this.approved = 0;
        this.approved = this.reports.reduce((acc, curr) => {
            if (curr.approval === "1") {
                const t1 = moment(curr.finishhour, "hh:mm");
                const t2 = moment(curr.starthour, "hh:mm");
                const t3 = (t1 - t2) / (60 * 60 * 1000);
                return acc + t3;
            }
            else {
                return acc
            }
        }, 0)
        return this.approved;
    }



    rejectedHoures() {
        this.rejeced = 0;
        this.rejeced = this.reports.reduce((acc, curr) => {

            if (curr.approval === "-1") {
                const t1 = moment(curr.finishhour, "hh:mm");
                const t2 = moment(curr.starthour, "hh:mm");
                const t3 = (t1 - t2) / (60 * 60 * 1000);
                return acc + t3;
            }
            else {
                return acc
            }
        }, 0)

        return this.rejeced;

    }
    waitingHoures() {
        this.waiting = 0;
        this.waiting = this.reports.reduce((acc, curr) => {
            if (curr.approval === "0") {
                const t1 = moment(curr.finishhour, "hh:mm");
                const t2 = moment(curr.starthour, "hh:mm");
                const t3 = (t1 - t2) / (60 * 60 * 1000);
                return acc + t3;
            }
            else {
                return acc
            }
        }, 0)
        return this.waiting;
    }
    totalHoures() {
        return this.waitingHoures() + this.approvedHoures() + this.rejectedHoures();
    }


    reportedDate(id) {
        const report = this.reports.find(item => item.reportid === id)
        return report.date;

    }


    projectName(id) {
        const report = this.reports.find(item => item.reportid === id)
        const projectId = report.projectid

        let item = this.reportingPerimeter[projectId]
        return item.projectName;

    }

    courseName(id) {
        const report = this.reports.find(item => item.reportid === id)
        const projectId = report.projectid
        const parameter = this.reportingPerimeter[projectId];
        const courseId = report.courseid

        let course = parameter.courses.find(item => item.courseid === courseId)

        if (!courseId) {
            course = parameter.courses[0];
        }
        else
            course = parameter.courses.find(item => item.courseid === courseId)


        return course ? course.courseName : "כללי";
    }

    subjectName(id) {
        const report = this.reports.find(item => item.reportid === id)
        const projectId = report.projectid
        const parameter = this.reportingPerimeter[projectId];
        const subjectId = report.actionid;
        const subject = parameter.subjects.find(item => item.reportsubjectid === subjectId)

        return subject.subject;
    }

    getReportIds() {
        return this.reports ? this.reports.map(item => item.reportid) : [];
    }


    getReportStatus(id) {
        const report = this.reports.find(item => item.reportid === id)
         const approval = report.approval

        if (approval === "1")
            return APPROVE
        else if (approval === "-1")
            return REJECT
        else
            return WAIT

    }


    setApprovalReportsStatus(ids, checkdate, statusKey) {
        ids.forEach(id => {
            const report = this.reports.find(item => item.reportid === id)
            report.checkdate = checkdate;
            report.approval = statusKey;
        });
    }

    // serverSend(activeUser, ids, status) {

    //     const statusObj = { approve: "1", reject: "-1", wait: "0" }
    //     const statusKey=statusObj[status];
    //     const payload = { status: statusKey, reportids: ids }

    //     console.log("payload", payload )
    //     return server(activeUser,payload, "SetReportApproval").then(response => {
    //         let checkdate = response.data;
    //         console.log("data", checkdate)

    //         ids.forEach(id => {
    //             const report = this.reports.find(item => item.reportid === id)
    //             report.checkdate=checkdate;
    //             report.approval = statusKey
    //         });
    //     //    this.totalHoures();
    //         console.log("checkdate", this.onServerChange)

    //         this.onServerChange(this.userid, this);

    //     })


    // }






}

export default EmployeeData;