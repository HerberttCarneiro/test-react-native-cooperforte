import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Item, Input, Badge, Icon, ListItem, List } from "native-base";
import styles from "./styles";
import { email } from "../../../utils/validation";
let typing: string;

export default function Multiselect(props: any) {
  const {
    title,
    placeholder,
    input,
    meta: { touched, error, initial },
    ...inputProps
  } = props;
  const [options, setOptions] = useState<[{ id?: number; value: string }]>(
    initial ?? []
  );

  useEffect(() => {
    input.onChange(options);
  }, [options]);

  async function handle() {
    if (typing != undefined) {
      const exist = options.find(
        (option: { id?: number; value: string }) =>
          typing.trim() == option.value
      );
      if (exist) {
        return Alert.alert("Email já existe");
      }
      if (email(typing)) {
        return Alert.alert("Email inválido");
      }
      let optionsAssing: [{ id?: number; value: string }] = Object.assign(
        [],
        options
      );
      let option: { id?: number; value: string } = { value: typing.trim() };
      optionsAssing.push(option);
      setOptions(optionsAssing);
    }
  }

  async function handleDelete(value: string) {
    options.map((element: { id?: number; value: string }, index) => {
      if (element.value == value) {
        let optionsAssing = Object.assign([], options);
        optionsAssing.splice(index, 1);
        setOptions(optionsAssing);
      }
    });
  }

  return (
    <>
      <List>
        <ListItem itemHeader first noBorder>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>{title}</Text>
        </ListItem>
        <ListItem noBorder>
          {options.map((item) => (
            <TouchableOpacity
              key={item.value}
              onPress={() => handleDelete(item.value)}
            >
              <Badge primary style={styles.emailBadge}>
                <Text style={styles.emailText}>{item.value}</Text>
              </Badge>
            </TouchableOpacity>
          ))}
        </ListItem>
      </List>

      <Item>
        <Input
          {...inputProps}
          onChangeText={(value) => (typing = value)}
          placeholder={placeholder}
          autoCapitalize="none"
        />
        <TouchableOpacity style={{}} onPress={() => handle()}>
          <Icon name="add"></Icon>
        </TouchableOpacity>
        {touched && error && <Text style={styles.error}>{error}</Text>}
      </Item>
    </>
  );
}
