import { SONG_ID } from "./mutation-type";
export default {
    [SONG_ID](state,data){
      state.songId = data
    }
}