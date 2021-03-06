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
import IconButtonsSet from '../../components/iconButtonsSet/IconButtonsSet';


const HoursApprovePage = (props) => {
    const { handleLogout } = props;
    const activeUser = useContext(ActiveUserContext);
    const [fullReporters, setFullReporters] = React.useState([]);
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
        const statusOb = { approve: "1", reject: "-1", wait: "0" }
        const statusKey = statusOb[status];
        const payload = { status: statusKey, reportids: ids }

        server(activeUser, payload, "SetReportApproval").then(response => {
            let checkdate = response.data;
            let tempfullReporters = [...fullReporters]
            const item = tempfullReporters.find(item => item.userid === userid)
            if (item ) {
                item.setApprovalReportsStatus(ids, checkdate, statusKey)
            }
            setFullReporters(tempfullReporters);
        })
    }


    React.useEffect(() => {
        server(activeUser, monthYearDate, "GetAllReporters").then(response => {
            let usefulReporters = [];
            let data = response.data;
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

            setFullReporters(usefulReporters);
        })
    }, [activeUser, monthYearDate]);


    const handleMonthSelection = (year, month, date) => {
        setMonthYearDate({ year, month })
        setPage(1);

    }


    if (!activeUser) {
        return <Redirect to='/' />
    }





    let filteredReporters = fullReporters.filter(item => item.firstname.includes(searchInput) || item.lastname.includes(searchInput))
    const pagesNum = Math.ceil(filteredReporters.length / LINES_PER_PAGE)

    return (
        <div className="p-hours-approve">
            <PortalNavbar title = "אישור שעות" handleLogout={handleLogout} />
    
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
                                            <small style={{ "color": "#ffd300" }}>{item.waitingHoures()}</small>
                                        </Col>
                                    </Row>
                                </CustomToggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey={item.userid}>
                                <Card.Body className="acordion-card-body">
                                    <AccordionBody data={item} userid={item.userid} updateStatus={onServerChange} />
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    )
                })}

            </Accordion>
            <IconButtonsSet onCopy={null} onSave={null} onDelete={null} onBack={null} onAdd={null} />

        </div >
    );
}

export default HoursApprovePage;