import React, {useState, useCallback} from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { View, Text, FlatList, TouchableOpacity, Alert, BackHandler } from 'react-native';
import { styles } from "../../styles/styles1";
import { useRouter } from 'expo-router';
import { excluirAtividade } from '../../services/excluirTarefa'
import { useAtividades } from '../../services/carregarAtividades'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ListaUsuarios() {

  const {atividades, carregarAtividades} = useAtividades();
  const [nome, setNome] = useState('');
  const navigation = useNavigation();
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      const carregarNome = async () => {
        const usuarioJSON = await AsyncStorage.getItem('usuarioLogado');
        if (usuarioJSON) {
          const usuario = JSON.parse(usuarioJSON);
          setNome(usuario.nome);
          navigation.setOptions({ title: `Bem-vindo, ${usuario.nome}!` });
        }
      };
  
      const onBackPress = () => {
        Alert.alert(
          'Sair do aplicativo',
          'Tem certeza que deseja sair?',
          [
            { text: 'Cancelar', style: 'cancel' },
            {
              text: 'Sair',
              onPress: () => BackHandler.exitApp(),
              style: 'destructive',
            },
          ],
          { cancelable: true }
        );
        return true; // impede comportamento padrão
      };
  
      carregarNome();
      const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => backHandler.remove();
    }, [])
  );

  // Função para renderizar cada item da lista
  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.boxLista}>
      <View style={{maxWidth: 200, padding: 10}}>
        <Text style={styles.titleLista}>{item.titulo}</Text>
        <Text>Entregar até: {item.data}</Text>
        <Text>{item.descricao}</Text>
      </View>
    
      <View style={{margin: 10}}>
        <TouchableOpacity 
          style={styles.botaoExluir}
          onPress={async () => {
            await excluirAtividade(item.id);
            await carregarAtividades();
          }}>
          <MaterialCommunityIcons name='delete' color='#fff' size={20}/>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.botaoEditar}
          onPress={() => router.push({
          pathname: '/screens/editarAtividades',
          params: { 
            id: item.id,
            titulo: item.titulo,
            descricao: item.descricao,
            data: item.data
          }
          })}>
          <MaterialCommunityIcons name='pencil' color='#fff' size={20}/>
        </TouchableOpacity>
      </View>
      
    </View>
  );

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <Text style={styles.titleSupremo}>Lista de Atividades</Text>
      </View>

      <FlatList
        data={atividades}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text>Nenhum atividade cadastrada.</Text>}
      />

    </View>
  );
}