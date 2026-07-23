<script setup>
import PlaceholderMedia from './PlaceholderMedia.vue'

defineProps({
  title: { type: String, default: '' },
  eyebrow: { type: String, default: '' },
  image: { type: String, default: '' },
  imgPosition: { type: String, default: 'left' }, // 'left' | 'right'
  noMedia: { type: Boolean, default: false },
})
</script>

<template>
  <article class="article-item" :class="[`img-${imgPosition}`, { 'no-media': noMedia }]">
    <div v-if="!noMedia" class="article-media">
      <img v-if="image" :src="image" :alt="title" class="media-img" />
      <PlaceholderMedia v-else :label="title" />
      <div v-if="title" class="title-in-image">{{ title }}</div>
    </div>
    <div class="article-body">
      <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
      <h3 v-if="title">{{ title }}</h3>
      <div class="article-content"><slot /></div>
    </div>
  </article>
</template>

<style scoped>
.article-item {
  display: grid;
  grid-template-columns: minmax(260px, 0.85fr) 1.15fr;
  align-items: center;
}

.article-item.img-right {
  grid-template-columns: 1.15fr minmax(260px, 0.85fr);
}
.article-item.no-media {
  grid-template-columns: 1fr;
}

.article-media { order: 1; }
.article-body { order: 2; }
.article-item.img-right .article-media { order: 2; }
.article-item.img-right .article-body { order: 1; }

.article-media {
  position: relative;
  width: 100%;
  aspect-ratio: 2.1 / 1;
  max-height: 260px;
  overflow: hidden;
}
.media-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.title-in-image {
  position: absolute;
  bottom: 8px;
  right: 10px;
  max-width: 85%;
  text-align: right;
  color: rgba(255,255,255,0.5);
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.3rem;
  line-height: 1.15;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.article-body {
  padding: 28px clamp(20px, 5vw, 64px);
}
.article-item.img-right .article-body {
  padding: 28px clamp(20px, 5vw, 64px);
}

.article-body h3 {
  font-size: 1.3rem;
  margin-top: 2px;
}

.article-content {
  margin-top: 10px;
  color: var(--smoke);
  font-size: 0.94rem;
  line-height: 1.6;
}

@media (max-width: 720px) {
  .article-item,
  .article-item.img-right {
    grid-template-columns: 1fr;
  }
  .article-item .article-media,
  .article-item.img-right .article-media { order: 1; }
  .article-item .article-body,
  .article-item.img-right .article-body { order: 2; }
  .article-media { aspect-ratio: 16 / 10; max-height: 220px; }
}
</style>
