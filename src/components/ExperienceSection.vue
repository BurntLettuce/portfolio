<script setup>
import { experience } from '../data/portfolio.js'
import ArticleItem from './ArticleItem.vue'
import FallingPetals from './FallingPetals.vue'
</script>

<template>
  <section id="experience" class="section experience">
   <FallingPetals />
   <div class="wrap">
    <h2 class="section-title">Experience</h2>
   </div>

   <div class="article-list">
    <Transition
      v-for="(entry, i) in experience"
      :key="entry.id"
      appear
      :name="i % 2 === 0 ? 'slide-r' : 'slide-l'"
    >
      <div class="article-row" :style="{ transitionDelay: (i * 120) + 'ms' }">
        <ArticleItem
          :title="entry.role"
          :eyebrow="entry.place"
          no-media
        >
          <p>{{ entry.detail }}</p>
          <p class="period">{{ entry.period }}</p>
        </ArticleItem>
      </div>
    </Transition>
   </div>
  </section>
</template>

<style scoped>
.article-list { margin-top: 8px; }

.article-row {
  background: rgba(22, 19, 26, 0.72);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  margin: 0 30px 30px;
  border-radius: 4px;
  overflow: hidden;
}

.period {
  margin-top: 10px;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--gold);
}
</style>
