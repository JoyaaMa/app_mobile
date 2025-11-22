import React from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { useRouter } from 'expo-router';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {styles} from '../../styles/styles3';
import { Ionicons } from "@expo/vector-icons";

export default function Configuracoes() {
  const router = useRouter();

  async function sairDaConta() {
    Alert.alert(
      "Sair da conta",
      "Tem certeza que deseja sair?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sair",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.removeItem("usuarioLogado");
            router.replace("/auth/login");
          },
        },
      ],
      { cancelable: true }
    );
  }

  async function deletarConta() {
    Alert.alert(
      "Deletar conta",
      "Tem certeza que deseja excluir sua conta? Essa ação não poderá ser desfeita.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Deletar",
          style: "destructive",
          onPress: async () => {
            const usuarioLogadoJSON = await AsyncStorage.getItem("usuarioLogado");
            const usuariosJSON = await AsyncStorage.getItem("usuarios");

            if (usuarioLogadoJSON && usuariosJSON) {
              const usuarioLogado = JSON.parse(usuarioLogadoJSON);
              const usuarios = JSON.parse(usuariosJSON);

              const usuariosAtualizados = usuarios.filter(
                (u: any) => u.email !== usuarioLogado.email
              );

              await AsyncStorage.setItem("usuarios", JSON.stringify(usuariosAtualizados));
              await AsyncStorage.removeItem("usuarioLogado");

              Alert.alert("Conta deletada", "Sua conta foi excluída com sucesso.");
              router.replace("/auth/login");
            }
          },
        },
      ],
      { cancelable: true }
    );
  }

  const opcoes = [
    { title: "Editar perfil", onPress: () => router.push("/screens/editarPerfil") },
    { title: "Suporte", onPress: () => router.push("/screens/suporte") },
    { title: "Sair da conta", onPress: sairDaConta },
    { title: "Deletar conta", onPress: deletarConta, isDanger:true },
  ];

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.container1}>
      <TouchableOpacity onPress={item.onPress}>
        <Text style={styles.titleLista}>{item.title}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}> 
        <Ionicons name='settings-sharp' size ={29} color = '#4169E1'/>
        <Text style={styles.text}> Configurações</Text></View>
      <FlatList
        data={opcoes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>

  );
}
