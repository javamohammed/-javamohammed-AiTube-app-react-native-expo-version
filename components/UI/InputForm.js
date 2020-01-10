import React from 'react';
import { StyleSheet, Text, TextInput, View } from "react-native";
const InputForm = props => {
    return (
        <View style={styles.inputsForm}>
                <Text style={styles.textStyle}>{props.children}</Text>
                <TextInput style={styles.inputTextStyle}/>
        </View>
        )
}

const styles =StyleSheet.create({
    inputsForm :{
        flexDirection:'row',
        marginHorizontal:'10%',
        marginVertical:20,
    },
    textStyle:{
        marginHorizontal:15,
        fontWeight:'bold',
        fontSize:15
    },
    inputTextStyle:{
        borderBottomWidth:1,
        width:'70%'
    }
})
export default InputForm