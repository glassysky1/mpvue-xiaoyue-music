<template lang="html">
    <div class="lrcContainer">
        <div class="lrc" ref="lrc">
            <!-- {{ getAllKey }} -->
            <!--
        11  11
        12
        13  13
        14
        15  15

        117    117
        118
        119
        120
        121    121   
        122
        123    123
     -->
            <p class="lrc-p"
                :class="{active:parseInt(currentTime) >= keyArr[index] && parseInt(currentTime) < keyArr[index+1]}"
                v-for="(item,key,index) in lrcData" :key="index">
                {{ item }}{{ srcollLrc(key,index) }}
            </p>
        </div>
    </div>
</template>
<script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';

    export default {
        //import引入的组件需要注入到对象中才能使用
        name: "lrc",
        components: {},
        data() {
            //这里存放数据
            return {
                lrc: {},
                lrcData: {},
                keyArr: [],
                // getAllkey:''
            };
        },
        //监听属性 类似于data概念
        computed: {

        },
        //监控data中的数据变化
        watch: {},
        //方法集合
        methods: {
            getAllKey() {
                for (var i in this.lrcData) {
                    this.keyArr.push(i);
                }
            },
            srcollLrc(key, index) {
                const lrcDiv = this.$refs.lrc
                if (key < this.currentTime && key > this.currentTime - (this.keyArr[index + 1] - this.keyArr[index])) {
                    lrcDiv.style.top = -((index - 2) * 30) + "px"
                }
            },
            startLRC() {

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

                this.getAllKey()
            }

        },
        props: ['songid', 'currentTime', 'durationTime'],
        //生命周期 - 创建完成（可以访问当前this实例）
        created() {

        },
        //生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {
            
        },
        beforeCreate() { }, //生命周期 - 创建之前
        beforeMount() {
            setTimeout(() => {
                this.startLRC()
            }, 1000);

        }, //生命周期 - 挂载之前
        beforeUpdate() { }, //生命周期 - 更新之前
        updated() { }, //生命周期 - 更新之后
        beforeDestroy() { }, //生命周期 - 销毁之前
        destroyed() { }, //生命周期 - 销毁完成
        activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
    }
</script>
<style scoped>
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