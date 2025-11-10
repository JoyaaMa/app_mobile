import { format, parse } from 'date-fns';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { editarAtividade } from '../services/editarAtividade';

export default function EditarAtividadeScreen() {

    const router = useRouter();
    const { id, titulo, descricao, data } = useLocalSearchParams();

    const [idAtividade, setId] = useState(''); // <- já preenchido ao carregar a tela
    const [tituloEdit, setTituloEdit] = useState('');
    const [dataEdit, setData] = useState(new Date());
    const [descricaoEdit, setDescricaoEdit] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const handleConfirm = (date: Date) => {
        setData(date);
        setDatePickerVisibility(false);
    };

    useEffect(() => {
        console.log('Params recebidos:', { id, titulo, descricao, data });
        if (id && titulo && descricao && data) {
            setId(String(id));
            setTituloEdit(String(titulo));
            setDescricaoEdit(String(descricao));
            setData(parse(String(data), 'dd/MM/yyyy', new Date()));
        }
    }, [id, titulo, descricao, data]);

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Título"
                value={tituloEdit}
                onChangeText={setTituloEdit}
                style={styles.input}
            />

            <Button title="Selecionar Data" onPress={() => setDatePickerVisibility(true)} />
                {data && (
                    <Text style={{ marginTop: 8 }}>
                    Data selecionada: {format(dataEdit, 'dd/MM/yyyy')}
                    </Text>
                )}
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={() => setDatePickerVisibility(false)}
            />

            <TextInput
                placeholder="Descrição"
                value={descricaoEdit}
                onChangeText={setDescricaoEdit}
                style={styles.input}
            />

            <Button
                title="Salvar alterações"
                onPress={async () => {
                    await editarAtividade(idAtividade, tituloEdit, dataEdit, descricaoEdit);
                    router.back(); 
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 15,
    borderRadius: 5,
  },
});
