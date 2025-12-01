<script setup>
import { ref, computed } from 'vue'
import { useProjectsStore } from '../../stores/projects'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'

const projectsStore = useProjectsStore()

const project = computed(() => projectsStore.currentProject)
const files = computed(() => projectsStore.projectFiles)

const searchQuery = ref('')
const selectedFolder = ref(null)
const viewMode = ref('list')

const folders = computed(() => {
  const folderSet = new Set(files.value.map(f => f.folder))
  return [{ label: 'All Files', value: null }, ...Array.from(folderSet).map(f => ({ label: f, value: f }))]
})

const filteredFiles = computed(() => {
  let result = files.value

  if (selectedFolder.value) {
    result = result.filter(f => f.folder === selectedFolder.value)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(f => f.name.toLowerCase().includes(query))
  }

  return result
})

const filesByFolder = computed(() => {
  const grouped = {}
  filteredFiles.value.forEach(file => {
    if (!grouped[file.folder]) {
      grouped[file.folder] = []
    }
    grouped[file.folder].push(file)
  })
  return grouped
})

function getFileIcon(type) {
  const icons = {
    pdf: 'pi pi-file-pdf',
    xlsx: 'pi pi-file-excel',
    docx: 'pi pi-file-word',
    pptx: 'pi pi-file'
  }
  return icons[type] || 'pi pi-file'
}

function getFileClass(type) {
  return type
}

function getCreatorBadge(createdBy) {
  if (createdBy === 'felix') return { name: 'Felix', class: 'felix' }
  if (createdBy === 'sophie') return { name: 'Sophie', class: 'sophie' }
  return { name: 'User', class: 'user' }
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}
</script>

<template>
  <div class="project-files" v-if="project">
    <!-- Page Header -->
    <div class="page-header">
      <div class="header-content">
        <h1>Files & Documents</h1>
        <p>Manage documents for {{ project.name }}</p>
      </div>
      <div class="header-actions">
        <Button label="Upload File" icon="pi pi-upload" />
      </div>
    </div>

    <!-- Toolbar -->
    <div class="files-toolbar">
      <div class="toolbar-left">
        <span class="p-input-icon-left">
          <i class="pi pi-search"></i>
          <InputText v-model="searchQuery" placeholder="Search files..." class="search-input" />
        </span>
        <Dropdown 
          v-model="selectedFolder" 
          :options="folders" 
          optionLabel="label"
          optionValue="value"
          placeholder="All Folders"
          class="folder-dropdown"
        />
      </div>
      <div class="toolbar-right">
        <div class="view-toggle">
          <Button 
            icon="pi pi-list" 
            :text="viewMode !== 'list'"
            :severity="viewMode === 'list' ? 'primary' : 'secondary'"
            @click="viewMode = 'list'"
          />
          <Button 
            icon="pi pi-th-large" 
            :text="viewMode !== 'grid'"
            :severity="viewMode === 'grid' ? 'primary' : 'secondary'"
            @click="viewMode = 'grid'"
          />
        </div>
      </div>
    </div>

    <!-- Files Content -->
    <div class="files-content">
      <!-- List View -->
      <div class="files-list-view" v-if="viewMode === 'list'">
        <div 
          v-for="(folderFiles, folderName) in filesByFolder" 
          :key="folderName"
          class="folder-section"
        >
          <div class="folder-header">
            <i class="pi pi-folder"></i>
            <span>{{ folderName }}</span>
            <span class="file-count">{{ folderFiles.length }} files</span>
          </div>
          
          <div class="files-table">
            <div class="table-header">
              <div class="col-name">Name</div>
              <div class="col-size">Size</div>
              <div class="col-created">Created By</div>
              <div class="col-date">Date</div>
              <div class="col-actions"></div>
            </div>
            
            <div 
              v-for="file in folderFiles" 
              :key="file.id"
              class="table-row"
            >
              <div class="col-name">
                <div class="file-icon" :class="getFileClass(file.type)">
                  <i :class="getFileIcon(file.type)"></i>
                </div>
                <span class="file-name">{{ file.name }}</span>
              </div>
              <div class="col-size">{{ file.size }}</div>
              <div class="col-created">
                <span class="creator-badge" :class="getCreatorBadge(file.createdBy).class">
                  {{ getCreatorBadge(file.createdBy).name }}
                </span>
              </div>
              <div class="col-date">{{ formatDate(file.createdAt) }}</div>
              <div class="col-actions">
                <Button icon="pi pi-download" text rounded size="small" v-tooltip.top="'Download'" />
                <Button icon="pi pi-ellipsis-v" text rounded size="small" v-tooltip.top="'More'" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Grid View -->
      <div class="files-grid-view" v-else>
        <div 
          v-for="(folderFiles, folderName) in filesByFolder" 
          :key="folderName"
          class="folder-section"
        >
          <div class="folder-header">
            <i class="pi pi-folder"></i>
            <span>{{ folderName }}</span>
            <span class="file-count">{{ folderFiles.length }} files</span>
          </div>
          
          <div class="files-grid">
            <div 
              v-for="file in folderFiles" 
              :key="file.id"
              class="file-card"
            >
              <div class="file-card-preview" :class="getFileClass(file.type)">
                <i :class="getFileIcon(file.type)"></i>
              </div>
              <div class="file-card-info">
                <div class="file-name" :title="file.name">{{ file.name }}</div>
                <div class="file-meta">
                  <span class="creator-badge small" :class="getCreatorBadge(file.createdBy).class">
                    {{ getCreatorBadge(file.createdBy).name }}
                  </span>
                  <span class="file-size">{{ file.size }}</span>
                </div>
              </div>
              <div class="file-card-actions">
                <Button icon="pi pi-download" text rounded size="small" />
                <Button icon="pi pi-ellipsis-v" text rounded size="small" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div class="empty-state" v-if="filteredFiles.length === 0">
        <i class="pi pi-folder-open"></i>
        <h3>No files found</h3>
        <p>{{ searchQuery ? 'Try a different search term' : 'Upload files to get started' }}</p>
        <Button label="Upload File" icon="pi pi-upload" />
      </div>
    </div>

    <!-- Integration Notice -->
    <div class="integration-notice card">
      <div class="notice-icon">
        <i class="pi pi-microsoft"></i>
      </div>
      <div class="notice-content">
        <h4>SharePoint Integration Available</h4>
        <p>Connect your SharePoint to sync documents automatically and enable AI access to your company files.</p>
      </div>
      <Button label="Connect SharePoint" outlined />
    </div>
  </div>
</template>

<style scoped>
.project-files {
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

/* Toolbar */
.files-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-lg);
}

.toolbar-left {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.search-input {
  width: 280px;
}

.folder-dropdown {
  width: 180px;
}

.view-toggle {
  display: flex;
  gap: 2px;
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-md);
  padding: 2px;
}

/* Files Content */
.files-content {
  min-height: 400px;
}

/* Folder Section */
.folder-section {
  margin-bottom: var(--spacing-xl);
}

.folder-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) 0;
  margin-bottom: var(--spacing-md);
  font-weight: 600;
  color: var(--color-text-primary);
}

.folder-header i {
  color: var(--color-warning);
}

.file-count {
  font-size: 0.8125rem;
  font-weight: 400;
  color: var(--color-text-muted);
  margin-left: auto;
}

/* List View */
.files-table {
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.table-header {
  display: grid;
  grid-template-columns: 1fr 100px 120px 120px 80px;
  gap: var(--spacing-md);
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--color-bg-secondary);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.table-row {
  display: grid;
  grid-template-columns: 1fr 100px 120px 120px 80px;
  gap: var(--spacing-md);
  padding: var(--spacing-md) var(--spacing-lg);
  border-bottom: 1px solid var(--color-border-light);
  align-items: center;
  transition: background var(--transition-fast);
}

.table-row:last-child {
  border-bottom: none;
}

.table-row:hover {
  background: var(--color-bg-secondary);
}

.col-name {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  min-width: 0;
}

.file-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  flex-shrink: 0;
}

.file-icon.pdf { background: #fee2e2; color: #ef4444; }
.file-icon.xlsx { background: #d1fae5; color: #10b981; }
.file-icon.docx { background: #dbeafe; color: #3b82f6; }
.file-icon.pptx { background: #fed7aa; color: #f97316; }

.file-name {
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.col-size,
.col-date {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

.creator-badge {
  display: inline-flex;
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 500;
}

.creator-badge.felix {
  background: var(--color-felix-light);
  color: var(--color-felix);
}

.creator-badge.sophie {
  background: var(--color-sophie-light);
  color: var(--color-sophie);
}

.creator-badge.user {
  background: var(--color-bg-tertiary);
  color: var(--color-text-secondary);
}

.col-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-xs);
}

/* Grid View */
.files-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--spacing-md);
}

.file-card {
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all var(--transition-fast);
  cursor: pointer;
}

.file-card:hover {
  box-shadow: var(--shadow-md);
  border-color: var(--color-brand-primary);
}

.file-card-preview {
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
}

.file-card-preview.pdf { background: #fee2e2; color: #ef4444; }
.file-card-preview.xlsx { background: #d1fae5; color: #10b981; }
.file-card-preview.docx { background: #dbeafe; color: #3b82f6; }
.file-card-preview.pptx { background: #fed7aa; color: #f97316; }

.file-card-info {
  padding: var(--spacing-md);
}

.file-card-info .file-name {
  font-weight: 500;
  font-size: 0.875rem;
  margin-bottom: var(--spacing-sm);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.file-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.creator-badge.small {
  font-size: 0.6875rem;
  padding: 0.125rem 0.375rem;
}

.file-size {
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.file-card-actions {
  display: flex;
  justify-content: flex-end;
  padding: var(--spacing-sm) var(--spacing-md);
  border-top: 1px solid var(--color-border-light);
  background: var(--color-bg-secondary);
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: var(--spacing-2xl);
}

.empty-state i {
  font-size: 4rem;
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-lg);
}

.empty-state h3 {
  margin-bottom: var(--spacing-sm);
}

.empty-state p {
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-lg);
}

/* Integration Notice */
.integration-notice {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  padding: var(--spacing-lg);
  background: linear-gradient(135deg, #f0fdf4 0%, white 100%);
  border-color: var(--color-success-light);
}

.notice-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-lg);
  background: #038387;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.notice-content {
  flex: 1;
}

.notice-content h4 {
  font-size: 1rem;
  margin-bottom: var(--spacing-xs);
}

.notice-content p {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

/* Responsive */
@media (max-width: 900px) {
  .table-header,
  .table-row {
    grid-template-columns: 1fr 80px 80px;
  }
  
  .col-size,
  .col-date {
    display: none;
  }
  
  .files-toolbar {
    flex-direction: column;
    align-items: stretch;
  }
  
  .toolbar-left {
    flex-wrap: wrap;
  }
  
  .search-input {
    width: 100%;
  }
}
</style>
