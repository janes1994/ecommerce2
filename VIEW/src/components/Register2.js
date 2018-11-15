import React, {Component} from 'react';
import '../CSS/Register.css'
import { NavLink } from 'react-router-dom';

export default class Register2 extends Component {
    state = {
        registerFinish: false,
        email: '',
        username: '',
        nomorPonsel: '',
        kataSandi: '',
        formErrors: {email: '', username: '', nomorPonsel: '', kataSandi: ''},
        emailValid: false,
        usernameValid: false,
        nomorPonselValid: false,
        kataSandiValid: false,
        enableSubmit: false,
        serverValidationEmail: ''
    }

    handleUserInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]: value}, () => this.validateField(name, value));
    }

    validateField = (fieldName, value) => {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let usernameValid = this.state.usernameValid;
        let nomorPonselValid = this.state.nomorPonselValid;
        let kataSandiValid = this.state.kataSandiValid;

        switch(fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                if (emailValid) {
                    this.cekserver();
                }
                fieldValidationErrors.email = emailValid ? '' : 'karakter yang dimasukan tidak sesuai';
                break;
            case 'username':
                usernameValid = value.length >= 6;
                fieldValidationErrors.username = usernameValid ? '' : 'minimal enam karakter'
                break;
            case 'nomorPonsel':
                nomorPonselValid = value.length >= 6;
                fieldValidationErrors.nomorPonsel = nomorPonselValid ? '' : 'tidak valid'
                break;
            case 'kataSandi':
                kataSandiValid = value.length >= 6;
                fieldValidationErrors.kataSandi = kataSandiValid ? '' : 'tidak valid'
                break;
            default:
                break;
        }

        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid,
            usernameValid: usernameValid,
            nomorPonselValid: nomorPonselValid,
            kataSandiValid: kataSandiValid 
        }, this.validateForm);
    }    

    cekserver = () => {
        let data = {email: this.state.email}
        
        fetch(`http://localhost:5000/register`,{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(response => this.setState({serverValidationEmail: response.message}))
        .catch(err => console.log(err))
    }
    
    validateForm = () => {
        let {emailValid, usernameValid, nomorPonselValid, kataSandiValid} = this.state;
        this.setState({
            enableSubmit: emailValid && usernameValid && nomorPonselValid && kataSandiValid  
        })
    }

    componentDidUpdate(){
        console.log(this.state.enableSubmit)
    }

    setRegister = (event) => {
        event.preventDefault();
        this.setState({registerFinish: !this.state.registerFinish});

        let data = {
            email: this.state.email,
            username: this.state.username,
            nomorPonsel: this.state.nomorPonsel,
            kataSandi: this.state.kataSandi
        }

        fetch(`http://localhost:5000/inserting`,{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .catch(err => console.log(err))

    }

    render(){
        if(this.state.registerFinish === false) {
            return(
                <div className="register-page">   
                    <RegisterStepSatu
                        setRegister={this.setRegister}
                        value={this.state.email} 
                        username={this.state.username}
                        nomorPonsel={this.state.nomorPonsel}
                        kataSandi={this.state.kataSandi}
                        handleUserInput={this.handleUserInput}
                        errorMessages={this.state.formErrors} 
                        enableSubmit={this.state.enableSubmit}
                        serverValidation={this.state.serverValidationEmail}
                    /> 
                </div>
                )
            }
            return (
                <LoginSuccess/>
            )
    }
}

const RegisterStepSatu = (props) => {
    
    return (
        <div className="register-page-email">
            <div className="register-head">
                <h1>Daftar Sekarang</h1>
                <span>Sudah punya akun ? <NavLink exact to="login">Masuk</NavLink></span>
            </div>

            <form className="register-form" onSubmit={props.setRegister}>
                
                <label htmlFor="email">Email</label><br/>
                <input name="email" type="email" value={props.value} onChange={props.handleUserInput}/><br/>
                {props.errorMessages.email && props.value !== '' ? <p className="error-message">{props.errorMessages.email}</p> : ''}
                {/* {props.value !== '' && props.errorMessages.email === '' ? <p className="error-message">{props.serverValidation}</p> : ''} */}

                <label htmlFor="username">Name Lengkap</label><br/>
                <input name="username" type="text" value={props.username} onChange={props.handleUserInput}/><br/>
                {props.errorMessages.username && props.value !== '' ? <p className="error-message">{props.errorMessages.username}</p> : ''}


                <label>Nomor Ponsel</label><br/>
                <input name="nomorPonsel" type="number" value={props.nomorPonsel} onChange={props.handleUserInput}/><br/>
                {props.errorMessages.nomorPonsel ? <p className="error-message">{props.errorMessages.nomorPonsel}</p> : ''}
                <p>Contoh: 08XXXXXXXXXX</p>


                <label>Kata Sandi</label><br/>
                <input name="kataSandi" type="text" value={props.kataSandi} onChange={props.handleUserInput} /><br/>
                {props.errorMessages.kataSandi !== '' ? <p className="error-message">{props.errorMessages.kataSandi}</p> : ''}
                <p>Contoh: Minimum 6 karakter</p>

                <input type="submit" value="Daftar" disabled={props.enableSubmit ? false : true}/>
            </form>
        </div>
    )
}

const LoginSuccess = () => {
    return(
        <div className="register-page">
            <h1>Pendaftaran Berhasil</h1>
            <span>Silahkan Login <NavLink exact to="login" >Login</NavLink></span>
        </div>
    )
}