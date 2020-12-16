import React from "react";
import {
  Container,
  Content,
  Text,
  Card,
  CardItem,
  Left,
  Thumbnail,
  Body,
  Icon,
  Badge,
} from "native-base";
import { PropsViewEmployee, ParamList } from "./types";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import styles from "./styles";
import { deleteEmployee, setIcon } from "./behaviors";

const ViewEmployee: React.FC<PropsViewEmployee> = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<ParamList, "Employee">>();
  const {
    id,
    name,
    cpf,
    city,
    state,
    cep,
    district,
    address,
    contacts,
    emails,
  } = route.params;
  const uri =
    "https://avatars2.githubusercontent.com/u/28881780?s=460&u=ec113cae05c2e2dedd4de3783abd7139cc8c967d&v=4";

  return (
    <Container>
      <Content>
        <Card style={styles.card}>
          <CardItem bordered>
            <Left>
              <Thumbnail source={{ uri }} />
              <Body>
                <Text>{name}</Text>
                <Text note>{`${cpf}`}</Text>
              </Body>
            </Left>
            <Icon
              onPress={() => navigation.navigate("EditEmployee", route.params)}
              style={{
                color: "black",
                fontSize: 16,
              }}
              type="Feather"
              name="edit"
            ></Icon>
            <Icon
              onPress={() => deleteEmployee(id, navigation.goBack)}
              style={{
                fontSize: 16,
                color: "red",
              }}
              type="Feather"
              name="trash"
            ></Icon>
          </CardItem>
          <CardItem header>
            <Text>E-mail</Text>
          </CardItem>
          <CardItem
            bordered
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {emails?.map((experience) => (
              <Badge key={experience.id} primary style={{ margin: 2 }}>
                <Text>{experience.value}</Text>
              </Badge>
            ))}
          </CardItem>
          <CardItem header>
            <Text>Contatos</Text>
          </CardItem>
          {contacts?.map((contact) => (
            <CardItem bordered key={contact.id}>
              <Left>
                <Icon type="Feather" name={setIcon(contact.contactType?.id)} />
                <Text>{contact.value}</Text>
              </Left>
            </CardItem>
          ))}
          <CardItem header>
            <Text>Endereço</Text>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text>{`${city} - ${state}`}</Text>
              <Text note>{`${cep}`}</Text>
              <Text note>{`${district}`}</Text>
              <Text note>{`${address}`}</Text>
            </Body>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

export default ViewEmployee;
