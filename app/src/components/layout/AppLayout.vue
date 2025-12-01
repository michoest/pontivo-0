<script setup>
import { ref, computed, watch } from 'vue'
import { RouterView, useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { useProjectsStore } from '../../stores/projects'
import Dropdown from 'primevue/dropdown'
import Avatar from 'primevue/avatar'
import Button from 'primevue/button'
import Menu from 'primevue/menu'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const projectsStore = useProjectsStore()

const userMenuRef = ref(null)
const notificationsRef = ref(null)

const userMenuItems = ref([
  { label: 'Profile', icon: 'pi pi-user', command: () => {} },
  { label: 'Settings', icon: 'pi pi-cog', command: () => router.push('/app/settings') },
  { separator: true },
  { label: 'Sign Out', icon: 'pi pi-sign-out', command: () => handleLogout() }
])

const notifications = ref([
  { id: 1, title: 'Felix completed analysis', message: 'Competitive analysis for Sweden is ready', time: '2h ago', read: false },
  { id: 2, title: 'Milestone approaching', message: 'Phase 2 deadline in 5 days', time: '1d ago', read: false },
  { id: 3, title: 'New document', message: 'Sophie created Strategic Roadmap', time: '2d ago', read: true }
])

const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)

const currentTenantName = computed(() => projectsStore.currentTenant?.name || 'Select Tenant')

const navItems = computed(() => {
  const baseItems = [
    { label: 'Dashboard', icon: 'pi pi-home', to: '/app/dashboard' }
  ]
  
  if (projectsStore.currentProjectId) {
    const projectId = projectsStore.currentProjectId
    baseItems.push(
      { label: 'Overview', icon: 'pi pi-chart-bar', to: `/app/project/${projectId}/overview` },
      { label: 'Timeline', icon: 'pi pi-calendar', to: `/app/project/${projectId}/timeline` },
      { label: 'AI Consultant', icon: 'pi pi-comments', to: `/app/project/${projectId}/chat` },
      { label: 'Files', icon: 'pi pi-folder', to: `/app/project/${projectId}/files` },
      { label: 'Strategy', icon: 'pi pi-compass', to: `/app/project/${projectId}/strategy` }
    )
  }
  
  return baseItems
})

function handleLogout() {
  authStore.logout()
  router.push('/login')
}

function toggleUserMenu(event) {
  userMenuRef.value.toggle(event)
}

function selectTenant(tenant) {
  projectsStore.setCurrentTenant(tenant.id)
  projectsStore.setCurrentProject(null)
  router.push('/app/dashboard')
}

// Watch route to set current project
watch(() => route.params.projectId, (projectId) => {
  if (projectId) {
    projectsStore.setCurrentProject(projectId)
  }
}, { immediate: true })
</script>

<template>
  <div class="app-layout">
    <!-- Sidebar -->
    <aside class="app-sidebar">
      <!-- Logo -->
      <div class="sidebar-logo">
        <div class="logo-icon">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="#2563eb"/>
            <path d="M8 16C8 11.582 11.582 8 16 8V8C20.418 8 24 11.582 24 16V24H16C11.582 24 8 20.418 8 16V16Z" fill="white" fill-opacity="0.9"/>
            <circle cx="16" cy="16" r="4" fill="#2563eb"/>
          </svg>
        </div>
        <span class="logo-text">Pontivo</span>
      </div>

      <!-- Tenant Selector -->
      <div class="sidebar-tenant">
        <Dropdown
          :options="projectsStore.tenants"
          optionLabel="name"
          :modelValue="projectsStore.currentTenant"
          @update:modelValue="selectTenant"
          placeholder="Select Tenant"
          class="tenant-dropdown"
        >
          <template #value="{ value }">
            <div class="tenant-selected" v-if="value">
              <div class="tenant-avatar">{{ value.name.charAt(0) }}</div>
              <span class="tenant-name">{{ value.name }}</span>
            </div>
            <span v-else>Select Tenant</span>
          </template>
          <template #option="{ option }">
            <div class="tenant-option">
              <div class="tenant-avatar">{{ option.name.charAt(0) }}</div>
              <div class="tenant-info">
                <div class="tenant-name">{{ option.name }}</div>
                <div class="tenant-industry">{{ option.industry }}</div>
              </div>
            </div>
          </template>
        </Dropdown>
      </div>

      <!-- Navigation -->
      <nav class="sidebar-nav">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="nav-item"
          :class="{ 'active': route.path === item.to }"
        >
          <i :class="item.icon"></i>
          <span>{{ item.label }}</span>
        </RouterLink>
      </nav>

      <!-- Projects List -->
      <div class="sidebar-projects" v-if="!projectsStore.currentProjectId">
        <div class="projects-header">
          <span>Projects</span>
        </div>
        <div class="projects-list">
          <RouterLink
            v-for="project in projectsStore.tenantProjects"
            :key="project.id"
            :to="`/app/project/${project.id}/overview`"
            class="project-item"
          >
            <div class="project-health" :style="{ '--health': project.health + '%' }">
              <span>{{ project.health }}</span>
            </div>
            <div class="project-info">
              <div class="project-name">{{ project.name }}</div>
              <div class="project-status">{{ project.status }}</div>
            </div>
          </RouterLink>
        </div>
      </div>

      <!-- Current Project Info -->
      <div class="sidebar-current-project" v-else>
        <div class="current-project-header">Current Project</div>
        <div class="current-project-card">
          <div class="project-health-ring" :style="{ '--health': projectsStore.currentProject?.health + '%' }">
            <span>{{ projectsStore.currentProject?.health }}%</span>
          </div>
          <div class="current-project-info">
            <div class="current-project-name">{{ projectsStore.currentProject?.name }}</div>
            <div class="current-project-status badge badge-success">{{ projectsStore.currentProject?.status }}</div>
          </div>
        </div>
        <Button 
          label="Back to Dashboard" 
          icon="pi pi-arrow-left" 
          text 
          size="small"
          @click="router.push('/app/dashboard')"
          class="back-button"
        />
      </div>

      <!-- User Section -->
      <div class="sidebar-user">
        <div class="user-card" @click="toggleUserMenu">
          <Avatar 
            :label="authStore.user?.name?.charAt(0) || 'U'" 
            shape="circle"
            class="user-avatar"
          />
          <div class="user-info">
            <div class="user-name">{{ authStore.user?.name }}</div>
            <div class="user-role">{{ authStore.user?.role }}</div>
          </div>
          <i class="pi pi-chevron-up"></i>
        </div>
        <Menu ref="userMenuRef" :model="userMenuItems" :popup="true" />
      </div>
    </aside>

    <!-- Main Content -->
    <main class="app-main">
      <!-- Header -->
      <header class="app-header">
        <div class="header-breadcrumb">
          <span class="breadcrumb-item">{{ currentTenantName }}</span>
          <i class="pi pi-chevron-right breadcrumb-separator" v-if="projectsStore.currentProject"></i>
          <span class="breadcrumb-item" v-if="projectsStore.currentProject">
            {{ projectsStore.currentProject.name }}
          </span>
        </div>
        
        <div class="header-actions">
          <!-- Notifications -->
          <div class="notifications-wrapper">
            <Button 
              icon="pi pi-bell" 
              text 
              rounded
              :badge="unreadCount > 0 ? String(unreadCount) : null"
              badgeSeverity="danger"
              @click="(e) => notificationsRef.toggle(e)"
            />
            <Menu ref="notificationsRef" :popup="true" class="notifications-menu">
              <template #start>
                <div class="notifications-header">
                  <span>Notifications</span>
                  <Button label="Mark all read" text size="small" />
                </div>
              </template>
              <template #item="{ item }">
                <div class="notification-item" :class="{ unread: !item.read }">
                  <div class="notification-dot" v-if="!item.read"></div>
                  <div class="notification-content">
                    <div class="notification-title">{{ item.title }}</div>
                    <div class="notification-message">{{ item.message }}</div>
                    <div class="notification-time">{{ item.time }}</div>
                  </div>
                </div>
              </template>
            </Menu>
          </div>

          <!-- Help -->
          <Button icon="pi pi-question-circle" text rounded />
        </div>
      </header>

      <!-- Page Content -->
      <div class="app-content">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<style scoped>
/* Sidebar Logo */
.sidebar-logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--color-border-light);
}

.logo-icon {
  display: flex;
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text-primary);
  letter-spacing: -0.02em;
}

/* Tenant Selector */
.sidebar-tenant {
  padding: var(--spacing-md) var(--spacing-lg);
  border-bottom: 1px solid var(--color-border-light);
}

.tenant-dropdown {
  width: 100%;
}

.tenant-dropdown :deep(.p-dropdown) {
  width: 100%;
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
}

.tenant-selected, .tenant-option {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.tenant-avatar {
  width: 28px;
  height: 28px;
  border-radius: var(--radius-md);
  background: var(--color-brand-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.8125rem;
}

.tenant-name {
  font-weight: 500;
  color: var(--color-text-primary);
}

.tenant-industry {
  font-size: 0.75rem;
  color: var(--color-text-tertiary);
}

/* Navigation */
.sidebar-nav {
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.nav-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  color: var(--color-text-secondary);
  font-weight: 500;
  font-size: 0.9375rem;
  transition: all var(--transition-fast);
  text-decoration: none;
}

.nav-item:hover {
  background: var(--color-bg-secondary);
  color: var(--color-text-primary);
}

.nav-item.active {
  background: var(--color-brand-primary-light);
  color: var(--color-brand-primary);
}

.nav-item i {
  font-size: 1.125rem;
  width: 20px;
  text-align: center;
}

/* Projects List */
.sidebar-projects {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--color-border-light);
  margin-top: var(--spacing-md);
}

.projects-header {
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.projects-list {
  flex: 1;
  overflow-y: auto;
  padding: 0 var(--spacing-md);
}

.project-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-xs);
  cursor: pointer;
  transition: all var(--transition-fast);
  text-decoration: none;
}

.project-item:hover {
  background: var(--color-bg-secondary);
}

.project-health {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  background: conic-gradient(var(--color-success) var(--health), var(--color-bg-tertiary) var(--health));
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.project-health::before {
  content: '';
  position: absolute;
  inset: 4px;
  background: white;
  border-radius: var(--radius-sm);
}

.project-health span {
  position: relative;
  font-size: 0.6875rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.project-info {
  flex: 1;
  min-width: 0;
}

.project-name {
  font-weight: 500;
  font-size: 0.875rem;
  color: var(--color-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.project-status {
  font-size: 0.75rem;
  color: var(--color-text-tertiary);
  text-transform: capitalize;
}

/* Current Project */
.sidebar-current-project {
  flex: 1;
  border-top: 1px solid var(--color-border-light);
  margin-top: var(--spacing-md);
  padding: var(--spacing-md) var(--spacing-lg);
}

.current-project-header {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--spacing-md);
}

.current-project-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background: var(--color-bg-secondary);
  border-radius: var(--radius-md);
}

.project-health-ring {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: conic-gradient(var(--color-success) var(--health), var(--color-bg-tertiary) var(--health));
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.project-health-ring::before {
  content: '';
  position: absolute;
  inset: 5px;
  background: var(--color-bg-secondary);
  border-radius: 50%;
}

.project-health-ring span {
  position: relative;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-text-primary);
}

.current-project-name {
  font-weight: 600;
  font-size: 0.9375rem;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-xs);
}

.back-button {
  margin-top: var(--spacing-md);
  width: 100%;
  justify-content: flex-start;
}

/* User Section */
.sidebar-user {
  padding: var(--spacing-md) var(--spacing-lg);
  border-top: 1px solid var(--color-border-light);
  margin-top: auto;
}

.user-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-sm);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background var(--transition-fast);
}

.user-card:hover {
  background: var(--color-bg-secondary);
}

.user-avatar {
  background: var(--color-brand-primary);
  color: white;
}

.user-info {
  flex: 1;
}

.user-name {
  font-weight: 500;
  font-size: 0.875rem;
  color: var(--color-text-primary);
}

.user-role {
  font-size: 0.75rem;
  color: var(--color-text-tertiary);
  text-transform: capitalize;
}

.user-card i {
  color: var(--color-text-tertiary);
  font-size: 0.75rem;
}

/* Header */
.header-breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.breadcrumb-item {
  font-weight: 500;
  color: var(--color-text-secondary);
}

.breadcrumb-separator {
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-left: auto;
}

/* Notifications */
.notifications-menu {
  width: 320px;
}

.notifications-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--color-border-light);
  font-weight: 600;
}

.notification-item {
  display: flex;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  cursor: pointer;
  transition: background var(--transition-fast);
}

.notification-item:hover {
  background: var(--color-bg-secondary);
}

.notification-item.unread {
  background: var(--color-brand-primary-light);
}

.notification-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-brand-primary);
  flex-shrink: 0;
  margin-top: 6px;
}

.notification-content {
  flex: 1;
}

.notification-title {
  font-weight: 500;
  font-size: 0.875rem;
  color: var(--color-text-primary);
}

.notification-message {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
  margin-top: 2px;
}

.notification-time {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  margin-top: var(--spacing-xs);
}
</style>
