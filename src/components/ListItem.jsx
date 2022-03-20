import React from 'react'
import { useDispatch } from 'react-redux';
import { completedFetch } from '../store/todoSlice';
import Button from './UI/button/Button';

function ListItem({item}) {

    let dispatch = useDispatch()

    const stateRedy = (id) => {
        dispatch(completedFetch(id))
      }

  return (
    <li >{ '- ' + item.title} {
        item.completed ? <Button disabled>Сделано</Button> :
        <Button onClick={() => stateRedy(item.id)}>Готово</Button>
      } </li>
  )
}

export default ListItem