<template>
  <div class="wrapper">
    <div class="header row">
      <div @click="handlePicker(1)" class="time start">
        <span class="time-text">{{ startTimeStr }}</span>
        <Icon name="arrow-down" />
      </div>
      <span class="split"> - </span>
      <div @click="handlePicker(2)" class="time end">
        <span class="time-text">{{ endTimeStr }}</span>
        <Icon name="arrow-down" />
      </div>
      <Button :text="'查询'" :color="'rgba(24, 144, 255, 1)'" class="search-btn" type="info" />
    </div>
    <div class="total row">
      <span>积分汇总：已完成{{ exchangeCoins }}分</span>
      <span>已撤销{{ revokeCoins }}分</span>
    </div>
    <div class="list">
      <PullRefresh v-model="refreshing" @refresh="onRefresh">
        <List v-model="loading" @load="onLoad" :finished="finished" finished-text="没有更多了">
          <nuxt-link
            v-for="(item, index) in dataList"
            :key="'item' + index"
            :to="toDetail(item)"
            tag="div"
            class="item-box row"
          >
            <div class="text">
              <h3>xxxxx小区 1-1-101 张德志</h3>
              <h5>兑换积分 2002</h5>
              <p>2019-02-01 13:21:34</p>
            </div>
            <span class="status done">已完成</span>
          </nuxt-link>
        </List>
      </PullRefresh>
    </div>
    <Popup v-model="showPop" :style="{ height: '308px' }" position="bottom">
      <DatetimePicker
        v-if="selectTimeType === 1"
        v-model="startTime"
        @confirm="handlePickerConfirm"
        @cancel="handleCancel"
        :max-date="endTime"
        type="date"
        title="选择起始日期"
      />
      <DatetimePicker
        v-if="selectTimeType === 2"
        v-model="endTime"
        @confirm="handlePickerConfirm"
        @cancel="handleCancel"
        :min-date="startTime"
        :max-date="currentDate"
        type="date"
        title="选择起始日期"
      />
    </Popup>
  </div>
</template>

<script>
import { Button, Icon, Popup, DatetimePicker, List, PullRefresh } from 'vant'
import { formatTime } from '~/utils/index'

export default {
  components: {
    Button,
    Icon,
    Popup,
    DatetimePicker,
    PullRefresh,
    List
  },
  data() {
    return {
      currentDate: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      exchangeCoins: 1000,
      revokeCoins: 100,
      showPop: false,
      selectTimeType: 1,
      dataList: [1, 2, 3],
      refreshing: false,
      loading: false,
      finished: false
    }
  },
  computed: {
    startTimeStr() {
      return formatTime(this.startTime, 'yyyy-MM-dd')
    },
    endTimeStr() {
      return formatTime(this.endTime, 'yyyy-MM-dd')
    }
  },
  methods: {
    handlePicker(idx) {
      this.showPop = true
      this.selectTimeType = idx
    },
    handlePickerConfirm() {
      this.showPop = false
    },
    handleCancel() {
      this.showPop = false
      this.$nextTick(() => {
        this.selectTimeType = 1
      })
    },
    toDetail(_id) {
      return `/coins_record/detail/${_id}`
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

        if (this.dataList.length >= 20) {
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

.wrapper {
  width: 100vw;
  height: 100vh;
  padding-top: 10px;
  background: rgba(249, 249, 249, 1);
  .header {
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding: 10px 15px;
    background: #fff;
    justify-content: space-between;
    .time {
      position: relative;
      flex: 0 0 120px;
      width: 120px;
      height: 30px;
      line-height: 30px;
      padding: 0 10px;
      background: rgba(242, 242, 242, 1);
      border-radius: 4px;
      .time-text {
        font-size: 14px;
        color: rgba(17, 17, 17, 0.87);
      }
      i {
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
      }
    }
    .split {
      line-height: 30px;
    }
    .search-btn {
      line-height: 30px;
      height: 30px;
    }
  }
  .total {
    line-height: 35px;
    padding: 0 15px;
    font-size: 14px;
    color: rgba(102, 102, 102, 1);
  }
  .list {
    .van-pull-refresh {
      position: fixed;
      top: 95px;
      right: 0;
      bottom: 0;
      left: 0;
      overflow: scroll;
      padding: 0 15px;
      background: #fff;
      .item-box {
        position: relative;
        justify-content: space-between;
        align-items: center;
        padding: 12px 0;
        @include halfpx-border-bot(#e1e2e3);
        * {
          line-height: 1.5;
          font-weight: 400;
        }
        h3 {
          margin-bottom: 5px;
          font-size: 14px;
          color: rgba(17, 17, 17, 1);
        }
        h5 {
          margin-bottom: 5px;
          font-size: 12px;
          color: rgba(17, 17, 17, 1);
        }
        p {
          font-size: 12px;
          color: rgba(153, 153, 153, 1);
        }
        .status {
          font-size: 16px;
          font-weight: 600;
          color: rgba(204, 204, 204, 1);
          &.done {
            color: rgba(255, 155, 16, 1);
          }
        }
      }
    }
  }
}
</style>
