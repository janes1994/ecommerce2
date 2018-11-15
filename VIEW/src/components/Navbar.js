import React, { Component } from 'react';

import { NavLink, Switch, Route } from 'react-router-dom';
import "../CSS/Navbar.css";

import Home from './Home';
import Mac from './Mac';
import Ipad from './Ipad';
import Iphone from './Iphone';
import Watch from './Watch';
import TV from './TV';
import Music from './Music';
import Support from './Support';

import Shop from './Shop';
import Login from './Login'
// import Register from './Register'
import Register2 from './Register2'
// import Checkout from './Checkout'
import Checkout2 from './Checkout2'
import Admin from './Admin'

export default class Navbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            route: '',
            username: localStorage.getItem('user'),
            id: null,
            price: null
        }
        this.loginpop = React.createRef();
    }

    setPrice = (arg) => this.setState({price: arg})

    setRoute = (arg) => this.setState({route: arg})

    showlogin = () => {
        let loginpop = this.loginpop.current;
        if (loginpop.style.display === "none") {
            loginpop.style.display = "block"
        } else {
            loginpop.style.display = "none"
        }
    }


    setUsername = (arg, id) => {
        localStorage.setItem('user', arg);
        this.setState({
            username: localStorage.getItem('user'),
            id: id
        })
    }


    signout = () => {
        localStorage.removeItem('user');
        this.setState({username: null})
    }

    componentDidUpdate(){
        this.loginpop.current.style.display = "none";
    }

    render() {
        return (  
            <div>
        <div className="nav">
            <div className="burger">
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
            </div>
            
            <div className="logo">
                <NavLink exact to="/"><i className="material-icons">android</i></NavLink>             
            </div>
            
            <div className="bag">
                <i className="material-icons">add_shopping_cart</i>
            </div>
        </div>

        <div className="searchnav">
            <input type="text" placeholder="Search apple.com"></input>
            <div className="cancelsearch"><span>Cancel</span></div>
                
            <hr/>
            <div className="quicklinks">
                <span>Find a Store <hr/></span>
                <span>Accessories <hr/></span>
                <span>iPod <hr/></span>
                <span>iOS <hr/></span>
                <span>Gift Cards <hr/></span>
            </div>
        </div>
        
        <div className="navlist">
            <NavLink exact to="/mac">Mac</NavLink>             
            <NavLink exact to="/ipad">iPad</NavLink>             
            <NavLink exact to="/iphone">iPhone</NavLink>             
            <NavLink exact to="/watch">Watch</NavLink>             
            <NavLink exact to="/tv">TV</NavLink>                         
            <NavLink exact to="/music">Music</NavLink>                                   
            <NavLink exact to="/support">support</NavLink>                                               
        </div>

        <div className="logo login-logo">
            <i onClick={this.showlogin} className="material-icons">account_box</i>
            <div ref={this.loginpop} className="login-logo-pop">
                <ul>
                    {this.state.username === null ? <li><p>Guests</p></li> : <li><p>{this.state.username}</p></li>}
                    <li><i className="material-icons">shopping_cart</i>Bag</li>                
                    <li><i className="material-icons">card_giftcard</i>Orders</li>
                    <li><i className="material-icons">settings</i>Account</li>
                    {
                        this.state.username === null ? 
                        <NavLink exact to="/login"><li><i className="material-icons">account_circle</i>Sign in</li></NavLink>
                        :
                        <NavLink exact to="/"><li onClick={this.signout}><i className="material-icons">account_circle</i>Sign Out</li></NavLink>
                    }
                </ul>
            </div>
        </div>

        <div className="bagnotif">
            <h2>Your bag is empty</h2><hr/>
                    
            <i className="material-icons">add_shopping_cart</i>
            <span>Bag <hr/></span>

            <i className="material-icons">favorite_border</i>
            <span>Favorites <hr/></span>

            <i className="material-icons">account_box</i>
            <span>Orders <hr/></span>

            <i className="material-icons">build</i>
            <span>Account <hr/></span>

            <i className="material-icons">face</i>
            <span>Sign in <hr/></span>
        </div>

        <Switch>
            <Route exact path="/" render={() => <Home setRoute={this.setRoute} session={this.state.username}/>}></Route>
            <Route exact path="/mac" render={() => <Mac setRoute={this.setRoute}/>}></Route>
            <Route exact path="/ipad" render={() => <Ipad setRoute={this.setRoute}/>}></Route>
            <Route exact path="/iphone" component={Iphone}></Route>
            <Route exact path="/watch" component={Watch}></Route>
            <Route exact path="/tv" component={TV}></Route>
            <Route exact path="/music" component={Music}></Route>
            <Route exact path="/support" component={Support}></Route>

            <Route exact path="/login" render={() => <Login setUsername={this.setUsername} />}></Route>
            <Route exact path="/register2" component={Register2}></Route>
            {/* <Route exact path="/checkout" component={Checkout}></Route> */}
            <Route exact path="/checkout2" render={() => <Checkout2 username={this.state.username} id={this.state.id} price={this.state.price}/>}></Route>

            <Route exact path="/administrator" component={Admin}></Route>

            <Route exact path="/shop/:products" render={() => <Shop route={this.state.route} setPrice={this.setPrice}/>}></Route>
            
        </Switch>

        </div>
        );
    }
}
