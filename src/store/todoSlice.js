import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const todoFetch = createAsyncThunk(
    'todo/todoFetch',
    async (info, {rejectWithValue}) => {
        try {
            let response = await axios('https://jsonplaceholder.typicode.com/todos', {
            params: {
                _limit: info.limitItems,
                _page: info.currentPage
            }
            })

            return response
        } catch (error) {
            return rejectWithValue(error)
        }
    }
  )

  export const completedFetch = createAsyncThunk(
      'todo/completedFetch',
      async (id, {dispatch}) => {
        let response = await axios.patch(`https://jsonplaceholder.typicode.com/todos/${id}`, {completed: true})
        dispatch(todoReady(id))
      }
      
  )

 const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        list: [],
        listCopy: [],
        currentPage: 1,
        totalPosts: '0',
        status: '',
        error: ''
    },

    extraReducers: {
        [todoFetch.fulfilled]: (state, action) => {
            state.list = []
            state.listCopy= []
            state.status = 'fulfilled'
            state.list = action.payload.data
            state.listCopy = action.payload.data
            state.totalPosts = action.payload.headers['x-total-count'];
        },
        [todoFetch.rejected]: (state, action) => {
            state.error = action.payload.message
            state.status = 'rejected'
        }
    },

    reducers: {

        todoAdd: (state, action) => {
            state.list.unshift(action.payload);
            state.listCopy.unshift(action.payload);
        },

        todoReady: (state, action) => {
            state.list.filter(item => {
                if(item.id === action.payload) {
                    item.completed = true
                }  
            })
            state.listCopy.filter(item => {
                if(item.id === action.payload) {
                    item.completed = true
                }  
            })
        }, 

        todoSelect: (state, action) => {
            switch(action.payload) {
                case 'all': 
                    state.list = state.listCopy
                    break
                case 'ready':
                    let foundItem = state.listCopy.filter(item => item.completed === true)
                    state.list = []
                    foundItem.forEach(item => state.list.push(item))
                    break
                case 'not-ready':
                    let notFoundItem = state.listCopy.filter(item => item.completed === false)
                    state.list = []
                    notFoundItem.forEach(item => state.list.push(item))
                    break
                default:
                    return('some error')  
            }
        },

        deleteItem: (state) => {
            let items = state.list.filter(item => item.completed === false)
            state.list = items
            let itemsCopyList = state.listCopy.filter(item => item.completed === false)
            state.listCopy = itemsCopyList
        },

        clearList: (state) => {
            state.list = []
            state.listCopy= []
        },
    }
})

export const { 
    todoAdd,
    todoReady,
    todoSelect,
    deleteItem,
    clearList,
    setCurrentPage,
} = todoSlice.actions

export default todoSlice.reducer
