import axios from 'axios'
import qs from 'qs'
// 报错函数
function errCallback(obj, d) {
    obj.$message({
        message: d.data.info,
        type: 'warning'
    })
    obj.$router.replace('/login')
    return;
}
// obj 调用的对象（哪个组件）
function ajax(obj, url, method, params, callback) {
    var paramsName = 'params'
    if (method.toUpperCase() == 'POST') {
        params = qs.stringify(params)
        paramsName = 'data'
    }

    axios({
        url: url,
        method: method,
        [paramsName]: params
    }).then(d => {
        // console.log('======='+url+'=====================')
        // console.log(d)
        if (d.data.code == -1) {
            // 报错
            errCallback(obj, d)
        }
        if (d.data.isok) {
            callback(d)
        } else {
            obj.$message({
                message: d.data.info,
                type: "warning"
            });
        }
    });
}

export default {
    errCallback,
    ajax
}