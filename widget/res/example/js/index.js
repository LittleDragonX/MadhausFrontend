$(function () {
    "use strict";
    $('#content').artEditor({
        imgTar: '#imageUpload',
        limitSize: 5,   // 兆
        showServer: true,
        uploadUrl: 'http://up-z2.qiniu.com/',
        data: {
          key:'6c479c0bd08d25029523fa150cafd499',
          token:'dKKIMlqEO1z2zwVQa_jjmUkF1BmVhBiNGxZvuct3:tTDNS0LSCIJ4z4HAmSZY83kaA1I=:eyJzY29wZSI6Im90aGVyOjZjNDc5YzBiZDA4ZDI1MDI5NTIzZmExNTBjYWZkNDk5IiwiZGVhZGxpbmUiOjE1MDMzODA4OTN9'
        },
        uploadField: 'image',
        breaks: false,
        placeholader: '请输入文章正文内容',
        validHtml: ["<br/>"],
        formInputId: 'target',
        uploadSuccess: function (res) {
            return '11111111';
            // 这里是处理返回数据业务逻辑的地方
            // `res`为服务器返回`status==200`的`response`
            // 如果这里`return <path>`将会以`<img src='path'>`的形式插入到页面
            // 如果发现`res`不符合业务逻辑
            // 比如后台告诉你这张图片不对劲
            // 麻烦返回 `false`
            // 当然如果`showServer==false`
            // 无所谓咯
            // var result = JSON.parse(res)
            // if (result['code'] == '100') {
            //     return result['data']['url'];
            // } else {
            //     switch (result['code']) {
            //         case '101': {
            //             alert('图片太大之类的')
            //         }
            //     }
            // }
            //return false;
        },
        uploadError: function (status, error) {
            //这里做上传失败的操作
            //也就是http返回码非200的时候
            alert('网络异常' + status)
        }
    });
});
