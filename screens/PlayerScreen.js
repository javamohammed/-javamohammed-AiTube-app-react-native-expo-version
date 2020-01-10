import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, FlatList, StatusBar, Dimensions, WebView } from 'react-native';
import VideoItemSmall from '../components/videoItemSmall';
import { useDispatch, useSelector } from "react-redux";
import { fetchRandomVideosAction } from '../store/actions/video';


const PlayerScreen = props =>{
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
    const playVideo = (title, id) => {
      props.navigation.navigate('Player', {
        videoId: id,
        title: title
      })
    }
    //console.log('width - ', width)
    const videoId = props.navigation.getParam('videoId')
    return (
      <View style={styles.container}>
        <View style={styles.body}>
              <View  style={{ height:400, marginTop:10, marginBottom:5}}>
                 <View style={{ height: 200,flex: 1 }}>
                  <WebView
                    automaticallyAdjustContentInsets={false}
                    javaScriptEnabled={true}
                    source={{uri: `https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1&showinfo=0&controls=0`}}
                  />
          </View>
                  <Text style={styles.titleVideo}>{props.navigation.getParam('title')}</Text>
                  <View style={styles.profileContainer}>
                            {/*<Image source={{ uri: 'https://randomuser.me/api/portraits/men/0.jpg' }} style={{ width: 50, height: 50, borderRadius: 25 }} />*/}
                            {/*<Text>Aicha</Text>*/}
                    </View>
              </View>
              <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
                data={randVideos}
                numColumns={numberColumn}
                key={numberColumn}
                renderItem={(video)=><VideoItemSmall showVideo={()=>{playVideo(video.item.title,video.item.id_video)}} video={video.item} numberColumns={numberColumn} />}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={()=><View style={{height:0.5,backgroundColor:'#E5E5E5'}}/>}
            />
        </View>
      </View>
    );
}
PlayerScreen.navigationOptions = navData => {
  const title = navData.navigation.getParam('title')
  return {
     title: title,
       headerStyle: {
         height: 30
       }
  }
}
const styles = StyleSheet.create({
    container: {
          flex: 1,
          borderBottomWidth:1
        },
    body: {
        flex: 1,
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
    },
    titleVideo:{
      fontSize:20,
      textAlign:'center',
      paddingVertical:10,
      paddingHorizontal:10
    },
    profileContainer: {
      fontSize: 15,
      paddingTop: 3,
      marginLeft: 10,
      justifyContent: 'center',
      alignItems: 'flex-start'
    }
})
export default PlayerScreen