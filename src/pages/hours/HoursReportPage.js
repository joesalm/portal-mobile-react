import React, { useContext, useEffect, useState } from 'react';
import './HoursReportPage.css'
import PortalNavbar from '../../components/navbar/PortalNavbar';
import ActiveUserContext from '../../shared/activeUserContext'
import { Redirect } from 'react-router-dom'
import IconButtonsSet from '../../components/iconButtonsSet/IconButtonsSet';
import CallingCMonthPickerTest from '../../components/PortalMonthPicker/CallingMonthPickerTest';
import server from '../../shared/server';

const HoursReportPage = (props) => {
    const { handleLogout, } = props;
    const activeUser = useContext(ActiveUserContext);

    const [userReports, setUserReports] = useState([ ]);

    const [userReportsPerimeter, setUserReportsPerimeter] = useState([ ]);

    const callData = { month: 9, year: 2020 };


    useEffect(() => {
        server(activeUser, {}, "GetMyReportingPerimeter").then(res => {
            const resData = res.data;
            setUserReportsPerimeter(resData)

            server(activeUser, callData, "GetReports").then(res => {
                const resData = res.data;
                setUserReports(resData)
            })
        })
    }, []);


    if (!activeUser) {
        return <Redirect to='/' />
    }


    const title = ["דיווח שעות"];

    // const reportsView = userReports.map(report => 
    // <tr >

    // </tr>)
    return (
        <div className="p-hours-report">
            <PortalNavbar handleLogout={handleLogout} title="דיווח שעות" />
            <CallingCMonthPickerTest />
            <div className="num"> הס"כ שעות :  200</div>
            <table className="hoursTabel">
                <tbody>
                    <tr >
                        <th>תהריך</th>
                        <th>פרויקט</th>
                        <th>נושא הפעילות</th>
                        <th>סה"כ שעות</th>
                    </tr>
                    <tr className="red">
                        <td>12.2.20</td>
                        <td>up progress</td>
                        <td>שם פעילות כללית</td>
                        <td>9</td>
                    </tr>
                    <tr className="green">
                        <td>12.2.20</td>
                        <td>up progress</td>
                        <td>שם פעילות כללית</td>
                        <td>9</td>
                    </tr>
                    <tr className="yellow">
                        <td>12.2.20</td>
                        <td>up progress</td>
                        <td>שם פעילות כללית</td>
                        <td>9</td>
                    </tr>
                    <div className="last"></div>
                </tbody>
            </table>
            <IconButtonsSet
            // onSave={onSave}
            // onAdd={onAdd}
            />
        </div>
    );
}

export default HoursReportPage;