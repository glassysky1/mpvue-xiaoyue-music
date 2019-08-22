<!--  -->
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
            <li :class="item.songid==songid?'song active':'song'" v-for="(item,index) in songInfoList" :key="index"
                @tap.stop="toMusicPlay(item)">
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
                songid: '',
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
                if(this.type!= undefined){
                    wx.redirectTo({ url: '/pages/musicplay/main?songid=' + item.songid + '&&type=' + this.type });
                }else if(this.tinguid !=undefined){
                    wx.redirectTo({ url: '/pages/musicplay/main?songid=' + item.songid + '&&tinguid=' + this.tinguid })                    
                }else if(this.searchContent !=undefined){
                    wx.redirectTo({ url: '/pages/musicplay/main?songid=' + item.songid + '&&searchContent=' + this.searchContent })  

                }
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
            this.songid = this.$mp.query.songid
            this.type = this.$mp.query.type
            this.tinguid = this.$mp.query.tinguid
            this.searchContent =this.$mp.query.searchContent
            console.log(this.searchContent);
            
            
            //获取歌曲列表推荐
            if (this.type != undefined) {
                this.songInfoList = []
                var HOSTURL = 'http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.billboard.billList&type=' + this.type + '&size=100&offset=0'
                this.$fly.get(HOSTURL)
                    .then(res => {
                        for (const key in res.data.song_list) {
                            this.songInfoList.push({
                                songid: res.data.song_list[key].song_id,
                                title: res.data.song_list[key].title
                            })
                        }

                    })
                    .catch(err => {
                        console.log(err);
                    })
                //歌手
            } else if (this.tinguid != undefined) {
                this.songInfoList = []
                const ArtList = "http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.artist.getSongList&tinguid=" + this.tinguid + "&limits=100&use_cluster=1&order=2"
                this.$fly.get(ArtList)
                    .then(res => {

                       
                        for (const key in res.data.songlist) {
                            
                          this.songInfoList.push({
                                songid: res.data.songlist[key].song_id,
                                title: res.data.songlist[key].title
                            })
                        } 
                        
                    })
                    .catch(error => {
                        console.log(error);
                    })
                //搜索
            } else if(this.searchContent !=undefined) {
                this.songInfoList = []
                const searchURL = "http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.search.catalogSug&query=" + this.searchContent;
                this.$fly.get(searchURL)
                    .then(res => {
                        if (res.data.error_code == 22001) {
                            alert('搜索数据不存在');
                            return;
                        }
                        for (const key in res.data.song) {
                             this.songInfoList.push({
                                songid: res.data.song[key].songid,
                                title: res.data.song[key].songname
                            })
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }

        }, //生命周期 - 挂载之前
        beforeUpdate() { }, //生命周期 - 更新之前
        updated() { }, //生命周期 - 更新之后
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

    .active {
        color: #8ed145;
    }
</style>