<!--  -->
<template>
    <div class="listcate">
        <div tag="div" class="cate-item">
            <!-- :to="{name:'LicateDetails',params:{musictype:musicType}}" -->
            <div  class="item-content" @tap.stop="toLicateDetails(musicType)">
                <div class="cate-post">
                    <img :src="listCateData.billboard.pic_s192" :alt="listCateData.billboard.name">
                </div>
                <ul class="cate-hot">
                    <li v-for="(item,index) in listCateData.song_list" :key="index">
                        <span class="col-rank" :title="item.rank">{{ item.rank }}</span>
                        <span class="col-title">{{ item.title }} - {{ item.author }}</span>
                    </li>
                </ul>
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
                listCateData: {
                    song_list: [],
                    billboard: {}
                },
              
            };
        },
        props:{
            musicType:{
                 type: [String, Number],
                default: 1
            }
        },
        //监听属性 类似于data概念
        computed: {},
        //监控data中的数据变化
        watch: {},
        //方法集合
        methods: {
            toLicateDetails(musicType){
                wx.navigateTo({ url: '../licateDetails/main?musicType='+this.musicType });
            }
        },
        //生命周期 - 创建完成（可以访问当前this实例）
        created() {

        },
        //生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {

        },
        beforeCreate() {
           
         }, //生命周期 - 创建之前
        beforeMount() {
             const ListCateUrl = "http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.billboard.billList&type=" + this.musicType + "&size=3&offset=0"
            this.$fly.get(ListCateUrl)
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
    .listcate {
        padding: 0 34rpx 40rpx;
        font-size: 32rpx;
        background: #fff;
    }

    .cate-item {
        border-bottom: 2rpx solid #eee;
        padding: 40rpx 0;
    }

    .item-content {
        display: flex;
    }

    .cate-post {
        position: relative;
        color: #fff;
        font-size: 36rpx;
        height: 192rpx;
        width: 192rpx;
    }

    .cate-post img {
        width: 100%;
        height: 100%;
    }

    .cate-item .cate-hot {
        flex: 1;
        margin-left: 28rpx;
        padding: 12rpx 0;
    }

    .cate-item .cate-hot li {
        padding: 12rpx 0;
        height: 34rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
        color: #666;
        font: 30rpx 700;
    }

    .cate-item .cate-hot li .col-rank {
        color: #fa6644;
        font-family: Arial;
        font-weight: 700;
        font-style: italic;
    }

    .cate-item .cate-hot li .col-title {
        line-height: 34rx;
        color: #343434;
        text-indent: 24rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        flex: 1;
        width: 280rpx;
    }
</style>