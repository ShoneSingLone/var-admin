import setDefaultVueAntdvJS from "../../../js/vue-antdv.mjs";
import VueRouter from "vue-router";
import {
    mapActions
} from "vuex";

const {
    _
} = window;

const {
    $loadCSS,
    $resolvePath,
    $lazyLoadComponent,
    $md5: md5,
    merge
} = _;

(async () => {
    try {
        const Vue = await setDefaultVueAntdvJS();
        $loadCSS($resolvePath("static/css/css.css"))
            .catch(function (error) {
                // document.adoptedStyleSheets = [...document.adoptedStyleSheets, styleSheet]; // now your css is available to be used.
                console.error(error);
            });
        
        new Vue({
            el: "#app",
            components: {
                TwoStepCaptcha: $lazyLoadComponent($resolvePath("static/module/user/login/TwoStepCaptcha.vue"))
            },
            data() {
                return {
                    customActiveKey: "tab1",
                    loginBtn: false,
                    // login type: 0 email, 1 username, 2 telephone
                    loginType: 0,
                    isLoginError: false,
                    requiredTwoStepCaptcha: false,
                    stepCaptchaVisible: false,
                    form: this.$form.createForm(this),
                    state: {
                        time: 60,
                        loginBtn: false,
                        // login type: 0 email, 1 username, 2 telephone
                        loginType: 0,
                        smsSendBtn: false
                    }
                };
            },
            created() {
                this.requiredTwoStepCaptcha = true;
            },
            methods: {
                ...mapActions(["Login", "Logout"]),
                addLess() {
                    const styleEle = merge(document.createElement("link"), {
                        id: "style-style2",
                    });
                    document.head.appendChild(styleEle);
                    styleEle.href = $resolvePath("static/css/styles2.less");
                },
                // handler
                handleUsernameOrEmail(rule, value, callback) {
                    const {
                        state
                    } = this;
                    const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
                    if (regex.test(value)) {
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
                    debugger;
                    e.preventDefault();
                    const {
                        form: {
                            validateFields
                        },
                        state,
                        customActiveKey,
                        Login
                    } = this;

                    state.loginBtn = true;

                    const validateFieldsKey = customActiveKey === "tab1" ? ["username", "password"] : ["mobile", "captcha"];

                    validateFields(validateFieldsKey, {
                        force: true
                    }, (err, values) => {
                        if (!err) {
                            console.log("login form", values);
                            const loginParams = {
                                ...values
                            };
                            delete loginParams.username;
                            loginParams[!state.loginType ? "email" : "username"] = values.username;
                            loginParams.password = md5(values.password);
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
                },
                getCaptcha(e) {
                    e.preventDefault();
                    const {
                        form: {
                            validateFields
                        },
                        state
                    } = this;

                    validateFields(["mobile"], {
                        force: true
                    }, (err, values) => {
                        if (!err) {
                            state.smsSendBtn = true;

                            const interval = window.setInterval(() => {
                                if (state.time-- <= 0) {
                                    state.time = 60;
                                    state.smsSendBtn = false;
                                    window.clearInterval(interval);
                                }
                            }, 1000);

                            const hide = this.$message.loading("验证码发送中..", 0);
                            setTimeout(hide, 2500);
                            this.$notification["success"]({
                                message: "提示",
                                description: "验证码获取成功，您的验证码为：666",
                                duration: 8
                            });
                        }
                    });
                },
                stepCaptchaSuccess() {
                    this.loginSuccess();
                },
                stepCaptchaCancel() {
                    this.Logout().then(() => {
                        this.loginBtn = false;
                        this.stepCaptchaVisible = false;
                    });
                },
                loginSuccess(res) {
                    console.log(res);
                    // check res.homePage define, set $router.push name res.homePage
                    // Why not enter onComplete
                    this.$router.push({
                        name: "analysis"
                    }, () => {
                        console.log("onComplete");
                        this.$notification.success({
                            message: "欢迎",
                            description: `${timeFix()}，欢迎回来`
                        });
                    });

                    this.$router.push({
                        path: "/"
                    });
                    // 延迟 1 秒显示欢迎信息
                    setTimeout(() => {
                        this.$notification.success({
                            message: "欢迎",
                            description: `${timeFix()}，欢迎回来`
                        });
                    }, 1000);
                    this.isLoginError = false;
                },
                requestFailed(err) {
                    this.isLoginError = true;
                    this.$notification["error"]({
                        message: "错误",
                        description: ((err.response || {}).data || {}).message || "请求出现错误，请稍后再试",
                        duration: 4
                    });
                }
            }
        });

    } catch (error) {
        console.error(error);
    }
})();