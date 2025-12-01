import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
    meta: { requiresAuth: false, layout: 'blank' }
  },
  {
    path: '/app',
    component: () => import('../components/layout/AppLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        redirect: '/app/dashboard'
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('../views/DashboardView.vue'),
        meta: { title: 'Dashboard' }
      },
      {
        path: 'project/:projectId',
        name: 'Project',
        component: () => import('../views/ProjectView.vue'),
        meta: { title: 'Project' },
        children: [
          {
            path: '',
            redirect: to => `/app/project/${to.params.projectId}/overview`
          },
          {
            path: 'overview',
            name: 'ProjectOverview',
            component: () => import('../views/project/ProjectOverview.vue'),
            meta: { title: 'Project Overview' }
          },
          {
            path: 'timeline',
            name: 'ProjectTimeline',
            component: () => import('../views/project/ProjectTimeline.vue'),
            meta: { title: 'Timeline' }
          },
          {
            path: 'chat',
            name: 'ProjectChat',
            component: () => import('../views/project/ProjectChat.vue'),
            meta: { title: 'AI Consultant' }
          },
          {
            path: 'files',
            name: 'ProjectFiles',
            component: () => import('../views/project/ProjectFiles.vue'),
            meta: { title: 'Files & Documents' }
          },
          {
            path: 'strategy',
            name: 'ProjectStrategy',
            component: () => import('../views/project/ProjectStrategy.vue'),
            meta: { title: 'Strategy' }
          }
        ]
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('../views/SettingsView.vue'),
        meta: { title: 'Settings' }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Navigation guard for auth simulation
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('pontivo_auth') === 'true'
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (to.path === '/login' && isAuthenticated) {
    next('/app/dashboard')
  } else {
    next()
  }
})

export default router
