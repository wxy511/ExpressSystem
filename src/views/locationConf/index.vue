<template>
  <div class="locationConf-container light-gray-background">
    <div
      class="locationConf"
      style="background: #fff; padding: 16px 16px 0; margin-bottom: 32px"
    >
      <div class="left">
        <span style="font-size: 20px">位置名称:</span>
        <ul>
          <li>SH</li>
          <li>SH</li>
          <li>SH</li>
          <li>SH</li>
          <li>SH</li>
          <li>SH</li>
          <li>SH</li>
          <li>SH</li>
          <li>SH</li>
          <li>SH</li>
        </ul>
      </div>
      <div class="right">
        <span style="font-size: 20px">位置编码</span>
        <el-input style="margin-bottom: 20px"></el-input>
        <!-- 再添加一个span,input 就变宽了 -->
        <span style="font-size: 20px">位置名称</span>
        <el-input style="margin-bottom: 20px"></el-input>
        <div class="btns">
          <el-button type="primary" style="width: 100%">添加</el-button>
          <el-button type="primary" style="width: 100%">修改</el-button>
          <el-button type="primary" style="width: 100%">删除</el-button>
        </div>
        <div>
          <el-button type="primary" style="width: 100%">设为当前位置</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "locationConf",
};
</script>
<style lang="scss" scoped>
.locationConf-container {
  padding: 10px 5px 0px 5px;
  min-height: calc(100vh - 50px);
  .locationConf {
    display: flex;
    width: 100%;
    .left {
      width: 20%;
      margin-right: 20px;
      ul li {
        list-style: none;
        font-size: 20px;
        line-height: 30px;
      }
    }
    .right {
      .btns {
        display: flex;
        justify-content: space-between;
        margin-bottom: 50px;
      }
    }
  }
}
</style>
