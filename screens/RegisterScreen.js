import React, { useEffect, useCallback, useReducer,useState } from "react";
import { StyleSheet, Text, View, ScrollView, Alert, KeyboardAvoidingView } from "react-native";
import { useDispatch } from "react-redux";
import NavBar from '../components/NavBar';
import ButtonSave from '../components/UI/ButtonComponent';
import Input from '../components/UI/Input';
import { signup } from "../store/actions/user";
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
const RegisterScreen = props =>{
    const dispatch = useDispatch()
    const [error, setError] = useState();
    const [formState, dispatchFromState] = useReducer(formReducer, {
        inputsValues: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            confirm_password:"",
            country: "",
        },
        inputsValidities: {
            first_name: false,
            last_name: false,
            email: false,
            password: false,
            confirm_password:false,
            country: false,
        },
        formIsValid: false
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
    useEffect(() => {
        if (error) {
            Alert.alert('An Error Occurred!', error, [{
                text: 'Okay'
            }]);
        }
    }, [error]);
    const submitHandler =  useCallback( async() => {
        if (!formState.formIsValid) {
            Alert.alert("wrong input!", "Please check the errors in the form", [{
                text: "Oky"
            }]);
            return;
        }
        setError(null);
        try {
            await dispatch(signup(
                formState.inputsValues.first_name,
                formState.inputsValues.last_name,
                formState.inputsValues.email,
                formState.inputsValues.password,
                formState.inputsValues.country))
            props.navigation.replace('Home')
        } catch (err) {
             setError(err.message);
        }
    }, [formState, signup, dispatch, props]);
    return (
        <ScrollView style={styles.containerForm}>
            <NavBar onPress={()=>props.navigation.navigate('Account')}/>
            <View style={styles.containerTileScreen}>
                <Text style={styles.tileScreen}>Register :</Text>
            </View>
            <Input
                id='first_name'
                label='First Name'
                keyboardType='default'
                autoCapitalize='sentences'
                autoCorrect
                returnKeyType={'next'}
                errorText = 'First Name is required'
                onInputChange={inputChangeHandler}
                initialValue=''
                initiallyValid={false}
                required
                CommonWith= {{labelWith:'30%', inputWith:'70%'}}
                autoFocus = {true}
                />
                <Input
                id = 'last_name'
                label='Last Name'
                keyboardType='default'
                returnKeyType='next'
                errorText = 'Last Name is required'
                onInputChange={inputChangeHandler}
                initialValue=''
                initiallyValid={false}
                required
                CommonWith= {{labelWith:'30%', inputWith:'70%'}}
            />
            <Input
                id = 'email'
                label='Email'
                keyboardType='default'
                returnKeyType='next'
                errorText = 'Email is required'
                onInputChange={inputChangeHandler}
                initialValue=''
                initiallyValid={false}
                required
                CommonWith= {{labelWith:'30%', inputWith:'70%'}}
            />
            <Input
                id = 'password'
                label='Password'
                keyboardType='default'
                returnKeyType='next'
                errorText = 'Enter a valid Password'
                secureTextEntry={true}
                onInputChange={inputChangeHandler}
                initialValue=''
                initiallyValid={false}
                required
                minLength={6}
                CommonWith= {{labelWith:'30%', inputWith:'70%'}}
            />
            <Input
                id = 'confirm_password'
                label='Confirm Password'
                confirm_password = {formState.inputsValues.password}
                keyboardType='default'
                returnKeyType='next'
                errorText = 'Enter a valid Confirm Password'
                secureTextEntry={true}
                onInputChange={inputChangeHandler}
                initialValue=''
                initiallyValid={false}
                required
                minLength={6}
                CommonWith= {{labelWith:'30%', inputWith:'70%'}}
            />
            <Input
                id = 'country'
                label = 'Country'
                keyboardType='default'
                returnKeyType='next'
                errorText = 'Country is required'
                onInputChange={inputChangeHandler}
                initialValue=''
                initiallyValid={false}
                required
                CommonWith= {{labelWith:'30%', inputWith:'70%'}}
            />
            <ButtonSave paddingHorizontal={styles.button} onPress={submitHandler}>Register</ButtonSave>
        </ScrollView>
        )
}
RegisterScreen.navigationOptions = navData => {
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
        alignContent:'center',
        marginHorizontal:'30%',
        marginBottom:30,
        marginTop: 20,
        borderBottomColor:'gray'
    },
    button: {
        paddingHorizontal: 20,
    },
})
export default RegisterScreen