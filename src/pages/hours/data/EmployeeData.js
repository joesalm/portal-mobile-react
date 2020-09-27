import moment from "moment";


class EmployeeData {
    constructor(data) {
        Object.assign(this, data);

        // console.log("assign", this);

        //         this.approverid = data.approverid
        //         this.approvers = approvers;

        // this.firstname="יוליה"
        // this.lastname= "זורין"
        // this.managerid= "933"
        // this.reportingPerimeter = {,…}
        // this.reports: [,…]
        // this.status: "1"
        // this.userid: "950"
        //       this.width = width;
    }
    // Getter
    // get area() {
    //     return this.calcArea();
    // }
    // Method
    timeStringToAmount(timeString) {
        var hoursMinutes = timeString.split(":");
        var hours = parseInt(hoursMinutes[0]);
        var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1]) : 0;
        return hours + minutes / 60;
    }

    reportHoures(id) {
        const report = this.reports.find(item => item.reportid === id)
        const t1 = moment(report.finishhour, "hh:mm");
        const t2 = moment(report.starthour, "hh:mm");
        const t3 = (t1 - t2) / (60 * 60 * 1000);
        return t3;
    }


    approvedHoures() {
        if (this.approved === undefined) {
            this.approved = 0;
            this.approved = this.reports.reduce((acc, curr) => {
                console.log("curr", curr.approval);
                if (curr.approval === "1") {
                    const t1 = moment(curr.finishhour, "hh:mm");
                    const t2 = moment(curr.starthour, "hh:mm");
                    const t3 = (t1 - t2) / (60 * 60 * 1000);
                    // console.log("total", t3)
                    return acc + t3;
                }
                else {
                    return acc
                }
            }, 0)
        }
        return this.approved;
    }



    rejectedHoures() {
        if (this.rejeced === undefined) {
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
        }
        return this.rejeced;

    }
    waitingHoures() {
        if (this.waiting === undefined) {
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
        }
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
        // .find(item => item.projectid === projectId)
        console.log("name", item.projectName)
        return item.projectName;

    }

    courseName(id) {
        console.log("anat")

        const report = this.reports.find(item => item.reportid === id)

        const projectId = report.projectid
        const parameter = this.reportingPerimeter[projectId];
        // find(item => item.projectid === projectId)


        const courseId = report.courseid

        console.log("courseId", courseId)
        let course = parameter.courses.find(item => item.courseid === courseId)

        if (!courseId) {
            course = parameter.courses[0];
        }
        else
            course = parameter.courses.find(item => item.courseid === courseId)

        console.log("course", course)

        return course ? course.courseName : "כללי";
    }

    subjectName(id) {
        const report = this.reports.find(item => item.reportid === id)
        const projectId = report.projectid

        const parameter = this.reportingPerimeter[projectId];

        // const parameter = this.reportingPerimeter.find(item => item.projectid === projectId)

        const subjectId = report.actionid;
        const subject = parameter.subjects.find(item => item.reportsubjectid === subjectId)

        return subject.subject;
    }

    getReportIds() {
        return this.reports.map(item => item.reportid)
    }


    getReportStatus(id) {
        const report = this.reports.find(item => item.reportid === id)
        const approval = report.approval
        if (approval === "1")
            return "approve"
        else if (approval === "-1")
            return "reject"
        else
            return "waiting"

    }
}

export default EmployeeData;