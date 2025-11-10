import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        margin: 0,
        padding: 0,
    },
    header: {
        width: '100%',
        height: Dimensions.get('window').height/8,
        backgroundColor: '#0662b0',
        justifyContent: 'flex-start',
    },
    titleSupremo: {
        fontSize: 30,
        marginTop: 40,
        fontWeight: 'bold',
        color: 'white',
        left: 20,
    },
    boxLista:{
        borderWidth: 1,
        padding: 10,
        marginTop: 10,
        alignItems: 'baseline',
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 20,
        borderColor: '#87CEFA',
       
    },
    titleLista: {
        fontSize: 20,
        marginBottom: 15,
        fontWeight: 'bold',
    },
    botaoExluir:{
        padding: 10,
        borderWidth:2,
        borderRadius: 10,
        borderColor: '#8B0000',
        backgroundColor: "#DC143C",
        marginBottom: 10,

    },
    botaoEditar:{
        padding: 10,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#006400',
        backgroundColor: "#228B22",

    },
    fixedButton: {   
        position: 'absolute',
        bottom: 10,
        left: -3,
        right: 0,
        width: 70,
        height: 70,
        backgroundColor: '#0662b0',
        paddingVertical: 15,
        borderRadius: 35,
        alignItems: 'center',
    },
})