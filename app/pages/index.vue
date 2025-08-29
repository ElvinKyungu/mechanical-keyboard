<script setup lang="ts">
definePageMeta({
  title: '3D Interactive Keyboard Demo',
  description: 'Experience an interactive 3D keyboard with wave animations'
})

// SEO and meta
useSeoMeta({
  title: '3D Interactive Keyboard - Nuxt 4 Demo',
  ogTitle: '3D Interactive Keyboard',
  description: 'Interactive 3D keyboard with beautiful wave animations built with Nuxt 4, GSAP, and Tailwind CSS',
  ogDescription: 'Experience smooth 3D animations and wave effects on a virtual keyboard',
  twitterCard: 'summary_large_image'
})

// Disable server-side rendering for this page due to DOM dependencies
const { $gsap } = useNuxtApp()

onMounted(() => {
  // Global keyboard shortcuts for demo
  const handleGlobalKeydown = (e: KeyboardEvent) => {
    // Prevent browser shortcuts that might interfere
    if (e.ctrlKey && ['r', 'R', 'f5'].includes(e.key)) {
      // Allow refresh but prevent other Ctrl shortcuts
      if (!['r', 'R', 'f5'].includes(e.key)) {
        e.preventDefault()
      }
    }
    
    // Help shortcut
    if (e.key === 'h' && e.shiftKey) {
      // Toggle help panel visibility
      const helpPanel = document.querySelector('.instructions-panel')
      if (helpPanel) {
        helpPanel.classList.toggle('opacity-0')
        helpPanel.classList.toggle('pointer-events-none')
      }
    }
  }
  
  window.addEventListener('keydown', handleGlobalKeydown)
  
  // Cleanup
  return () => {
    window.removeEventListener('keydown', handleGlobalKeydown)
  }
})
</script>
<template>
  <div>
    <ClientOnly>
      <Keyboard3D />
      <!-- Instructions Panel -->
      <div class="fixed top-4 left-4 bg-black/80 backdrop-blur-sm rounded-xl p-6 text-white max-w-md text-white">
        <h2 class="text-xl font-bold mb-4 text-white">Interactive 3D Keyboard</h2>
        
        <div class="space-y-3 text-sm">
          <div class="flex items-center space-x-3">
            <div class="w-4 h-4 bg-orange-500 rounded"></div>
            <span>Press <kbd class="bg-zinc-700 px-2 py-1 rounded">Escape</kbd> - Orange wave</span>
          </div>
          
          <div class="flex items-center space-x-3">
            <div class="w-4 h-4 bg-green-500 rounded"></div>
            <span>Press <kbd class="bg-zinc-700 px-2 py-1 rounded">Enter</kbd> - Green wave</span>
          </div>
          
          <div class="flex items-center space-x-3">
            <div class="w-4 h-4 bg-yellow-500 rounded"></div>
            <span>Press <kbd class="bg-zinc-700 px-2 py-1 rounded">Shift</kbd> - Yellow wave</span>
          </div>
          
          <div class="flex items-center space-x-3">
            <div class="w-4 h-4 bg-red-500 rounded"></div>
            <span>Press <kbd class="bg-zinc-700 px-2 py-1 rounded">Ctrl</kbd> - Red wave</span>
          </div>
          
          <div class="flex items-center space-x-3">
            <div class="w-4 h-4 bg-blue-500 rounded"></div>
            <span>Press <kbd class="bg-zinc-700 px-2 py-1 rounded">Alt</kbd> - Blue wave</span>
          </div>
          
          <div class="flex items-center space-x-3">
            <div class="w-4 h-4 bg-purple-500 rounded"></div>
            <span>Press <kbd class="bg-zinc-700 px-2 py-1 rounded">Win</kbd> - Purple wave</span>
          </div>
        </div>
      </div>
      
      <!-- Performance Stats -->
      <div class="fixed top-4 right-4 bg-black/80 backdrop-blur-sm rounded-xl p-4 text-white">
        <div class="text-sm space-y-2">
          <div class="flex justify-between items-center">
            <span>Status:</span>
            <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <div class="text-xs text-zinc-400">
            Built with Nuxt 4 + GSAP + Tailwind <br>
            <span class="text-teal-500"><NuxtLink to="https://elvin.vercel.app/" target="_blank">By Elvin Code</NuxtLink></span>
          </div>
        </div>
      </div>
      
      <template #fallback>
        <div class="min-h-screen bg-zinc-950 flex items-center justify-center">
          <div class="text-center space-y-4">
            <div class="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p class="text-white text-lg">Loading 3D Keyboard...</p>
            <p class="text-zinc-400 text-sm">Initializing GSAP animations</p>
          </div>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>
