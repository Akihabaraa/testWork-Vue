import Vue from 'vue'
import Router from 'vue-router'
import Traffic from '@/components/Traffic'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Traffic',
      component: Traffic
    },
    {
      path: '/1',
      name: 'red',
      component: Traffic
    },
    {
      path: '/2',
      name: 'yellow',
      component: Traffic
    },
    {
      path: '/3',
      name: 'green',
      component: Traffic
    }
  ]
})
