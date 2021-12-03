<template>
  <div class="dashboard-container light-gray-background">
    <el-row style="background: #fff; padding: 16px 16px 0; margin-bottom: 32px">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="$t('dashboard.paneFirstTitle')" name="first">
          <div class="Yang">
            <el-row class="YangForm">
              <el-form
                ref="form"
                :model="form"
                :rules="rules"
                label-width="100px"
                :label-position="labelPosition"
                style="padding-left: 20px"
              >
                <el-col :span="5">
                  <el-form-item :label="$t('dashboard.ExpressType')">
                    <el-select
                      style="width: 90%"
                      v-model="form.companyName"
                      :placeholder="$t('dashboard.placeholderSele')"
                      @focus="getcompanyName()"
                      @change="getItem"
                    >
                      <el-option
                        v-for="item in oplist"
                        :key="item.value"
                        :label="item.label"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item
                    :label="$t('dashboard.couriernumber')"
                    prop="courierCode"
                  >
                    <el-input
                      v-model="form.courierCode"
                      style="width: 90%"
                    ></el-input></el-form-item
                ></el-col>
                <el-col :span="5">
                  <el-form-item :label="$t('dashboard.Numberofpackages')">
                    <el-select
                      style="width: 90%"
                      v-model="form.details"
                      placeholder="请选择包裹数量"
                    >
                      <el-option
                        v-for="(item, index) in bgNumberArr"
                        :key="index"
                        :label="item"
                        :value="item"
                      ></el-option>
                    </el-select> </el-form-item
                ></el-col>
                <el-col :span="5">
                  <el-form-item :label="$t('dashboard.receName')" prop="name">
                    <el-autocomplete
                      v-model="form.name"
                      :fetch-suggestions="querySearchAsync"
                      @select="handleSelect"
                      style="width: 90%"
                    ></el-autocomplete> </el-form-item
                ></el-col>
                <el-col :span="4">
                  <el-form-item label="" style="padding-top: 50px">
                    <el-button
                      type="primary"
                      style="margin-left: 20px"
                      @click="cReceive('form')"
                    >
                      <span>{{ $t("dashboard.confirmRece") }}</span>
                    </el-button>
                  </el-form-item>
                </el-col>
              </el-form>
            </el-row>
          </div>
          <div style="padding-top: 10px; background: #f0f2f5">
            <el-row style="background: #fff">
              <el-table
                :data="
                  tableData.slice(
                    (currentPage - 1) * pageSize,
                    currentPage * pageSize
                  )
                "
                stripe
                style="width: 100%; min-height: calc(100vh - 400px)"
                :header-cell-style="{ background: '#f0f2f5' }"
              >
                <el-table-column type="index" width="50"> </el-table-column>
                <el-table-column
                  prop="timeLocal"
                  :label="$t('dashboard.receTime')"
                  width="200"
                >
                </el-table-column>
                <el-table-column
                  prop="companyName"
                  :label="$t('dashboard.expressCompany')"
                  width="200"
                >
                </el-table-column>
                <el-table-column
                  prop="courierCode"
                  :label="$t('dashboard.courierNumber')"
                  width="200"
                >
                </el-table-column>
                <el-table-column
                  prop="notifystate"
                  :label="$t('dashboard.notifystate')"
                  width="200"
                >
                </el-table-column>
                <el-table-column
                  prop="name"
                  :label="$t('dashboard.receName')"
                  width="200"
                >
                </el-table-column>
                <el-table-column
                  prop="email"
                  :label="$t('dashboard.receEmail')"
                  width="200"
                >
                </el-table-column>
                <el-table-column
                  prop="phone"
                  :label="$t('dashboard.recePhone')"
                  width="200"
                >
                </el-table-column>
                <el-table-column
                  prop="operName"
                  :label="$t('dashboard.receOperName')"
                  width="200"
                >
                </el-table-column>
                <el-table-column
                  prop="pickupLocation"
                  :label="$t('dashboard.recePickupLocation')"
                >
                </el-table-column>
              </el-table>
            </el-row>
          </div>
          <el-pagination
            background
            style="text-align: center; margin: 20px 0px"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :total="tableData.length"
            layout="total, sizes, prev, pager, next, jumper"
            :page-sizes="[10, 15, 20, 30, 40, 50]"
            :page-size.sync="pageSize"
            :current-page.sync="currentPage"
          >
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane :label="$t('dashboard.paneSecondTitle')" name="second">
          <div class="Yang">
            <el-row class="YangForm">
              <el-form
                ref="formMail"
                :model="formMail"
                label-width="100px"
                :label-position="labelPosition"
                style="padding-left: 20px"
                :rules="rules"
              >
                <el-col :span="5">
                  <el-form-item label="快递类型">
                    <el-select
                      style="width: 90%"
                      v-model="formMail.companyName"
                      placeholder="请选择快递类型"
                      @focus="getcompanyName()"
                      @change="getMailItem"
                    >
                      <el-option
                        v-for="item in oplist"
                        :key="item.value"
                        :label="item.label"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="快递单号" prop="courierCode">
                    <el-input
                      v-model="formMail.courierCode"
                      style="width: 90%"
                    ></el-input> </el-form-item
                ></el-col>
                <el-col :span="5">
                  <el-form-item label="包裹数量">
                    <el-select
                      style="width: 90%"
                      v-model="formMail.details"
                      placeholder="请选择包裹数量"
                    >
                      <el-option
                        v-for="(item, index) in bgNumberArrJI"
                        :key="index"
                        :label="item"
                        :value="item"
                      ></el-option>
                    </el-select> </el-form-item
                ></el-col>
                <el-col :span="5">
                  <el-form-item label="寄件人姓名" prop="name">
                    <el-autocomplete
                      v-model="formMail.name"
                      style="width: 90%"
                      :fetch-suggestions="querySearchAsyncMail"
                      placeholder="请输入寄件人姓名"
                      @select="handleSelectMail"
                    ></el-autocomplete> </el-form-item
                ></el-col>
                <el-col :span="4">
                  <el-form-item label="" style="padding-top: 50px">
                    <el-button
                      type="primary"
                      style="margin-left: 20px"
                      @click="confirmMailBtn('formMail')"
                      >确认寄件</el-button
                    ></el-form-item
                  ></el-col
                >
              </el-form>
            </el-row>
          </div>
          <div style="padding-top: 10px; background: #f0f2f5">
            <el-row style="background: #fff">
              <el-table
                :data="
                  tableDatamail.slice(
                    (currentPage - 1) * pageSize,
                    currentPage * pageSize
                  )
                "
                stripe
                style="width: 100%; min-height: calc(100vh - 400px)"
                :header-cell-style="{ background: '#f0f2f5' }"
              >
                <el-table-column type="index" width="50"> </el-table-column>
                <el-table-column prop="timeLocal" label="寄件时间" width="200">
                </el-table-column>
                <el-table-column
                  prop="companyName"
                  label="快递公司"
                  width="200"
                >
                </el-table-column>
                <el-table-column
                  prop="courierCode"
                  label="快递单号"
                  width="200"
                >
                </el-table-column>
                <el-table-column
                  prop="notifystate"
                  label="通知状态"
                  width="200"
                >
                </el-table-column>
                <el-table-column prop="name" label="寄件人姓名" width="200">
                </el-table-column>
                <el-table-column prop="email" label="寄件人E-Mail" width="200">
                </el-table-column>
                <el-table-column prop="phone" label="寄件人手机" width="200">
                </el-table-column>
                <el-table-column prop="operName" label="操作员" width="200">
                </el-table-column>
                <el-table-column prop="pickupLocation" label="快递位置">
                </el-table-column>
              </el-table>
            </el-row>
          </div>
          <el-pagination
            background
            style="text-align: center; margin: 20px 0px"
            @size-change="handleSizeChangeMail"
            @current-change="handleCurrentChangeMail"
            :total="tableDatamail.length"
            layout="total, sizes, prev, pager, next, jumper"
            :page-sizes="[10, 15, 20, 30, 40, 50]"
            :page-size.sync="pageSize"
            :current-page.sync="currentPage"
          >
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane :label="$t('dashboard.paneThirdTitle')" name="third">
          <div class="Yang">
            <el-row class="YangForm">
              <el-form
                :rules="rules"
                ref="formTakepart"
                :model="formTakepart"
                label-width="100px"
                :label-position="labelPosition"
                style="padding-left: 20px"
              >
                <el-col :span="5">
                  <el-form-item label="快递单号" prop="courierCode">
                    <el-input
                      v-model="formTakepart.courierCode"
                      style="width: 90%"
                      @change="getCode()"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="收件人姓名" prop="name">
                    <el-input
                      v-model="formTakepart.name"
                      style="width: 90%"
                    ></el-input></el-form-item
                ></el-col>
                <el-col :span="5">
                  <el-form-item label="取件人姓名">
                    <!-- <el-input
                      v-model="formTakepart.receName"
                      style="width: 90%"
                    ></el-input>  -->
                    <el-autocomplete
                      v-model="formTakepart.receName"
                      :fetch-suggestions="querySearchAsyncTake"
                      @select="handleSelectTake"
                      style="width: 90%"
                    ></el-autocomplete> </el-form-item
                ></el-col>
                <el-col :span="5">
                  <el-form-item label="取件人卡号">
                    <el-input
                      v-model="formTakepart.badgeID"
                      style="width: 90%"
                    ></el-input> </el-form-item
                ></el-col>

                <el-col :span="4">
                  <el-form-item label="" style="padding-top: 50px">
                    <el-button
                      type="primary"
                      style="margin-left: 20px"
                      @click="confirmTake('formTakepart')"
                      >确认取件</el-button
                    >
                  </el-form-item>
                </el-col>
              </el-form>
            </el-row>
          </div>
          <div style="padding-top: 10px; background: #f0f2f5">
            <el-row style="background: #fff">
              <el-table
                :data="
                  tableDatatakepart.slice(
                    (currentPage - 1) * pageSize,
                    currentPage * pageSize
                  )
                "
                stripe
                style="width: 100%; min-height: calc(100vh - 400px)"
                :header-cell-style="{ background: '#f0f2f5' }"
              >
                <el-table-column type="index" width="50"> </el-table-column>
                <el-table-column prop="isTake" label="是否取" width="100">
                  <template slot-scope="scope">
                    <el-checkbox
                      v-model="scope.row.isChecked"
                      @change="handSelected(scope.row)"
                    ></el-checkbox>
                  </template>
                </el-table-column>
                <!-- <el-table-column type="selection" width="100">
                </el-table-column> -->
                <el-table-column prop="timeLocal" label="收件时间" width="200">
                </el-table-column>
                <el-table-column
                  prop="companyName"
                  label="快递公司"
                  width="200"
                >
                </el-table-column>
                <el-table-column
                  prop="courierCode"
                  label="快递单号"
                  width="200"
                >
                </el-table-column>
                <el-table-column
                  prop="notifystate"
                  label="通知状态"
                  width="200"
                >
                </el-table-column>
                <el-table-column prop="name" label="收件人姓名" width="200">
                </el-table-column>
                <el-table-column prop="email" label="收件人E-Mail" width="200">
                </el-table-column>
                <el-table-column prop="phone" label="收件人手机" width="200">
                </el-table-column>
                <el-table-column prop="operName" label="操作员" width="200">
                </el-table-column>
                <el-table-column prop="pickupLocation" label="快递位置">
                </el-table-column>
              </el-table>
            </el-row>
          </div>
          <el-pagination
            background
            style="text-align: center; margin: 20px 0px"
            @size-change="handleSizeChangeTake"
            @current-change="handleCurrentChangeTake"
            :total="tableDatatakepart.length"
            layout="total, sizes, prev, pager, next, jumper"
            :page-sizes="[10, 15, 20, 30, 40, 50]"
            :page-size.sync="pageSize"
            :current-page.sync="currentPage"
          >
          </el-pagination>
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>

<script>
import {
  receive,
  fuzzyQuery,
  confirmRece,
  getCName,
  getUsers,
  getBranches,
  confirmMail,
  getUsersM,
  confirmTake,
} from "@/api/user.js";
import { getNowFormatDateMiao, getNowFormatDate } from "@/utils/index";
export default {
  name: "Dashboard",
  components: {},
  data() {
    var checkCname = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("快递类型不能为空"));
      }
      callback();
    };
    var checkCcode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("快递单号不能为空"));
      } else {
        let codeReg = new RegExp("[A-Za-z0-9]+");
        if (!codeReg.test(value)) {
          return callback(new Error("请输入数字或大小写英文"));
        }
      }
      callback();
    };
    var checkData = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("包裹数量不能为空"));
      }
      callback();
    };
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("姓名不能为空"));
      }
      callback();
    };
    var checkreceName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("取件人姓名不能为空"));
      }
      callback();
    };
    var checkbadgeID = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("取件人卡号不能为空"));
      }
      callback();
    };
    return {
      labelPosition: "top",
      activeName: "first",
      reNameInfo: {},
      reNameInfoMail: {},
      //当前页
      currentPage: 1,
      pageSize: 10,
      //用户信息
      oID: "",
      oName: "",
      //快递类型
      oplist: [],
      //模糊搜素
      timeout: null,
      //收件
      tableData: [],
      form: {
        details: "",
        // rInfo: "",
        phone: "",
        //need
        companyID: "",
        companyName: "",
        courierCode: "",
        name: "",
        branchID: "", //快件位置
        pickupLocation: "", //取件地点
        timeLocal: "", //当地时间YYYY-MM-DD HH:MM:SS
        operID: "",
        operName: "",
        //need
      },
      rules: {
        companyName: [{ validator: checkCname, trigger: "blur" }],
        courierCode: [{ validator: checkCcode, trigger: "blur" }],
        details: [{ validator: checkData, trigger: "blur" }],
        name: [{ validator: checkName, trigger: "blur" }],
        receName: [{ validator: checkreceName, trigger: "blur" }],
        badgeID: [{ validator: checkbadgeID, trigger: "blur" }],
      },
      //寄
      //件
      //开
      //始
      bgNumberArr: [
        "x1",
        "x2",
        "x3",
        "x4",
        "x5",
        "x6",
        "x7",
        "x8",
        "x9",
        "x10",
      ],
      bgNumberArrJI: [
        "x1",
        "x2",
        "x3",
        "x4",
        "x5",
        "x6",
        "x7",
        "x8",
        "x9",
        "x10",
      ],
      timeout: null,
      tableDatamail: [],
      formMail: {
        companyName: "",
        courierCode: "",
        details: "",
        name: "",
        // Ephone: "",
        phone: "",
        //add
        companyID: "",
        operID: "",
        operName: "",
        branchID: "",
        pickupLocation: "",
        timeLocal: "",
      },
      //取件
      isChecked: "",
      itemCheckID: "",
      tableDatatakepart: [],
      formTakepart: {
        courierCode: "",
        name: "",
        badgeID: "",
        receName: "",
      },
    };
  },
  methods: {
    //收
    //件
    //开
    //始
    //快递类型
    getItem(value) {
      console.log(value);
      let that = this;
      that.oplist.forEach(function (item) {
        if (value === item.id) {
          that.form.companyName = item.label;
          that.form.companyID = item.id;
        }
      });
    },
    getcompanyName() {
      let eletype = {
        eletype: 24,
      };
      let that = this;
      getCName(eletype)
        .then(function (response) {
          if (response.error == 0) {
            let listArr = [];
            response.ele.forEach(function (item) {
              let listObj = {};
              // console.log(response.ele);
              listObj.label = item.cn;
              listObj.value = item.en;
              listObj.id = item.id;
              listObj.enable = item.enable;
              listArr.push(listObj);
            });
            that.oplist = listArr;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //模糊搜索
    querySearchAsync(queryString, cb) {
      let state = {
        Ename: this.form.name,
      };
      let inputLength = 3;
      if (this.form.name.length < inputLength) {
        cb([]);
        return;
      }
      let that = this;
      fuzzyQuery(state)
        .then(function (response) {
          let demoArr = [];
          if (response.error === 0 && response.emp) {
            this.timeout = setTimeout(() => {
              response.emp.forEach(function (item) {
                let demoObj = {};
                demoObj.value = item.Ename;
                demoObj.Ecountrycode = item.Ecountrycode;
                demoObj.Edivision = item.Edivision;
                demoObj.Eid = item.Eid;
                demoObj.Enamepinyin = item.Enamepinyin;
                demoObj.Eopenid = item.Eopenid;
                demoObj.Ephone = item.Ephone;
                demoObj.Ereserved = item.Ereserved;
                demoObj.Etitle = item.Etitle;
                demoArr.push(demoObj);
              });
              cb(demoArr);
            }, 1500 * Math.random());
          } else {
            this.timeout = setTimeout(() => {
              cb([]);
            }, 3000 * Math.random());
          }
        })
        .catch(function (error) {
          console.log("错误是", error);
        });
    },
    handleSelect(item) {
      this.reNameInfo = item;
      this.form.phone = this.reNameInfo.Ephone;
    },
    //确认收件
    cReceive(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          //console.log("表单数据", this.form);
          this.form.operID = this.oID;
          this.form.operName = this.oName;
          const CurrentDate = getNowFormatDateMiao();
          this.form.timeLocal = CurrentDate;
          let formdata = this.form;
          let formdataClone = JSON.parse(JSON.stringify(formdata));
          //清空表单数据时，prop是必填的，如果不填，默认不清空
          this.$nextTick(() => {
            this.$refs["form"].resetFields();
          });
          // console.log("收件表单数据", formdataClone);
          let that = this;
          confirmRece(formdataClone)
            .then(function (response) {
              if (response.error === 0) {
                console.log("生成一个唯一的收件ID", response);
                //比如 1300
                let type = {
                  pickupType: 2049,
                };
                receive(type)
                  .then(function (response) {
                    let rece = [];
                    if (response.error == 0) {
                      // console.log("xsd", response);
                      response.data.forEach(function (item) {
                        if (item.notifystate == 0) {
                          item.notifystate = "已通知";
                          rece.unshift(item);
                        } else if (item.notifystate == 1) {
                          item.notifystate = "正在通知";
                          rece.unshift(item);
                        } else if (item.notifystate == -1) {
                          item.notifystate = "错误";
                          rece.unshift(item);
                        } else {
                          item.notifystate = "未通知";
                          rece.unshift(item);
                        }
                      });
                      that.$message({
                        message: "确认收件成功",
                        type: "success",
                      });
                      that.tableData = rece;
                    }
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          return false;
        }
      });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    //分页信息
    getPage() {
      let that = this;
      let type = {
        pickupType: 2049,
      };
      receive(type)
        .then(function (response) {
          if (response.error === 0) {
            let rece = [];
            response.data.forEach(function (item) {
              if (item.notifystate == 0) {
                item.notifystate = "已通知"; // 加载的时候，如果notifystate == -2，就会强行变成未通知
                rece.unshift(item);
              } else if (item.notifystate == 1) {
                item.notifystate = "正在通知";
                rece.unshift(item);
              } else if (item.notifystate == -1) {
                item.notifystate = "错误";
                rece.unshift(item);
              } else {
                item.notifystate = "未通知";
                rece.unshift(item);
              }
            });
            that.tableData = rece;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    //收
    //件
    //结
    //束
    //
    //
    //
    //寄
    //件
    //开
    //始
    //得到快递公司ID，name
    getMailItem(value) {
      let that = this;
      that.oplist.forEach(function (item) {
        if (value === item.id) {
          that.formMail.companyName = item.label;
          that.formMail.companyID = item.id;
        }
      });
    },
    //模糊搜素
    querySearchAsyncMail(queryString, cb) {
      let strLength = 3;
      if (this.formMail.name.length < strLength) {
        cb([]);
        return;
      }
      let keyword = {
        Ename: this.formMail.name,
      };
      fuzzyQuery(keyword)
        .then(function (response) {
          let nameArr = [];
          if (response.error === 0 && response.emp) {
            response.emp.forEach(function (item) {
              let nameObj = {};
              nameObj.value = item.Ename;
              nameObj.Ephone = item.Ephone;
              nameArr.push(nameObj);
            });
            setTimeout(() => {
              cb(nameArr);
            }, 1000);
          } else {
            console.log("没有这个员工");
            cb([]);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    handleSelectMail(item) {
      this.reNameInfoMail = item;
      this.formMail.phone = this.reNameInfoMail.Ephone;
    },
    //确认寄件
    confirmMailBtn(formMail) {
      this.$refs[formMail].validate((valid) => {
        if (valid) {
          const CurrentDateMail = getNowFormatDateMiao();
          this.formMail.timeLocal = CurrentDateMail;
          let formdata = this.formMail;
          let formMailClone = JSON.parse(JSON.stringify(formdata));
          this.$nextTick(() => {
            this.$refs["formMail"].resetFields();
          });
          console.log("寄件表单数据formMailClone", formMailClone);
          let that = this;
          confirmMail(formMailClone)
            .then(function (response) {
              if (response.error == 0) {
                let type = {
                  pickupType: 2051,
                };
                receive(type)
                  .then(function (response) {
                    console.log("寄件信息", response);
                    if (response.error == 0) {
                      let rece = [];
                      response.data.forEach(function (item) {
                        if (item.notifystate == 0) {
                          item.notifystate = "已通知";
                          rece.unshift(item);
                        } else if (item.notifystate == 1) {
                          item.notifystate = "正在通知";
                          rece.unshift(item);
                        } else if (item.notifystate == -1) {
                          item.notifystate = "错误";
                          rece.unshift(item);
                        } else {
                          item.notifystate = "未通知";
                          rece.unshift(item);
                        }
                      });
                      that.$message({
                        message: "确认寄件成功",
                        type: "success",
                      });
                      that.tableDatamail = rece;
                    }
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          return false;
        }
      });
    },
    //分页信息寄件
    getPageMail() {
      let that = this;
      let type = {
        pickupType: 2051,
      };
      receive(type)
        .then(function (response) {
          if (response.error === 0) {
            let rece = [];
            response.data.forEach(function (item) {
              if (item.notifystate == 1) {
                item.notifystate = "正在通知"; // 加载的时候，如果notifystate == -2，就会强行变成未通知
                rece.unshift(item);
              } else if (item.notifystate == -2) {
                item.notifystate = "未通知";
                rece.unshift(item);
              } else if (item.notifystate == -1) {
                item.notifystate = "错误";
                rece.unshift(item);
              } else if (item.notifystate == 0) {
                item.notifystate = "已通知";
                rece.unshift(item);
              }
            });
            that.tableDatamail = rece;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    handleSizeChangeMail(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChangeMail(val) {
      console.log(`当前页: ${val}`);
    },
    //寄
    //件
    //结
    //束
    //
    //
    //
    //取
    //件
    //开
    //始
    //分页信息
    getPageTake() {
      let that = this;
      let type = {
        pickupType: 2049,
      };
      receive(type)
        .then(function (response) {
          if (response.error === 0) {
            let rece = [];
            response.data.forEach(function (item) {
              if (item.notifystate == 1) {
                item.notifystate = "正在通知"; // 加载的时候，如果notifystate == -2，就会强行变成未通知
                rece.unshift(item);
              } else if (item.notifystate == -2) {
                item.notifystate = "未通知";
                rece.unshift(item);
              } else if (item.notifystate == -1) {
                item.notifystate = "错误";
                rece.unshift(item);
              } else if (item.notifystate == 0) {
                item.notifystate = "已通知";
                rece.unshift(item);
              }
            });
            that.tableDatatakepart = rece;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    handleSizeChangeTake(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChangeTake(val) {
      console.log(`当前页: ${val}`);
    },
    //快递单号
    getCode() {
      let codeInfo = {
        courierCode: this.formTakepart.courierCode,
      };
      let that = this;
      if (that.formTakepart.courierCode.length > 0) {
        receive(codeInfo)
          .then(function (response) {
            let rece = [];
            if (response.error == 0) {
              console.log("表格数据有", response.data);
              response.data.forEach(function (item) {
                if (item.notifystate == 0) {
                  item.notifystate = "已通知";
                  rece.unshift(item);
                  that.formTakepart.name = item.name;
                } else if (item.notifystate == 1) {
                  item.notifystate = "正在通知";
                  rece.unshift(item);
                  that.formTakepart.name = item.name;
                } else if (item.notifystate == -1) {
                  item.notifystate = "错误";
                  rece.unshift(item);
                  that.formTakepart.name = item.name;
                } else {
                  item.notifystate = "未通知";
                  rece.unshift(item);
                  that.formTakepart.name = item.name;
                }
              });
              that.tableDatatakepart = rece;
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        that.formTakepart.name = that.formTakepart.courierCode;
      }

      // if (codeInfo等于那个唯一的ID) {
      // }
    },
    //模糊搜索
    querySearchAsyncTake(queryString, cb) {
      let strLength = 3;
      if (this.formTakepart.receName.length < strLength) {
        cb([]);
        this.formTakepart.badgeID = "";
        return;
      }
      let keyword = {
        Ename: this.formTakepart.receName,
      };
      fuzzyQuery(keyword)
        .then(function (response) {
          let nameArr = [];
          if (response.error === 0 && response.emp) {
            response.emp.forEach(function (item) {
              let nameObj = {};
              nameObj.value = item.Ename;
              nameObj.Ephone = item.Ephone;
              nameObj.Eid = item.Eid;
              nameArr.push(nameObj);
            });
            setTimeout(() => {
              cb(nameArr);
            }, 1000);
          } else {
            console.log("没有这个员工");
            cb([]);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    handleSelectTake(item) {
      // console.log(item);
      this.formTakepart.badgeID = item.Eid;
    },
    //得到每一行的收件时唯一的ID
    handSelected(row) {
      this.itemCheckID = row.id;
    },
    //确认取件
    confirmTake(formTakepart) {
      this.$refs[formTakepart].validate((valid) => {
        if (valid) {
          let formdata = this.formTakepart;
          let formTakeClone = JSON.parse(JSON.stringify(formdata));
          this.$nextTick(() => {
            this.$refs["formTakepart"].resetFields();
          });
          console.log(this.formTakepart);
          console.log(formTakeClone);
          const CurrentDateTake = getNowFormatDateMiao();
          let takeInfo = {
            id: this.itemCheckID,
            timeLocal: CurrentDateTake,
            receName: formTakeClone.receName,
            operName: this.oName,
            operID: this.oID,
          };
          let that = this;
          confirmTake(takeInfo)
            .then(function (response) {
              console.log("za", response);
              if (response.error === 0) {
                console.log(formTakeClone.courierCode);
                let tableInfo = {
                  courierCode: formTakeClone.courierCode,
                };
                receive(tableInfo)
                  .then(function (response) {
                    console.log(response);
                    let rece = [];
                    let receClone = [];
                    if (response.error == 0) {
                      response.data.forEach(function (item) {
                        receClone.unshift(item);
                        if (item.id === that.itemCheckID) {
                          console.log(111, item);
                          rece.shift(item);
                        }
                      });
                      console.log("dw", rece);
                      that.tableDatatakepart = rece;
                    }
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      });
    },
    //取
    //件
    //结
    //束
  },
  created() {
    //console.log("111", this.$store.state.user.name);
    let that = this;
    //得到用户信息
    getUsers()
      .then(function (response) {
        if (response.error === 0) {
          let userArr = response.user;
          that.oID = userArr[0].userid;
          that.oName = userArr[0].username;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    getUsersM()
      .then(function (response) {
        if (response.error === 0) {
          response.user.forEach(function (item) {
            if (that.$store.state.user.name == item.username) {
              that.formMail.operID = item.userid;
              that.formMail.operName = item.username;
            }
            // that.formMail.operID = item.userid;
            // that.formMail.operName = item.username;
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    //得到快件位置
    getBranches()
      .then(function (response) {
        if (response.error === 0) {
          that.form.branchID = response.branch[0].code;
          that.form.pickupLocation = response.branch[0].cn;
          that.formMail.branchID = response.branch[0].code;
          that.formMail.pickupLocation = response.branch[0].cn;
          //快递位置暂时写死
          // response.branch.forEach(function (item) {
          //   if (1) {
          // that.form.branchID = item.code;
          // that.form.pickupLocation = item.cn;
          // that.formMail.branchID = item.code;
          // that.formMail.pickupLocation = item.cn;
          //   }
          // });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  mounted() {
    this.getPage();
    this.getPageMail();
    this.getPageTake();
  },
};
</script>

<style lang="scss" >
.dashboard-container {
  padding: 10px 5px 0px 5px;
  min-height: calc(100vh - 50px);
  .fontClass {
    font-size: 25px !important;
    font-weight: 800;
  }
  .Yang {
    padding: 10px;
    background: #f0f2f5;
    margin-bottom: 10px;
    .YangForm {
      background: #fff;
      border-radius: 5px;
    }
  }
}
//水平滚动条
// .el-table__body-wrapper::-webkit-scrollbar {
//   width: 0px;
// }
.el-form--label-top .el-form-item__label {
  display: inline-block;
  text-align: left;
  padding: 5px 0px;
}
.el-tabs__item {
  font-size: 20px;
}
</style>