/**
 * 接口请求
 */
import request from '~/utils/request'

const api = {
  GetVertifiCode: `/gbase/getVertifiCode`
}

// 用户信息 post 方法
export function getVertifiCode(data) {
  return request({
    url: api.GetVertifiCode,
    method: 'post',
    data,
    hideloading: true
  })
}
