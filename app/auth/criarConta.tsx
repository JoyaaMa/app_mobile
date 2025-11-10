//import { styles } from "../styles/styles";
import { useRouter } from 'expo-router';
import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, Text, TextInput, Alert, Image, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {LinearGradient} from 'expo-linear-gradient'
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CriarConta() {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const router = useRouter();

  async function verificacaoCadastro() {
    try {
        
      if (!nome || !email || !password1 || !password2) {
        return Alert.alert('Atenção', 'Preencha todos os campos!');
      }

      if (password1 !== password2) {
        return Alert.alert('Atenção', 'As senhas devem ser iguais!')
      }

      // Cria um novo objeto com os dados do novo usuário
      const novoUsuario = { nome, email, senha: password1 };

      // Busca no AsyncStorage a lista atual de usuários salvos
      const usuariosJSON = await AsyncStorage.getItem('usuarios');

      // Se existir algo salvo, faz o parse para array; se não, começa com array vazio
      let usuarios = usuariosJSON ? JSON.parse(usuariosJSON) : [];

      // Verifica se já existe um usuário com o mesmo e-mail
      const jaExiste = usuarios.some((u: any) => u.email === email);
      if (jaExiste) {
        return Alert.alert('Erro', 'Já existe um usuário com este e-mail!');
      }

      // Adiciona o novo usuário ao array de usuários existentes
      usuarios.push(novoUsuario);

      // Salva o array atualizado de volta no AsyncStorage
      await AsyncStorage.setItem('usuarios', JSON.stringify(usuarios));

      // Exibe alerta de sucesso e redireciona o usuário
      Toast.show({
        type: 'success',
        text1: 'Conta criada com sucesso!',
        position: 'top',
        topOffset: 100,
      });
      router.push('/auth/login')


    } catch (error) {
        console.log(error);
        Alert.alert('Erro', 'Ocorreu um erro ao salvar os dados.');
    }
  }

useEffect(() => {
  async function carregarUsuarios() {
    const usuariosJSON = await AsyncStorage.getItem('usuarios');
    const usuarios = usuariosJSON ? JSON.parse(usuariosJSON) : [];
    console.log(usuarios);
  }

  carregarUsuarios();
}, []);
  
  return (
    <View style={styles.background}>
      <LinearGradient
                  colors={['#E8F0FF', '#C5D8FF']}
                  style={StyleSheet.absoluteFillObject}
      ></LinearGradient>
      <View style={styles.card}>
        <Image
          source={require('../../assets/images/logo_planEdu.jpeg')}
          style={styles.image}
        />
        <Text style={styles.logo}>Criar Conta</Text>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="account" size={22} color="#6B7280" style={styles.icon} />
          <TextInput 
          style={styles.input}
          placeholder="Nome completo" 
          value={nome} 
          onChangeText={setNome} 
        />
        </View>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="email" size={22} color="#6B7280" style={styles.icon} />
          <TextInput style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        </View>
        
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="lock" size={22} color="#6B7280" style={styles.icon} />
          <TextInput style={styles.input}
          placeholder="Sua senha"
          value={password1}
          onChangeText={setPassword1}
          secureTextEntry
        />
        </View>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="lock" size={22} color="#6B7280" style={styles.icon} />
          <TextInput style={styles.input}
          placeholder="Digite sua senha novamente"
          value={password2}
          onChangeText={setPassword2}
          secureTextEntry
        />
        </View>
        

        <TouchableOpacity style={styles.button} onPress={verificacaoCadastro}>
          <Text style={styles.buttonText}>Criar Conta</Text>
        </TouchableOpacity>

      </View>
    </View>
)};

    const styles = StyleSheet.create({
        background: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        card: {
            backgroundColor: '#fff',
            width: '85%',
            borderRadius: 20,
            paddingVertical: 40,
            paddingHorizontal: 25,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 5,
        },
        image:{
                width: 90, 
                height: 90,
                borderRadius: 30,
            },
        logo: {
            fontSize: 22,
            fontWeight: 'bold',
            color: '#2563EB',
            marginBottom: 10,
        },
        title: {
            fontSize: 18,
            fontWeight: '600',
            color: '#1E3A8A',
            marginBottom: 30,
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#F9FAFB',
            borderWidth: 1,
            borderColor: '#E5E7EB',
            borderRadius: 12,
            paddingHorizontal: 10,
            marginBottom: 15,
            width: '100%',
        },
        icon: {
            marginRight: 8,
        },
        input: {
            flex: 1,
            height: 45,
            color: '#111827',
        },
        button: {
            backgroundColor: '#2563EB',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: 45,
            borderRadius: 12,
            marginTop: 10,
        },
        buttonText: {
            color: '#fff',
            fontWeight: '600',
            fontSize: 16,
            marginRight: 6,
        },
        footer: {
            flexDirection: 'row',
            marginTop: 20,
        },
        footerText: {
            color: '#374151',
        },
        footerLink: {
            color: '#2563EB',
            fontWeight: '600',
        },
      });
