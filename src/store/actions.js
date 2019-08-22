import { SONG_ID } from "./mutation-type";
export default{
    getSongId({commit},data){
        commit(SONG_ID,data)
    }
    
}