import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import Toast from 'react-native-toast-message';

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
    <View style={styles.container}>
      <Text style={styles.label}>Nome de usuário</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={[styles.input, { backgroundColor: '#eee' }]}
        value={email}
        editable={false}
        selectTextOnFocus={false}
      />

      <Text style={styles.label}>Senha atual</Text>
      <TextInput
        style={styles.input}
        value={senhaAtual}
        onChangeText={setSenhaAtual}
        secureTextEntry
      />

      <Text style={styles.label}>Nova senha</Text>
      <TextInput
        style={styles.input}
        value={novaSenha}
        onChangeText={setNovaSenha}
        secureTextEntry
      />

      <Button title="Salvar Alterações" onPress={salvarAlteracoes} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
});

