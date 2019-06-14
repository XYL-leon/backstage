<template>
  <div class="wrapper">
    <p class="title">通知列表页</p>
    <el-row>
      <el-button @click="create(0)" type="success">新建</el-button>
    </el-row>
    <!-- 分割线 -->
    <el-table
      :data="tableData.filter(data => !search || data.tit.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      <!-- 数据 -->
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column label="题目" prop="tit"></el-table-column>
      <!-- <el-table-column label="注册时间" prop="time"></el-table-column> -->
      <el-table-column label="时间">
        <template slot-scope="scope">
          <span>{{scope.row.time.substr(0,10)}}</span>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="搜索题目"/>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="create(scope.row.id)">查看</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)"
            v-if="isAdmin!='2'"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
      tableData: [],
      search: "",
      isAdmin: ""
    };
  },
  watch: {},
  computed: {},
  methods: {
    // 新建：
    create(id) {
      this.$router.push("/home/inform/create/" + id);
    },
    handleDelete(id) {
      this.$http({
        url: API.delNews,
        params: {
          id: id
        }
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
          this.init();
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
        url: API.findNews
      }).then(d => {
        console.log(d);
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
    this.isAdmin = localStorage.getItem("isAdmin");
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
}
</style>
