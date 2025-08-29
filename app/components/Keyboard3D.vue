<!-- components/Keyboard3D.vue -->
<template>
  <div
    class="min-h-screen bg-zinc-950 flex items-center justify-center overflow-hidden select-none"
  >
    <div
      ref="keyboardRef"
      class="keyboard-container inline-flex flex-col p-4 rounded-2xl bg-zinc-900 border-2 border-zinc-700 shadow-2xl"
      :style="keyboardStyle"
    >
      <!-- Row 1: Function Keys -->
      <div class="flex mb-4 transform-gpu" style="transform-style: preserve-3d">
        <KeyButton
          code="Escape"
          color="orange"
          macro="orange"
          class="bg-orange-600 hover:bg-orange-700"
          @animate="handleMacroAnimation"
        >
          échap
        </KeyButton>
        <KeyButton
          v-for="i in 12"
          :key="`f${i}`"
          :code="`Digit${i}`"
          class="ml-4"
        >
          F{{ i }}
        </KeyButton>
        <KeyButton
          code="Backspace"
          size="large"
          class="ml-4 bg-zinc-700 hover:bg-zinc-600 px-6"
        >
          ←
        </KeyButton>
        <KeyButton
          color="red"
          macro="red"
          class="ml-4 bg-red-600 hover:bg-red-700"
          @animate="handleMacroAnimation"
        />
      </div>

      <!-- Row 2: Top Letter Row -->
      <div class="flex mb-4 transform-gpu" style="transform-style: preserve-3d">
        <KeyButton
          code="Tab"
          size="medium"
          class="bg-zinc-700 hover:bg-zinc-600 px-6"
          >Tab</KeyButton
        >
        <KeyButton
          v-for="key in qwertyRow"
          :key="key"
          :code="`Key${key}`"
          class="ml-4"
        >
          {{ key }}
        </KeyButton>
        <KeyButton code="BracketLeft" class="ml-4">{</KeyButton>
        <KeyButton code="BracketRight" class="ml-4">}</KeyButton>
        <KeyButton
          code="Backslash"
          size="medium"
          class="ml-4 bg-zinc-700 hover:bg-zinc-600 px-6"
          >//</KeyButton
        >
        <KeyButton
          color="yellow"
          macro="yellow"
          class="ml-4 bg-yellow-600 hover:bg-yellow-700"
          @animate="handleMacroAnimation"
        />
      </div>

      <!-- Row 3: Home Row -->
      <div class="flex mb-4 transform-gpu" style="transform-style: preserve-3d">
        <KeyButton
          code="CapsLock"
          size="large"
          class="bg-zinc-700 hover:bg-zinc-600 px-8"
          >Caps Lock</KeyButton
        >
        <KeyButton
          v-for="key in homeRow"
          :key="key"
          :code="`Key${key}`"
          class="ml-4"
        >
          {{ key }}
        </KeyButton>
        <KeyButton code="Semicolon" class="ml-4">;</KeyButton>
        <KeyButton code="Quote" class="ml-4">'</KeyButton>
        <KeyButton
          code="Enter"
          size="xlarge"
          color="green"
          macro="green:Enter"
          class="ml-4 bg-green-600 hover:bg-green-700 px-10"
          @animate="handleMacroAnimation"
        >
          Enter
        </KeyButton>
        <KeyButton
          color="green"
          macro="green"
          class="ml-4 bg-green-600 hover:bg-green-700"
          @animate="handleMacroAnimation"
        />
      </div>

      <!-- Row 4: Bottom Letter Row -->
      <div class="flex mb-4 transform-gpu" style="transform-style: preserve-3d">
        <KeyButton
          code="ShiftLeft"
          size="xlarge"
          color="yellow"
          macro="yellow:ShiftLeft"
          class="bg-yellow-600 hover:bg-yellow-700 px-10"
          @animate="handleMacroAnimation"
        >
          Shift
        </KeyButton>
        <KeyButton
          v-for="key in bottomRow"
          :key="key"
          :code="`Key${key}`"
          class="ml-4"
        >
          {{ key }}
        </KeyButton>
        <KeyButton code="Comma" class="ml-4">,</KeyButton>
        <KeyButton code="Period" class="ml-4">.</KeyButton>
        <KeyButton code="Slash" class="ml-4">/</KeyButton>
        <KeyButton
          code="ShiftRight"
          size="large"
          color="yellow"
          macro="yellow:ShiftRight"
          class="ml-4 bg-yellow-600 hover:bg-yellow-700 px-8"
          @animate="handleMacroAnimation"
        />
        <KeyButton code="ArrowUp" class="ml-4">↑</KeyButton>
        <KeyButton
          color="blue"
          macro="blue"
          class="ml-4 bg-blue-600 hover:bg-blue-700"
          @animate="handleMacroAnimation"
        />
      </div>

      <!-- Row 5: Bottom Modifier Row -->
      <div class="flex transform-gpu" style="transform-style: preserve-3d">
        <KeyButton
          code="ControlLeft"
          size="small"
          color="red"
          macro="red:ControlLeft"
          class="bg-red-600 hover:bg-red-700 px-4"
          @animate="handleMacroAnimation"
        >
          Ctrl
        </KeyButton>
        <KeyButton
          code="MetaLeft"
          size="small"
          color="purple"
          macro="purple:MetaLeft"
          class="ml-4 bg-purple-600 hover:bg-purple-700 px-4"
          @animate="handleMacroAnimation"
        >
          Win
        </KeyButton>
        <KeyButton
          code="AltLeft"
          size="small"
          color="blue"
          macro="blue:AltLeft"
          class="ml-4 bg-blue-600 hover:bg-blue-700 px-4"
          @animate="handleMacroAnimation"
        >
          Alt
        </KeyButton>
        <KeyButton
          code="Space"
          size="spacebar"
          macro="default:Space"
          class="ml-4 px-20"
          @animate="handleMacroAnimation"
        />
        <KeyButton
          code="AltRight"
          size="medium"
          color="blue"
          macro="blue:AltRight"
          class="ml-4 bg-blue-600 hover:bg-blue-700 px-6"
          @animate="handleMacroAnimation"
        >
          Alt
        </KeyButton>
        <KeyButton
          code="ContextMenu"
          size="medium"
          color="purple"
          macro="purple:ContextMenu"
          class="ml-4 bg-purple-600 hover:bg-purple-700 px-6"
          @animate="handleMacroAnimation"
        >
          Menu
        </KeyButton>
        <KeyButton code="ArrowLeft" class="ml-4">←</KeyButton>
        <KeyButton code="ArrowDown" class="ml-4">↓</KeyButton>
        <KeyButton code="ArrowRight" class="ml-4">→</KeyButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";
import { gsap } from "gsap";

// Key layout arrays
const qwertyRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const homeRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const bottomRow = ["Z", "X", "C", "V", "B", "N", "M"];

// Types
interface KeyState {
  element: HTMLElement;
  index: number;
  bounds: DOMRect;
  macro?: { [color: string]: number };
}

interface AnimationState {
  time: number;
  macro: string;
  color: string;
}

// Reactive state
const keyboardRef = ref<HTMLElement>();
const rotation = ref({ x: 20, y: 0 });
const keysDown = ref(new Set<number>());
const keyStates = ref<Map<string, KeyState>>(new Map());
const animating = ref<AnimationState[]>([]);
const furthestKeys = ref<{ [color: string]: number }>({});

// Configuration
const macroColors = ["orange", "red", "yellow", "green", "blue", "purple"];
const arrowKeys = ["ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"];

// Computed
const keyboardStyle = computed(() => ({
  transform: `perspective(1200px) rotateX(${rotation.value.x}deg) rotateY(${rotation.value.y}deg)`,
  transformStyle: "preserve-3d",
  transition: "transform 100ms ease",
}));

// Utility functions
const distSq = (x1: number, y1: number, x2: number, y2: number): number => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return dx * dx + dy * dy;
};

const dist = (x1: number, y1: number, x2: number, y2: number): number => {
  const d = distSq(x1, y1, x2, y2);
  return d === 0 ? 0 : Math.sqrt(d);
};

// Initialize key positions and calculate macro distances
const initializeKeyPositions = async () => {
  await nextTick();

  const allKeyElements = keyboardRef.value?.querySelectorAll(
    ".key-button",
  ) as NodeListOf<HTMLElement>;
  if (!allKeyElements || allKeyElements.length === 0) return;

  const keyArray = Array.from(allKeyElements);
  const allKeyBounds = keyArray.map((el) => el.getBoundingClientRect());

  // Initialize key states
  keyArray.forEach((el, index) => {
    const code = el.dataset.code;
    if (code) {
      keyStates.value.set(code, {
        element: el,
        index,
        bounds: allKeyBounds[index],
        macro: {},
      });
    }
  });

  // Calculate distances from macro keys to all other keys
  macroColors.forEach((color) => {
    const macroKey = keyArray.find(
      (el) =>
        el.dataset.macro === color || el.dataset.macro?.startsWith(`${color}:`),
    );

    if (!macroKey) return;

    const macroIndex = keyArray.indexOf(macroKey);
    const macroBounds = allKeyBounds[macroIndex];
    let maxDistance = 0;

    keyArray.forEach((el, index) => {
      if (index === macroIndex) return;

      const elBounds = allKeyBounds[index];
      const distance = dist(
        macroBounds.x + macroBounds.width * 0.5,
        macroBounds.y + macroBounds.height * 0.5,
        elBounds.x + elBounds.width * 0.5,
        elBounds.y + elBounds.height * 0.5,
      );

      const code = el.dataset.code;
      if (code) {
        const keyState = keyStates.value.get(code);
        if (keyState) {
          keyState.macro = keyState.macro || {};
          keyState.macro[color] = distance;
        }
      }

      if (distance > maxDistance) {
        maxDistance = distance;
      }
    });

    furthestKeys.value[color] = maxDistance;
  });
};

// Handle macro animations triggered by key releases or clicks
const handleMacroAnimation = (macro: string) => {
  const [color] = macro.split(":");

  // Check if CapsLock is pressed (affects Space and ShiftLeft behavior)
  const capsLockState = keyStates.value.get("CapsLock");
  const capsLockPressed = capsLockState
    ? keysDown.value.has(capsLockState.index)
    : false;

  if (
    !capsLockPressed &&
    ["Space", "ShiftLeft"].some((key) => macro.includes(key))
  ) {
    return;
  }

  animating.value.push({
    time: performance.now(),
    macro,
    color,
  });

  if (animating.value.length === 1) {
    animateWave();
  }
};

// Main wave animation loop
const animateWave = () => {
  const animate = (timestamp: number) => {
    if (animating.value.length === 0) return;

    const dilation = 100; // Wave thickness
    const allKeyElements = keyboardRef.value?.querySelectorAll(
      ".key-button",
    ) as NodeListOf<HTMLElement>;
    if (!allKeyElements) return;

    const actions = Array(allKeyElements.length).fill(false);

    // Mark currently pressed keys
    keysDown.value.forEach((index) => {
      actions[index] = true;
    });

    // Process each active animation
    for (let i = animating.value.length - 1; i >= 0; i--) {
      const animation = animating.value[i];
      const elapsed = timestamp - animation.time;
      const duration = furthestKeys.value[animation.color] + dilation;

      // Remove completed animations
      if (elapsed >= duration) {
        animating.value.splice(i, 1);
        continue;
      }

      // Apply wave effect to keys
      keyStates.value.forEach((keyState, code) => {
        const distance = keyState.macro?.[animation.color] ?? 0;
        const timeDiff = Math.abs(elapsed - distance);

        if (timeDiff < dilation && !actions[keyState.index]) {
          actions[keyState.index] = animation.color;
        }
      });
    }

    // Apply visual effects to keys
    allKeyElements.forEach((el, index) => {
      const action = actions[index];

      if (action) {
        el.classList.add("key-active");
        if (typeof action === "string") {
          el.dataset.animationColor = action;
          el.classList.add(`wave-${action}`);
        }
      } else {
        el.classList.remove("key-active");
        el.dataset.animationColor = "";
        macroColors.forEach((color) => {
          el.classList.remove(`wave-${color}`);
        });
      }
    });

    // Continue animation loop or cleanup
    if (animating.value.length > 0) {
      requestAnimationFrame(animate);
    } else {
      cleanupAnimations();
    }
  };

  requestAnimationFrame(animate);
};

// Cleanup all animation effects
const cleanupAnimations = () => {
  const allKeyElements = keyboardRef.value?.querySelectorAll(
    ".key-button",
  ) as NodeListOf<HTMLElement>;
  if (!allKeyElements) return;

  allKeyElements.forEach((el) => {
    el.classList.remove("key-active");
    el.dataset.animationColor = "";
    macroColors.forEach((color) => {
      el.classList.remove(`wave-${color}`);
    });
  });
};

// Set key press/release state
const setKeyState = (code: string, pressed: boolean) => {
  const keyState = keyStates.value.get(code);
  if (!keyState) return;

  if (pressed) {
    keysDown.value.add(keyState.index);
    keyState.element.classList.add("key-pressed");
  } else {
    keysDown.value.delete(keyState.index);
    keyState.element.classList.remove("key-pressed");

    // Trigger macro animation on key release
    const macro = keyState.element.dataset.macro;
    if (macro) {
      handleMacroAnimation(macro);
    }
  }

  updateRotationFromArrows();
};

// Update 3D rotation based on arrow key states
const updateRotationFromArrows = () => {
  const arrowStates = arrowKeys.map((key) => {
    const state = keyStates.value.get(key);
    return state ? keysDown.value.has(state.index) : false;
  });

  const [up, left, down, right] = arrowStates;

  // Apply rotation changes with GSAP for smooth animation
  const newRotation = { ...rotation.value };

  if (up) newRotation.x += 1;
  if (left) newRotation.y -= 1;
  if (down) newRotation.x -= 1;
  if (right) newRotation.y += 1;

  // Clamp rotation values
  newRotation.x = Math.max(-45, Math.min(45, newRotation.x));
  newRotation.y = Math.max(-45, Math.min(45, newRotation.y));

  gsap.to(rotation.value, {
    x: newRotation.x,
    y: newRotation.y,
    duration: 0.1,
    ease: "power2.out",
  });
};

// Keyboard event handlers
const handleKeyDown = (e: KeyboardEvent) => {
  // Skip F keys
  if (e.code.startsWith("F") && !isNaN(parseInt(e.code.slice(1)))) {
    return;
  }

  e.preventDefault();

  // Handle CapsLock state
  const capsLockState = keyStates.value.get("CapsLock");
  if (capsLockState) {
    if (e.getModifierState("CapsLock")) {
      keysDown.value.add(capsLockState.index);
      capsLockState.element.classList.add("key-pressed");
    } else {
      keysDown.value.delete(capsLockState.index);
      capsLockState.element.classList.remove("key-pressed");
    }
  }

  if (e.code === "CapsLock") return;

  setKeyState(e.code, true);
};

const handleKeyUp = (e: KeyboardEvent) => {
  e.preventDefault();

  // Handle CapsLock state
  const capsLockState = keyStates.value.get("CapsLock");
  if (capsLockState && !e.getModifierState("CapsLock")) {
    keysDown.value.delete(capsLockState.index);
    capsLockState.element.classList.remove("key-pressed");
  }

  if (e.code === "CapsLock") return;

  setKeyState(e.code, false);
};

const handleBlur = () => {
  // Clear all animations and pressed states when window loses focus
  animating.value.splice(0);

  const allKeyElements = keyboardRef.value?.querySelectorAll(
    ".key-button",
  ) as NodeListOf<HTMLElement>;
  if (!allKeyElements) return;

  allKeyElements.forEach((el, index) => {
    const code = el.dataset.code;
    if (code !== "CapsLock") {
      el.classList.remove("key-pressed", "key-active");
      el.dataset.animationColor = "";
      macroColors.forEach((color) => {
        el.classList.remove(`wave-${color}`);
      });
      keysDown.value.delete(index);
    }
  });
};

// Lifecycle hooks
onMounted(async () => {
  await initializeKeyPositions();

  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);
  window.addEventListener("blur", handleBlur);
  window.addEventListener("focus", initializeKeyPositions);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
  window.removeEventListener("keyup", handleKeyUp);
  window.removeEventListener("blur", handleBlur);
  window.removeEventListener("focus", initializeKeyPositions);
});
</script>

<style scoped>
.keyboard-container {
  transform-style: preserve-3d;
  perspective: 1200px;
}

/* Key size variations */

.key-button.small {
  width: calc(50px * 1.33);
}
.key-button.medium {
  width: calc(50px * 1.65);
}
.key-button.large {
  width: calc(50px * 1.98);
}
.key-button.xlarge {
  width: calc(50px * 2.62);
}
.key-button.spacebar {
  width: calc(50px * 7.8);
}

/* 3D Transform effects */
.key-button {
  transform: translate3d(0, 0, 30px);
  transition: all 100ms ease;
  transform-style: preserve-3d;
}

.key-button:hover {
  transform: translate3d(0, 0, 35px);
}

.key-button.key-pressed,
.key-button.key-active {
  transform: translate3d(0, 0, 25px);
}

/* Wave animation colors with glowing effects */
/* Effets wave avec glow */
.wave-red {
  border: 1px solid #ef4444; /* red-500 */
  box-shadow:
    0 0 20px rgba(239, 68, 68, 0.5),
    0 0 40px rgba(239, 68, 68, 0.3),
    0 2px 8px rgba(239, 68, 68, 0.6);
}

.wave-yellow {
  border: 1px solid #eab308; /* yellow-500 */
  box-shadow:
    0 0 20px rgba(234, 179, 8, 0.5),
    0 0 40px rgba(234, 179, 8, 0.3),
    0 2px 8px rgba(234, 179, 8, 0.6);
}

.wave-green {
  border: 1px solid #22c55e; /* green-500 */
  box-shadow:
    0 0 20px rgba(34, 197, 94, 0.5),
    0 0 40px rgba(34, 197, 94, 0.3),
    0 2px 8px rgba(34, 197, 94, 0.6);
}

.wave-blue {
  border: 1px solid #3b82f6; /* blue-500 */
  box-shadow:
    0 0 20px rgba(59, 130, 246, 0.5),
    0 0 40px rgba(59, 130, 246, 0.3),
    0 2px 8px rgba(59, 130, 246, 0.6);
}

.wave-purple {
  border: 1px solid #a855f7; /* purple-500 */
  box-shadow:
    0 0 20px rgba(168, 85, 247, 0.5),
    0 0 40px rgba(168, 85, 247, 0.3),
    0 2px 8px rgba(168, 85, 247, 0.6);
}

/* Key pressed state */
.key-button.key-pressed {
  border: 1px solid #a1a1aa; /* zinc-400 */
  box-shadow:
    0 0 10px rgba(161, 161, 170, 0.4),
    0 2px 4px rgba(161, 161, 170, 0.3);
}
</style>
