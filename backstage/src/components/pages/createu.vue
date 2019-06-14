<template>
  <div class="wrapper">
    <!-- 添加数据 表单 -->
    <div class="form_wrap">
      <p class="top_tit">添加/修改用户</p>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="账号">
          <el-input
            v-model="form.name"
            :disabled="id!='0'"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            type='password'
            v-model="form.pass"
            :disabled="id!='0'"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" v-if="id=='0'">
          <el-input type='password' v-model="confirm" placeholder="请确认密码" :disabled="id!='0'"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.tel" placeholder="请输入正确的手机号" :disabled="id!='0'"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" placeholder="请输入正确的邮箱地址" :disabled="id!='0'"></el-input>
        </el-form-item>
        <!--  -->
        <el-form-item label="性别">
          <el-radio v-model="form.sex" :disabled="id!='0'" label="男">男</el-radio>
          <el-radio v-model="form.sex" :disabled="id!='0'" label="女">女</el-radio>
        </el-form-item>
        <!--  -->
        <el-form-item label="身份证号">
          <el-input v-model="form.idx" placeholder="请输入正确的身份证号" :disabled="id!='0'"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.des"></el-input>
        </el-form-item>
        <!--  -->
        <el-form-item label="生日">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.time" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <!--  -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit()" v-if="id=='0'">发布</el-button>
          <el-button type="primary" @click="xiugai()" v-if="id!='0'">修改</el-button>
          <el-button @click="back()">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 结束 -->
  </div>
</template>

<script type="text/ecmascript-6">
import API from "../../common/js/API";
import fn from "../../common/js/fn";
import regExp from "../../common/js/regExp";
import ajax from "../../common/js/ajax";

export default {
  components: {},
  props: {},
  data() {
    return {
      id: "",
      form: {
        name: "",
        pass: "",
        tel: "",
        email: "",
        sex: "",
        idx: "",
        des: "",
        time: ""
      },
      confirm: ""
    };
  },
  watch: {},
  computed: {},
  methods: {
    // 修改
    xiugai() {
      delete this.form._id;
      ajax.ajax(this, API.updateUser, "get", this.form, d => {
        this.$message({
          message: d.data.info,
          type: "success"
        });
        this.$router.replace("/home/user");
      });
    },
    // 返回
    back() {
      this.$router.push("/home/user");
    },
    // 新建
    onSubmit() {
      if (!regExp.checkEmpty(this.form)) {
        this.$message({
          message: "内容不能为空",
          type: "warning"
        });
        return;
      }
      if (!regExp.checkTel(this.form.tel)) {
        this.$message({
          message: "手机号错误",
          type: "warning"
        });
        return;
      }
      if (!regExp.checkEmail(this.form.email)) {
        this.$message({
          message: "错误的邮箱地址",
          type: "warning"
        });
        return;
      }
      if (!regExp.checkId(this.form.idx)) {
        this.$message({
          message: "身份证号错误",
          type: "warning"
        });
        return;
      }
      if (this.form.pass != this.confirm) {
        this.$message({
          message: "密码和确认密码不一致",
          type: "warning"
        });
      } else {
        ajax.ajax(this, API.addUser, "get", this.form, d => {
          this.$message({
            message: d.data.info,
            type: "success"
          });
          this.$router.push("/home/user");
        });
      }
    }
  },
  mounted() {
    this.id = this.$route.params.id;
    if (this.id == "0") {
      //新建
    } else {
      this.$http({
        url: API.findUser,
        params: {
          id: this.id
        }
      }).then(d => {
        this.form = d.data.data[0];
        this.confirm = this.form.pass;
      });
    }
  }
};
</script>
<style lang='stylus' scoped>
.top_tit {
  padding: 20px;
  font-size: 28px;
  color: #333;
}

.form_wrap {
  width: 95%;
  margin: 0 auto;
}
</style>
