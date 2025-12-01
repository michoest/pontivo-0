<script setup>
import { watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { useProjectsStore } from '../stores/projects'

const route = useRoute()
const projectsStore = useProjectsStore()

watch(() => route.params.projectId, (projectId) => {
  if (projectId) {
    projectsStore.setCurrentProject(projectId)
  }
}, { immediate: true })
</script>

<template>
  <div class="project-view">
    <RouterView />
  </div>
</template>

<style scoped>
.project-view {
  min-height: 100%;
}
</style>
