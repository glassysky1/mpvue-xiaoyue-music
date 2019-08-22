<!--  -->
<template lang>
    <div class="artists">
        <ul class="list">
            <!-- :to="{name:'ArtistsDetails',params:{avatar:item.avatar_s500,name:item.name,ting_uid:item.ting_uid}}" -->
            <li :key="index" class="artist" v-for="(item,index) in artistsData" @tap.stop="toArtistsDetail(item)">
                <div class="pic">
                    <img :src="item.avatar_s500" :alt="item.name">
                </div>
                <div class="info">
                    <div> {{item.name}} </div>
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
                artistsArr: ["2517", "7994", "1091", "45561", "2507", "245815", "1077", "1204", "1117", "82366"],
                artistsData: []
            }
        },
        //监听属性 类似于data概念
        methods: {
            toArtistsDetail(item) {
                wx.navigateTo({ url: '/pages/artistsDetail/main?avatar=' + item.avatar_s500 + "&&" + "name=" + item.name + "&&" + 'ting_uid=' + item.ting_uid });
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
            for (var i = 0; i < this.artistsArr.length; i++) {
                const artistsURL = "http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.artist.getInfo&tinguid=" + this.artistsArr[i];
                this.$fly.get(artistsURL)
                    .then(res => {
                        this.artistsData.push({
                            avatar_s500: res.data.avatar_s500,
                            name: res.data.name,
                            ting_uid: res.data.ting_uid
                        })

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
    .artists {
        padding: 0 34rpx;
        background: #fff;
        display: flex;
        flex-direction: column;
    }

    .list li {
        padding-left: 0;
        min-height: 140rpx;
        display: flex;
        align-items: center;
        border-bottom: 2rpx solid #F2F2F2;
    }

    .pic {
        width: 108rpx;
        height: 108rpx;
        margin-right: 30rpx;
        display: inline-block;
    }

    .info {

        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        font-size: 32rpx;
    }

    .pic img {
        border-radius: 54rpx;
        overflow: hidden;
        height: 100%;
        width: 100%;
    }
</style>