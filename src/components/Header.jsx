import {React, useState} from 'react'
import { useDispatch } from 'react-redux';
import { todoAdd } from '../store/todoSlice';
import Button from './UI/button/Button';

function Header() {

    let [inputValue, setInputValue] = useState('');

    let dispatch = useDispatch()

    const addToList = (e) => {
        e.preventDefault()
        if(inputValue.trim().length) {
          let newTask ={
            id: Date.now(),
            title: inputValue,
            completed: false
          }
          dispatch(todoAdd(newTask))
        } else {
          alert('Заполните поле ввода')
        }
        setInputValue('')
      }

  return (
    <form>
        <label htmlFor="taskInput">Добавить задачу: </label>
        <input type="text" id='taskInput' style={{height: '18px'}} onChange={(e) => setInputValue(e.target.value)} value={inputValue}/>
        <Button onClick={addToList}>Добавить</Button>
    </form>
  )
}

export default Header