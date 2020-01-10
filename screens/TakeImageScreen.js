import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch,useSelector } from "react-redux";
import NavBar from '../components/NavBar';
import ImgPicker from "../components/UI/ImgPicker";

const TakeImageScreen = props => {
    const [uriImageTaken, setUriImageTaken] = useState('')
    const pickedImageHandler = (uriImage)=>{
        setUriImageTaken(uriImage)
        console.log(uriImage)
    }
    return (
        <View style={styles.containerForm}>
             <NavBar onPress={()=>props.navigation.navigate('Account')}/>
            <View style={styles.containerTileScreen}>
            </View>
           < ImgPicker label = {
               uriImageTaken !== '' ? 'Save Image' : 'Take Image'
           }
           onPickedImage = {
               pickedImageHandler
           }
           />
        </View>
        )
}
TakeImageScreen.navigationOptions = navData => {
    return {
        header: null
    }
}
const styles =StyleSheet.create({
    containerForm :{
        flex:1,
    },
    tileScreen :{
        fontSize:20,
        fontStyle:'italic',
        fontWeight:'bold'
    },
    containerTileScreen:{
        justifyContent:'center',
        marginHorizontal:'30%',
        marginBottom:30,
        marginTop: 20,
        borderBottomColor:'gray'
    },
    button: {
        paddingHorizontal: 30,
    }
})
export default TakeImageScreen