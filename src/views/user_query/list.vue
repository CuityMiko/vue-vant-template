<template>
  <div class="user_container">
    <div class="ad_check">
      <p @click="selectRegion">{{ cascaderValue }}<Icon name="arrow-down" /></p>
      <div class="hr"></div>
      <p @click="selectUnit">{{ newUnit }}<Icon name="arrow-down" /></p>
      <div class="hr"></div>
      <p @click="selectTime">{{ newDate }}<Icon name="arrow-down" /></p>
    </div>
    <Popup v-model="showRegion" round position="bottom">
      <Cascader
        v-model="cascaderValue"
        @finish="onFinish"
        @close="showRegion = false"
        :options="options"
        active-color="#1890ff"
        title="请选择所在地区"
      />
    </Popup>
    <Popup v-model="showUnit" round position="bottom">
      <Picker @confirm="onConfirmUnit" @cancel="showUnit = false" :columns="columns" title="请选择小区" show-toolbar />
    </Popup>
    <Popup v-model="showTime" round position="bottom">
      <DatetimePicker
        v-model="currentDate"
        :formatter="formatter"
        @confirm="onConfirmTime"
        @cancel="showTime = false"
        type="year-month"
        title="选择年月"
      />
    </Popup>
    <Search v-model="keywords" @search="onKeySearch" show-action placeholder="姓名/电话/户号">
      <template #action>
        <div @click="onKeySearch" class="search_btn">搜索</div>
      </template>
    </Search>
    <div class="user_check">
      <Checkbox
        v-model="checked1"
        :class="checked1 ? 'checked' : ''"
        class="checkbox"
        icon-size="16px"
        shape="square"
        checked-color="#1890ff"
      >
        未投放
      </Checkbox>
      <Checkbox
        v-model="checked2"
        :class="checked2 ? 'checked' : ''"
        class="checkbox"
        icon-size="16px"
        shape="square"
        checked-color="#1890ff"
      >
        未被巡检
      </Checkbox>
    </div>
    <div class="user_table">
      <div class="table_header">
        <span id="name">姓名</span>
        <span id="phone">手机号</span>
        <span id="userid">户号</span>
      </div>
      <PullRefresh v-model="refreshing" @refresh="onRefresh" success-text="刷新成功">
        <List v-model="loading" @load="onLoad" :finished="finished" finished-text="没有更多了">
          <div v-for="(item, index) in userList" :key="index" @click="userDetail(item)" class="table_body">
            <span id="name">{{ item.zhnc }}</span>
            <span id="phone">{{ item.phone }}</span>
            <span id="userid">{{ item.zhhh }}</span>
          </div>
        </List>
      </PullRefresh>
    </div>

    <Popup v-model="showDetail" style="width: 90%; padding: 12px;">
      <div>
        <div class="detail_item">
          <div class="item_title">当前角色:</div>
          <div>{{ user.dqjs }}</div>
        </div>
        <div class="detail_item">
          <div class="item_title">姓名:</div>
          <div>{{ user.zhnc }}</div>
        </div>
        <div class="detail_item">
          <div class="item_title">手机号:</div>
          <div>{{ user.phone }}</div>
        </div>
        <div class="detail_item">
          <div class="item_title">可用积分:</div>
          <div>{{ user.point }}</div>
        </div>
        <div class="detail_item">
          <div class="item_title">详细地址:</div>
          <div>{{ user.addr }}</div>
        </div>
      </div>
      <div class="divider"></div>
      <div>
        <div class="detail_item">
          <div class="item_title">是否注册绿色用户:</div>
          <div>{{ user.sfzclsyh === 1 ? '已注册' : '未注册' }}</div>
        </div>
        <div class="detail_item">
          <div class="item_title">注册时间:</div>
          <div>{{ user.createtime }}</div>
        </div>
        <div class="detail_item">
          <div class="item_title">绿色用户归属:</div>
          <div>{{ user.lsyhgs }}</div>
        </div>
      </div>
      <div class="divider"></div>
      <nuxt-link :to="`/user_query/puton/${user.tenantgroupid}`">
        <p class="pop_btn">投放明细</p>
      </nuxt-link>
      <div class="divider"></div>
      <nuxt-link :to="`/user_query/exchange/${user.tenantgroupid}`">
        <p class="pop_btn">兑换明细</p>
      </nuxt-link>
      <div class="divider"></div>
      <p @click="popBack" class="pop_btn">返回</p>
    </Popup>
  </div>
</template>

<script>
import { Icon, Popup, Cascader, Picker, DatetimePicker, Search, Checkbox, PullRefresh, List } from 'vant'
import { formatTime } from '~/utils/index'
export default {
  components: {
    Icon,
    Popup,
    Cascader,
    Picker,
    DatetimePicker,
    Search,
    Checkbox,
    PullRefresh,
    List
  },
  data() {
    return {
      showRegion: false,
      showUnit: false,
      showTime: false,
      cascaderValue: '地区',
      options: [
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
      newUnit: '小区',
      columns: ['杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华', '衢州'],
      currentDate: new Date(),
      newDate: formatTime(new Date(), 'yyyy-MM'),
      keywords: '',
      checked1: false,
      checked2: false,
      userList: [],
      resobj: {
        zhnc: '环保人士',
        phone: '15036980025',
        zhhh: '12-12'
      },
      user: {
        dqjs: '业主',
        zhnc: '张三',
        phone: '17816995204',
        point: 145,
        addr: '杭州市余杭区庙前社区九曲营小区1-3-101',
        sfzclsyh: 1,
        createtime: '2021-06-04 15:26:30',
        lsyhgs: '杭州市余杭区庙前社区九曲营小区1-3-101',
        tenantgroupid: 123
      },
      showDetail: false,
      refreshing: false,
      loading: false,
      finished: false,
      pageNum: 1
    }
  },
  computed: {
    wtf() {
      if (this.checked1) {
        return 1
      } else {
        return 0
      }
    },
    wbxj() {
      if (this.checked2) {
        return 1
      } else {
        return 0
      }
    }
  },
  watch: {
    checked1: 'refresh',
    checked2: 'refresh'
  },
  methods: {
    refresh() {
      this.pageNum = 1
      this.userList = []
      this.onLoad()
    },
    formatter(type, val) {
      if (type === 'year') {
        return `${val}年`
      } else if (type === 'month') {
        return `${val}月`
      }
      return val
    },
    selectRegion() {
      this.showRegion = true
    },
    selectUnit() {
      this.showUnit = true
    },
    selectTime() {
      this.showTime = true
    },
    onFinish(val) {
      this.cascaderValue = val.selectedOptions[val.selectedOptions.length - 1].text
      this.showRegion = false
      this.refresh()
    },
    onConfirmUnit(val) {
      this.newUnit = val
      this.showUnit = false
      this.refresh()
    },
    onConfirmTime(val) {
      this.currentDate = val
      this.newDate = formatTime(val, 'yyyy-MM')
      this.showTime = false
      this.refresh()
    },
    onKeySearch() {
      console.log(this.keywords)
      this.refresh()
    },
    userDetail(obj) {
      console.log(obj)
      this.showDetail = true
    },
    popBack() {
      this.showDetail = false
    },
    // 请求列表
    getUserList() {
      const query = {
        // orderid: // 全局获得id
        regionid: this.cascaderValue, // 处理级联树结构
        communityid: this.newUnit, // 处理小区选择
        searchstr: this.keywords,
        pageNum: this.pageNum,
        pageSize: 10,
        searchMonth: this.newDate,
        wtf: this.wtf,
        wbxj: this.wbxj
      }
      console.log(query)
      // 接口请求
      for (let i = 0; i < 16; i++) {
        this.userList.push(this.resobj)
      }
      this.loading = false
      if (this.userList.length > 40) {
        this.finished = true
      }
    },
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.userList = []
          this.refreshing = false
        }
        this.getUserList()
      }, 1000)
    },
    // 下拉刷新
    onRefresh() {
      this.finished = false
      this.userList = []
      this.pageNum = 1
      // 重新加载数据
      this.loading = true
      this.onLoad()
    }
  }
}
</script>

<style lang="scss" scoped>
.user_container {
  width: 100vw;
  height: 100vh;
  background: rgba(249, 249, 249, 1);
  .ad_check {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #fff;
    height: 50px;
    .hr {
      width: 1px;
      height: 24px;
      background-color: #eee;
    }
    p {
      flex: 1;
      text-align: center;
      color: #666;
      font-size: 15px;
      line-height: 15px;
    }
  }
  .search_btn {
    width: 60px;
    text-align: center;
    color: #fff;
    background-color: #1890ff;
    border-radius: 4px;
  }
  .user_check {
    display: flex;
    background-color: #fff;
    padding: 0 12px 10px 12px;
    .checkbox {
      background-color: #f9f9f9;
      border: 1px solid #f9f9f9;
      padding: 4px;
      margin-right: 12px;
      font-size: 14px;
      &.checked {
        border: 1px solid #1890ff;
        background-color: #fff;
        color: #1890ff;
      }
    }
  }
  .user_table {
    .table_header {
      display: flex;
      padding-left: 8px;
      height: 36px;
      color: #666;
      line-height: 36px;
      #name {
        flex: 2;
      }
      #phone {
        flex: 3;
      }
      #userid {
        flex: 2;
      }
    }
    .table_body {
      display: flex;
      padding-left: 8px;
      background-color: #fff;
      height: 45px;
      line-height: 45px;
      border-bottom: 1px solid #eee;
      #name {
        flex: 2;
      }
      #phone {
        flex: 3;
      }
      #userid {
        flex: 2;
      }
    }
  }
  .divider {
    margin: 4px 0;
    height: 1px;
    background-color: #eee;
  }
  .detail_item {
    display: flex;
    font-size: 14px;
    line-height: 24px;
    div {
      flex: 3;
    }
    .item_title {
      flex: 2;
      color: #969799;
    }
  }
  .pop_btn {
    text-align: center;
    color: #1890ff;
    font-size: 15px;
    line-height: 28px;
  }
}
</style>
