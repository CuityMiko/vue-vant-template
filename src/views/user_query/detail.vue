<template>
  <div class="user_body">
    <CellGroup>
      <Cell :value="cyewm" title="厨余二维码卡号" />
      <Cell :value="qtewm" title="其他二维码卡号" />
      <Cell :value="zhnc" title="户主/管理员" />
      <Cell :value="addr" title="详细地址" />
      <Cell :value="phone" title="电话" />
      <Cell :value="telphone" title="固定电话" />
      <Cell :value="point" title="可用积分" />
    </CellGroup>
  </div>
</template>

<script>
import { Cell, CellGroup } from 'vant'
export default {
  components: {
    Cell,
    CellGroup
  },
  data() {
    return {
      cyewm: 511231564689878,
      qtewm: 458645654654771,
      zhnc: '张三',
      addr: '杭州市余杭区庙前社区九曲营小区1-3-101',
      phone: '15895698523',
      telphone: '0576-8934654',
      point: 356
    }
  }
}
</script>

<style lang="scss" scoped>
.user_body {
  width: 100vw;
  height: 100vh;
  background: rgba(249, 249, 249, 1);
  margin-top: 24px;
}
</style>
