import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { format } from 'date-fns';
import Toast from 'react-native-toast-message';

export async function salvarAtividade(titulo: string, data: Date, descricao: string, router: any) {

    try {

    if (!titulo || !data || !descricao) {
        return Alert.alert('Atenção', 'Preencha todos os campos!');
    }

    // Cria um novo objeto com os dados do novo usuário
    const novaAtividade = { id: Date.now().toString(), titulo, data: format(data, 'dd/MM/yyyy'), descricao };

    // Busca no AsyncStorage a lista atual de usuários salvos
    const atividadeJSON = await AsyncStorage.getItem('atividades');

    // Se existir algo salvo, faz o parse para array; se não, começa com array vazio
    let atividades = atividadeJSON ? JSON.parse(atividadeJSON) : [];

    // Adiciona o novo usuário ao array de usuários existentes
    atividades.push(novaAtividade);

    // Salva o array atualizado de volta no AsyncStorage
    await AsyncStorage.setItem('atividades', JSON.stringify(atividades));

    // Exibe alerta de sucesso e redireciona o usuário
    Toast.show({
        type: 'success',
        text1: 'Atividade cadastrada com sucesso!',
        position: 'top',
        topOffset: 100,
    });

    router.back(); 

    } catch (error) {
        console.log(error);
        Alert.alert('Erro', 'Ocorreu um erro ao cadastrar a atividade.');
    }
}