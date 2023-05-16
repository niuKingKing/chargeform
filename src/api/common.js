import request from '@/utils/request';

// 校验码状态查询
export function checkCode(query) {
  return request({
      url: '/app/frontapi/v1/checkcode/get',
      method: 'get',
      params: query
  })
}
// 证书防伪查询
export function checkCertificate(query) {
  return request({
      url: '/app/frontapi/v1/security/certificate/get',
      method: 'get',
      params: query
  })
}
// 服务能力查询
export function checkServiceCapacity(query) {
  return request({
      url: '/app/frontapi/v1/service/capacity/get',
      method: 'get',
      params: query
  })
}
// 收费标准查询
export function checkChargeStandard(query) {
  return request({
      url: '/app/frontapi/v1/charge/standard/get',
      method: 'get',
      params: query
  })
}
// 暂停项目查询
export function checkPauseProj(query) {
  return request({
      url: '/app/frontapi/v1/stop/project/get',
      method: 'get',
      params: query
  })
}
// 联系方式记录
export function saveContaction(data) {
  return request({
    url: "/app/frontapi/v1/contact/info/save",
    method: "post",
    data
  })
}





