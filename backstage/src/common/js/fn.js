//未登录处理
function errCallback(obj,d){
    obj.$message({
        message:d.data.info,
        type: 'warning'
      });
    obj.$router.replace('/login')
    return;
}
export default {
    errCallback
}