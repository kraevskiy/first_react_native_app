import React, {useState} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {Navbar} from './src/components/Navbar';
import {MainScreen} from './src/screens/MainScreen'
import {TodoScreen} from './src/screens/TodoScreen'

export default function App() {
  const [todoId, setTodoId] = useState(null);
  const [todos, setTodos] = useState([
    {id: '1', title: 'test 1',},
    // {id: '2', title: 'test 2',},
    // {id: '3', title: 'test 3',},
    // {id: '4', title: 'test 4',},
    // {id: '5', title: 'test 5',}
  ]);

  const addTodo = (title) => {
    setTodos(prev => [...prev, {
      id: Date.now().toString(),
      title
    }])
  }

  const removeTodo = (id) => {
    const todo = todos.find(t=> t.id === id)
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
            setTodoId(null)
            setTodos(prev=> prev.filter(t => t.id !== id))
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

  const updateTodo = (id, title) => {
    setTodos(prevS => prevS.map(todo => {
      if (todo.id === id){
        todo.title = title
      }
      return todo
    }))
  }

  let content = <MainScreen
    addTodo={addTodo}
    removeTodo={removeTodo}
    todos={todos}
    openTodo={setTodoId}
  />

  if (todoId) {
    const selectedTodo = todos.find(todo => todo.id.toString() === todoId)
    content = <TodoScreen
      onSave={updateTodo}
      onRemove={removeTodo}
      todo={selectedTodo}
      goBack={() => {
        setTodoId(null)
      }}/>
  }

  return (
    <View >
      <Navbar title="Todo APP"/>
      <View style={styles.container}>
        {content}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20
  }
});
