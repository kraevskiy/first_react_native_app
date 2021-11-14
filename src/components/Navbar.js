import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {THEME} from '../theme'

export const Navbar = ({title}) => {

  return (
    <View style={styles.navbar}>
      <Text style={styles.text}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: THEME.MAIN_COLOR,
    height: 70,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 10
  },
  text: {
    color: 'white',
    fontSize: 20
  }
})

