import React, { useState } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../actions/auth';
import { Redirect } from 'react-router-dom';

const Login = ({login, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    
    const { username, password } = formData;

    const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});
    const onSubmit = async e => {
        e.preventDefault();
        const admin = {
            username,
            password
        }
        login(admin);
    }

    // Redirect if logged in
    if(isAuthenticated) {
        return <Redirect to="/" />
    }
    return (
        <div>
            <h1 className="large text-primary">Вход</h1>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <h4>Логин</h4>
                    <input type="text" placeholder="Введите логин" name="username" value={username} onChange={e => onChange(e)} required />
                </div>
                <div className="form-group">
                    <h4>Пароль</h4>
                    <input type="password" placeholder="Введите пароль" name="password" value={password} onChange={e => onChange(e)} required />
                </div>
                <input type="submit" className="btn btn-primary" value="Войти" />
            </form>
        </div>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);