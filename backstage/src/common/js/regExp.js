// 验证空
function checkEmpty(obj) {
    var isok = true;
    for (var i in obj) {
        if (obj[i] == '') {
            isok = false;
            break;
        }
    }
    return isok;
}
// 验证手机号
function checkTel(tel) {
    var re = /^1[3456789]\d{9}$/
    return re.test(tel)
}
// 验证邮箱
function checkEmail(email) {
    var re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
    return re.test(email)
}
// 验证身份证号
function checkId(id) {
    // var re=/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
    var re = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
    return re.test(id)
}
export default {
    checkEmpty,
    checkTel,
    checkEmail,
    checkId
}
// checkUser("jihua_cnblogs");//调用