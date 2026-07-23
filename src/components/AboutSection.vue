<script setup>
import { about } from '../data/portfolio.js'
import { asset } from '../utils/asset.js'
import ProfileIcon from './ProfileIcon.vue'
import ArticleItem from './ArticleItem.vue'
import NowPlayingLastfm from './NowPlayingLastfm.vue'
import FallingPetals from './FallingPetals.vue'
</script>

<template>
  <section id="about" class="section about">
   <FallingPetals />
   <div class="wrap">
    <div class="about-header">
      <ProfileIcon :icon-src="asset('images/profile.jpg')" :size="108" />
      <NowPlayingLastfm class="lf-slot" />
    </div>
   </div>

   <Transition appear name="slide-r">
    <div class="article-row">
      <ArticleItem
        :title="about.title"
        :eyebrow="about.tag"
        :image="about.image"
      >
        <ul class="skills-list">
          <li v-for="skill in about.skills" :key="skill">{{ skill }}</li>
        </ul>
      </ArticleItem>
    </div>
   </Transition>
  </section>
</template>

<style scoped>
.about-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-bottom: 12px;
}

.lf-slot { width: 100%; max-width: 360px; }

.skills-list {
  margin: 0;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.skills-list li {
  font-size: 0.9rem;
  line-height: 1.5;
}

.article-row { background: rgba(22, 19, 26, 0.72); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); margin: 0 30px 30px; border-radius: 4px; overflow: hidden; }
</style>
