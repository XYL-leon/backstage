<template>
  <div class="wrapper">
    <!-- 顶部提示信息 -->

    <!-- 添加数据 表单 -->
    <div class="form_wrap">
      <p class="top_tit">通知列表页</p>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="题目">
          <el-input v-model="form.tit" :disabled="isAdmin=='2'"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="con">
          <el-input type="textarea" v-model="form.con" :disabled="isAdmin=='2'"></el-input>
        </el-form-item>

        <el-form-item label="时间">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.time"
              style="width: 100%;"
              :disabled="isAdmin=='2'"
            ></el-date-picker>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit()" v-if="id=='0'">发布</el-button>
          <el-button type="primary" @click="xiugai()" v-if="id!='0'" :disabled="isAdmin=='2'">修改</el-button>
          <el-button @click="back()">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 结束 -->
  </div>
</template>

<script type="text/ecmascript-6">
import API from "../../common/js/API";

export default {
  components: {},
  props: {},
  data() {
    return {
      id: "",
      isAdmin: "",
      form: {
        tit: "",
        con: "",
        time: ""
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    // 修改
    xiugai() {
      delete this.form._id;
      this.$http({
        url: API.updateNews,
        params: this.form
      }).then(d => {
        // console.log(d)
        if (d.data.code == -1) {
          // 报错
          fn.errCallback(this, d);
          this.$router.replace("/login");
          return;
        }
        if (d.data.isok) {
          this.$message({
            message: d.data.info,
            type: "success"
          });
          this.$router.replace("/home/inform");
        } else {
          this.$message({
            message: d.data.info,
            type: "warning"
          });
        }
      });
    },
    // 返回
    back() {
      this.$router.push("/home/user");
    },
    // 新建
    onSubmit() {
      this.$http({
        url: API.addNews,
        params: this.form
      }).then(d => {
        if (d.data.code == -1) {
          // 报错
          fn.errCallback(this, d);
          this.$router.replace("/login");
          return;
        }
        if (d.data.isok) {
          this.$message({
            message: d.data.info,
            type: "success"
          });
          this.$router.replace("/home/inform");
        } else {
          this.$message({
            message: d.data.info,
            type: "warning"
          });
        }
      });
    }
  },
  mounted() {
    this.isAdmin = localStorage.getItem("isAdmin");
    this.id = this.$route.params.id;
    if (this.id == "0") {
      //新建
    } else {
      //修改
      this.$http({
        url: API.findNews,
        params: {
          id: this.id
        }
      }).then(d => {
        this.form = d.data.data[0];
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
