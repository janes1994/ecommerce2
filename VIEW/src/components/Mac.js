import React, { Component } from "react";
import '../CSS/Mac.css'
import MacImage from "./MacImage";

class Mac extends Component {
    constructor() {
        super();
            this.state = {
                nextState: false
            };
    }
    
    nextButton = () => {
        this.setState({nextState: !this.nextState})

        if (this.state.nextState === false) {
            this.prevElement.style.display = "none"
        } else {
            this.prevElement.style.display = "block"
        }

        let size = 10;
        this.containerElement.style.right += size + "%"
        // console.log(this.containerElement.style.right)
    }
    render() {
        return(
            <div>
            <div className="container" ref={(input) => this.containerElement = input}>
        <div className="slide">
            <i className="material-icons">laptop</i>
            <span>Macbook</span>
        </div>
        <div className="slide">
            <i className="material-icons">laptop_windows</i>
            <span>Macbook Air</span>
        </div>
        <div className="slide">
            <i className="material-icons">laptop_chromebook</i>
            <span>Macbook pro</span>
        </div>
        <div className="slide">
            <i className="material-icons">desktop_mac</i>
            <span>iMac</span>
        </div>
        <div className="slide">
            <i className="material-icons">desktop_mac</i>
            <span>iMac Pro</span>
        </div>
        <div className="slide">
            <i className="material-icons">tv</i>
            <span>Mac Pro</span>
        </div>
        <div className="slide">
            <i className="material-icons">tablet_mac</i>
            <span>Mac mini</span>
        </div>
        <div className="slide">
            <i className="material-icons">desktop_mac</i>
            <span>Accessories</span>
        </div>
        <div className="slide">
            <i className="material-icons">desktop_mac</i>
            <span>High Sierra</span>
        </div>
        <div className="slide">
            <i className="material-icons">desktop_mac</i>
            <span>Compare</span>
        </div>
    </div>
    
        <div className="next" onClick={this.nextButton.bind(this)} ref={(input) => this.nextElement = input}>
            <div className="nextButton">&#10095;</div>
        </div>

        <div className="prev" ref={(input) => this.prevElement = input}>
            <div className="prevButton">&#10094;</div>
        </div>
            
        <MacImage setRoute={this.props.setRoute}/>

    </div>
        )
    }
}

export default Mac;