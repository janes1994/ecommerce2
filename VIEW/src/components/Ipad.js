import React, {Component} from 'react';
import '../CSS/Ipad.css'
import {NavLink} from 'react-router-dom'

export default class Ipad extends Component {
    render(){
        return(
            <div className="ipad-ipad">
                {/* bawah navbar */}
            <div className="container ipad-container">
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
            </div>
            
            {/* konten */}
            <div className="ipad-content">
                <h1>iPad</h1>
                <p>Like a computer</p>
                <p>Unlike any computer</p>
                {/* <div className="tombol-buy">Buy</div> */}
                <div className="tombol-buy" onClick={() => this.props.setRoute('iPad')}><NavLink exact to="/shop/iPad">Buy ></NavLink></div>
                <img src="/images/ipad3.png" alt="ipad1" />
            </div>

            <div className="ipad-content">
                <h1>iPad Pro</h1>
                <p>Anything you can do,</p>
                <p>You can do better</p>
                <div className="tombol-buy" onClick={() => this.props.setRoute('ipadpro')}><NavLink exact to="/shop/ipadpro">Buy ></NavLink></div>
                <img src="/images/ipad2.png" alt="ipad1" />
            </div>

            <div className="ipad-content-split">
                <div className="ipad-content">
                    <h1>Apple Pencil</h1>
                    <div className="tombol-buy">Buy</div>
                    <img src="/images/pencil3.png" alt="pencil1"/>
                </div>
                <div className="ipad-content">
                    <h1>Smart keyboard</h1>
                    <h1>for apple pro</h1>
                    <div className="tombol-buy">Buy</div>
                    <img src="/images/keyboard4.jpg" alt="keyboard"/>
                </div>
            </div>

            </div>
        )
    }
}