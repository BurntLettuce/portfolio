<script setup>
const petals = [
  { left: '6%', dur: 17, delay: 0 },
  { left: '20%', dur: 21, delay: 5 },
  { left: '35%', dur: 16, delay: 9 },
  { left: '50%', dur: 22, delay: 2 },
  { left: '64%', dur: 18, delay: 12 },
  { left: '78%', dur: 20, delay: 6 },
  { left: '90%', dur: 16, delay: 14 },
]
</script>

<template>
  <div class="falling-petals petals-behind" aria-hidden="true">
    <img
      v-for="(p, i) in petals"
      :key="i"
      src="/images/blossom-solid.svg"
      class="petal"
      :style="{ left: p.left, animationDuration: p.dur + 's', animationDelay: p.delay + 's' }"
      alt=""
    />
  </div>
</template>

<style scoped>
.falling-petals {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  filter: blur(3px);
  opacity: 0.32;
}

.petal {
  position: absolute;
  top: -6%;
  width: 24px;
  height: 24px;
  opacity: 0;
  animation: petal-fall linear infinite;
}
@keyframes petal-fall {
  0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
  8% { opacity: 1; }
  92% { opacity: 1; }
  100% { transform: translate(50px, 120vh) rotate(340deg); opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .petal { animation: none; opacity: 0; }
}
</style>
