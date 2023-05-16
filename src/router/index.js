import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/checkstatusquery'
  },
  {
    path: '/checkstatusquery',
    name: 'CheckStatus',
    component: () => import('../views/CheckStatus.vue')
  },
  {
    path: '/certificatesecurityquery',
    name: 'certificatesecurity',
    component: () => import('../views/CertificateSecurity.vue')
  },
  {
    path: '/servicecapabilityquery',
    name: 'servicecapability',
    component: () => import('../views/ServiceCapability.vue')
  },
  {
    path: '/chargingstandardsquery',
    name: 'chargingstandards',
    component: () => import('../views/ChargingStandards.vue')
  },
  {
    path: '/pauseprojquery',
    name: 'pauseprojquery',
    component: () => import('../views/PauseProj.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
