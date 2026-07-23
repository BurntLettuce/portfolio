<script setup>
defineProps({
  colors: {
    type: Array,
    default: () => ['var(--cinnamon)', 'var(--gold)', 'var(--kraft)', 'var(--matcha)', 'var(--smoke)'],
  },
})
</script>

<template>
  <div class="loading-bar">
    <div v-for="(c, i) in colors" :key="i" :style="{ background: c, animationDelay: (-0.46 * i) + 's' }"></div>
  </div>
</template>

<style scoped>
.loading-bar {
  width: 97px;
  height: 24px;
  position: relative;
  margin: 0 auto;
}
.loading-bar > div {
  content: '';
  width: 14px;
  height: 14px;
  border-radius: 30%;
  position: absolute;
  top: 4px;
  animation: cssload-shift 2.3s linear infinite;
}
@keyframes cssload-shift {
  0% { left: -40px; opacity: 0; }
  10% { left: 0; opacity: 1; }
  90% { left: 74px; opacity: 1; }
  100% { left: 112px; opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .loading-bar > div { animation: none; opacity: 0.7; left: 40px; }
}
</style>
