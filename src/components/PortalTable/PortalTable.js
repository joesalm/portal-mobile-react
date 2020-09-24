import React from 'react';
import PropTypes from 'prop-types';
import "./PortalTable.css"

// example:
// const headers = [{ key: "fname", header: "שם פרטי" }, { key: "lname", header: "שם משפחה" }, { key: "email", header: "אימייל" }];
// const data = [{ id: "12212", fname: "ניר", lname: "חנס", email: "nirchannes@gmail.com" }, { id: "2212", fname: "רונית", lname: "אברהמי", email: "ronit.av@gmail.com" }]
// <PortalTable data={data} headers={headers} handleClick={handleClick} />


const PortalTable = (props) => {
    const { keyName, headers, data, handleClick } = props;


    let tableRows = [];
    data.forEach((row, rowIndex) => {
        const key = !keyName ? "id" : keyName;
        let tableCells = [];
        headers.forEach((header, cellIndex) => {
            tableCells.push(<td key={row[key] ? row[key]+"-"+ cellIndex : "cell-" + cellIndex}>{row[header.key]}</td>)
        })
        tableRows.push(<tr key={row[key] ? "row-" + row[key] : "row-" + rowIndex} onClick={() => { handleClick(row) }}>{tableCells}</tr>)
    })

    return (
        <div className="c-portal-table">
            <table>
                <thead>
                    <tr>
                        {headers.map((row, index) => <th key={row.key + index}>{row.header}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {tableRows}
                </tbody>
            </table>
        </div>
    );
};


PortalTable.propTypes = {
    headers: PropTypes.arrayOf(PropTypes.object),
    data: PropTypes.arrayOf(PropTypes.object),
    handleClick: PropTypes.func,
    keyName: PropTypes.string
};


export default PortalTable;

