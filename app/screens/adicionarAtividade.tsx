import React, { useState } from "react";
import { Button, Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { StyleSheet } from "react-native";
import { format } from 'date-fns';
import { useRouter } from "expo-router";
import { salvarAtividade } from "../../services/salvarAtividades";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";
import { Background } from "@react-navigation/elements";
import { Ionicons } from "@expo/vector-icons";

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
            <View style={styles.header}>
                <Ionicons name='pencil-sharp' size ={31} color = '#4169E1'/>
                <Text style={styles.titleSupremo}>Adicionar Atividade</Text>
            </View>
                <View>
                    <View style={styles.card}>
                    <Text style={styles.title}>Título:</Text>
                        <TextInput
                            value={titulo}
                            onChangeText={setTitulo}
                            placeholder="Digite o título..."
                            style={styles.inputContainer}
                        />
                
                    <Text style={styles.title}>Data de entrega</Text>
                    <TouchableOpacity style={[styles.button, {backgroundColor: '#87CEFA'}, {width: '50%'}]} onPress={() => setDatePickerVisibility(true)}>
                        <Text style={styles.buttonText}>Selecionar</Text>
                    </TouchableOpacity>
                        {data && (
                            <Text style={{fontWeight: 'bold', marginTop: 10, marginBottom: 20,}}>
                            Data selecionada: {format(data, 'dd/MM/yyyy')}
                            </Text>
                        )}
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={() => setDatePickerVisibility(false)}
                    />
                    <Text style={styles.title}>Descrição:</Text>
                    <TextInput
                        value={descricao}
                        onChangeText={setDescricao}
                        placeholder="Digite a descrição da atividade..."
                        style={styles.inputContainer}
                        multiline
                    />

            <TouchableOpacity style={[styles.button, {width: '100%' }]} onPress={() => salvarAtividade(titulo, data, descricao, router)}>
                <Text style={styles.buttonText}>Salvar atividade</Text>
            </TouchableOpacity>
            </View>
            
            </View> 
        </View>
    )};
 const styles = StyleSheet.create({
        container: {
            justifyContent: 'center',
            backgroundColor: '#E8E8E8'
        },
        card: {
            backgroundColor: '#F8F8FF',
            width: '90%',
            height:'85%',
            borderRadius: 20,
            paddingVertical: 30,
            paddingHorizontal: 25,
            marginTop: 20,
            marginLeft: 20,
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
        },
        title: {
            fontSize: 18,
            fontWeight: '600',
            color: '#1E3A8A',
            marginBottom: 10,
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#F9FAFB',
            borderWidth: 1,
            borderColor: '#E5E7EB',
            borderRadius: 12,
            paddingHorizontal: 10,
            width: '90%',
            marginBottom: 30,
        },
        button: {
            backgroundColor: '#2563EB',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '70%',
            height: 45,
            borderRadius: 12,
            marginTop: 10,
        },
        buttonText: {
            color: '#ffffffff',
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


