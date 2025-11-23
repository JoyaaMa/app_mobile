import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';
import { LinearGradient } from 'expo-linear-gradient';
import { KeyboardAvoidingView } from 'react-native';
import { Platform } from 'react-native';
import { Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function EditarPerfil() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const router = useRouter();

  useEffect(() => {
    carregarDadosUsuario();
  }, []);

  async function carregarDadosUsuario() {
    try {
      const usuarioJSON = await AsyncStorage.getItem('usuarioLogado');
      if (usuarioJSON) {
        const usuario = JSON.parse(usuarioJSON);
        setNome(usuario.nome);
        setEmail(usuario.email); // E-mail visível mas não editável
      }
    } catch (error) {
      console.log('Erro ao carregar dados do usuário logado:', error);
    }
  }

  async function salvarAlteracoes() {
    try {
      const usuarioLogadoJSON = await AsyncStorage.getItem('usuarioLogado');
      const usuariosJSON = await AsyncStorage.getItem('usuarios');

      if (usuarioLogadoJSON && usuariosJSON) {
        const usuarioLogado = JSON.parse(usuarioLogadoJSON);
        let usuarios = JSON.parse(usuariosJSON);

        if (senhaAtual !== usuarioLogado.senha) {
          Alert.alert('Erro', 'A senha atual está incorreta.');
          return;
        }

        usuarios = usuarios.map((u: any) =>
          u.email === usuarioLogado.email ? { ...u, nome, senha: novaSenha } : u
        );

        const usuarioAtualizado = { nome, email, senha: novaSenha };

        await AsyncStorage.setItem('usuarios', JSON.stringify(usuarios));
        await AsyncStorage.setItem('usuarioLogado', JSON.stringify(usuarioAtualizado));

        Toast.show({
            type: 'success',
            text1: 'Perfil atualizado com sucesso!',
            position: 'top',
            topOffset: 100,
          });
        router.back();
      }
    } catch (error) {
      console.log('Erro ao salvar alterações:', error);
      Alert.alert('Erro', 'Não foi possível salvar as alterações.');
    }
  }

  return (
     <View style={styles.background}>
          <LinearGradient
            colors={['#E8F0FF', '#C5D8FF']}
            style={StyleSheet.absoluteFillObject}
          ></LinearGradient>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.container}
          ></KeyboardAvoidingView>

          <View style={styles.header}>
              <MaterialCommunityIcons name='account-circle' color='#4876FF' size={30}/>
              <Text style={styles.titleSupremo}>Editar Perfil</Text>
          </View>

    <View style={styles.card}>
      <Text style={styles.title}>Nome de usuário</Text>
      <TextInput
        style={styles.inputContainer}
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.title}>Email</Text>
      <TextInput
        style={styles.inputContainer}
        value={email}
        editable={false}
        selectTextOnFocus={false}
      />

      <Text style={styles.title}>Senha atual</Text>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="lock" size={22} color="#6B7280" style={styles.icon} />
        <TextInput
        style={styles.input}
        value={senhaAtual}
        onChangeText={setSenhaAtual}
        secureTextEntry
      />
      </View>
      

      <Text style={styles.title}>Nova senha</Text>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="lock" size={22} color="#6B7280" style={styles.icon} />
        <TextInput
          style={styles.input}
          value={novaSenha}
          onChangeText={setNovaSenha}
          secureTextEntry
        />
      </View>
      

      <TouchableOpacity style={styles.button} onPress={salvarAlteracoes}>
        <Text style={styles.buttonText}>Salvar alterações</Text>
      </TouchableOpacity>

    </View>
    </View>
  );
};

const styles = StyleSheet.create({
        background:{
            flex: 1,
        },
        container: {
            justifyContent: 'center',
            backgroundColor: '#E8E8E8',
        },
        card: {
            backgroundColor: '#F8F8FF',
            width: '90%',
            borderRadius: 20,
            paddingVertical: 30,
            paddingHorizontal: 25,
            marginTop: 20,
            marginLeft: 20,
            marginRight: 20,
            justifyContent: 'flex-start',
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
        titleSupremo:{
            fontSize: 25,
            color: '#4169E1',
            fontWeight: 'bold',
            marginBottom: 0,
            marginLeft: 25,
            marginTop:0,
           // marginBottom: 20,
           // marginLeft: 20,
        },
        title: {
            fontSize: 20,
            fontWeight: '600',
            color: '#00008B',
            marginBottom: 5,
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#F9FAFB',
            borderWidth: 1,
            borderColor: '#E5E7EB',
            borderRadius: 12,
            paddingHorizontal: 10,
            width: '100%',
            marginBottom: 30,
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
        },
        buttonText: {
            color: '#ffffffff',
            fontSize: 14,
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

