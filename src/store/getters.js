/*
 * @Descripttion: 
 * @version: 
 * @Author: Bing
 * @Date: 2020-10-21 09:13:29
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-11-22 14:22:00
 */
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  userid: state => state.user.userid,
  userrights: state => state.user.userrights,
  rights_routes: state => state.rights.routes,
  language: state => state.app.language,
  routerKeepAlive: state => state.rights.routerKeepAlive,
  hiddenProperty: state => state.app.hiddenProperty
}
export default getters
