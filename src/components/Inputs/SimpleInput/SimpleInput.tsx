import React from "react";
import { Item, Input, Text } from "native-base";
import styles from "./styles";

export default function SimpleInput(props: any) {
  const {
    placeholder,
    input,
    meta: { touched, error, visited },
    ...inputProps
  } = props;

  return (
    <Item>
      <Input
        {...inputProps}
        onChangeText={input.onChange}
        onBlur={input.onBlur}
        onFocus={input.onFocus}
        value={input.value}
        placeholder={placeholder}
        textContentType="username"
        autoCompleteType="username"
        autoCapitalize="none"
      />
      {touched && error && <Text style={styles.error}>{error}</Text>}
    </Item>
  );
}
