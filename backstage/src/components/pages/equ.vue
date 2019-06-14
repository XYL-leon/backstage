<template>
  <div class="wrapper">
    <p class="title">设备列表页</p>
    <el-row>
      <el-button @click="create(0)" type="success">新建</el-button>
    </el-row>
    <!-- 分割线 -->
    <el-table
      :data="tableData.filter(data => !search || data.ip.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      <!-- 数据 -->
      <el-table-column label="序号" prop="num"></el-table-column>
      <el-table-column label="ip" prop="ip"></el-table-column>
      <el-table-column label="机房" prop="door"></el-table-column>
      <el-table-column label="编号" prop="num"></el-table-column>
      <el-table-column label="宽带" prop="width"></el-table-column>
      <!-- 判断空闲还是已出售 -->
      <el-table-column label="使用">
        <template slot-scope="scope">
          <span>{{scope.row.status=='1'?'空闲':'已出售'}}</span>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="搜索ip"/>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="create(scope.row.id)" v-if="isAdmin!='2'">编辑</el-button>
          <el-button
            size="mini"
            type="primary"
            v-if="isAdmin=='2'"
            :disabled="scope.row.status=='0'"
            @click="buy(scope.row.id)"
          >购买</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" v-if="isAdmin!='2'">删除</el-button>
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
      isAdmin: "",
      tableData: [],
      search: ""
    };
  },
  watch: {},
  computed: {},
  methods: {
    create(id) {
      this.$router.push("/home/equipment/create/" + id);
    },
    buy(id) {
      // console.log(id);
      this.$http({
        url: API.updateDevice,
        params: {
          id: id,
          status: "0"
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
            message: "购买成功",
            type: "success"
          });
          this.init();
        } else {
          this.$message({
            message: "购买失败，请重试",
            type: "warning"
          });
        }
      });
    },
    init() {
      this.$http({
        url: API.findDevice
      }).then(d => {
        if (d.data.code == -1) {
          // 报错
          fn.errCallback(this, d);
          this.$router.replace("/login");
          return;
        }
        this.tableData = d.data.data;
      });
    },
    handleDelete(index, row) {
      // console.log(row.id);
      this.$http({
        url: API.delDevice,
        params: {
          id: row.id
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
    }
  },
  mounted() {
    this.init();
    this.isAdmin = localStorage.getItem("isAdmin");
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
