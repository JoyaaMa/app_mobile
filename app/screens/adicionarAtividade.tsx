import React, { useState } from "react";
import { Button, Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { StyleSheet } from "react-native";
import { format } from 'date-fns';
import { useRouter } from "expo-router";
import { salvarAtividade } from "../../services/salvarAtividades";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";
import { KeyboardAvoidingView } from 'react-native';
import { Platform } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

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
                    <Text style={styles.title}>Data de entrega:</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        {data && (
                            <Text style={{fontWeight: 'bold', marginTop: 20, fontSize: 16,}}>
                            Data selecionada: {format(data, 'dd/MM/yyyy')}
                            </Text>
                        )}
                        <TouchableOpacity style={[styles.button, {backgroundColor: '#4682B4'}, {width: '20%'}]} onPress={() => setDatePickerVisibility(true)}>
                            <MaterialCommunityIcons name="calendar-today" size={30} color='white'/>
                        </TouchableOpacity>
                    </View>

            <TouchableOpacity style={[styles.button, {width: '100%' }, {marginTop: 80}]} onPress={() => salvarAtividade(titulo, data, descricao, router)}>
                <Text style={styles.buttonText}>Salvar atividade</Text>
            </TouchableOpacity>
            </View>
            
            </View> 
        </View>
    )};
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
             shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 5,
        },
        header: {
            flexDirection:'row',
            paddingLeft:20,
            borderBottomEndRadius: 20,
            borderBottomLeftRadius: 20,
            width: '100%',
            height: Dimensions.get('window').height/6,
            backgroundColor: '#F8F8FF',
            alignItems:'center',
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 0,
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


