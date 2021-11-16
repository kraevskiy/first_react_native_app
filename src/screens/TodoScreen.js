import React, {useContext, useState} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {FontAwesome, AntDesign} from '@expo/vector-icons';
import {THEME} from '../theme';
import {AppCard} from '../components/ui/AppCard';
import {EditModal} from '../components/EditModal';
import {AppTextBold} from '../components/ui/AppTextBold';
import {AppButton} from '../components/ui/AppButton';
import {TodoContext} from '../context/todo/todoContext';
import {ScreenContext} from '../context/screen/screenContext';

export const TodoScreen = () => {
  const {todos, updateTodo, removeTodo} = useContext(TodoContext)
  const {todoId, changeScreen} = useContext(ScreenContext)
  const [showModal, setShowModal] = useState(false);
  const todo = todos.find(t=> t.id === todoId)

  const saveHandler = (title) => {
    updateTodo(todo.id, title)
    setShowModal(false)
  }

  return (
    <View style={styles.card}>
      <EditModal
        onSave={saveHandler}
        value={todo.title}
        visible={showModal}
        onCancel={() => setShowModal(false)}/>
      <AppCard style={styles.card}>
        <AppTextBold style={styles.title}>
          {todo.title}
        </AppTextBold>
        <AppButton onPress={() => setShowModal(true)}>
          <FontAwesome name="edit" size={20} />
        </AppButton>
      </AppCard>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <AppButton
            color={THEME.GREY_COLOR}
            onPress={() => changeScreen(null)}
          >
            <AntDesign name="back" size={20} color="#fff"/>
          </AppButton>
        </View>
        <View style={styles.button}>
          <AppButton
            color={THEME.DANGER_COLOR}
            onPress={(e) => removeTodo(todo.id)}
          >
            <FontAwesome name="remove" size={20} color="#fff"/>
          </AppButton>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  card: {
    marginBottom: 20,
    padding: 15
  },
  button: {
    // width: Dimensions.get('window').width / 3
    width: Dimensions.get('window').width > 400 ? 150 : 100
  },
  title: {
    fontSize: 20
  }
})
