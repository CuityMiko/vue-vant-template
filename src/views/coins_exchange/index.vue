<template>
  <div class="wrapper">
    <Field v-model="mobile" :placeholder="'手机号'" :maxlength="11" label="手机号">
      <template #button>
        <div @click="checkUser" class="check-btn">查询</div>
      </template>
    </Field>
    <Field label="业主姓名" readonly></Field>
    <Field label="户号" readonly></Field>
    <Field label="所属小区" readonly></Field>
    <Field label="可用积分" readonly style="margin-bottom: 16px;"></Field>

    <Field
      v-model="inputMoney"
      @input="moneyChange"
      :placeholder="'点击输入兑换金额'"
      :label-class="'font-bolder'"
      class="special"
      label="兑换金额"
      input-align="right"
    >
      <template #button>
        <div>元</div>
      </template>
    </Field>
    <Field
      v-model="inputCoins"
      @input="coinChange"
      :placeholder="'点击输入兑换积分'"
      :label-class="'font-bolder'"
      class="special"
      label="扣除积分"
      input-align="right"
    >
      <template #button>
        <div @click="exchangeAll" class="check-btn">全部兑换</div>
      </template>
    </Field>
    <h5 class="wran">注：为了安全起见，请核对业主信息</h5>
    <div class="sec btn-sec">
      <Button
        @click="handleExchange"
        :text="'立即兑换'"
        :color="'rgba(24, 144, 255, 1)'"
        :size="'large'"
        type="primary"
      />
    </div>
  </div>
</template>

<script>
import { Field, Button, Toast, Dialog } from 'vant'

export default {
  components: { Field, Button },
  data() {
    return {
      mobile: '',
      inputMoney: undefined,
      inputCoins: undefined
    }
  },
  methods: {
    checkUser() {
      const phoneNumber = /^1[3456789]\d{9}$/
      if (!this.mobile) {
        Toast({ message: '请输入手机号' })
        return false
      }
      if (!phoneNumber.test(this.mobile)) {
        Toast({ message: '请输入合法的手机号' })
        return false
      }
    },
    exchangeAll() {
      if (!this.mobile) {
        Toast({ message: '请先选择兑换用户' })
      }
    },
    moneyChange() {
      if (this.inputMoney) {
        this.inputCoins = Number(this.inputMoney) * 100
      } else {
        this.inputCoins = undefined
      }
    },
    coinChange() {
      if (this.inputCoins) {
        this.inputMoney = Number(this.inputCoins) / 100
      } else {
        this.inputMoney = undefined
      }
    },
    handleExchange() {
      Dialog.confirm({
        title: '',
        message: '本次兑换积分10元，是否确认兑换？',
        confirmButtonColor: 'rgba(24, 144, 255, 1)'
      })
        .then(result => {
          console.log(result)
          this.$router.replace({ path: '/coins_exchange/callback' })
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
<style lang="scss">
.wrapper {
  width: 100vw;
  height: 100vh;
  padding-top: 9px;
  background: rgba(249, 249, 249, 1);
  .check-btn {
    font-size: 16px;
    color: rgba(62, 150, 254, 1);
  }
  .wran {
    line-height: 38px;
    padding: 0 20px;
    font-weight: 400;
    font-size: 12px;
    color: rgba(248, 83, 89, 1);
  }
  .sec {
    margin-bottom: 10px;
    padding-bottom: 10px;
    background: #fff;

    &.btn-sec {
      padding: 17px 28px;
      background: transparent;
    }
  }
  .font-bolder {
    span {
      font-weight: 600;
    }
  }
  .special {
    input.van-field__control {
      font-weight: 600;
      color: rgba(255, 155, 16, 1);
      &::-moz-placeholder {
        font-weight: 400;
      }
      &::-webkit-input-placeholder {
        font-weight: 400;
      }
    }
  }
}
</style>
