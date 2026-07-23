<script setup>
import { ref, reactive, computed } from 'vue'
import { profile } from '../data/portfolio.js'
import { asset } from '../utils/asset.js'
import LoadingBar from './LoadingBar.vue'
import FallingPetals from './FallingPetals.vue'

// 'writing' | 'sending' | 'sent' | 'senderror'
const status = ref('writing')

const form = reactive({
  name: '',
  email: '',
  message: '',
})

const formFilled = computed(() => !!(form.name.trim() && form.email.trim() && form.message.trim()))

function resetForm() {
  form.name = ''
  form.email = ''
  form.message = ''
}

async function send() {
  if (!formFilled.value) return
  status.value = 'sending'
  try {
    const body = `${form.message}\n\n— ${form.name} (${form.email})`
    const mailto = `mailto:${profile.email}` +
      `?subject=${encodeURIComponent('New message from ' + form.name)}` +
      `&body=${encodeURIComponent(body)}`
    // no backend - use own mail client
    window.location.href = mailto
    await new Promise((resolve) => setTimeout(resolve, 700))
    status.value = 'sent'
  } catch (err) {
    console.warn('Could not open a mail client', err)
    status.value = 'senderror'
  }
}

function backToWrite() {
  if (status.value === 'sent') resetForm()
  status.value = 'writing'
}
</script>

<template>
  <section id="contact" class="section contact">
   <FallingPetals />
   <img :src="asset('images/branch.svg')" class="branch-bg petals-behind" aria-hidden="true" alt="" />

   <div class="wrap">
    <h2 class="section-title">Contact</h2>

    <Transition appear name="slide-up">
      <div class="msg-area">
        <!-- writing -->
        <form v-if="status === 'writing'" class="msg-form" @submit.prevent="send">
          <div class="field">
            <input id="contact-name" v-model="form.name" type="text" name="name" required autocomplete="name" placeholder=" " />
            <label for="contact-name">Name</label>
          </div>
          <div class="field">
            <input id="contact-email" v-model="form.email" type="email" name="email" required autocomplete="email" placeholder=" " />
            <label for="contact-email">Email</label>
          </div>
          <div class="field">
            <textarea id="contact-message" v-model="form.message" name="message" rows="3" required placeholder=" "></textarea>
            <label for="contact-message">Message</label>
          </div>
          <button type="submit" class="send-btn" :disabled="!formFilled" :class="{ disabled: !formFilled }">
            Send
          </button>
        </form>

        <!-- sending -->
        <div v-else-if="status === 'sending'" class="status-block">
          <LoadingBar />
          <p class="status-line">In flight&hellip;</p>
        </div>

        <!-- sent -->
        <div v-else-if="status === 'sent'" class="status-block">
          <p class="status-line">Delivered. I'll read it soon.</p>
          <button type="button" class="link-btn" @click="backToWrite">Send another</button>
        </div>

        <!-- error -->
        <div v-else class="status-block">
          <p class="status-line error">Lost in the wind.</p>
          <p class="status-sub">Try again, or email me directly below.</p>
          <button type="button" class="link-btn" @click="backToWrite">Back to the message</button>
        </div>

        <div class="letter-footer">
          <a class="letter-email" :href="`mailto:${profile.email}`">{{ profile.email }}</a>
          <div class="letter-socials">
            <a v-for="s in profile.socials" :key="s.label" :href="s.href" target="_blank" rel="noopener">{{ s.label }}</a>
          </div>
        </div>
      </div>
    </Transition>
   </div>
  </section>
</template>

<style scoped>
.contact { border-bottom: none; padding-bottom: 64px; }

.branch-bg {
  position: absolute;
  top: 10%;
  left: 0;
  width: min(42vw, 380px);
  filter: invert(1) opacity(0.09) blur(2px);
  pointer-events: none;
  animation: branch-drift 10s ease-in-out infinite;
}
@keyframes branch-drift {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-14px) rotate(1.5deg); }
}

.msg-area {
  max-width: 480px;
  margin: 0 auto;
}

/* ---- formless field ---- */
.msg-form {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.field {
  position: relative;
}
.field input,
.field textarea {
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(224, 160, 187, 0.25);
  font-family: var(--font-body);
  font-size: 1.05rem;
  color: var(--cream);
  padding: 6px 2px 10px;
  resize: vertical;
}
.field textarea { min-height: 70px; }
.field input:focus,
.field textarea:focus {
  outline: none;
  border-bottom-color: var(--blossom);
}
.field label {
  position: absolute;
  left: 2px;
  top: 6px;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--smoke);
  pointer-events: none;
  transition: transform 0.18s ease, color 0.18s ease;
  transform-origin: left top;
}
.field input:focus + label,
.field input:not(:placeholder-shown) + label,
.field textarea:focus + label,
.field textarea:not(:placeholder-shown) + label {
  transform: translateY(-20px) scale(0.92);
  color: var(--blossom);
}

.send-btn {
  align-self: flex-start;
  margin-top: 4px;
  background: transparent;
  color: var(--gold);
  border: 1px solid var(--gold);
  border-radius: 2px;
  padding: 11px 28px;
  font-family: var(--font-display);
  font-size: 0.9rem;
  letter-spacing: 0.08em;
  transition: background 0.15s ease, color 0.15s ease;
}
.send-btn:hover { background: var(--gold); color: var(--espresso); }
.send-btn:disabled,
.send-btn.disabled {
  border-color: var(--roast-light);
  color: var(--smoke);
  cursor: not-allowed;
  background: transparent;
}

/* ---- status ---- */
.status-block { padding: 10px 0; }
.status-line {
  font-family: var(--font-display);
  font-size: 1.1rem;
  color: var(--cream);
  margin-bottom: 8px;
}
.status-line.error { color: var(--cinnamon-bright); }
.status-sub {
  font-size: 0.85rem;
  color: var(--smoke);
  margin-bottom: 10px;
}

.link-btn {
  background: none;
  border: none;
  color: var(--blossom);
  text-decoration: underline;
  text-underline-offset: 3px;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  padding: 0;
}
.link-btn:hover { color: var(--gold); }

.letter-footer {
  margin-top: 36px;
  padding-top: 18px;
  border-top: 1px dashed rgba(224, 160, 187, 0.2);
}
.letter-email {
  display: block;
  font-size: 0.9rem;
  color: var(--blossom);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.letter-socials {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 14px;
  margin-top: 10px;
  font-size: 0.72rem;
}
.letter-socials a { color: var(--smoke); text-decoration: underline; text-underline-offset: 2px; }
.letter-socials a:hover { color: var(--gold); }

@media (prefers-reduced-motion: reduce) {
  .send-btn { transition: none; }
  .branch-bg { animation: none; }
}
</style>