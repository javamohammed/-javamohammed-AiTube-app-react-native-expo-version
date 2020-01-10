import {ADD_VIDEO, FETCH_MY_VIDEO, FETCH_RANDOM_VIDEO, UPDATE_VIDEO, DELETE_VIDEO} from "../actions/video";
import Video from "../../Models/Video";
const initialState = {
    MyVideos:[],
    RandVideos:[]
}
export const videoReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_VIDEO: //id, link, id_video, title, description, published_at, user_id
            const newVideo = new Video(
                            action.videoData.id,
                            action.videoData.link,
                            action.videoData.id_video,
                            action.videoData.title,
                            action.videoData.description,
                            action.videoData.published_at,
                            action.videoData.user_id)
            return {
                ...state,
                MyVideos:[...state.MyVideos, newVideo]
            }
        case FETCH_RANDOM_VIDEO:
            //console.log('MyVideos => ', action.RandVideos)
            return {
                ...state,
                RandVideos: [...action.RandVideos]
            }
        case DELETE_VIDEO:
            //console.log('MyVideos => ', action.RandVideos)
            return {
                ...state,
            }
        case UPDATE_VIDEO:
            //console.log('MyVideos => ', action.RandVideos)
            return {
                ...state,
            }
        case FETCH_MY_VIDEO:
            //console.log('MyVideos => ', action.RandVideos)
            return {
                ...state,
                MyVideos: action.MyVideos
            }
        default:
            return state
    }
}