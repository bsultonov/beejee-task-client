import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import {setAlert} from '../../actions/alert';

const EditTask = (props) => {

    const taskId = props.location.state.taskId;
    const [task, setTask] = useState({});
    const [initText, setInitText] = useState('');

    useEffect(() => {
        const fetchTask = async () => {
            const res = await axios.get(`http://localhost:5000/edit/${taskId}`);
            setTask(res.data);
            setInitText(res.data.text);
        }
        fetchTask();
        
    }, []);

    const onChange = (e) => setTask({...task, [e.target.name]: e.target.value});
    const handleClick = (e) => {
        if(e.target.checked){
            setTask({...task, status: 10});
       } else {
            setTask({...task, status: 0});
        }
    };

    const onSubmit = e => {
        e.preventDefault();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
    }
        axios.patch(`http://localhost:5000/edit/${taskId}`, { text: task.text, status: task.status, __v: (initText !== task.text ? 1 : 0) }, config).then(() => {
            props.setAlert('Задача успешно обновлена', 'success');
            props.history.push('/');
        }).catch((err) => {
            props.setAlert('Не удалось сохранить изменения', 'danger');
        })
    }

    return (
        <div>
            <h1 className="large text-primary">
                Редактировать задачу
            </h1>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <h4>Задание</h4>
                    <textarea name="text" cols="30" rows="5" value={task.text} onChange={e => onChange(e)} placeholder="Опишите задание" required></textarea>
                </div>
                <div className="form-group">
                    <h4>Статус</h4>
                    <label className="checkBoxContainer">
                        Выполнено
                        <input type="checkbox" checked={true ? task.status === 10 : 0} onChange = {e => handleClick(e)}/>
                        <span className="checkmark"></span>
                    </label>
                </div>
                
                <input type="submit" className="btn btn-primary my-1" value="Сохранить" />
                <Link to="/" className="btn btn-light my-1">Отменить</Link>
            </form>
        </div>
    )
}

EditTask.propTypes = {
    setAlert: PropTypes.func.isRequired,
}

export default connect(null, { setAlert })(EditTask);