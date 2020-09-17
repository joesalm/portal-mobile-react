import React from 'react';
import PropTypes from 'prop-types';
import "./PortalTable.css"


const PortalTable = (props) => {
    const { headers, data, handleClick } = props;

    let tableRows = [];
    data.forEach((row) => {
        let tableCells = [];
        headers.forEach((header, index)=> {
            tableCells.push(<td key={row.id + index}>{row[header.key]}</td>)
        })
        tableRows.push(<tr key={row.id} onClick={() => { handleClick(row.id) }}>{tableCells}</tr>)
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
    handleClick: PropTypes.func
};


export default PortalTable;

