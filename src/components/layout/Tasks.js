import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from './Pagination';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Tasks = ({auth: {token}}) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState([false]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortField , setSortField] = useState('username');
    const [sortDirection , setSortDirection] = useState('asc')
     
    useEffect(() => {
        const fetchTasks = async () => {
            setLoading(true);
            const res = await axios.get(`https://beejee-task-api.herokuapp.com/?page=${currentPage}&&sortBy=${sortField}:${sortDirection}`);
            setTasks(res.data.message);
            setLoading(false);
        }

        fetchTasks();
    }, [currentPage, sortField, sortDirection])
    if(loading) {
        return <h1>Загрузка...</h1>
    }

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const handleFieldChange = e => {
      setSortField(e.target.value);
    }

    const handleDirectionChange = e => {
      setSortDirection(e.target.value);
    }

// Change page
    return (
        <div className="tasks-container">
          <form>
          <p>Поле, по которому должна быть выполнена сортировка:</p>
            <input type="radio" name="sortField" value="username" checked={sortField === "username"} onChange={e => handleFieldChange(e)} /> Имя пользователя<br />
            <input type="radio" name="sortField" value="email" checked={sortField === "email"} onChange={e => handleFieldChange(e)} /> Email <br />
            <input type="radio" name="sortField" value="status" checked={sortField === "status"} onChange={e => handleFieldChange(e)} /> Статус<br />  
          
          <p>Направление сортировки:</p>
            <input type="radio" name="sortDirection" value="asc" checked={sortDirection === "asc"} onChange={e => handleDirectionChange(e)} /> По возрастанию<br />
            <input type="radio" name="sortDirection" value="desc" checked={sortDirection === "desc"} onChange={e => handleDirectionChange(e)} /> По убыванию<br />
          </form>
          <h2 className="text-primary large my-1">
            Список задач
          </h2>
          {tasks.tasks.map(task => {
            return(
            <div key={task._id} className="done bg-white p-1 my-1">
            <div>
              <h4 className="text-primary medium">{task.username}</h4>
              <h5>{task.email}</h5>
              <p key={task._id}>
                {task.text}
              </p>  
              {task.__v === 0 ? <p></p> : <p className="edited">Отредактировано администратором</p>}
              { token ?
              <div className="btn-edit">
                <Link to={{pathname: "/edit", state: {taskId: task._id}}} className="btn btn-light">Редактировать</Link>
              </div>
              :
              <div></div>
              }        
            </div>
            {task.status ?
            <div>
              <h4 className="text-success text-right">
                Выполнено
              </h4> 
            </div>
            :
            <div></div>
            }
            </div>
            )})}
          <Pagination totalTasks={tasks.total_task_count} currentPage={currentPage} paginate={paginate}/>
        </div>
    )
}

Tasks.prototype = {
  auth: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Tasks);