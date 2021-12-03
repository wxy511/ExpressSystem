<!--
 * @Descripttion: 
 * @version: 
 * @Author: Bing
 * @Date: 2020-10-23 18:45:20
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-06-30 11:25:35
-->
<template>
  <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
    <div>
      <svg-icon class-name="international-icon" icon-class="icd-earth" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="language==='zh-CN'" command="zh-CN">
        中文简体
      </el-dropdown-item>
      <el-dropdown-item :disabled="language==='en'" command="en">
        English
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import i18n from '@/languages'
export default {
  computed: {
    language() {
      return this.$store.getters.language
    }
  },
  methods: {
    handleSetLanguage(lang) {
      this.$i18n.locale = lang
      this.$store.dispatch('app/setLanguage', lang)
      // this.$message({
      //   message: i18n.t('SwitchLanguage'),
      //   center: true,
      //   type: 'success'
      // })
      document.title = i18n.t('Title')
    }
  }
}
</script>
