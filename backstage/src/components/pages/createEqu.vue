<template>
  <div class="wrapper">
    <!-- 添加数据 表单 -->
    <div class="form_wrap">
      <p class="top_tit">添加/修改设备</p>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="ip">
          <el-input v-model="form.ip"></el-input>
        </el-form-item>
        <el-form-item label="机房">
          <el-input v-model="form.door"></el-input>
        </el-form-item>
        <el-form-item label="编号">
          <el-input v-model="form.num"></el-input>
        </el-form-item>
        <el-form-item label="宽带">
          <el-input v-model="form.width"></el-input>
        </el-form-item>

        <el-form-item label="状态" prop="status" disabled>
          <el-radio v-model="form.status" label="1">空闲</el-radio>
          <el-radio v-model="form.status" label="0">已出售</el-radio>
        </el-form-item>
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

export default {
  components: {},
  props: {},
  data() {
    return {
      id: "",
      form: {
        ip: "",
        num: "",
        width: "",
        door: "",
        status: ""
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
        url: API.updateDevice,
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
          this.$router.replace("/home/equipment");
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
      this.$router.push("/home/equipment");
    },
    // 新建
    onSubmit() {
      this.$http({
        url: API.addDevice,
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
          this.$router.replace("/home/equipment");
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
    // 检查是否是修改
    this.id = this.$route.params.id;
    if (this.id == "0") {
    } else {
      this.$http({
        url: API.findDevice,
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
