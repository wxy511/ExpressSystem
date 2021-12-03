<!--
 * @Descripttion: 用户修改自己信息的组件
 * @version: 
 * @Author: Bing
 * @Date: 2020-12-07 09:45:56
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-11-22 14:14:23
-->
<template>
  <!-- modify users -->
  <el-dialog 
    ref="SelfModifyDialog" 
    class="self-modify-dialog"
    :title="Type === 'self'?$t('Administrator.Users.EditUsers'):$t('Administrator.Users.ModifyPassword')" 
    :visible.sync="UsersDialog.UsersDlg" 
    :close-on-click-modal="false"
    :append-to-body="true"
    width="40%"
    @closed="UsersDialogClosed"
  >
    <div class="self-modify-users">
      <el-form
        ref="UsersDialog"
        v-loading="UsersDialog.DlgLoading"
        :model="UsersDialog"
        :rules="rules"
        label-position="left"
        label-width="200PX"
        destroy-on-close="true"
        clase="self-modify-users-form"
      >
        <el-form-item prop="dialogUserName" :label="$t('Administrator.Users.UserName')">
          <el-input v-model="UsersDialog.dialogUserName" v-input-filter:common :disabled="true" maxlength="16" />
        </el-form-item>
        <el-form-item v-if="Type === 'self'" prop="dialogOldPassword" :label="$t('Administrator.Users.OldPassword')">
          <el-input v-model="UsersDialog.dialogOldPassword" v-input-filter:pwd show-password maxlength="64" />
        </el-form-item>
        <el-form-item prop="dialogPassword" :label="$t('Administrator.Users.NewPassword')">
          <el-input v-model="UsersDialog.dialogPassword" v-input-filter:pwd show-password maxlength="64" />
        </el-form-item>
        <!-- <el-form-item v-if="false" prop="dialogAssigned" :label="$t('Administrator.Users.AssignedTo')">
          <el-select v-model="UsersDialog.dialogAssigned" :disabled="true" class="full-width">
            <el-option
              v-for="item in UserAssigned"
              :key="item.id"
              :label="item.value"
              :value="item.label"
            />
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item v-if="Type === 'self'" prop="dialogPrintIP" :label="$t('Administrator.Users.PrintIP')">
          <el-input v-model="UsersDialog.dialogPrintIP" maxlength="16" />
        </el-form-item> -->
        <el-form-item>
          <el-button :loading="Buttonloading" style="float:right;width:10rem" type="primary" @click="SaveData">
            {{ $t('Configuration.Save') }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import i18n from '@/languages'
// var Base64 = require('js-base64').Base64
// import store from '@/store'
export default {
  name: 'ModifyInfo',
  data() {
    const ValidateAll = (rule, value, callback) => {
      if (rule.field === 'dialogUserName') {
        if (value.length < 1) {
          callback(new Error(i18n.t('Administrator.Users.UserNameEmpty')))
        } else {
          callback()
        }
      }
      if (rule.field === 'dialogPassword') {
        var pwdRegex = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,30}')
 
        if (!pwdRegex.test(value)) {
          callback(new Error(i18n.t('Administrator.Users.PwdCheck')))
        }
        if (value.length < 1) {
          callback(new Error(i18n.t('Administrator.Users.PassWordEmpty')))
        } else {
          callback()
        }
      }
      if (rule.field === 'dialogOldPassword') {
        if (this.Type === 'self') {
          if (value.length < 1) {
            callback(new Error(i18n.t('Administrator.Users.PassWordEmpty')))
          } else {
            callback()
          }
        } else {
          callback()
        }
      }
    }
    return {
      UserTableLoading: false,
      UserTableDate: [],
      routes: [],
      UsersDialog: {
        UsersDlg: false,
        DlgLoading: false,
        dialogUserName: '',
        dialogPrintIP: '',
        dialogUserID: '',
        dialogPassword: '',
        dialogOldPassword: '',
        dialogAssigned: ''
      },
      rules: {

        dialogUserName: [{ required: true, trigger: 'blur', validator: ValidateAll }],
        dialogPassword: [{ required: true, trigger: 'blur', validator: ValidateAll }],
        dialogOldPassword: [{ required: true, trigger: 'blur', validator: ValidateAll }]
      },
      Buttonloading: false,
      UserID: '',
      UserAssigned: [],
      Type: ''
    }
  },
  computed: {
    ...mapGetters([
      'language',
      'name',
      'userrights',
      'visitbranch'
    ]),
    routesData() {
      return this.routes
    }
  },
  methods: {
    /**
     * 获得所有的用户信息
     */
    GetAssignedUsers() {

    },
    /**
     * 关闭
     */
    UsersDialogClosed() {
      this.$refs.UsersDialog.resetFields()
      this.UsersDialog.UsersDlg = false
      this.UsersDialog.dialogUserName = ''
      this.UsersDialog.dialogPassword = ''
      this.UsersDialog.dialogOldPassword = ''
      this.UsersDialog.dialogAssigned = ''
      // this.UsersDialog.dialogPrintIP = ''
      this.DefaultArry = []
    },
    /**
     * 保存数据
     */
    SaveData() {   
      this.$refs.UsersDialog.validate((Valid) => {
        if (Valid) {
          // eslint-disable-next-line
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.self-modify-users{
  padding: 1rem 2rem;
  width:100%;
}
</style>
