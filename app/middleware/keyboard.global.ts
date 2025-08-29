export default defineNuxtRouteMiddleware((to) => {
  // Global keyboard event prevention for demo
  if (process.client) {
    const handleKeydown = (e: KeyboardEvent) => {
      // Prevent certain browser shortcuts while on keyboard demo pages
      if (to.path === '/' && e.ctrlKey) {
        const blockedKeys = ['s', 'p', 'u', 'shift+r', 'f12']
        if (blockedKeys.some(key => {
          if (key.includes('+')) {
            const [modifier, keyName] = key.split('+')
            return e[`${modifier}Key` as keyof KeyboardEvent] && e.key.toLowerCase() === keyName
          }
          return e.key.toLowerCase() === key
        })) {
          e.preventDefault()
        }
      }
    }
    
    document.addEventListener('keydown', handleKeydown)
    
    // Cleanup when leaving
    return () => {
      document.removeEventListener('keydown', handleKeydown)
    }
  }
})