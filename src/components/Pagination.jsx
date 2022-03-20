import React from 'react'
import { useDispatch } from 'react-redux'
import { todoFetch } from '../store/todoSlice'


function Pagination({listPages, limitItems}) {

    let dispatch = useDispatch()


    const functionPage = (e) => {
        let currentPage = Number(e.target.innerText)
        dispatch(todoFetch({limitItems, currentPage}))
      }

      

  return (
    <ul className='pagination'>
        {listPages.map(item => 
          <li key={Math.random()} onClick={(e) => functionPage(e)} style={{cursor: 'pointer'}}>{item}</li>)}
      </ul>
  )
}

export default Pagination