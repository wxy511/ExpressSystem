import request from '@/utils/request'
export function login(data) {
  return request({
    url: '/1065/',
    method: 'post',
    data
  })
}
export function getInfo(data) {
  return request({
    url: '/1065/',
    method: 'post',
    data
  })
}
export function logout() {
  return request({
    url: '/vue-admin-template/user/ ',
    method: 'post'
  })
}

// export function login(data) {
//   const test = {
//     url: '/1065/',
//     method: 'post',
//     data
//   }
//   return request(test)
// }

//记录表
export function receive(data) {
  return request({
    url: '/2085/',
    method: 'post',
    data,
  })
}
//获取快递公司
export function getCName(data) {
  return request({
    url: '/1085/',
    method: 'post',
    data,
  })
}
//模糊搜素
export function fuzzyQuery(data) {
  return request({
    url: '/1059/',
    method: 'post',
    data,
  })
}
//操作员或用户信息
export function getUsers(data) {
  return request({
    url: '/1071/',
    method: 'post',
    data,
  })
}
export function getUsersM(data) {
  return request({
    url: '/1071/',
    method: 'post',
    data,
  })
}
//得到快件位置
export function getBranches(data) {
  return request({
    url: '/1047/',
    method: 'post',
    data,
  })
}
//确认收件
export function confirmRece(data) {
  return request({
    url: '/2049/',
    method: 'post',
    data,
  })
}
//确认寄件
export function confirmMail(data) {
  return request({
    url: '/2051/',
    method: 'post',
    data,
  })
}
//确认取件
export function confirmTake(data) {
  return request({
    url: '/2050/',
    method: 'post',
    data,
  })
}
