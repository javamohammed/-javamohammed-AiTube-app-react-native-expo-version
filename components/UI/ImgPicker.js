import React ,{useState} from 'react'
import { View, Button, Text, Image,Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
const ImgPicker = (props) =>{
    const [pickedImage, setPickedImage] = useState('')
    const verifyPermission = async () =>{
        const result = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        //console.log(result)
        if (result.status !== 'granted') {
            Alert.alert(
                'Insufficient permissions!',
                'You need to grant camera permissions to use this app.',
                [{text:'Okay'}])
            return false
        }
        return true
    }
    const takeImageHandler = async () =>{
        const hasPermission = await verifyPermission()
        if(!hasPermission){
            return
        }
        const image = await  ImagePicker.launchCameraAsync({
            allowsEditing:true,
            aspect:[16, 9],
            quality: 0.5
        })
        //console.log(image)
        setPickedImage(_=>{
            props.onPickedImage(image.uri)
            return image.uri
        })

    }
    return(
        <View style={styles.imagePicker}>
           <View style={styles.imagePreview}>
            {!pickedImage ? <Text>No image Picked yet!</Text>
            : <Image style={styles.image} source={{ uri: pickedImage}}/>}
           </View>
           <Button title = {props.label} color="red" onPress={takeImageHandler}/>
        </View>
    )
}

const  styles = StyleSheet.create({
    imagePicker:{
        alignItems:'center',
        marginBottom:5
    },
    imagePreview : {
        width:'100%',
        height:200,
        marginBottom:10,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'#ccc',
        borderWidth:1
    },
    image:{
        width:'100%',
        height:'100%'
    }
})

export default ImgPicker;