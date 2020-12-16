import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/auth";
import {
  Container,
  ListItem,
  Text,
  Button,
  Left,
  Thumbnail,
  Body,
  Right,
  Header,
  Item,
  Icon,
  Input,
  View,
} from "native-base";
import api from "../../services/api";
import {
  Alert,
  RefreshControl,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Employee } from "../../types/interfaces";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

const Employes: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const [lastPage, setLastPage] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [employees, setEmployes] = useState<Employee[]>([]);
  const [employeesFilter, setEmployesFilter] = useState<Employee[]>([]);
  const navigation = useNavigation();
  const { signOut } = useAuth();

  useEffect(() => {
    getEmployees();
  }, [page]);

  async function onRefresh() {
    if (page == 0) {
      getEmployees();
    }
    setPage(0);
  }

  async function getEmployees() {
    setRefresh(true);

    await api
      .get(`/customers`)
      .then((response) => {
        const { data } = response;
        setEmployes(data);
        setEmployesFilter(data);
      })
      .catch((error) => {
        if (error.isAxiosError) {
          Alert.alert("Server not found");
          return;
        }

        if (error.response.status == 401) return signOut();

        Alert.alert(
          error.response.data.error_description || "Não foi possível listar"
        );
      });
    setRefresh(false);
  }

  async function handleFilter(filter: string) {
    const filtered = employees.filter((employee) => {
      return employee.name.toLowerCase().includes(filter.toLowerCase());
    });
    setEmployesFilter(filtered);
  }

  function renderLine() {
    return !refresh ? (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          borderTopWidth: 0.5,
          borderTopColor: "#f2f2f2",
        }}
      >
        {!lastPage && (
          <TouchableOpacity
            style={{
              padding: 10,
              alignSelf: "center",
            }}
            onPress={async () => {
              let pagina = page + 1;
              setPage(pagina);
            }}
          >
            <Text
              style={{
                color: "#3880ff",
              }}
            >
              Load more
            </Text>
          </TouchableOpacity>
        )}
      </View>
    ) : (
      <ActivityIndicator animating size="large" />
    );
  }
  const uri =
    "https://avatars2.githubusercontent.com/u/28881780?s=460&u=ec113cae05c2e2dedd4de3783abd7139cc8c967d&v=4";

  return (
    <Container>
      <Header searchBar rounded>
        <Item>
          <Icon name="ios-search" />
          <Input
            placeholder="Search"
            onChangeText={(text) => handleFilter(text)}
          />
          <Icon name="ios-people" />
        </Item>
      </Header>
      <FlatList
        data={employeesFilter}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => {
          return (
            <ListItem thumbnail key={item.id} noBorder>
              <Left>
                <Thumbnail source={{ uri }} />
              </Left>
              <Body>
                <Text>{item.name}</Text>
                <Text note numberOfLines={1}>
                  {item.city} {item.state}
                </Text>
              </Body>
              <Right>
                <Button
                  transparent
                  onPress={() => {
                    navigation.navigate("ViewEmployee", item);
                  }}
                >
                  <Text>View</Text>
                </Button>
              </Right>
            </ListItem>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                borderBottomWidth: 0.5,
                borderBottomColor: "#f2f2f2",
              }}
            ></View>
          );
        }}
      />
      {renderLine()}
    </Container>
  );
};

export default Employes;
