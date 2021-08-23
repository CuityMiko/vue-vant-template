<template>
  <div class="list-wrapper">
    <Search
      v-model="searchValue"
      @search="handleSearch"
      class="custom-search"
      shape="square"
      show-action
      placeholder="请输入姓名/户号"
    >
      <template #action>
        <Button @click="handleSearch" :color="'rgba(19, 156, 252, 1)'" :size="'large'">搜索</Button>
      </template>
    </Search>
    <div class="list">
      <PullRefresh v-model="refreshing" @refresh="onRefresh">
        <List v-model="loading" @load="onLoad" :finished="finished" finished-text="没有更多了">
          <nuxt-link
            v-for="(item, index) in dataList"
            :key="'item' + index"
            :to="toDetail(item)"
            tag="div"
            class="item-box"
          >
            <ul class="item">
              <li><span class="name">所在地区：</span><span class="text">xx街道-xx村</span></li>
              <li><span class="name">姓名户号：</span><span class="text">王**/庙后-车子新路13</span></li>
              <li><span class="name">上次评价：</span><span class="text">-1 分类较差，混入少量垃圾</span></li>
            </ul>
            <img :src="clearBad" class="tag" alt="" />
          </nuxt-link>
        </List>
      </PullRefresh>
    </div>
  </div>
</template>

<script>
import { Button, Search, List, PullRefresh } from 'vant'

export default {
  components: {
    Button,
    Search,
    PullRefresh,
    List
  },
  data() {
    return {
      dataList: [1, 2, 3],
      searchValue: '',
      refreshing: false,
      loading: false,
      finished: false,
      clearBad: require('~/assets/img/clear_bad.png')
    }
  },
  computed: {},
  methods: {
    handleSearch(value) {
      console.log(value)
    },
    toDetail(_id) {
      return `/clear_supervise/detail/${_id}`
    },
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.dataList = []
          this.refreshing = false
        }

        for (let i = 0; i < 10; i++) {
          this.dataList.push(this.dataList.length + 1)
        }
        this.loading = false

        if (this.dataList.length >= 80) {
          this.finished = true
        }
      }, 1000)
    },
    onRefresh() {
      // 清空数据
      this.finished = false

      // 重新加载数据
      // 将 loading 设置为true, 表示处于加载状态
      this.loading = true
      this.onLoad()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/variables.scss';

.custom-search {
  &.van-search {
    background: transparent;
    padding: 20px;
    .van-search__content {
      background: #fff;
    }
  }
  .van-search__action {
    height: 34px;
    line-height: 1;
    .van-button {
      width: 60px;
      height: 34px;
    }
  }
}
.list-wrapper {
  width: 100vw;
  height: 100vh;
  background: rgba(249, 249, 249, 1);

  .list .van-pull-refresh {
    position: fixed;
    top: 74px;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: scroll;
  }

  .item-box {
    position: relative;
    display: block;
    .item {
      width: 100%;
      height: auto;
      margin-bottom: 10px;
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
      }
      & li:last-child {
        &::after {
          content: none;
        }
      }
    }
    .tag {
      position: absolute;
      width: 61px;
      height: 61px;
      top: 18px;
      right: 6px;
      z-index: 999;
    }
  }
}
</style>
