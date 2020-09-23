import React from 'react';
import './PortalMonthPicker.css';


class PortalMonthPicker extends React.Component {

    constructor() {
        super();

        var today = new Date();
        var currMonth = today.getMonth();
        var currYear = today.getFullYear();
        // var currYearMonth1 = currYear + '-' + (currMonth<10 ? '0' :'') + currMonth;


        this.state = {
            // selectedYearMonth: currYearMonth1,
            selectedMonth: currMonth,
            selectedYear: currYear,
            distMonthFromCurrDate: 0
        }

        this.incrementMonth = this.incrementMonth.bind(this);
        this.decrementMonth = this.decrementMonth.bind(this);
    }



    incrementMonth () {
        if (this.state.distMonthFromCurrDate === 6) {alert ("sorry, no more than 6 month from current date ! ")} 
        else {
                if (this.state.selectedMonth === 12)
                    {
                        this.setState({
                            selectedMonth: 1,
                            selectedYear: this.state.selectedYear + 1,
                            distMonthFromCurrDate: this.state.distMonthFromCurrDate + 1
                        })
                    }
                else
                    {
                        this.setState({
                            selectedMonth: this.state.selectedMonth + 1,
                            distMonthFromCurrDate: this.state.distMonthFromCurrDate + 1                    
                        })
                    }
                    console.log(this.state.distMonthFromCurrDate);
            }
        }

        decrementMonth () {
            if (this.state.distMonthFromCurrDate === -6) {alert ("sorry, no less than 6 month from current date ! ")} 
            else {
                    if (this.state.selectedMonth === 1)
                        {
                            this.setState({
                                selectedMonth: 12,
                                selectedYear: this.state.selectedYear - 1,
                                distMonthFromCurrDate: this.state.distMonthFromCurrDate - 1
                            })
                        }
                    else
                        {
                            this.setState({
                                selectedMonth: this.state.selectedMonth - 1,
                                distMonthFromCurrDate: this.state.distMonthFromCurrDate - 1
                            })
                        }
                        console.log(this.state.distMonthFromCurrDate);
                    }
                }    

            // shouldComponentUdate() {
            //     if (this.state.distMonthFromCurrDate === (-6)) {return false;}
            //     else 
            //      {return true;};
            // }


    render () {

        const monthNames = [
                            "ינואר",
                            "פברואר",
                            "מרץ",
                            "אפריל",    
                            "מאי",
                            "יוני",
                            "יולי",
                            "אוגוסט",
                            "ספטמבר",
                            "אוקטובר",
                            "נובמבר",
                            "דצמבר"
                           ];

        const selectedMonthName = monthNames[this.state.selectedMonth];

        const viewSelectedMonthYear = selectedMonthName + ' ' + this.state.selectedYear;


        return (
            <div className = "monthPickingView">
                <div className = "movingBtn">
                    <IncrDecrButton btnClicked={this.incrementMonth}/>
                </div>
                <div className = "dateView">
                    {viewSelectedMonthYear}
                </div>                    
                <div className = "movingBtn">
                    <IncrDecrButton btnClicked={this.decrementMonth}/>
                </div>
            </div>
        )
    }
}


class IncrDecrButton extends React.Component {

    constructor(props) {
        super(props);

        console.log(this.props.click);
        this.click = this.click.bind(this);
    }


    click() {
        this.props.btnClicked();
    }


    render () {

        return (
            <div>
                <input type="button" onClick={this.click}></input>
            </div>
        )
    }
}


export default PortalMonthPicker;