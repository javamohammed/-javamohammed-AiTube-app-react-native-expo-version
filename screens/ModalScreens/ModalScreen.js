import React from "react";
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/actions/user";
import {Ionicons} from '@expo/vector-icons'
import Button from '../../components/UI/ButtonComponent';
const ModalScreen = props => {
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.user.token)
    //console.log("isAuth::", isAuth)
    const logoutHandler = ()=>{
            dispatch(logout())
            props.navigation.replace('Home')
        }
    return (
      <View style={styles.container}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <View style={styles.iconCloseContainer}>
              <Ionicons name = "md-close-circle" size={30} color='black'/>
          </View>
          </TouchableOpacity>
          <View style={styles.itemsContainer}>
            <Button paddingHorizontal={styles.button} onPress={() => props.navigation.navigate('Home')}>Home</Button>
            {isAuth !== '' && <Button paddingHorizontal={styles.button} onPress={() => props.navigation.navigate('MyVideos')}>Videos</Button>}
            {isAuth !== '' && <Button paddingHorizontal={styles.button} onPress={()=>props.navigation.navigate('AddVideo')}>New</Button>}
            {/*isAuth !== '' && <Button paddingHorizontal={styles.button} onPress={()=>props.navigation.navigate('TakeImage')}>Image</Button>*/}
            {isAuth === '' && <Button paddingHorizontal = {styles.button} onPress={() => props.navigation.navigate('Register')} >Register</Button>}
            {isAuth !== '' && <Button paddingHorizontal={styles.button} onPress={()=>console.log()}>Account</Button>}
            {isAuth === '' && <Button paddingHorizontal={styles.button} onPress={ () => props.navigation.navigate('Login')} >Login</Button>}
            {isAuth !== '' && <Button paddingHorizontal={styles.button} onPress={logoutHandler}>Logout</Button>}
          </View>
      </View>
    );
}
ModalScreen.navigationOptions = navData => {
    return {
        header: null
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        //alignItems: 'center',
        //justifyContent: 'center'
    },
    iconCloseContainer:{
        marginTop:'10%',
        marginLeft:'5%'
    },
    itemsContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        paddingHorizontal: 20
    },
})

export default ModalScreen