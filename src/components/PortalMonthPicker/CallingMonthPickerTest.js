import React from 'react';
import './PortalMonthPicker';
import PortalMonthPicker from './PortalMonthPicker';

class CallingCMonthPickerTest extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
          month: 0, // integer as month number (ינואר = 1, פברואר = 2)
          year: 0 // integer as year
        }
        this.handleMothSelection = this.handleMothSelection.bind(this);
    }


    handleMothSelection (month, year) {
        this.setState({
            month: month,
            year: year
        })
    }

    render() {
        return (
            <div>
                <PortalMonthPicker />
            </div>
        )
    }
}

export default CallingCMonthPickerTest;