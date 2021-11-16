import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, TextInput, View } from 'react-native';
import { THEME } from '../theme';
import { AppButton } from './ui/AppButton'

export const EditModal = ({ visible, onCancel, value, onSave }) => {
  const [title, setTitle] = useState(value);

  const saveHandler = () => {
    if ( title.trim().length < 3 ) {
      Alert.alert('Error',
        `Minimum length name 3 character. Now ${title.trim().length}`)
    } else {
      onSave(title)
    }
  }

  const cancelHandler = () => {
    setTitle(value)
    onCancel()
  }

  return (
    <Modal
      transparent={false}
      animationType="slide"
      visible={visible}>
      <View
        style={styles.wrap}
      >
        <TextInput
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          placeholder="Write name"
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={60}
        />
        <View style={styles.buttons}>
          <AppButton onPress={cancelHandler} color={THEME.DANGER_COLOR}>
            Cancel
          </AppButton>
          <AppButton onPress={saveHandler}>
            Save
          </AppButton>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    padding: 5,
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2,
    width: '80%',
    marginBottom: 15
  },
  buttons: {
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});
