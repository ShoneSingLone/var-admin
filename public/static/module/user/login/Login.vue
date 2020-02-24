<template>
  <div class="main-form20200121180838">
    <a-form
      id="formLogin"
      ref="formLogin"
      class="user-layout-login"
      :form="form"
      @submit="handleSubmit"
    >
      <a-tabs
        :active-key="customActiveKey"
        :tab-bar-style="{ textAlign: 'center', borderBottom: 'unset' }"
        @change="handleTabClick"
      >
        <a-tab-pane
          key="tab1"
          tab="账号密码登录"
        >
          <a-alert
            v-if="isLoginError"
            type="error"
            show-icon
            style="margin-bottom: 24px;"
            message="账户或密码错误（admin/ant.design )"
          />
          <a-form-item>
            <a-input
              v-decorator="[
                'username',
                {rules: [{ required: true, message: '请输入帐户名或邮箱地址' }, { validator: handleUsernameOrEmail }], validateTrigger: 'change'}
              ]"
              size="large"
              type="text"
              placeholder="账户: admin"
            >
              <a-icon
                slot="prefix"
                type="user"
                :style="{ color: 'rgba(0,0,0,.25)' }"
              />
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-input
              v-decorator="[
                'password',
                {rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}
              ]"
              size="large"
              type="password"
              autocomplete="false"
              placeholder="密码: admin or ant.design"
            >
              <a-icon
                slot="prefix"
                type="lock"
                :style="{ color: 'rgba(0,0,0,.25)' }"
              />
            </a-input>
          </a-form-item>
        </a-tab-pane>
        <a-tab-pane
          key="tab2"
          tab="手机号登录"
        >
          <a-form-item>
            <a-input
              v-decorator="['mobile', {rules: [{ required: true, pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号' }], validateTrigger: 'change'}]"
              size="large"
              type="text"
              placeholder="手机号"
            >
              <a-icon
                slot="prefix"
                type="mobile"
                :style="{ color: 'rgba(0,0,0,.25)' }"
              />
            </a-input>
          </a-form-item>

          <a-row :gutter="16">
            <a-col
              class="gutter-row"
              :span="16"
            >
              <a-form-item>
                <a-input
                  v-decorator="['captcha', {rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}]"
                  size="large"
                  type="text"
                  placeholder="验证码"
                >
                  <a-icon
                    slot="prefix"
                    type="mail"
                    :style="{ color: 'rgba(0,0,0,.25)' }"
                  />
                </a-input>
              </a-form-item>
            </a-col>
            <a-col
              class="gutter-row"
              :span="8"
            >
              <a-button
                class="login-captche"
                tabindex="-1"
                :disabled="state.smsSendBtn"
                @click.stop.prevent="getCaptcha"
                v-text="!state.smsSendBtn && '获取验证码' || (state.time+' s')"
              />
            </a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>

      <a-form-item>
        <a-checkbox v-decorator="['rememberMe']">
          自动登录
        </a-checkbox>
        <router-link
          :to="{ name: 'recover', params: { user: 'aaa'} }"
          class="forge-password float-r"
        >
          忘记密码
        </router-link>
      </a-form-item>

      <a-form-item style="margin-top:24px">
        <a-button
          size="large"
          type="primary"
          html-type="submit"
          class="login-btn"
          :loading="state.loginBtn"
          :disabled="state.loginBtn"
        >
          确定
        </a-button>
      </a-form-item>

      <div class="user-login-other">
        <span>其他登录方式</span>
        <a>
          <a-icon
            class="item-icon"
            type="alipay-circle"
          />
        </a>
        <a>
          <a-icon
            class="item-icon"
            type="taobao-circle"
          />
        </a>
        <a>
          <a-icon
            class="item-icon"
            type="weibo-circle"
          />
        </a>
        <router-link
          class="register float-r"
          :to="{ name: 'register' }"
        >
          注册账户
        </router-link>
      </div>
    </a-form>
  </div>
</template>

<script>
const { _, Vue } = window;
import VueRouter from "vue-router";
Vue.use(VueRouter);

export default {
  TEMPLATE_PLACEHOLDER,
  router: new VueRouter({
    routes: [
      {
        name: "register",
        path: "/register",
        component: { template: "<div>foo</div>" }
      }
    ]
  }),
  data() {
    return {
      form: this.$form.createForm(this),
      customActiveKey: "tab1",
      loginBtn: false,
      isLoginError: false,
      state: {
        time: 60,
        loginBtn: false,
        // login type: 0 email, 1 username, 2 telephone
        loginType: 0,
        smsSendBtn: false
      }
    };
  },
  methods: {
    async handleUsernameOrEmail(rule, value, callback) {
      const { state } = this;
      if (_.$$regex.email.test(value)) {
        state.loginType = 0;
      } else {
        state.loginType = 1;
      }
      callback();
    },
    handleTabClick(key) {
      this.customActiveKey = key;
      // this.form.resetFields()
    },
    handleSubmit(e) {
      e.preventDefault();
      const {
        form: { validateFields },
        state,
        customActiveKey,
        Login
      } = this;

      state.loginBtn = true;

      const validateFieldsKey =
        customActiveKey === "tab1"
          ? ["username", "password"]
          : ["mobile", "captcha"];

      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          console.log("login form", values);
          const loginParams = { ...values };
          delete loginParams.username;
          loginParams[!state.loginType ? "email" : "username"] =
            values.username;
          loginParams.password = _.$md5(values.password);
          Login(loginParams)
            .then(res => this.loginSuccess(res))
            .catch(err => this.requestFailed(err))
            .finally(() => {
              state.loginBtn = false;
            });
        } else {
          setTimeout(() => {
            state.loginBtn = false;
          }, 600);
        }
      });
    }
  }
};
</script>