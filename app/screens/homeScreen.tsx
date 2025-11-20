import React, {useState, useCallback} from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { View, Text, FlatList, TouchableOpacity, Alert, BackHandler, StyleSheet, Image} from 'react-native';
//import { styles } from "../styles/styles1";
import { useRouter } from 'expo-router';
import { excluirAtividade } from '../../services/excluirTarefa'
import { useAtividades } from '../../services/carregarAtividades'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

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
    <View style={styles.container}>
        <View style={styles.boxAtividade}>
          <View style={{flex: 1}}>
            <Text style={styles.titleList}>{item.titulo}</Text>
            <Text style={{fontWeight: 'bold', color: '#828282'}}>Entregar até: {item.data}</Text>
            <Text style={styles.descricao}>{item.descricao}</Text>
          </View>
    
        <View style={{ marginLeft: 80, alignItems: 'center',}}>
          <TouchableOpacity 
            style={styles.botaoExcluir}
            onPress={async () => {
              await excluirAtividade(item.id);
              await carregarAtividades();
            }}>
            <MaterialCommunityIcons name='delete' color='grey' size={25}/>
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
            <MaterialCommunityIcons name='pencil' color='grey' size={25}/>
          </TouchableOpacity>
        </View>
        </View>
      
    </View>
  );

  return (
    <View  style={[StyleSheet.absoluteFillObject, styles.container]}>
      
      <View style={styles.header}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginRight: 10,}}>
          <Image
            source={require('../../assets/images/logo_planEdu.jpeg')}
            style={styles.img}
        />
        <MaterialCommunityIcons name='account-circle' color='#4876FF' size={30}/>
        </View>
        <Text style={styles.title}>Lista de Atividades</Text>
        <LinearGradient colors={['#4876FF', '#00CDCD']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.contagem}>
            <Text style={{ fontSize: 16 ,fontWeight: 'bold', color: '#FFFF' }}>Você tem {atividades.length} atividades</Text>
        </LinearGradient>
      </View>

          <FlatList
            data={atividades}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ListEmptyComponent={<Text>Nenhuma atividade cadastrada.</Text>}
          />    

    </View>
  );
}
  const styles = StyleSheet.create({
    container:{
      backgroundColor: '#E8E8E8'
    },
   header: {
        width: '100%',
        height: Dimensions.get('window').height/4,
        justifyContent: 'center',
        backgroundColor: "#F8F8FF",
        borderBottomEndRadius: 20,
        borderBottomLeftRadius: 20,
        
   },
   img: {
      width: 50,
      height: 50,
      borderRadius: 20,
      margin: 10,
   },
    title:{
      fontSize: 30,
      marginLeft: 25,
      color: '#4169E1',
      fontWeight: 'bold',
    },
    titleList:{
      fontSize: 20,
      color: '#4169E1',
      fontWeight: 'bold',
      marginBottom: 10,
    },
    contagem:{
      margin: 10,
      marginTop: 20,
      marginLeft: 25,
      marginRight: 25,
      padding: 15,
      justifyContent: 'center',
      textAlign: 'center',
      borderRadius: 15,
    },
    boxAtividade:{
      margin: 20,
      padding: 18,
      flexDirection: 'row',
      backgroundColor: '#F8F8FF',
      borderRadius: 20,
      
    },
    botaoExcluir:{
      paddingVertical: 10,
      paddingHorizontal: 18,
      borderRadius: 8,
      flexDirection: 'row',
    },
    botaoEditar:{
      paddingVertical: 10,
      paddingHorizontal: 18,
      borderRadius: 8,
      flexDirection: 'row',
    
    },
    descricao: {
      fontSize: 14,
      color: '#555',
      lineHeight: 20,
      flexShrink: 1,
      flexWrap: 'wrap',
      width: '100%',
},

  })

  