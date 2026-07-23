<script setup>
import { projects } from '../data/portfolio.js'
import ArticleItem from './ArticleItem.vue'
import FallingPetals from './FallingPetals.vue'
</script>

<template>
  <section id="projects" class="section projects">
    <FallingPetals />
    <div class="wrap">
      <p class="eyebrow">Ongoing</p>
      <h2 class="section-title">Projects</h2>
    </div>

    <div class="article-list">
      <Transition
        v-for="(project, i) in projects"
        :key="project.id"
        appear
        :name="i % 2 === 0 ? 'slide-r' : 'slide-l'"
      >
        <div
          class="article-row"
          :class="project.imgPosition === 'right' ? 'img-right-row' : 'img-left-row'"
          :style="{ transitionDelay: (i * 120) + 'ms' }"
        >
          <ArticleItem
            :title="project.name"
            :eyebrow="project.tag"
            :image="project.image"
            :img-position="project.imgPosition"
          >
            <p>{{ project.description }}</p>
            <ul class="tasting-notes">
              <li v-for="note in project.tastingNotes" :key="note">{{ note }}</li>
            </ul>
            <ul class="article-links">
              <li v-for="link in project.links" :key="link.text">
                <a :href="link.href" target="_blank" rel="noopener">{{ link.text }}</a>
              </li>
            </ul>
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
.article-row.img-left-row { margin-left: 0; }
.article-row.img-right-row { margin-right: 0; }

.tasting-notes {
  list-style: none;
  margin: 14px 0 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.tasting-notes li {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.02em;
  padding: 3px 8px;
  border: 1px solid var(--roast-light);
  border-radius: 999px;
  color: var(--kraft);
}

.article-links {
  list-style: none;
  margin: 12px 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.article-links a {
  font-size: 0.86rem;
  color: var(--cinnamon-bright);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.article-links a:hover { color: var(--gold); }
</style>
