import React, { createContext, useState, useEffect, useContext } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { Buffer } from "buffer";
import api from "../services/api";
import { AuthContextData, User } from "../types/interfaces";

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function loadStorageData() {
      const storageUser = await AsyncStorage.getItem("@Auth:user");
      const storageToken = await AsyncStorage.getItem("@Auth:access_token");
      if (storageToken && storageUser) {
        api.defaults.headers["Authorization"] = `Bearer ${storageToken}`;
        setUser(JSON.parse(storageUser));
      }
      setLoading(false);
    }
    loadStorageData();
  });

  async function signIn(login: string, password: string) {
    const token = Buffer.from(`${login}:${password}`, "utf8").toString(
      "base64"
    );

    await api
      .get(`/customers`, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .then((response) => {
        api.defaults.headers["Authorization"] = `Basic ${token}`;
        setUser({ username: login });
      })
      .catch((error) => {
        if (error.response.status === 403) {
          alert("Credencias incorretas");
        }

        if (error.isAxiosError) {
          alert("Não foi possível acessar");
          return;
        }
      });
  }

  function signOut() {
    AsyncStorage.multiRemove(["@Auth:user", "@Auth:access_token"]).then(() => {
      setUser(null);
    });
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, signIn, signOut, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
