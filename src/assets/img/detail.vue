<template>
    <div class="detailContainer">
        <img class="detail_img" :src="detailObj.detail_img" alt="">
        <img @tap.stop="handleMusicPlay" class="music_img" :src="isMusicPlay? '/static/images/music/music-stop.png' :'/static/images/music/music-start.png'" alt="">
        <div class="avatar_date">
            <img :src="detailObj.avatar" alt="">
            <span> {{detailObj.author}} </span>
            <span>发布于</span>
            <span> {{detailObj.date}} </span>
        </div>
        <p class="company"> {{detailObj.title}} </p>
        <div class="collection_share_container">
            <div class="colletion_share">
                <img @tap.stop="handleCollection" :src="isCollected ?'/static/images/icon/collection.png' :'/static/images/icon/collection-anti.png'" alt="">
                <img @tap.stop="hendleShare" src="/static/images/icon/share-anti.png" alt="">
            </div>
            <div class="line"></div>
        </div>
        <button open-type="share" >转发此文章</button>
        <p class="content"> {{detailObj.detail_content}} </p>
    </div>
</template>

<script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';
    import { mapState } from "vuex";
    import IsPlayObj from '../../datas/isPlay.js'
    export default {
        //import引入的组件需要注入到对象中才能使用
        components: {},
        data() {
            //这里存放数据
            return {
                detailObj:{},
                isCollected:false,
                isMusicPlay:false
            };
        },
        //监听属性 类似于data概念
        computed: {
            ...mapState(['listTmp'])
        },
        //监控data中的数据变化
        watch: {},
        //方法集合
        methods: {
            handleCollection(){
                let isCollected = !this.isCollected
                this.isCollected = isCollected
                let title = this.isCollected ?'收藏成功' : '取消收藏'
                wx.showToast({
                    title,
                    icon:'success'
                })
                //读取之前本地缓存的状态查看是否收藏
                let oldStorage = wx.getStorageSync('isCollected')
                oldStorage[this.$mp.query.index] = isCollected
                wx.setStorage({
                    key:'isCollected',
                    data:oldStorage
                })
            },
            //处理音乐播放
            handleMusicPlay(){
                let isMusicPlay = !this.isMusicPlay
                this.isMusicPlay = isMusicPlay
                let {dataUrl,title} = this.detailObj.music
                if(isMusicPlay){
                    wx.playBackgroundAudio({
                        dataUrl,
                        title
                    })
                }else{
                    wx.pauseBackgroundAudio()
                }
            },
            hendleShare(){
                wx.showActionSheet({
                    itemList:[
                        '操操操','lalalalal'
                    ]
                })
            }

        },
       
        //生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {
          
            this.detailObj = this.listTmp[this.index]
        },
        beforeMount(){
            this.index = this.$mp.query.index
            //预处理工作：本地是否收藏的缓存
            let oldStorage = wx.getStorageSync('isCollected')
            if(!oldStorage){
                wx.setStorage({
                    key: 'isCollected',
                    data: {}
                }) 
            } else{
                //用户缓存过
                //oldStorage[this.index] --->true || false || undefined
                this.isCollected  = (oldStorage[this.index]?true:false)

            }

            //判断当前页面加载的时候音乐是否在播放
            IsPlayObj.pageIndex ===this.index && IsPlayObj.isPlay ?this.isMusicPlay =true:this.isMusicPlay=false

            //监听音乐播放和暂停
            wx.onBackgroundAudioPlay(()=>{
                console.log('音乐播放');
                //修改状态
                this.isMusicPlay =true
                IsPlayObj.pageIndex = this.index
                IsPlayObj.isPlay = true
            })
            wx.onBackgroundAudioPause(()=>{
                console.log('音乐暂停');
                this.isMusicPlay = false
                IsPlayObj.isPlay = false
            })
        }
    }
</script>
<style>
    .detailContainer{
        display: flex;
        flex-direction: column;
    }
    .detail_img{
        width: 100%;
        height: 460rpx;
    }
    .avatar_date{
        padding: 10rpx;
    }
    .avatar_date img{
        width: 64rpx;
        height: 64rpx;
        vertical-align: middle;
    }
    .avatar_date span{
        font-size: 28rpx;
        margin-left: 10rpx;
    }
    .company{
        font-size: 32rpx;
        font-weight: bold;
        padding: 10rpx;
    }
    .collection_share_container{
        position: relative
    }
    .colletion_share{
        float: right;
        margin-right: 30rpx;
    }
    .colletion_share img{
        width: 90rpx;
        height: 90rpx;
        margin-right: 10rpx;   
    }
    .line{
        position: absolute;
        top: 45rpx;
        left: 5%;
        width: 90%;
        height: 1rpx;
        background-color:#eee;
        z-index: -1;
    }
    .content{
        font-size: 32rpx;
        text-indent: 32rpx;
        letter-spacing: 3rpx;
        line-height: 59rpx;
    }
    .music_img{
        position: absolute;
        width: 60rpx;
        height: 60rpx;
        top: 200rpx;
        left: 50%;
        margin-left: -30rpx;
    }
</style>