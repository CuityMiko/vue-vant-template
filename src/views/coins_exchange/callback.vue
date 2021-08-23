<template>
  <div class="wrapper">
    <img :src="icon" alt="" />
    <h5>兑换成功</h5>
    <p>消费：{{ costCoins }} 积分</p>
    <p>剩余：{{ remainCoins }} 积分</p>
    <div class="btn-sec">
      <Button :text="'返回首页'" :size="'large'" :to="'/home'" type="default" />
    </div>
  </div>
</template>

<script>
import { Button } from 'vant'

export default {
  components: { Button },
  data() {
    return {
      icon: require('~/assets/img/icon-suc.png'),
      costCoins: 1000,
      remainCoins: 199999000
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  line-height: 1;
  padding-top: 50px;
  text-align: center;
  font-size: 0;
  img {
    width: 93px;
    height: 93px;
    margin-bottom: 30px;
  }
  h5 {
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: 400;
    color: rgba(17, 17, 17, 1);
  }
  p {
    margin-bottom: 5px;
    font-size: 14px;
    color: rgba(136, 136, 136, 1);
  }
  .btn-sec {
    margin: 45px 0 10px;
    padding: 17px 28px;
  }
}
</style>
