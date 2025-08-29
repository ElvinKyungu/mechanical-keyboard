// composables/useKeyboard.ts
export const useKeyboard = () => {
  const isPressed = ref(new Set<string>());

  const pressKey = (code: string) => {
    isPressed.value.add(code);
  };

  const releaseKey = (code: string) => {
    isPressed.value.delete(code);
  };

  const isKeyPressed = (code: string) => {
    return isPressed.value.has(code);
  };

  const clearAll = () => {
    isPressed.value.clear();
  };

  return {
    isPressed: readonly(isPressed),
    pressKey,
    releaseKey,
    isKeyPressed,
    clearAll,
  };
};
