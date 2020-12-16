import React, { useState } from "react";
import { Image } from "react-native";
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Icon,
  Button,
  Text,
} from "native-base";
import { useAuth } from "../../contexts/auth";
import styles from "./styles";
import logo from "../../../assets/logo.png";

const SignIn: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuth();

  return (
    <Container>
      <Content>
        <Image style={styles.logo} source={logo} />
        <Form style={styles.form}>
          <Item>
            <Icon active name="person" />
            <Input
              onChangeText={(text) => setUsername(text)}
              placeholder="Username"
              textContentType="username"
              autoCompleteType="username"
              autoCapitalize="none"
            />
          </Item>
          <Item last>
            <Icon active name="key" />
            <Input
              onChangeText={(text) => setPassword(text)}
              placeholder="Password"
              textContentType="password"
              secureTextEntry
            />
          </Item>
          <Button full onPress={() => signIn(username, password)}>
            <Text>Sign in</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

export default SignIn;
