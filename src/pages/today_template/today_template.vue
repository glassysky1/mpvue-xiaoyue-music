<!--  -->
<template>
    <div class="albums">

        <div class="albums_head">
            <h2>{{title}}</h2>
            <div @tap.stop="toMore">更多</div>
        </div>
        <div class="albums_container">
            <div class="scroller" v-for="(item,index) in songArr" :key="index" @tap.stop="toMusicPlay(item)">
                <img :src="item.pic_big" alt="">
                <div> {{ item.title }} </div>
            </div>
        </div>
    </div>
</template>

<script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';
    export default {
        data() {
            return {
                title: '',
                type: '',
                songArr:[]
            }
        },
        methods: {
            toMusicPlay(item) {
                wx.navigateTo({ url: '/pages/musicplay/main?songid='+ item.song_id +'&&type='+this.type});
                let songId = item.song_id
                this.$store.dispatch('getSongId', songId)
                
            },
            toMore(){
                wx.navigateTo({ url:'/pages/more/main?type=' + this.type} )
            }
        },
        mounted() { 

        },
        props: ['title', 'type'],
        beforeMount() {
            var HOSTURL = 'http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.billboard.billList&type=' + this.type + '&size=6&offset=0'
            this.$fly.get(HOSTURL)
                .then(res => {
                    let songArr = res.data.song_list
                    this.songArr = songArr
                })
                .catch(err => {
                    console.log(err);

                })
        }
    }
</script>
<style>
    .albums {
        background-color: #fff;
        padding: 20rpx 34rpx;
        display: flex;
        flex-direction: column;
    }

    .albums_head {
        display: flex;
        margin: 28rpx 0 26rpx 0;
    }

    .albums_head h2 {
        flex: 1;
        margin: 0;
        padding: 0;
        font-size: 40rpx;
        font-weight: bold;
    }

    .albums_container {
        width: 100%;
    }

    .scroller {
        float: left;
        border: 2rpx solid #eee;
        padding: 2rpx;
        margin-left: 15rpx;
        margin-bottom: 15rpx;
        box-sizing: border-box;
        width: 200rpx;
        overflow: hidden
    }

    .scroller img {
        width: 200rpx;
        height: 200rpx;
    }

    .scroller div {
        font-size: 25rpx;
        color: #555;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
</style>