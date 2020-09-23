import React from 'react';
import './PortalMonthPicker.css';
import leftBtnPic from './images/arrow_left.png';
import rightBtnPic from './images/arrow_right.png';


class PortalMonthPicker extends React.Component {

    constructor(props) {
        super(props);

        var today = new Date();
        var currMonth = today.getMonth() +1;
        var currMonth = (today.getMonth()==12 ? 1 :today.getMonth() + 1 ); // if it's december, you wouldn't like to add 1..

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
                        // console.log(this.state.selectedMonth);
                    }
                else
                    {
                        this.setState({
                            selectedMonth: this.state.selectedMonth + 1,
                            distMonthFromCurrDate: this.state.distMonthFromCurrDate + 1
                        })
                    }
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
                        // console.log(this.state.distMonthFromCurrDate);
                    }
                }    

            // shouldComponentUdate() {
            //     if (this.state.distMonthFromCurrDate === (-6)) {return false;}
            //     else 
            //      {return true;};
            // }


    render () {

        const monthNames = ["",
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
                    <IncrDecrButton pic={leftBtnPic} text="Previous month" btnClicked={this.incrementMonth}/>
                </div>
                <div className = "dateView">
                    {viewSelectedMonthYear}
                </div>                    
                <div className = "movingBtn">
                    <IncrDecrButton pic={rightBtnPic} text="Next month" btnClicked={this.decrementMonth}/>
                </div>
            </div>
        )
    }
}


class IncrDecrButton extends React.Component {

    constructor(props) {
        super(props);
        
        // console.log(this.props.click);
        this.click = this.click.bind(this);
    }


    click() {
        this.props.btnClicked();
    }


    render () {

        return (
            <div>
                <img src={this.props.pic} alt={this.props.text} onClick={this.click}></img>
            </div>
        )
    }
}


export default PortalMonthPicker;