<template>
  <div class="wrapper">
    <!-- 顶部提示信息 -->

    <!-- 添加数据 表单 -->
    <div class="form_wrap">
      <p class="top_tit">添加/修改管理员</p>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="账号">
          <el-input
            v-model="form.name"
            :disabled="id!=0"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            type="password"
            v-model="form.pass"
            :disabled="id!=0"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input type="password" v-model="confirm" :disabled="id!=0" placeholder="确认密码"></el-input>
        </el-form-item>
        <el-form-item label="属性">
          <el-input v-model="form.prop" placeholder="请输入属性"></el-input>
        </el-form-item>
        <el-form-item label="注册时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.time" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit()" v-if="id=='0'">新建</el-button>
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
        time: "",
        prop: ""
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
      ajax.ajax(this, API.updateManage, "get", this.form, d => {
        this.$message({
          message: d.data.info,
          type: "success"
        });
        this.$router.replace("/home/boss");
      });
    },
    // 返回
    back() {
      this.$router.push("/home/boss");
    },
    // 新建
    onSubmit() {
      if (!regExp.checkEmpty(this.user)) {
        this.$message({
          message: "都是必选项",
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
        ajax.ajax(this, API.addManage, "get", this.form, d => {
          this.$message({
            message: d.data.info,
            type: "success"
          });
          this.$router.push("/home/boss");
        });
      }
    }
  },
  mounted() {
    // 一进来就查询一次
    this.id = this.$route.params.id;
    if (this.id != "0") {
      ajax.ajax(this, API.findManage, "get", { id: this.id }, d => {
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
