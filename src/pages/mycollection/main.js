import Vue from 'vue'
import MyCollection from "./mycollection.vue";

const mycollection = new Vue(MyCollection)

//挂载当前的页面
mycollection.$mount()