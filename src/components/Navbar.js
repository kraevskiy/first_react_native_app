import React from 'react';
import {View, StyleSheet} from 'react-native';
import {THEME} from '../theme';
import {AppTextBold} from './ui/AppTextBold';

export const Navbar = ({title}) => {

  return (
    <View style={styles.navbar}>
      <AppTextBold style={styles.text}>{title}</AppTextBold>
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

