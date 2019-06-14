<template>
  <div class="wrapper">
    <div class="header_right">
      <div class="top_left">
        <img src="http://img.18183.com/uploads/allimg/180906/235-1PZ6102536.jpg" alt>
      </div>
      <div class="top_right">
        <p>欢迎：{{username}}</p>
      </div>
      <el-button size="mini" type="primary" @click="out()">退出登录</el-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import API from "../../common/js/API";
export default {
  components: {},
  props: {},
  data() {
    return {
      username: ""
    };
  },
  watch: {},
  computed: {},
  methods: {
    out() {
      this.$http({
        url: API.exit
      }).then(d => {
        this.$message({
          message: d.data.info,
          type: "success"
        });
        this.$router.replace("/login");
      });
    }
  },
  mounted() {
    this.username = localStorage.getItem("username");
  }
};
</script>
<style lang='stylus' scoped>
@import '../../common/stylus/index.styl';

.img {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: -1;
  background-size: 100%;
}

.header_right {
  line-height: 50px;
  float: right;
  color: white;

  .top_left {
    float: left;
    margin-right: 10px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 1px 3px 1px $color04;

    img {
      width: 48px;
      heihgt: 48px;
    }
  }

  .top_right {
    float: right;
    padding: 0 10px 0;

    &:hover {
      background: $color04;
      cursor: pointer;
    }
  }
}
</style>
