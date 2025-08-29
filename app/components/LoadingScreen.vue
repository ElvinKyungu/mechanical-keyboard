<!-- components/LoadingScreen.vue -->
<template>
  <Transition
    enter-active-class="transition-opacity duration-500"
    leave-active-class="transition-opacity duration-500"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isLoading"
      class="fixed inset-0 bg-zinc-950 z-50 flex items-center justify-center"
    >
      <div class="text-center space-y-8">
        <!-- Animated Logo -->
        <div class="relative">
          <div
            class="w-24 h-24 border-4 border-blue-500/30 rounded-full animate-spin"
          ></div>
          <div
            class="absolute inset-2 w-20 h-20 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"
            style="animation-direction: reverse; animation-duration: 1.5s"
          ></div>
          <div
            class="absolute inset-4 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full animate-pulse"
          ></div>
        </div>

        <!-- Loading Text -->
        <div class="space-y-4">
          <h1 class="text-3xl font-bold text-white">3D Keyboard</h1>
          <div class="flex items-center justify-center space-x-2">
            <div
              class="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
              style="animation-delay: 0s"
            ></div>
            <div
              class="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
              style="animation-delay: 0.1s"
            ></div>
            <div
              class="w-2 h-2 bg-pink-500 rounded-full animate-bounce"
              style="animation-delay: 0.2s"
            ></div>
          </div>
          <p class="text-zinc-400">{{ loadingText }}</p>
        </div>

        <!-- Progress Bar -->
        <div class="w-64 bg-zinc-800 rounded-full h-2 overflow-hidden">
          <div
            class="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-300"
            :style="{ width: `${progress}%` }"
          ></div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
interface Props {
  isLoading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: true,
});

const progress = ref(0);
const loadingText = ref("Initializing...");

const loadingMessages = [
  "Initializing 3D engine...",
  "Loading GSAP animations...",
  "Calculating wave patterns...",
  "Setting up keyboard matrix...",
  "Preparing particle effects...",
  "Ready to interact!",
];

onMounted(() => {
  let messageIndex = 0;

  const updateProgress = () => {
    const interval = setInterval(() => {
      progress.value += Math.random() * 20 + 5;

      if (messageIndex < loadingMessages.length - 1) {
        loadingText.value = loadingMessages[messageIndex];
        messageIndex++;
      }

      if (progress.value >= 100) {
        progress.value = 100;
        loadingText.value = loadingMessages[loadingMessages.length - 1];
        clearInterval(interval);

        setTimeout(() => {
          progress.value = 100;
        }, 500);
      }
    }, 200);
  };

  updateProgress();
});
</script>
