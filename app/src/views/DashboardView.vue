<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useProjectsStore } from '../stores/projects'
import Card from 'primevue/card'
import Button from 'primevue/button'
import ProgressBar from 'primevue/progressbar'

const router = useRouter()
const authStore = useAuthStore()
const projectsStore = useProjectsStore()

const greeting = computed(() => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
})

const summaryStats = computed(() => {
  const projects = projectsStore.tenantProjects
  return {
    totalProjects: projects.length,
    activeProjects: projects.filter(p => p.status === 'active').length,
    avgHealth: Math.round(projects.reduce((acc, p) => acc + p.health, 0) / projects.length) || 0,
    upcomingMilestones: 3
  }
})

function navigateToProject(projectId) {
  router.push(`/app/project/${projectId}/overview`)
}

function getHealthColor(health) {
  if (health >= 80) return 'success'
  if (health >= 60) return 'warning'
  return 'error'
}
</script>

<template>
  <div class="dashboard">
    <!-- Welcome Section -->
    <section class="welcome-section animate-fade-in">
      <div class="welcome-content">
        <h1>{{ greeting }}, {{ authStore.user?.name?.split(' ')[0] }}</h1>
        <p>Here's what's happening with your projects at {{ projectsStore.currentTenant?.name }}</p>
      </div>
      <div class="welcome-actions">
        <Button label="New Project" icon="pi pi-plus" />
      </div>
    </section>

    <!-- Stats Overview -->
    <section class="stats-section">
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon projects">
            <i class="pi pi-folder"></i>
          </div>
          <div class="stat-content">
            <div class="stat-value">{{ summaryStats.totalProjects }}</div>
            <div class="stat-label">Total Projects</div>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon active">
            <i class="pi pi-play-circle"></i>
          </div>
          <div class="stat-content">
            <div class="stat-value">{{ summaryStats.activeProjects }}</div>
            <div class="stat-label">Active Projects</div>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon health">
            <i class="pi pi-heart"></i>
          </div>
          <div class="stat-content">
            <div class="stat-value">{{ summaryStats.avgHealth }}%</div>
            <div class="stat-label">Avg. Health Score</div>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon milestones">
            <i class="pi pi-flag"></i>
          </div>
          <div class="stat-content">
            <div class="stat-value">{{ summaryStats.upcomingMilestones }}</div>
            <div class="stat-label">Upcoming Milestones</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section class="projects-section">
      <div class="section-header">
        <h2>Your Projects</h2>
        <Button label="View All" text icon="pi pi-arrow-right" iconPos="right" />
      </div>

      <div class="projects-grid">
        <div 
          v-for="project in projectsStore.tenantProjects" 
          :key="project.id"
          class="project-card"
          @click="navigateToProject(project.id)"
        >
          <div class="project-header">
            <div class="project-title-row">
              <h3>{{ project.name }}</h3>
              <span class="badge" :class="'badge-' + getHealthColor(project.health)">
                {{ project.status }}
              </span>
            </div>
            <p class="project-description">{{ project.description }}</p>
          </div>

          <div class="project-health-section">
            <div class="health-label">
              <span>Project Health</span>
              <span class="health-value">{{ project.health }}%</span>
            </div>
            <div class="progress-bar">
              <div 
                class="progress-bar-fill" 
                :class="getHealthColor(project.health)"
                :style="{ width: project.health + '%' }"
              ></div>
            </div>
          </div>

          <div class="project-kpis">
            <div 
              v-for="(kpi, index) in project.kpis.slice(0, 3)" 
              :key="index"
              class="kpi-mini"
            >
              <div class="kpi-mini-value">
                {{ kpi.value }}{{ kpi.unit === '%' ? '%' : '' }}
                <span v-if="kpi.unit !== '%'" class="kpi-mini-target">/{{ kpi.target }}</span>
              </div>
              <div class="kpi-mini-label">{{ kpi.name }}</div>
            </div>
          </div>

          <div class="project-footer">
            <div class="project-team">
              <div 
                v-for="(member, index) in project.team.slice(0, 3)" 
                :key="member.id"
                class="team-avatar"
                :style="{ zIndex: 3 - index }"
                v-tooltip.top="member.name"
              >
                {{ member.name.charAt(0) }}
              </div>
              <div v-if="project.team.length > 3" class="team-more">
                +{{ project.team.length - 3 }}
              </div>
            </div>
            <div class="project-date">
              <i class="pi pi-calendar"></i>
              <span>Due {{ new Date(project.targetDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- AI Consultants Section -->
    <section class="ai-section">
      <div class="section-header">
        <h2>Your AI Consultants</h2>
      </div>

      <div class="ai-grid">
        <div class="ai-card felix">
          <div class="ai-avatar">
            <div class="avatar-shape">
              <svg viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="40" r="35" fill="url(#felix-gradient)"/>
                <path d="M40 25L55 55H25L40 25Z" fill="white" fill-opacity="0.9"/>
                <circle cx="40" cy="45" r="8" fill="#3b82f6"/>
                <defs>
                  <linearGradient id="felix-gradient" x1="0" y1="0" x2="80" y2="80">
                    <stop offset="0%" stop-color="#93c5fd"/>
                    <stop offset="100%" stop-color="#3b82f6"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          <div class="ai-info">
            <h3>Felix</h3>
            <p class="ai-role">Strategy Consultant</p>
            <p class="ai-description">Strategic analysis, competitive positioning, and long-term planning</p>
          </div>
          <Button label="Start Chat" icon="pi pi-comments" outlined size="small" />
        </div>

        <div class="ai-card sophie">
          <div class="ai-avatar">
            <div class="avatar-shape">
              <svg viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="40" r="35" fill="url(#sophie-gradient)"/>
                <rect x="25" y="30" width="30" height="25" rx="4" fill="white" fill-opacity="0.9"/>
                <circle cx="40" cy="42" r="8" fill="#f59e0b"/>
                <defs>
                  <linearGradient id="sophie-gradient" x1="0" y1="0" x2="80" y2="80">
                    <stop offset="0%" stop-color="#fde68a"/>
                    <stop offset="100%" stop-color="#f59e0b"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          <div class="ai-info">
            <h3>Sophie</h3>
            <p class="ai-role">Project Manager</p>
            <p class="ai-description">Task coordination, timeline management, and team alignment</p>
          </div>
          <Button label="Start Chat" icon="pi pi-comments" outlined size="small" />
        </div>
      </div>
    </section>

    <!-- Recent Activity -->
    <section class="activity-section">
      <div class="section-header">
        <h2>Recent Activity</h2>
        <Button label="View All" text icon="pi pi-arrow-right" iconPos="right" />
      </div>

      <div class="activity-list">
        <div 
          v-for="project in projectsStore.tenantProjects"
          :key="project.id"
        >
          <div 
            v-for="activity in project.recentActivity.slice(0, 2)" 
            :key="activity.id"
            class="activity-item"
          >
            <div 
              class="activity-icon"
              :class="{
                'felix': activity.persona === 'felix',
                'sophie': activity.persona === 'sophie',
                'user': activity.type === 'user',
                'milestone': activity.type === 'milestone'
              }"
            >
              <i :class="{
                'pi pi-compass': activity.persona === 'felix',
                'pi pi-users': activity.persona === 'sophie',
                'pi pi-user': activity.type === 'user',
                'pi pi-flag': activity.type === 'milestone'
              }"></i>
            </div>
            <div class="activity-content">
              <div class="activity-message">
                <span class="activity-actor" v-if="activity.persona">
                  {{ activity.persona === 'felix' ? 'Felix' : 'Sophie' }}
                </span>
                <span class="activity-actor" v-else-if="activity.user">
                  {{ activity.user }}
                </span>
                {{ activity.message }}
              </div>
              <div class="activity-meta">
                <span class="activity-project">{{ project.name }}</span>
                <span class="activity-time">{{ activity.time }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

/* Welcome Section */
.welcome-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-xl);
  background: linear-gradient(135deg, var(--color-brand-primary-light) 0%, white 100%);
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border-light);
}

.welcome-content h1 {
  font-size: 1.75rem;
  margin-bottom: var(--spacing-sm);
}

.welcome-content p {
  font-size: 1rem;
  color: var(--color-text-secondary);
}

/* Stats Section */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-lg);
}

.stat-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  transition: all var(--transition-fast);
}

.stat-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

.stat-icon.projects { background: var(--color-info-light); color: var(--color-info); }
.stat-icon.active { background: var(--color-success-light); color: var(--color-success); }
.stat-icon.health { background: var(--color-error-light); color: var(--color-error); }
.stat-icon.milestones { background: var(--color-warning-light); color: var(--color-warning); }

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1.2;
}

.stat-label {
  font-size: 0.8125rem;
  color: var(--color-text-tertiary);
}

/* Section Headers */
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-lg);
}

.section-header h2 {
  font-size: 1.25rem;
}

/* Projects Grid */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-lg);
}

.project-card {
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  cursor: pointer;
  transition: all var(--transition-normal);
}

.project-card:hover {
  box-shadow: var(--shadow-lg);
  border-color: var(--color-brand-primary);
  transform: translateY(-2px);
}

.project-header {
  margin-bottom: var(--spacing-lg);
}

.project-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-sm);
}

.project-title-row h3 {
  font-size: 1.125rem;
}

.project-description {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  line-height: 1.5;
}

.project-health-section {
  margin-bottom: var(--spacing-lg);
}

.health-label {
  display: flex;
  justify-content: space-between;
  font-size: 0.8125rem;
  color: var(--color-text-tertiary);
  margin-bottom: var(--spacing-sm);
}

.health-value {
  font-weight: 600;
  color: var(--color-text-primary);
}

.project-kpis {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background: var(--color-bg-secondary);
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-lg);
}

.kpi-mini {
  text-align: center;
}

.kpi-mini-value {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--color-text-primary);
}

.kpi-mini-target {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  font-weight: 400;
}

.kpi-mini-label {
  font-size: 0.6875rem;
  color: var(--color-text-tertiary);
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.project-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.project-team {
  display: flex;
  align-items: center;
}

.team-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--color-brand-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  border: 2px solid white;
  margin-left: -8px;
}

.team-avatar:first-child {
  margin-left: 0;
}

.team-more {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--color-bg-tertiary);
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6875rem;
  font-weight: 600;
  border: 2px solid white;
  margin-left: -8px;
}

.project-date {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: 0.8125rem;
  color: var(--color-text-tertiary);
}

/* AI Section */
.ai-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-lg);
}

.ai-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  padding: var(--spacing-lg);
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  transition: all var(--transition-fast);
}

.ai-card:hover {
  box-shadow: var(--shadow-md);
}

.ai-card.felix {
  border-left: 3px solid var(--color-felix);
}

.ai-card.sophie {
  border-left: 3px solid var(--color-sophie);
}

.ai-avatar {
  flex-shrink: 0;
}

.avatar-shape {
  width: 64px;
  height: 64px;
}

.ai-info {
  flex: 1;
}

.ai-info h3 {
  font-size: 1.125rem;
  margin-bottom: 2px;
}

.ai-role {
  font-size: 0.8125rem;
  color: var(--color-text-tertiary);
  margin-bottom: var(--spacing-sm);
}

.ai-description {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  line-height: 1.4;
}

/* Activity Section */
.activity-list {
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.activity-item {
  display: flex;
  gap: var(--spacing-md);
  padding: var(--spacing-md) var(--spacing-lg);
  border-bottom: 1px solid var(--color-border-light);
  transition: background var(--transition-fast);
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-item:hover {
  background: var(--color-bg-secondary);
}

.activity-icon {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.activity-icon.felix { background: var(--color-felix-light); color: var(--color-felix); }
.activity-icon.sophie { background: var(--color-sophie-light); color: var(--color-sophie); }
.activity-icon.user { background: var(--color-bg-tertiary); color: var(--color-text-secondary); }
.activity-icon.milestone { background: var(--color-success-light); color: var(--color-success); }

.activity-content {
  flex: 1;
  min-width: 0;
}

.activity-message {
  font-size: 0.9375rem;
  color: var(--color-text-primary);
  line-height: 1.4;
}

.activity-actor {
  font-weight: 600;
}

.activity-meta {
  display: flex;
  gap: var(--spacing-md);
  margin-top: var(--spacing-xs);
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.activity-project {
  color: var(--color-text-tertiary);
}

/* Responsive */
@media (max-width: 1200px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 900px) {
  .projects-grid,
  .ai-grid {
    grid-template-columns: 1fr;
  }
  
  .welcome-section {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-lg);
  }
}

@media (max-width: 600px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
