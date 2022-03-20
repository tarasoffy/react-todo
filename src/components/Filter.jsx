import {React, useState}  from 'react';
import { todoSelect } from '../store/todoSlice';
import { useDispatch } from 'react-redux';
import '../styles/Filter.css'

function Filter() {

    let dispatch = useDispatch()

    let [selectValue, setSelectValue] = useState('all');

    const selectedValue = (value) => {
        setSelectValue(value)
        dispatch(todoSelect(value))
      }

  return (
    <div className='wrapper'>
    <label htmlFor="filterSelect">Фильтрация: </label>
      <select value={selectValue} id="filterSelect" onChange={(e) => {selectedValue(e.target.value)}}>
        <option value="all">Все</option>
        <option value="ready">Выполненные</option>
        <option value="not-ready">Не выполненные</option>
      </select>
    </div>
  )
}

export default Filter