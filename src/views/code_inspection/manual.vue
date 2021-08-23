<template>
  <div class="input_body">
    <p class="input_tit">输入垃圾袋条码</p>
    <Field v-model="value" format-trigger="onBlur" placeholder="请输入垃圾袋编号数字" />
    <div class="input_btn">
      <van-button block>扫一扫自动填条码</van-button>
      <van-button @click="submit" block color="#1890ff">提交</van-button>
    </div>
  </div>
</template>

<script>
import { Field } from 'vant'
export default {
  components: {
    Field
  },
  data() {
    return {
      value: ''
    }
  },
  methods: {
    checkCode(val) {
      if (val.length === 16 || val.length === 18) {
        if (val.substr(0, 4) === 'ZJLY' || val.substr(0, 4) === 'LYZH') {
          if (val.length === 16) {
            if (val.substr(-2, 2) === '01' || val.substr(-2, 2) === '02') {
              console.log(val.substr(-1, 1))
              return true
            } else {
              return false
            }
          } else if (val.length === 18) {
            if (val.substr(4, 2) === '01' || val.substr(4, 2) === '02') {
              console.log(val.substr(5, 1))
              return true
            } else {
              return false
            }
          }
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },
    submit() {
      if (this.checkCode(this.value)) {
        if (this.value.length === 16) {
          this.$router.push({ name: 'code_inspection-inspectionRate', params: { ctype: this.value.substr(-1, 1) } })
        } else if (this.value.length === 18) {
          this.$router.push({ name: 'code_inspection-inspectionRate', params: { ctype: this.value.substr(5, 1) } })
        }
      } else {
        this.$toast('无效编号')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.input_body {
  width: 100vw;
  height: 100vh;
  background: rgba(249, 249, 249, 1);
  padding: 16px;
  .input_tit {
    margin-top: 16px;
    margin-bottom: 10px;
  }
  .input_btn {
    margin-top: 45px;
    button {
      margin-top: 20px;
    }
  }
}
</style>
