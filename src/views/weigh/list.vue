<template>
  <div class="wrapper">
    <div class="header row">
      <div @click="handleCascader(1)" class="item"><span class="text">地区</span><Icon name="arrow-down" /></div>
      <div @click="handleCascader(2)" class="item">
        <span class="text">小区学校单位</span><Icon name="arrow-down" />
      </div>
    </div>
    <div class="scan">
      <Icon name="scan" color="#fff" size="24" />
    </div>
    <div class="search">
      <Search
        v-model="searchValue"
        @search="handleSearch"
        class="custom-search"
        shape="square"
        show-action
        placeholder="姓名/电话/户号"
      >
        <template #action>
          <Button @click="handleSearch" :color="'rgba(19, 156, 252, 1)'" :size="'large'">查询</Button>
        </template>
      </Search>
    </div>
    <div class="list">
      <div class="row head">
        <span>姓名</span>
        <span>手机号</span>
        <span>户号</span>
      </div>
      <PullRefresh v-model="refreshing" @refresh="onRefresh">
        <List v-model="loading" @load="onLoad" :finished="finished" finished-text="没有更多了">
          <div
            v-for="(item, index) in dataList"
            @click="handleSelect(index)"
            :key="'item' + index"
            :class="{ active: selectedUser === index }"
            class="item-box row"
          >
            <span>MK</span>
            <span>18500735583</span>
            <span>1-1-1104</span>
          </div>
        </List>
      </PullRefresh>
    </div>
    <div class="rules">
      <div class="list row">
        <span
          @click="selectTag(index)"
          v-for="(item, index) in 10"
          :key="'index' + index"
          :class="{ active: selectedTag === index }"
          class="tag"
        >
          标签
        </span>
      </div>
    </div>
    <div class="weigh">
      <div class="head row">
        <span class="h-item">类型</span>
        <span class="h-item">重量(kg)</span>
        <span class="h-item">积分奖励</span>
      </div>
      <ul>
        <li v-for="(item, index) in 5" :key="'index' + index">
          <span @click="handleDeleteWeigh(index)" class="close">
            <Icon name="cross" color="#999" />
          </span>
          <span class="item">金属{{ item }}</span>
          <span class="item">{{ 100 * index }}</span>
          <span class="item">{{ 1000 * index }}</span>
        </li>
      </ul>
    </div>
    <div class="total row">
      <span>总计：<i>1000分</i></span>
      <Button :text="'提交称重'" :color="'#1890ff'" />
    </div>
    <Popup v-model="showDistCasca" position="bottom">
      <Cascader
        v-model="cascaderValue"
        @finish="onFinish"
        :options="options1"
        @close="showDistCasca = false"
        title="请选择所在地区"
        active-color="rgba(24, 144, 255, 1)"
      />
    </Popup>
    <Popup v-model="showCommunityCasca" position="bottom">
      <Cascader
        v-model="cascaderValue"
        @finish="onFinish"
        :options="options2"
        @close="showCommunityCasca = false"
        title="请选择小区学校单位"
        active-color="rgba(24, 144, 255, 1)"
      />
    </Popup>
    <Popup v-model="showWeighPop" closeable>
      <div class="popup-box">
        <h1>选择小类</h1>
        <div class="items row">
          <span v-for="(item, index) in 6" :key="'item' + index" class="item">小类</span>
        </div>
      </div>
    </Popup>
  </div>
</template>

<script>
import { Icon, Popup, Cascader, Search, Button, PullRefresh, List, Toast } from 'vant'

export default {
  components: {
    Icon,
    Popup,
    Cascader,
    Search,
    Button,
    PullRefresh,
    List
  },
  data() {
    return {
      showDistCasca: false,
      showCommunityCasca: false,
      cascaderValue: '',
      // 选项列表，children 代表子选项，支持多级嵌套
      options1: [
        {
          text: '浙江省',
          value: '330000',
          children: [{ text: '杭州市', value: '330100' }]
        },
        {
          text: '江苏省',
          value: '320000',
          children: [{ text: '南京市', value: '320100' }]
        }
      ],
      options2: [
        {
          text: '映荷街道',
          value: '330000',
          children: [{ text: '映荷小区', value: '330100' }]
        },
        {
          text: '东湖街道',
          value: '320000',
          children: [{ text: '采荷小区', value: '320100' }]
        }
      ],
      dataList: [1, 2, 3],
      searchValue: '',
      refreshing: false,
      loading: false,
      finished: false,
      selectedUser: undefined,
      selectedTag: undefined,
      showWeighPop: false
    }
  },
  mounted() {
    document.title = '称重'
  },
  methods: {
    handleSearch(value) {
      console.log(value)
    },
    // 全部选项选择完毕后，会触发 finish 事件
    onFinish({ selectedOptions }) {
      this.showDistCasca = false
      this.fieldValue = selectedOptions.map(option => option.text).join('/')
    },
    handleCascader(idx) {
      if (idx === 1) {
        this.showDistCasca = true
      } else {
        this.showCommunityCasca = true
      }
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
    },
    // 选择用户
    handleSelect(idx) {
      this.selectedUser = idx
    },
    // 选择标签
    selectTag(idx) {
      if (!this.selectedUser) {
        Toast('请先选择用户')
        return false
      }
      this.selectedTag = idx
      this.showWeighPop = true
    },
    // 删除称重
    handleDeleteWeigh(idx) {
      console.log(idx)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/variables.scss';

.wrapper {
  width: 100vw;
  height: 100vh;
  padding-top: 85px;
  overflow-x: hidden;
  .scan {
    position: fixed;
    top: 29.98vh;
    right: 0;
    width: 45px;
    height: 40px;
    text-align: center;
    padding-top: 8px;
    z-index: 99;
    border-radius: 25px 0 0 25px;
    background: #1890ff;
  }
  .total {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.15);
    padding-left: 20px;
    background: #fff;
    justify-content: space-between;
    color: #666;
    i {
      font-size: 20px;
      font-style: normal;
      color: #1890ff;
    }
    .van-button {
      height: 50px;
      border-radius: 0;
    }
  }
  .header {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: #fff;
    justify-content: space-between;
    @include halfpx-border-bot(#e1e2e3);
    .item {
      position: relative;
      flex: 0 0 50%;
      width: 50%;
      line-height: 40px;
      text-align: center;
      font-size: 14px;
      &:first-child::before {
        content: ' ';
        position: absolute;
        width: 1px;
        height: 20px;
        top: 50%;
        right: 0;
        transform: translateY(-50%) scaleX(0.5);
        background: #e1e2e3;
      }
      i {
        margin-left: 6px;
      }
    }
  }
  .search {
    position: fixed;
    top: 41px;
    right: 0;
    left: 0;
    width: 100%;
    height: 44px;
    line-height: 44px;
    padding: 5px 15px;
    background: #fff;

    .custom-search {
      &.van-search {
        background: transparent;
        padding: 0;
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
  }
  .list {
    width: 100%;
    .head {
      position: fixed;
      top: 85px;
      right: 0;
      width: 100%;
      line-height: 30px;
      padding: 0 20px;
      justify-content: space-between;
      background: rgba(248, 248, 248, 1);
      span {
        text-align: left;
        font-size: 14px;
        &:nth-child(1) {
          flex: 0 0 28%;
          width: 28%;
        }
        &:nth-child(2) {
          flex: 0 0 41.6%;
          width: 41.6%;
        }
        &:nth-child(3) {
          flex: auto;
        }
      }
    }
    .van-pull-refresh {
      position: fixed;
      top: 115px;
      right: 0;
      bottom: 262px;
      left: 0;
      width: 100%;
      overflow: scroll;
      .item-box {
        position: relative;
        width: 100%;
        line-height: 45px;
        padding: 0 20px;
        justify-content: space-between;
        transition: all 0.55s cubic-bezier(0.215, 0.61, 0.355, 1);
        @include halfpx-border-bot(#e1e2e3);
        &.active {
          background: rgba(24, 144, 255, 0.15);
        }
        span {
          display: inline-block;
          text-align: left;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          font-size: 14px;
          &:nth-child(1) {
            flex: 0 0 28%;
            width: 28%;
          }
          &:nth-child(2) {
            flex: 0 0 41.6%;
            width: 41.6%;
          }
          &:nth-child(3) {
            flex: auto;
          }
        }
      }
    }
  }
  .rules {
    position: fixed;
    left: 0;
    bottom: 197px;
    width: 100%;
    height: 65px;
    padding-top: 10px;
    background: #f9f9f9;
    ::-webkit-scrollbar {
      height: 0;
    }
    .list {
      width: 100%;
      height: 55px;
      line-height: 55px;
      background: #fff;
      padding: 7.5px 15px;
      justify-content: flex-start;
      flex-wrap: nowrap;
      overflow-x: scroll;
      .tag {
        flex: 0 0 75px;
        width: 75px;
        height: 40px;
        line-height: 40px;
        margin-right: 30px;
        background: #f8f8f8;
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        text-align: center;
        transition: all 0.33s cubic-bezier(0.215, 0.61, 0.355, 1);
        font-size: 14px;
        &:last-child {
          margin-right: 0;
        }
        &.active {
          background: #1890ff;
          border-color: #1890ff;
          color: #fff;
        }
      }
    }
  }
  .weigh {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 197px;
    .head {
      position: relative;
      width: 100%;
      height: 30px;
      line-height: 30px;
      padding: 0 20px 0 50px;
      background: #f8f8f8;
      @include halfpx-border-bot(#e1e2e3);
      span.h-item {
        text-align: left;
        font-size: 14px;
        color: #666;
        &:nth-child(1) {
          flex: 0 0 28%;
          width: 28%;
        }
        &:nth-child(2) {
          flex: 0 0 42.67%;
          width: 42.67%;
        }
        &:nth-child(3) {
          flex: auto;
        }
      }
    }
    ul {
      width: 100%;
      height: 167px;
      overflow-y: scroll;
      padding-bottom: 50px;
      li {
        position: relative;
        display: flex;
        justify-content: flex-start;
        line-height: 45px;
        padding: 0 20px;
        @include halfpx-border-bot(#e1e2e3);
        span.close {
          flex: 0 0 20px;
          width: 20px;
          margin-right: 10px;
        }
        span.item {
          text-align: left;
          font-size: 14px;
          color: #111;
          &:nth-child(2) {
            flex: 0 0 28%;
            width: 28%;
          }
          &:nth-child(3) {
            flex: 0 0 42.67%;
            width: 42.67%;
          }
          &:nth-child(4) {
            flex: auto;
          }
        }
      }
    }
  }
  .popup-box {
    width: 300px;
    height: 225px;
    h1 {
      position: relative;
      width: 100%;
      line-height: 50px;
      margin: 0;
      padding: 0 15px;
      font-size: 16px;
      font-weight: 400;
      color: #999;
      @include halfpx-border-bot(#e1e2e3);
    }
    .items {
      width: 100%;
      height: 175px;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 20px 20px;
      overflow-y: scroll;
      .item {
        flex: 0 0 75px;
        width: 75px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: #f8f8f8;
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        margin: 0 17.5px 20px 0;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        font-size: 14px;
        color: #111;
        &:nth-child(3n + 3) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
