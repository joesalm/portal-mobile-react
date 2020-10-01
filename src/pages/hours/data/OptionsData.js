import server from "../../../shared/server"



class OptionData {
    constructor(data) {
        Object.assign(this, data);
        let arr = [];
        for (let index in this) {
            const item = this[index]
            arr.push(item);
        }

        this.arr = arr;
    }

    getProjects() {
        return this.arr.map(item => {
            return {
                key: item.projectid,
                value: item.projectName
            }
        })
    }

    getCourses(projectId) {
        let project = this.arr.find(item => item.projectid === projectId)

        if (project.courses.length === 0)
            return [{ key: null, value: "כללי" }];
        else
            return project.courses.map(item => { return { key: item.courseid, value: item.courseName } })
    }

    getSubjects(projectId) {
        let project = this.arr.find(item => item.projectid === projectId)

        return project.subjects.map(item => { return { key: item.reportsubjectid, value: item.subject } })
    }


}
export default OptionData;
