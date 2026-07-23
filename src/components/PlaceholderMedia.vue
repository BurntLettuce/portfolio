<script setup>
defineProps({
  label: { type: String, default: '' },
})
</script>

<template>
  <div class="placeholder-media">
    <svg viewBox="0 0 64 64" class="placeholder-icon" aria-hidden="true">
      <rect x="4" y="4" width="56" height="56" rx="4" fill="none" stroke="currentColor" stroke-width="2.5" opacity="0.5"/>
      <circle cx="22" cy="22" r="6" fill="none" stroke="currentColor" stroke-width="2.5" opacity="0.5"/>
      <path d="M8 46l14-14 10 10 8-8 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" opacity="0.5"/>
    </svg>
    <span v-if="label" class="placeholder-label">{{ label }}</span>
  </div>
</template>

<style scoped>
.placeholder-media {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: var(--smoke);
  background:
    repeating-linear-gradient(135deg,
      rgba(243,232,214,0.05) 0px, rgba(243,232,214,0.05) 10px,
      transparent 10px, transparent 20px),
    var(--roast);
}
.placeholder-icon { width: 20%; min-width: 28px; max-width: 44px; }
.placeholder-label {
  font-family: var(--font-mono);
  font-size: 0.66rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  opacity: 0.7;
}
</style>
