import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";


export default function aaa() {
    return (
        <View style={styles.background}>
            <LinearGradient
                    colors={['#E8F0FF', '#C5D8FF']}
                    style={StyleSheet.absoluteFillObject}
                ></LinearGradient>
            <View>
                <View style={styles.header}>
                    <MaterialCommunityIcons name='face-agent' size ={31} color = '#4169E1'/>
                    <Text style={styles.titleSupremo}>Suporte</Text>
                </View>
            </View>

            <Text style={{fontWeight: 'bold', fontSize: 15}}>Rômulo - 01717798</Text>
            <Text style={{fontWeight: 'bold', fontSize: 15}}>Joyce - 01696139</Text>
            <Text style={{fontWeight: 'bold', fontSize: 15}}>Simone - 01652803</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    background: {
        flex: 1,
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
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowRadius: 10,
                elevation: 5,
                    
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

})
