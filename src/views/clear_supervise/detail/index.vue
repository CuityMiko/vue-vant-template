<template>
  <div class="wrapper">
    <ul class="item">
      <li><span class="name">所在地区：</span><span class="text">xx街道-xx村</span></li>
      <li><span class="name">姓名户号：</span><span class="text">王**/庙后-车子新路13</span></li>
      <li><span class="name">上次评价：</span><span class="text">-1 分类较差，混入少量垃圾</span></li>
      <li><span class="name">巡检时间：</span><span class="text">2020-01-02 08:00:00</span></li>
      <li><span class="name">巡检图片：</span></li>
    </ul>
    <div class="sec img-sec">
      <img @click="imgPreview" :src="clearImg[0]" alt="" />
    </div>
    <h1 class="tip">*请根据现场实际改进情况填写评语</h1>
    <ul class="item">
      <li><span class="name">督查评语：</span></li>
    </ul>
    <Field
      :placeholder="'请输入打分情况说明…'"
      v-model="fidleValue"
      :autosize="{ minHeight: 70, maxHeight: 100 }"
      :show-word-limit="false"
      :maxlength="100"
      type="textarea"
    ></Field>
    <ul class="item" style="margin-top: 10px;">
      <li><span class="name" style="margin: 0;">上传照片</span><span class="extra">（选填，最多1张图片）</span></li>
    </ul>
    <div class="sec" style="padding: 12px 30px 4px;">
      <Uploader
        v-model="fileList"
        :after-read="afterRead"
        :max-count="1"
        :max-size="10 * 1024 * 1024"
        @oversize="onOversize"
      />
    </div>
    <div class="sec btn-sec">
      <Button :text="'提交'" :color="'rgba(24, 144, 255, 1)'" :size="'large'" type="primary" />
    </div>
  </div>
</template>

<script>
import { ImagePreview, Field, Uploader, Button, Toast } from 'vant'

export default {
  components: { Field, Uploader, Button },
  data() {
    return {
      showPreview: false,
      index: 0,
      clearImg: [require('~/assets/img/gift_box.png')],
      fidleValue: '',
      fileList: []
    }
  },
  methods: {
    onChange(index) {
      this.index = index
    },
    imgPreview() {
      ImagePreview({
        images: this.clearImg,
        startPosition: 0,
        closeable: true
      })
    },
    afterRead(file) {
      console.log(file)
    },
    onOversize(file) {
      console.log(file)
      Toast('文件大小不能超过10M')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/variables.scss';

.wrapper {
  width: 100vw;
  height: 100vh;
  padding-top: 9px;
  background: rgba(249, 249, 249, 1);
  .item {
    width: 100%;
    height: auto;
    li {
      position: relative;
      width: 100%;
      height: 32px;
      line-height: 32px;
      padding: 0 28px;
      font-size: 14px;
      background: #fff;
      @include halfpx-border-bot(#e1e2e3);
      span {
        color: rgba(74, 74, 74, 1);
      }
      .name {
        display: inline-block;
        margin-right: 12px;
      }
      .extra {
        font-size: 12px;
      }
    }
    & li:last-child {
      &::after {
        content: none;
      }
    }
  }
  .sec {
    margin-bottom: 10px;
    padding-bottom: 10px;
    background: #fff;
    &.img-sec {
      text-align: center;
      img {
        width: 260px;
        height: 146px;
      }
    }
    &.btn-sec {
      padding: 17px 28px;
      background: transparent;
    }
  }
  .tip {
    position: relative;
    padding: 0 28px;
    margin-bottom: 0;
    line-height: 32px;
    background: #fff;
    font-size: 14px;
    font-weight: 400;
    color: rgba(248, 83, 89, 1);
    @include halfpx-border-bot(#e1e2e3);
  }
  .van-field {
    padding: 0 26px;
  }
}
</style>
