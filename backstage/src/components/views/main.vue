<template>
 <div class="wrapper">
     <v-left class="left"></v-left>
     <v-right class="right"></v-right>
 </div>
</template>

<script type="text/ecmascript-6">
import vLeft from './left'
import vRight from './right'
export default {
 components: {
     vLeft,
     vRight
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
.wrapper
    display flex
    .left   
        min-width 150px
        background $color02
    .right 
        flex 1
</style>
