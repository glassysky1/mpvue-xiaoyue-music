<!--  -->
<template lang>
    <div class="ucenter_container">
        <div class="header">
            <img :src="userInfo.avatarUrl" alt="">
            <span>{{userInfo.nickName}}</span>
        </div>
        
        <p @tap.stop="toMusicPlay">正在播放</p>
        <p @tap.stop="toCollection" >我的收藏</p>
        <p>关于(由村头大白鹅负责编写)</p>
    </div>
</template>

<script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';
    import { mapState,mapGetters } from "vuex";
    export default {
        //import引入的组件需要注入到对象中才能使用
        components: {},
        data() {
            //这里存放数据
            return {
                userInfo: {},
            };
        },
        //监听属性 类似于data概念
        computed: {
            ...mapGetters(['gettersSongId'])
        },
        //监控data中的数据变化
        watch: {},
        //方法集合
        methods: {
            toMusicPlay() {
                wx.navigateTo({ url: '/pages/musicplay/main?songid='+ (((this.gettersSongId==="")?true:false)?'663742556':this.gettersSongId)});  
            },
            toCollection(){
                wx.navigateTo({ url: '/pages/mycollection/main' });
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
            // console.log(this.songId);

            wx.getUserInfo({
                withCredentials: false,
                success: res => {
                    this.userInfo = res.userInfo
                    console.log(this.userInfo);
                    this.isShow = true;

                },
                fail: () => {
                    console.log('获取失败');

                },
                complete: () => { }
            });
        }, //生命周期 - 挂载之前
        beforeUpdate() { }, //生命周期 - 更新之前
        updated() { }, //生命周期 - 更新之后
        beforeDestroy() { }, //生命周期 - 销毁之前
        destroyed() { }, //生命周期 - 销毁完成
        activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
    }
</script>
<style scoped>
    .ucenter_container {}

    .header {
        height: 120rpx;
        border-bottom: 2rpx solid #e5e5e5;
        background-color: #eee;
        position: relative;
    }

    .header img {
        left: 10rpx;
        top: 10rpx;
        position: absolute;
        width: 100rpx;

        height: 100rpx;
        border-radius: 50%;
        line-height: 100rpx;
    }

    .header span {
        position: absolute;
        left: 200rpx;
        top: 50rpx;
    }

    p {
        height: 100rpx;
        line-height: 100rpx;
        border-bottom: 2rpx solid #e5e5e5;
        font-size: 34rpx;
        padding-left: 20rpx;
        letter-spacing: 5rpx;
    }
</style>