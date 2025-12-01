<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useProjectsStore } from '../stores/projects'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import InputSwitch from 'primevue/inputswitch'

const authStore = useAuthStore()
const projectsStore = useProjectsStore()

const user = computed(() => authStore.user)
const tenant = computed(() => projectsStore.currentTenant)

// Form states
const profileForm = ref({
  name: user.value?.name || '',
  email: user.value?.email || '',
  role: user.value?.role || ''
})

const notificationSettings = ref({
  emailNotifications: true,
  projectUpdates: true,
  aiCompletions: true,
  weeklyDigest: false
})

const aiSettings = ref({
  defaultPersona: 'sophie',
  showWorkPanel: true,
  autoSuggest: true
})

// Mock team members
const teamMembers = ref([
  { id: 'user-1', name: 'Anna Schmidt', email: 'anna@techstartup.com', role: 'Admin' },
  { id: 'user-2', name: 'Max Weber', email: 'max@techstartup.com', role: 'Member' },
  { id: 'user-3', name: 'Lisa Braun', email: 'lisa@techstartup.com', role: 'Member' }
])

function saveProfile() {
  // Mock save
  console.log('Profile saved:', profileForm.value)
}
</script>

<template>
  <div class="settings-page">
    <div class="page-header">
      <h1>Settings</h1>
      <p>Manage your account and preferences</p>
    </div>

    <TabView class="settings-tabs">
      <!-- Profile Tab -->
      <TabPanel header="Profile">
        <div class="settings-section">
          <div class="section-header">
            <h3>Personal Information</h3>
            <p>Update your profile details</p>
          </div>
          <div class="profile-form">
            <div class="avatar-section">
              <div class="avatar-preview">
                {{ user?.name?.charAt(0) || 'U' }}
              </div>
              <Button label="Change Avatar" outlined size="small" />
            </div>
            <div class="form-grid">
              <div class="form-group">
                <label>Full Name</label>
                <InputText v-model="profileForm.name" class="w-full" />
              </div>
              <div class="form-group">
                <label>Email Address</label>
                <InputText v-model="profileForm.email" type="email" class="w-full" />
              </div>
              <div class="form-group">
                <label>Role</label>
                <InputText v-model="profileForm.role" class="w-full" disabled />
              </div>
            </div>
            <div class="form-actions">
              <Button label="Save Changes" @click="saveProfile" />
            </div>
          </div>
        </div>
      </TabPanel>

      <!-- Notifications Tab -->
      <TabPanel header="Notifications">
        <div class="settings-section">
          <div class="section-header">
            <h3>Notification Preferences</h3>
            <p>Choose how you want to be notified</p>
          </div>
          <div class="notification-options">
            <div class="option-item">
              <div class="option-info">
                <span class="option-label">Email Notifications</span>
                <span class="option-desc">Receive email updates about your projects</span>
              </div>
              <InputSwitch v-model="notificationSettings.emailNotifications" />
            </div>
            <div class="option-item">
              <div class="option-info">
                <span class="option-label">Project Updates</span>
                <span class="option-desc">Get notified when milestones are completed</span>
              </div>
              <InputSwitch v-model="notificationSettings.projectUpdates" />
            </div>
            <div class="option-item">
              <div class="option-info">
                <span class="option-label">AI Task Completions</span>
                <span class="option-desc">Notify when AI consultants complete analysis</span>
              </div>
              <InputSwitch v-model="notificationSettings.aiCompletions" />
            </div>
            <div class="option-item">
              <div class="option-info">
                <span class="option-label">Weekly Digest</span>
                <span class="option-desc">Receive a weekly summary of all activities</span>
              </div>
              <InputSwitch v-model="notificationSettings.weeklyDigest" />
            </div>
          </div>
        </div>
      </TabPanel>

      <!-- AI Settings Tab -->
      <TabPanel header="AI Preferences">
        <div class="settings-section">
          <div class="section-header">
            <h3>AI Consultant Settings</h3>
            <p>Customize how AI consultants interact with you</p>
          </div>
          <div class="notification-options">
            <div class="option-item">
              <div class="option-info">
                <span class="option-label">Show Work Panel</span>
                <span class="option-desc">Display AI work transparency panel by default</span>
              </div>
              <InputSwitch v-model="aiSettings.showWorkPanel" />
            </div>
            <div class="option-item">
              <div class="option-info">
                <span class="option-label">Auto-Suggestions</span>
                <span class="option-desc">Allow AI to proactively suggest actions</span>
              </div>
              <InputSwitch v-model="aiSettings.autoSuggest" />
            </div>
          </div>
        </div>

        <!-- Tenant Instructions -->
        <div class="settings-section">
          <div class="section-header">
            <h3>Company Context</h3>
            <p>Provide context that helps AI consultants understand your business</p>
          </div>
          <div class="instructions-editor">
            <Textarea 
              placeholder="Example: We are a B2B SaaS company focused on HR technology. We prefer using the Jobs to be Done framework for strategic analysis. Our target market is mid-sized companies in the Nordic region..."
              rows="6"
              class="w-full"
            />
            <div class="instructions-help">
              <i class="pi pi-info-circle"></i>
              <span>This context will be shared with Felix and Sophie to provide more relevant advice.</span>
            </div>
          </div>
        </div>
      </TabPanel>

      <!-- Team Tab -->
      <TabPanel header="Team">
        <div class="settings-section">
          <div class="section-header">
            <h3>Team Members</h3>
            <p>Manage who has access to {{ tenant?.name }}</p>
          </div>
          <div class="team-actions">
            <Button label="Invite Member" icon="pi pi-user-plus" />
          </div>
          <div class="team-list">
            <div v-for="member in teamMembers" :key="member.id" class="team-member-row">
              <div class="member-avatar">
                {{ member.name.split(' ').map(n => n[0]).join('') }}
              </div>
              <div class="member-info">
                <span class="member-name">{{ member.name }}</span>
                <span class="member-email">{{ member.email }}</span>
              </div>
              <div class="member-role">
                <span class="role-badge" :class="member.role.toLowerCase()">{{ member.role }}</span>
              </div>
              <div class="member-actions">
                <Button icon="pi pi-ellipsis-v" text rounded size="small" />
              </div>
            </div>
          </div>
        </div>
      </TabPanel>

      <!-- Integrations Tab -->
      <TabPanel header="Integrations">
        <div class="settings-section">
          <div class="section-header">
            <h3>Connected Services</h3>
            <p>Manage integrations with external services</p>
          </div>
          <div class="integrations-grid">
            <div class="integration-card">
              <div class="integration-icon sharepoint">
                <i class="pi pi-microsoft"></i>
              </div>
              <div class="integration-info">
                <h4>Microsoft SharePoint</h4>
                <p>Sync documents and enable AI access to company files</p>
              </div>
              <Button label="Connect" outlined />
            </div>
            <div class="integration-card">
              <div class="integration-icon teams">
                <i class="pi pi-video"></i>
              </div>
              <div class="integration-info">
                <h4>Microsoft Teams</h4>
                <p>Schedule AI consultant calls and collaborate</p>
              </div>
              <Button label="Connect" outlined />
            </div>
            <div class="integration-card coming-soon">
              <div class="integration-icon slack">
                <i class="pi pi-slack"></i>
              </div>
              <div class="integration-info">
                <h4>Slack</h4>
                <p>Get AI updates and chat directly in Slack</p>
              </div>
              <span class="coming-soon-badge">Coming Soon</span>
            </div>
          </div>
        </div>
      </TabPanel>
    </TabView>
  </div>
</template>

<style scoped>
.settings-page {
  max-width: 900px;
}

.page-header {
  margin-bottom: var(--spacing-xl);
}

.page-header h1 {
  font-size: 1.75rem;
  margin-bottom: var(--spacing-sm);
}

.page-header p {
  color: var(--color-text-secondary);
}

/* Settings Tabs */
.settings-tabs :deep(.p-tabview-panels) {
  padding: var(--spacing-xl) 0;
}

/* Settings Section */
.settings-section {
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
}

.section-header {
  margin-bottom: var(--spacing-xl);
}

.section-header h3 {
  font-size: 1.125rem;
  margin-bottom: var(--spacing-xs);
}

.section-header p {
  color: var(--color-text-secondary);
  font-size: 0.875rem;
}

/* Profile Form */
.profile-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.avatar-section {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
}

.avatar-preview {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--color-brand-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 600;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-lg);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.form-group label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-secondary);
}

.w-full {
  width: 100%;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--color-border-light);
}

/* Notification Options */
.notification-options {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.option-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md);
  background: var(--color-bg-secondary);
  border-radius: var(--radius-md);
}

.option-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.option-label {
  font-weight: 500;
  color: var(--color-text-primary);
}

.option-desc {
  font-size: 0.8125rem;
  color: var(--color-text-tertiary);
}

/* Instructions Editor */
.instructions-editor {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.instructions-help {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: 0.8125rem;
  color: var(--color-text-tertiary);
}

.instructions-help i {
  color: var(--color-brand-primary);
}

/* Team */
.team-actions {
  margin-bottom: var(--spacing-lg);
}

.team-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.team-member-row {
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

.member-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.member-name {
  font-weight: 500;
}

.member-email {
  font-size: 0.8125rem;
  color: var(--color-text-tertiary);
}

.role-badge {
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 500;
}

.role-badge.admin {
  background: var(--color-brand-primary-light);
  color: var(--color-brand-primary);
}

.role-badge.member {
  background: var(--color-bg-tertiary);
  color: var(--color-text-secondary);
}

/* Integrations */
.integrations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-lg);
}

.integration-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--spacing-xl);
  background: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
  gap: var(--spacing-md);
}

.integration-card.coming-soon {
  opacity: 0.7;
}

.integration-icon {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
}

.integration-icon.sharepoint { background: #0078d4; }
.integration-icon.teams { background: #6264a7; }
.integration-icon.slack { background: #4a154b; }

.integration-info h4 {
  font-size: 1rem;
  margin-bottom: var(--spacing-xs);
}

.integration-info p {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
}

.coming-soon-badge {
  padding: var(--spacing-xs) var(--spacing-sm);
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  color: var(--color-text-tertiary);
}

/* Responsive */
@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
