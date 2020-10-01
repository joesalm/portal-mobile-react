import React, { useContext } from 'react';
import './HoursReportPage.css'
import PortalNavbar from '../../components/navbar/PortalNavbar';
import ActiveUserContext from '../../shared/activeUserContext'
import { Redirect } from 'react-router-dom'
import IconButtonsSet from '../../components/iconButtonsSet/IconButtonsSet';
import CallingCMonthPickerTest from '../../components/PortalMonthPicker/CallingMonthPickerTest';

const HoursReportPage = (props) => {
    const { handleLogout, onSave, onAdd } = props;
    const activeUser = useContext(ActiveUserContext);
    
    if (!activeUser) {
        return <Redirect to='/' />
    }
    

    return (
        <div className="p-hours-report">
            <PortalNavbar handleLogout={handleLogout}/>
            <CallingCMonthPickerTest/>
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
              onSave={onSave}
              onAdd={onAdd}
            />
        </div>
    );
}

export default HoursReportPage;