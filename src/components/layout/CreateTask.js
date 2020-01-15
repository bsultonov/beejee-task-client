import React, { useState } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {setAlert} from '../../actions/alert';
import axios from 'axios';

const CreateTask = (props) => {

    const [formTask, setFormTask] = useState({
        username: '',
        email: '',
        text: ''
    });

    const { username, email, text } = formTask;

    const onChange = (e) => setFormTask({...formTask, [e.target.name]: e.target.value});
    const onSubmit = async e => {
        e.preventDefault();

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const task = {
            username,
            email,
            text
        }

        try{
            const res = await axios.post('http://localhost:5000/create', JSON.stringify(task), config);
            if(res.data.status === 'ok'){
                props.setAlert('Задача успешно добавлена', 'success');
                props.history.push('/');
            } else {
                props.setAlert('Задача не добавлена', 'danger');
            }
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div>
            <h1 className="large text-primary">
                Создать задачу
            </h1>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <h4>Имя пользователя</h4>
                    <input type="text" placeholder="Андрей" name="username" value={username} onChange={e => onChange(e)} required />
                </div>
                <div className="form-group">
                    <h4>E-mail</h4>
                    <input type="email" placeholder="example@mail.com" name="email" value={email} onChange={e => onChange(e)} required />
                </div>
                <div className="form-group">
                    <h4>Задание</h4>
                    <textarea name="text" cols="30" rows="5" placeholder="Опишите задание" value={text} onChange={e => onChange(e)}></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" value="Сохранить" />
                <Link to="/" className="btn btn-light my-1">Отменить</Link>
            </form>
        </div>
    )
}

CreateTask.propTypes = {
    setAlert: PropTypes.func.isRequired,
}

export default connect(null, { setAlert })(CreateTask);