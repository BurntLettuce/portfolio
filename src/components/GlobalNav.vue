<script setup>
import { ref, computed, onMounted, onBeforeUnmount, inject } from 'vue'
import { pages } from '../data/nav.js'

const currentPage = inject('currentPage')
const rawNavigateTo = inject('navigateTo')

const isTop = computed(() => currentPage.value === 'top')

const viewportWidth = ref(window.innerWidth)
const viewportHeight = ref(window.innerHeight)
function adjustSize() {
  viewportWidth.value = window.innerWidth
  viewportHeight.value = window.innerHeight
}
onMounted(() => window.addEventListener('resize', adjustSize))
onBeforeUnmount(() => window.removeEventListener('resize', adjustSize))

// transitions are 0ms until after mount, otherwise the nav would visibly animate in from narnia
// 600ms/500ms match MenuBox timing.
const dur = ref(0)
onMounted(() => {
  setTimeout(() => { dur.value = 600 }, 500)
})

// Active tab is underlined after the animation
const isNavigating = ref(false)
let settleTimer = null
function navigateTo(id) {
  if (id === currentPage.value) return
  const modeChanging = isTop.value || id === 'top'
  if (modeChanging) {
    isNavigating.value = true
    clearTimeout(settleTimer)
    settleTimer = setTimeout(() => { isNavigating.value = false }, dur.value + 60)
  } else {
    clearTimeout(settleTimer)
    isNavigating.value = false
  }
  rawNavigateTo(id)
}

const ROW_HEIGHT_LINE = 60   // tab-bar mode
const ROW_HEIGHT_STACK = 50  // floating mode
const floatingItems = pages.filter((p) => p.id !== 'top')
const visiblePages = computed(() => (isTop.value ? floatingItems : pages))

const itemsPos = computed(() => {
  const vw = viewportWidth.value
  const vh = viewportHeight.value

  if (!isTop.value) {
    const w = vw / pages.length
    return Object.fromEntries(pages.map((p, i) => [p.id, {
      x: i * w, y: 0, w, h: ROW_HEIGHT_LINE, fontSize: 15,
    }]))
  }

  const w = Math.min(320, vw * 0.8)
  const groupHeight = ROW_HEIGHT_STACK * floatingItems.length
  const baseY = vh / 2 - groupHeight / 2
  const x = vw / 2 - w / 2
  const result = {}
  floatingItems.forEach((p, i) => {
    result[p.id] = { x, y: baseY + i * ROW_HEIGHT_STACK, w, h: ROW_HEIGHT_STACK, fontSize: 22 }
  })
  return result
})
</script>

<template>
  <div class="nav-backdrop" :class="{ visible: !isTop }" aria-hidden="true"></div>

  <nav class="global-nav" aria-label="Page navigation">
    <button
      v-for="tab in visiblePages"
      :key="tab.id"
      type="button"
      class="nav-btn"
      :class="{ active: currentPage === tab.id && !isNavigating, stacked: isTop }"
      :style="{
        transform: `translate(${itemsPos[tab.id].x}px, ${itemsPos[tab.id].y}px)`,
        width: itemsPos[tab.id].w + 'px',
        height: itemsPos[tab.id].h + 'px',
        lineHeight: itemsPos[tab.id].h + 'px',
        fontSize: itemsPos[tab.id].fontSize + 'px',
        transitionDuration: dur + 'ms',
      }"
      :aria-current="currentPage === tab.id ? 'page' : undefined"
      @click="navigateTo(tab.id)"
    >
      {{ tab.label }}
    </button>
  </nav>
</template>

<style scoped>
.nav-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: rgba(10, 8, 13, 0.75);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.4s ease;
  z-index: 44;
}
.nav-backdrop.visible { opacity: 1; }

.global-nav {
  position: fixed;
  inset: 0;
  z-index: 45;
  pointer-events: none;
}

/* Text is centered so the glyphs track   
   the center as it moves/resizes. */
.nav-btn {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: auto;
  background: transparent;
  border: none;
  outline: none;
  border-bottom: 2px solid transparent;
  font-family: var(--font-display);
  letter-spacing: 0.02em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--cream);
  text-align: center;
  transition-property: transform, width, height, font-size, color;
  transition-timing-function: ease;
}

.nav-btn.stacked {
  border-bottom: none;
}

.nav-btn:hover,
.nav-btn:focus,
.nav-btn:focus-visible {
  outline: none;
  color: var(--blossom);
}

.nav-btn.active {
  color: var(--gold);
  border-bottom-color: var(--gold);
  font-weight: 600;
}
.nav-btn.active:hover,
.nav-btn.active:focus {
  color: var(--gold);
}

@media (prefers-reduced-motion: reduce) {
  .nav-btn, .nav-backdrop { transition: none; }
}
</style>
