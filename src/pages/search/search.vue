<!--  -->
<template lang>
    <div class="search">
        <div class="search-title">
            <input type="text" name="" placeholder="输入搜索内容" v-model="searchContent">
            <button type="button" @tap.stop="searchHandler" name="button">搜索</button>
        </div>
        <ul class="list searchlist">
            <!-- :to="{name:'MusicPlay',params:{songid:item.songid}}" -->
            <li :key="index" class="song" v-for="(item,index) in songlist" @tap.stop="toMusicPlay(item)">
                <div class="left">
                    <div class="info  single-line ">
                        <div>
                            <span>{{ item.songname }}</span>
                        </div>
                        <span class="txt">{{ item.artistname }}</span>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';

    export default {
        //import引入的组件需要注入到对象中才能使用
        components: {},
        data() {
            //这里存放数据
            return {
                searchContent: "",
                songlist: []
            };
        },
        //监听属性 类似于data概念
        computed: {},
        //监控data中的数据变化
        watch: {},
        //方法集合
        methods: {
            toMusicPlay(item) {
                    wx.navigateTo({ url: '/pages/musicplay/main?songid=' + item.songid + '&&searchContent=' + this.searchContent })  
                this.$store.dispatch('getSongId', item.songid)

            },
            searchHandler() {
                const searchURL = "http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.search.catalogSug&query=" + this.searchContent;
                this.$fly.get(searchURL)
                    .then(res => {
                        if (res.data.error_code == 22001) {
                            alert('搜索数据不存在');
                            return;
                        }
                        this.songlist = res.data.song
                        console.log(res.data.song);
                        
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        },
        //生命周期 - 创建完成（可以访问当前this实例）
        created() {

        },
        //生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {

        },
        beforeCreate() { }, //生命周期 - 创建之前
        beforeMount() {
        }, //生命周期 - 挂载之前
        beforeUpdate() { }, //生命周期 - 更新之前
        updated() { }, //生命周期 - 更新之后
        beforeDestroy() { }, //生命周期 - 销毁之前
        destroyed() { }, //生命周期 - 销毁完成
        activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
    }
</script>
<style lang='css' scoped>
    .search-title {
        padding: 40rpx;
        overflow: hidden;
        clear: both;
    }

    input {
        width: 80%;
        height: 60rpx;
        line-height: 60rpx;
        background: #fff;
        border: 2rpx solid #f1f2f3;
        padding-left: 20rpx;
        float: left;
        display: inline-block;
    }

    button {
        float: left;
        width: 15%;
        height: 60rpx;
        font-size: 24rpx;
    }

    .list {
        word-wrap: break-word;
        -webkit-hyphens: auto;
        hyphens: auto;
        word-break: break-all;
        border-bottom: 2rpx solid #e5e5e5;
        border-top: 2rpx solid #e5e5e5;
    }

    .list li.song {
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        justify-content: space-between;
        min-height: 110rpx;
        text-align: left;
    }

    li {
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        -webkit-flex-direction: row;
        flex-direction: row;
        -webkit-box-pack: start;
        -webkit-justify-content: flex-start;
        justify-content: flex-start;
        -webkit-box-align: center;
        -webkit-align-items: center;
        align-items: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        min-height: 100rpx;
        border-bottom: 2rpx solid #F2F2F2;
        padding-left: 20rpx;
    }

    .list .item.song .left,
    .list li.song .left {
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        -webkit-flex-direction: row;
        flex-direction: row;
        -webkit-box-pack: start;
        -webkit-justify-content: flex-start;
        justify-content: flex-start;
        -webkit-box-align: center;
        -webkit-align-items: center;
        align-items: center;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .list .item .info,
    .list li .info {
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .list li .info>span {
        font-weight: 400;
        display: block;
        font-size: 24rpx;
        color: #999;
    }
</style>