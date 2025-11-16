import React, { useState } from "react";
import { Button, Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { StyleSheet } from "react-native";
//import { styles } from "../styles/styles2"
import { format } from 'date-fns';
import { useRouter } from "expo-router";
import { salvarAtividade } from "../../services/salvarAtividades";
import { Background } from "@react-navigation/elements";

export default function AdicionarAtividade() {

    const [titulo, setTitulo] = useState('');
    const [data, setData] = useState(new Date());
    const [descricao, setDescricao] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const router = useRouter()

    const handleConfirm = (date: Date) => {
        setData(date);
        setDatePickerVisibility(false);
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/images/logo_planEdu.jpeg')}
                style={styles.image}
            />
            <Text style={styles.title}>Título</Text>
            <TextInput
                value={titulo}
                onChangeText={setTitulo}
                placeholder="Digite o título..."
                style={styles.input}
            />

            <Text style={styles.title}>Data de entrega</Text>
            <Button title="Selecionar Data" onPress={() => setDatePickerVisibility(true)} />
            {data && (
                <Text style={{fontWeight: 'bold', left: 10, marginBottom: 10,}}>
                Data selecionada: {format(data, 'dd/MM/yyyy')}
                </Text>
            )}
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={() => setDatePickerVisibility(false)}
            />

            <Text style={styles.title}>Descrição</Text>
            <TextInput
                value={descricao}
                onChangeText={setDescricao}
                placeholder="Digite a descrição da atividade..."
                style={styles.input}
                multiline
            />

            <TouchableOpacity onPress={() => salvarAtividade(titulo, data, descricao, router)}>
                <Text style={styles.buttonText}>Salvar atividade</Text>
            </TouchableOpacity>
        </View>
    )};

    const styles = StyleSheet.create({
        container:{
            flex: 1,
        },
        image: {
            height: 100,
            width: 100,
        },
        title :{

        },
        input:{

        },
        buttonText:{

        }
    });
