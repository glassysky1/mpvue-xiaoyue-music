<!--  -->
<template>
    <div>
        <div class="art-title">
            <div class="artist-header">
                <div class="header-bg"
                    :style="{background:'url(http://qukufile2.qianqian.com/data2/pic/ce52b58848ff456cd4d48765f2f3dd1e/267770218/267770218.jpg@s_0,w_240)'}">
                </div>
                <div class="header-mask"></div>
                <div class="artist-header-content">
                    <div class="pic">
                        <img :src="avatar" />
                    </div>
                    <h3>{{ name }}</h3>
                </div>
            </div>
        </div>
        <div class="art-list">
            <ul class="list">
                <!-- :to="{name:'MusicPlay',params:{songid:item.song_id}}" -->
                <li tag="li" class="song" v-for="(item,index) in listArr" :key="index" @tap.stop="toMusicPlay(item)">
                    <div class="left">
                        {{ item.title }}
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';
    export default {
        //import引入的组件需要注入到对象中才能使用
        components: {
        },
        data() {
            //这里存放数据
            return {
                avatar: '',
                name: '',
                ting_uid: '',
                listArr:[]
            };
        },
        //监听属性 类似于data概念
        computed: {},
        //监控data中的数据变化
        watch: {},
        //方法集合
        methods: {
            toMusicPlay(item) {
                wx.navigateTo({ url: '/pages/musicplay/main?songid=' + item.song_id+"&&tinguid=" + this.ting_uid });
                this.$store.dispatch('getSongId', item.song_id)

            },
        },
        //生命周期 - 创建完成（可以访问当前this实例）
        created() {

        },
        //生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {

        },
        beforeCreate() { }, //生命周期 - 创建之前
        beforeMount() {
            this.avatar = this.$mp.query.avatar
            this.name = this.$mp.query.name
            this.ting_uid = this.$mp.query.ting_uid

            const ArtList = "http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.artist.getSongList&tinguid=" + this.ting_uid + "&limits=100&use_cluster=1&order=2"
            this.$fly.get(ArtList)
                .then(res => {
                    this.listArr = res.data.songlist
                })
                .catch(error => {
                    console.log(error);
                })

        }, //生命周期 - 挂载之前
        beforeUpdate() { }, //生命周期 - 更新之前
        updated() { }, //生命周期 - 更新之后
        beforeDestroy() { }, //生命周期 - 销毁之前
        destroyed() { }, //生命周期 - 销毁完成
        activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
    }
</script>
<style scoped>
  .art-list {
        padding: 0 17rpx;
    }

    .song {
        height: 100rpx;
        line-height: 100rpx;
        border-bottom: 2rpx solid #999;
    }

    .left {
        font-size: 30rpx;
    }
    .artist-header {
        width: 100%;
        height: 320rpx;
        position: relative;
        overflow: hidden;
        box-sizing: border-box;
    }

    .header-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        -webkit-filter: blur(12rpx);
        filter: blur(12rpx);
        -webkit-transform: scale(2);
        transform: scale(2);
        background-repeat: no-repeat;
        overflow: hidden;
    }

    .header-mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, .85);
        overflow: hidden;
    }


    .artist-header-content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: 50rpx 0;
    }

    .pic {
        width: 160rpx;
        height: 160rpx;
        -webkit-border-radius: 80rpx;
        border-radius: 80rpx;
        overflow: hidden;
        margin: 0 auto;
    }

    .artist-header-content h3 {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
        font-size: 30rpx;
        line-height: 40rpx;
        margin-top: 24rpx;
        color: #333;
        font-weight: 400;
    }
    .pic img{
        width: 100%;
        height: 100%;
    }
</style>