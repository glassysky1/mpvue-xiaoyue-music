import Vue from 'vue'
import Artists from "./artists.vue";

const artists = new Vue(Artists)

//挂载当前的页面
artists.$mount()