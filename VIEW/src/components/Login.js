import React, {Component} from 'react';
import '../CSS/Login.css'
import { NavLink } from 'react-router-dom';

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            kataSandi: '',
            username: '',
            id: null,
            loginSuccess: false,
        }
    }

    handleLoginInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]:value})
    }

    fetchData = (e) => {
        e.preventDefault();
        const data = {
            email: this.state.email,
            kataSandi: this.state.kataSandi
        }

        fetch(`http://localhost:5000/login`,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            // .then(res => this.props.setUsername(res.username))
            .then(res =>  this.setState({
                loginSuccess: res.message,
                username: res.username,
                id: res.id
            }))
            .catch(err => console.log(err))
        }

    
    render(){
        if (this.state.loginSuccess) {
            return <LoginSuccess username={this.state.username} id={this.state.id} setUsername={this.props.setUsername}/>
        }
        return(
            <div className="login-page">
                <div className="login-head">
                    <h1>Masuk</h1>
                    {/* <p>Belum punya akun ?<NavLink exact to="/register"> Daftar</NavLink></p> */}
                    <p>Belum punya akun ?<NavLink exact to="/register2"> Daftar</NavLink></p>
                </div>

                <form className="login-form" onSubmit={this.fetchData}>
                    <label>Email</label><br/>
                    <input type="text" name="email" value={this.state.email} onChange={this.handleLoginInput} /><br/>

                    <label>Kata Sandi</label><br/>
                    <input type="password" name="kataSandi" value={this.state.kataSandi} onChange={this.handleLoginInput}/><br/>
                    
                    <div className="remember">
                        <input type="checkbox"/>
                        <span>Ingat saya</span><br/>
                    </div>

                    <input type="submit" value="Masuk"/>
                </form>
                
            </div>
        )
    }
}

const LoginSuccess = (props) => {
    return(
        <div className="register-page">
            <h1>Login Berhasil</h1>
            <NavLink exact to="/" onClick={() =>props.setUsername(props.username, props.id)}>Selamat datang {props.username}</NavLink>
        </div>
    )
}