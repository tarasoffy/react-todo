import React from 'react'
import { useSelector } from 'react-redux';
import ListItem from './ListItem';


function List() {

  let list = useSelector(item => item.todo.list);

  return (
    <ul>
        {list.length ?
        list.map(item => 
             <ListItem key={item.id} item ={item} /> 
        ):
        <h2 style={{color: 'lightgrey'}}>
          Список задач пуст !
        </h2>
      }
      </ul>
  )
}

export default List