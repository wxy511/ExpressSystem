<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <modify-info
      ref="modifyinfo"
      class="modify-info"
      @edituserinfo="ModifyUserInfo"
    />
    <div class="right-menu">
      <template v-if="ShowLanguage">
        <language-select class="right-menu-item hover-effect" />
      </template>
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="user-name">
          {{ name }}
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <!-- <router-link to="/">
            <el-dropdown-item>
              {{ $t('Home') }}
            </el-dropdown-item>
          </router-link> -->
          <el-dropdown-item @click.native="Modify">
            <span style="display:block;">{{ $t('Modify') }}</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">{{ $t('LogOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div v-if="(WaitApproveCount!=0) && ShowApprove " style="float:right;padding-top:14px;margin-right:15px;">
      <el-badge is-dot :value="WaitApproveCount" style="margin-top:-3px">
        <el-tooltip style="margin-top:3px" :open-delay="800" class="item" effect="dark" :content="$t('Approve.Tip')" placement="top-start">
          <svg-icon style="color: rgb(90,94,102);" icon-class="waitapprove" @click="JumpRoute" />   
        </el-tooltip>
      </el-badge>
    </div>
    <!-- <div class="lanaguage-button" style="margin-right: 25px">
      <el-button type="primary" icon="el-icon-edit" circle style="margin-top: 5px" @click.native.prevent="changeLanguage" />
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import LanguageSelect from '@/components/LanguageSelect'
import ModifyInfo from '@/components/ModifyUserInfo'
import Cookies from 'js-cookie'
import store from '@/store'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    LanguageSelect,
    ModifyInfo
  },
  data() {
    return {
      WaitApproveCount: 0,
      UpdateTimer: '',
      // eslint-disable-next-line
      ShowApprove: false, // 是否展现审批
      // eslint-disable-next-line
      ShowLanguage: true, // 是否展现语言切换
      ExpiresTimer: ''
    }
  },
  //          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name',
      'language',
      'userid',
      'visitbranch',
      'hiddenProperty'
    ]),
    routesData() {
      return this.routes
    }
  },
  created() {
    this.UpdateTimer = setInterval(() => {
      this.GetAllWaitApprove()
    }, 60000)
    this.ExpiresTimer = setInterval(() => {
      this.CheckTokenEnable()
    }, 600000)
    if (this.ShowApprove) { 
      this.GetAllWaitApprove() 
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      // eslint-disable-next-line
      if (process.env.NODE_ENV === 'development') {
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      }
    },
    Modify() { // 根据id查询userinfo传到子组件
    },
    ModifyUserInfo(data) {

    },
    /**
     * 跳转到审批页面
     */
    JumpRoute() {
      this.$router.push({ path: '/history/approve' })
    },
    /**
     * 获取当前总共待审批人数
     */
    GetAllWaitApprove() {

    },
    /**
     * 检查token是否存在
     */
    async CheckTokenEnable() {
      if (this.hiddenProperty === true) { return }
      if (!Cookies.get('_V494344')) {
        clearInterval(this.UpdateTimer)
        this.UpdateTimer = ''
        clearInterval(this.ExpiresTimer)
        this.ExpiresTimer = ''
        // eslint-disable-next-line
        if (process.env.NODE_ENV === 'development') {  
          await location.reload() // 强制刷新
        } else {
          // eslint-disable-next-line
          window.location.href = '/s_logout/'
        }
        await store.dispatch('user/resetToken')
        this.$message({
          message: 'Expires Token!',
          type: 'error',
          center: true
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.lngtext
{
  font-size: 1rem;
}
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  text-align: left;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      .goUserInfo
      {
        cursor:pointer;
      }

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
