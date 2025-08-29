<!-- components/KeyButton.vue -->
<template>
  <button
    ref="keyRef"
    class="key-button flex items-center justify-center rounded-lg flex-shrink-0 box-border cursor-pointer text-white text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-100"
    :class="[
      sizeClass,
      colorClass,
      $attrs.class
    ]"
    :data-code="code"
    :data-macro="macro"
    :data-color="color"
    @click="handleClick"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
    @mouseleave="handleMouseUp"
  >
    <span class="select-none pointer-events-none">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Props
interface KeyButtonProps {
  code?: string
  color?: string
  macro?: string
  size?: 'small' | 'medium' | 'large' | 'xlarge' | 'spacebar'
}

const props = withDefaults(defineProps<KeyButtonProps>(), {
  size: undefined
})

// Emits
const emit = defineEmits<{
  animate: [macro: string]
  mousedown: [code: string]
  mouseup: [code: string]
}>()

// Template ref
const keyRef = ref<HTMLElement>()

// Computed classes
const sizeClass = computed(() => {
  if (!props.size) return 'w-12 h-12'
  
  const sizeMap = {
    small: 'small',
    medium: 'medium', 
    large: 'large',
    xlarge: 'xlarge',
    spacebar: 'spacebar'
  }
  
  return sizeMap[props.size] || 'w-12 h-12'
})

const colorClass = computed(() => {
  const baseClass = 'bg-zinc-800 border-2 border-zinc-600 hover:bg-zinc-700'
  
  if (!props.color) return baseClass
  
  const colorMap = {
    orange: 'bg-orange-600 border-orange-500 hover:bg-orange-700',
    red: 'bg-red-600 border-red-500 hover:bg-red-700',
    yellow: 'bg-yellow-600 border-yellow-500 hover:bg-yellow-700',
    green: 'bg-green-600 border-green-500 hover:bg-green-700',
    blue: 'bg-blue-600 border-blue-500 hover:bg-blue-700',
    purple: 'bg-purple-600 border-purple-500 hover:bg-purple-700',
    grey: 'bg-zinc-700 border-zinc-600 hover:bg-zinc-600'
  }
  
  return colorMap[props.color as keyof typeof colorMap] || baseClass
})

// Event handlers
const handleClick = () => {
  if (props.macro) {
    emit('animate', props.macro)
  }
}

const handleMouseDown = () => {
  if (props.code) {
    keyRef.value?.classList.add('key-pressed')
    emit('mousedown', props.code)
  }
}

const handleMouseUp = () => {
  if (props.code) {
    keyRef.value?.classList.remove('key-pressed')
    emit('mouseup', props.code)
  }
}

// Expose ref for parent component access
defineExpose({
  keyRef
})
</script>

<style scoped>
/* Key size variations */
.small { width: calc(50px * 1.33); height: 50px; }
.medium { width: calc(50px * 1.65); height: 50px; }
.large { width: calc(50px * 1.98); height: 50px; }
.xlarge { width: calc(50px * 2.62); height: 50px; }
.spacebar { width: calc(50px * 7.8); height: 50px; }

/* 3D Transform effects */
.key-button {
  transform: translate3d(0, 0, 30px);
  transform-style: preserve-3d;
  transition: all 100ms cubic-bezier(0.4, 0, 0.2, 1);
}

.key-button:hover {
  transform: translate3d(0, 0, 35px);
}

.key-button:active,
.key-button.key-pressed,
.key-button.key-active {
  transform: translate3d(0, 0, 25px);
}

/* Wave animation effects */
.key-button.wave-orange { 
  border: 1px solid #fb923c; /* orange-400 */
  box-shadow: 
    0 0 20px rgba(249, 115, 22, 0.6),  /* orange-500 */
    0 0 40px rgba(249, 115, 22, 0.4),
    0 2px 8px rgba(249, 115, 22, 0.8);
}

.key-button.wave-red { 
  border: 1px solid #f87171; /* red-400 */
  box-shadow: 
    0 0 20px rgba(239, 68, 68, 0.6),  /* red-500 */
    0 0 40px rgba(239, 68, 68, 0.4),
    0 2px 8px rgba(239, 68, 68, 0.8);
}

.key-button.wave-yellow { 
  border: 1px solid #facc15; /* yellow-400 */
  box-shadow: 
    0 0 20px rgba(234, 179, 8, 0.6),  /* yellow-500 */
    0 0 40px rgba(234, 179, 8, 0.4),
    0 2px 8px rgba(234, 179, 8, 0.8);
}

.key-button.wave-green { 
  border: 1px solid #4ade80; /* green-400 */
  box-shadow: 
    0 0 20px rgba(34, 197, 94, 0.6),  /* green-500 */
    0 0 40px rgba(34, 197, 94, 0.4),
    0 2px 8px rgba(34, 197, 94, 0.8);
}

.key-button.wave-blue { 
  border: 1px solid #60a5fa; /* blue-400 */
  box-shadow: 
    0 0 20px rgba(59, 130, 246, 0.6),  /* blue-500 */
    0 0 40px rgba(59, 130, 246, 0.4),
    0 2px 8px rgba(59, 130, 246, 0.8);
}

.key-button.wave-purple { 
  border: 1px solid #c084fc; /* purple-400 */
  box-shadow: 
    0 0 20px rgba(168, 85, 247, 0.6),  /* purple-500 */
    0 0 40px rgba(168, 85, 247, 0.4),
    0 2px 8px rgba(168, 85, 247, 0.8);
}

/* Pressed state */
.key-button.key-pressed {
  border: 1px solid #d4d4d8; /* zinc-300 */
  box-shadow: 
    0 0 10px rgba(161, 161, 170, 0.5),  /* zinc-400 */
    0 2px 4px rgba(161, 161, 170, 0.4);
}

</style>