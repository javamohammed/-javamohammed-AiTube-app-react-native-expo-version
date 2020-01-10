import React, { useEffect, useState } from 'react';
import {  StyleSheet,  View,   FlatList, StatusBar, Dimensions } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { fetchRandomVideosAction,deleteVideoAction } from "../store/actions/video";
//import { MaterialCommunityIcons,Ionicons } from '@expo/vector-icons';
import VideoItem from '../components/videoItem';
import NavBar from '../components/NavBar';
const MyVideosScreen = props =>{
    const dispatch = useDispatch()
    const [numberColumn, setNumberColumn] = useState(Dimensions.get('window').width > 700 ? 3 : 1)
    const MyVideos = useSelector(state => state.videos.MyVideos)
     const userId = useSelector(state => state.user.userId)
     const token = useSelector(state => state.user.token)
     console.log('userId:::', userId)
    useEffect(()=>{
        dispatch(fetchRandomVideosAction(userId))
       StatusBar.setHidden(true);
       const updateLayout = () => {
           setNumberColumn(Dimensions.get('window').width > 700 ? 3 : 1)
       }
        Dimensions.addEventListener('change', updateLayout)
        return () => {
            Dimensions.removeEventListener('change', updateLayout)
        }
    }, [dispatch, fetchRandomVideosAction, userId])
    const playVideo = (title, id) =>{
        props.navigation.navigate('Player', {
            videoId: id,
            title: title
        })
    }
    const deleteHandler = async (id) => {
        await dispatch(deleteVideoAction(id, userId, token))
    }
    const editHandler = (id, title, link) => {
            props.navigation.navigate('AddVideo', {
                videoId: id,
                title: title,
                link: link
            })
    }
    //console.log('width - ', width)
    //console.log('MyVideos =>', MyVideos)
    return (
      <View style={styles.container}>
        <NavBar onPress={()=>props.navigation.navigate('Account')}/>
        <View style={styles.body}>
            <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
                data={MyVideos}
                numColumns={numberColumn}
                key={numberColumn}
                renderItem={(video)=><VideoItem onDelete={()=>deleteHandler(video.item.id)}
                                                onEdit={()=>editHandler(video.item.id,video.item.title,video.item.link)}
                                                admin={true}
                                                showVideo={()=>{playVideo(video.item.title,video.item.id_video)}}
                                                video={video.item}
                                                numberColumns={numberColumn} />}
                //keyExtractor={(item)=>item.id}
                keyExtractor = {(item, index) => `list-item-${index}`}
                ItemSeparatorComponent={()=><View style={{height:0.5,backgroundColor:'#E5E5E5'}}/>}
            />
        </View>
      </View>
    );
}
MyVideosScreen.navigationOptions = navData => {
    return {
        header: null
    }
}

const styles = StyleSheet.create({
    container: {
            flex: 1
        },
    body: {
        flex: 1,
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%'
    },
    tabBar: {
        backgroundColor: 'white',
        height: 60,
        borderTopWidth: 0.5,
        borderColor: '#E5E5E5',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    tabItem: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabTitle: {
        fontSize: 11,
        color: '#3c3c3c',
        paddingTop: 4
    }
})
export default MyVideosScreen