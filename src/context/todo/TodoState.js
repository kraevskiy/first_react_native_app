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

export const TodoState = ({ children }) => {
  const initialState = {
    todos: [],
    loading: false,
    error: null
  }

  const { changeScreen } = useContext(ScreenContext)

  const [state, dispatch] = useReducer(todoReducer, initialState)

  const addTodo = async title => {
    const response = await fetch('https://react-native-todo-app-40f99-default-rtdb.firebaseio.com/todos.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title })
    })
    const data = await response.json()
    dispatch({ type: ADD_TODO, title, id: data.name })
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
            await fetch(`https://react-native-todo-app-40f99-default-rtdb.firebaseio.com/todos/${id}.json`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json'
              }
            })
            dispatch({ type: REMOVE_TODO, id })
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
      const response = await fetch('https://react-native-todo-app-40f99-default-rtdb.firebaseio.com/todos.json', {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()
      const todos = Object.keys(data).map(key => ({ ...data[key], id: key }))
      dispatch({ type: FETCH_TODOS, todos })
    } catch ( e ) {
      showError('Something went wrong...')
    } finally {
      hideLoader()
    }
  }

  const updateTodo = async (id, title) => {
    clearError()
    try {
      await fetch(`https://react-native-todo-app-40f99-default-rtdb.firebaseio.com/todos/${id}.json`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title })
      })
      dispatch({ type: UPDATE_TODO, id, title })
    } catch ( e ) {
      showError('Something went wrong...')
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
