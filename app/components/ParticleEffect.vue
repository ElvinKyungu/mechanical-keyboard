<!-- components/ParticleEffect.vue -->
<template>
  <div
    ref="particleContainer"
    class="fixed inset-0 pointer-events-none z-10"
    style="mix-blend-mode: screen"
  >
    <canvas ref="canvasRef" class="w-full h-full" />
  </div>
</template>

<script setup lang="ts">
import { gsap } from "gsap";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

const canvasRef = ref<HTMLCanvasElement>();
const particleContainer = ref<HTMLElement>();
const particles = ref<Particle[]>([]);
let animationId: number;
let ctx: CanvasRenderingContext2D;

const colors = {
  orange: "#f97316",
  red: "#ef4444",
  yellow: "#eab308",
  green: "#22c55e",
  blue: "#3b82f6",
  purple: "#a855f7",
};

const createParticle = (x: number, y: number, color: string): Particle => {
  const angle = Math.random() * Math.PI * 2;
  const speed = Math.random() * 3 + 1;

  return {
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed - 2,
    life: 0,
    maxLife: Math.random() * 60 + 40,
    color,
    size: Math.random() * 3 + 1,
  };
};

const updateParticles = () => {
  particles.value = particles.value.filter((particle) => {
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.vy += 0.1; // gravity
    particle.life++;

    return particle.life < particle.maxLife;
  });
};

const drawParticles = () => {
  if (!ctx) return;

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  particles.value.forEach((particle) => {
    const alpha = 1 - particle.life / particle.maxLife;
    ctx.globalAlpha = alpha * 0.8;
    ctx.fillStyle = particle.color;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();
  });
};

const animate = () => {
  updateParticles();
  drawParticles();
  animationId = requestAnimationFrame(animate);
};

const spawnParticles = (
  x: number,
  y: number,
  color: string,
  count: number = 10,
) => {
  for (let i = 0; i < count; i++) {
    particles.value.push(createParticle(x, y, color));
  }
};

const resizeCanvas = () => {
  if (!canvasRef.value) return;

  canvasRef.value.width = window.innerWidth;
  canvasRef.value.height = window.innerHeight;
};

onMounted(() => {
  if (!canvasRef.value) return;

  ctx = canvasRef.value.getContext("2d")!;
  resizeCanvas();
  animate();

  window.addEventListener("resize", resizeCanvas);
});

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  window.removeEventListener("resize", resizeCanvas);
});

// Expose methods for parent component
defineExpose({
  spawnParticles,
  colors,
});
</script>
