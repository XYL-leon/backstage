<template>
 <div class="left">
     <router-link to='/home/boss' active-class="select" v-if="isAdmin=='0'">管理员管理</router-link>
     <router-link to='/home/user' active-class="select"  v-if="isAdmin!='2'">用户管理</router-link>
     <router-link to='/home/inform' active-class="select">通知</router-link>
     <router-link to='/home/equipment' active-class="select">设备管理</router-link>
 </div>
</template>

<script type="text/ecmascript-6">
export default {
 components: {},
 props: {},
 data () {
 return {
     isAdmin:''
 };
 },
 watch: {},
 computed: {},
 methods: {},
 mounted () {
     this.isAdmin = localStorage.getItem('isAdmin')
 }
};
</script>
<style lang='stylus' scoped>
@import '../../common/stylus/index.styl'
.left  
    a
        display block
        color white
        text-align center
        font-size 16px
        height 40px
        line-height 40px
        margin 5px auto
        &:hover
            background $color04
            color white
    .select
        color white
        background $color04
</style>
