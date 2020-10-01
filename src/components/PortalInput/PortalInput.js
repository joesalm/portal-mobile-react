import React from 'react';
import './PortalInput.css';


class PortalInput extends React.Component {
    // props: 1. title, string.
    //        2. placeholder, string.
    //        3. handleChange, callback function, invoked when the input changes. sends the new text.

        constructor(props) {
            super(props);

            this.state = {
                selectedText: ""
            }
    
            this.handleChange = this.handleChange.bind(this);
        }
    
        handleChange(event) {
            this.setState(
                {selectedText: event.target.value}
                ,() => {
                    this.props.handleChange(this.state.selectedText);
                }    
            )

        }

        render() {

            const title = this.props.title;
            const placeHolder = this.props.placeholder;

            let  titleView = "";
            if (title) {titleView=
                        <div className = "PortalInputTitle">
                            {title}
                        </div>
                        }

                return (
                    <div className = "PortalInput">
                    {titleView}
                        <div className = "inputText">
                            <input id="inputText1" type="text" placeholder={placeHolder} value={this.state.selectedText} onChange={this.handleChange} />
                        </div>
                    </div>
                )
        }
    }
export default PortalInput;