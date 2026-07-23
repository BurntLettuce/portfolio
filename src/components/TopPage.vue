<script setup>
import { profile } from '../data/portfolio.js'
import { asset } from '../utils/asset.js'

const stars = [
  { top: '6%', left: '10%' }, { top: '11%', left: '24%' }, { top: '4%', left: '38%' },
  { top: '18%', left: '6%' }, { top: '24%', left: '18%' }, { top: '9%', left: '55%' },
  { top: '5%', left: '68%' }, { top: '14%', left: '82%' }, { top: '20%', left: '92%' },
  { top: '28%', left: '48%' }, { top: '32%', left: '32%' }, { top: '7%', left: '90%' },
]

const petals = [
  { left: '8%', dur: 14, delay: 0 }, { left: '20%', dur: 17, delay: 3 },
  { left: '35%', dur: 13, delay: 6 }, { left: '50%', dur: 18, delay: 1 },
  { left: '64%', dur: 15, delay: 8 }, { left: '78%', dur: 16, delay: 4 },
  { left: '90%', dur: 13, delay: 10 },
]
</script>

<template>
  <section id="top" class="hero">
    <div class="scene" aria-hidden="true">
      <div
        v-for="(s, i) in stars"
        :key="'star' + i"
        class="star"
        :style="{ top: s.top, left: s.left, animationDelay: (i * 0.35) + 's' }"
      ></div>

      <!-- cherry blossom branch + rising-sun emblem -->
      <img :src="asset('images/blossom-sun.png')" class="emblem" alt="" />

      <img
        v-for="(p, i) in petals"
        :key="'petal' + i"
        :src="asset('images/blossom-solid.svg')"
        class="petal"
        :style="{ left: p.left, animationDuration: p.dur + 's', animationDelay: p.delay + 's' }"
        alt=""
      />

      <!-- static koi, resting in its own spot in the scene -->
      <img :src="asset('images/koi.svg')" class="koi" alt="Koi fish" />
    </div>

    <div class="hero-content">
      <h1>{{ profile.name }}</h1>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  min-height: 100dvh;
  max-height: 100vh;
  max-height: 100dvh;
  display: flex;
  align-items: center;
  background: linear-gradient(180deg, #050409 0%, #0b0a12 38%, #171015 72%, #26170f 100%);
}

.scene {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

/* ---- sky ---- */
.star {
  position: absolute;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: rgba(255,255,255,0.85);
  box-shadow: 0 0 4px rgba(255,255,255,0.6);
  animation: twinkle 3.2s ease-in-out infinite;
}
@keyframes twinkle {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.9; }
}

/* ---- blossom branch + sun emblem ---- */
.emblem {
  position: absolute;
  top: 6%;
  right: 0;
  width: min(46vw, 560px);
  opacity: 0.94;
  filter: drop-shadow(0 18px 40px rgba(0,0,0,0.5));
}

/* ---- falling petals ---- */
.petal {
  position: absolute;
  top: -6%;
  width: 16px;
  height: 16px;
  opacity: 0;
  animation: petal-fall linear infinite;
  filter: drop-shadow(0 2px 3px rgba(0,0,0,0.35));
}
@keyframes petal-fall {
  0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
  8% { opacity: 0.9; }
  92% { opacity: 0.75; }
  100% { transform: translate(46px, 108vh) rotate(340deg); opacity: 0; }
}

.koi {
  position: absolute;
  bottom: 60px;
  left: 8%;
  width: 130px;
  opacity: 0.5;
  transform: rotate(-6deg);
  filter: invert(1) opacity(0.5) drop-shadow(0 4px 10px rgba(0,0,0,0.4));
}

/* ---- foreground content ---- */
.hero-content {
  position: relative;
  z-index: 1;
  max-width: 460px;
  margin: 0 8% 0 6%;
  text-align: left;
  padding: 48px 28px;
}

h1 {
  font-size: clamp(1.9rem, 4vw, 2.7rem);
  color: var(--cream);
}

@media (max-width: 780px) {
  .hero { flex-direction: column; padding: 40px 0; }
  .hero-content { margin: 0 auto; text-align: center; max-width: 90%; }
  .emblem { width: min(70vw, 420px); top: 4%; right: 0; opacity: 0.55; }
}

@media (prefers-reduced-motion: reduce) {
  .star { animation: none; opacity: 0.7; }
  .petal { animation: none; opacity: 0; }
}
</style>
