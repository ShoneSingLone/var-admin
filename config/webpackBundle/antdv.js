/* eslint-disable */
__webpack_public_path__ = window.__webpack_public_path__;

(function () {

    // var components = [Base, Affix, Anchor, AutoComplete, Alert, Avatar, BackTop, Badge, Breadcrumb, Button, Calendar, Card, Collapse, Carousel, Cascader, Checkbox, Col, DatePicker, Divider, Dropdown, Form, Icon, Input, InputNumber, Layout, List, LocaleProvider, Menu, Modal, Pagination, Popconfirm, Popover, Progress, Radio, Rate, Row, Select, Slider, Spin, Statistic, Steps, Switch, Table, Transfer, Tree, TreeSelect, Tabs, Tag, TimePicker, Timeline, Tooltip, Upload, Drawer, Skeleton, Comment, ConfigProvider, Empty];

    Vue.component("DatePicker", () => import("ant-design-vue"));

    Vue.component(componentName, function (resolve, reject) {
        import()
            .then(function (res) {
                debugger;
                if (res && res.length === 1) return resolve(res[0]);
                throw new Error(componentName);
            })
            .catch(function (error) {
                debugger;
                reject(error);
            });
    });
    return {};
})();