import React from 'react';
import './PortalMonthPicker.css';
import leftBtnPic from './images/arrow_left.png';
import rightBtnPic from './images/arrow_right.png';
import leftDisabledBtnPic from './images/arrow_left_disabled.png';
import rightDisabledBtnPic from './images/arrow_right_disabled.png';


class PortalMonthPicker extends React.Component {
// props: callback function, namely: handleMonthSelection. function that invokes on every month navigation of the user by using the left and right arrows (prev month and next month in accomodation).
//        this callback function returns: A. Year as integer, B. Month as integer.

    constructor(props) {
        super(props);

        let today = new Date();
        let currMonth = (today.getMonth()===12 ? 1 :today.getMonth() + 1 ); // if it's december, you wouldn't like to add 1..
        this.distMonthFromCurrDate = 0;

        let currYear = today.getFullYear();
        // var currYearMonth1 = currYear + '-' + (currMonth<10 ? '0' :'') + currMonth;


        this.state = {
            // selectedYearMonth: currYearMonth1,
            selectedMonth: currMonth,
            selectedYear: currYear
            
        }

        this.incrementMonth = this.incrementMonth.bind(this);
        this.decrementMonth = this.decrementMonth.bind(this);
    }



    incrementMonth () {
        // if (this.distMonthFromCurrDate === 6) {alert ("sorry, no more than 6 month from current date ! ")} 
        if (this.distMonthFromCurrDate === 6) {}
        else {
                if (this.state.selectedMonth === 12)
                    {
                        this.setState({
                            selectedMonth: 1,
                            selectedYear: this.state.selectedYear + 1

                        }
                        
                        , () => {
                            this.props.handleMonthSelection(this.state.selectedYear,
                                                            this.state.selectedMonth)
                        }

                        )
                        this.distMonthFromCurrDate = this.distMonthFromCurrDate + 1
                        // console.log(this.state.selectedMonth);
                    }
                else
                    {
                        this.setState({
                            selectedMonth: this.state.selectedMonth + 1
                        }

                        , () => {
                                    this.props.handleMonthSelection(this.state.selectedYear,
                                                                    this.state.selectedMonth)
                                }

                        )
                        this.distMonthFromCurrDate = this.distMonthFromCurrDate + 1;
                    }
            }

        }

        decrementMonth () {
            // if (this.distMonthFromCurrDate === -6) {alert ("sorry, no less than 6 month from current date ! ")} 
            if (this.distMonthFromCurrDate === -6) {}
            else {
                    if (this.state.selectedMonth === 1)
                        {
                            this.setState({
                                selectedMonth: 12,
                                selectedYear: this.state.selectedYear - 1,
                                // distMonthFromCurrDate: this.state.distMonthFromCurrDate - 1
                            }                        , () => {
                                this.props.handleMonthSelection(this.state.selectedYear,
                                                                this.state.selectedMonth)
                            }
                            
                            
                            )
                                this.distMonthFromCurrDate = this.distMonthFromCurrDate - 1
                        }
                    else
                        {
                            this.setState({
                                selectedMonth: this.state.selectedMonth - 1
                            }

                            , () => {
                                this.props.handleMonthSelection(this.state.selectedYear,
                                                                this.state.selectedMonth
                                                                )
                            }
                            
                            )
                            this.distMonthFromCurrDate = this.distMonthFromCurrDate - 1;
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

        const viewSelectedMonthYear = (selectedMonthName + ' ' + this.state.selectedYear).trim();


        return (
            <div className = "monthPickingView">
                <div className = "movingBtn">
                    <IncrDecrButton pic={(this.distMonthFromCurrDate === 6) ? rightDisabledBtnPic : rightBtnPic} text="Previous month" btnClicked={this.incrementMonth}/>
                </div>
                <div className = "dateView">
                    {viewSelectedMonthYear}
                </div>                    
                <div className = "movingBtn">
                    <IncrDecrButton pic={(this.distMonthFromCurrDate === -6) ? leftDisabledBtnPic : leftBtnPic} text="Next month" btnClicked={this.decrementMonth}/>
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