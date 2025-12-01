<script setup>
import { computed, ref } from 'vue'
import { useProjectsStore } from '../../stores/projects'
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'

const projectsStore = useProjectsStore()

const project = computed(() => projectsStore.currentProject)
const milestones = computed(() => projectsStore.projectMilestones)

const expandedMilestones = ref(new Set(['m-2'])) // Expand in-progress by default

function toggleMilestone(id) {
  if (expandedMilestones.value.has(id)) {
    expandedMilestones.value.delete(id)
  } else {
    expandedMilestones.value.add(id)
  }
}

function getStatusClass(status) {
  if (status === 'completed') return 'completed'
  if (status === 'in-progress') return 'in-progress'
  return 'pending'
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  })
}

function getProgress(milestone) {
  const completed = milestone.tasks.filter(t => t.status === 'completed').length
  return Math.round((completed / milestone.tasks.length) * 100)
}
</script>

<template>
  <div class="project-timeline" v-if="project">
    <!-- Page Header -->
    <div class="page-header">
      <div class="header-content">
        <h1>Project Timeline</h1>
        <p>Track milestones and tasks for {{ project.name }}</p>
      </div>
      <div class="header-actions">
        <Button label="Add Milestone" icon="pi pi-plus" />
      </div>
    </div>

    <!-- Timeline Overview -->
    <div class="timeline-overview card">
      <div class="overview-stats">
        <div class="stat">
          <div class="stat-value">{{ milestones.filter(m => m.status === 'completed').length }}</div>
          <div class="stat-label">Completed</div>
        </div>
        <div class="stat">
          <div class="stat-value">{{ milestones.filter(m => m.status === 'in-progress').length }}</div>
          <div class="stat-label">In Progress</div>
        </div>
        <div class="stat">
          <div class="stat-value">{{ milestones.filter(m => m.status === 'pending').length }}</div>
          <div class="stat-label">Upcoming</div>
        </div>
      </div>
      <div class="timeline-bar">
        <div 
          v-for="(milestone, index) in milestones" 
          :key="milestone.id"
          class="timeline-segment"
          :class="milestone.status"
          :style="{ width: (100 / milestones.length) + '%' }"
        >
          <div class="segment-marker"></div>
          <div class="segment-label">{{ milestone.title.split(':')[0] }}</div>
        </div>
      </div>
    </div>

    <!-- Milestones List -->
    <div class="milestones-container">
      <div 
        v-for="(milestone, index) in milestones" 
        :key="milestone.id"
        class="milestone-card"
        :class="milestone.status"
      >
        <!-- Timeline Connector -->
        <div class="timeline-connector">
          <div class="connector-line" :class="{ 'first': index === 0, 'last': index === milestones.length - 1 }"></div>
          <div class="connector-dot" :class="milestone.status">
            <i :class="{
              'pi pi-check': milestone.status === 'completed',
              'pi pi-spinner pi-spin': milestone.status === 'in-progress',
              'pi pi-circle': milestone.status === 'pending'
            }"></i>
          </div>
        </div>

        <!-- Milestone Content -->
        <div class="milestone-content card">
          <div class="milestone-header" @click="toggleMilestone(milestone.id)">
            <div class="milestone-title-section">
              <h3>{{ milestone.title }}</h3>
              <div class="milestone-meta">
                <span class="badge" :class="'badge-' + (milestone.status === 'completed' ? 'success' : milestone.status === 'in-progress' ? 'info' : 'warning')">
                  {{ milestone.status.replace('-', ' ') }}
                </span>
                <span class="milestone-date">
                  <i class="pi pi-calendar"></i>
                  {{ milestone.completedDate ? 'Completed ' + formatDate(milestone.completedDate) : 'Due ' + formatDate(milestone.dueDate) }}
                </span>
              </div>
            </div>
            <div class="milestone-progress-section">
              <div class="progress-info">
                <span>{{ milestone.tasks.filter(t => t.status === 'completed').length }}/{{ milestone.tasks.length }} tasks</span>
                <span>{{ getProgress(milestone) }}%</span>
              </div>
              <div class="progress-bar">
                <div 
                  class="progress-bar-fill"
                  :class="getProgress(milestone) === 100 ? 'success' : 'info'"
                  :style="{ width: getProgress(milestone) + '%' }"
                ></div>
              </div>
            </div>
            <Button 
              :icon="expandedMilestones.has(milestone.id) ? 'pi pi-chevron-up' : 'pi pi-chevron-down'" 
              text 
              rounded 
              size="small"
            />
          </div>

          <!-- Tasks List -->
          <div class="tasks-list" v-show="expandedMilestones.has(milestone.id)">
            <div 
              v-for="task in milestone.tasks" 
              :key="task.id"
              class="task-item"
              :class="task.status"
            >
              <Checkbox 
                :modelValue="task.status === 'completed'"
                :binary="true"
                :disabled="true"
              />
              <span class="task-title">{{ task.title }}</span>
              <span class="task-status badge" :class="'badge-' + (task.status === 'completed' ? 'success' : task.status === 'in-progress' ? 'info' : 'warning')">
                {{ task.status.replace('-', ' ') }}
              </span>
            </div>
            <div class="tasks-actions">
              <Button label="Add Task" icon="pi pi-plus" text size="small" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.project-timeline {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

/* Page Header */
.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.header-content h1 {
  font-size: 1.75rem;
  margin-bottom: var(--spacing-sm);
}

.header-content p {
  color: var(--color-text-secondary);
}

/* Timeline Overview */
.timeline-overview {
  padding: var(--spacing-xl);
}

.overview-stats {
  display: flex;
  gap: var(--spacing-2xl);
  margin-bottom: var(--spacing-xl);
}

.stat {
  text-align: center;
}

.stat .stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-text-primary);
}

.stat .stat-label {
  font-size: 0.875rem;
  color: var(--color-text-tertiary);
}

.timeline-bar {
  display: flex;
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-full);
  height: 8px;
  overflow: hidden;
  position: relative;
}

.timeline-segment {
  position: relative;
  height: 100%;
}

.timeline-segment.completed {
  background: var(--color-success);
}

.timeline-segment.in-progress {
  background: linear-gradient(90deg, var(--color-brand-primary) 50%, var(--color-bg-tertiary) 50%);
}

.segment-marker {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(50%, -50%);
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: white;
  border: 3px solid var(--color-bg-tertiary);
  z-index: 1;
}

.timeline-segment.completed .segment-marker {
  border-color: var(--color-success);
  background: var(--color-success);
}

.timeline-segment.in-progress .segment-marker {
  border-color: var(--color-brand-primary);
  background: white;
}

.segment-label {
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  transform: translateX(50%);
  font-size: 0.75rem;
  color: var(--color-text-tertiary);
  white-space: nowrap;
}

/* Milestones Container */
.milestones-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.milestone-card {
  display: flex;
  gap: var(--spacing-lg);
}

/* Timeline Connector */
.timeline-connector {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40px;
  flex-shrink: 0;
}

.connector-line {
  flex: 1;
  width: 2px;
  background: var(--color-border-light);
}

.connector-line.first {
  background: linear-gradient(to bottom, transparent, var(--color-border-light));
}

.connector-line.last {
  background: linear-gradient(to bottom, var(--color-border-light), transparent);
}

.connector-dot {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-primary);
  border: 3px solid var(--color-border-light);
  color: var(--color-text-muted);
  z-index: 1;
}

.connector-dot.completed {
  background: var(--color-success);
  border-color: var(--color-success);
  color: white;
}

.connector-dot.in-progress {
  background: var(--color-brand-primary);
  border-color: var(--color-brand-primary);
  color: white;
}

/* Milestone Content */
.milestone-content {
  flex: 1;
}

.milestone-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  cursor: pointer;
  padding: var(--spacing-lg);
}

.milestone-title-section {
  flex: 1;
}

.milestone-title-section h3 {
  font-size: 1.125rem;
  margin-bottom: var(--spacing-sm);
}

.milestone-meta {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.milestone-date {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: 0.8125rem;
  color: var(--color-text-tertiary);
}

.milestone-progress-section {
  width: 200px;
  flex-shrink: 0;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: var(--color-text-tertiary);
  margin-bottom: var(--spacing-xs);
}

/* Tasks List */
.tasks-list {
  padding: 0 var(--spacing-lg) var(--spacing-lg);
  border-top: 1px solid var(--color-border-light);
  margin-top: var(--spacing-md);
  padding-top: var(--spacing-lg);
}

.task-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid var(--color-border-light);
}

.task-item:last-of-type {
  border-bottom: none;
}

.task-title {
  flex: 1;
  font-size: 0.9375rem;
}

.task-item.completed .task-title {
  color: var(--color-text-tertiary);
  text-decoration: line-through;
}

.task-status {
  flex-shrink: 0;
}

.tasks-actions {
  margin-top: var(--spacing-md);
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--color-border-light);
}

/* Responsive */
@media (max-width: 768px) {
  .milestone-header {
    flex-wrap: wrap;
  }
  
  .milestone-progress-section {
    width: 100%;
    order: 3;
    margin-top: var(--spacing-md);
  }
  
  .overview-stats {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
