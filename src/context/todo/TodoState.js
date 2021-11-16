import React, { useContext, useReducer } from 'react';
import { TodoContext } from './todoContext';
import { todoReducer } from './todoReducer';
import { ADD_TODO, REMOVE_TODO, SHOW_LOADER, UPDATE_TODO } from '../types';
import { ScreenContext } from '../screen/screenContext';
import { Alert } from 'react-native';

export const TodoState = ({ children }) => {
  const initialState = {
    todos: [],
    loading: false,
    error: null
  }

  const { changeScreen } = useContext(ScreenContext)

  const [ state, dispatch ] = useReducer(todoReducer, initialState)

  const addTodo = title => dispatch({ type: ADD_TODO, title })

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
          onPress: () => {
            changeScreen(null)
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

  const updateTodo = (id, title) => dispatch({ type: UPDATE_TODO, id, title })

  const showLoader = () => dispatch({ type: SHOW_LOADER })

  return <TodoContext.Provider
    value={{
      todos: state.todos,
      addTodo,
      removeTodo,
      updateTodo
    }}
  >
    {children}
  </TodoContext.Provider>
}
