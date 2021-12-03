<template>
  <div class="login-container" align="center">
    <div class="login-card">
      <div
        class="card-left"
        :style="{ backgroundImage: 'url(' + leftImg + ')' }"
      ></div>
      <div class="card-right">
        <div v-if="ShowLanguage" class="langicon-div">
          <lang-select class="right-menu-item hover-effect langicon" />
        </div>
        <div align="center" class="card-form">
          <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            class="login-form"
            auto-complete="on"
            label-position="left"
          >
            <div class="title-container">
              <div class="title">
                <h3>{{ $t("Login.Title") }}</h3>
              </div>
              <div class="login-logo logo-div">
                <!-- <img src="@/assets/basic/logo_NYU_white.png" alt="logo"> -->
                <div style="height: 40px" />
              </div>
            </div>

            <el-form-item prop="username">
              <span class="svg-container">
                <svg-icon icon-class="user" />
              </span>
              <el-input
                ref="username"
                v-model="loginForm.username"
                v-input-filter:common
                :placeholder="$t('Login.UserName')"
                name="username"
                type="text"
                tabindex="1"
                auto-complete="on"
                maxlength="32"
                @keypress.native.enter="onEnterPress"
              />
            </el-form-item>
            <el-form-item prop="pwdaes">
              <span class="svg-container">
                <svg-icon icon-class="password" />
              </span>
              <el-input
                :key="passwordType"
                ref="pwdaes"
                v-model="loginForm.pwdaes"
                v-input-filter:pwd
                :type="passwordType"
                :placeholder="$t('Login.Password')"
                name="pwdaes"
                tabindex="2"
                auto-complete="on"
                maxlength="64"
                @keyup.enter.native="handleLogin"
              />
              <span class="show-pwd" @click="showPwd">
                <svg-icon
                  :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
                />
              </span>
            </el-form-item>
            <el-button
              :loading="loading"
              type="primary"
              round
              class="loginbtn"
              @click.native.prevent="handleLogin"
              >{{ $t("Login.Login") }}</el-button
            >
            <div class="tips">
              <span>{{ loginErr }}</span>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import i18n from "@/languages";
import { mapGetters } from "vuex";
import LangSelect from "@/components/LanguageSelect";
export default {
  components: {
    LangSelect,
  },
  // name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t("EmptyTip")));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: this.name,
        pwdaes: "",
        vefcode_img: "",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        // password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
      leftImg: require("@/assets/basic/homebus_left.png"),
      loginErr: "",
      errortip: "",
      showtip: false,
      // eslint-disable-next-line
      ShowLanguage: true, // 是否展现语言切换
    };
  },
  computed: {
    ...mapGetters(["name"]),
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  mounted: function () {
    // this.changeValidImg()
  },
  // beforeMount() {
  //   store.dispatch('app/checkNavigator', navigator)
  // },
  methods: {
    onEnterPress() {
      this.handleLogin();
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.pwdaes.focus();
      });
    },
    handleLogin() {
      this.loginErr = "";
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          // 20210305 密码改为MD5
          this.loginForm.secret = this.$md5(this.loginForm.pwdaes);
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              console.log("aaa");
              this.$router.push({ path: this.redirect || "/" });
              this.loading = false;
            })
            .catch((error) => {
              const strError = error + "";
              console.log(strError);
              if (strError === "Error: 22" || strError === "Error: 21") {
                this.loginErr = i18n.t("Error.ErrorPassword");
              } else if (strError === "Error: 101") {
                this.loginErr = i18n.t("Error.VaildCodeError");
              } else if (strError === "Error: 142") {
                this.loginErr = i18n.t("Error.PwdExpired");
              }
              // this.changeValidImg()
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    },
    /**
    更改验证码图片
     */
    changeValidImg() {
      var src = "";
      if (process.env.NODE_ENV === "development") {
        src =
          process.env.VUE_APP_BASE_API +
          "/vefcode/getimg/?random=" +
          Math.random();
      } else if (process.env.NODE_ENV === "production") {
        src =
          process.env.VUE_APP_BASE_API +
          "vefcode/getimg/?random=" +
          Math.random();
      }
      document.getElementById("validimg").src = src;
    },
  },
};
</script>

<style lang="scss">
$bg: #fff;
$light_gray: #fff;
$cursor: rgb(15, 99, 73);
$spanclr: #606266;
$mainclr: rgb(15, 99, 73);
@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
.codeimg {
  line-height: 47px;
  width: 100%;
  height: 47px;
  padding: 2px 0 2px 10px;
}
.logo-div {
  margin: 30px;
}
.langicon-div {
  top: 1rem;
  right: 1rem;
  float: right;
}
.langicon {
  width: 50px;
  height: 50px;
  margin: 20px;
  color: rgb(15, 99, 73);
  font-size: 2rem;
}
/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $spanclr;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    //border: 1px solid rgba(255, 255, 255, 0.1);
    // background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    border: 1px solid #c4cbdc;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$bkclr: #f4f5f9;
$spanclr: #606266;
$mainclr: rgb(15, 99, 73);
.login-container {
  margin: 0 auto;
  width: 100%;
  height: 100%;
  background-color: $bkclr;
  overflow: hidden;
  .login-card {
    @media screen and (max-width: 575px) {
    }
    @media screen and (min-width: 576px) {
      margin-top: 10rem;
    }
    @media screen and (max-height: 900px) {
      margin-top: 0;
    }
    position: relative;
    box-sizing: border-box;
    display: table;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    background-color: #fff;
    color: $spanclr;
    -webkit-transition: 0.3s;
    transition: 0.3s;
    box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.2);
    width: 100%;
    max-width: 1000px;
    position: relative;
    .card-left {
      background-color: rgba(255, 255, 255, 1);
      background-size: 100% 100%;
      height: 100%;
      width: 50%;
      float: left;
      position: relative;
      opacity: 0.9;
      // width: calc(100% - 250px);
      min-height: 650px;
      @media screen and (max-width: 575px) {
        display: none;
      }
      .title {
        background-color: rgba(255, 255, 255, 0.7);
        top: 0;
        padding: 40px;
        span {
          color: rgba(15, 99, 73.9);
          padding: 30px;
          font-size: 2rem;
          font-weight: bold;
        }
      }
    }
    .card-right {
      background-color: white;
      width: 50%;
      float: left;
      @media screen and (max-width: 575px) {
        width: 100%;
      }
      .card-form {
        width: 80%;
        @media screen and (max-width: 575px) {
          width: 100%;
        }
      }
      .loginbtn {
        width: 100%;
        margin-bottom: 10px;
        font-size: 1.2rem;
        margin-top: 20px;
      }
    }
  }
  .login-form {
    // position: relative;
    // width: 520px;
    width: 100%;
    padding: 0 30px 30px 30px;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 1rem;
    color: red;
    margin-top: 5px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $mainclr;
      // margin-top: 20px;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>

<style lang="scss" scoped>
/* something not from the original code */
.login-logo {
  text-align: center;
  svg {
    width: 100%;
    height: auto;
  }
  img {
    width: 60%;
    max-width: 300px;
    margin-bottom: 2rem;
  }
}
</style>
