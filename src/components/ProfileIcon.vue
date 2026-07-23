<script setup>
defineProps({
  iconSrc: { type: String, default: '' },
  initials: { type: String, default: '' },
  size: { type: [Number, String], default: 120 },
})
</script>

<template>
  <Transition appear name="scale">
    <div
      class="profile-icon"
      :style="{
        backgroundImage: iconSrc ? `url(${iconSrc})` : 'none',
        width: `${size}px`,
        height: `${size}px`,
      }"
    >
      <span v-if="!iconSrc" class="initials">{{ initials }}</span>
    </div>
  </Transition>
</template>

<style scoped>
.scale-enter-active, .scale-leave-active {
  transition: all 900ms ease;
}
.scale-enter-from, .scale-leave-to {
  transform: scale(0);
  opacity: 0.5;
}

.profile-icon {
  position: relative;
  margin: 0 auto;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: var(--cinnamon);
  background-image: linear-gradient(160deg, var(--cinnamon-bright), var(--cinnamon));
  border: 4px solid var(--kraft);
  box-shadow: 0 16px 34px -14px rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
}

.initials {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.6rem;
  color: var(--cream);
  letter-spacing: 0.04em;
}
</style>
