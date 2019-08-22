<!--  -->
<template>
  <div class="indexContainer">
    <img v-if="isShow" class="index_img" :src="userInfo.avatarUrl" alt="">
    <button v-else open-type="getUserInfo" @getuserinfo="getUserInfo">点击获取用户登录信息</button>
    <p class="userName"> {{userInfo.nickName}} </p>
    <div @tap.stop="goDetail" class="goStudy">
      <p>开启我的音乐之旅</p>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        userInfo: {},
        isShow: false
      }
    },
    beforeMount() {
      this.handleGetUserInfo()
    },
    methods: {
      handleGetUserInfo() {
        var that = this
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
      },
      getUserInfo(data) {
        if (data.mp.detail.rawData) {
          this.handleGetUserInfo()
        }
      },
      goDetail() {
        wx.switchTab({ url: '/pages/home/main' });
      }
    }
  }
</script>
<style>
  page {
    background-color: #8ed145;
  }

  .indexContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .index_img {
    width: 200rpx;
    height: 200rpx;
    border-radius: 100rpx;
    margin: 100rpx 0;
  }

  .userName {
    font-size: 40rpx;
    font-weight: bold;
    margin: 100rpx 0;
  }

  .goStudy {
    width: 220rpx;
    height: 80rpx;
    border: 1rpx solid #eee;
    font-size: 24rpx;
    line-height: 80rpx;
    text-align: center;
    border-radius: 10rpx;
  }

  button {
    height: 300rpx;
    width: 300rpx;
    border-radius: 150rpx;
    margin: 50rpx 0;
    line-height: 300rpx;
    text-align: center;
    font-size: 26rpx;
  }
</style>