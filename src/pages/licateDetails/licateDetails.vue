<!--  -->
<template>
    <div class="listdetails">
        <div class="banner-img">
            <img :src="listCateData.billboard.pic_s444" alt="">
        </div>
        <ul class="list">
            <li :key="index"
                v-for="(item,index) in listCateData.song_list" @tap.stop = "toMusicPlay(item)">
                <p class="title">{{ item.title }}</p>
                <p class="author">{{ item.author }}</p>
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
                listCateData: {
                    song_list: [],
                    billboard: {}
                },
                offset:0,
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
                wx.navigateTo({ url: '/pages/musicplay/main?songid=' + item.song_id +'&&type='+ this.$mp.query.musicType});
                this.$store.dispatch('getSongId', item.song_id)
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
            const licateUrl = "http://tingapi.ting.baidu.com//v1/restserver/ting?method=baidu.ting.billboard.billList&type=" + this.$mp.query.musicType + "&size=100&offset=0"
            this.$fly.get(licateUrl)
                .then(res => {
                    this.listCateData = res.data
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
    .banner-img img {
        width: 100%;
    }

    .list {
        padding: 20rpx 34rpx;
        background: #fff;
    }

    .list li {
        margin: 20rpx 10rpx;
        padding-bottom: 20rpx;
        border-bottom: 2rpx solid #999;
    }

    .title {
        font-size: 36rpx
    }

    .author {
        font-size: 28rpx;
        color: #999
    }
</style>