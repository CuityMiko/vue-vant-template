<template>
  <div class="container">
    <div>
      <Tabs v-model="active" animated color="#1890ff">
        <Tab title="项目运营">
          <Grid :column-num="3" :border="false">
            <GridItem to="/user_query/list">
              <van-image :src="iconUser" />
              <span class="icon_title">用户查询</span>
            </GridItem>
            <GridItem to="/code_inspection/manual">
              <van-image :src="iconInspect" />
              <span class="icon_title">扫码巡检</span>
            </GridItem>
            <GridItem to="/weigh/list">
              <van-image :src="iconWeigh" />
              <span class="icon_title">称重</span>
            </GridItem>
            <GridItem to="/clear_plan/list">
              <van-image :src="iconPlan" />
              <span class="icon_title">清运规划</span>
            </GridItem>
            <GridItem to="/clear_supervise/list">
              <van-image :src="iconInspector" />
              <span class="icon_title">清运督察</span>
            </GridItem>
          </Grid>
        </Tab>
        <Tab title="收营员">
          <Grid :column-num="3" :border="false">
            <GridItem to="/coins_exchange">
              <van-image :src="iconExchange" />
              <span class="icon_title">扫码兑换</span>
            </GridItem>
            <GridItem to="/coins_record/list">
              <van-image :src="iconDeal" />
              <span class="icon_title">交易记录</span>
            </GridItem>
          </Grid>
        </Tab>
      </Tabs>
    </div>
  </div>
</template>

<script>
import { Grid, GridItem, Tabs, Tab } from 'vant'
import iconUser from '~/assets/img/images/icon_user.png'
import iconInspect from '~/assets/img/images/icon_inspect.png'
import iconWeigh from '~/assets/img/images/icon_weigh.png'
import iconPlan from '~/assets/img/images/icon_plan.png'
import iconInspector from '~/assets/img/images/icon_inspector.png'
import iconExchange from '~/assets/img/images/icon_exchange.png'
import iconDeal from '~/assets/img/images/icon_deal.png'

export default {
  loading: true,
  components: {
    Grid,
    GridItem,
    Tabs,
    Tab
  },
  data() {
    return {
      iconUser,
      iconInspect,
      iconWeigh,
      iconPlan,
      iconInspector,
      iconExchange,
      iconDeal,
      title: '舟山浙里办',
      envTxt: ''
    }
  },
  head() {
    return {
      title: this.title
    }
  },
  mounted() {
    try {
      ZWJSBridge.onReady(() => {
        console.log('初始化完成后，执行bridge方法')
      })
    } catch (error) {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.container {
  color: #000;
  display: flex;
  width: 100%;
  min-height: 100vh;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
}
</style>
