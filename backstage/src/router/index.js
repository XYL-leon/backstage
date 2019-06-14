import Vue from 'vue'
import Router from 'vue-router'

import login from '../components/pages/login.vue'
import home from '../components/pages/home.vue'

import boss from '../components/views/boss.vue'
import user from '../components/views/user.vue'
import inform from '../components/views/inform.vue'
import equipment from '../components/views/equipment.vue'

import bos from '../components/pages/bos.vue'
import us from '../components/pages/us.vue'
import inf from '../components/pages/inf.vue'
import equ from '../components/pages/equ.vue'


import create from '../components/pages/create.vue'
import createu from '../components/pages/createu.vue'
import createInf from '../components/pages/createInf.vue'
import createEqu from '../components/pages/createEqu.vue'

import welCome from '../components/pages/welCome.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: login,
    },
    {
      path: '/home',
      component: home,
      children: [
        {
          path:'',
          component:welCome
        },
        {
          path: 'boss',
          component: boss,
          children: [
            {
              path: 'create/:id',
              component: create
            },
            {
              path: '',
              component: bos
            }
          ]
        },
        {
          path: 'user',
          component: user,
          children: [
            {
              path: 'create/:id',
              component: createu
            },
            {
              path: '',
              component: us
            }
          ]
        }, {
          path: 'inform',
          component: inform,
          children: [
            {
              path: 'create/:id',
              component: createInf
            },
            {
              path: '',
              component: inf
            }
          ]
        },{
          path: 'equipment',
          component: equipment,
          children: [
            {
              path: 'create/:id',
              component: createEqu
            },
            {
              path: '',
              component: equ
            }
          ]
        },
        {
          path: '',
          redirect: 'inform'
        }
      ]
    },
    {
      path:'*',
      redirect:'/login'
    }
  ]
})
