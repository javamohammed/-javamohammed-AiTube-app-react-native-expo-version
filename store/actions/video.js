//import { insertVideo, fetchVideos, deleteVideo, updateVideo } from "../../helpers/db";
import getEnvVars from '../../environment.js';
const { urlFireBase} = getEnvVars();
import Video from '../../Models/Video';
export const ADD_VIDEO = 'ADD_VIDEO'
export const DELETE_VIDEO = 'DELETE_VIDEO'
export const FETCH_RANDOM_VIDEO = 'FETCH_RANDOM_VIDEO'
export const FETCH_MY_VIDEO = 'FETCH_MY_VIDEO'
export const UPDATE_VIDEO = 'UPDATE_VIDEO'


const getIdVideo = (link) => {
    let id = ""
    if ((id = link.match(/(\?|&)v=([^&#]+)/))) {
        return id.pop();
    } else if ((id = link.match(/(\.be\/)+([^\/]+)/))) {
        return id.pop();
    } else if ((id = link.match(/(\embed\/)+([^\/]+)/))) {
        return id.pop().split('&')[0].replace("?rel=0", "");
    }
}

export const addVideo = (title, link,userId, token,first_name) =>{
    return async dispatch =>{
         //const resultVideo = await insertVideo(link, getIdVideo(link), title, 'description', new Date().toString(), userId)
         const resultVideo = await fetch(`${urlFireBase}/videos.json?auth=${token}`, {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify({
                link:link,
                id_video:getIdVideo(link),
                title:title,
                description:'description',
                published_at:new Date().toString(),
                userId: userId
             })
         })
         const resData = await resultVideo.json()
        // console.log(resData)
         dispatch({
             type: ADD_VIDEO,
             videoData: {
                 id: resData.name,
                 link,
                 title,
                 description: 'description',
                 published_at: new Date().toString(),
                 user_id: first_name
             }
         })
       /* const res = await deleteVideo()
        console.log(res)
          dispatch({
                      type: ADD_VIDEO,
                      videoData: {
                          id: new Date().toString(),
                          link: "link",
                          title: "title",
                          description: 'description',
                          published_at: new Date().toString(),
                          user_id: 'u1'
                      }
                    })
        for (let index = 0; index < data.items.length; index++) {
            const item = data.items[index];
            const resultVideo = await insertVideo(item.linkVideo, item.idVid, item.title, item.description, item.publishedAt, item.idUser)
            console.log(resultVideo.insertId)
        }
        dispatch({
                type: ADD_VIDEO,
                videoData: {
                    id: new Date().toString(),
                    link:"link",
                    title:"title",
                    description: 'description',
                    published_at: new Date().toString(),
                    user_id: 'u1'
                }
                    })*/
    }
}

export const deleteVideoAction = (id, user_id, token) =>{
    return async dispatch =>{
        //await deleteVideo(id, user_id)
        await fetch(`${urlFireBase}/videos/${id}.json?auth=${token}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        dispatch(fetchRandomVideosAction(user_id))
        dispatch({
            type: DELETE_VIDEO
        })
    }
}

export const updateVideoAction = (id_video, title, user_id, token, first_name) => {
    return async dispatch => {
        //await updateVideo(id_video, title, user_id)
        const resultVideo = await fetch(`${urlFireBase}/videos/${id_video}.json?auth=${token}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
            })
        })
        const resData = await resultVideo.json()
        console.log('id_video::', id_video)
        console.log('resData::',resData)
        dispatch(fetchRandomVideosAction(user_id))
        dispatch({
            type: UPDATE_VIDEO
        })
    }
}

export const fetchRandomVideosAction = (user_id) => {
    return async dispatch => {
        try {
            const videos = await fetch(`${urlFireBase}/videos.json`)
            const resData = await videos.json()
            const loadedVideos = []
            for (const key in resData) {
                loadedVideos.push(new Video(
                    key,
                    resData[key].link,
                    resData[key].id_video,
                    resData[key].title,
                    resData[key].description,
                    resData[key].published_at,
                    resData[key].userId))
            }
            if (user_id === '') {
                dispatch({
                    type: FETCH_RANDOM_VIDEO,
                    RandVideos: loadedVideos
                })
            } else {
                dispatch({
                    type: FETCH_MY_VIDEO,
                    MyVideos: loadedVideos.filter(video => video.user_id === user_id)
                })
            }
        } catch (error) {
            throw error
        }
        /*
        console.log('loadedVideos::::', loadedVideos)
        try {
            const dbResult = await fetchVideos(user_id)
            if(user_id===''){
               //console.log('user_id : ', user_id)
               console.log('dbResult.rows._array ::: ', dbResult.rows._array)
                dispatch({
                    type: FETCH_RANDOM_VIDEO,
                    RandVideos: dbResult.rows._array
                })
            }else{
                dispatch({
                    type: FETCH_MY_VIDEO,
                    MyVideos: dbResult.rows._array
                })
            }
        } catch (error) {
            throw error
        }*/
    }
}