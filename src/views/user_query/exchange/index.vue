<template>
  <div class="exchange_body">
    <div>
      <div @click="choseDate" style="text-align: right;">{{ rangeDateStr }}<Icon name="arrow" /></div>
      <Popup v-model="showTime" round position="bottom">
        <div class="picker_btn">
          <div @click="showTime = false">取消</div>
          <div @click="onConfirmTime">确认</div>
        </div>
        <div class="range_picker">
          <span @click="handlePicker(1)">{{ date1 }}</span>
          &ensp;&ensp;至&ensp;&ensp;
          <span @click="handlePicker(2)">{{ date2 }}</span>
        </div>
        <DatetimePicker
          v-if="selectTimeType === 1"
          v-model="startTime"
          :formatter="formatter"
          :max-date="endTime"
          type="date"
          confirm-button-text=" "
          cancel-button-text=" "
        />
        <DatetimePicker
          v-if="selectTimeType === 2"
          v-model="endTime"
          :formatter="formatter"
          :min-date="startTime"
          :max-date="currentDate"
          type="date"
          confirm-button-text=" "
          cancel-button-text=" "
        />
      </Popup>
    </div>
    <div class="puton_card">
      <div class="puton_item">
        <p class="item_text">张三/12-12</p>
        <p class="item_title">姓名/户号</p>
      </div>
      <div class="hr"></div>
      <div class="puton_item">
        <p class="item_text">1445</p>
        <p class="item_title">兑换积分</p>
      </div>
    </div>
    <div class="puton_list">
      <div class="table_header">
        <span id="md">门店</span>
        <span id="dhjf">兑换积分</span>
        <span id="dhsj">兑换时间</span>
      </div>
      <PullRefresh v-model="refreshing" @refresh="onRefresh" success-text="刷新成功">
        <List v-model="loading" @load="onLoad" :finished="finished" finished-text="没有更多了">
          <div v-for="(item, index) in dataList" :key="index" class="table_body">
            <span id="md">{{ item.mdmc }}</span>
            <span id="dhjf">{{ item.dhjf }}</span>
            <span id="dhsj">{{ item.createtimestr }}</span>
          </div>
        </List>
      </PullRefresh>
    </div>
  </div>
</template>

<script>
import { Icon, Popup, DatetimePicker, PullRefresh, List } from 'vant'
import { formatTime } from '~/utils/index'
export default {
  components: {
    Icon,
    Popup,
    DatetimePicker,
    PullRefresh,
    List
  },
  data() {
    return {
      id: '',
      showTime: false,
      rangeDateStr: '日期选择',
      currentDate: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      selectTimeType: 1,
      dataList: [],
      resobj: {
        mdmc: '联运知慧',
        dhjf: '30',
        createtimestr: '2021-08-15 15:45:20'
      },
      refreshing: false,
      loading: false,
      finished: false,
      pageNum: 1
    }
  },
  computed: {
    date1() {
      return formatTime(this.startTime, 'yyyy-MM-dd')
    },
    date2() {
      return formatTime(this.endTime, 'yyyy-MM-dd')
    }
  },
  mounted() {
    this.id = this.$route.params.id
  },
  methods: {
    formatter(type, val) {
      if (type === 'year') {
        return val + '年'
      }
      if (type === 'month') {
        return val + '月'
      }
      if (type === 'day') {
        return val + '日'
      }
      return val
    },
    choseDate() {
      this.showTime = true
    },
    onConfirmTime() {
      this.showTime = false
      this.rangeDateStr = this.date1 + '至' + this.date2
      this.pageNum = 1
      this.dataList = []
      this.onLoad()
    },
    handlePicker(idx) {
      this.selectTimeType = idx
    },
    // 请求列表
    getPutonList() {
      const query = {
        tenantgroupid: this.id,
        pageNum: this.pageNum,
        pageSize: 10,
        timestr: this.date1 + ' 00:00:00',
        timeend: this.date2 + ' 23:59:59'
      }
      console.log(query)
      // 接口请求
      for (let i = 0; i < 16; i++) {
        this.dataList.push(this.resobj)
      }
      this.loading = false
      if (this.dataList.length > 40) {
        this.finished = true
      }
    },
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.dataList = []
          this.refreshing = false
        }
        this.getPutonList()
      }, 1000)
    },
    // 下拉刷新
    onRefresh() {
      this.finished = false
      this.dataList = []
      this.pageNum = 1
      // 重新加载数据
      this.loading = true
      this.onLoad()
    }
  }
}
</script>

<style lang="scss" scoped>
.exchange_body {
  width: 100vw;
  height: 100vh;
  background: rgba(249, 249, 249, 1);
  padding: 16px;
  .picker_btn {
    display: flex;
    margin: 16px;
    font-size: 14px;
    div {
      flex: 1;
      &:last-child {
        color: #1890ff;
        text-align: right;
      }
    }
  }
  .range_picker {
    padding-top: 30px;
    text-align: center;
  }
  .puton_card {
    display: flex;
    align-items: center;
    margin-top: 10px;
    padding: 8px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    .hr {
      width: 1px;
      height: 48px;
      background-color: #eee;
    }
    .puton_item {
      flex: 1;
      margin: 8px 0;
      text-align: center;
      line-height: 24px;
      .item_text {
        font-family: Arial;
      }
      .item_title {
        color: #666;
      }
    }
  }
  .puton_list {
    margin-top: 16px;
    .table_header {
      display: flex;
      color: #666;
      line-height: 36px;
      font-size: 14px;
      #md {
        flex: 3;
      }
      #dhjf {
        flex: 2;
      }
      #dhsj {
        flex: 4;
      }
    }
    .table_body {
      display: flex;
      background-color: #fff;
      line-height: 36px;
      font-size: 14px;
      border-bottom: 1px solid #eee;
      #md {
        flex: 3;
      }
      #dhjf {
        flex: 2;
      }
      #dhsj {
        flex: 4;
      }
    }
  }
}
</style>
