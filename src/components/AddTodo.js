import React, { useState } from 'react';
import { Alert, Keyboard, StyleSheet, TextInput, View } from 'react-native';
import { THEME } from '../theme';
import { AntDesign } from '@expo/vector-icons';

export const AddTodo = ({ onSubmit }) => {
  const [ value, setValue ] = useState('')

  const pressHandler = () => {
    if ( value.trim() ) {
      onSubmit(value)
      setValue('')
      Keyboard.dismiss()
    } else {
      Alert.alert('🤔 Name was not to be empty!!!')
    }
  }

  return (
    <View style={styles.block}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={setValue}
        placeholder="ToDo name"
        autoCorrect={false}
        autoCapitalize="none"
      />
      <AntDesign.Button
        onPress={pressHandler}
        name="pluscircleo"
      >
        Добавить
      </AntDesign.Button>
    </View>
  )
}

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },
  input: {
    width: '60%',
    padding: 10,
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderBottomColor: THEME.MAIN_COLOR
  }
})
