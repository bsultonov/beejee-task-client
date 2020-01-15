import React from 'react'

const Sort = () => {
    return (
        <div>
        <form>
        <p>Поле, по которому должна быть выполнена сортировка:</p>
          <input type="radio" name="sortField" value="username" defaultChecked /> Имя пользователя<br />
          <input type="radio" name="sortField" value="email" /> Email <br />
          <input type="radio" name="sortField" value="status" /> Статус<br />  
        
        <p>Направление сортировки:</p>
          <input type="radio" name="sortDirection" value="asc" defaultChecked /> По возрастанию<br />
          <input type="radio" name="sortDirection" value="desc" /> По убыванию<br />
        
          <input className="btn btn-success" type="submit" value="Сортировать" />
        </form>
        </div>
    )
}

export default Sort
