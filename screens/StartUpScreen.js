import React, {useEffect} from 'react';
import {View, ActivityIndicator, AsyncStorage } from 'react-native';
import { useDispatch } from 'react-redux';
import {authenticate} from '../store/actions/user';
const StartUpScreen = props => {
    const dispatch = useDispatch()
    useEffect(()=>{
        const asyncLogin = async ()=>{
            const userData = await AsyncStorage.getItem('userDataAiTube')
            if(!userData){
                console.log('if 1 ', userData)
                props.navigation.navigate('Home')
                return
            }
            const transformedData = JSON.parse(userData)
            const {expirationDate, token, userId, email } = transformedData
            if(expirationDate <= new Date() || !token || !userId){
                console.log('if 2 ')
                 props.navigation.navigate('Home')
                 return
            }
            const expiryTime = new Date().getTime() - (new Date(expirationDate).getTime())
            console.log('expiryTime', expiryTime)
            dispatch(authenticate(token, userId, expiryTime, email))
            console.log('userDataAiTube:::', token)
            props.navigation.navigate('Home')

        }
        asyncLogin()
    },[dispatch])
    return <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <ActivityIndicator size='large' color="black"/>
        </View>
};

export default StartUpScreen;