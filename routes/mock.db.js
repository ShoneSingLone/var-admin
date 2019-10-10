const loadStatu = {
    "code": 0,
    "msg": "success",
    "data": {
        "id": "1",
        "name": "SYS_DICT",
        "quantity": "4",
        "status": "20190815095633",
        "remarks": "查询码表是否有更新或者新增"
    }
}


const loadDict = {
    "code": 0,
    "msg": "success",
    "data": {
        "total": 4,
        "list": [{
                "id": "1067246875800000069",
                "pid": "0",
                "dictType": "gender",
                "dictName": "性别",
                "dictValue": null,
                "remark": null,
                "sort": 0,
                "createDate": "2019-08-15 16:34:10",
                "updateDate": "2019-08-15 16:34:10"
            },
            {
                "id": "1067246875800000070",
                "pid": "1067246875800000069",
                "dictType": "gender",
                "dictName": "男",
                "dictValue": "0",
                "remark": null,
                "sort": 0,
                "createDate": "2019-08-15 16:34:10",
                "updateDate": "2019-08-15 16:34:10"
            },
            {
                "id": "1067246875800000071",
                "pid": "1067246875800000069",
                "dictType": "gender",
                "dictName": "女",
                "dictValue": "1",
                "remark": null,
                "sort": 1,
                "createDate": "2019-08-15 16:34:10",
                "updateDate": "2019-08-15 16:34:10"
            },
            {
                "id": "1067246875800000072",
                "pid": "1067246875800000069",
                "dictType": "gender",
                "dictName": "保密",
                "dictValue": "2",
                "remark": null,
                "sort": 2,
                "createDate": "2019-08-15 16:34:10",
                "updateDate": "2019-08-15 16:34:10"
            }
        ]
    }
};


const loadStatuArea = [];

module.exports = {
    loadStatuArea,
    loadStatu,
    loadDict
}