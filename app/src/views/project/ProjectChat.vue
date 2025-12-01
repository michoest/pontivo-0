<script setup>
import { ref, computed, nextTick, watch } from 'vue'
import { useProjectsStore } from '../../stores/projects'
import { useChatStore } from '../../stores/chat'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Avatar from 'primevue/avatar'

const projectsStore = useProjectsStore()
const chatStore = useChatStore()

const project = computed(() => projectsStore.currentProject)
const messages = computed(() => chatStore.getProjectConversation(projectsStore.currentProjectId))
const currentPersona = computed(() => chatStore.currentPersona)

const messageInput = ref('')
const messagesContainer = ref(null)
const showWorkPanel = ref(true)

// Mock AI work status
const aiWorkStatus = ref({
  isWorking: false,
  currentTask: 'Analyzing competitive landscape',
  progress: 65,
  steps: [
    { id: 1, label: 'Retrieving company profile', status: 'completed' },
    { id: 2, label: 'Analyzing industry report', status: 'completed' },
    { id: 3, label: 'Identifying key competitors', status: 'completed' },
    { id: 4, label: 'Gathering public market data', status: 'in-progress' },
    { id: 5, label: 'Synthesizing positioning matrix', status: 'pending' },
    { id: 6, label: 'Generating recommendations', status: 'pending' }
  ],
  sources: [
    { name: 'Company Profile.docx', type: 'sharepoint', path: 'SharePoint > Strategy' },
    { name: 'Nordic Market Report 2024.pdf', type: 'file', path: 'Uploaded files' },
    { name: 'Crunchbase - Competitor Data', type: 'web', path: 'External source' }
  ]
})

async function sendMessage() {
  if (!messageInput.value.trim()) return
  
  const content = messageInput.value
  messageInput.value = ''
  
  // Simulate AI working
  aiWorkStatus.value.isWorking = true
  
  await chatStore.sendMessage(projectsStore.currentProjectId, content)
  
  aiWorkStatus.value.isWorking = false
  
  // Scroll to bottom
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

function selectPersona(personaId) {
  chatStore.setActivePersona(personaId)
}

function formatTime(timestamp) {
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now - date
  
  if (diff < 60000) return 'Just now'
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
  return date.toLocaleDateString()
}

function getStepIcon(status) {
  if (status === 'completed') return 'pi pi-check-circle'
  if (status === 'in-progress') return 'pi pi-spin pi-spinner'
  return 'pi pi-circle'
}

function getSourceIcon(type) {
  if (type === 'sharepoint') return 'pi pi-microsoft'
  if (type === 'file') return 'pi pi-file'
  if (type === 'web') return 'pi pi-globe'
  return 'pi pi-file'
}
</script>

<template>
  <div class="project-chat" v-if="project">
    <!-- Chat Header -->
    <div class="chat-header">
      <div class="header-left">
        <h1>AI Consultant</h1>
        <p>Chat with your AI advisors for {{ project.name }}</p>
      </div>
      <div class="header-right">
        <Button 
          :icon="showWorkPanel ? 'pi pi-eye-slash' : 'pi pi-eye'"
          :label="showWorkPanel ? 'Hide Work Panel' : 'Show Work Panel'"
          text
          @click="showWorkPanel = !showWorkPanel"
        />
      </div>
    </div>

    <div class="chat-layout">
      <!-- Main Chat Area -->
      <div class="chat-main">
        <!-- Persona Selector -->
        <div class="persona-selector">
          <div 
            v-for="(persona, id) in chatStore.personas" 
            :key="id"
            class="persona-option"
            :class="{ active: chatStore.activePersona === id, [id]: true }"
            @click="selectPersona(id)"
          >
            <div class="persona-avatar-small" :class="id">
              <i :class="persona.icon"></i>
            </div>
            <div class="persona-info">
              <div class="persona-name">{{ persona.name }}</div>
              <div class="persona-role">{{ persona.role }}</div>
            </div>
            <div class="persona-indicator" v-if="chatStore.activePersona === id">
              <i class="pi pi-check"></i>
            </div>
          </div>
        </div>

        <!-- Messages Area -->
        <div class="messages-area" ref="messagesContainer">
          <!-- Welcome Message -->
          <div class="welcome-message" v-if="messages.length === 0">
            <div class="welcome-avatar" :class="chatStore.activePersona">
              <i :class="currentPersona.icon"></i>
            </div>
            <h3>Hello! I'm {{ currentPersona.name }}</h3>
            <p>{{ currentPersona.description }}</p>
            <div class="quick-actions">
              <Button label="Project Status" icon="pi pi-chart-bar" outlined size="small" />
              <Button label="Recent Updates" icon="pi pi-history" outlined size="small" />
              <Button label="Next Steps" icon="pi pi-arrow-right" outlined size="small" />
            </div>
          </div>

          <!-- Messages -->
          <div 
            v-for="message in messages" 
            :key="message.id"
            class="message"
            :class="{ 
              'user': message.type === 'user', 
              'ai': message.type === 'ai',
              [message.persona]: message.persona 
            }"
          >
            <!-- AI Avatar -->
            <div class="message-avatar" v-if="message.type === 'ai'" :class="message.persona">
              <i :class="chatStore.personas[message.persona]?.icon || 'pi pi-android'"></i>
            </div>

            <!-- Message Content -->
            <div class="message-bubble">
              <div class="message-header" v-if="message.type === 'ai'">
                <span class="sender-name">{{ chatStore.personas[message.persona]?.name }}</span>
                <span class="message-time">{{ formatTime(message.timestamp) }}</span>
              </div>
              <div class="message-content" v-html="message.content.replace(/\n/g, '<br>')"></div>
              
              <!-- Sources -->
              <div class="message-sources" v-if="message.sources?.length">
                <div class="sources-header">
                  <i class="pi pi-link"></i>
                  <span>Sources used</span>
                </div>
                <div class="sources-list">
                  <div 
                    v-for="(source, index) in message.sources" 
                    :key="index"
                    class="source-item"
                  >
                    <i :class="source.type === 'document' ? 'pi pi-file' : source.type === 'file' ? 'pi pi-file-excel' : 'pi pi-users'"></i>
                    <span>{{ source.name }}</span>
                  </div>
                </div>
              </div>

              <!-- Artifacts -->
              <div class="message-artifacts" v-if="message.artifacts?.length">
                <div class="artifacts-header">
                  <i class="pi pi-file-pdf"></i>
                  <span>Generated documents</span>
                </div>
                <div class="artifacts-list">
                  <div 
                    v-for="(artifact, index) in message.artifacts" 
                    :key="index"
                    class="artifact-item"
                  >
                    <i class="pi pi-file-pdf"></i>
                    <span>{{ artifact.name }}</span>
                    <Button icon="pi pi-download" text size="small" rounded />
                  </div>
                </div>
              </div>
            </div>

            <!-- User Avatar -->
            <div class="message-avatar user" v-if="message.type === 'user'">
              <i class="pi pi-user"></i>
            </div>
          </div>

          <!-- Typing Indicator -->
          <div class="message ai typing" :class="chatStore.activePersona" v-if="chatStore.isTyping">
            <div class="message-avatar" :class="chatStore.activePersona">
              <i :class="currentPersona.icon"></i>
            </div>
            <div class="message-bubble">
              <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>

        <!-- Input Area -->
        <div class="input-area">
          <div class="input-wrapper">
            <div class="active-persona-indicator" :class="chatStore.activePersona">
              <i :class="currentPersona.icon"></i>
              <span>Talking to {{ currentPersona.name }}</span>
            </div>
            <div class="input-row">
              <InputText 
                v-model="messageInput"
                placeholder="Type your message..."
                class="message-input"
                @keyup.enter="sendMessage"
              />
              <Button 
                icon="pi pi-send" 
                @click="sendMessage"
                :disabled="!messageInput.trim()"
              />
            </div>
            <div class="input-hints">
              <span>Press Enter to send</span>
              <span>•</span>
              <span>{{ currentPersona.name }} can access your project documents</span>
            </div>
          </div>
        </div>
      </div>

      <!-- AI Work Panel -->
      <div class="work-panel" v-if="showWorkPanel">
        <div class="work-panel-header">
          <h3>AI Work View</h3>
          <span class="work-status" :class="{ active: aiWorkStatus.isWorking }">
            <span class="status-dot"></span>
            {{ aiWorkStatus.isWorking ? 'Working...' : 'Idle' }}
          </span>
        </div>

        <div class="work-panel-content" v-if="aiWorkStatus.isWorking || true">
          <!-- Current Task -->
          <div class="work-section">
            <div class="section-label">Current Task</div>
            <div class="current-task">
              <span>{{ aiWorkStatus.currentTask }}</span>
              <div class="task-progress">
                <div class="progress-bar">
                  <div 
                    class="progress-bar-fill" 
                    :style="{ width: aiWorkStatus.progress + '%' }"
                  ></div>
                </div>
                <span class="progress-value">{{ aiWorkStatus.progress }}%</span>
              </div>
            </div>
          </div>

          <!-- Steps -->
          <div class="work-section">
            <div class="section-label">Steps</div>
            <div class="steps-list">
              <div 
                v-for="step in aiWorkStatus.steps" 
                :key="step.id"
                class="step-item"
                :class="step.status"
              >
                <i :class="getStepIcon(step.status)"></i>
                <span>{{ step.label }}</span>
              </div>
            </div>
          </div>

          <!-- Sources -->
          <div class="work-section">
            <div class="section-label">Sources Being Used</div>
            <div class="sources-list-panel">
              <div 
                v-for="(source, index) in aiWorkStatus.sources" 
                :key="index"
                class="source-panel-item"
              >
                <div class="source-icon" :class="source.type">
                  <i :class="getSourceIcon(source.type)"></i>
                </div>
                <div class="source-info">
                  <div class="source-name">{{ source.name }}</div>
                  <div class="source-path">{{ source.path }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="work-panel-empty" v-else>
          <i class="pi pi-inbox"></i>
          <p>No active work</p>
          <span>Start a conversation to see AI work in progress</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.project-chat {
  display: flex;
  flex-direction: column;
  height: calc(100vh - var(--header-height) - var(--spacing-xl) * 2);
}

/* Chat Header */
.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-lg);
}

.header-left h1 {
  font-size: 1.75rem;
  margin-bottom: var(--spacing-xs);
}

.header-left p {
  color: var(--color-text-secondary);
}

/* Chat Layout */
.chat-layout {
  display: flex;
  gap: var(--spacing-lg);
  flex: 1;
  min-height: 0;
}

/* Main Chat */
.chat-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-xl);
  overflow: hidden;
}

/* Persona Selector */
.persona-selector {
  display: flex;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--color-border-light);
  background: var(--color-bg-secondary);
}

.persona-option {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-fast);
  border: 2px solid transparent;
  flex: 1;
}

.persona-option:hover {
  background: var(--color-bg-primary);
}

.persona-option.active {
  background: var(--color-bg-primary);
  box-shadow: var(--shadow-md);
}

.persona-option.active.felix {
  border-color: var(--color-felix);
}

.persona-option.active.sophie {
  border-color: var(--color-sophie);
}

.persona-avatar-small {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.125rem;
}

.persona-avatar-small.felix {
  background: linear-gradient(135deg, var(--color-felix-light), var(--color-felix));
  color: white;
}

.persona-avatar-small.sophie {
  background: linear-gradient(135deg, var(--color-sophie-light), var(--color-sophie));
  color: white;
}

.persona-info {
  flex: 1;
}

.persona-name {
  font-weight: 600;
  font-size: 0.9375rem;
}

.persona-role {
  font-size: 0.75rem;
  color: var(--color-text-tertiary);
}

.persona-indicator {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--color-success);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
}

/* Messages Area */
.messages-area {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-xl);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

/* Welcome Message */
.welcome-message {
  text-align: center;
  padding: var(--spacing-2xl);
  max-width: 500px;
  margin: auto;
}

.welcome-avatar {
  width: 80px;
  height: 80px;
  border-radius: var(--radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin: 0 auto var(--spacing-lg);
}

.welcome-avatar.felix {
  background: linear-gradient(135deg, var(--color-felix-light), var(--color-felix));
  color: white;
}

.welcome-avatar.sophie {
  background: linear-gradient(135deg, var(--color-sophie-light), var(--color-sophie));
  color: white;
}

.welcome-message h3 {
  font-size: 1.5rem;
  margin-bottom: var(--spacing-sm);
}

.welcome-message p {
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-xl);
}

.quick-actions {
  display: flex;
  gap: var(--spacing-sm);
  justify-content: center;
  flex-wrap: wrap;
}

/* Message Styles */
.message {
  display: flex;
  gap: var(--spacing-md);
  max-width: 80%;
}

.message.user {
  flex-direction: row-reverse;
  margin-left: auto;
}

.message-avatar {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.message-avatar.felix {
  background: linear-gradient(135deg, var(--color-felix-light), var(--color-felix));
  color: white;
}

.message-avatar.sophie {
  background: linear-gradient(135deg, var(--color-sophie-light), var(--color-sophie));
  color: white;
}

.message-avatar.user {
  background: var(--color-brand-primary);
  color: white;
}

.message-bubble {
  background: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md) var(--spacing-lg);
}

.message.user .message-bubble {
  background: var(--color-brand-primary);
  color: white;
}

.message.felix .message-bubble {
  border-left: 3px solid var(--color-felix);
}

.message.sophie .message-bubble {
  border-left: 3px solid var(--color-sophie);
}

.message-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-sm);
}

.sender-name {
  font-weight: 600;
  font-size: 0.875rem;
}

.message-time {
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.message-content {
  font-size: 0.9375rem;
  line-height: 1.6;
}

/* Sources in messages */
.message-sources,
.message-artifacts {
  margin-top: var(--spacing-md);
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--color-border-light);
}

.sources-header,
.artifacts-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: 0.75rem;
  color: var(--color-text-tertiary);
  margin-bottom: var(--spacing-sm);
}

.sources-list,
.artifacts-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.source-item,
.artifact-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: 0.8125rem;
  padding: var(--spacing-xs) var(--spacing-sm);
  background: var(--color-bg-primary);
  border-radius: var(--radius-sm);
}

/* Typing Indicator */
.typing-indicator {
  display: flex;
  gap: 4px;
  padding: var(--spacing-sm) 0;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-text-muted);
  animation: typing 1.4s infinite ease-in-out;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-8px); }
}

/* Input Area */
.input-area {
  padding: var(--spacing-lg);
  border-top: 1px solid var(--color-border-light);
  background: var(--color-bg-secondary);
}

.input-wrapper {
  max-width: 800px;
  margin: 0 auto;
}

.active-persona-indicator {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: 0.8125rem;
  color: var(--color-text-tertiary);
  margin-bottom: var(--spacing-sm);
}

.active-persona-indicator i {
  width: 20px;
  height: 20px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
}

.active-persona-indicator.felix i {
  background: var(--color-felix);
  color: white;
}

.active-persona-indicator.sophie i {
  background: var(--color-sophie);
  color: white;
}

.input-row {
  display: flex;
  gap: var(--spacing-sm);
}

.message-input {
  flex: 1;
}

.input-hints {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: 0.75rem;
  color: var(--color-text-muted);
  margin-top: var(--spacing-sm);
}

/* Work Panel */
.work-panel {
  width: 320px;
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-xl);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.work-panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--color-border-light);
}

.work-panel-header h3 {
  font-size: 1rem;
}

.work-status {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-text-muted);
}

.work-status.active .status-dot {
  background: var(--color-success);
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.work-panel-content {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-lg);
}

.work-section {
  margin-bottom: var(--spacing-xl);
}

.work-section:last-child {
  margin-bottom: 0;
}

.section-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--spacing-sm);
}

.current-task {
  padding: var(--spacing-md);
  background: var(--color-bg-secondary);
  border-radius: var(--radius-md);
}

.current-task > span {
  font-weight: 500;
  font-size: 0.9375rem;
  display: block;
  margin-bottom: var(--spacing-sm);
}

.task-progress {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.task-progress .progress-bar {
  flex: 1;
}

.progress-value {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text-secondary);
}

/* Steps List */
.steps-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.step-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: 0.875rem;
  padding: var(--spacing-xs) 0;
}

.step-item.completed {
  color: var(--color-success);
}

.step-item.in-progress {
  color: var(--color-brand-primary);
  font-weight: 500;
}

.step-item.pending {
  color: var(--color-text-muted);
}

/* Sources Panel */
.sources-list-panel {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.source-panel-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-sm);
  background: var(--color-bg-secondary);
  border-radius: var(--radius-md);
}

.source-icon {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
}

.source-icon.sharepoint {
  background: #038387;
  color: white;
}

.source-icon.file {
  background: var(--color-info-light);
  color: var(--color-info);
}

.source-icon.web {
  background: var(--color-warning-light);
  color: var(--color-warning);
}

.source-info {
  flex: 1;
  min-width: 0;
}

.source-name {
  font-size: 0.8125rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.source-path {
  font-size: 0.6875rem;
  color: var(--color-text-muted);
}

/* Empty State */
.work-panel-empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--spacing-xl);
  color: var(--color-text-muted);
}

.work-panel-empty i {
  font-size: 2rem;
  margin-bottom: var(--spacing-md);
}

.work-panel-empty p {
  font-weight: 500;
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-xs);
}

.work-panel-empty span {
  font-size: 0.8125rem;
}

/* Responsive */
@media (max-width: 1200px) {
  .work-panel {
    display: none;
  }
}

@media (max-width: 768px) {
  .persona-selector {
    flex-direction: column;
  }
  
  .message {
    max-width: 90%;
  }
}
</style>
