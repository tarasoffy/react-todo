import {React, useEffect, Suspense, lazy, useState}  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearList, deleteItem, todoFetch } from './store/todoSlice';
import './styles/App.css'
import Header from './components/Header';
import Filter from './components/Filter';
import Button from './components/UI/button/Button';
import Loader from './components/Loader';
import Pagination from './components/Pagination';



const List = lazy(() => import('./components/List'));

const limitItems = 10;


function App() {

  let totalPost = useSelector(item => item.todo.totalPosts);

  let currentPage = useSelector(item => item.todo.currentPage);

  let {status, error} = useSelector(item=> item.todo);

  let dispatch = useDispatch()

  let [pages, setPages] = useState([]);

  let listPages = pages;


  useEffect(() => {
    let pages = Math.ceil(totalPost/limitItems);

    let listUpdate = []
    
    for(let i=0; i < pages; i++) {
      listUpdate.push(i + 1)
    }
    setPages(listUpdate)
  },[totalPost])


  useEffect(() => {
    dispatch(todoFetch({limitItems, currentPage}))
  },[])


  const delItem = () => {
    dispatch(deleteItem())
  }

  const clearListItems = () => {
    dispatch(clearList())
  }


  return (
    <div className='wrapper'>
      <Header />
      <Filter />
      <Button onClick={delItem}>Удалить выполненные</Button>
      <Button color={'red'} onClick={clearListItems}>Очистить список</Button>
      <Suspense fallback={<Loader/>}>
        {status === 'rejected' && <h2>{error}</h2>}
        <List />
        <Pagination listPages={listPages} limitItems={limitItems}/>
      </Suspense>
      
    </div>
  );
}

export default App;
