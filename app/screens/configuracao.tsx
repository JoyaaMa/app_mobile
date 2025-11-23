import React from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useRouter } from 'expo-router';
import AsyncStorage from "@react-native-async-storage/async-storage";
//import {styles} from '../../styles/styles3';
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";

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
    { title: "Deletar conta", onPress: deletarConta, isDanger:true,},
  ];

  const renderItem = ({ item }: { item: any }) => (
    <View style={{alignItems: 'center'}}>
      <TouchableOpacity style={[styles.button]} onPress={item.onPress}>
        <Text style={styles.buttonText}>{item.title}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.background}>
                        <LinearGradient
                            colors={['#E8F0FF', '#C5D8FF']}
                            style={StyleSheet.absoluteFillObject}
                        ></LinearGradient>
    <View>
      <View style={styles.header}> 
        <Ionicons name='settings-sharp' size ={29} color = '#4169E1'/>
        <Text style={styles.titleSupremo}> Configurações</Text></View>
      <FlatList
        data={opcoes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
    </View>
  );
}
  const styles = StyleSheet.create({
    background:{
      flex: 1,
    },
    header: {
      flexDirection:'row',
      paddingLeft:20,
      borderBottomEndRadius: 20,
      borderBottomLeftRadius: 20,
      width: '100%',
      height: Dimensions.get('window').height/8,
      backgroundColor: '#F8F8FF',
      alignItems:'center',
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 5,
                    
    },
    titleSupremo:{
            fontSize: 25,
            color: '#4169E1',
            fontWeight: 'bold',
            marginBottom: 0,
            marginLeft: 25,
            marginTop:0,

    },
    button: {
            backgroundColor: '#2563EB',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '80%',
            height: 45,
            borderRadius: 12,
            marginTop: 20,
    },
    buttonText: {
            color: '#ffffffff',
            fontSize: 18,
            marginRight: 6,
            fontWeight: 'bold'
        }
    
  });