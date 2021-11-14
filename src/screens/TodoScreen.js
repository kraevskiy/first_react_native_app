import React, {useState} from 'react';
import {StyleSheet, View, Button} from 'react-native';
import {THEME} from '../theme';
import {AppCard} from '../components/ui/AppCard';
import {EditModal} from '../components/EditModal';
import {AppTextBold} from '../components/ui/AppTextBold';

export const TodoScreen = ({goBack, todo, onRemove, onSave}) => {
  const [showModal, setShowModal] = useState(false);

  const saveHandler = (title) => {
    onSave(todo.id, title)
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
        <Button title="Ed." onPress={() => setShowModal(true)}/>
      </AppCard>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button
            title="Back"
            color={THEME.GREY_COLOR}
            onPress={goBack}/>
        </View>
        <View style={styles.button}>
          <Button
            title="Delete"
            color={THEME.DANGER_COLOR}
            onPress={(e) => onRemove(todo.id)}/>
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
    width: '40%'
  },
  title: {
    fontSize: 20
  }
})
