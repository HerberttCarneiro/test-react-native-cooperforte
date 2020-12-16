import React from "react";
import { Item, Picker, Text, Icon, View } from "native-base";
import styles from "./styles";

export default function PickerInput(props: any) {
  const {
    placeholder,
    input,
    meta: { touched, error, visited },
    ...inputProps
  } = props;
  const selects = [
    { id: 1, name: "Residencial" },
    { id: 2, name: "Comercial" },
    { id: 3, name: "Celular" },
  ];
  return (
    <Item style={styles.item}>
      <View style={styles.viewSelect}>
        <Text>{placeholder}</Text>
        <Text style={styles.selectedValue}>
          {input.value && input.value.name.toString()}
        </Text>
      </View>
      <Picker
        note
        mode="dropdown"
        selectedValue={input.value.toString()}
        iosIcon={<Icon name="arrow-down" />}
        onValueChange={input.onChange}
      >
        {selects.map((option) => (
          <Picker.Item key={option.id} label={option.name} value={option} />
        ))}
      </Picker>
      {touched && error && <Text style={styles.error}>{error}</Text>}
    </Item>
  );
}
