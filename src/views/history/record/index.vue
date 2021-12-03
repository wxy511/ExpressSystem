
<template>
  <div class="record-container light-gray-background">
    <el-row
      class="dashboard-tabs"
      style="background: #fff; padding: 16px 16px 0; margin-bottom: 32px"
    >
      <div>
        <el-row>
          <el-form ref="form" :model="form" label-width="100px">
            <el-col :span="6">
              <el-form-item label="起止时间">
                <el-date-picker
                  v-model="form.value"
                  style="width: 100%"
                  type="datetimerange"
                  :picker-options="pickerOptions"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  align="right"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="操作类型">
                <el-select
                  v-model="form.region"
                  placeholder="请选择"
                  style="width: 100%"
                >
                  <el-option label="不限" value="buxian"></el-option>
                  <el-option label="收件" value="shoujian"></el-option>
                  <el-option label="寄件" value="jijian"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-button type="primary" style="margin-left: 30px"
                >查询</el-button
              >
            </el-col>
          </el-form>
        </el-row>
      </div>
      <div>
        <el-table
          :data="tableData"
          stripe
          style="
            width: 100%;
            min-height: calc(100vh - 400px);
            margin-bottom: 10px;
          "
          :header-cell-style="{ background: '#f0f2f5' }"
        >
          <el-table-column type="index" width="50"> </el-table-column>
          <el-table-column prop="timeLocal" label="收/寄件时间" width="">
          </el-table-column>
          <el-table-column prop="companyName" label="快递公司" width="">
          </el-table-column>
          <el-table-column prop="courierCode" label="快递单号" width="">
          </el-table-column>
          <el-table-column prop="courierCode" label="包裹数量" width="">
          </el-table-column>
          <el-table-column prop="status" label="操作员" width="">
          </el-table-column>
          <el-table-column prop="status" label="操作类型" width="">
          </el-table-column>
          <el-table-column prop="name" label="收/寄件人姓名" width="">
          </el-table-column>
          <el-table-column prop="email" label="收/寄件人E-Mail" width="">
          </el-table-column>
          <el-table-column prop="phone" label="收/寄件人手机" width="">
          </el-table-column>
          <el-table-column prop="phone" label="收/寄位置" width="">
          </el-table-column>
          <el-table-column prop="phone" label="取件人姓名" width="">
          </el-table-column>
          <el-table-column prop="email" label="取件E-Mail" width="">
          </el-table-column>
          <el-table-column prop="operName" label="取件手机" width="">
          </el-table-column>
          <el-table-column prop="operName" label="取件卡号" width="">
          </el-table-column>
          <el-table-column prop="operName" label="取件时间" width="">
          </el-table-column>
          <el-table-column prop="pickupLocation" label="取件操作员">
          </el-table-column>
        </el-table>
        <div style="margin-bottom: 10px">
          <el-row>
            <el-col :span="12"
              ><span style="line-height: 40px">
                记录数量：{{ this.tableData.length }}
              </span></el-col
            >
            <el-col :span="12"
              ><el-button
                type="primary"
                style="float: right; margin-right: 10px"
                >导出</el-button
              ></el-col
            >
          </el-row>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Record",
  data() {
    return {
      //日期
      form: {
        value: "",
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      //表格
      tableData: [
        {
          timeLocal: "2021-11-23 14:06:47",
          companyName: "韵达快递",
          courierCode: "5621537125478",
          status: "未通知",
          name: "Zora",
          email: "2224374779@qq.com",
          phone: "18435680572",
          operName: "王小虎",
          pickupLocation: "北京",
        },
      ],
    };
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
.record-container {
  padding: 10px 5px 0px 5px;
  min-height: calc(100vh - 50px);
}
</style>

