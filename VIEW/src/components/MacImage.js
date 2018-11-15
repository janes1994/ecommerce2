import React, {Component} from 'react';
import '../CSS/MacImage.css';
import { NavLink } from 'react-router-dom';

export default class MacImage extends Component {
    
    render(){
        return(
            <div className="mac-image">

                <div className="mac-image-content mac-image-content1">
                    <div className="mac-content-tag">
                        <h1>MacBook Pro</h1>
                        <h3>More power. More performance. More pro.</h3>
                        <NavLink exact to="/shop/macbook-pro"><span onClick={() => this.props.setRoute('MacBook Pro')}>Buy &#62;</span></NavLink>
                    </div>
                    <img src="/images/macbook6.jpg" alt="macbook1"></img>
                </div>

                <div className="mac-image-content mac-image-content2">
                    <div className="mac-content-tag">
                        <h1>iMac Pro</h1>
                        <h3>Power to the pro</h3>
                        <NavLink exact to="/shop/iMac Pro"><span onClick={() => this.props.setRoute('iMac Pro')}>Buy &#62;</span></NavLink>
                    </div>
                    <img src="/images/imacpro.png" alt="imacpro"></img>
                </div>

                <div className="mac-image-content mac-image-content3">
                    <div className="mac-content-tag">
                        <h1>iMac</h1>
                        <h3>The vision is brighter than ever</h3>
                        <NavLink exact to="/shop/iMac 21.5-inch"><span onClick={() => this.props.setRoute('iMac 21.5-inch')}>Buy &#62;</span></NavLink>                        
                    </div>
                    <img src="/images/imac.jpg" alt="imac"></img>
                </div>

                <div className="mac-image-content mac-image-content4">
                    <div className="mac-content-tag">
                        <h1>MacBook</h1>
                        <h3>Light. Years ahead.</h3>
                        <NavLink exact to="/shop/MacBook"><span onClick={() => this.props.setRoute('MacBook')}>Buy &#62;</span></NavLink>                                                
                    </div>
                    <img src="/images/macbook12.jpg" alt="macbook"></img>
                </div>

            </div>
        )
    }
}
