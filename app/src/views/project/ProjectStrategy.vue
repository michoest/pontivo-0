<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProjectsStore } from '../../stores/projects'
import Button from 'primevue/button'
import Card from 'primevue/card'

const router = useRouter()
const projectsStore = useProjectsStore()

const project = computed(() => projectsStore.currentProject)

// Mock strategic data
const strategicOverview = ref({
  vision: 'Become the leading HR technology provider for mid-sized companies in the Nordic region within 3 years.',
  mission: 'Empower HR teams with intelligent, user-friendly tools that transform employee experiences.',
  currentFocus: 'Market Entry Strategy for Sweden',
  strategicGoals: [
    { id: 1, title: 'Establish Nordic presence', progress: 45, status: 'in-progress' },
    { id: 2, title: 'Build partner ecosystem', progress: 30, status: 'in-progress' },
    { id: 3, title: 'Achieve product-market fit', progress: 65, status: 'in-progress' },
    { id: 4, title: 'Scale customer acquisition', progress: 15, status: 'planned' }
  ]
})

const strategicFrameworks = ref([
  {
    id: 'swot',
    name: 'SWOT Analysis',
    icon: 'pi pi-th-large',
    description: 'Strengths, weaknesses, opportunities, threats',
    lastUpdated: '2 days ago',
    status: 'completed'
  },
  {
    id: 'jtbd',
    name: 'Jobs to be Done',
    icon: 'pi pi-users',
    description: 'Customer needs and desired outcomes',
    lastUpdated: '1 week ago',
    status: 'completed'
  },
  {
    id: 'competitive',
    name: 'Competitive Positioning',
    icon: 'pi pi-chart-bar',
    description: 'Market positioning and differentiation',
    lastUpdated: '3 days ago',
    status: 'completed'
  },
  {
    id: 'okrs',
    name: 'OKRs',
    icon: 'pi pi-flag',
    description: 'Objectives and key results',
    lastUpdated: '5 days ago',
    status: 'in-progress'
  }
])

const strategicInsights = ref([
  {
    id: 1,
    type: 'opportunity',
    title: 'Untapped mid-market segment',
    description: 'Analysis reveals that 67% of Swedish mid-sized companies lack modern HR solutions.',
    confidence: 'high',
    source: 'Market Research Report'
  },
  {
    id: 2,
    type: 'risk',
    title: 'Established competitor expansion',
    description: 'Personio announced Nordic expansion plans, potentially entering Sweden in Q2 2025.',
    confidence: 'medium',
    source: 'Competitive Intelligence'
  },
  {
    id: 3,
    type: 'recommendation',
    title: 'Accelerate partnership strategy',
    description: 'Recommend prioritizing HR consultancy partnerships to establish local credibility before competitor entry.',
    confidence: 'high',
    source: 'Felix Analysis'
  }
])

function navigateToChat() {
  const projectId = projectsStore.currentProjectId
  router.push(`/app/project/${projectId}/chat`)
}

function getInsightIcon(type) {
  if (type === 'opportunity') return 'pi pi-star'
  if (type === 'risk') return 'pi pi-exclamation-triangle'
  if (type === 'recommendation') return 'pi pi-lightbulb'
  return 'pi pi-info-circle'
}

function getInsightClass(type) {
  if (type === 'opportunity') return 'opportunity'
  if (type === 'risk') return 'risk'
  if (type === 'recommendation') return 'recommendation'
  return 'info'
}
</script>

<template>
  <div class="project-strategy" v-if="project">
    <!-- Page Header -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-title-row">
          <div class="felix-badge">
            <i class="pi pi-compass"></i>
            <span>Felix's Domain</span>
          </div>
        </div>
        <h1>Strategy</h1>
        <p>Strategic planning and analysis for {{ project.name }}</p>
      </div>
      <div class="header-actions">
        <Button label="Ask Felix" icon="pi pi-comments" @click="navigateToChat" />
      </div>
    </div>

    <!-- Strategic Overview -->
    <div class="overview-section">
      <div class="overview-grid">
        <!-- Vision & Mission -->
        <div class="vision-card card">
          <div class="card-label">Vision</div>
          <p class="vision-text">{{ strategicOverview.vision }}</p>
          <div class="card-label mt-lg">Mission</div>
          <p class="mission-text">{{ strategicOverview.mission }}</p>
        </div>

        <!-- Current Focus -->
        <div class="focus-card card">
          <div class="card-label">Current Strategic Focus</div>
          <div class="focus-content">
            <div class="focus-icon">
              <i class="pi pi-bullseye"></i>
            </div>
            <div class="focus-info">
              <h3>{{ strategicOverview.currentFocus }}</h3>
              <p>Primary initiative for Q1 2025</p>
            </div>
          </div>
          <Button label="View Details" text icon="pi pi-arrow-right" iconPos="right" class="mt-md" />
        </div>
      </div>
    </div>

    <!-- Strategic Goals -->
    <div class="goals-section">
      <div class="section-header">
        <h2>Strategic Goals</h2>
        <Button label="Add Goal" icon="pi pi-plus" text />
      </div>
      <div class="goals-grid">
        <div 
          v-for="goal in strategicOverview.strategicGoals" 
          :key="goal.id"
          class="goal-card card"
        >
          <div class="goal-header">
            <h4>{{ goal.title }}</h4>
            <span class="badge" :class="goal.status === 'in-progress' ? 'badge-info' : 'badge-warning'">
              {{ goal.status.replace('-', ' ') }}
            </span>
          </div>
          <div class="goal-progress">
            <div class="progress-header">
              <span>Progress</span>
              <span>{{ goal.progress }}%</span>
            </div>
            <div class="progress-bar">
              <div 
                class="progress-bar-fill"
                :class="goal.progress >= 50 ? 'success' : 'warning'"
                :style="{ width: goal.progress + '%' }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Strategic Frameworks -->
    <div class="frameworks-section">
      <div class="section-header">
        <h2>Strategic Frameworks</h2>
        <Button label="Run Analysis" icon="pi pi-play" text />
      </div>
      <div class="frameworks-grid">
        <div 
          v-for="framework in strategicFrameworks" 
          :key="framework.id"
          class="framework-card"
        >
          <div class="framework-icon">
            <i :class="framework.icon"></i>
          </div>
          <div class="framework-info">
            <h4>{{ framework.name }}</h4>
            <p>{{ framework.description }}</p>
            <div class="framework-meta">
              <span class="badge" :class="framework.status === 'completed' ? 'badge-success' : 'badge-info'">
                {{ framework.status }}
              </span>
              <span class="last-updated">Updated {{ framework.lastUpdated }}</span>
            </div>
          </div>
          <Button icon="pi pi-arrow-right" text rounded />
        </div>
      </div>
    </div>

    <!-- Strategic Insights -->
    <div class="insights-section">
      <div class="section-header">
        <h2>AI-Generated Insights</h2>
        <div class="insights-actions">
          <Button label="Refresh Analysis" icon="pi pi-refresh" text />
        </div>
      </div>
      <div class="insights-list">
        <div 
          v-for="insight in strategicInsights" 
          :key="insight.id"
          class="insight-card"
          :class="getInsightClass(insight.type)"
        >
          <div class="insight-icon">
            <i :class="getInsightIcon(insight.type)"></i>
          </div>
          <div class="insight-content">
            <div class="insight-header">
              <h4>{{ insight.title }}</h4>
              <span class="confidence-badge" :class="insight.confidence">
                {{ insight.confidence }} confidence
              </span>
            </div>
            <p>{{ insight.description }}</p>
            <div class="insight-source">
              <i class="pi pi-link"></i>
              <span>{{ insight.source }}</span>
            </div>
          </div>
          <div class="insight-actions">
            <Button icon="pi pi-comments" text rounded v-tooltip.top="'Discuss with Felix'" />
            <Button icon="pi pi-bookmark" text rounded v-tooltip.top="'Save insight'" />
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="quick-actions-section">
      <div class="section-header">
        <h2>Quick Actions</h2>
      </div>
      <div class="actions-grid">
        <div class="action-card" @click="navigateToChat">
          <div class="action-icon felix">
            <i class="pi pi-compass"></i>
          </div>
          <div class="action-info">
            <h4>Strategic Consultation</h4>
            <p>Discuss strategy with Felix</p>
          </div>
        </div>
        <div class="action-card">
          <div class="action-icon">
            <i class="pi pi-file-pdf"></i>
          </div>
          <div class="action-info">
            <h4>Generate Report</h4>
            <p>Create strategic summary</p>
          </div>
        </div>
        <div class="action-card">
          <div class="action-icon">
            <i class="pi pi-chart-line"></i>
          </div>
          <div class="action-info">
            <h4>Scenario Planning</h4>
            <p>Model strategic scenarios</p>
          </div>
        </div>
        <div class="action-card">
          <div class="action-icon">
            <i class="pi pi-users"></i>
          </div>
          <div class="action-info">
            <h4>Stakeholder Alignment</h4>
            <p>Prepare board materials</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.project-strategy {
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

.header-title-row {
  margin-bottom: var(--spacing-sm);
}

.felix-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-xs) var(--spacing-sm);
  background: var(--color-felix-light);
  color: var(--color-felix);
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 600;
}

.header-content h1 {
  font-size: 1.75rem;
  margin-bottom: var(--spacing-sm);
}

.header-content p {
  color: var(--color-text-secondary);
}

/* Overview Section */
.overview-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--spacing-lg);
}

.card-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--spacing-sm);
}

.vision-text,
.mission-text {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-text-primary);
}

.mt-lg {
  margin-top: var(--spacing-lg);
}

.mt-md {
  margin-top: var(--spacing-md);
}

.focus-content {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
}

.focus-icon {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-lg);
  background: linear-gradient(135deg, var(--color-felix-light), var(--color-felix));
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.focus-info h3 {
  font-size: 1.125rem;
  margin-bottom: var(--spacing-xs);
}

.focus-info p {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

/* Goals Section */
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-lg);
}

.section-header h2 {
  font-size: 1.125rem;
}

.goals-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-md);
}

.goal-card {
  padding: var(--spacing-lg);
}

.goal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}

.goal-header h4 {
  font-size: 0.9375rem;
  line-height: 1.3;
}

.goal-progress .progress-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: var(--color-text-tertiary);
  margin-bottom: var(--spacing-xs);
}

/* Frameworks Section */
.frameworks-grid {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.framework-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  padding: var(--spacing-lg);
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  transition: all var(--transition-fast);
  cursor: pointer;
}

.framework-card:hover {
  box-shadow: var(--shadow-md);
  border-color: var(--color-brand-primary);
}

.framework-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-lg);
  background: var(--color-bg-tertiary);
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  flex-shrink: 0;
}

.framework-info {
  flex: 1;
}

.framework-info h4 {
  font-size: 1rem;
  margin-bottom: var(--spacing-xs);
}

.framework-info > p {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-sm);
}

.framework-meta {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.last-updated {
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

/* Insights Section */
.insights-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.insight-card {
  display: flex;
  gap: var(--spacing-lg);
  padding: var(--spacing-lg);
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  border-left: 4px solid transparent;
}

.insight-card.opportunity {
  border-left-color: var(--color-success);
  background: linear-gradient(90deg, var(--color-success-light) 0%, var(--color-bg-primary) 10%);
}

.insight-card.risk {
  border-left-color: var(--color-warning);
  background: linear-gradient(90deg, var(--color-warning-light) 0%, var(--color-bg-primary) 10%);
}

.insight-card.recommendation {
  border-left-color: var(--color-felix);
  background: linear-gradient(90deg, var(--color-felix-light) 0%, var(--color-bg-primary) 10%);
}

.insight-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.insight-card.opportunity .insight-icon {
  background: var(--color-success-light);
  color: var(--color-success);
}

.insight-card.risk .insight-icon {
  background: var(--color-warning-light);
  color: var(--color-warning);
}

.insight-card.recommendation .insight-icon {
  background: var(--color-felix-light);
  color: var(--color-felix);
}

.insight-content {
  flex: 1;
}

.insight-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-sm);
}

.insight-header h4 {
  font-size: 1rem;
}

.confidence-badge {
  font-size: 0.6875rem;
  font-weight: 500;
  padding: 0.125rem 0.5rem;
  border-radius: var(--radius-full);
  text-transform: capitalize;
}

.confidence-badge.high {
  background: var(--color-success-light);
  color: var(--color-success);
}

.confidence-badge.medium {
  background: var(--color-warning-light);
  color: var(--color-warning);
}

.insight-content > p {
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
  line-height: 1.5;
  margin-bottom: var(--spacing-sm);
}

.insight-source {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.insight-actions {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

/* Quick Actions */
.actions-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-md);
}

.action-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.action-card:hover {
  box-shadow: var(--shadow-md);
  border-color: var(--color-brand-primary);
  transform: translateY(-2px);
}

.action-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-lg);
  background: var(--color-bg-tertiary);
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  flex-shrink: 0;
}

.action-icon.felix {
  background: linear-gradient(135deg, var(--color-felix-light), var(--color-felix));
  color: white;
}

.action-info h4 {
  font-size: 0.9375rem;
  margin-bottom: 2px;
}

.action-info p {
  font-size: 0.8125rem;
  color: var(--color-text-tertiary);
}

/* Responsive */
@media (max-width: 1200px) {
  .goals-grid,
  .actions-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 900px) {
  .overview-grid {
    grid-template-columns: 1fr;
  }
  
  .insight-card {
    flex-direction: column;
  }
  
  .insight-actions {
    flex-direction: row;
  }
}

@media (max-width: 600px) {
  .goals-grid,
  .actions-grid {
    grid-template-columns: 1fr;
  }
}
</style>
