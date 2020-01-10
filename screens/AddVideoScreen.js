import React, { useState, useCallback, useReducer } from "react";
import { StyleSheet, ActivityIndicator, Text, TextInput, View, ScrollView, Alert, KeyboardAvoidingView } from "react-native";
import { useDispatch,useSelector } from "react-redux";
import NavBar from '../components/NavBar';
import ButtonSave from '../components/UI/ButtonComponent';
import Input from '../components/UI/Input';
import { addVideo, updateVideoAction } from "../store/actions/video";
const FORM_INPUT_VALIDATE = "FORM_INPUT_VALIDATE";
const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_VALIDATE) {
        const updateValues = {
            ...state.inputsValues,
            [action.input]: action.value
        };
        const updateValidities = {
            ...state.inputsValidities,
            [action.input]: action.isValid
        };
        let updateFormIsValid = true;
        for (const key in updateValidities) {
            updateFormIsValid = updateFormIsValid && updateValidities[key];
        }
        return {
            inputsValues: updateValues,
            inputsValidities: updateValidities,
            formIsValid: updateFormIsValid
        };
    }
    return state;
};
const AddVideoScreen = props =>{
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false);
    const userId = useSelector(state => state.user.userId)
    const token = useSelector(state => state.user.token)
    const title = props.navigation.getParam('title')
    const link = props.navigation.getParam('link')
    const videoId = props.navigation.getParam('videoId')
    const [formState, dispatchFromState] = useReducer(formReducer, {
        inputsValues: {
            title: title ? title : "",
            link: link ? link : "",
        },
        inputsValidities: {
            link: link ? true : false,
            title: title ? true : false,
        },
        formIsValid: videoId ? true : false,
    });
    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            //console.log('inputValue =>', inputValue)
            dispatchFromState({
                type: FORM_INPUT_VALIDATE,
                isValid: inputValidity,
                value: inputValue,
                input: inputIdentifier
            });
        },
        [dispatchFromState]
    );
    const submitHandler = useCallback( async() => {
        //console.log('formIsValid', formState.formIsValid)
        if (!formState.formIsValid) {
            Alert.alert("wrong input!", "Please check the errors in the form", [{
                text: "Oky"
            }]);
            return;
        }
        /*
         Alert.alert("Nice!", "All Works :)", [{
             text: "Oky"
         }]);*/
         setIsLoading(true)
         if (videoId) {
            await dispatch(updateVideoAction(videoId,formState.inputsValues.title, userId,token,"first_name"))
         }else{
             await dispatch(addVideo(formState.inputsValues.title, formState.inputsValues.link, userId, token, "first_name"))
         }
         setIsLoading(false)
         props.navigation.replace('MyVideos')
    }, [formState, addVideo, dispatch, userId, token]);
    return (
        <View style={styles.containerForm}>
            {!videoId && <NavBar onPress={()=>props.navigation.navigate('Account')}/>}
            <View style={styles.containerTileScreen}>
                <Text style={styles.tileScreen}>
                    {videoId && "Edit Video :"}
                    {!videoId && "Add New Video :"}
                </Text>
            </View>
            <Input
                id='title'
                label='Title'
                keyboardType='default'
                autoCapitalize='sentences'
                autoCorrect
                returnKeyType='next'
                errorText = 'Please, Enter a valid title'
                onInputChange={inputChangeHandler}
                initialValue={formState.inputsValues.title}
                initiallyValid={formState.inputsValidities.title}
                required
                CommonWith= {{labelWith:'12%', inputWith:'80%'}}
            />
             {!videoId &&<Input
                id='link'
                label='Link'
                keyboardType='default'
                returnKeyType='next'
                errorText = 'Please, Enter a valid Link Youtube'
                onInputChange={inputChangeHandler}
                initialValue={formState.inputsValues.link}
                initiallyValid={formState.inputsValidities.link}
                required
                CommonWith= {{labelWith:'12%', inputWith:'80%'}}
            />}
            {isLoading ? (<ActivityIndicator size="large" color="red" />)
            :
            (
                <ButtonSave paddingHorizontal={styles.button} onPress={submitHandler}>Save</ButtonSave>

            )

            }
        </View>
        )
}
AddVideoScreen.navigationOptions = navData => {
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
export default AddVideoScreen