import axios from 'axios'
const createService = EventBus => {
    // 创建 axios 实例
    const service = axios.create({
        baseURL: "/", // api base_url
        timeout: 1000 * 180 // 请求超时时间
    })
    const err = (error) => {
        if (error.response) {
            const data = error.response.data
            if (error.response.status === 403) {
                EventBus.emit("notification_error", {
                    message: 'Forbidden',
                    description: data.message
                });
            }
            if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
                EventBus.emit("notification_error", {
                    message: 'Unauthorized',
                    description: '权限认证失败'
                });
                if (token) {
                    store.dispatch('Logout').then(() => {
                        setTimeout(() => {
                            window.location.reload()
                        }, 1500)
                    })
                }
            }
        }
        return Promise.reject(error)
    }

    const requestSuccessHanlder = config => {
        return config
    };
    const responseSuccessHanlder = (response) => {
        return response.data
    };
    service.interceptors.request.use(requestSuccessHanlder, err);
    service.interceptors.response.use(responseSuccessHanlder, err);
}

export {
    createService as createHttpService
}