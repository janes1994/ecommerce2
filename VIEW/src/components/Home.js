import React, {Component} from "react";
import "../CSS/Home.css";
import { NavLink, Link } from 'react-router-dom';

export default class Home extends Component {

    render(){
    return (
        <div>
            <section className="content one">
                    <h2>iPhone X</h2>
                    <h4>Say hello to the future</h4>
                    <span>Learn more ></span>
                    {/* {
                        this.props.session !== null ? 
                        <span onClick={() => this.props.setRoute('iphoneX')}><Link to="/shop/iphonex">Buy ></Link></span> :
                        <span onClick={() => this.props.setRoute('/login')}><Link to="/login">Buy ></Link></span>
                    } */}

                    {
                        this.props.session ? 
                        <span onClick={() => this.props.setRoute('iphoneX')}><Link to="/shop/iphonex">Buy ></Link></span> :
                        <span onClick={() => this.props.setRoute('/login')}><Link to="/login">Buy ></Link></span>
                    }

                    <img src={require('../images/iphonex.png')} className="mobile" alt="iphonex"></img>
                    <img src={require('../images/iphonexbig.jpg')} className="desktop" alt="iphonex"></img>
                </section>
                
                <section className="content three">
                    <div className="tag">
                        <h2>MacBook Pro</h2>
                        <h4>More power. More performance. More pro.</h4>
                        <span>Learn more ></span>
                        <span onClick={() => this.props.setRoute('MacBook Pro')}><NavLink exact to="/shop/macbook-pro">Buy ></NavLink></span>
                    </div>
                    <img src={require('../images/anthony-garand-509726-unsplash.jpg')} alt="iphonex"></img>
                </section>


                <section className="content four">
                    <div className="tag">
                        <h2>iPhone 8</h2>
                        <h4>A new generation of iPhone</h4>
                        <span>Learn more ></span>
                        <span onClick={() => this.props.setRoute('iPhone8')}><NavLink exact to="/shop/iPhone8">Buy ></NavLink></span>
                    </div>
                    <img src={require('../images/iphone8.jpeg')} alt="iphonex"></img>
                </section>

                <section className="content five">
                    <h2>AirPods</h2>
                    <h4>Wireless. Effortless. Magical</h4>
                    <span>Learn more ></span>
                    <span onClick={() => this.props.setRoute('AirPods')}><NavLink exact to="/shop/AirPods">Buy ></NavLink></span>
                    <img src={require('../images/airpod.jpg')} alt="iphonex"></img>
                </section>

                <section className="content two">
                    <div className="tag">
                        <h2>iPad</h2>
                        <h4>Like a computer. Unlike any computer</h4>
                        <span>Learn more ></span>
                        <span onClick={() => this.props.setRoute('iPad')}><NavLink exact to="/shop/iPad">Buy ></NavLink></span>
                    </div>
                    <img src={require('../images/ipad.png')} alt="iphonex"></img>
                </section>

                <section className="content six">
                    <div className="tag">
                        <h2>WATCH</h2>
                        <h4>The freedom of cellular</h4>
                        <span>Learn more ></span>
                        <span onClick={() => this.props.setRoute('AppleWatch')}><NavLink exact to="/shop/AppleWatch">Buy ></NavLink></span>
                    </div>
                    <img src={require('../images/watch.jpg')} alt="iphonex"></img>
                </section>
        </div>
    )
    }
}

 
    
