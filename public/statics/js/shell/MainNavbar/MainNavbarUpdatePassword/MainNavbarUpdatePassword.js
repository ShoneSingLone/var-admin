(function (Vue, _) {
    var COMPONENT_NAME = 'MainNavbarUpdatePassword';
    var self = null;
    /* 如果没有前置依赖 */
    Vue.addC({
        name: COMPONENT_NAME,
        data: function () {
            return {
                visible: false,
                dataForm: {
                    password: '',
                    newPassword: '',
                    comfirmPassword: ''
                }
            };
        },
        props: {
            user: {
                type: Object,
                required: true
            }
        },
        computed: {
            dataRule: function () {
                var validateComfirmPassword = function (rule, value, callback) {
                    if (self.dataForm.newPassword !== value) {
                        return callback(new Error(self.$t('updatePassword.validate.comfirmPassword')));
                    }
                    callback();
                };
                return {
                    password: [{
                        required: true,
                        message: self.$t('validate.required'),
                        trigger: 'blur'
                    }],
                    newPassword: [{
                        required: true,
                        message: self.$t('validate.required'),
                        trigger: 'blur'
                    }],
                    comfirmPassword: [{
                            required: true,
                            message: self.$t('validate.required'),
                            trigger: 'blur'
                        },
                        {
                            validator: validateComfirmPassword,
                            trigger: 'blur'
                        }
                    ]
                };
            }
        },
        beforeCreate: function () {
            self = this;
        },
        methods: {
            init: function () {
                self.visible = true;
                self.$nextTick(function () {
                    self.$refs['dataForm'].resetFields();
                });
            },
            // 表单提交
            dataFormSubmitHandle: _.debounce(function () {
                self.$refs['dataForm'].validate(function (valid) {
                    if (!valid) {
                        return false;
                    }
                    self.$http.put('/sys/user/password', self.dataForm).then(function (res) {
                        if (res.data.code !== 0) {
                            return self.$message.error(res.data.msg);
                        }
                        self.$message({
                            message: self.$t('prompt.success'),
                            type: 'success',
                            duration: 500,
                            onClose: function () {
                                self.visible = false;
                                window.location.href = 'login.html';
                            }
                        });
                    }).catch(function () {});
                });
            }, 1000, {
                'leading': true,
                'trailing': false
            })
        }
    });
})(window.Vue, window._);