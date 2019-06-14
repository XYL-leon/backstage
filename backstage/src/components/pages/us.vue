<template>
  <div class="wrapper">
    <p class="title">设备列表页</p>
    <el-row>
      <el-button @click="create(0)" type="success">新建</el-button>
    </el-row>
    <!-- 分割线 -->
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      <!-- 数据 -->
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column label="账号" prop="name"></el-table-column>
      <el-table-column label="电话" prop="tel"></el-table-column>
      <el-table-column label="邮箱" prop="email"></el-table-column>
      <el-table-column label="性别" prop="sex"></el-table-column>
      <el-table-column label="身份证号" prop="idx"></el-table-column>
      <el-table-column label="备注" prop="des"></el-table-column>
      <!-- <el-table-column label="生日" prop="time"></el-table-column> -->
      <el-table-column label="时间">
        <template slot-scope="scope">
          <span>{{scope.row.time.substr(0,10)}}</span>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="搜索账号名"/>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="create(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分割线 -->
  </div>
</template>

<script type="text/ecmascript-6">
import API from "../../common/js/API";
import fn from "../../common/js/fn";
export default {
  components: {},
  props: {},
  data() {
    return {
      tableData: [],
      search: ""
    };
  },
  watch: {},
  computed: {},
  methods: {
    // 新建：
    create(id) {
      this.$router.push("/home/user/create/" + id);
    },
    handleDelete(index, row) {
      this.$http({
        url: `${API.delUser}?id=${row.id}`
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
          // 删除成功后再次查询数据库
          this.$http({
            url: API.findUser
          }).then(d => {
            this.tableData = d.data.data;
          });
        } else {
          this.$message({
            message: d.data.info,
            type: "warning"
          });
        }
      });
    },
    init() {
      this.$http({
        url: API.findUser
      }).then(d => {
        if (d.data.code == -1) {
          // 报错
          fn.errCallback(this, d);
          this.$router.replace("/login");
          return;
        }
        this.tableData = d.data.data;
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style lang='stylus' scoped>
.title {
  padding: 20px;
  font-size: 28px;
  color: #333;
}

.el-row {
  padding-left: 20px;
}

.wrapper {
  width: 98%;
  margin: 10px auto 0;

  // display flex
  .el-table-column {
    // flex 1
  }
}
</style>
