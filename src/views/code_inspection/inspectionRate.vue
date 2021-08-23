<template>
  <div class="rate_body">
    <div class="_card">
      <p style="color: #999;">用户信息</p>
      <div class="card_user">
        <div class="card_info">
          <p>姓名：</p>
          <p>张三</p>
        </div>
        <div class="card_info">
          <p>地址：</p>
          <p>杭州-余杭区-余杭街道-幸福小区二期8-1-801</p>
        </div>
      </div>
      <p style="color: #999;">垃圾类型</p>
      <div class="garbage_type">
        <div @click="typeChange" :class="ctype === 1 ? 'click' : ''" class="garbage_btn">厨余</div>
        <div @click="typeChange" :class="ctype === 2 ? 'click' : ''" class="garbage_btn">其他</div>
      </div>
    </div>
    <div class="_card">
      <div
        v-for="(item, index) in scoreList"
        :key="index"
        @click="selectChange(item.xjfz, index)"
        :class="selected === index ? 'click_item' : ''"
        class="section_list"
      >
        <p>+{{ item.xjfz }}</p>
        <p>{{ item.yyms }}</p>
      </div>
    </div>
    <div class="_card">
      <p style="color: #999;">是否定时定点</p>
      <div class="garbage_type">
        <div @click="fixedChange" :class="fixedtype ? 'click' : ''" class="garbage_btn">+3 是</div>
        <div @click="fixedChange" :class="fixedtype ? '' : 'click'" class="garbage_btn">+0 否</div>
      </div>
    </div>
    <div class="_card">
      <p style="color: #999;">用带（标签）是否规范</p>
      <div class="garbage_type">
        <div @click="standardChange" :class="isStandard ? 'click' : ''" class="garbage_btn">+3 是</div>
        <div @click="standardChange" :class="isStandard ? '' : 'click'" class="garbage_btn">+0 否</div>
      </div>
    </div>
    <div class="_card">
      <div class="card_img">
        <p style="color: #999; margin-bottom: 16px;">上传照片</p>
        <Uploader v-model="fileList" :max-count="3" multiple />
      </div>
    </div>
    <div style="margin: 16px;">
      <van-button @click="submit" block color="#1890ff">提交</van-button>
    </div>
  </div>
</template>

<script>
import { Uploader } from 'vant'
export default {
  components: { Uploader },
  data() {
    return {
      value: '',
      ctype: 1,
      selected: undefined,
      scoreList: [
        {
          xjfz: 2,
          yyms: '未正确制定投放到箱体内'
        },
        {
          xjfz: 2,
          yyms: '未正确制定投放到箱体内'
        },
        {
          xjfz: 2,
          yyms: '未正确制定投放到箱体内'
        },
        {
          xjfz: 2,
          yyms: '未正确制定投放到箱体内'
        }
      ],
      fixedtype: false,
      isStandard: false,
      fileList: []
    }
  },
  mounted() {
    console.log(this.$route.params.ctype)
    this.ctype = Number(this.$route.params.ctype)
  },
  methods: {
    typeChange() {
      this.ctype = this.ctype === 1 ? 2 : 1
    },
    submit() {
      this.$toast('打分成功')
    },
    selectChange(num, index) {
      console.log(num)
      this.selected = index
    },
    fixedChange() {
      this.fixedtype = !this.fixedtype
    },
    standardChange() {
      this.isStandard = !this.isStandard
    }
  }
}
</script>

<style lang="scss" scoped>
.rate_body {
  width: 100vw;
  height: 100vh;
  background: rgba(249, 249, 249, 1);
  ._card {
    margin: 15px auto;
    padding: 16px;
    width: 345px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    .section_list {
      display: flex;
      margin-top: 10px;
      height: 40px;
      background-color: #fff;
      border: 1px solid;
      border-color: #1890ff;
      border-radius: 4px;
      color: #1890ff;
      line-height: 40px;
      p {
        flex: 1;
        text-align: center;
        &:last-child {
          flex: 5;
          text-align: left;
        }
      }
      &.click_item {
        color: #fff;
        background-color: #1890ff;
      }
    }
    .card_user {
      margin-bottom: 12px;
      .card_info {
        display: flex;
        margin-top: 16px;
        color: #4a4a4a;
        line-height: 22px;
        p {
          flex: 1;
          &:last-child {
            flex: 5;
          }
        }
      }
    }
    .garbage_type {
      display: flex;
      .garbage_btn {
        flex: 1;
        margin: 16px 16px 0;
        height: 44px;
        background-color: #fff;
        border-radius: 2px;
        color: #1890ff;
        border: 1px solid;
        border-color: #1890ff;
        line-height: 44px;
        text-align: center;
        &.click {
          color: #fff;
          background-color: #1890ff;
        }
      }
    }
    .card_img {
      margin: 16px 0;
      .badge-icon {
        display: block;
        font-size: 10px;
        line-height: 16px;
      }
    }
  }
}
</style>
