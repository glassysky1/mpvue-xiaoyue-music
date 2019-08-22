<!--  -->
<template lang>
    <div class="play">
        <div class="header">
            <div class="title">
                <div class="music-info" v-if="currentUrl.songinfo">
                    <p>{{ currentUrl.songinfo.title }}</p>
                    <p class="author">{{ currentUrl.songinfo.author }}</p>
                </div>
            </div>
        </div>

        <div class="song-info">
            <div class="song-info-img" v-if="currentUrl.songinfo">
                <img :src="currentUrl.songinfo.pic_big">
                <!-- <LRC :durationTime="durationTime" :currentTime="currentTime" :songid="this.$route.params.songid" /> -->
                <!-- :durationTime="durationTime" :currentTime="currentTime" -->
                <div class="lrcContainer">
                    <div class="lrc" ref="lrc">
                        <p class="lrc-p" v-for="(item,key,index) in lrcData" :key="index">
                            {{ item }}
                        </p>
                    </div>
                </div>
                歌词我不会滚动啊
            </div>
            <div class="iconbox">
                <!-- ' -->

                <i :class="isCollected?'iconfont shoucang icon-Collection':'iconfont shoucang icon-shoucang'"
                    @tap.stop="handleCollection"></i>
                <i class="iconfont icon-shangyiqu" @tap.stop="handleLastMusic"></i>
                <i :class="isMusicPlay ? 'box iconfont icon-zanting' :'box iconfont icon-iconset0481'"
                    @tap.stop="handleMusicPlay"></i>
                <i class="iconfont icon-xiayiqu" @tap.stop="handleNextMusic"></i>
                <i class="iconfont icon-liebiao" @tap.stop="handleMusicList"></i>
            </div>
        </div>


    </div>
</template>

<script>
    import LRC from '../lrc/lrc.vue'
    import IsPlayObj from '../../assets/data/isPlay.js'
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';
    import "../../assets/font/iconfont.css";
    export default {
        //import引入的组件需要注入到对象中才能使用
        components: {
            LRC
        },
        data() {
            //这里存放数据
            return {
                songDetail: {},
                playUrl: '',
                currentUrl: {
                    bitrate: {
                        show_link: ''
                    },
                    songinfo: {
                        pic_big: '../../assets/logo.png',
                        title: ''
                    }
                },
                isMusicPlay: false,
                songid: '',
                currentTime: 0,
                durationTime: 0,
                lrc: {},
                lrcData: {},
                keyArr: [],
                isCollected: false,
                collectionArr: [],
                type: '',
                songInfoList: [],
                songInfoList1: []
            };
        },
        //监听属性 类似于data概念
        computed: {
            // ...mapState(['songId'])
        },
        //监控data中的数据变化t
        watch: {},
        //方法集合
        methods: {
            handleMusicPlay() {

                let isMusicPlay = !this.isMusicPlay
                this.isMusicPlay = isMusicPlay
                const backgroundAudioManager = wx.getBackgroundAudioManager()
                if (isMusicPlay) {
                    console.log(true);
                    backgroundAudioManager.src = this.currentUrl.bitrate.show_link
                    backgroundAudioManager.title = this.currentUrl.songinfo.title
                    backgroundAudioManager.coverImgUrl = this.currentUrl.songinfo.pic_big
                    backgroundAudioManager.singer = this.currentUrl.songinfo.author
                } else {
                    backgroundAudioManager.pause()
                }

                setInterval(() => {
                    this.durationTime = backgroundAudioManager.duration
                    this.currentTime = backgroundAudioManager.currentTime
                }, 1000);

            },
            handleCollection() {


                let isCollected = !this.isCollected
                this.isCollected = isCollected


                let title = this.isCollected ? '收藏成功' : '取消收藏'
                wx.showToast({
                    title,
                    icon: 'success'
                })
                //读取之前本地缓存的状态查看是否收藏
                let oldStorage = wx.getStorageSync('isCollected')
                oldStorage[this.songid + "&&" + this.currentUrl.songinfo.title] = isCollected
                wx.setStorage({
                    key: 'isCollected',
                    data: oldStorage
                })



                // //收藏到数组
                // if (this.isCollected) {
                //     console.log(this.collectionArr);

                //     for (const key in this.collectionArr) {

                //         if (this.collectionArr[key] === this.songid) {
                //             return
                //         }
                //     }
                //     this.collectionArr.push(this.songid)

                // } else {
                //     var index = this.collectionArr.findIndex(item => {
                //         return item = this.songid
                //     })
                //     this.collectionArr.splice(index, 1)

                // }
                // console.log(this.collectionArr);
            },
            // getAllKey() {
            //     for (var i in this.lrcData) {
            //         this.keyArr.push(i);
            //     }
            // },
            // srcollLrc(key, index) {
            //     const lrcDiv = this.$refs.lrc
            //     if (key < this.currentTime && key > this.currentTime - (this.keyArr[index + 1] - this.keyArr[index])) {
            //         lrcDiv.style.top = -((index - 2) * 30) + "px"
            //     }
            // }

            handleNextMusic() {
                console.log(this.searchContent);
                console.log(this.songInfoList1);
                var index = 0;
                for (const key in this.songInfoList1) {
                    if (this.songInfoList1[key] === this.songid) {
                        index = key;
                    }
                }
                index++;
                if (this.songInfoList1.length === index) {
                    index = 0;
                }
                if(this.type!=undefined){
                    wx.redirectTo({ url: '/pages/musicplay/main?songid=' + this.songInfoList1[index] + '&&type=' + this.type });
                }else if(this.tinguid!=undefined){
                    wx.redirectTo({ url: '/pages/musicplay/main?songid=' + this.songInfoList1[index] + '&&tinguid=' + this.tinguid});
                }else if(this.searchContent !=undefined){
                    wx.redirectTo({ url: '/pages/musicplay/main?songid=' + this.songInfoList1[index] + '&&searchContent=' + this.searchContent });
                    
                }

                this.songid = this.songInfoList1[index]
                let songId = this.songid
                this.$store.dispatch('getSongId', songId)
            },
            handleLastMusic() {
                var index = 0;
                for (const key in this.songInfoList1) {
                    if (this.songInfoList1[key] === this.songid) {
                        index = key;
                    }
                }
                index--;
                if (index < 0) {
                    index = this.songInfoList1.length - 1
                }
                if (this.type != undefined) {
                    wx.redirectTo({ url: '/pages/musicplay/main?songid=' + this.songInfoList1[index] + '&&type=' + this.type });
                } else if (this.tinguid != undefined) {
                    wx.redirectTo({ url: '/pages/musicplay/main?songid=' + this.songInfoList1[index] + '&&tinguid=' + this.tinguid });
                } else if(this.searchContent !=undefined){
                    wx.redirectTo({ url: '/pages/musicplay/main?songid=' + this.songInfoList1[index] + '&&searchContent=' + this.searchContent });
                    
                    
                    
                }

                this.songid = this.songInfoList1[index]
                let songId = this.songid
                this.$store.dispatch('getSongId', songId)
            },
            handleMusicList() {
                
                if(this.type !=undefined){
                    wx.redirectTo({ url: '/pages/mymusiclist/main?songid=' + this.songid + '&&type=' + this.type })
                }else if(this.tinguid !=undefined){
                    
                    wx.redirectTo({ url: '/pages/mymusiclist/main?songid=' + this.songid + '&&tinguid=' + this.tinguid })                    
                }else if(this.searchContent !=undefined){
                    wx.redirectTo({ url: '/pages/mymusiclist/main?songid=' + this.songid + '&&searchContent=' + this.searchContent })  
                }

            }

        },
        //生命周期 - 创建完成（可以访问当前this实例）
        created() {

        },
        //生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {
            if (!this.isMusicPlay) {
                setTimeout(() => {
                    this.handleMusicPlay()
                }, 1000);
            }
        },
        beforeCreate() { }, //生命周期 - 创建之前
        beforeMount() {
            this.songid = this.$mp.query.songid
            this.type = this.$mp.query.type
            //歌手的类型
            this.tinguid = this.$mp.query.tinguid
            this.searchContent = this.$mp.query.searchContent


            //获取歌曲信息
            this.playUrl = 'http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.play&songid=' + this.songid
            this.$fly.get(this.playUrl)
                .then(res => {
                    this.currentUrl = res.data
                })
                .catch(err => {
                    console.log(err);
                })


            //获取歌曲列表推荐
            if (this.type != undefined) {
                this.songInfoList1 = []
                var HOSTURL = 'http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.billboard.billList&type=' + this.type + '&size=100&offset=0'
                this.$fly.get(HOSTURL)
                    .then(res => {
                        for (const key in res.data.song_list) {
                            this.songInfoList1.push(res.data.song_list[key].song_id)
                        }

                    })
                    .catch(err => {
                        console.log(err);
                    })
                    //歌手
            }else if (this.tinguid != undefined) {
                this.songInfoList1 = []
                const ArtList = "http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.artist.getSongList&tinguid=" + this.tinguid + "&limits=100&use_cluster=1&order=2"
                this.$fly.get(ArtList)
                    .then(res => {

                        for (const key in res.data.songlist) {
                            this.songInfoList1.push(res.data.songlist[key].song_id)
                        }


                    })
                    .catch(error => {
                        console.log(error);
                    })
                    //搜索
            }else if (this.searchContent != undefined) {
                  this.songInfoList1 = []
                  const searchURL = "http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.search.catalogSug&query=" + this.searchContent;
                this.$fly.get(searchURL)
                    .then(res => {
                        if (res.data.error_code == 22001) {
                            alert('搜索数据不存在');
                            return;
                        }
                        for (const key in res.data.song) {
                            this.songInfoList1.push(res.data.song[key].songid)
                            
                            console.log(this.songInfoList1);
                            
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }


            IsPlayObj.pageIndex === this.$mp.query.songid && IsPlayObj.isPlay ? this.isMusicPlay = true : this.isMusicPlay = false
            //监听音乐播放和暂停
            wx.onBackgroundAudioPlay(() => {
                console.log('音乐播放');
                this.isMusicPlay = true
                IsPlayObj.pageIndex = this.$mp.query.songid
                IsPlayObj.isPlay = true
            })
            wx.onBackgroundAudioPause(() => {
                console.log('音乐暂停');
                this.isMusicPlay = false
                IsPlayObj.isPlay = false
            })

            //歌词
            const LRCUrl = "http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.lry&songid=" + this.songid;

            this.$fly.get(LRCUrl)
                .then(res => {
                    this.lrc = res.data
                    // console.log(res.data);

                    /*
                     {
                       123:"哪会怕有一天只你共我",
                       222:"哪会怕有一天只你共我",
                       423:"哪会怕有一天只你共我"
                     }
                    */
                    // 数据格式处理
                    var lyrics = res.data.lrcContent.split("\n");
                    var lrcObj = {};
                    for (var i = 0; i < lyrics.length; i++) {
                        var lyric = decodeURIComponent(lyrics[i]);
                        var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
                        var timeRegExpArr = lyric.match(timeReg);
                        if (!timeRegExpArr) continue;
                        var clause = lyric.replace(timeReg, '');
                        for (var k = 0, h = timeRegExpArr.length; k < h; k++) {
                            var t = timeRegExpArr[k];
                            var min = Number(String(t.match(/\[\d*/i)).slice(1)),
                                sec = Number(String(t.match(/\:\d*/i)).slice(1));
                            var time = min * 60 + sec;
                            lrcObj[time] = clause;
                        }
                    }
                    this.lrcData = lrcObj;

                })
                .catch(error => {
                    console.log(error);
                })

            // this.getAllKey()
            //预处理工作：本地是否收藏的缓存
            let oldStorage = wx.getStorageSync('isCollected')
            setTimeout(() => {
                if (!oldStorage) {
                    wx.setStorage({
                        key: 'isCollected',
                        data: {}
                    })
                } else {
                    //用户缓存过
                    //oldStorage[this.index] --->true || false || undefined
                    this.isCollected = (oldStorage[this.songid + "&&" + this.currentUrl.songinfo.title] ? true : false)


                }
            }, 1000);

        } //生命周期 - 挂载之前
    }
</script>
<style scoped>
    .header {
        padding: 30rpx;
    }

    .music-info {
        flex: 1;
        font-size: 40rpx;
    }

    .title {
        display: flex;
        text-align: center;
    }

    .left {
        font-size: 60rpx;
    }

    .ca {
        color: red;
    }

    .right {
        font-size: 60rpx;
    }

    .song-info {
        padding: 30rpx;
    }

    .song-info-img {
        text-align: center;
    }

    .song-info-img img {
        width: 50%;
        border-radius: 10rpx;
        height: 350rpx;
        box-shadow: 0 0 20rpx 0 rgba(50, 50, 50, .31);
    }

    .song-lrc {
        margin-top: 20rpx;
        min-height: 100rpx;
    }

    .iconbox {
        margin-top: 60rpx;
        position: relative;
    }

    .iconbox .box {
        font-size: 70rpx;
        position: absolute;
        left: 50%;
        margin-left: -35rpx;
    }

    .iconbox .shoucang {
        position: absolute;
        left: 0rpx;
        font-size: 70rpx;
    }

    .iconbox .icon-liebiao {
        position: absolute;
        right: 0rpx;
        font-size: 70rpx;
    }

    .iconbox .icon-shangyiqu {
        position: absolute;
        left: 25%;
        font-size: 70rpx;
        margin-left: -35rpx;
    }

    .iconbox .icon-xiayiqu {
        position: absolute;
        left: 75%;
        font-size: 70rpx;
        margin-left: -35rpx;
    }

    .active {
        color: #222;
    }

    .author {
        font-size: 24rpx;
        color: #999;
    }

    .lrcContainer {
        width: 100%;
        height: 300rpx;
        overflow: scroll;
        position: relative;
    }

    .lrc {
        width: 100%;
        position: absolute;
        top: 0;
    }

    .active {
        color: red !important;
    }

    .lrc-p {
        height: 60rpx;
        line-height: 60rpx;
    }

    .up30 {
        margin-top: -60rpx;
    }
</style>