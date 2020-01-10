import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, StatusBar, Dimensions } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { fetchRandomVideosAction } from "../store/actions/video";
//import { MaterialCommunityIcons,Ionicons } from '@expo/vector-icons';
import VideoItem from '../components/videoItem';
import NavBar from '../components/NavBar';
const HomeScreen = props =>{
    const dispatch = useDispatch()
    const [numberColumn, setNumberColumn] = useState(Dimensions.get('window').width > 700 ? 3 : 1)
    const randVideos = useSelector(state => state.videos.RandVideos)
    useEffect(()=>{
        dispatch(fetchRandomVideosAction(''))
       StatusBar.setHidden(true);
       const updateLayout = () => {
           setNumberColumn(Dimensions.get('window').width > 700 ? 3 : 1)
       }
        Dimensions.addEventListener('change', updateLayout)
        return () => {
            Dimensions.removeEventListener('change', updateLayout)
        }
    }, [dispatch, fetchRandomVideosAction])
    const playVideo = (title, id) =>{
        props.navigation.navigate('Player', {
            videoId: id,
            title: title
        })
    }
    //console.log('width - ', width)
    //console.log('randVideos =>', randVideos)
    return (
      <View style={styles.container}>
        <NavBar onPress={()=>props.navigation.navigate('Account')}/>
        <View style={styles.body}>
            <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
                data={randVideos}
                numColumns={numberColumn}
                key={numberColumn}
                renderItem={(video)=><VideoItem showVideo={()=>{playVideo(video.item.title,video.item.id_video)}} video={video.item} numberColumns={numberColumn} />}
                //keyExtractor={(item)=>item.id}
                keyExtractor = {(item, index) => `list-item-${index}`}
                ItemSeparatorComponent={()=><View style={{height:0.5,backgroundColor:'#E5E5E5'}}/>}
            />
        </View>
      </View>
    );
}
HomeScreen.navigationOptions = navData => {
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
export default HomeScreen