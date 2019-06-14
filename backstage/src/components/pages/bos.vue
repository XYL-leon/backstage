<template>
  <div class="wrapper">
    <p class="title">管理员列表页</p>
    <!-- 跳新建 -->
    <el-row>
      <el-button type="success" @click="create(0)">新建</el-button>
    </el-row>
    <!-- 分割线 -->
    <!-- <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >-->
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      <!-- 数据 -->
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column label="账号" prop="name"></el-table-column>
      <el-table-column label="属性" prop="prop"></el-table-column>
      <!-- 过滤时间 -->
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
          <el-button size="mini" @click="create(scope.row.id)">查看</el-button>
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
import ajax from "../../common/js/ajax";

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
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          ajax.ajax(this, API.delManage, "get", { id: row.id }, d => {
            // console.log(d)
            this.$message({
              message: d.data.info,
              type: "success"
            });
            this.init();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
      //
    },
    init() {
      ajax.ajax(this, API.findManage, "get", {}, d => {
        // console.log(d)
        this.tableData = d.data.data;
      });
    },
    create(id) {
      this.$router.push("/home/boss/create/" + id);
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

  .el-table-column {
  }
}

.el-row {
}
</style>
