<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProjectsStore } from '../../stores/projects'
import Button from 'primevue/button'
import ProgressBar from 'primevue/progressbar'

const router = useRouter()
const projectsStore = useProjectsStore()

const project = computed(() => projectsStore.currentProject)
const milestones = computed(() => projectsStore.projectMilestones)

function getHealthColor(health) {
  if (health >= 80) return 'success'
  if (health >= 60) return 'warning'
  return 'error'
}

function getTrendIcon(trend) {
  if (trend === 'up') return 'pi pi-arrow-up'
  if (trend === 'down') return 'pi pi-arrow-down'
  return 'pi pi-minus'
}

function getActivityIcon(activity) {
  if (activity.persona === 'felix') return 'pi pi-compass'
  if (activity.persona === 'sophie') return 'pi pi-users'
  if (activity.type === 'user') return 'pi pi-user'
  if (activity.type === 'milestone') return 'pi pi-flag'
  return 'pi pi-circle'
}

function navigateTo(path) {
  const projectId = projectsStore.currentProjectId
  router.push(`/app/project/${projectId}/${path}`)
}
</script>

<template>
  <div class="project-overview" v-if="project">
    <!-- Page Header -->
    <div class="page-header">
      <div class="header-content">
        <h1>{{ project.name }}</h1>
        <p>{{ project.description }}</p>
      </div>
      <div class="header-actions">
        <Button label="Edit Project" icon="pi pi-pencil" outlined />
        <Button label="Share" icon="pi pi-share-alt" outlined />
      </div>
    </div>

    <!-- Health Overview -->
    <div class="overview-grid">
      <!-- Health Card -->
      <div class="health-card card">
        <div class="health-visual">
          <svg viewBox="0 0 120 120" class="health-ring">
            <circle 
              cx="60" 
              cy="60" 
              r="52" 
              fill="none" 
              stroke="var(--color-bg-tertiary)" 
              stroke-width="12"
            />
            <circle 
              cx="60" 
              cy="60" 
              r="52" 
              fill="none" 
              :stroke="project.health >= 80 ? 'var(--color-success)' : project.health >= 60 ? 'var(--color-warning)' : 'var(--color-error)'"
              stroke-width="12"
              stroke-linecap="round"
              :stroke-dasharray="`${project.health * 3.27} 327`"
              transform="rotate(-90 60 60)"
            />
          </svg>
          <div class="health-value">
            <span class="health-number">{{ project.health }}</span>
            <span class="health-percent">%</span>
          </div>
        </div>
        <div class="health-info">
          <h3>Project Health</h3>
          <p>Overall project status based on timeline, budget, and milestone completion</p>
          <div class="health-breakdown">
            <div class="breakdown-item">
              <span class="breakdown-label">Timeline</span>
              <span class="breakdown-value success">On Track</span>
            </div>
            <div class="breakdown-item">
              <span class="breakdown-label">Budget</span>
              <span class="breakdown-value success">Within Range</span>
            </div>
            <div class="breakdown-item">
              <span class="breakdown-label">Milestones</span>
              <span class="breakdown-value warning">1 At Risk</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="quick-stats">
        <div class="stat-item">
          <div class="stat-icon">
            <i class="pi pi-calendar"></i>
          </div>
          <div class="stat-content">
            <div class="stat-label">Start Date</div>
            <div class="stat-value">{{ new Date(project.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}</div>
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-icon target">
            <i class="pi pi-flag"></i>
          </div>
          <div class="stat-content">
            <div class="stat-label">Target Date</div>
            <div class="stat-value">{{ new Date(project.targetDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}</div>
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-icon team">
            <i class="pi pi-users"></i>
          </div>
          <div class="stat-content">
            <div class="stat-label">Team Size</div>
            <div class="stat-value">{{ project.team.length }} members</div>
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-icon modules">
            <i class="pi pi-th-large"></i>
          </div>
          <div class="stat-content">
            <div class="stat-label">Active Modules</div>
            <div class="stat-value">{{ project.modules.length }} modules</div>
          </div>
        </div>
      </div>
    </div>

    <!-- KPIs Section -->
    <div class="kpis-section">
      <div class="section-header">
        <h2>Key Performance Indicators</h2>
        <Button label="Configure KPIs" text icon="pi pi-cog" />
      </div>
      <div class="kpis-grid">
        <div 
          v-for="kpi in project.kpis" 
          :key="kpi.name"
          class="kpi-card"
        >
          <div class="kpi-header">
            <span class="kpi-name">{{ kpi.name }}</span>
            <span class="kpi-trend" :class="kpi.trend">
              <i :class="getTrendIcon(kpi.trend)"></i>
            </span>
          </div>
          <div class="kpi-value-row">
            <span class="kpi-current">{{ kpi.value }}{{ kpi.unit }}</span>
            <span class="kpi-target">/ {{ kpi.target }}{{ kpi.unit }}</span>
          </div>
          <div class="kpi-progress">
            <div class="progress-bar">
              <div 
                class="progress-bar-fill"
                :class="kpi.value / kpi.target >= 0.8 ? 'success' : kpi.value / kpi.target >= 0.5 ? 'warning' : 'error'"
                :style="{ width: Math.min(100, (kpi.value / kpi.target) * 100) + '%' }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Two Column Layout -->
    <div class="two-column-grid">
      <!-- Milestones Preview -->
      <div class="milestones-preview card">
        <div class="card-header">
          <span class="card-title">Upcoming Milestones</span>
          <Button label="View Timeline" text size="small" @click="navigateTo('timeline')" />
        </div>
        <div class="milestones-list">
          <div 
            v-for="milestone in milestones.slice(0, 3)" 
            :key="milestone.id"
            class="milestone-item"
            :class="milestone.status"
          >
            <div class="milestone-indicator">
              <i :class="{
                'pi pi-check-circle': milestone.status === 'completed',
                'pi pi-spin pi-spinner': milestone.status === 'in-progress',
                'pi pi-circle': milestone.status === 'pending'
              }"></i>
            </div>
            <div class="milestone-content">
              <div class="milestone-title">{{ milestone.title }}</div>
              <div class="milestone-meta">
                <span class="milestone-status badge" :class="'badge-' + (milestone.status === 'completed' ? 'success' : milestone.status === 'in-progress' ? 'info' : 'warning')">
                  {{ milestone.status.replace('-', ' ') }}
                </span>
                <span class="milestone-date">
                  {{ milestone.completedDate 
                    ? 'Completed ' + new Date(milestone.completedDate).toLocaleDateString()
                    : 'Due ' + new Date(milestone.dueDate).toLocaleDateString() 
                  }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="activity-preview card">
        <div class="card-header">
          <span class="card-title">Recent Activity</span>
          <Button label="View All" text size="small" />
        </div>
        <div class="activity-list">
          <div 
            v-for="activity in project.recentActivity" 
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
              <i :class="getActivityIcon(activity)"></i>
            </div>
            <div class="activity-content">
              <div class="activity-message">
                <span class="activity-actor" v-if="activity.persona">
                  {{ activity.persona === 'felix' ? 'Felix' : 'Sophie' }}:
                </span>
                <span class="activity-actor" v-else-if="activity.user">
                  {{ activity.user }}:
                </span>
                {{ activity.message }}
              </div>
              <div class="activity-time">{{ activity.time }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Team Section -->
    <div class="team-section card">
      <div class="card-header">
        <span class="card-title">Project Team</span>
        <Button label="Manage Team" text icon="pi pi-user-plus" />
      </div>
      <div class="team-grid">
        <div 
          v-for="member in project.team" 
          :key="member.id"
          class="team-member"
        >
          <div class="member-avatar">
            {{ member.name.split(' ').map(n => n[0]).join('') }}
          </div>
          <div class="member-info">
            <div class="member-name">{{ member.name }}</div>
            <div class="member-role">{{ member.role }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.project-overview {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

/* Page Header */
.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--spacing-xl);
}

.header-content h1 {
  font-size: 1.75rem;
  margin-bottom: var(--spacing-sm);
}

.header-content p {
  font-size: 1rem;
  color: var(--color-text-secondary);
  max-width: 600px;
}

.header-actions {
  display: flex;
  gap: var(--spacing-sm);
  flex-shrink: 0;
}

/* Overview Grid */
.overview-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-lg);
}

/* Health Card */
.health-card {
  display: flex;
  gap: var(--spacing-xl);
  align-items: center;
}

.health-visual {
  position: relative;
  width: 120px;
  height: 120px;
  flex-shrink: 0;
}

.health-ring {
  width: 100%;
  height: 100%;
}

.health-value {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.health-number {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-text-primary);
}

.health-percent {
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-text-tertiary);
}

.health-info h3 {
  font-size: 1.125rem;
  margin-bottom: var(--spacing-sm);
}

.health-info > p {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-lg);
}

.health-breakdown {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.breakdown-item {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
}

.breakdown-label {
  color: var(--color-text-tertiary);
}

.breakdown-value {
  font-weight: 500;
}

.breakdown-value.success { color: var(--color-success); }
.breakdown-value.warning { color: var(--color-warning); }
.breakdown-value.error { color: var(--color-error); }

/* Quick Stats */
.quick-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md);
}

.stat-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
}

.stat-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-tertiary);
  color: var(--color-text-secondary);
}

.stat-icon.target { background: var(--color-warning-light); color: var(--color-warning); }
.stat-icon.team { background: var(--color-info-light); color: var(--color-info); }
.stat-icon.modules { background: var(--color-success-light); color: var(--color-success); }

.stat-label {
  font-size: 0.75rem;
  color: var(--color-text-tertiary);
}

.stat-value {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

/* KPIs Section */
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-lg);
}

.section-header h2 {
  font-size: 1.125rem;
}

.kpis-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-md);
}

.kpi-card {
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
}

.kpi-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-sm);
}

.kpi-name {
  font-size: 0.8125rem;
  color: var(--color-text-tertiary);
  font-weight: 500;
}

.kpi-trend {
  font-size: 0.75rem;
}

.kpi-trend.up { color: var(--color-success); }
.kpi-trend.down { color: var(--color-error); }
.kpi-trend.stable { color: var(--color-text-muted); }

.kpi-value-row {
  margin-bottom: var(--spacing-md);
}

.kpi-current {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text-primary);
}

.kpi-target {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  margin-left: 4px;
}

/* Two Column Grid */
.two-column-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-lg);
}

/* Milestones Preview */
.milestones-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.milestone-item {
  display: flex;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background: var(--color-bg-secondary);
  border-radius: var(--radius-md);
}

.milestone-indicator {
  font-size: 1.25rem;
  flex-shrink: 0;
}

.milestone-item.completed .milestone-indicator { color: var(--color-success); }
.milestone-item.in-progress .milestone-indicator { color: var(--color-brand-primary); }
.milestone-item.pending .milestone-indicator { color: var(--color-text-muted); }

.milestone-title {
  font-weight: 500;
  margin-bottom: var(--spacing-xs);
}

.milestone-meta {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.milestone-date {
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

/* Activity */
.activity-list {
  display: flex;
  flex-direction: column;
}

.activity-item {
  display: flex;
  gap: var(--spacing-md);
  padding: var(--spacing-md) 0;
  border-bottom: 1px solid var(--color-border-light);
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-icon {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  flex-shrink: 0;
}

.activity-icon.felix { background: var(--color-felix-light); color: var(--color-felix); }
.activity-icon.sophie { background: var(--color-sophie-light); color: var(--color-sophie); }
.activity-icon.user { background: var(--color-bg-tertiary); color: var(--color-text-secondary); }
.activity-icon.milestone { background: var(--color-success-light); color: var(--color-success); }

.activity-message {
  font-size: 0.875rem;
  color: var(--color-text-primary);
  line-height: 1.4;
}

.activity-actor {
  font-weight: 600;
}

.activity-time {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  margin-top: 2px;
}

/* Team Section */
.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--spacing-md);
}

.team-member {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background: var(--color-bg-secondary);
  border-radius: var(--radius-md);
}

.member-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--color-brand-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
}

.member-name {
  font-weight: 500;
  font-size: 0.9375rem;
}

.member-role {
  font-size: 0.75rem;
  color: var(--color-text-tertiary);
}

/* Responsive */
@media (max-width: 1200px) {
  .kpis-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 900px) {
  .overview-grid,
  .two-column-grid {
    grid-template-columns: 1fr;
  }
  
  .page-header {
    flex-direction: column;
  }
  
  .health-card {
    flex-direction: column;
    text-align: center;
  }
}

@media (max-width: 600px) {
  .kpis-grid {
    grid-template-columns: 1fr;
  }
  
  .quick-stats {
    grid-template-columns: 1fr;
  }
}
</style>
