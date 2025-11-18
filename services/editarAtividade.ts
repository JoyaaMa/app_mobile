import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import { Alert } from 'react-native';
import Toast from 'react-native-toast-message';

export async function editarAtividade(id: string, titulo: string, data: Date, descricao: string) {
  try {
    if (!titulo || !data || !descricao) {
      return Alert.alert('Atenção', 'Preencha todos os campos!');
    }

    // Novo objeto com os dados atualizados
    const atividadeAtualizada = {id, titulo, data: format(data, 'dd/MM/yyyy'), descricao};

    // Recupera todas as atividades
    const atividadeJSON = await AsyncStorage.getItem('atividades');
    let atividades = atividadeJSON ? JSON.parse(atividadeJSON) : [];

    console.log('Atividades antes da edição:', atividades);

    // Substitui a atividade pelo mesmo ID
    const novasAtividades = atividades.map((atividade: any) =>
      atividade.id === id ? atividadeAtualizada : atividade
    );

    console.log('ID recebido para edição:', id);

    // Salva a nova lista
    await AsyncStorage.setItem('atividades', JSON.stringify(novasAtividades));

    // Alert.alert('Sucesso', 'Atividade editada com sucesso!');
    Toast.show({
      type: 'success',
      text1: 'Atividade editada com sucesso!',
      position: 'top',
      topOffset: 100,
    });
  } catch (error) {
    console.log(error);
    Alert.alert('Erro', 'Ocorreu um erro ao editar a atividade.');
  }
}
