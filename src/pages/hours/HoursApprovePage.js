import React, { useContext } from 'react';
import './hours.css'
import PortalNavbar from '../../components/navbar/PortalNavbar';
import ActiveUserContext from '../../shared/activeUserContext'
import { Redirect } from 'react-router-dom'
import { Accordion, Card } from 'react-bootstrap';
import CustomToggle from './CustomToggle';
import AccordionBody from "./AccordionBody"
import server from "../../shared/server"
import PortalSearchPager from '../../components/PortalSearchPager/PortalSearchPager';



const HoursApprovePage = (props) => {
    const { handleLogout } = props;
    const activeUser = useContext(ActiveUserContext);
    const [fullReporters, setFullReporters] = React.useState([]);
    const [filteredReporters,setFilteredReporters] =React.useState([]);
    const [page, setPage] = React.useState(1);
    const [searchInput, setSearchInput] = React.useState('');
    const LINES_PER_PAGE = 10;



    React.useEffect(() => {
        server(activeUser, { month: 9, year: 2020 }, "GetAllReporters").then(response => {
            let usefulReporters = [];
            let data = response.data;

            for (let i = 0; i < data.length; i++) {
                if (data[i].reports.length > 0 || data[i].status == 1) {
                    usefulReporters.push(data[i]);
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
            setFilteredReporters(usefulReporters);
            console.log("usefulReporters", usefulReporters);

        })
    }, [activeUser]);


    React.useEffect(() => {
         setFilteredReporters(fullReporters.filter(item => item.firstname.includes(searchInput) || item.lastname.includes(searchInput)));
    }, [searchInput, fullReporters ]);


    const handlePageChange = (params) => {
        setPage(params);
    }

    const handleSearchSubmit = (params) => {
        setSearchInput(params);
    }

    if (!activeUser) {
        return <Redirect to='/' />
    }


    const pagesNum = Math.ceil(filteredReporters.length / LINES_PER_PAGE)

    return (
        <div className="p-hours-approve">
            {/* <PortalNavbar handleLogout={handleLogout} /> */}
            <button onClick={handleLogout}>logout</button>
            <h1>אישור שעות</h1>
            {/* //defaultActiveKey="0" */}
            <PortalSearchPager onPage={page} onPageChange={handlePageChange} pages={pagesNum}
                pHolder="חיפוש עובד" onSearchSubmit={handleSearchSubmit} />
            <Accordion >
                {filteredReporters.slice((page-1)*LINES_PER_PAGE,(page-1)*LINES_PER_PAGE+10).map(item => {
                    return (
                        <Card key={item.userid}>
                            <Card.Header>
                                <CustomToggle className="row" eventKey={item.userid}>
                                    {`${item.firstname} ${item.lastname}`}
                                    <small>150</small>
                                    <small style={{ "color": "red" }}>0</small>
                                    <small style={{ "color": "green" }}>20</small>
                                    <small style={{ "color": "yellow" }}>60</small>
                                </CustomToggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey={item.userid}>
                                <Card.Body>
                                    <AccordionBody userid={item.userid} />
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