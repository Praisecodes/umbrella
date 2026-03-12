import { EyeCloseOutlineIcon, EyeOutlineIcon } from '@/assets/icons';
import { getMetrics } from '@/src/helpers/utils';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';
import Text from './text';

interface Props extends TextInputProps {
  label?: string;
  iconRight?: React.ReactNode;
  iconLeft?: React.ReactNode;
}

const Input: React.FC<Props> = (props) => {
  const { secureTextEntry, iconLeft, iconRight, label, ...rest } = props;
  const [textHidden, setTextHidden] = useState<boolean>(secureTextEntry ?? false);

  const toggleInputVisibility = () => setTextHidden(!textHidden);

  return (
    <View style={[{ gap: getMetrics(5) }]}>
      {label && (
        <Text size='15' className={`pl-2 text-dark`}>
          {label}
        </Text>
      )}

      <View
        style={{
          paddingHorizontal: getMetrics(8),
          borderRadius: getMetrics(5),
          gap: getMetrics(10),
        }}
        className={`flex border border-dark-a50 ${rest.readOnly && "opacity-60"} flex-row items-center`}
      >
        {!!iconLeft && iconLeft}

        <TextInput
          {...rest}
          secureTextEntry={textHidden}
          className={`flex-1 items-center font-avenir text-black flex`}
          style={{
            height: !!rest.multiline ? getMetrics(97) : getMetrics(50),
            fontSize: getMetrics(15),
          }}
          placeholderTextColor={'#6B728080'}
          placeholder={secureTextEntry ? (textHidden ? "********" : "Password") : rest.placeholder}
        />

        {!!secureTextEntry && (
          <TouchableOpacity onPress={toggleInputVisibility}>
            {textHidden ?
              (<EyeOutlineIcon
                color={'#6B7280'}
              />) :
              (<EyeCloseOutlineIcon
                color={'#6B7280'}
              />)}
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default Input

const styles = StyleSheet.create({});
