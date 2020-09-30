import React, { useContext } from 'react';
import './hours.css'
import PortalNavbar from '../../components/navbar/PortalNavbar';
import ActiveUserContext from '../../shared/activeUserContext'
import { Redirect } from 'react-router-dom'
import { Accordion, Card, Col, Row } from 'react-bootstrap';
import CustomToggle from './CustomToggle';
import AccordionBody from "./AccordionBody"
import server from "../../shared/server"
import PortalSearchPager from '../../components/PortalSearchPager/PortalSearchPager';
import EmployeeData from './data/EmployeeData';
import "./HoursApprovePage.css"
import PortalMonthPicker from '../../components/PortalMonthPicker/PortalMonthPicker';


const HoursApprovePage = (props) => {
    const { handleLogout } = props;
    const activeUser = useContext(ActiveUserContext);
    const [fullReporters, setFullReporters] = React.useState([]);
    const [filteredReporters, setFilteredReporters] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [searchInput, setSearchInput] = React.useState('');
    const [monthYearDate, setMonthYearDate] = React.useState({
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear()
    });

    const LINES_PER_PAGE = 10;


    const handlePageChange = (params) => {
        setPage(params);
    }


    const handleSearchSubmit = (params) => {
        setSearchInput(params);
        setPage(1);
    }


    const onServerChange = (userid, ids, status) => {
        const statusObj = { approve: "1", reject: "-1", wait: "0" }
        const statusKey = statusObj[status];
        const payload = { status: statusKey, reportids: ids }

        // console.log("payload", payload)
        server(activeUser, payload, "SetReportApproval").then(response => {
            let checkdate = response.data;
            // console.log("data", checkdate)
            let tempfullReporters = [...fullReporters]
            const index = tempfullReporters.findIndex(item => item.userid === userid)
            if (index > -1) {
                ids.forEach(id => {
                    const report = tempfullReporters[index].reports.find(item => item.reportid === id)
                    report.checkdate = checkdate;
                    report.approval = statusKey
                });
            }
            setFullReporters(tempfullReporters);
        })
    }


    React.useEffect(() => {

        console.log("monthYearDate", monthYearDate)
        server(activeUser, monthYearDate, "GetAllReporters").then(response => {
            let usefulReporters = [];
            let data = response.data;
            console.log("data", data)
            for (let i = 0; i < data.length; i++) {
                if (data[i].reports.length > 0 || data[i].status === "1") {
                    let item = new EmployeeData(data[i]);
                    usefulReporters.push(item);
                }
            }

            usefulReporters.sort((a, b) => {
                let x = a.firstname;
                let y = b.firstname;
                if (x < y) { return -1; }
                if (x > y) { return 1; }
                return 0;
            });

            console.log("anat usefulReporters", usefulReporters)
            setFullReporters(usefulReporters);
            setFilteredReporters(usefulReporters);
        })
    }, [activeUser, monthYearDate]);




    React.useEffect(() => {
        setFilteredReporters(fullReporters.filter(item => item.firstname.includes(searchInput) || item.lastname.includes(searchInput)));
    }, [searchInput, fullReporters]);


    const handleMonthSelection = (year, month, date) => {
        setMonthYearDate({ year, month })
    }


    if (!activeUser) {
        return <Redirect to='/' />
    }





    const pagesNum = Math.ceil(filteredReporters.length / LINES_PER_PAGE)

    return (
        <div className="p-hours-approve">
            <PortalNavbar handleLogout={handleLogout} />
            <h1>אישור שעות</h1>
            <PortalMonthPicker handleMonthSelection={handleMonthSelection} />
            <div className="portal-search">
                <PortalSearchPager currentPage={page} onPageChange={handlePageChange} pages={pagesNum}
                    pHolder="חיפוש עובד" onSearchSubmit={handleSearchSubmit} />
            </div>
            <Accordion >
                {filteredReporters.slice((page - 1) * LINES_PER_PAGE, (page - 1) * LINES_PER_PAGE + 10).map(item => {
                    return (
                        <Card key={item.userid} className="acordion-card" >
                            <Card.Header>
                                <CustomToggle className="row" eventKey={item.userid}>
                                    <Row>
                                        <Col xs={4}>
                                            <div>{`${item.firstname} ${item.lastname}`}</div>
                                        </Col>
                                        <Col xs={2}>
                                            <small>{item.totalHoures()}</small>
                                        </Col>
                                        <Col xs={2}>
                                            <small style={{ "color": "red" }}>{item.rejectedHoures()}</small>
                                        </Col>
                                        <Col xs={2}>
                                            <small style={{ "color": "green" }}>{item.approvedHoures()}</small>
                                        </Col>
                                        <Col xs={2}>
                                            <small style={{ "color": "yellow" }}>{item.waitingHoures()}</small>
                                        </Col>
                                    </Row>
                                </CustomToggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey={item.userid}>
                                <Card.Body className="acordion-card-body">
                                    <AccordionBody data={item} userid={item.userid} reportsIds={item.getReportIds()} updateStatus={onServerChange} />
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    )
                })}

            </Accordion>
        </div >
    );
}

export default HoursApprovePage;