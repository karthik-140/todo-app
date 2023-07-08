import { createSlice } from "@reduxjs/toolkit";

const fetchTodoList = () =>{
    let list = JSON.parse(localStorage.getItem('todoList'));
    if(list){
        return JSON.parse(localStorage.getItem('todoList'));
    }else{
        return [];
    }
}

const todoSlice = createSlice({
    name: "todo",
    initialState: {todoList: fetchTodoList()},
    reducers:{
        addTodo(state, action){
            state.todoList = action.payload.add;
        }
    }
})

export const todoActions = todoSlice.actions;
export default todoSlice;