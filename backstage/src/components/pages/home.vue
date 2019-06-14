<template>
 <div class="home">
     <!-- 整个页面分为上下两部分，下部分——分为左右两部分 -->
     <v-header class="header"></v-header>
     <v-main class="main"></v-main>
 </div>
</template>

<script type="text/ecmascript-6">
import vHeader from '../views/header'
import vMain from '../views/main'

export default {
 components: {
     vHeader,
     vMain
 },
 props: {},
 data () {
 return {
 };
 },
 watch: {},
 computed: {},
 methods: {},
 mounted () {}
};
</script>
<style lang='stylus' scoped>


@import '../../common/stylus/index.styl'
.home 
    height 100vh
    display flex
    flex-direction column
    .header
        height 50px
        background $color01
        border-bottom 1px solid #000
        padding 0 10px
    .main
        flex 1
</style>
