<script setup>
import { ref, provide } from 'vue'
import GlobalNav from './components/GlobalNav.vue'
import TopPage from './components/TopPage.vue'
import AboutSection from './components/AboutSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import ContactSection from './components/ContactSection.vue'
import { pages } from './data/nav.js'

const STORAGE_KEY = 'currentPage'
const validIds = pages.map((p) => p.id)

function initialPage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return validIds.includes(stored) ? stored : 'top'
  } catch {
    return 'top'
  }
}

const currentPage = ref(initialPage())
provide('currentPage', currentPage)
const mainEl = ref(null)

function navigateTo(id) {
  if (id === currentPage.value) return
  if (mainEl.value) mainEl.value.scrollTop = 0
  currentPage.value = id
  try {
    localStorage.setItem(STORAGE_KEY, id)
  } catch {
  }
}
provide('navigateTo', navigateTo)
</script>

<template>
  <GlobalNav />
  <main ref="mainEl">
    <Transition name="page-fade" mode="out-in">
      <TopPage v-if="currentPage === 'top'" key="top" />
      <AboutSection v-else-if="currentPage === 'about'" key="about" />
      <ProjectsSection v-else-if="currentPage === 'projects'" key="projects" />
      <ExperienceSection v-else-if="currentPage === 'experience'" key="experience" />
      <ContactSection v-else-if="currentPage === 'contact'" key="contact" />
    </Transition>
  </main>
</template>

<style>
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.25s ease;
}
.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
}
@media (prefers-reduced-motion: reduce) {
  .page-fade-enter-active,
  .page-fade-leave-active {
    transition: none;
  }
}
</style>
