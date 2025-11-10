import { Dimensions,StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#E8F0FF',
        
    },
     header: {
            width: '100%',
            height: Dimensions.get('window').height/8,
            backgroundColor: '#0662b0',
            justifyContent: 'flex-start',
        },
    boxCorpo:{
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      height: 600,
      padding: 40,
      marginBottom: 10,
      marginTop: 100,
      borderWidth: 1,
      borderColor: 'grey',
      borderRadius: 20,
      shadowColor: '#000', // Cor da sombra
      shadowOffset: { width: 0, height: 2 }, // Deslocamento da sombra
      shadowOpacity: 0.25, // Opacidade da sombra
      shadowRadius: 3.84, // Raio de desfoque da sombra
      elevation: 5, // Necessário para sombra no Android
    },
      image:{
        width: 90, 
        height: 90,
        borderRadius: 30,
      },

      descrition:{
        color:'black',
        fontSize:15,
        paddingHorizontal:10,
      },

      botao:{
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center',
        margin:15,
      },

      index:{
        alignItems:'center',
        textAlign:'center',
        fontWeight:'bold',
       },

      ButtonText:{
        textAlign:'center',
        justifyContent:'center',
        alignItems:'center',
        margin:15,
        borderColor: '#0662b0',
        borderWidth: 1,
        backgroundColor:'#0662b0',
        color:'#ffffff',
        fontSize:14,
        fontWeight:'bold',
        borderRadius:20,
        padding:4,
        width:150,
        height:40,
        shadowColor: '#000', // Cor da sombra
        shadowOffset: { width: 0, height: 2 }, // Deslocamento da sombra
        shadowOpacity: 0.25, // Opacidade da sombra
        shadowRadius: 3.84, // Raio de desfoque da sombra
        elevation: 5, // Necessário para sombra no Android

      },

      title: {
        color:'#0662b0',
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign:'center',
        justifyContent:'center',
       },
       
      input: {
        padding:8,
        margin: 9,
        marginBottom: 20,
        width: 250,
        height: 45,
        borderWidth: 1,
        borderColor: "#87CEFA",
        borderRadius: 20,
        backgroundColor: 'azure',
        shadowColor: '#000', // Cor da sombra
        shadowOffset: { width: 0, height: 2 }, // Deslocamento da sombra
        shadowOpacity: 0.25, // Opacidade da sombra
        shadowRadius: 3.84, // Raio de desfoque da sombra
        elevation: 5, // Necessário para sombra no Android
      },

     dashbord:{
      flex:1,
      backgroundColor:'pink',
      flexDirection:'column',
     },

     dashbord2:{
      flex:2,
      backgroundColor:'yellow',
      flexDirection:'column',
     }
});