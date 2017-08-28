window.accesstoken = "hoak";

// window.server = "http://madhaus.hoak.mobi";
// window.server = "http://192.168.0.110:8000";
window.server = "http://192.168.0.199:8000";
//
//----------------------------------------黄金分割线--------------------------------------------//
//console 日志打印记录
function log(obj, line) {
    var start = "\r\n------------------Start------------------\r\n";
    var end = "\r\n-------------------End-------------------\r\n";
    if (line) {
        console.log(start + JSON.stringify(obj, null, 4) + end)
    } else {
        console.log(start + JSON.stringify(obj) + end)
    }
};
//刷新加载
function loadDatas(loadCallback) {
    api.setCustomRefreshHeaderInfo({
        bgColor: '#f4f5f9',
        loadAnimInterval : 71,
        isScale: true,
        image: {
            // pull: 'widget://image/refresh/pulling.png',
            pull: [
                'widget://image/refresh/transform/t07.png',
                'widget://image/refresh/transform/t06.png',
                'widget://image/refresh/transform/t05.png',
                'widget://image/refresh/transform/t04.png',
                'widget://image/refresh/transform/t03.png',
                'widget://image/refresh/transform/t02.png',
                'widget://image/refresh/transform/t01.png',
                'widget://image/refresh/transform/t00.png'
            ],
            load: [
                'widget://image/refresh/load/l00.png',
                'widget://image/refresh/load/l01.png',
                'widget://image/refresh/load/l02.png',
                'widget://image/refresh/load/l03.png',
                'widget://image/refresh/load/l04.png',
                'widget://image/refresh/load/l05.png',
                'widget://image/refresh/load/l06.png',
                'widget://image/refresh/load/l07.png',
                'widget://image/refresh/load/l08.png',
                'widget://image/refresh/load/l09.png',
                'widget://image/refresh/load/l10.png',
                'widget://image/refresh/load/l11.png',
                'widget://image/refresh/load/l12.png',
                'widget://image/refresh/load/l13.png',
                'widget://image/refresh/load/l14.png'
            ]
        }
    }, function(ret, err) {
        loadCallback();
    });
};
//网络请求
function ajax(url, method, data, retCallback, loadCallback) {
    api.ajax({
        url: window.server + "/logic" + url,
        method: method,
        data: {
            values: data
        },
        headers: {
            "X-CSRFToken": $api.getStorage('userInfo').token
        }
    }, function(ret, err) {
        loadCallback(ret, err);
        if (ret) {
            if (ret.success) {
                retCallback(ret);
            } else {
                api.toast({
                    msg: ret.msg,
                    duration: 2000,
                    location: 'middle'
                });
            }
        } else {
            api.toast({
                msg: '错误码:' + err.code + ";网络状态码:" + err.statusCode,
                duration: 2000,
                location: 'middle'
            });
        }
    });
};

//一般性网络请求
function http(url, method, data, retCallback, loadCallback) {
    api.ajax({
        url: window.server + "/logic" + url,
        method: method,
        data: {
            values: data
        }
    }, function(ret, err) {
        loadCallback(ret, err);
        if (ret) {
            if (ret.success) {
                retCallback(ret);
            } else {
                api.toast({
                    msg: ret.msg,
                    duration: 2000,
                    location: 'middle'
                });
            }
        } else {
            api.toast({
                msg: '错误码:' + err.code + ";网络状态码:" + err.statusCode,
                duration: 3000,
                location: 'middle'
            });
        }
    });
};

function ajaxs(url, method, data, headers, retCallback, loadCallback) {
    var o = {};
    o.url = window.server + url;
    o.method = method;
    o.data = {
        values: data
    };
    if (headers === true) {
        o.headers = {
            "X-CSRFToken": $api.getStorage('userInfo').token
        };
    };
    api.ajax(o, function(ret, err) {
        loadCallback(ret, err);
        if (ret) {
            retCallback(ret);
        } else {
            // api.toast({
            //     msg: '错误码:' + err.code + ";网络状态码:" + err.statusCode,
            //     duration: 3000,
            //     location: 'middle'
            // });
        }
    });
};
