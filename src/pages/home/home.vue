<template lang>
    <div>
        <TodayTmp title="新歌速递" type="1" />
        <TodayTmp title="网路歌曲" type="25" />
        <swiper indicator-dots autoplay circular>
            <swiper-item>
                <img src="../../assets/img/b1.jpg" alt="">
            </swiper-item>
            <swiper-item>
                <img src="../../assets/img/b2.jpg" alt="">
            </swiper-item>
            <swiper-item>
                <img src="../../assets/img/b3.jpg" alt="">
            </swiper-item>
        </swiper>
        <TodayTmp title="热门金曲" type="11" />
    </div>
</template>

<script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';
    
    import TodayTmp from "../today_template/today_template.vue";
    export default {
        //import引入的组件需要注入到对象中才能使用
        components: {
            TodayTmp
        },
        data() {
            //这里存放数据
            return {

            };
        },
        //监听属性 类似于data概念
        computed: {},
        //监控data中的数据变化
        watch: {},
        //方法集合
        methods: {

        },
        //生命周期 - 创建完成（可以访问当前this实例）
        created() {

        },
        //生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {

        },
        beforeCreate() { }, //生命周期 - 创建之前
        beforeMount() { }, //生命周期 - 挂载之前
        beforeUpdate() { }, //生命周期 - 更新之前
        updated() { }, //生命周期 - 更新之后
        beforeDestroy() { }, //生命周期 - 销毁之前
        destroyed() { }, //生命周期 - 销毁完成
        activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
    }
</script>
<style>
    page {
        background-color: #eee;
    }

    swiper {
        padding: 20rpx 34rpx;
        margin: 0 auto;

    }

    swiper img {
        width: 100%;
        height: 300rpx;
    }
</style>