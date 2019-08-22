<!--  -->
<template>
    <div class="more-list">
        <div class="wrapper">
            <h3>{{title }}</h3>
            <div class="info url log" v-for="(item,index) in moreListData" :key="index" @tap.stop="toMusicPlay(item)">
                <div class="poster">
                    <img :src="item.pic_big" :alt="item.title">
                </div>
                <div class="text-wrap">
                    <div class="title">{{ item.title }}</div>
                    <div class="author">{{ item.artist_name }}</div>
                </div>
            </div>
        </div>
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
                type: '',
                moreListData: [],
                title: '',
                offset: 0,
                flag:false
            };
        },
        //监听属性 类似于data概念
        computed: {},
        //监控data中的数据变化
        watch: {},
        //方法集合
        methods: {
            toMusicPlay(item) {
                wx.navigateTo({ url: '/pages/musicplay/main?songid=' + item.song_id +"&&type="+this.type });
                this.$store.dispatch('getSongId', item.song_id)
            }
        },
        onPullDownRefresh() {
            wx.showNavigationBarLoading()
            const HOSTURL = 'http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.billboard.billList&type=' + this.type + '&size=10&offset=' + this.offset
            this.$fly.get(HOSTURL)
                .then(res => {
                    this.offset >= res.data.billboard.billboard_songnum - 12 ? (this.flag = true) : this.offset += 12;
                    this.moreListData = res.data.song_list
                     var title = "没有更多数据"
                     setTimeout(() => {
                         if (this.flag) {
                             wx.showToast({
                                 title,
                                 icon: 'success'
                             })
                         }
                     }, 100);
                    wx.hideNavigationBarLoading()
                    wx.stopPullDownRefresh();
                })
                .catch(err => {
                    console.log(err);

                })

        },
        mounted() {
            // 调用应用实例的方法获取全局数据

        },
        //生命周期 - 创建完成（可以访问当前this实例）
        created() {

        },
        beforeCreate() { }, //生命周期 - 创建之前
        beforeMount() {
            this.type = this.$mp.query.type
            if (this.type === '1') {
                this.title = '新歌速递'
            } else if (this.type === '25') {
                this.title = '网络歌曲'
            } else {
                this.title = "热门金曲"
            }
            var HOSTURL = 'http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.billboard.billList&type=' + this.type + '&size=10&offset=0'
            this.$fly.get(HOSTURL)
                .then(res => {
                    let moreListData = res.data.song_list

                    // this.$stsore.dispatch('getSongArr',songArr)
                    this.moreListData = moreListData


                })
                .catch(err => {
                    console.log(err);

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
    .wrapper {
        padding-top: 26rpx;
        text-align: center;
        margin-bottom: 20rpx;
        background: #fff;
        clear: both;
        overflow: hidden;
    }

    h3 {
        font-size: 44rpx;
        text-align: left;
        margin-left: 34rpx;
        margin-bottom: 10rpx;
    }

    .wrapper .info {
        width: 42%;
        float: left;
        text-align: center;
        padding-left: 34rpx;
        display: block;
        text-align: left;
        margin-bottom: 20rpx;
        position: relative;
        overflow: hidden;
    }

    .info img {
        width: 100%;
        height: 350rpx;
    }

    .text-wrap .title {
        font-size: 25rpx;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .text-wrap .author {
        font-size: 20rpx;
        color: #333333;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
</style>