<template>
  <div class="wrapper">
    <!--  -->
    <img class="img" :src="img" alt>
    <!--  -->
    <!-- 分割线 -->

    <div class="form_wrap">
      <el-form ref="user" :model="user" label-width="80px">
        <!-- 选择 -->
        <el-form-item label="选择" v-model="user.type">
          <el-select v-model="user.type" placeholder="请选择账户">
            <el-option
              v-for="(item,index) in juese"
              :key="index"
              :label="item.name"
              :value="item.value"
            ></el-option>
            <!-- <el-option label="超级管理员" value="super"></el-option>
            <el-option label="普通管理员" value="putong"></el-option>
            <el-option label="用户" value="yonghu"></el-option>-->
          </el-select>
        </el-form-item>
        <!-- 账号 -->
        <el-form-item class="color" label="账号">
          <el-input v-model="user.name" placeholder="请输入账号"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码">
          <el-input type='password' v-model="user.pass" placeholder="请输入密码"></el-input>
        </el-form-item>
        <!-- 登录 -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即登录</el-button>
          <el-button @click="resetForm('user')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 分割线 -->
  </div>
</template>

<script type="text/ecmascript-6">
import API from "../../common/js/API";
export default {
  components: {},
  props: {},
  data() {
    return {
      // img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1560432517884&di=b50b1d49359366634151edfebd4870bc&imgtype=0&src=http%3A%2F%2Fimg8.zol.com.cn%2Fbbs%2Fupload%2F22744%2F22743061.gif',
      img:
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1560407494027&di=7b3c8a2aca680bffa950dcac41916fea&imgtype=0&src=http%3A%2F%2Fww1.sinaimg.cn%2Flarge%2F85cccab3gw1etdwrdil9rg20ex08a1kz.jpg",
      user: {
        name: "",
        pass: "",
        type: ""
      },
      juese: [
        {
          name: "超级管理员",
          value: "0"
        },
        {
          name: "普通管理员",
          value: "1"
        },
        {
          name: "用户",
          value: "2"
        }
      ]
    };
  },
  watch: {},
  computed: {},
  methods: {
    onSubmit() {
      var data = this.user;
      if (data.pass == "") {
        swal("密码不能为空");
        return;
      }
      this.$http({
        url: API.login,
        method: "post",
        data: data
      }).then(d => {
        // console.log(d);
        if (d.data.isok) {
          swal(d.data.info);
          localStorage.setItem("username", this.user.name);
          localStorage.setItem("isAdmin", d.data.isAdmin);
          this.$router.replace("/home");
        } else {
          this.$message({
            message: d.data.info,
            type: "warning"
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  mounted() {}
};
</script>
<style lang='stylus' scoped>
.img {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: -1;
}

.wrapper {
  width: 100%;
  height: 100%;
  position: fixed;

  .form_wrap {
    padding: 10px 20px;
    min-width: 370px;
    min-height: 230px;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 5px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.4);
  }
}

.wrapper >>> .el-form-item__label {
  color: white;
}

.wrapper >>> .el-input__inner {
  background: rgba(255, 255, 255, 0.3);
  color: white;
}
</style>
