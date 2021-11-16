import React, { useContext, useReducer } from 'react';
import { TodoContext } from './todoContext';
import { todoReducer } from './todoReducer';
import {
  ADD_TODO,
  CLEAR_ERROR,
  FETCH_TODOS,
  HIDE_LOADER,
  REMOVE_TODO,
  SHOW_ERROR,
  SHOW_LOADER,
  UPDATE_TODO
} from '../types';
import { ScreenContext } from '../screen/screenContext';
import { Alert } from 'react-native';
import { Http } from "../../http";

const ERROR_TEXT = 'Something went wrong...'

export const TodoState = ({ children }) => {
  const initialState = {
    todos: [],
    loading: false,
    error: null
  }

  const { changeScreen } = useContext(ScreenContext)

  const [state, dispatch] = useReducer(todoReducer, initialState)

  const addTodo = async title => {
    try {
      const url = 'https://react-native-todo-app-40f99-default-rtdb.firebaseio.com/todos.json'
      const data = await Http.post(url, { title })
      dispatch({ type: ADD_TODO, title, id: data.name })
    } catch ( e ) {
      showError(`${ERROR_TEXT} addTodo()`)
    }
  }

  const removeTodo = id => {
    const todo = state.todos.find(t => t.id === id)
    Alert.alert(
      "Delete Todo",
      `Are you here ${todo.title}`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: 'OK',
          style: 'destructive',
          onPress: async () => {
            changeScreen(null)
            try {
              const url = `https://react-native-todo-app-40f99-default-rtdb.firebaseio.com/todos/${id}.json`
              await Http.delete(url)
              dispatch({ type: REMOVE_TODO, id })
            } catch ( e ) {
              showError(`${ERROR_TEXT} removeTodo()`)
            }
          }
        }
      ],
      {
        cancelable: false,
        onDismiss: () =>
          Alert.alert(
            "This alert was dismissed by tapping outside of the alert dialog."
          ),
      }
    )
  }

  const fetchTodos = async () => {
    showLoader()
    clearError()
    try {
      const url = 'https://react-native-todo-app-40f99-default-rtdb.firebaseio.com/todos.json'
      const data = await Http.get(url)
      const todos = Object.keys(data).map(key => ({ ...data[key], id: key }))
      dispatch({ type: FETCH_TODOS, todos })
    } catch ( e ) {
      showError(`${ERROR_TEXT} fetchTodos()`)
    } finally {
      hideLoader()
    }
  }

  const updateTodo = async (id, title) => {
    clearError()
    try {
      const url = `https://react-native-todo-app-40f99-default-rtdb.firebaseio.com/todos/${id}.json`
      await Http.patch(url, { title })
      dispatch({ type: UPDATE_TODO, id, title })
    } catch ( e ) {
      showError(`${ERROR_TEXT} updateTodo()`)
    }
  }

  const showLoader = () => dispatch({ type: SHOW_LOADER })

  const hideLoader = () => dispatch({ type: HIDE_LOADER })

  const showError = error => dispatch({ type: SHOW_ERROR, error })

  const clearError = () => dispatch({ type: CLEAR_ERROR })

  return <TodoContext.Provider
    value={{
      todos: state.todos,
      loading: state.loading,
      error: state.error,
      addTodo,
      removeTodo,
      updateTodo,
      fetchTodos
    }}
  >
    {children}
  </TodoContext.Provider>
}
