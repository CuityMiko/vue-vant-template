<template>
  <van-overlay :show="loading" class="v-loading">
    <van-loading />
  </van-overlay>
</template>
<script>
import { Overlay, Loading } from 'vant'
export default {
  components: {
    [Overlay.name]: Overlay,
    [Loading.name]: Loading
  },
  data() {
    return {
      loading: false
    }
  }
}
</script>
<style lang="scss">
.v-loading {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
