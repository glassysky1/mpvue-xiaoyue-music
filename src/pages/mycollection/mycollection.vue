<template>
    <div class="collection-list">
        <ul class="list">
            <!-- :to="{name:'MusicPlay',params:{songid:item.song_id}}" -->
            <!-- 
            <li class="song" v-for="(item,index) in songInfoList" :key="index" @tap.stop="toMusicPlay(item.songid)">
                <div class="left">
                    {{ item.title }}
                </div>
            </li> -->
            <li class="song" v-for="(item,index) in songInfoList" :key="index" @tap.stop="toMusicPlay(item)">
                <div class="left">
                    {{ item.title }}
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
                oldStorage: '',
                songInfoList: []
            };
        },
        //监听属性 类似于data概念
        computed: {},
        //监控data中的数据变化
        watch: {},
        //方法集合
        methods: {
            toMusicPlay(item) {
                wx.navigateTo({ url: '/pages/musicplay/main?songid=' + item.songid });
                let songId = item.songid
                this.$store.dispatch('getSongId', songId)

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
            this.songInfoList = []
            this.oldStorage = wx.getStorageSync('isCollected')
            if (!this.oldStorage) {

                wx.setStorage({
                    key: 'isCollected',
                    data: {}
                })
            } else {
       

            }
            for (const songInfo in this.oldStorage) {
                if (this.oldStorage[songInfo] ? true : false) {
                    //3284572&&放大
                    var songInfoArr = songInfo.split('&&')

                    this.songInfoList.push({
                        songid: songInfoArr[0],
                        title: songInfoArr[1]
                    })



                }
            }
          

            //分割字符串


        }, //生命周期 - 挂载之前
        beforeUpdate() { }, //生命周期 - 更新之前
        updated() { 
                     //用户缓存过
            //oldStorage[this.index] --->true || false || undefined
            
        }, //生命周期 - 更新之后
        beforeDestroy() { }, //生命周期 - 销毁之前
        destroyed() { }, //生命周期 - 销毁完成
        activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
    }
</script>
<style scoped>
    .collection-list {
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
</style>