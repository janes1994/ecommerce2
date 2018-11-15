import React, {Component} from 'react';
import '../CSS/Register.css'
import { NavLink } from 'react-router-dom';


export default class Register extends Component {
    state = {
        step: false,
        registerFinish: false,
        email: '',
        namaLengkap: '',
        nomorPonsel: '',
        kataSandi: '',
        formErrors: {email: '', namaLengkap: '', nomorPonsel: '', kataSandi: ''},
        emailValid: false,
        namaLengkapValid: false,
        nomorPonselValid: false,
        kataSandiValid: false,
        enableSubmit: false,
    }

    handleUserInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]: value}, () => this.validateField(name, value));
    }

    validateField = (fieldName, value) => {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let namaLengkapValid = this.state.namaLengkapValid;
        let nomorPonselValid = this.state.nomorPonselValid;
        let kataSandiValid = this.state.kataSandiValid;

        switch(fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : 'tidak valid';
                break;
            case 'namaLengkap':
                namaLengkapValid = value.length >= 6;
                fieldValidationErrors.namaLengkap = namaLengkapValid ? '' : 'tidak valid'
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
            namaLengkapValid: namaLengkapValid,
            nomorPonselValid: nomorPonselValid,
            kataSandiValid: kataSandiValid 
        }, this.validateForm);
    }    
    
    validateForm = () => {
        let {emailValid, namaLengkapValid, nomorPonselValid, kataSandiValid} = this.state;
        this.setState({
            enableSubmit: emailValid && namaLengkapValid && nomorPonselValid && kataSandiValid  
        })
    }

    setStep = (event) => {
        event.preventDefault();
        this.setState({step: !this.state.step})
    }

    setRegister = (event) => {
        event.preventDefault();
        this.setState({registerFinish: !this.state.registerFinish})
    }

    render(){
        if(this.state.registerFinish === false) {
            if (this.state.step === false) {
                return(
                    <div className="register-page">   
                        <RegisterStepSatu
                            setStep={this.setStep} 
                            value={this.state.email} 
                            handleUserInput={this.handleUserInput}
                            errorMessages={this.state.formErrors} 
                            enableSubmit={this.state.enableSubmit}
                        /> 
                    </div>
                )
            }
            return(
                <div className="register-page">
                    <RegisterStepDua setRegister={this.setRegister}/>
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

            <form className="register-form" onSubmit={props.setStep}>
                <label htmlFor="email">Email</label><br/>
                <input name="email" type="email" value={props.value} onChange={props.handleUserInput}/><br/>
                <p className="error-messages">{props.errorMessages.emailValid}</p>

                <input type="submit" value="Daftar"/>
            </form>
        </div>
    )
}

const RegisterStepDua = (props) => {
    return(
        <div className="register-page-lengkap">
            <div className="register-head">
                <h3>Daftar dengan Email</h3>
                <span>yanesreksandi@gmail.com <NavLink exact to="login">Ubah</NavLink></span>
            </div>
            <form className="register-form" onSubmit={(e) => props.setRegister(e)}>
                <label>Name Lengkap</label><br/>
                <input type="text"></input><br/>

                <label>Nomor Ponsel</label><br/>
                <input type="number"></input><br/>
                <p>Contoh: 08XXXXXXXXXX</p>

                <label>Kata Sandi</label><br/>
                <input type="text"></input><br/>
                <p>Contoh: Minimum 6 karakter</p>

                <input type="submit" value="Selesai"/>
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