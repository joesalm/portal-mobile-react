import React, { Component } from 'react';
import './UsersButtonSetComp.css'


class UsersButtonSetComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            btnIndex: 0,
        }
    }

    handleSelect(selectedIndex) {
        // 1) update state
        this.setState({
            btnIndex: selectedIndex
        })

        // 2) notify parent on new selected button
        this.props.handleClick(selectedIndex);
    }


    render() {
        const {  btnNames, } = this.props

        const newBtnUI = btnNames.map((btnName, index) => {
            // The map function takes a btnName and creates a span out of it
            // It also checks if the current button is the selected one
            // if so it addes a class

            let classNames = "";
            if (index === this.state.btnIndex) {
                classNames += "btnSelected";
            }

            return (
                <span
                    className={classNames}
                    key={index}
                    onClick={() => this.handleSelect(index)}

                >
                    {btnName}
                </span>
            );
        });


        return (
            <div className="c-usersButtonSetComp">
                {newBtnUI}
            </div>
        );
    }
}

export default UsersButtonSetComp;