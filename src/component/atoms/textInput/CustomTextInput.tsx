import React, {useState} from 'react';
import type {TextInputProps} from 'react-native';
import {TextInput, Text, StyleSheet} from 'react-native';
import {AppColors} from '../../../StyleUtils/colors/AppColors';

export interface CustomTextInputProps extends TextInputProps {
  label?: string;
  placeHolder?: string;
  inputRef?: any;
  errMsg?: string;
}

const CustomTextInput = (props: CustomTextInputProps) => {
  const [text, setText] = useState('');
  const {label, placeHolder, inputRef, errMsg} = props;

  return (
    <>
      {label && <Text style={styles.labelStyle}>{label}</Text>}
      <TextInput
        ref={inputRef}
        style={styles.textInputStyle}
        placeholder={placeHolder}
        placeholderTextColor={AppColors.black}
        value={text}
        onChangeText={(text: string) => {
          setText(text);
          inputRef.current.value = text;
        }}
      />
      {errMsg !== '' && <Text style={styles.errStyle}>{errMsg}</Text>}
    </>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '600',
    paddingVertical: 16,
    letterSpacing: 2,
  },
  textInputStyle: {
    height: 50,
    width: '100%',
    backgroundColor: AppColors.Edward,
    paddingHorizontal: 10,
  },
  errStyle: {
    fontSize: 15,
    color: AppColors.red,
    paddingTop: 10,
  },
});
