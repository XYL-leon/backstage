
var baseUrl='/api'
// var baseUrl=''

var login = baseUrl+'/login'
// 添加管理员
var addManage = baseUrl+'/addManage'
// 删除管理员
var delManage = baseUrl+'/delManage'
// 查询管理员
var findManage = baseUrl+'/findManage'
// 更新管理员
var updateManage = baseUrl+'/updateManage'
// 添加用户
var addUser = baseUrl+'/addUser'
// 删除用户
var delUser = baseUrl+'/delUser'
// 查询用户
var findUser = baseUrl+'/findUser'
// 更新用户
var updateUser = baseUrl+'/updateUser'

var addNews = baseUrl+'/addNews'
var findNews = baseUrl+'/findNews'
var updateNews = baseUrl+'/updateNews'
var delNews = baseUrl+'/delNews'
// 设备
var addDevice = baseUrl+'/addDevice'
var delDevice = baseUrl+'/delDevice'
var updateDevice= baseUrl+'/updateDevice'
var findDevice = baseUrl+'/findDevice'

// 退出登录
var exit = baseUrl+'/exit'

export default{
    login,
    addManage,
    delManage,
    findManage,
    updateManage,
    addUser,
    delUser,
    findUser,
    updateUser,
    addNews,
    findNews,
    updateNews,
    delNews,
    addDevice,
    delDevice,
    updateDevice,
    findDevice,
    exit
}