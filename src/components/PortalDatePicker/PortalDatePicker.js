import React from 'react';
import './PortalDatePicker.css';
import leftBtnPic from './images/arrow_left.png';
import rightBtnPic from './images/arrow_right.png';

class PortalDatePicker extends React.Component {
// props: 1. date object which uses for initialization the starting date. it's an optional props.
//        2. handleDateSelection callback function, (mandatory), uses to send back the A. Year as integer, B. the Month as ingeger, and  C. the Day in a month as integer as well.
    constructor(props) {
        super(props);

        
        const today = new Date();
        // let currYear = today.getFullYear();
        // var currYearMonth1 = currYear + '-' + (currMonth<10 ? '0' :'') + currMonth;


        this.state = {
            selectedDate: (this.props.dateInit ? this.props.dateInit : today)
        }

        this.incrementDate = this.incrementDate.bind(this);
        this.decrementDate = this.decrementDate.bind(this);
        
        // console.log ("ddddddd "+this.state.selectedDate);
        // console.log (this.formattedDate(this.today));
    }

    formattedDate(d = new Date) {
        return [d.getDate(), d.getMonth()+1, d.getFullYear()]
            .map(n => n < 10 ? `0${n}` : `${n}`).join('/');
      }

    incrementDate () {
                        this.setState({
                            selectedDate: this.addDays(this.state.selectedDate, 1)
                        }, () => {
                            this.props.handleDateSelection (this.state.selectedDate.getFullYear(),
                                                            this.state.selectedDate.getMonth() + 1,
                                                            this.state.selectedDate.getDate() )
                        })
                           
                     }

    decrementDate () {
                        this.setState({
                            selectedDate: this.subtractDays(this.state.selectedDate, 1)
                            // selectedDate: (this.state.selectedDate - (1000 * 60 * 60 * 24))
                            }, () => {
                                this.props.handleDateSelection (this.state.selectedDate.getFullYear(),
                                                                this.state.selectedDate.getMonth() + 1,
                                                                this.state.selectedDate.getDate() )
                            })
                    }
    
    addDays(date, days) {
                           var result = new Date(date);
                           result.setDate(result.getDate() + days);
                           return result;
                      }

    subtractDays(date, days) {
                           var result = new Date(date);
                           result.setDate(result.getDate() - days);
                           return result;
                      }

    render () {

        const viewSelectedDate = this.formattedDate(this.state.selectedDate) ;
        // console.log (this.formattedDate(this.today));
        return (
            <div className = "datePickingView">
                <div className = "movingBtn">
                    <IncrDecrButton pic={rightBtnPic} text="Previous day" btnClicked={this.incrementDate}/>
                </div>
                <div className = "dateView">
                    {viewSelectedDate}
                </div>                    
                <div className = "movingBtn">
                    <IncrDecrButton pic={leftBtnPic} text="Next day" btnClicked={this.decrementDate}/>
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


export default PortalDatePicker;