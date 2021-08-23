<template>
  <div class="wrapper">
    <Field
      v-for="item in formData"
      v-model="item.value"
      :key="item.key"
      :label="item.name"
      input-align="right"
      readonly
    />
    <div class="sec btn-sec">
      <Button :text="'交易撤单'" :color="'rgba(248, 83, 89, 1)'" :size="'large'" type="primary" />
    </div>
  </div>
</template>

<script>
import { Field, Button } from 'vant'

export default {
  components: {
    Field,
    Button
  },
  data() {
    return {
      formData: [
        {
          name: '订单时间',
          key: 'createtime',
          value: '2021-08-03 10:11:11'
        },
        {
          name: '业主姓名',
          key: 'zhnc',
          value: ''
        },
        {
          name: '小区户号',
          key: 'zhhh',
          value: ''
        },
        {
          name: '手机号码',
          key: 'sjhm',
          value: ''
        },
        {
          name: '交易积分',
          key: 'dhjf',
          value: ''
        },
        {
          name: '门店名称',
          key: 'mdmc',
          value: ''
        },
        {
          name: '收银员姓名',
          key: 'zsxm',
          value: ''
        },
        {
          name: '订单状态',
          key: 'ddzt',
          value: ''
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100vw;
  height: 100vh;
  padding-top: 10px;
  background: rgba(249, 249, 249, 1);
  .sec {
    margin: 60px 0 10px;
    padding-bottom: 10px;
    background: #fff;
    &.btn-sec {
      padding: 17px 28px;
      background: transparent;
    }
  }
}
</style>
